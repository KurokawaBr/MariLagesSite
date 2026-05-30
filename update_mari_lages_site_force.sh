#!/usr/bin/env bash
set -euo pipefail

# Script para criar backup remoto e forçar push para MariLagesSite
# Uso:
#   GITHUB_TOKEN=... ./update_mari_lages_site_force.sh
# ou
#   USE_SSH=1 ./update_mari_lages_site_force.sh
# ou
#   edite GITHUB_TOKEN abaixo e rode: ./update_mari_lages_site_force.sh

# ====== CONFIGURAÇÃO ======
# Cole seu GitHub token aqui (ou deixe vazio e use via variável de ambiente)
GITHUB_TOKEN=""

REPO_HOST="github.com"
REPO_PATH="KurokawaBr/MariLagesSite"
BACKUP_REF="backup-before-update"

# Verifica que estamos em um repositório git
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Erro: este diretório não é um repositório git. Rode no diretório do repositório local."
  exit 2
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ -n "${USE_SSH:-}" ]]; then
  TARGET_URL="git@${REPO_HOST}:${REPO_PATH}.git"
else
  if [[ -n "${GITHUB_TOKEN:-}" ]]; then
    TARGET_URL="https://${GITHUB_TOKEN}@${REPO_HOST}/${REPO_PATH}.git"
  else
    TARGET_URL="https://${REPO_HOST}/${REPO_PATH}.git"
  fi
fi

cat <<EOF
Repo alvo: $TARGET_URL
Branch atual: $BRANCH
Backup remoto: target:$BACKUP_REF
EOF

git status --porcelain

echo
read -r -p "Continuar com criação de backup remoto e push forçado para $TARGET_URL? (y/N): " ans
if [[ "$ans" != "y" && "$ans" != "Y" ]]; then
  echo "Abortando."
  exit 0
fi

# (Re)configura remote 'target'
git remote remove target 2>/dev/null || true
git remote add target "$TARGET_URL"

echo "Buscando refs do remote target..."
git fetch target

echo "Criando backup remoto em target:$BACKUP_REF..."
git push target HEAD:"$BACKUP_REF"

echo
read -r -p "CONFIRME que deseja sobrescrever 'main' do repo alvo. Digite 'FORCE' para prosseguir: " confirm
if [[ "$confirm" != "FORCE" ]]; then
  echo "Confirmação faltando. Abortando."
  exit 0
fi

echo "Fazendo push --force para target main (DESTRUTIVO)..."
git push --force target main

echo "Push concluído. Backup remoto em target:$BACKUP_REF"
