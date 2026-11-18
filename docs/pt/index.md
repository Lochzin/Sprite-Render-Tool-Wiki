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
- **Acesso rápido à saída**: botão para abrir a pasta de saída diretamente no explorador de arquivos.

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

A interface do addon usa um **sistema de navegação lateral** com interface de tabs. Toda funcionalidade está organizada em um único painel principal com 5 tabs principais acessíveis via botões de ícone na sidebar esquerda:

### Navegação Lateral

A sidebar esquerda contém botões de ícone para navegação fácil entre as tabs:
- **📋 Info** (INFO): Versão, autor, links de documentação (é a tab aberta por padrão)
- **⚙️ Setup** (SETTINGS): Project, Light Pivot, Armature, Camera Creation
- **📷 Cameras** (CAMERA_DATA): Lens Settings, Camera Options, Camera List
- **🦴 Animations** (ARMATURE_DATA): Modo de animação, configuração Actions/NLA, testes
- **🎬 Render** (RENDER_STILL): Render Settings, configuração Output, Render Actions

![Sidebar](/_static/images/SRT_Sidebar.png)

Cada botão de tab mostra um tooltip ao passar o mouse com uma descrição específica.

### Conteúdo das Tabs

#### 📋 Tab Info
- Informações de versão
- Informações do autor
- Botão grande **📖 Open Documentation**
- **📚 Additional Resources** (seção recolhível):
  - Botão **Changelog**: abre a documentação do changelog
  - Botão **Future Features**: abre a documentação de funcionalidades futuras
  - Botão **License**: abre a documentação da licença
  - Seção inicia minimizada por padrão

![Info Tab](/_static/images/SRT_InfoTab.png)

#### ⚙️ Tab Setup
- **📁 Seção Project**:
  - `Project Name`
  - `Object Name`
- **💡 Seção Light Pivot**:
  - `Enable Light Pivot`: toggle para habilitar/desabilitar rotação do pivô de luz
  - `Light Pivot Object`: objeto usado como pivô de luz para rotação da luz (visível quando habilitado)
  - **💡 Dica**: Você pode colocar luzes como filhos do light pivot (elas rotacionarão com as câmeras) e adicionar luzes fixas fora do light pivot para iluminar áreas escuras do personagem.
  - Botão pequeno de documentação no cabeçalho da seção
  - Para informações detalhadas sobre configuração de iluminação e estratégias, veja [Iluminação](Lighting.md).
