# Polyglot - Suporte a Múltiplos Idiomas

Este site usa o plugin **Polyglot** para suporte a múltiplos idiomas.

## Estrutura de Pastas

- `en/` - Conteúdo em inglês (idioma padrão)
- `pt/` - Conteúdo em português

## Como Adicionar Conteúdo em Português

1. Copie o arquivo de `en/` para `pt/`
2. Traduza o conteúdo mantendo o mesmo nome do arquivo
3. O Polyglot automaticamente criará os links entre as versões

**Exemplo:**
- `en/index.md` → `pt/index.md`
- `en/Animations.md` → `pt/Animations.md`

## Seletor de Idioma

O seletor de idioma está disponível via `{% include language-switcher.html %}`.

Para adicionar em uma página, inclua no front matter ou no layout.

## URLs

- Inglês: `/en/` ou `/` (padrão)
- Português: `/pt/`

## Configuração

A configuração está em `_config.yml`:

```yaml
languages: ["en", "pt"]
default_lang: "en"
```

## Build

O site é construído automaticamente via GitHub Actions quando você faz push para a branch `main`.

