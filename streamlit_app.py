import re
from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components


ROOT = Path(__file__).resolve().parent
DOCS = ROOT / "docs"
INDEX = DOCS / "index.html"


def inline_assets(html: str) -> str:
    # Inline CSS files referenced as ./static/css/...
    def _css(m):
        href = m.group(1)
        path = (DOCS / href.lstrip("./"))
        if path.exists():
            return f"<style>\n{path.read_text(encoding='utf-8')}\n</style>"
        return m.group(0)

    html = re.sub(r'<link[^>]+href="(\./static/css/[^"]+)"[^>]*>', _css, html)

    # Inline JS files referenced as ./static/js/...
    def _js(m):
        src = m.group(1)
        path = (DOCS / src.lstrip("./"))
        if path.exists():
            return f"<script>\n{path.read_text(encoding='utf-8')}\n</script>"
        return m.group(0)

    html = re.sub(r'<script[^>]+src="(\./static/js/[^"]+)"></script>', _js, html)

    return html


def main():
    st.set_page_config(layout="wide")

    if not INDEX.exists():
        st.error("Arquivo docs/index.html nao encontrado. Gere o build em docs/ ou commit o build no repo.")
        return

    raw = INDEX.read_text(encoding='utf-8')
    merged = inline_assets(raw)

    # Render the prebuilt site inside Streamlit via a components HTML block.
    components.html(merged, height=900, scrolling=True)


if __name__ == "__main__":
    main()
