# Sprite Render Tool — Wiki Oficial

Add-on para **Blender** focado em gerar sprites 2D a partir de animações 3D, com **suporte multi‑câmera**, **detecção automática de animações** (Actions e NLA), e **nomenclatura de arquivos altamente personalizável**, ideal para jogos 2D e pipelines de sprites.

> **Começando agora?** Comece por **[Guias e Workflows](Guides.md)**: um guia básico passo a passo e sete workflows testados (8 direções, conjuntos para engine, Mixamo, NLA, Frame Ranges, dois armatures, Light Pivot).

---

## Visão Geral

**Sprite Render Tool** é um add-on que:
- **Renderiza animações como sprites**: itera sobre os frames de Actions ou NLA strips e salva cada frame como uma imagem.
- **Suporta múltiplas câmeras**: você define uma lista de câmeras, ordem de renderização e nomes de saída opcionais personalizados.
- **Controla iluminação via um pivô**: usa um objeto pivô para rotacionar a "luz" em relação à câmera (ótimo para sprites isométricos/top‑down).
- **Gera pastas de saída organizadas**: estrutura diretórios por projeto, objeto, animação e câmera.
- **Fornece um painel de teste de animações**: visualiza Actions ou NLA diretamente do add-on.
- **Mostra progresso e permite cancelamento**: barra de progresso integrada, botão de cancelar e suporte à tecla ESC durante a renderização.
- **Verifica a configuração antes de renderizar**: um checklist com botões **Fix** de um clique e um diálogo de confirmação com número de imagens e tempo estimado.
- **Restaura a cena**: Actions, NLA, timeline, resolução, câmera e luz voltam ao que eram quando o render termina.
- **Interface em português**: painéis e tooltips são traduzidos quando o Blender está em português.

Funciona com Blender **5.0.0+**.

---

## Instalação

Para instruções detalhadas de instalação, atualização e solução de problemas, consulte a página dedicada: **[Instalação](Installation.md)**.

**Resumo rápido:**
- **Arquivo do add-on**: `Sprite Render Tool.zip`
- **Compatibilidade**: Blender 5.0.0 ou mais recente
- **Localização**: `Edit > Preferences... > Add-ons` → Clique na setinha (▼) → **Install from disk...** → Selecione o arquivo ZIP → Ative o add-on
- **Painel**: `View3D > Sidebar (N) > Sprite Render > Sprite Render`

---

## Painel Principal (UI)

O add-on fica em `3D Viewport > Sidebar (N) > Sprite Render`. É **um painel principal** com duas partes:

- **No topo**: o botão **Render All**. Durante o render ele é trocado pela barra de progresso, a linha de status e o **Cancel Render**. Essa parte aparece em todas as abas.
- **Abaixo**: uma coluna de **botões laterais só com ícone** (as abas) à esquerda, e o conteúdo da aba selecionada à direita. A aba selecionada fica destacada, e cada botão mostra um tooltip ao passar o mouse. A aba aberta por padrão é **Setup**.

| Ícone | Aba | Conteúdo |
| --- | --- | --- |
| Info (i) | **Info** (Informações) | versão, autor, links de documentação |
| Engrenagem | **Setup** (Configuração) | seções **Project & Output**, **Light Pivot** e **Armature** |
| Câmera | **Cameras** (Câmeras) | criar / detectar câmeras, lente, lista de câmeras |
| Armadura | **Animations** (Animações) | modo de animação, listas de animações, preview |
| Render still | **Render** | seção **Render Settings**: checklist, resolução, Frame Step, Test Cameras |

As abas, de cima para baixo, são: Info, Setup, Cameras, Animations, Render. As seções com um pequeno ícone de ajuda (?) no cabeçalho (Project & Output, Light Pivot, Cameras, Animations, Render Settings) abrem a página correspondente desta wiki (sempre em inglês).

Com o Blender em português, os nomes aparecem traduzidos. Esta wiki usa os nomes em inglês.

![Sidebar](/_static/images/SRT_Sidebar.png)

### Render All e progresso (topo do painel)

- **Render All**: inicia o render. Fica desabilitado (cinza) enquanto o checklist tiver erros (o tooltip mostra o primeiro). Antes de iniciar, abre um diálogo de confirmação (veja [Render](Render.md)).
- **Durante o render**: o botão é trocado pela barra de progresso nativa do Blender (`Rendering atual/total (porcentagem%)`), uma linha de status (animação, frame, câmera e tempo restante estimado) e um botão vermelho **Cancel Render**. **ESC** também cancela.

### Aba Info

Versão (lida do próprio add-on), autor, **Open Documentation**, **Changelog**, **Future Features** e **License**.

![Aba Info](/_static/images/SRT_InfoTab.png)

### Aba Setup

- Seção **Project & Output**:
  - `Project Name`, `Object Name`
  - `Output Folder` (padrão `//sprites/`) e, ao lado, um botão que abre uma pasta no explorador de arquivos. Deixe o campo vazio para usar o Output Path da cena (comportamento legado)
  - Modelo `Output Name` (padrão `$objectName_$animation_$frame`), botões que acrescentam `projectName`, `objectName`, `animation`, `camera`, `frame`, e os modelos prontos **Default** e **Per camera**
  - **First image will be saved as:** o caminho real da primeira imagem, com avisos do modelo e colisões de nomes
  - **Available Placeholders** (recolhível): variáveis e uma prévia do nome
  - **Create Folders**: `Project`, `Object`, `Animation`, `Camera`, mais `Clean Action Names` e `Restart Frame Numbering Per Camera` (ambos desligados por padrão)
