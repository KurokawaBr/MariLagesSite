#!/usr/bin/env python3
"""
Mari Lajes — Bootstrap do site
================================

Script único que verifica o projeto, garante que o build do React esteja
gerado e roda o site em um dos três modos:

  • LOCAL   → servidor de desenvolvimento em http://localhost:8000
  • SERVE   → servidor de produção (porta via $PORT) para Railway/Render/Heroku
  • PAGES   → prepara a pasta /docs/ para deploy via GitHub Pages (branch mode)

Uso
---
    python app.py                # auto-detecta o modo (local ou serve)
    python app.py local          # força modo local
    python app.py serve          # força modo serve (produção)
    python app.py pages          # prepara /docs/ para GitHub Pages
    python app.py check          # apenas valida arquivos do projeto
    python app.py --help         # mostra ajuda

    python app.py local --port 3000      # porta customizada
    python app.py local --force          # força rebuild

Detecção automática
-------------------
    • Se a variável $PORT estiver definida → modo SERVE (cloud hosting)
    • Caso contrário → modo LOCAL

Dependências
------------
    • Python 3.8+
    • Node.js 18+ e Yarn 1.x (para o build do React)
    • Nenhuma biblioteca Python externa
"""

import argparse
import os
import shutil
import subprocess
import sys
import socket
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

# ----------------------------------------------------------------------------
# Configuração
# ----------------------------------------------------------------------------

ROOT = Path(__file__).resolve().parent
FRONTEND = ROOT / "frontend"
BUILD = FRONTEND / "build"
PAGES_DIR = ROOT / "docs"           # GitHub Pages "Deploy from a branch" suporta /docs
DOCS_BUILD = PAGES_DIR
DEFAULT_PORT = 8000

REQUIRED_FILES = [
    "frontend/package.json",
    "frontend/src/index.js",
    "frontend/src/App.js",
    "frontend/src/lib/contact.js",
    "frontend/public/index.html",
]

REQUIRED_COMPONENTS = [
    "Header.jsx", "Hero.jsx", "Products.jsx", "Gallery.jsx",
    "Contact.jsx", "ContactInfo.jsx", "ContactForm.jsx",
    "Footer.jsx", "WhatsAppFloat.jsx",
]


# ----------------------------------------------------------------------------
# Helpers de log
# ----------------------------------------------------------------------------

def _c(text, code):
    """Aplica cor ANSI se for terminal; senão devolve texto puro."""
    if not sys.stdout.isatty():
        return text
    return f"\033[{code}m{text}\033[0m"


def info(msg):  print(f"  {_c('i', '36')}  {msg}")
def ok(msg):    print(f"  {_c('+', '32')}  {msg}")
def warn(msg):  print(f"  {_c('!', '33')}  {msg}")
def err(msg):   print(f"  {_c('x', '31')}  {msg}", file=sys.stderr)
def step(msg):  print(f"\n{_c('>>', '35')} {_c(msg, '1')}")


# ----------------------------------------------------------------------------
# Verificações
# ----------------------------------------------------------------------------

def check_files():
    """Confere se todos os arquivos essenciais do projeto existem."""
    step("Verificando arquivos do projeto")

    missing = [f for f in REQUIRED_FILES if not (ROOT / f).exists()]

    components_dir = FRONTEND / "src" / "components"
    if not components_dir.is_dir():
        missing.append("frontend/src/components/")
    else:
        for comp in REQUIRED_COMPONENTS:
            if not (components_dir / comp).is_file():
                missing.append(f"frontend/src/components/{comp}")

    if missing:
        err("Arquivos essenciais faltando:")
        for m in missing:
            print(f"       - {m}")
        return False

    total = len(REQUIRED_FILES) + len(REQUIRED_COMPONENTS)
    ok(f"Todos os {total} arquivos essenciais estao presentes")
    return True


def check_node():
    """Confere se Node.js e Yarn estão instalados."""
    step("Verificando Node.js e Yarn")
    try:
        node = subprocess.check_output(["node", "--version"], text=True).strip()
        yarn = subprocess.check_output(["yarn", "--version"], text=True).strip()
        ok(f"Node {node}  -  Yarn {yarn}")
        return True
    except FileNotFoundError as e:
        err(f"Nao encontrado: {e.filename}")
        info("Instale o Node.js (LTS) em https://nodejs.org/")
        info("Depois rode: npm install -g yarn")
        return False
    except subprocess.CalledProcessError:
        err("Erro ao executar node/yarn")
        return False


