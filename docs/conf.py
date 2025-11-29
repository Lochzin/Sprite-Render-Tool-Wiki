# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Sprite Render Tool'
copyright = '2024, Sprite Render Tool'
author = 'Sprite Render Tool'
release = '0.2.2'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'myst_parser',
    'sphinx_copybutton',
]

# Source file extensions - MyST parser automatically registers .md
source_suffix = ['.rst', '.md']

# Master document (entry point)
master_doc = 'index'

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'README*.md', 'Gemfile*', '_includes', '_layouts', '_config.yml', 'index.md', 'favicon.ico']

# -- Options for MyST Parser -------------------------------------------------
# https://myst-parser.readthedocs.io/en/latest/configuration.html

myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "dollarmath",
    "fieldlist",
    "html_admonition",
    "html_image",
    "replacements",
    "smartquotes",
    "strikethrough",
    "substitution",
    "tasklist",
]

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_baseurl = 'https://lochzin.github.io/Sprite-Render-Tool-Wiki/'
html_static_path = ['_static', 'assets']
html_favicon = 'assets/images/favicon/favicon.ico'
html_logo = 'assets/images/SpriteRenderTool_Icon.png'

html_theme_options = {
    'logo_only': False,
    'prev_next_buttons_location': 'bottom',
    'style_external_links': False,
    'vcs_pageview_mode': '',
    'style_nav_header_background': '#2980B9',
    # Toc options
    'collapse_navigation': True,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'includehidden': True,
    'titles_only': False
}

# -- Internationalization ----------------------------------------------------
# https://www.sphinx-doc.org/en/stable/usage/configuration.html#options-for-internationalization

language = 'en'
locale_dirs = ['locale/']
gettext_compact = False

