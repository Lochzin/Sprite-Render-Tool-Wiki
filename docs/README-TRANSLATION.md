# Configuração de Tradução no Read the Docs

Para que as traduções funcionem corretamente no Read the Docs, você precisa configurar versões separadas para cada idioma.

## Passos para Configurar:

1. **Acesse o painel do Read the Docs:**
   - https://readthedocs.org/dashboard/
   - Entre no projeto `sprite-render-tool-wiki`

2. **Vá em Settings → Versions**

3. **Crie versões separadas:**
   - **Versão "latest"** (ou "en"):
     - Branch: `main`
     - Language: `English`
     - Active: ✅
     - Public: ✅
   
   - **Versão "pt"**:
     - Branch: `main` (mesma branch)
     - Language: `Portuguese`
     - Active: ✅
     - Public: ✅

4. **Configure o build para cada versão:**
   - Para a versão "latest": use `index_en.rst` como master doc
   - Para a versão "pt": use `index_pt.rst` como master doc

5. **Alternativa mais simples (recomendada):**
   - Mantenha apenas a versão "latest"
   - Use o `index.rst` principal que já tem links para ambos os idiomas
   - Os usuários podem navegar entre idiomas usando os links

## Estrutura Atual:

- `index.rst` - Página principal com links para ambos idiomas
- `index_en.rst` - Versão em inglês (pode ser usado como master doc separado)
- `index_pt.rst` - Versão em português (pode ser usado como master doc separado)
- `en/` - Conteúdo em inglês
- `pt/` - Conteúdo em português

## URLs Resultantes:

- Inglês: `https://sprite-render-tool-wiki.readthedocs.io/en/latest/` (ou `/en/`)
- Português: `https://sprite-render-tool-wiki.readthedocs.io/pt/latest/` (ou `/pt/`)