def has_docs_build():
    return DOCS_BUILD.is_dir() and (DOCS_BUILD / "index.html").is_file()


def has_build():
    return (BUILD.is_dir() and (BUILD / "index.html").is_file()) or has_docs_build()


def get_build_dir():
    if BUILD.is_dir() and (BUILD / "index.html").is_file():
        return BUILD
    if has_docs_build():
        return DOCS_BUILD
    return BUILD


def has_node_modules():
    return (FRONTEND / "node_modules").is_dir()


# ----------------------------------------------------------------------------
# Operações
# ----------------------------------------------------------------------------

def install_deps():
    step("Instalando dependencias (yarn install)")
    proc = subprocess.run(
        ["yarn", "install", "--network-timeout", "600000"],
        cwd=FRONTEND,
    )
    if proc.returncode != 0:
        err("Falha em yarn install")
        return False
    ok("Dependencias instaladas")
    return True


def run_build(force=False):
    """Garante que exista um build pronto em frontend/build/ ou em docs/."""
    if has_build() and not force:
        if BUILD.is_dir() and (BUILD / "index.html").is_file():
            ok("Build ja existe em frontend/build/ (use --force para reconstruir)")
        else:
            ok("Build ja existe em docs/ (usando site estatico pre-compilado)")
        return True

    if not has_node_modules():
        if not install_deps():
            return False

    step("Gerando build de producao (yarn build)")
    env = {**os.environ, "CI": "false", "GENERATE_SOURCEMAP": "false"}
    proc = subprocess.run(["yarn", "build"], cwd=FRONTEND, env=env)
    if proc.returncode != 0:
        err("Falha em yarn build")
        return False

    # Garante .nojekyll dentro do build para evitar conflito com Jekyll
    (BUILD / ".nojekyll").touch()
    ok("Build concluido")
    return True


def serve(directory, port, host="0.0.0.0"):
    """Sobe um servidor HTTP estático na pasta indicada."""
    if not directory.is_dir():
        err(f"Diretorio nao existe: {directory}")
        sys.exit(1)

    os.chdir(directory)

    class Handler(SimpleHTTPRequestHandler):
        def log_message(self, fmt, *args):
            sys.stdout.write(
                f"       {self.address_string()} - {fmt % args}\n"
            )

    try:
        srv = HTTPServer((host, port), Handler)
    except OSError as e:
        # Trata portas já em uso tentando encontrar uma porta livre automaticamente
        err(f"Nao foi possivel iniciar servidor em {host}:{port} - {e}")
        # Se for erro de endereço em uso, tenta obter uma porta livre
        if getattr(e, 'errno', None) in (98,):
            info("Porta em uso. Tentando encontrar porta livre automaticamente...")
            try:
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.bind((host, 0))
                alt_port = s.getsockname()[1]
                s.close()
                try:
                    srv = HTTPServer((host, alt_port), Handler)
                    info(f"Usando porta alternativa: {alt_port}")
                    port = alt_port
                except OSError as e2:
                    err(f"Falha ao bindar na porta alternativa {alt_port} - {e2}")
                    info("Libere a porta ou use outra com --port")
                    sys.exit(1)
            except Exception as e3:
                err(f"Erro ao procurar porta livre: {e3}")
                info("Libere a porta ou use outra com --port")
                sys.exit(1)
        else:
            info("Libere a porta ou use outra com --port")
            sys.exit(1)

    print()
    ok(f"Servindo {directory.name}/ em http://localhost:{port}")
    info("Pressione Ctrl+C para parar")
    print()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print()
        info("Servidor encerrado")
        srv.shutdown()


# ----------------------------------------------------------------------------
# Modos de execução
# ----------------------------------------------------------------------------

def mode_local(port, force):
    step("MODO LOCAL")
    if not check_files():   sys.exit(1)
    if not has_build() or force:
        if not check_node():    sys.exit(1)
    if not run_build(force): sys.exit(1)
    serve(get_build_dir(), port)


