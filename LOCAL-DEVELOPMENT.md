# Como Rodar o Site Localmente

Este guia explica como rodar a documentação do Sprite Render Tool em localhost para desenvolvimento e testes.

---

## Pré-requisitos

- **Python 3.13** (ou versão compatível)
- **pip** (gerenciador de pacotes Python)

---

## Passo a Passo

### 1. Instalar as Dependências

Abra um terminal na raiz do projeto e execute:

```bash
cd docs
pip install -r requirements.txt
```

Isso instalará:
- `sphinx` (gerador de documentação)
- `sphinx-rtd-theme` (tema Read the Docs)
- `myst-parser` (parser Markdown)
- `sphinx-copybutton` (botão de copiar código)

### 2. Fazer o Build da Documentação

Ainda na pasta `docs`, execute:

```bash
# Usando Python (recomendado se sphinx-build não estiver no PATH)
python -m sphinx -b html . _build/html

# OU se sphinx-build estiver disponível:
sphinx-build -b html . _build/html
```

Isso criará os arquivos HTML na pasta `docs/_build/html/`.

### 3. Rodar um Servidor HTTP Local

Existem várias opções para visualizar o site localmente:

#### Opção A: Usando Python (Recomendado)

Na pasta `docs/_build/html`, execute:

```bash
# Python 3
python -m http.server 8000

# Ou Python 2 (se necessário)
python -m SimpleHTTPServer 8000
```

Depois abra no navegador: **http://localhost:8000**

#### Opção B: Usando Python direto da pasta docs

Você pode rodar o servidor diretamente da pasta `docs`:

```bash
cd docs/_build/html
python -m http.server 8000
```

#### Opção C: Usando Node.js (se tiver instalado)

```bash
cd docs/_build/html
npx http-server -p 8000
```

#### Opção D: Usando PHP (se tiver instalado)

```bash
cd docs/_build/html
php -S localhost:8000
```

---

## Scripts Úteis

O projeto já inclui scripts PowerShell prontos para uso:

### Scripts Disponíveis

- **`build.ps1`**: Faz apenas o build da documentação
- **`build-and-serve.ps1`**: Faz o build e inicia o servidor automaticamente
- **`watch-and-serve.ps1`**: Auto-rebuild quando arquivos mudarem (requer sphinx-autobuild)

### Como Usar os Scripts

