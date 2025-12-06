# 🚀 Deploy Automático da Documentação

Este repositório usa **GitHub Actions** para fazer build e deploy automático da documentação Sphinx no GitHub Pages.

## 📋 Como Funciona

1. **Push na branch `main`** → Dispara o workflow automaticamente
2. **Build da documentação** → Sphinx gera HTML em `docs/_build/html/`
3. **Deploy para `gh-pages`** → Conteúdo é publicado automaticamente
4. **GitHub Pages** → Serve a documentação em `https://lochzin.github.io/Sprite-Render-Tool-Wiki/`

## 🔧 Configuração

### Pré-requisitos

- Repositório no GitHub
- Branch `main` com a documentação
- Permissões de escrita habilitadas para GitHub Actions

### Passos

1. **Habilitar GitHub Pages:**
   - Vá em **Settings** → **Pages**
   - Selecione **Source**: Branch `gh-pages` / Folder `/ (root)`
   - Salve

2. **Verificar Permissões:**
   - **Settings** → **Actions** → **General**
   - **Workflow permissions**: Read and write permissions
   - Salve

3. **Primeiro Deploy:**
   - Faça um push na branch `main`
   - O workflow criará a branch `gh-pages` automaticamente
   - Aguarde alguns minutos para o GitHub Pages processar

## 📁 Estrutura

```
.github/
  workflows/
    docs.yml          # Workflow de build e deploy

docs/
  conf.py             # Configuração Sphinx
  index.rst           # Índice principal
  requirements.txt    # Dependências Python
  _build/
    html/             # HTML gerado (não commitado)
      .nojekyll       # Criado automaticamente
```

## 🔍 Verificação

Após o deploy, verifique:

- ✅ Workflow executado com sucesso em **Actions**
- ✅ Branch `gh-pages` criada/atualizada
- ✅ Documentação acessível em: https://lochzin.github.io/Sprite-Render-Tool-Wiki/

## 🛠️ Build Local

Para testar localmente:

```bash
cd docs
pip install -r requirements.txt
sphinx-build -b html . _build/html
```

Abra `docs/_build/html/index.html` no navegador.

## 📝 Notas

- O workflow executa apenas quando há mudanças em `docs/` ou no próprio workflow
- O deploy faz **force push** na `gh-pages` para garantir conteúdo limpo
- O arquivo `.nojekyll` é criado automaticamente para compatibilidade com GitHub Pages

## 🔗 Links Úteis

- [Documentação GitHub Actions](https://docs.github.com/en/actions)
- [Documentação GitHub Pages](https://docs.github.com/en/pages)
- [Documentação Sphinx](https://www.sphinx-doc.org/)

---

**Última atualização**: 2024-12-XX

