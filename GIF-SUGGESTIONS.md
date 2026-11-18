# Sugestões de GIFs e Imagens Demonstrativos para Documentação

Este documento lista todas as sugestões de GIFs animados e imagens estáticas que seriam úteis para demonstrar funcionalidades do Sprite Render Tool na documentação.

---

## 📸 IMAGENS ESTÁTICAS — Screenshots da Interface

### 🆕 Atualização de prints (UI do add-on 0.3.12, Blender 5.1.2, tema e idioma padrão)

Todos os PNG abaixo foram recapturados da interface real do add-on (cena de teste: cavalo + cavaleiro, 5 câmeras, 3 actions). Os caminhos mostrados são neutros (`S:\Sprites\Render`, `D:\Sprites\Render`).

**Substituídos (mesmo conteúdo, UI nova):** `SRT_Sidebar.png`, `SRT_InfoTab.png`, `SRT_SetupTab.png`, `SRT_CameraTab.png`, `SRT_AnimationTab.png`, `SRT_RenderTab.png`, `SRT_LensSettings_Expanded.png`, `SRT_CameraList_Expanded.png`, `SRT_AnimationTest_Expanded.png`.

**Novos (✅ feitos e referenciados em `docs/en` e `docs/pt`):**

| Imagem | Mostra | Usada em |
| --- | --- | --- |
| `SRT_AddonPref_Enabled.png` | Add-on 0.3.12 ativado em Preferences → Add-ons | Installation |
| `SRT_OutputFolder.png` | Project & Output: pasta, modelo, prévia da 1ª imagem, pastas, *Clean Action Names*, *Restart Frame Numbering* | Output |
| `SRT_RenderChecklist_Error.png` | Checklist com erro que bloqueia o Render All | Render, FAQ |
| `SRT_RenderChecklist_Warning.png` | Checklist com aviso e botão de correção | Render |
| `SRT_ConfirmDialog.png` | Diálogo do Render All (imagens, destino, ETA, sobrescrita) | Render |
| `SRT_RenderProgress.png` | Barra de progresso, status e Cancel Render | Render |
| `SRT_CreateCameras.png` | Caixa Create Cameras (preset, elevação, altura, distância) | Cameras |
| `SRT_Scene_Cameras.png` | Viewport com as 5 câmeras em volta do personagem | Cameras, FAQ |
| `SRT_ActionsList.png` | Lista de actions após Detect Actions | Animations |
| `SRT_LightPivot.png` | Seção Light Pivot da aba Setup | Lighting |

As imagens de aba (`InfoTab`, `SetupTab`, `CameraTab`, `AnimationTab`, `RenderTab`) agora também aparecem em `index.md` (en/pt) e no início de `Cameras.md`, `Animations.md` (e `RenderTab` em `Render.md`).

**Mantido de propósito:** `SRT_AddonPref.png` continua sendo o print anotado (números 1–6) da v0.3.11, porque a legenda de `Installation.md` depende dos números; só a versão exibida (0.3.11) está defasada. Para atualizar, regravar com os mesmos números.

**Ainda pendentes:** `SRT_OutputPlaceholders_Expanded.png` e `SRT_AdditionalResources_Expanded.png` (prioridade baixa, não capturados).

**GIFs que podem estar desatualizados** (não regravados; gravados antes da reorganização da UI, conferir layout, ícones das abas e botões):
- `SRT_DetectActions.gif` — o botão e a lista mudaram de posição/aparência.
- `SRT_FrameControls.gif` — o bloco *Frame Control* agora fica dentro de *Animation Test*.
- `SRT_PreviewNLA.gif` — *Preview NLA Strip* / *Stop Preview* / *Restore Scene* foram reescritos.

### ✅ Imagens Já Adicionadas

As seguintes imagens já foram adicionadas à documentação:

#### 1. **SRT_Sidebar.png** ✅
- **Onde está**: `docs/_static/images/SRT_Sidebar.png`
- **Onde usada**: 
  - `docs/en/index.md` - Após a seção "Sidebar Navigation"
  - `docs/pt/index.md` - Após a seção "Navegação Lateral"
- **O que mostra**: Sidebar esquerda com botões de tabs (Info, Setup, Cameras, Animations, Render)
- **Status**: ✅ Adicionada e referenciada

#### 2. **SRT_InfoTab.png** ✅
- **Onde está**: `docs/_static/images/SRT_InfoTab.png`
- **Onde usada**: 
  - `docs/en/index.md` - Após a seção "Info Tab"
  - `docs/pt/index.md` - Após a seção "Tab Info"
- **O que mostra**: Conteúdo completo da tab Info (versão, autor, documentação, Additional Resources)
- **Status**: ✅ Adicionada e referenciada

#### 3. **SRT_SetupTab.png** ✅
- **Onde está**: `docs/_static/images/SRT_SetupTab.png`
- **Onde usada**: 
  - `docs/en/index.md` - Após a seção "Setup Tab"
  - `docs/pt/index.md` - Após a seção "Tab Setup"