**Nota importante**: Se você receber um erro sobre política de execução do PowerShell, veja a seção [Solução de Problemas](#erro-política-de-execução-do-powershell) abaixo.

Execute os scripts na raiz do projeto:

```powershell
# Build simples
.\build.ps1

# Build + servidor
.\build-and-serve.ps1

# Auto-rebuild (recomendado para desenvolvimento)
.\watch-and-serve.ps1
```

### Build e Servidor em um Comando (Linux/Mac)

Crie um arquivo `build-and-serve.sh` na raiz do projeto:

```bash
#!/bin/bash

# Navegar para docs
cd docs

# Fazer build
echo "Building documentation..."
sphinx-build -b html . _build/html

# Verificar se build foi bem-sucedido
if [ $? -eq 0 ]; then
    echo "Build successful! Starting server..."
    echo "Open http://localhost:8000 in your browser"
    
    # Navegar para pasta de build e iniciar servidor
    cd _build/html
    python3 -m http.server 8000
else
    echo "Build failed! Check errors above."
fi
```

Torne executável e execute:
```bash
chmod +x build-and-serve.sh
./build-and-serve.sh
```

---

## Workflow de Desenvolvimento

### Durante o Desenvolvimento

#### Opção 1: Build Manual (Recomendado para iniciantes)

1. **Edite os arquivos** em `docs/en/` ou `docs/pt/`
2. **Faça o build novamente** usando o script:
   ```powershell
   .\build.ps1
   ```
   Ou manualmente:
   ```bash
   cd docs
   python -m sphinx -b html . _build/html
   ```
3. **Recarregue a página** no navegador (F5 ou Ctrl+R)

#### Opção 2: Build e Servidor Automático

Use o script que faz build e inicia o servidor:
```powershell
.\build-and-serve.ps1
```

Isso fará o build e iniciará o servidor automaticamente. Quando você fizer alterações:
1. Pare o servidor (Ctrl+C)
2. Execute `.\build.ps1` novamente
3. Inicie o servidor novamente: `cd docs\_build\html; python -m http.server 8000`

#### Opção 3: Auto-rebuild (Mais Conveniente) ⭐ Recomendado

Para rebuild automático quando você salvar arquivos:

1. **Instale sphinx-autobuild** (apenas uma vez):
   ```powershell
   pip install sphinx-autobuild
   ```

2. **Execute o comando diretamente** (evita problemas de política de execução):
   ```powershell
   cd docs
   python -m sphinx_autobuild . _build/html --host 127.0.0.1 --port 8000 --open-browser
   ```
   
   **Nota**: Use `python -m sphinx_autobuild` (com underscore) em vez de `sphinx-autobuild` para evitar problemas de PATH no Windows.

   **OU use o script** (se a política de execução estiver habilitada):
   ```powershell
   .\watch-and-serve.ps1
   ```

Isso abrirá automaticamente o navegador e fará rebuild toda vez que você salvar um arquivo. **Não precisa fazer nada manualmente!**

### Modo Auto-reload (Opcional)

Para rebuild automático quando arquivos mudarem, você pode usar ferramentas como:

- **sphinx-autobuild**:
  ```bash
  pip install sphinx-autobuild
  cd docs
  python -m sphinx_autobuild . _build/html --host 127.0.0.1 --port 8000 --open-browser
  ```
  Isso abrirá automaticamente http://localhost:8000 e recarregará quando você salvar arquivos.
  
  **Nota Windows**: Use `python -m sphinx_autobuild` (com underscore) em vez de `sphinx-autobuild` para evitar problemas de PATH.

---

## Solução de Problemas

### Erro: "sphinx-build: command not found" ou "sphinx-autobuild: command not found"
- Use `python -m sphinx` em vez de `sphinx-build`
- Use `python -m sphinx_autobuild` em vez de `sphinx-autobuild`
- Certifique-se de que o Sphinx foi instalado: `pip install -r docs/requirements.txt`
- Verifique se está usando o Python correto: `python --version`

### Erro: "ModuleNotFoundError"
- Instale as dependências: `pip install -r docs/requirements.txt`
- Se usar ambiente virtual, ative-o primeiro

### Porta 8000 já está em uso
- Use outra porta: `python -m http.server 8080`
- Ou pare o processo que está usando a porta 8000

### Mudanças não aparecem no navegador
- Faça o build novamente: `sphinx-build -b html . _build/html`
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se está editando os arquivos corretos em `docs/en/` ou `docs/pt/`

### Erro: Política de Execução do PowerShell

Se você receber o erro:
```
running scripts is disabled on this system
```

**Solução 1 (Recomendada)**: Execute o comando diretamente sem usar scripts:
```powershell
cd docs
python -m sphinx -b html . _build/html
# ou para auto-rebuild:
python -m sphinx_autobuild . _build/html --host 127.0.0.1 --port 8000 --open-browser
```

**Solução 2**: Habilitar execução de scripts (apenas se quiser usar os scripts):
1. Abra PowerShell como **Administrador**
2. Execute:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Confirme com `Y`

### Erros de build
- Verifique os logs de erro no terminal
- Certifique-se de que todos os arquivos Markdown estão com sintaxe correta
- Verifique se todos os arquivos referenciados existem

---

## Estrutura de Pastas

```
Sprite-Render-Tool-Wiki/
├── docs/                    # Pasta principal da documentação
│   ├── _build/              # Pasta gerada pelo build (não commitar)
│   │   └── html/            # Arquivos HTML finais (servir daqui)
│   ├── _static/             # Arquivos estáticos (CSS, JS customizados)
│   ├── en/                  # Documentação em inglês
│   ├── pt/                  # Documentação em português
│   ├── assets/              # Imagens, favicons, etc.
│   ├── conf.py              # Configuração do Sphinx
│   └── requirements.txt     # Dependências Python
└── ...
```

---

## Dicas

- **Mantenha o servidor rodando** enquanto desenvolve para ver mudanças rapidamente
- **Use um editor com preview** se quiser ver Markdown antes do build
- **Faça commits frequentes** para não perder trabalho
- **Teste em diferentes navegadores** antes de fazer push

---

---

## Resumo Rápido

### Para começar rapidamente:

```powershell
# 1. Instalar dependências (apenas uma vez)
cd docs
pip install -r requirements.txt
pip install sphinx-autobuild

# 2. Iniciar servidor com auto-rebuild
python -m sphinx_autobuild . _build/html --host 127.0.0.1 --port 8000 --open-browser
```

Pronto! O navegador abrirá automaticamente e o site será rebuildado sempre que você salvar arquivos.

---

**Última atualização**: 2024-12-01

