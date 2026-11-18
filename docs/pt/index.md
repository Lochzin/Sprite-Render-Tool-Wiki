# Sprite Render Tool — Wiki Oficial

Add-on para **Blender** focado em gerar sprites 2D a partir de animações 3D, com **suporte multi‑câmera**, **detecção automática de animações** (Actions e NLA), e **nomenclatura de arquivos altamente personalizável**, ideal para jogos 2D e pipelines de sprites.

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

O add-on fica em `3D Viewport > Sidebar (N) > Sprite Render`. É **um painel principal com sub-painéis**, na ordem do fluxo de trabalho (não há abas). Os sub-painéis com o ícone de ajuda (?) no cabeçalho abrem a página correspondente desta wiki (sempre em inglês).

Com o Blender em português, os nomes aparecem traduzidos. Esta wiki usa os nomes em inglês, com o nome em português entre parênteses na primeira vez.

| Ordem | Painel | Função |
| --- | --- | --- |
| – | **Sprite Render** (principal) | Render All, progresso, guia Start Here |
| 1 | **1. Project & Output** (1. Projeto e Saída) | nomes, pasta de saída, modelo do nome do arquivo, pastas |
| 2 | **2. Character & Animations** (2. Personagem e Animações) | modo de animação, armadura, listas de animações, preview |
| 3 | **3. Cameras** (3. Câmeras) | criar / detectar câmeras, lente, lista de câmeras |
| 4 | **4. Light** (4. Luz) | Pivô de Luz |
| 5 | **5. Render Settings** (5. Configurações de Render) | checklist, resolução, Frame Step, Test Cameras |
| – | **Info** (Informações; fechado por padrão) | versão, autor, documentação |

### Sprite Render (painel principal)

- **Render All**: inicia o render. Fica desabilitado (cinza) enquanto o checklist tiver erros (o tooltip mostra o primeiro). Antes de iniciar, abre um diálogo de confirmação (veja [Render](Render.md)).
- **Durante o render**: o botão é trocado pela barra de progresso nativa do Blender (`Rendering atual/total (porcentagem%)`), uma linha de status (animação, frame, câmera e tempo restante estimado) e um botão vermelho **Cancel Render**. Isso aparece com qualquer sub-painel aberto. **ESC** também cancela.
- **Start Here** (Comece Aqui; só até existirem câmeras e animações, e nunca durante o render):
  1. **Cameras**: **Create** (cria o preset de câmeras) e **Detect** (adiciona as câmeras visíveis da cena). Aparece com um check quando a lista já tem câmeras.
  2. **Animations**: **Detect Actions**, **Detect NLA Strips** ou **Add Frame Range**, conforme o Animation Mode. No modo **STATIC** este passo já conta como feito.
  3. Defina a pasta de saída (Project & Output).
  4. Clique em Render All.

### 1. Project & Output

- `Project Name`, `Object Name`
- `Output Folder` (padrão `//sprites/`) e, ao lado, um botão que abre uma pasta no explorador de arquivos. Deixe o campo vazio para usar o Output Path da cena (comportamento legado)
- Modelo `Output Name` (padrão `$objectName_$animation_$frame`), botões que acrescentam `projectName`, `objectName`, `animation`, `camera`, `frame`, e os modelos prontos **Default** e **Per camera**
- **First image will be saved as:** o caminho real da primeira imagem, com avisos do modelo e colisões de nomes
- **Available Placeholders** (recolhível): variáveis e uma prévia do nome
- **Create Folders**: `Project`, `Object`, `Animation`, `Camera`, mais `Clean Action Names` e `Restart Frame Numbering Per Camera` (ambos desligados por padrão)

Veja [Output](Output.md).

### 2. Character & Animations

- `Animation Mode`: **Use Actions** (padrão), **Use NLA**, **Static Render**, **Frame Ranges**
- `Armature`: a armadura alvo (obrigatória nos modos Actions e NLA; no modo Frame Ranges só serve para avisar sobre a Action ativa dela)
- A lista do modo atual, com botões `+` / `-`, os campos do item selecionado, **Enable All** / **Disable All** e o botão **Detect**
- `Preview FPS` + **Apply**
- **Animation Test** (recolhível, modos Actions e NLA): **Preview Action** / **Preview NLA Strip**, **Stop Preview** (ou **Restore Scene** quando a reprodução já parou), contador de frames e botões primeiro / anterior / próximo / último

Veja [Animations](Animations.md).

### 3. Cameras

- Caixa **Create Cameras**: `Preset`, `Cameras` (só no preset Custom), `Elevation`, `Target Height`, `Distance`, **Create Cameras**
- **Detect Cameras**
- **Lens Settings**: `Type`, `Focal Length` / `Orthographic Scale`, **Desync Shift X / Y**, `Shift X` / `Y`, `Clip Start` / `End`
- `Custom Output Names`
- **Cameras (render order)**: a lista com `+`, `-`, mover para cima / baixo e um ícone "ver pela câmera" em cada linha; a câmera selecionada mostra `Camera`, `Output Name` (com Custom Output Names ligado), Shift individual (quando dessincronizado) e `Light Rotation`

Veja [Cameras](Cameras.md).

### 4. Light

`Enable Light Pivot`, `Object` (o pivô, mostrado quando habilitado) e `Enable Full Rotation (XYZ)`. Veja [Lighting](Lighting.md).

### 5. Render Settings

- **Checklist** ("Ready to render?"): problemas com botões **Fix** e o resumo de imagens / tempo
- **Resolution** X / Y
- **Frame Step**: `Enable Frame Step`, `Step`, **Test Frame Count**
- **Test Cameras**

Veja [Render](Render.md).

### Info

Versão (lida do próprio add-on), autor, **Open Documentation**, **Changelog**, **Future Features** e **License**.

### Idioma

Se o idioma do Blender for português (Brasil ou Portugal), os painéis, tooltips e mensagens aparecem em português. Qualquer outro idioma mostra inglês.

---

## Guia Básico

- **1. Prepare a cena**
  - Monte seu personagem / armadura e suas Actions ou NLA strips.
  - Opcionalmente crie um **Light Pivot** (um Empty) e coloque suas luzes dentro dele.
  - Salve o arquivo .blend se quiser usar uma pasta de saída relativa `//`.

- **2. Siga o Start Here (painel principal)**
  - **Create** um preset de câmeras (ou **Detect** as câmeras que você já tem).
  - **Detect Actions** / **Detect NLA Strips** (ou adicione intervalos de frames). Nos modos Actions e NLA defina a `Armature` em **2. Character & Animations**.

- **3. Project & Output**
  - Defina `Project Name`, `Object Name` e a `Output Folder`.
  - Ajuste o `Output Name` e as opções de `Create Folders`. Confira "First image will be saved as:".

- **4. Cameras e Light** (ajustes opcionais)
  - Reordene as câmeras, defina `Output Name`s, `Elevation`, lente e shift.
  - Habilite o Light Pivot e defina o objeto pivô.

- **5. Render Settings**
  - Leia o checklist e use os botões **Fix**. Defina a resolução e, se precisar, o Frame Step.
  - Use **Test Cameras** e o **Animation Test** para conferir enquadramento e animação.

- **6. Render**
  - Clique em **Render All**, confira o diálogo de resumo e clique em **Render**.
  - Acompanhe o progresso no painel principal. Pressione **ESC** ou **Cancel Render** para parar (depois do frame atual).
  - Quando terminar, a cena volta ao que era (veja [Render](Render.md)).

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