- **O que mostra**: Conteúdo completo da tab Setup (Project, Light Pivot, Armature, Camera Creation)
- **Status**: ✅ Adicionada e referenciada

#### 4. **SRT_CameraTab.png** ✅
- **Onde está**: `docs/_static/images/SRT_CameraTab.png`
- **Onde usada**: 
  - `docs/en/index.md` - Após a seção "Cameras Tab"
  - `docs/pt/index.md` - Após a seção "Tab Cameras"
  - `docs/en/Cameras.md` - No início da página
  - `docs/pt/Cameras.md` - No início da página
- **O que mostra**: Conteúdo completo da tab Cameras (Lens Settings, Camera Options, Camera List)
- **Status**: ✅ Adicionada e referenciada

#### 5. **SRT_AnimationTab.png** ✅
- **Onde está**: `docs/_static/images/SRT_AnimationTab.png`
- **Onde usada**: 
  - `docs/en/index.md` - Após a seção "Animations Tab"
  - `docs/pt/index.md` - Após a seção "Tab Animations"
  - `docs/en/Animations.md` - No início da página
  - `docs/pt/Animations.md` - No início da página
- **O que mostra**: Conteúdo completo da tab Animations (modo de animação, Actions/NLA, testes)
- **Status**: ✅ Adicionada e referenciada

#### 6. **SRT_RenderTab.png** ✅
- **Onde está**: `docs/_static/images/SRT_RenderTab.png`
- **Onde usada**: 
  - `docs/en/index.md` - Após a seção "Render Tab"
  - `docs/pt/index.md` - Após a seção "Tab Render"
  - `docs/en/Render.md` - No início da página
  - `docs/pt/Render.md` - No início da página
- **O que mostra**: Conteúdo completo da tab Render (Render Settings, Output, Render Actions)
- **Status**: ✅ Adicionada e referenciada

#### 7. **SRT_LensSettings_Expanded.png** ✅
- **Onde está**: `docs/_static/images/SRT_LensSettings_Expanded.png`
- **Onde usada**: 
  - `docs/en/Cameras.md` - Na seção "Lens Settings"
  - `docs/pt/Cameras.md` - Na seção "Configurações de Lente"
- **O que mostra**: Seção Lens Settings expandida mostrando todos os controles (Type, Focal Length/Orthographic Scale, Desync Shift X/Y, Shift X/Y, Clip Start/End)
- **Status**: ✅ Adicionada e referenciada

#### 8. **SRT_CameraList_Expanded.png** ✅
- **Onde está**: `docs/_static/images/SRT_CameraList_Expanded.png`
- **Onde usada**: 
  - `docs/en/Cameras.md` - Na seção "Camera List"
  - `docs/pt/Cameras.md` - Na seção "Lista de Câmeras"
- **O que mostra**: Camera List expandida mostrando múltiplas câmeras com seus campos (Name, Output Name, Shift, Render Order, Light Rotation)
- **Status**: ✅ Adicionada e referenciada

#### 9. **SRT_AnimationTest_Expanded.png** ✅
- **Onde está**: `docs/_static/images/SRT_AnimationTest_Expanded.png`
- **Onde usada**: 
  - `docs/en/Animations.md` - Na seção "Animation Test Panel"
  - `docs/pt/Animations.md` - Na seção "Painel de Teste de Animações"
- **O que mostra**: Seção Animations Test expandida mostrando Preview Action, controles de frame, e contador
- **Status**: ✅ Adicionada e referenciada

#### 10. **SRT_AddonPref.png** ✅
- **Onde está**: `docs/_static/images/SRT_AddonPref.png`
- **Onde usada**: 
  - `docs/en/Installation.md` - Na seção "Initial Installation"
  - `docs/pt/Installation.md` - Na seção "Instalação Inicial"
- **O que mostra**: Tela de Add-ons do Blender mostrando a interface de instalação (setinha, Install from disk, informações do add-on, checkbox, botão Uninstall)
- **Status**: ✅ Adicionada e referenciada

### 📋 Imagens Sugeridas (Ainda Não Criadas)

#### 11. **SRT_OutputPlaceholders_Expanded.png** (Sugerida)
- **Onde colocar**: `docs/_static/images/SRT_OutputPlaceholders_Expanded.png`
- **Onde usar**: 
  - `docs/en/Render.md` - Na seção "Output Template"
  - `docs/pt/Render.md` - Na seção "Template de Saída"
  - `docs/en/Output.md` - Na seção "Output Template"
  - `docs/pt/Output.md` - Na seção "Template de Saída"
- **O que mostrar**: Seção "Show Available Placeholders" expandida mostrando lista de placeholders ($projectName, $objectName, etc.) e preview do nome de arquivo
- **Prioridade**: 🟢 Baixa

#### 11. **SRT_AdditionalResources_Expanded.png** (Sugerida)
- **Onde colocar**: `docs/_static/images/SRT_AdditionalResources_Expanded.png`
- **Onde usar**: 
  - `docs/en/index.md` - Na seção "Info Tab" > "Additional Resources"
  - `docs/pt/index.md` - Na seção "Tab Info" > "Additional Resources"
