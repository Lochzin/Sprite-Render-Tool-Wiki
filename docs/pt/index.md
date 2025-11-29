## Sprite Render Tool — Wiki Oficial

Add-on para **Blender** focado em gerar sprites 2D a partir de animações 3D, com **suporte multi‑câmera**, **detecção automática de animações** (Actions e NLA), e **nomenclatura de arquivos altamente personalizável**, ideal para jogos 2D e pipelines de sprites.

---

## Visão Geral

**Sprite Render Tool** é um add-on que:
- **Renderiza animações como sprites**: itera sobre os frames de Actions ou NLA strips e salva cada frame como uma imagem.
- **Suporta múltiplas câmeras**: você define uma lista de câmeras, ordem de renderização e nomes de saída opcionais personalizados.
- **Controla iluminação via um pivô**: usa um objeto pivô para rotacionar a "luz" em relação à câmera (ótimo para sprites isométricos/top‑down).
- **Gera pastas de saída organizadas**: estrutura diretórios por projeto, objeto, animação e câmera.
- **Fornece um painel de teste de animações**: visualiza Actions ou NLA diretamente do add-on.
- **Mostra progresso e permite cancelamento**: barra de progresso integrada e botão de cancelar durante a renderização.

Funciona com Blender **5.0.0+**.

---

## Instalação Rápida

- **Arquivo do add-on**: `Sprite Render Tool.py`
- **Compatibilidade**: Blender 5.0.0 ou mais recente.

**Passos:**
- **1.** Abra o Blender → `Edit > Preferences... > Add-ons`  
- **2.** Clique em **Install...** e escolha `Sprite Render Tool.py`  
- **3.** Procure por **Sprite Render Tool** na lista de add-ons e ative-o  
- **4.** O painel aparecerá em: `View3D > Sidebar (N) > Sprite Render > Sprite Render`

---

## Painel Principal (UI)

O painel principal é implementado pela classe `SPRITE_RENDER_PT_MainPanel` e organiza o fluxo de trabalho em seções:

- **🔖 Projeto**
  - `Project Name`
  - `Object Name`

- **🎥 Câmeras**
  - `Camera Count`: número de câmeras na lista interna.
  - `Custom Output Names`: usa nomes diferentes dos nomes dos objetos de câmera para saída de arquivos.
  - `Enable Full Rotation (XYZ)`: controla se o pivô rotaciona em XYZ ou apenas ao redor de Z.
  - Para cada câmera (`Camera 1`, `Camera 2`, ...):
    - `Name`: nome do objeto de câmera na cena.
    - `Output Name`: nome usado nos nomes de arquivos (se `Custom Output Names` estiver habilitado).
    - `Render Order`: ordem em que esta câmera será renderizada.
    - `Light Rotation`: rotação da luz/pivô (apenas Z ou XYZ).
  - Botão **Detect Cameras** (`sprite_render.autofill_light_rotation`):
    - Detecta câmeras visíveis na View Layer atual.
    - Preenche a lista com nomes, contagem e rotação Z baseada no objeto pivô.

- **💡 Light Pivot**
  - `Pivot Object`: objeto usado como pivô para rotação da luz.
  - **💡 Dica**: Você pode colocar luzes como filhos do pivô (elas rotacionarão com as câmeras) e adicionar luzes fixas fora do pivô para iluminar áreas escuras do personagem.