- Seção **Light Pivot**: `Enable Light Pivot`, `Object` (o pivô, mostrado quando habilitado) e `Enable Full Rotation (XYZ)`
- Seção **Armature**: `Armature`, a armadura alvo. É a mesma configuração do campo `Armature` da aba Animations

Veja [Output](Output.md) e [Lighting](Lighting.md).

![Aba Setup: Project & Output, Light Pivot e Armature](/_static/images/SRT_SetupTab.png)

### Aba Cameras

- Caixa **Create Cameras**: `Preset`, `Cameras` (só no preset Custom), `Elevation`, `Target Height`, `Distance`, **Create Cameras**
- **Detect Cameras**
- **Lens Settings**: `Type`, `Focal Length` / `Orthographic Scale`, **Desync Shift X / Y**, `Shift X` / `Y`, `Clip Start` / `End`
- `Custom Output Names`
- **Cameras (render order)**: a lista com `+`, `-`, mover para cima / baixo e um ícone "ver pela câmera" em cada linha; a câmera selecionada mostra `Camera`, `Output Name` (com Custom Output Names ligado), Shift individual (quando dessincronizado) e `Light Rotation`

Veja [Cameras](Cameras.md).

![Aba Cameras: Create Cameras, Lens Settings e lista de câmeras](/_static/images/SRT_CameraTab.png)

### Aba Animations

- `Animation Mode`: **Use Actions** (padrão), **Use NLA**, **Static Render**, **Frame Ranges**
- `Armature` (modos Actions, NLA e Frame Ranges; obrigatória nos dois primeiros, no Frame Ranges só serve para avisar sobre a Action ativa dela)
- A lista do modo atual, com botões `+` / `-`, os campos do item selecionado, **Enable All** / **Disable All** e o botão **Detect**
- `Preview FPS` + **Apply**
- **Animation Test** (recolhível, modos Actions e NLA): **Preview Action** / **Preview NLA Strip**, **Stop Preview** (ou **Restore Scene** quando a reprodução já parou), contador de frames e botões primeiro / anterior / próximo / último

Veja [Animations](Animations.md).

![Aba Animations com a lista de actions](/_static/images/SRT_AnimationTab.png)

### Aba Render

Seção **Render Settings**:
- **Checklist** ("Ready to render?"): problemas com botões **Fix** e o resumo de imagens / tempo
- **Resolution** X / Y
- **Frame Step**: `Enable Frame Step`, `Step`, **Test Frame Count**
- **Test Cameras**

Veja [Render](Render.md).

![Aba Render: checklist, resolução e Frame Step](/_static/images/SRT_RenderTab.png)

### Idioma

Se o idioma do Blender for português (Brasil ou Portugal), os painéis, tooltips e mensagens aparecem em português. Qualquer outro idioma mostra inglês.

---

## Guia Básico

Um resumo curto para renderizar seus primeiros sprites. O passo a passo completo, com uma imagem por etapa, a pasta gerada e **sete workflows prontos** (8 direções, conjuntos para engine de jogo, Mixamo, NLA, Frame Ranges, dois armatures e Light Pivot) está na página **[Guias e Workflows](Guides.md)**.

1. **Light Pivot**: crie um Empty no centro do personagem, faça a luz **filha** dele e, em **Setup > Light Pivot**, marque `Enable Light Pivot` e escolha-o como `Object`.
2. Aba **Cameras**: **Create Cameras** (escolha um `Preset`) ou **Detect Cameras**.
3. Aba **Animations**: escolha `Animation Mode` e `Armature`, depois **Detect Actions** / **Detect NLA Strips** (ou `+` para um intervalo de frames); deixe habilitadas só as animações que quiser.
4. Aba **Setup**, **Project & Output**: defina `Project Name`, `Object Name` e `Output Folder`, e confira "First image will be saved as:".
5. Aba **Render**: leia o checklist (use os botões **Fix**) e defina a resolução.
6. **Render All** (topo do painel), confira o diálogo e clique em **Render**. **ESC** ou **Cancel Render** para depois do frame atual.

Veja [Guias e Workflows](Guides.md#guia-básico) para o guia completo.

---

## Estrutura de Arquivos Gerada

- **Pasta base**: a `Output Folder` (ou, quando vazia, a parte de pasta do Output Path da cena).
- **Níveis de pasta opcionais**: `Project`, `Object`, `Animation`, `Camera`.
- **Nome do arquivo**: montado a partir do `Output Name`:
  - substitui `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`;
  - caracteres inválidos viram `_` em nomes de arquivo **e** de pasta;
  - sempre `.png`.

Se **`$camera` não estiver presente** no modelo, o add-on usa um contador sequencial por animação (em vez do número do frame da timeline) para evitar conflitos de nome entre câmeras.

---

## Licença e Termos Comerciais (Resumo)

Baseado em `LICENSE.md`:
- **Conformidade GPL**: o código segue os requisitos legais impostos pela API do Blender.
- **Termos de distribuição comercial**:
  - Uma compra concede direitos de uso (pessoal ou profissional) e acesso a **atualizações** e **suporte oficial**.
  - Redistribuições de terceiros, mesmo que permitidas pelo GPL, **não incluem suporte ou atualizações garantidas**.
  - Compartilhar o download comprado viola o acordo de compra.

Para detalhes completos, consulte a página dedicada: **[Licença](License.md)**.

---

## Suporte e Comunidade

- **Discussões da Comunidade**: Participe de discussões, faça perguntas e compartilhe dicas com outros usuários em [GitHub Discussions](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/discussions)
- **Reportar Problemas**: Encontrou um bug ou tem um problema técnico? Reporte em [GitHub Issues](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/issues)
- **FAQ**: Consulte a página [FAQ](FAQ.md) para perguntas comuns e soluções

