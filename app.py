import streamlit as st
import streamlit.components.v1 as components
from pathlib import Path

st.set_page_config(
    page_title="PFM Retail Potential Scan",
    page_icon="📍",
    layout="wide",
    initial_sidebar_state="collapsed"
)

base_dir = Path(__file__).parent
html = (base_dir / "index.html").read_text(encoding="utf-8")
pricing_config = (base_dir / "pricing-config.js").read_text(encoding="utf-8")

# Streamlit components.html renders the HTML in an iframe and does not reliably
# serve sibling JS files. Keep index.html browser-friendly with a script src,
# but inline pricing-config.js at runtime inside Streamlit.
html = html.replace(
    '<script src="pricing-config.js"></script>',
    "<script>\n" + pricing_config + "\n</script>"
)

components.html(html, height=940, scrolling=True)
