# Configuração do GitHub Pages

Este documento explica como configurar o GitHub Pages para servir a documentação Sphinx automaticamente.

## Configuração Inicial

### 1. Habilitar GitHub Pages no Repositório

1. Vá para **Settings** do repositório no GitHub
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Clique em **Save**

### 2. Verificar Permissões do Workflow

O workflow `.github/workflows/docs.yml` já está configurado com as permissões corretas:
- `contents: write` - Para fazer push na branch `gh-pages`

Se necessário, você pode ajustar as permissões em:
- **Settings** → **Actions** → **General** → **Workflow permissions**
- Selecione **Read and write permissions**

### 3. Primeira Execução

Após fazer push na branch `main`:
1. O workflow será executado automaticamente
2. A branch `gh-pages` será criada automaticamente (se não existir)
3. A documentação será publicada em: `https://<seu-usuario>.github.io/<nome-do-repo>/`

## Estrutura do Deploy

```
gh-pages (branch)
├── .nojekyll          # Previne processamento Jekyll
├── index.html         # Página principal
├── en/                # Documentação em inglês
├── pt/                # Documentação em português
├── _static/           # Arquivos estáticos
└── ...                # Outros arquivos gerados pelo Sphinx
```

## Troubleshooting

### A documentação não aparece

1. Verifique se a branch `gh-pages` foi criada:
   ```bash
   git branch -a | grep gh-pages
   ```

2. Verifique se o workflow foi executado:
   - Vá para **Actions** no GitHub
   - Procure por "Build and Deploy Documentation"
   - Verifique se houve erros

3. Verifique as configurações do GitHub Pages:
   - **Settings** → **Pages**
   - Certifique-se de que está apontando para a branch `gh-pages`

### Erro de permissões

Se o workflow falhar com erro de permissões:
1. Vá para **Settings** → **Actions** → **General**
2. Em **Workflow permissions**, selecione **Read and write permissions**
3. Salve as alterações

### Build falha

1. Verifique os logs do workflow em **Actions**
2. Certifique-se de que `docs/requirements.txt` está atualizado
3. Teste o build localmente:
   ```bash
   cd docs
   pip install -r requirements.txt
   sphinx-build -b html . _build/html
   ```

## Atualização Manual

Se precisar atualizar manualmente:

```bash
# Build local
cd docs
pip install -r requirements.txt
sphinx-build -b html . _build/html

# Criar .nojekyll
touch _build/html/.nojekyll

# Deploy manual (se necessário)
cd _build/html
git init
git add -A
git commit -m "Manual deploy"
git remote add origin https://github.com/<usuario>/<repo>.git
git push -f origin gh-pages
```

## Notas

- O workflow faz **force push** na branch `gh-pages` para garantir um deploy limpo
- O arquivo `.nojekyll` é criado automaticamente para evitar problemas com arquivos que começam com `_`
- A documentação é atualizada automaticamente a cada push na branch `main`