- **🎞️ Animações**
  - `Target Armature`: a armadura a ser animada.
  - `Animation Mode`:
    - **NLA**: usa NLA strips.
    - **ACTIONS**: usa Actions listadas dentro do add-on.
    - **STATIC**: renderiza apenas o frame atual.

  **Modo ACTIONS:**
  - Lista `Actions` (`SPRITE_RENDER_UL_Actions`):
    - Cada item tem: `enabled`, `name`, `frame_start`, `frame_end`, e opções de sincronização secundária (ainda não implementadas).
  - Botões:
    - `Detect Actions`: lê `bpy.data.actions` e preenche a lista.
    - `Add`, `Remove`: gerencia a lista manualmente.
  - **Animations Test (ACTIONS)**:
    - `Preview Action` / `Stop Preview`
    - Controles de frame (primeiro, anterior, próximo, último).
    - Configuração `Custom FPS` + botão `Apply`.

  **Modo NLA:**
  - Lista `NLA Strips` (`SPRITE_RENDER_UL_NLAStrips`):
    - Cada item: `enabled`, `name` (nome da strip), `track_name`, `frame_start`, `frame_end`.
  - Botões:
    - `Detect NLA Strips`: lê as tracks NLA da armadura alvo.
    - `Add`, `Remove`: gerencia a lista manualmente.
  - **Animations Test (NLA)**:
    - `Preview NLA Strip` / `Stop Preview`
    - Controles de frame (primeiro, anterior, próximo, último).
    - Configuração `Custom FPS` + botão `Apply`.

- **💾 Output**
  - `Output Name` (`output_template`):
    - Template padrão:  
      `$projectName_$objectName_$animation_$camera_$frame`
  - **Placeholders disponíveis:**
    - `$projectName`: nome do projeto.
    - `$objectName`: nome do objeto/personagem.
    - `$animation`: nome da Action ou NLA Strip.
    - `$camera`: nome da câmera ou `output_name`.
    - `$frame`: número do frame formatado como `0001`, `0002`, etc.
  - **Use Folders:**
    - `Project Folder`, `Object Folder`, `Animation Folder`, `Camera Folder`  
    - Constrói uma hierarquia de pastas baseada nesses níveis.
  - `Output Path` (das configurações de renderização da cena do Blender): pasta base onde tudo será criado.

- **🐛 Debug**
  - `Light Rotation Debug`: imprime informações de debug sobre a rotação do pivô no console.

- **📊 Render Progress**
  - Mostrado durante a renderização:
    - `[atual/total]`, porcentagem, barra de progresso e mensagem de status.
    - Botão **❌ Cancel Render**.

- **⚙️ Actions (Footer)**
  - `🚀 Render All` (`sprite_render.render_all`):
    - Inicia a renderização de todas as animações e câmeras (versão assíncrona usando um timer).
  - `🎯 Test Cameras` (`sprite_render.test_cameras`):
    - Percorre as câmeras configuradas para visualização.

---

## Fluxo de Trabalho Básico

- **1. Prepare a cena**
  - Configure seu personagem / armadura.
  - Crie Actions ou NLA strips para suas animações.
  - Crie as câmeras que serão usadas para sprites.
  - Opcionalmente crie um objeto `Pivot` para controlar a rotação da iluminação ao redor do personagem.

- **2. Configure o painel Sprite Render**
  - Em **Project**: defina `Project Name` e `Object Name`.
  - Em **Cameras**:
    - Defina o `Pivot Object` na seção **Light Pivot**.
    - Clique em **Detect Cameras** para preencher a lista automaticamente.
    - Ajuste `Render Order`, `Output Name` e `Light Rotation` conforme necessário.

- **3. Escolha o modo de animação**
  - **ACTIONS**:
    - Clique em **Detect Actions** para importar todas as Actions.
    - Ajuste `frame_start` e `frame_end` para cada action e habilite apenas as que você deseja renderizar.
  - **NLA**:
    - Selecione uma `Target Armature`.
    - Clique em **Detect NLA Strips**.
  - **STATIC**:
    - O add-on usa o frame atual para renderizar; útil para thumbnails ou poses.

- **4. Configure Output**
  - Ajuste `output_template` se quiser um padrão de nomenclatura diferente.
  - Habilite as opções `Use Folders` de acordo com como você quer organizar os arquivos.
  - Em `Output Path` (Blender Render Properties), escolha a pasta base onde tudo será salvo.

- **5. Teste antes de renderizar tudo**
  - Use **Test Cameras** para verificar cada câmera.
  - Use o painel **Animations Test** (Actions ou NLA) para visualizar animações antes de renderizar.

- **6. Renderize**
  - Clique em **Render All**.
  - Monitore o progresso na seção **Render Progress**.
  - Se necessário, use **Cancel Render** para parar (ele parará após o frame atual terminar).

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