- **🦴 Seção Armature**:
  - `Armature`: seleção de armature alvo (redundante com [tab Animations](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#animations-tab) para conveniência)
- **📷 Seção Camera Creation**:
  - `Preset`: dropdown para selecionar configuração de preset de câmera (1, 2, 3, 4, 5 ou 8 câmeras)
  - `Distance`: slider para ajustar distância da câmera do ponto pivô
  - Botão **Create Cameras**: cria câmeras baseadas no preset selecionado
  - Botão pequeno de documentação no cabeçalho da seção
  - Para mais informações sobre presets de câmera, veja [Câmeras](Cameras.md).

![Setup Tab](/_static/images/SRT_SetupTab.png)

#### 📷 Tab Cameras
- **📐 Lens Settings** (sempre visível):
  - `Type`: Tipo de projeção da câmera (Perspective/Orthographic)
  - `Focal Length / Orthographic Scale`: propriedade da lente (rótulo muda com base no tipo de câmera)
  - `Desync Shift X` / `Desync Shift Y`: botões toggle independentes (pressionado = dessincronizado, não pressionado = sincronizado)
  - `Shift X` / `Shift Y`: valores de shift da câmera (sincronizados ou individuais por câmera)
  - `Clip Start` / `Clip End`: distâncias de clipping
- `Camera Count`: número de câmeras na lista interna (as novas entradas são adicionadas em branco; preencha os nomes ou use **Detect Cameras**)
- `Custom Output Names`: usa nomes diferentes dos nomes dos objetos de câmera para saída de arquivos
- `Enable Full Rotation (XYZ)`: controla se o pivô rotaciona em XYZ ou apenas ao redor de Z
- **📋 Camera List** (colapsável):
  - Para cada câmera (`Camera 1`, `Camera 2`, ...):
    - `Name`: nome do objeto de câmera na cena
    - `Output Name`: nome usado nos nomes de arquivos (se `Custom Output Names` estiver habilitado)
    - `Shift X` / `Shift Y`: valores de shift individuais (visível quando `Desync Shift X` ou `Desync Shift Y` está habilitado, respectivamente)
    - `Render Order`: ordem em que esta câmera será renderizada
    - `Light Rotation`: rotação da luz/pivô (apenas Z ou XYZ)
- Botão **Detect Cameras** (`sprite_render.autofill_light_rotation`):
  - Detecta câmeras visíveis na View Layer atual
  - Substitui a lista pelas câmeras detectadas (nomes, contagem, ordem de render) e define a rotação Z da luz com base no objeto pivô; o pivô só é necessário quando `Enable Light Pivot` está ligado (desligado, as rotações ficam em 0)
- Botão pequeno de documentação no cabeçalho da seção

![Camera Tab](/_static/images/SRT_CameraTab.png)

#### 🦴 Tab Animations
- `Target Armature`: a armadura a ser animada
- `Animation Mode`:
  - **NLA**: usa NLA strips
  - **ACTIONS**: usa Actions listadas dentro do add-on
  - **STATIC**: renderiza apenas o frame atual
  - **FRAME_RANGES**: renderiza intervalos de frames específicos sem rig ou animação

**Modo ACTIONS:**
- Lista `Actions`:
  - Cada item tem: `enabled`, `name`, `frame_start`, `frame_end`, e opções de sincronização secundária (ainda não implementadas)
- Botões:
  - `Detect Actions`: lê `bpy.data.actions` e preenche a lista
  - `Add`, `Remove`: gerencia a lista manualmente
- **🎬 Animations Test** (colapsável):
  - `Preview Action` / `Stop Preview`
  - Controles de frame (primeiro, anterior, próximo, último)
  - Exibição de contador de frame

**Modo NLA:**
- Lista `NLA Strips`:
  - Cada item: `enabled`, `name` (nome da strip), `track_name`, `frame_start`, `frame_end`
- Botões:
  - `Detect NLA Strips`: lê as tracks NLA da armadura alvo
  - `Add`, `Remove`: gerencia a lista manualmente
- **🎬 Animations Test** (colapsável):
  - `Preview NLA Strip` / `Stop Preview`
  - Controles de frame (primeiro, anterior, próximo, último)
  - Exibição de contador de frame

**Modo FRAME_RANGES:**
- Lista `Frame Ranges`:
  - Cada item: `enabled`, `name` (nome do intervalo), `frame_start`, `frame_end`
  - Permite renderizar múltiplos intervalos de frames personalizados (ex.: frames 1-10, 20-30, 50-60)
  - Não requer armature ou dados de animação - renderiza apenas frames estáticos
  - Útil para renderizar sequências específicas ou frames de teste sem configurar animações
  - A lista exibe cada intervalo no formato "frame_start-frame_end"
- Botões:
  - `Add`, `Remove`: gerencia a lista manualmente
  - Ao adicionar, o nome padrão é "Range {número}" e os valores padrão vêm do intervalo de frames da cena
- Validação automática garante `frame_end >= frame_start` para cada intervalo (corrige automaticamente se necessário)
- Mensagem informativa: "⚠️ No rig or animation required - Renders only the specified frame ranges"

![Animation Tab](/_static/images/SRT_AnimationTab.png)

#### 🎬 Tab Render
- **⚙️ Seção Render Settings**:
  - **Resolution**:
    - `Resolution X` / `Resolution Y`: resolução sincronizada em todas as câmeras
  - **Frame Step**:
    - `Enable Frame Step`: toggle para habilitar frame stepping
    - `Step`: valor de step (1-100) - renderiza cada N-ésimo frame (ex.: step de 2 renderiza frames 1, 3, 5, 7...)
    - Botão **🧪 Test Frame Count**: calcula e exibe total de frames sem renderizar (aparece quando Frame Step está habilitado)
  - **Playback Speed**:
    - `FPS`: configuração de FPS personalizada com botão `Apply`
- **📤 Seção Output**:
  - `Output Path` (das configurações de renderização da cena do Blender): pasta base onde tudo será criado
  - Botão **📂 Open Output Folder**: abre a pasta de saída no explorador de arquivos do sistema
  - `Output Name` (`output_template`):
    - Template padrão: `$objectName_$animation_$frame`
  - **Placeholders disponíveis** (colapsável):
    - `$projectName`: nome do projeto
    - `$objectName`: nome do objeto/personagem
    - `$animation`: nome da Action ou NLA Strip
    - `$camera`: nome da câmera ou `output_name`
    - `$frame`: número do frame formatado como `0001`, `0002`, etc.
  - **Create Folders**:
    - `Project Folder`, `Object Folder`, `Animation Folder`, `Camera Folder`
    - Constrói uma hierarquia de pastas baseada nesses níveis
  - Botão pequeno de documentação no cabeçalho da seção
  - Para informações detalhadas sobre configurações de renderização, configuração de saída e ações de renderização, veja a página dedicada [Renderização](Render.md).
- **🚀 Seção Render Actions**:
  - `🚀 Render All` (`sprite_render.render_all`):
    - Inicia a renderização de todas as animações e câmeras, uma imagem por vez conduzida por um timer (a UI atualiza entre os frames, mas o Blender fica ocupado enquanto cada frame renderiza)
  - `🎯 Test Cameras` (`sprite_render.test_cameras`):
    - Percorre as câmeras configuradas para visualização

![Render Tab](/_static/images/SRT_RenderTab.png)

---

## Guia Básico

Este guia inicial apresenta o fluxo de trabalho básico para começar a usar o Sprite Render Tool. Siga estes passos para configurar e renderizar seus primeiros sprites.

- **1. Prepare a cena**
  - Configure seu personagem / armadura.
  - Crie Actions ou NLA strips para suas animações.
  - Crie as câmeras que serão usadas para sprites.
  - Opcionalmente crie um objeto **Light Pivot** para controlar a rotação da iluminação ao redor do personagem.

- **2. Configure o painel Sprite Render**
  - Na **[tab Setup](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#setup-tab)**:
    - Defina `Project Name` e `Object Name` na seção Project.
    - Habilite `Enable Light Pivot` e defina o `Light Pivot Object` na seção Light Pivot.
    - (Opcional) Na seção Camera Creation: use presets para criar câmeras rapidamente, ou pule para adicionar câmeras manualmente.
  - Na **[tab Cameras](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#cameras-tab)**:
    - Configure **Lens Settings** (distância focal, shift, distâncias de clipping, etc.)
    - Defina `Camera Count`, `Custom Output Names` e `Enable Full Rotation` conforme necessário.
    - Clique em **Detect Cameras** para preencher a lista automaticamente, ou adicione câmeras manualmente.
    - Ajuste `Render Order`, `Output Name` e `Light Rotation` para cada câmera na Camera List.

- **3. Escolha o modo de animação**
  - **ACTIONS**:
    - Clique em **Detect Actions** para importar todas as Actions.
    - Ajuste `frame_start` e `frame_end` para cada action e habilite apenas as que você deseja renderizar.
  - **NLA**:
    - Selecione uma `Target Armature`.
    - Clique em **Detect NLA Strips**.
  - **STATIC**:
    - O add-on usa o frame atual para renderizar; útil para thumbnails ou poses.

- **4. Configure Render Settings e Output**
  - Na **[tab Render](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#render-tab)**:
    - Defina `Resolution X` e `Resolution Y` em Render Settings.
    - (Opcional) Habilite `Frame Step` se quiser renderizar cada N-ésimo frame.
    - Ajuste `output_template` se quiser um padrão de nomenclatura diferente.
    - Habilite as opções `Create Folders` de acordo com como você quer organizar os arquivos.
    - Em `Output Path`, escolha a pasta base onde tudo será salvo.

- **5. Teste antes de renderizar tudo**
  - Use **Test Cameras** (na [tab Render](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#render-tab) → Render Actions) para verificar cada câmera.
  - Use a seção **Animations Test** (na [tab Animations](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#animations-tab)) para visualizar animações antes de renderizar.

- **6. Renderize**
  - Clique em **Render All** (na [tab Render](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#render-tab) → Render Actions).
  - Monitore o progresso na **[tab Render](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#render-tab)** → seção Render Progress (aparece abaixo de Render Actions durante a renderização).
  - Se necessário, use o botão **Cancel Render** ou pressione **ESC** para parar (ele parará após o frame atual terminar).

---

## Estrutura de Arquivos Gerada

A lógica de pastas e nomes de arquivos funciona da seguinte forma:
- **Caminho base**: o `scene.render.filepath` limpo (`clean_base_path`) que remove nomes de arquivos e subpastas que poderiam conflitar com os gerados dinamicamente.
- **Níveis de pasta opcionais**: `Project`, `Object`, `Animation`, `Camera` (via `build_dir_parts`).
- **Nome do arquivo**: baseado em `output_template`:
  - Substitui `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`.
  - Remove caracteres inválidos para nomes de arquivos.
  - Gera imagens `.png`.

Se **`$camera` não estiver presente** no template, o add-on usa um contador sequencial por animação (em vez do número do frame da timeline) para evitar conflitos de nomes de arquivos entre câmeras.

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