- **O que mostrar**: Seção Additional Resources expandida mostrando botões (Changelog, Future Features, License)
- **Prioridade**: 🟢 Baixa

### 📐 Especificações para Imagens Estáticas

- **Formato**: PNG
- **Resolução**: 1920x1080 (Full HD) ou maior se necessário para capturar toda a interface
- **Qualidade**: Alta qualidade, sem compressão excessiva
- **Captura**: Screenshot direto do Blender com interface visível
- **Otimização**: Usar ferramentas como TinyPNG ou ImageOptim para reduzir tamanho sem perder qualidade visual
- **Tamanho máximo**: Tentar manter abaixo de 500 KB por imagem

### 📍 Convenção de Nomenclatura

- **Padrão**: `SRT_[NomeDaSeção].png`
- **Exemplos**:
  - `SRT_Sidebar.png` - Sidebar de navegação
  - `SRT_InfoTab.png` - Tab Info completa
  - `SRT_CameraTab.png` - Tab Cameras completa
  - `SRT_LensSettings_Expanded.png` - Seção específica expandida
  - `SRT_CameraList_Expanded.png` - Seção expandida mostrando detalhes
  - `SRT_AnimationTest_Expanded.png` - Seção expandida mostrando controles
  - `SRT_AddonPref.png` - Tela de preferências do Blender

---

## 🎬 GIFs ANIMADOS — Demonstrações Dinâmicas

### ✅ GIFs Já Adicionados

Os seguintes GIFs já foram adicionados à documentação:

#### 1. **SRT_PreviewNLA.gif** ✅
- **Onde está**: `docs/_static/images/SRT_PreviewNLA.gif`
- **Onde usada**: 
  - `docs/en/Animations.md` - Na seção "Animation Test Panel" > "Preview NLA Strip"
  - `docs/pt/Animations.md` - Na seção "Painel de Teste de Animações" > "Preview NLA Strip"
- **O que mostra**: NLA strip sendo previewed com animação rodando no viewport
- **Status**: ✅ Adicionada e referenciada

#### 2. **SRT_FrameControls.gif** ✅
- **Onde está**: `docs/_static/images/SRT_FrameControls.gif`
- **Onde usada**: 
  - `docs/en/Animations.md` - Na seção "Animation Test Panel" > "Frame navigator buttons"
  - `docs/pt/Animations.md` - Na seção "Painel de Teste de Animações" > "Botões de navegação de frame"
- **O que mostra**: Controles de frame navegando pela animação (First, Previous, Next, Last)
- **Status**: ✅ Adicionada e referenciada

#### 3. **SRT_DetectActions.gif** ✅
- **Onde está**: `docs/_static/images/SRT_DetectActions.gif`
- **Onde usada**: 
  - `docs/en/Animations.md` - Na seção "ACTIONS Mode" > "Actions List" > "Detect Actions"
  - `docs/pt/Animations.md` - Na seção "Modo ACTIONS" > "Lista de Actions" > "Detect Actions"
- **O que mostra**: Botão Detect Actions preenchendo a lista automaticamente com Actions detectadas
- **Status**: ✅ Adicionada e referenciada

---

## 🎯 PRIORIDADE ALTA — GIFs Essenciais

> **Nota**: Com as imagens estáticas já adicionadas (Sidebar, todas as tabs, Lens Settings, Camera List, Animation Test), alguns GIFs que apenas mostravam a interface estática foram removidos ou tiveram prioridade reduzida. Os GIFs abaixo focam em **ações dinâmicas** que não podem ser demonstradas com imagens estáticas.

### 1. **index.md — Workflow e Navegação**

#### GIF 1: Navegação entre Tabs com Sidebar
- **O que mostrar**: Sistema de navegação lateral em ação
- **Duração**: ~10-15 segundos
- **Ações**:
  - Mostrar sidebar esquerda com botões de tabs
  - Clicar em cada tab mostrando conteúdo mudando dinamicamente
  - Destacar tooltips aparecendo ao passar mouse sobre os botões
  - Mostrar transição suave entre tabs
- **Onde colocar**: Após a seção "Sidebar Navigation" no index.md
- **Razão**: Ainda útil para mostrar a interatividade, mesmo tendo SRT_Sidebar.png

#### GIF 2: Fluxo Básico Completo (Workflow Rápido)
- **O que mostrar**: Workflow completo do início ao fim (versão acelerada)
- **Duração**: ~30-45 segundos (pode ser acelerado)
- **Ações**:
  1. Abrir o painel (Sidebar N)
  2. Na tab Setup: Configurar Project Name e Object Name rapidamente
  3. Na tab Setup: Configurar Light Pivot object
  4. Na tab Setup: Usar Camera Creation Presets (mostrar câmeras sendo criadas)
  5. Na tab Cameras: Clicar em "Detect Cameras" e ver lista preenchendo
  6. Na tab Animations: Clicar em "Detect Actions" e ver lista preenchendo
  7. Na tab Render: Configurar Output Path
  8. Na tab Render: Clicar em "Render All"
  9. Mostrar progresso atualizando rapidamente