def mode_serve(force):
    step("MODO SERVE (producao)")
    if not check_files():   sys.exit(1)
    if not has_build() or force:
        if not check_node():    sys.exit(1)
    if not run_build(force): sys.exit(1)
    port = int(os.environ.get("PORT", DEFAULT_PORT))
    serve(get_build_dir(), port)


def mode_pages(force):
    step("MODO GITHUB PAGES")
    if not check_files():   sys.exit(1)
    if not has_build() or force:
        if not check_node():    sys.exit(1)
    if not run_build(force): sys.exit(1)

    build_dir = get_build_dir()
    if build_dir == PAGES_DIR:
        ok(f"Pasta '{PAGES_DIR.name}/' ja esta pronta com o site estatico existente")
        return

    if PAGES_DIR.exists():
        info(f"Limpando pasta existente: {PAGES_DIR.name}/")
        shutil.rmtree(PAGES_DIR)

    step(f"Copiando build para {PAGES_DIR.name}/")
    shutil.copytree(build_dir, PAGES_DIR)
    (PAGES_DIR / ".nojekyll").touch()
    ok(f"Pasta '{PAGES_DIR.name}/' pronta para GitHub Pages")

    print()
    info("Proximos passos:")
    print(f"       1. git add {PAGES_DIR.name}/ && git commit -m 'build: atualiza site'")
    print(f"       2. git push")
    print(f"       3. No GitHub: Settings -> Pages")
    print(f"          - Source: 'Deploy from a branch'")
    print(f"          - Branch: main")
    print(f"          - Folder: /{PAGES_DIR.name}")
    print(f"       4. Aguarde alguns minutos e acesse o site publicado.")


def mode_check():
    step("MODO CHECK")
    files_ok = check_files()
    node_ok = True
    if not has_build():
        node_ok = check_node()
    elif has_docs_build() and not (BUILD.is_dir() and (BUILD / "index.html").is_file()):
        info("Site estatico em docs/ encontrado; Node/Yarn nao sao necessarios para servir esse build.")

    print()
    if BUILD.is_dir() and (BUILD / "index.html").is_file():
        ok("Build encontrado em frontend/build/")
    elif has_docs_build():
        ok("Build encontrado em docs/ (site estatico existente)")
    else:
        info("Sem build ainda (rode 'python app.py local' para gerar)")

    print()
    if files_ok and node_ok:
        ok("Projeto pronto para rodar")
    else:
        err("Ha problemas - veja as mensagens acima")
        sys.exit(1)


# ----------------------------------------------------------------------------
# CLI
# ----------------------------------------------------------------------------

def auto_detect_mode():
    """Detecta o modo apropriado pelo ambiente."""
    if os.environ.get("PORT"):
        # Cloud hosting (Railway, Render, Heroku, Fly.io) define PORT
        return "serve"
    return "local"


def main():
    parser = argparse.ArgumentParser(
        prog="app.py",
        description="Mari Lajes - bootstrap do site (verifica, builda, serve).",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python app.py                        roda o site localmente
  python app.py local --port 3000      roda local em outra porta
  python app.py pages                  prepara /docs/ para GitHub Pages
  python app.py check                  apenas valida arquivos
  python app.py serve                  modo producao (Railway/Render)
""",
    )
    parser.add_argument(
        "mode",
        nargs="?",
        choices=["local", "serve", "pages", "check"],
        help="modo de execucao (se omitido, detecta automaticamente)",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=DEFAULT_PORT,
        help=f"porta do servidor local (padrao: {DEFAULT_PORT})",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="forca rebuild mesmo se ja existir um build",
    )

    args = parser.parse_args()
    mode = args.mode or auto_detect_mode()

    print()
    print(f"  {_c('Mari Lajes', '1;33')} - bootstrap")
    print(f"  modo: {_c(mode, '1;36')}")

    if mode == "local":
        mode_local(args.port, args.force)
    elif mode == "serve":
        mode_serve(args.force)
    elif mode == "pages":
        mode_pages(args.force)
    elif mode == "check":
        mode_check()


if __name__ == "__main__":
    main()
