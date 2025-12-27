# Instalação

Esta página fornece instruções detalhadas sobre como instalar e atualizar o **Sprite Render Tool** no Blender.

---

## Requisitos

- **Blender 5.0.0** ou mais recente
- Arquivo do add-on: `Sprite Render Tool.zip`

---

## Instalação Inicial

### Passo a Passo

1. **Abra o Blender**
   - Inicie o Blender (versão 5.0.0 ou mais recente)

2. **Acesse as Preferências**
   - Vá em `Edit > Preferences...` (ou `Blender > Preferences...` no macOS)
   - Clique na aba **Add-ons** no menu lateral

3. **Instale o Add-on**
   - No topo da janela de Add-ons, localize a **setinha** (▼) ao lado do botão de tags
   - Clique na setinha para abrir o menu
   - Selecione **Install from disk...** (Instalar do disco)
   - Navegue até o arquivo `Sprite Render Tool.zip`
   - Selecione o arquivo e clique em **Install Add-on**

4. **Ative o Add-on**
   - Na lista de add-ons, procure por **Sprite Render Tool**
   - Marque a caixa de seleção ao lado do nome do add-on para ativá-lo
   - O add-on agora está instalado e pronto para uso

5. **Localize o Painel**
   - O painel do Sprite Render Tool aparecerá em:
     - `3D Viewport > Sidebar (N) > Sprite Render`

---

## Verificação da Instalação

Após a instalação, você pode verificar se o add-on foi instalado corretamente:

- **No painel Add-ons:**
  - O add-on deve aparecer na lista com uma caixa de seleção marcada
  - Você pode ver informações sobre o add-on, incluindo versão e autor

- **No 3D Viewport:**
  - Abra a sidebar pressionando `N` no 3D Viewport
  - Procure pela aba **Sprite Render**
  - Você deve ver o painel principal com todas as tabs (Info, Setup, Cameras, Animations, Render)

---

## Atualizando o Add-on

### Método Recomendado: Desinstalar e Reinstalar

Para evitar problemas com versões duplicadas, é **altamente recomendado** desinstalar a versão antiga antes de instalar uma nova:

1. **Desinstale a Versão Antiga**
   - Vá em `Edit > Preferences... > Add-ons`
   - Procure por "Sprite Render Tool" na lista
   - Clique no botão **Uninstall** ao lado do add-on
   - Isso remove completamente a versão antiga

2. **Instale a Nova Versão**
   - Siga os passos de **Instalação Inicial** acima
   - Use o arquivo ZIP da nova versão

3. **Verifique a Instalação**
   - Confirme que apenas uma versão do add-on aparece na lista
   - Verifique que o painel funciona corretamente

### ⚠️ Problemas com Versões Duplicadas

Se você encontrar bugs ou comportamentos estranhos após uma atualização, pode ser que versões duplicadas estejam instaladas:

**Solução:**
1. Vá em `Edit > Preferences... > Add-ons`
2. Procure por **todas** as instâncias de "Sprite Render Tool" na lista
3. Clique em **Uninstall** para **cada** instância encontrada
4. **Reinicie o Blender** completamente
5. Instale a **versão mais recente** seguindo os passos de instalação acima

---

## Desinstalação

Para remover completamente o add-on:

1. Vá em `Edit > Preferences... > Add-ons`
2. Procure por "Sprite Render Tool" na lista
3. Clique no botão **Uninstall**
4. O add-on será completamente removido do Blender

**Nota:** Isso remove apenas o add-on. Seus arquivos de projeto e configurações do Blender não são afetados.

---

## Solução de Problemas

### O add-on não aparece na lista após instalação

- Verifique se você está usando Blender 5.0.0 ou mais recente
- Certifique-se de que o arquivo ZIP não está corrompido
- Tente reinstalar o add-on

### O painel não aparece no 3D Viewport

- Verifique se o add-on está ativado em `Edit > Preferences... > Add-ons`
- Certifique-se de estar no **3D Viewport** (não em outras áreas como Shader Editor ou Animation)
- Pressione `N` para abrir a sidebar se ela estiver fechada
- Procure pela aba **Sprite Render** na sidebar

### Erros ao carregar o add-on

- Verifique se você tem a versão correta do Blender (5.0.0+)
- Certifique-se de que não há versões duplicadas instaladas
- Verifique o console do Blender para mensagens de erro específicas
- Tente desinstalar e reinstalar o add-on

---

## Próximos Passos

Após a instalação bem-sucedida:

1. **Configure seu Projeto**
   - Leia o [Guia Básico](index.md#guia-básico) na página principal
   - Configure o Project Name e Object Name na tab **Setup**

2. **Explore a Documentação**
   - [Câmeras](Cameras.md) - Como configurar câmeras
   - [Iluminação](Lighting.md) - Sistema Light Pivot
   - [Animações](Animations.md) - Modos de animação
   - [Renderização](Render.md) - Configurações de renderização
   - [Saída](Output.md) - Estrutura de pastas e nomes de arquivos

3. **Consulte o FAQ**
   - Veja a página [FAQ](FAQ.md) para perguntas comuns e soluções

---

## Suporte

Se você encontrar problemas durante a instalação:

- **FAQ**: Consulte a página [FAQ](FAQ.md) para soluções comuns
- **GitHub Issues**: Reporte problemas em [GitHub Issues](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/issues)
- **GitHub Discussions**: Participe de discussões em [GitHub Discussions](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/discussions)