- **Onde colocar**: Na seção "Basic Guide"
- **Razão**: Mostra o fluxo completo em ação, essencial para novos usuários

#### GIF 3: Botão Open Output Folder
- **O que mostrar**: Botão sendo clicado e explorador de arquivos abrindo
- **Duração**: ~3-5 segundos
- **Ações**: 
  - Clicar no botão "📂 Open Output Folder"
  - Mostrar o explorador de arquivos abrindo na pasta correta
- **Onde colocar**: Na seção "Output" do Render.md e na página Output.md
- **Razão**: Mostra ação dinâmica que não pode ser demonstrada com imagem estática

---

### 2. **Animations.md — Animation Test Panel**

> **Nota**: Temos SRT_AnimationTest_Expanded.png mostrando a interface, mas os GIFs abaixo são essenciais para mostrar a **animação em ação** no viewport.

#### GIF 4: Preview Action em Funcionamento
- **O que mostrar**: Animação sendo previewed no viewport com personagem se movendo
- **Duração**: ~10-15 segundos
- **Ações**:
  - Selecionar uma Action na lista
  - Clicar em "Preview Action"
  - Mostrar a timeline rodando e o personagem animando no viewport
  - Mostrar os controles de frame (first, previous, next, last) sendo usados
  - Destacar o contador de frame atualizando
- **Onde colocar**: Na seção "Animation Test Panel"
- **Razão**: Essencial - mostra a animação em ação, não apenas a interface

#### GIF 5: Preview NLA Strip ✅
- **O que mostrar**: NLA strip sendo previewed com animação rodando
- **Duração**: ~10-15 segundos
- **Ações**:
  - Selecionar um NLA strip na lista
  - Clicar em "Preview NLA Strip"
  - Mostrar a animação rodando no viewport
  - Mostrar timeline avançando
- **Onde colocar**: Na seção "Animation Test Panel"
- **Onde está**: `docs/_static/images/SRT_PreviewNLA.gif`
- **Onde usada**: 
  - `docs/en/Animations.md` - Na seção "Animation Test Panel" > "Preview NLA Strip"
  - `docs/pt/Animations.md` - Na seção "Painel de Teste de Animações" > "Preview NLA Strip"
- **Status**: ✅ Adicionada e referenciada

#### GIF 6: Navegação de Frames ✅
- **O que mostrar**: Controles de frame navegando pela animação
- **Duração**: ~8-10 segundos
- **Ações**:
  - Clicar em "First" → mostra primeiro frame (personagem em pose inicial)
  - Clicar em "Next" várias vezes → avança frames (personagem se move)
  - Clicar em "Previous" → volta frames
  - Clicar em "Last" → mostra último frame (personagem em pose final)
- **Onde colocar**: Na seção "Animation Test Panel"
- **Onde está**: `docs/_static/images/SRT_FrameControls.gif`
- **Onde usada**: 
  - `docs/en/Animations.md` - Na seção "Animation Test Panel" > "Frame navigator buttons"
  - `docs/pt/Animations.md` - Na seção "Painel de Teste de Animações" > "Botões de navegação de frame"
- **Status**: ✅ Adicionada e referenciada

#### GIF 7: Detect Actions Preenchendo Lista ✅
- **O que mostrar**: Botão detectando Actions automaticamente
- **Duração**: ~5-8 segundos
- **Ações**:
  - Mostrar lista vazia ou com poucas Actions
  - Clicar em "Detect Actions"
  - Mostrar a lista sendo preenchida automaticamente
  - Mostrar frame_start e frame_end sendo preenchidos
- **Onde colocar**: Na seção "ACTIONS Mode" > "Actions List"
- **Onde está**: `docs/_static/images/SRT_DetectActions.gif`
- **Onde usada**: 
  - `docs/en/Animations.md` - Na seção "ACTIONS Mode" > "Actions List" > "Detect Actions"
  - `docs/pt/Animations.md` - Na seção "Modo ACTIONS" > "Lista de Actions" > "Detect Actions"
- **Status**: ✅ Adicionada e referenciada

---

### 3. **Cameras.md — Test Cameras e Detecção**

> **Nota**: Temos SRT_LensSettings_Expanded.png e SRT_CameraList_Expanded.png mostrando a interface, mas os GIFs abaixo são essenciais para mostrar **ações dinâmicas** e **resultados visuais**.

#### GIF 8: Test Cameras Alternando Câmeras
- **O que mostrar**: Botão alternando entre câmeras configuradas com mudança visual no viewport
- **Duração**: ~15-20 segundos
- **Ações**:
  - Clicar em "Test Cameras" várias vezes
  - Mostrar a viewport mudando para cada câmera (ângulo diferente)
  - Se houver light pivot, mostrar a luz rotacionando visivelmente
  - Destacar a mudança de perspectiva
- **Onde colocar**: Na seção "Testing Cameras" do Cameras.md
- **Razão**: Essencial - mostra resultado visual dinâmico no viewport

#### GIF 9: Detect Cameras Preenchendo Lista
- **O que mostrar**: Botão detectando e preenchendo a lista automaticamente
- **Duração**: ~5-8 segundos
- **Ações**:
  - Mostrar lista vazia ou com poucas câmeras
  - Clicar em "Detect Cameras"
  - Mostrar a lista sendo preenchida automaticamente
  - Mostrar os valores de Light Rotation sendo calculados e preenchidos
- **Onde colocar**: Na seção "Detecting Cameras Automatically"
- **Razão**: Essencial - mostra ação automática que não pode ser demonstrada com imagem estática

#### GIF 10: Camera Creation Presets em Ação
- **O que mostrar**: Usando presets para criar câmeras automaticamente na viewport
- **Duração**: ~15-20 segundos
- **Ações**:
  - Mostrar painel "Camera Creation" na tab Setup
  - Selecionar um preset do dropdown (ex: "4 Cameras - Front, Right, Back, Left")
  - Ajustar slider "Distance"
  - Clicar em "Create Cameras"
  - Mostrar câmeras sendo criadas na viewport (aparecendo ao redor do objeto)
  - Mostrar câmeras sendo posicionadas ao redor do pivot/origem
  - Mostrar lista de câmeras sendo preenchida automaticamente
  - Mostrar câmeras apontando corretamente para o centro
- **Onde colocar**: Na seção "Camera Creation Presets" do Cameras.md
- **Razão**: Essencial - mostra criação dinâmica de objetos na viewport

#### GIF 11: Shift Individual vs Sincronizado
- **O que mostrar**: Alternando entre shift sincronizado e individual por câmera
- **Duração**: ~15-20 segundos
- **Ações**:
  - **Parte 1**: Com "Desync Shift X/Y" desabilitado, alterar Shift X/Y → mostrar todas as câmeras mudando na viewport
  - **Parte 2**: Habilitar "Desync Shift X" ou "Desync Shift Y"
  - **Parte 3**: Mostrar campos Shift X/Y aparecendo para cada câmera individualmente na Camera List
  - Alterar shift de uma câmera específica → mostrar apenas aquela câmera mudando na viewport
  - Destacar a diferença visual entre sincronizado e individual
- **Onde colocar**: Na seção "Lens Settings" do Cameras.md
- **Razão**: Mostra comportamento dinâmico e diferença visual no viewport

---

### 4. **Lighting.md — Light Pivot System**

#### GIF 12: Visualizador de Rotação do Pivot (Viewport Rendered)
- **O que mostrar**: Visualização em tempo real da rotação do pivot usando viewport shading em Rendered
- **Duração**: ~20-25 segundos
- **Ações**:
  - Configurar lights e light pivot
  - Mudar viewport shading para "Rendered" (pressionar Z e selecionar)
  - Clicar em "Test Cameras" várias vezes
  - Mostrar o pivot rotacionando em tempo real no viewport
  - Mostrar iluminação mudando no personagem conforme o pivot rotaciona
  - Mostrar funcionando tanto em modo Z-only quanto Full XYZ
  - Destacar como as luzes filhas do pivot seguem a rotação
- **Onde colocar**: Na seção "Visualizing Light Rotation" do Lighting.md
- **Razão**: Essencial - mostra resultado visual dinâmico que não pode ser demonstrado com imagem estática

#### GIF 13: Comparação Luzes Dentro vs Fora do Pivot
- **O que mostrar**: Diferença visual entre luzes dentro e fora do pivot
- **Duração**: ~25-30 segundos
- **Ações**:
  - **Parte 1**: Mostrar cena com luz apenas dentro do pivot, alternar câmeras (luz gira, iluminação muda)
  - **Parte 2**: Mostrar cena com luz apenas fora do pivot, alternar câmeras (luz fixa, iluminação constante)
  - **Parte 3**: Mostrar cena com ambas (resultado final - iluminação balanceada)
- **Onde colocar**: Na seção "Advanced Lighting Strategy"
- **Razão**: Mostra diferença visual importante que não pode ser demonstrada com imagem estática

#### GIF 14: Rotação Z-only vs XYZ Completa
- **O que mostrar**: Diferença visual entre os dois modos de rotação
- **Duração**: ~20-25 segundos
- **Ações**:
  - **Parte 1**: Com "Enable Full Rotation (XYZ)" desabilitado, alternar câmeras (apenas rotação Z - movimento horizontal)
  - **Parte 2**: Habilitar "Enable Full Rotation (XYZ)"
  - **Parte 3**: Alternar câmeras novamente (rotação XYZ completa - movimento 3D)
  - Destacar a diferença visual na iluminação
- **Onde colocar**: Na seção "Rotation Modes"
- **Razão**: Mostra diferença visual importante entre os modos

---

### 5. **Output.md — Open Output Folder**

#### GIF 15: Botão Abrindo Explorador de Arquivos
- **O que mostrar**: Botão sendo clicado e explorador de arquivos abrindo
- **Duração**: ~5-8 segundos
- **Ações**:
  - Clicar no botão "📂 Open Output Folder"
  - Mostrar o explorador de arquivos abrindo na pasta correta
  - Se possível, mostrar arquivos renderizados na pasta
- **Onde colocar**: Na seção "Open Output Folder" do Output.md
- **Razão**: Mostra ação dinâmica que não pode ser demonstrada com imagem estática

#### GIF 16: Estrutura de Pastas Sendo Criada
- **O que mostrar**: Pastas sendo criadas durante renderização
- **Duração**: ~15-20 segundos
- **Ações**:
  - Mostrar o explorador de arquivos
  - Iniciar renderização
  - Mostrar pastas sendo criadas dinamicamente (Project/Object/Animation/Camera)
  - Mostrar arquivos sendo salvos dentro das pastas em tempo real
- **Onde colocar**: Na seção "Folder Structure" do Output.md
- **Razão**: Mostra criação dinâmica de estrutura que não pode ser demonstrada com imagem estática

---

### 6. **Render.md — Render Tab**

> **Nota**: Temos SRT_RenderTab.png mostrando a interface, mas os GIFs abaixo são essenciais para mostrar **ações dinâmicas** e **resultados**.

#### GIF 17: Frame Step em Funcionamento
- **O que mostrar**: Frame Step sendo configurado e aplicado durante renderização
- **Duração**: ~15-20 segundos
- **Ações**:
  - Mostrar seção "Frame Step" na tab Render
  - Habilitar "Enable Frame Step"
  - Configurar Step = 2
  - Mostrar mensagem "Renders every 2 frame(s)" aparecendo
  - Clicar em "🧪 Test Frame Count"
  - Mostrar cálculo de frames (com e sem step) sendo exibido
  - Iniciar renderização e mostrar frames sendo pulados (1, 3, 5, 7...) no progresso
- **Onde colocar**: Na seção "Frame Step" do Render.md
- **Razão**: Mostra funcionalidade dinâmica que não pode ser demonstrada com imagem estática

#### GIF 18: Render All com Progresso
- **O que mostrar**: Renderização completa com progresso sendo exibido
- **Duração**: ~30-40 segundos (pode ser acelerado)
- **Ações**:
  - Na tab Render, clicar em "Render All"
  - Mostrar seção "Render Progress" aparecendo na tab Render
  - Mostrar contador [current/total] atualizando em tempo real
  - Mostrar porcentagem aumentando
  - Mostrar barra de progresso preenchendo
  - Mostrar mensagem de status mudando (animação, câmera, frame)
  - Mostrar arquivos sendo salvos (se possível mostrar no explorador)
- **Onde colocar**: Na seção "🚀 Render All" do Render.md
- **Razão**: Essencial - mostra progresso dinâmico que não pode ser demonstrado com imagem estática

#### GIF 19: Cancelamento com ESC ou Botão
- **O que mostrar**: Renderização sendo cancelada
- **Duração**: ~10-15 segundos
- **Ações**:
  - Iniciar renderização
  - Mostrar progresso rodando
  - Pressionar ESC (ou clicar em "Cancel Render")
  - Mostrar renderização parando após o frame atual
  - Mostrar mensagem de cancelamento
  - Mostrar seção de progresso desaparecendo
- **Onde colocar**: Na seção "🚀 Render All" do Render.md
- **Razão**: Mostra funcionalidade importante de cancelamento

---

## 📊 PRIORIDADE MÉDIA — GIFs Muito Úteis

### 7. **Animations.md — Detect NLA**

#### GIF 20: Detect NLA Strips Preenchendo Lista
- **O que mostrar**: Botão detectando NLA strips automaticamente
- **Duração**: ~5-8 segundos
- **Ações**:
  - Ter um armature com NLA strips configuradas
  - Selecionar o Target Armature
  - Clicar em "Detect NLA Strips"
  - Mostrar a lista sendo preenchida com todas as strips
  - Mostrar frame_start e frame_end sendo preenchidos
- **Onde colocar**: Na seção "NLA Mode" > "NLA Strips List"
- **Razão**: Mostra ação automática que não pode ser demonstrada com imagem estática

---

### 8. **FAQ.md**

#### GIF 21: Test Cameras para Verificar Câmeras
- **O que mostrar**: Usando Test Cameras para debug e verificação
- **Duração**: ~10-15 segundos
- **Ações**:
  - Mostrar problema: renderização saindo da câmera errada
  - Usar "Test Cameras" para ciclar pelas câmeras
  - Mostrar qual câmera está ativa no viewport
  - Verificar configuração na lista
  - Corrigir problema identificado
- **Onde colocar**: Na resposta sobre "My renders look like they are coming from the wrong camera"
- **Razão**: Mostra uso prático para troubleshooting

---

## 📝 PRIORIDADE BAIXA — GIFs Opcionais

### 9. **Output.md — Output Template**

#### GIF 22: Preview do Template Mudando
- **O que mostrar**: Preview do template atualizando em tempo real
- **Duração**: ~10-15 segundos
- **Ações**:
  - Mostrar campo "Output Name" (output_template)
  - Alterar Project Name → mostrar preview mudando
  - Alterar Object Name → mostrar preview mudando
  - Alterar template diretamente → mostrar preview atualizando
- **Onde colocar**: Na seção "Output Template" do Output.md
- **Razão**: Útil mas não essencial - mostra funcionalidade de preview em tempo real

---

## 🎬 GIFs Especiais — Workflows Completos

### GIF 23: Workflow Completo do Início ao Fim (Versão Acelerada)
- **O que mostrar**: Todo o processo de configuração e renderização com nova interface de tabs
- **Duração**: ~60-90 segundos (pode ser acelerado)
- **Ações**:
  1. Abrir Blender com cena preparada
  2. Abrir painel (Sidebar N) → mostrar sidebar com tabs
  3. **Tab Setup**: Configurar Project Name: "MyGame"
  4. **Tab Setup**: Configurar Object Name: "Hero"
  5. **Tab Setup**: Habilitar "Enable Light Pivot" e criar/selecionar Light Pivot object
  6. **Tab Setup**: (Opção A) Usar Camera Creation Presets: selecionar preset "4 Cameras", ajustar distância, clicar "Create Cameras"
  6. **Tab Setup**: (Opção B) Ir para tab Cameras e clicar em "Detect Cameras" → ver lista preenchendo
  7. **Tab Cameras**: Configurar Lens Settings (focal length, shift, clip distances, etc.)
  8. **Tab Cameras**: Ajustar Render Order se necessário
  9. **Tab Animations**: Selecionar Target Armature
  10. **Tab Animations**: Mudar para modo ACTIONS
  11. **Tab Animations**: Clicar em "Detect Actions" → ver lista preenchendo
  12. **Tab Animations**: Habilitar/desabilitar Actions desejadas
  13. **Tab Animations**: Usar "Preview Action" para testar animação
  14. **Tab Render**: Configurar Resolution X/Y
  15. **Tab Render**: (Opcional) Habilitar Frame Step e configurar
  16. **Tab Render**: Configurar Output Path
  17. **Tab Render**: Configurar Output Template
  18. **Tab Render**: Habilitar pastas (Project/Object/Animation/Camera)
  19. **Tab Render**: Usar "Test Cameras" para verificar (com viewport em Rendered para ver rotação)
  20. **Tab Render**: Clicar em "Render All"
  21. Mostrar mudança automática para **Tab Info** (ou navegação manual)
  22. **Tab Info**: Mostrar progresso rodando (contador, porcentagem, barra)
  23. Mostrar arquivos sendo salvos
  24. **Tab Render**: Abrir pasta de saída usando botão "Open Output Folder"
  25. Mostrar resultado final
- **Onde colocar**: No final da seção "Basic Guide" ou como vídeo separado

---

### GIF 24: Comparação de Lighting Strategies
- **O que mostrar**: Comparação lado a lado de diferentes setups de luz
- **Duração**: ~30-40 segundos
- **Ações**:
  - **Cena 1**: Apenas luz dentro do pivot
    - Alternar câmeras mostrando luz girando
  - **Cena 2**: Apenas luz fora do pivot
    - Alternar câmeras mostrando luz fixa
  - **Cena 3**: Ambas (setup completo)
    - Alternar câmeras mostrando resultado final
- **Onde colocar**: Na seção "Advanced Lighting Strategy"

---

---

## 📋 Resumo por Prioridade

### 🔴 Essenciais (Fazer Primeiro)
1. **Test Cameras alternando câmeras** (GIF 8) - Mostra mudança visual no viewport
2. **Visualizador de rotação do pivot** (GIF 12) - Mostra iluminação mudando em tempo real
3. **Preview Action funcionando** (GIF 4) - Mostra animação rodando no viewport
4. **Detect Cameras preenchendo lista** (GIF 9) - Mostra ação automática
5. **Camera Creation Presets em ação** (GIF 10) - Mostra criação dinâmica de objetos
6. **Render All com progresso** (GIF 18) - Mostra progresso dinâmico
7. **Open Output Folder** (GIF 15) - Mostra ação dinâmica

### 🟡 Muito Úteis (Segunda Fase)
8. **Preview NLA Strip** (GIF 5) ✅ - Demonstra funcionalidade NLA
9. **Navegação de frames** (GIF 6) ✅ - Mostra controles em ação
10. **Detect Actions preenchendo lista** (GIF 7) ✅ - Mostra ação automática
11. **Detect NLA Strips preenchendo lista** (GIF 20) - Mostra ação automática
12. **Shift Individual vs Sincronizado** (GIF 11) - Mostra diferença visual
13. **Comparação Luzes Dentro vs Fora do Pivot** (GIF 13) - Mostra estratégia avançada
14. **Rotação Z-only vs XYZ Completa** (GIF 14) - Mostra diferença entre modos
15. **Frame Step em funcionamento** (GIF 17) - Mostra funcionalidade dinâmica
16. **Cancelamento com ESC** (GIF 19) - Mostra funcionalidade importante
17. **Estrutura de Pastas Sendo Criada** (GIF 16) - Mostra criação dinâmica

### 🟢 Opcionais (Se Tiver Tempo)
18. **Navegação entre Tabs** (GIF 1) - Útil mas menos crítico (já temos imagens)
19. **Workflow Completo** (GIF 23) - Útil para visão geral, mas pode ser texto
20. **Comparação de Lighting Strategies** (GIF 24) - Útil para usuários avançados
21. **Preview do Template** (GIF 22) - Nice to have
22. **Test Cameras para Debug** (GIF 21) - Útil para FAQ

---

## 📐 Especificações Técnicas Recomendadas

### Formato
- **Formato**: GIF animado
- **Resolução**: 1280x720 (HD) ou 1920x1080 (Full HD) se possível
- **FPS**: 15-24 fps (balance entre qualidade e tamanho de arquivo)
- **Duração**: Conforme especificado em cada GIF (máximo 90 segundos)

### Otimização
- **Compressão**: Usar ferramentas como GIFsicle ou EZGIF para otimizar
- **Tamanho máximo**: Tentar manter abaixo de 5-10 MB por GIF
- **Cores**: Reduzir paleta de cores se necessário para diminuir tamanho
- **Crop**: Remover áreas desnecessárias da tela

### Captura
- **Ferramentas sugeridas**:
  - OBS Studio (gravar tela, depois converter para GIF)
  - ScreenToGif (Windows)
  - LICEcap (Windows/Mac)
  - Peek (Linux)
  - FFmpeg (conversão de vídeo para GIF)

### Acessibilidade
- **Legendas**: Considerar adicionar legendas em inglês/português se necessário
- **Velocidade**: Para GIFs longos, considerar versão acelerada e versão normal
- **Alternativas**: Manter descrições textuais detalhadas mesmo com GIFs

---

## 📍 Onde Colocar os GIFs na Documentação

### Sintaxe Markdown para Inserir GIFs

```markdown
![Descrição do GIF](assets/images/gifs/nome-do-gif.gif)
```

### Estrutura de Pastas Sugerida

```
docs/
  assets/
    images/
      gifs/
        index-main-panel-overview.gif
        index-basic-workflow.gif
        index-open-output-folder.gif
        animations-preview-action.gif
        animations-preview-nla.gif
        animations-frame-navigation.gif
        cameras-test-cameras.gif
        cameras-detect-cameras.gif
        cameras-presets-creation.gif
        cameras-lens-settings-sync.gif
        cameras-shift-individual.gif
        lighting-pivot-rotation.gif
        lighting-pivot-visualizer-rendered.gif
        lighting-comparison-inside-outside.gif
        lighting-enable-toggle.gif
        lighting-z-vs-xyz.gif
        output-open-folder.gif
        output-folder-structure.gif
        render-progress-bar.gif
        render-cancel-esc.gif
        render-tab-navigation.gif
        render-frame-step.gif
        render-settings-complete.gif
        render-all-progress-info-tab.gif
        render-test-cameras-from-render-tab.gif
        ...
```

---

## ✅ Checklist de Produção

Para cada GIF:

- [ ] Script/storyboard preparado
- [ ] Cena Blender preparada com exemplo apropriado
- [ ] Captura realizada
- [ ] Edição e otimização feitas
- [ ] Tamanho de arquivo verificado (< 10 MB)
- [ ] Qualidade visual verificada
- [ ] Testado na documentação (local e online)
- [ ] Descrição alternativa adicionada (para acessibilidade)
- [ ] Nome de arquivo seguindo convenção
- [ ] Commit e push realizados

---

**Última atualização**: 2025-01-XX
**Versão do documento**: 2.0

---

## 📝 Notas sobre Reorganização (v2.0)

### Mudanças Principais:
- **GIFs removidos/reduzidos**: Alguns GIFs que apenas mostravam interface estática foram removidos ou tiveram prioridade reduzida, já que temos imagens estáticas (SRT_Sidebar.png, SRT_*Tab.png, SRT_LensSettings_Expanded.png, SRT_CameraList_Expanded.png, SRT_AnimationTest_Expanded.png)
- **Foco em ações dinâmicas**: Os GIFs restantes focam em demonstrações de ações dinâmicas, resultados visuais no viewport, e funcionalidades que não podem ser demonstradas com imagens estáticas
- **Priorização revisada**: GIFs foram reorganizados por prioridade real considerando as imagens estáticas existentes

### GIFs Essenciais Mantidos:
- Test Cameras alternando câmeras (mudança visual no viewport)
- Visualizador de rotação do pivot (iluminação em tempo real)
- Preview Action/NLA (animação rodando)
- Detect Cameras/Actions/NLA (ações automáticas)
- Camera Creation Presets (criação dinâmica de objetos)
- Render Progress (progresso dinâmico)
- Open Output Folder (ação dinâmica)

