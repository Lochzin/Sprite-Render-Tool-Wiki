# Changelog

Esta página rastreia mudanças no **Sprite Render Tool** ao longo do tempo.

---

## [0.3.12] - 2026

### Adicionado
- **Sync Secondary no render** (modo Actions): um item com `Sync Secondary Armature` ligado agora anima também uma segunda armadura (por exemplo o cavaleiro de um cavalo) no **Render All**, não só no preview. A Action secundária precisa ter os mesmos frames da principal. Uma caixa **Sync Secondary** abaixo do Detect Actions tem um `Armature` global, uma regra de `Prefix` / `Suffix` (prefixo `Rider`: `Gallop` -> `RiderGallop`), **Auto-fill on Detect Actions** (desligado por padrão) e **Match Secondary Actions**; o checklist avisa sobre itens que não podem ser sincronizados. Veja [Animações](Animations.md)
- **Validação antes de renderizar**: um checklist no topo de **5. Render Settings** ("Ready to render?" / "Fix these before rendering")
  - Verifica: Target Armature (Actions/NLA), lista de animações vazia, nenhuma animação habilitada, Actions/NLA strips em branco ou inexistentes, frame final antes do inicial, sem câmeras, objetos de câmera em branco ou inexistentes, `$frame` ausente do Output Name, colisões de nomes de saída, pasta de saída (vazia, não é pasta, sem permissão de escrita, será criada), formato de imagem diferente de PNG, modo de cor diferente de RGBA, Film > Transparent desligado, Resolution % diferente de 100, problemas do Sync Secondary (sem armadura / Action / slot, duração diferente)
  - A maioria dos problemas tem um botão **Fix** de um clique (Add $frame, Remove them, Disable them, Swap start/end, Use PNG, Use RGBA, Turn on, Set 100%, Turn off)
  - Também mostra "N image(s): A anim x C cam" e uma estimativa de tempo
  - **O Render All fica desabilitado** (cinza, o tooltip mostra o primeiro problema) enquanto houver erros; avisos não bloqueiam
- **Diálogo de confirmação**: o Render All agora abre um resumo antes de começar: animações x câmeras, frames, total de imagens, pasta de destino, tempo estimado (medido no último render da sessão), quantos arquivos existentes serão sobrescritos e os avisos. O botão **Render** do diálogo inicia o render
- **Barra de progresso nativa**: o painel principal mostra a barra de progresso do próprio Blender, a imagem atual, a linha de status (animação, frame, câmera, tempo restante estimado) e um botão **Cancel Render** durante o render, com qualquer aba aberta
- **Lista de câmeras**: uma lista de verdade com adicionar (`+`), remover (`-`), mover para cima/baixo (a ordem da lista é a ordem de render) e um botão "ver por esta câmera" em cada linha; câmeras inválidas aparecem destacadas. A câmera selecionada mostra `Camera` (com busca), `Output Name`, Shift individual e Light Rotation
- **Listas de Actions/NLA/Frame Ranges**: Actions/strips inexistentes aparecem destacadas; `Action` é escolhida com um campo com busca; botões **Enable All** / **Disable All**; cada linha mostra `início-fim (N)` com o número de frames
- **Presets de câmeras com elevação**: `Elevation` (-89 a 89 graus; 0 = nível, 30-45 = visão 3/4 ou isométrica), `Target Height` e `Distance`; um novo preset **Custom - N cameras in 360 Degrees** (campo `Cameras`)
- **Output Folder** (campo `Output Folder` em **1. Project & Output**): pasta base dos sprites, criada automaticamente, padrão `//sprites/`; deixe vazio para continuar usando o Output Path da cena (comportamento legado)
- **Prévia do caminho de saída**: "First image will be saved as:" mostra o caminho real, montado pelas mesmas funções do render, mais avisos do modelo e colisões
- **Auxiliares do Output Name**: botões que acrescentam `projectName`, `objectName`, `animation`, `camera`, `frame` ao modelo, e os modelos prontos `Default` / `Per camera`
- **Interface em português (PT-BR)**: painéis, propriedades, tooltips e mensagens são traduzidos quando o idioma do Blender é português (`pt_BR` ou `pt_PT`)
- **Tooltips**: toda propriedade e operador agora tem uma descrição
- **Restart Frame Numbering Per Camera** (abaixo de Create Folders, desligado por padrão): sem `$camera` no Output Name e com a Camera Folder ligada, a numeração dos arquivos reinicia em 0001 a cada câmera
- **Clean Action Names** (desligado por padrão): nomes de animação legíveis em pastas e arquivos (`Armature|Running|mixamo.com|Layer0` vira `Running`, espaços viram `_`)
- **Detect Actions deixa as poses estáticas desmarcadas**: Actions de 1-2 frames (como a T-pose de um FBX) entram desabilitadas, e a mensagem informa quantas
- **Aviso no Frame Ranges**: o checklist avisa quando a `Armature` tem uma Action ativa, pois ela tocará em todos os intervalos (o campo `Armature` agora também aparece neste modo, e o texto do painel diz "Renders the scene as it is: no action or NLA strip is applied")
- **Testes**: testes `pytest` em `tests/` para caminhos e nomes de arquivo, validação antes do render e cobertura da tradução (rodam fora do Blender)

### Alterado
- **Pipeline de render**: o **Render All** agora é uma fila única de jobs (animação x câmera x frame) consumida por um operador modal movido por um timer
  - Tudo de que um frame depende (Action ou NLA strip, câmera, resolução, shift, light pivot) é aplicado de novo no início de cada par animação/câmera
  - A resolução definida no add-on agora é aplicada na hora do render
  - Só um render pode rodar por vez
  - Ctrl+Z fica bloqueado durante o render
  - ESC e **Cancel Render** param o render depois do frame atual; fechar a janela ou carregar outro arquivo encerra a sessão com segurança
  - O Blender continua ocupado enquanto cada imagem renderiza, então o painel só atualiza entre as imagens
- **O estado da cena é restaurado** quando um render termina, é cancelado ou falha: Action ativa (e slot), `use_nla`, estados de mute de tracks/strips do NLA, intervalo da timeline, frame atual, resolução (X, Y e %), shifts das câmeras, câmera da cena, caminho de saída e rotação do Light Pivot. O preview do Animation Test restaura os mesmos dados ao clicar em **Stop Preview** / **Restore Scene**
- **Selecionar um item** nas listas de Actions/NLA e **trocar o Animation Mode** não alteram mais a cena (chega de Actions apagadas): só os botões de Preview alteram
- **Layout do painel**: o add-on é um painel principal (**Sprite Render**). O **Render All** (ou, durante o render, a barra de progresso e o **Cancel Render**) fica no topo, e os **botões laterais das abas** (só ícone, com tooltips) foram mantidos: **Info** (versão, autor, links de documentação), **Setup** (seções **Project & Output**, **Light Pivot** e **Armature**; aberta por padrão), **Cameras** (Create Cameras, Detect Cameras, Lens Settings, lista de câmeras), **Animations** (modo, `Armature`, listas, `Preview FPS`, Animation Test) e **Render** (**Render Settings**: checklist, resolução, Frame Step, Test Cameras). O passo a passo fica na documentação, não no painel
- **Caminhos e nomes seguros no Windows, Linux e macOS**: caminhos absolutos mantêm a `/` inicial e caminhos UNC são aceitos; caminhos `//` partem do arquivo .blend; caracteres inválidos, nomes reservados do Windows (CON, NUL, COM1...), pontos/espaços no fim e nomes longos demais são limpos em **nomes de arquivo e de pasta** (por exemplo `Armature|mixamo.com|Layer0` vira `Armature_mixamo.com_Layer0`); um modelo sem `$frame` é um erro
- **Detect Cameras / Detect Actions / Detect NLA Strips** agora **mesclam** com a lista em vez de substituí-la: itens existentes mantêm ordem, nome, intervalo, estado de habilitado, shift e nome de saída
- **Create Cameras** pede confirmação antes de substituir câmeras criadas numa execução anterior, só apaga objetos marcados como criados pelo add-on e nunca adota um objeto existente com o mesmo nome (o Blender acrescenta `.001` ao novo). As câmeras entram na lista a partir da frente, em ordem de ângulo
- **Rotação da luz**: Create Cameras e Detect Cameras usam uma única fórmula (a luz olha na mesma direção da câmera; o pivô ou a origem é a referência)
- **Info** mostra a versão lida do `bl_info` (fonte única da verdade)
- As flags de render (`is_rendering`, `is_previewing`, progresso) são zeradas ao ativar o add-on e ao carregar um arquivo, então um crash não deixa mais o painel preso em "renderizando"

### Corrigido
- **Action errada na primeira câmera**: a Action/NLA strip agora é aplicada em toda animação e câmera, inclusive na primeira câmera de cada animação e em configurações com uma única câmera
- **Resolução ignorada pelo Render All** (veja acima)
- **Caminhos de saída no Linux / macOS** perdendo a `/` inicial
- **Caracteres inválidos em nomes de pasta** (Actions do Mixamo com `|`) fazendo a criação de pastas falhar
- **Action perdida ao salvar**: trocar para o modo NLA apagava a Action da armadura e podia deixá-la com 0 usuários
- **Estado de render preso** após um crash ou ao carregar um arquivo salvo durante um render
- **Segundo render** iniciado com um já em andamento, e undo durante o render
- **Test Frame Count** agora funciona no modo FRAME_RANGES
- **Filtro do Detect Actions** (achado em um teste real no Blender 5.1): as Actions agora são filtradas pelo alvo dos slots, já que `id_root` não existe mais no Blender 5.x
- **O Preview parava a reprodução** ao visualizar outro item com a timeline tocando
- **Pasta de saída relativa sem `//`** (por exemplo `sprites`) era resolvida a partir da pasta de trabalho do Blender; agora é relativa ao arquivo .blend
- **Caracteres inválidos na pasta de saída** no Windows (`< > : " | ? *`) agora são um erro no checklist
- **Cancelar depois do último frame** agora conta como render completo
- **Segunda armadura não animada no render**: o Sync Secondary só era usado pelo preview; agora funciona no Render All (veja Adicionado)

### Detalhes Técnicos
- `operators.py` foi dividido no pacote `sprite_render_tool/operators/` (`animations`, `cameras`, `docs`, `helpers`, `paths`, `preview`, `render`, `scene_state`, `validation`); os mesmos 36 operadores e os mesmos `bl_idname`. Os dez operadores de documentação são gerados por uma única função
- `render.py`: `build_segments()` monta a fila; `_RenderSession` guarda só nomes e valores simples (nunca ponteiros RNA) e busca a cena de novo a cada tick; `SPRITE_RENDER_OT_RenderAll` tem uma propriedade oculta `skip_confirm` (definida pelo diálogo); `execute()` (scripts) roda a mesma fila em um laço bloqueante; `SPRITE_RENDER_OT_ESCModal` está obsoleto e só pede o cancelamento
- Novos operadores: `sprite_render.render_confirm`, `sprite_render.fix_issue`, `sprite_render.camera_add`, `sprite_render.camera_remove`, `sprite_render.camera_move`, `sprite_render.camera_view`, `sprite_render.list_set_enabled`, `sprite_render.insert_placeholder`, `sprite_render.set_template_preset`
- Novos módulos: `operators/validation.py` (checagens puras + integração com o Blender), `operators/scene_state.py` (captura/restauração), `operators/paths.py`, `translations.py`; `utils.py` guarda as funções puras de caminho/nome
- Novas propriedades: `output_dir`, `camera_preset_elevation`, `camera_preset_target_height`, `camera_preset_custom_count`, lista de câmeras (`SPRITE_RENDER_UL_cameras`)
- `main_panel_tab` e os operadores `set_main_tab_*` são mantidos só por compatibilidade; a UI não os usa mais
- Rode os testes com `pytest tests` (não precisa do Blender)

---

## [0.3.11] - 2025

### Adicionado
- **Modo de Animação Frame Ranges**: Novo modo de animação para renderizar intervalos de frames específicos sem rig ou animação
  - Novo modo `FRAME_RANGES` no dropdown de Animation Mode
  - Permite renderizar múltiplos intervalos de frames personalizados (ex.: frames 1-10, 20-30, 50-60)
  - Cada intervalo de frames pode ser habilitado/desabilitado individualmente
  - Cada intervalo tem um nome personalizável para organização
  - Não requer armature ou dados de animação - renderiza apenas frames estáticos
  - Útil para renderizar sequências específicas ou frames de teste sem configurar animações
  - Intervalos de frames são gerenciados através de uma interface de lista similar aos modos Actions e NLA
  - Validação garante `frame_end >= frame_start` para cada intervalo

### Corrigido
- **Detectar Câmeras com Light Pivot Desabilitado**: Corrigido bug onde o botão "Detect Cameras" falhava quando o light pivot estava desabilitado
  - Agora permite corretamente a detecção de câmeras mesmo quando o light pivot está desabilitado
  - Verificação do objeto light pivot só ocorre quando o light pivot está habilitado
  - Quando o light pivot está desabilitado, câmeras são detectadas com rotação zero
  - Previne erro "Light pivot object is not set" quando o pivô está intencionalmente desabilitado
- **Barra de Progresso de Renderização Editável**: Corrigido problema onde a barra de progresso de renderização podia ser editada clicando nela
  - Barra de progresso agora é apenas para exibição com representação baseada em caracteres visuais (█ e ░)
  - Porcentagem de progresso e contagens permanecem visíveis mas não editáveis
  - Previne modificação acidental de valores de progresso durante a renderização
- **UI de Progresso de Renderização Não Desaparecendo**: Corrigido bug onde a seção de progresso de renderização podia permanecer visível após a conclusão da renderização
  - Adicionados blocos try-finally para garantir que a flag `is_rendering` seja sempre resetada, mesmo em exceções
  - Melhorado método `_cleanup()` para sempre resetar o estado de renderização no início
  - Adicionado tratamento de exceções em todo o pipeline de renderização para prevenir estado travado
  - UI de progresso agora desaparece confiavelmente quando a renderização termina ou é cancelada
- **Deleção de Arquivo Durante Renderização**: Melhorado tratamento quando arquivos renderizados são deletados durante o processo de renderização
  - Adicionado tratamento de exceções para verificação de arquivo (OSError, IOError)
  - Processo de renderização continua suavemente mesmo se arquivos forem deletados após serem escritos
  - Previne que o processo de renderização trave quando arquivos estão inacessíveis

### Detalhes Técnicos
- Novo PropertyGroup: `FrameRangeItem` com propriedades `name`, `frame_start`, `frame_end` e `enabled`
  - Validação automática via callback `_validate_frame_range()` que garante `frame_end >= frame_start`
  - Valores padrão baseados no intervalo de frames da cena
- Nova UIList: `SPRITE_RENDER_UL_FrameRanges` (bl_idname: `SPRITE_RENDER_UL_frame_ranges`) para exibir lista de intervalos de frames
- Novos operadores: `SPRITE_RENDER_OT_FrameRangeAdd` (bl_idname: `sprite_render.frame_range_add`) e `SPRITE_RENDER_OT_FrameRangeRemove` (bl_idname: `sprite_render.frame_range_remove`)
- Intervalos de frames integrados ao pipeline de renderização: métodos `create_output_directories()`, `execute()` e `invoke()`
- Coleta de animações: `frame_ranges` lista é processada e convertida em formato `(name, frame_start, frame_end)` para renderização

---

## [0.3.10] - 2025

### Alterado
- **Localização do Progresso de Renderização**: Movido o display de progresso de renderização da tab Info para a tab Render
  - O progresso de renderização agora aparece na tab Render abaixo da seção "Render Actions"
  - Melhor fluxo de trabalho: todas as informações relacionadas à renderização (configurações, saída, ações e progresso) em um só lugar
  - O display de progresso só aparece quando a renderização está ativa
  - A tab Info agora foca apenas em informações de versão e links de documentação
- **Recursos Adicionais na Tab Info**: Adicionada seção de Recursos Adicionais na tab Info
  - Seção inclui uma caixa recolhível "📚 Additional Resources" com links de documentação
  - Links para Changelog, Future Features e License
  - Usa a propriedade existente `show_section_additional_resources` (inicia minimizada por padrão)
  - Fornece acesso rápido à documentação adicional diretamente da tab Info
  - Melhora a organização consolidando todos os links de documentação em um só lugar

## [0.3.9] - 2025

### Corrigido
- **Erros de Ícone Inválidos**: Corrigidos crashes TypeError causados por nomes de ícones inválidos
  - Alterado ícone "HISTORY" para "TIME" para o botão Changelog (ícone HISTORY não existe no Blender 5.0)
  - Alterado ícone "LIGHTBULB" para "LIGHT" para o botão Future Features (ícone LIGHTBULB não existe no Blender 5.0)
  - Previne crashes na UI ao abrir links de documentação na tab Info

### Removido
- **Botão de Documentação FAQ**: Removido botão FAQ e operador da tab Info
  - Removido operador `SPRITE_RENDER_OT_OpenDocumentationFAQ`
  - Removido botão FAQ da seção Additional Resources
  - Simplifica a UI e reduz manutenção

### Alterado
- **Seção Additional Resources**: Seção agora inicia minimizada (recolhida) por padrão
  - Adicionada propriedade `show_section_additional_resources` com `default=False`
  - Seção agora é recolhível usando o mesmo sistema de toggle de outras seções
  - Links de documentação (Changelog, Future Features, License) só visíveis quando expandidos
  - Melhora organização da UI reduzindo desordem inicial

## [0.3.8] - 2025

### Corrigido
- **Bug de Duplicação de Renderização**: Corrigido problema onde o processo de renderização estava renderizando frames extras após completar a última câmera
  - Melhorada lógica de avanço de frame e câmera no loop de renderização assíncrono
  - Corrigida validação de frame ao usar recurso de frame step
  - Agora avança corretamente para a próxima câmera quando todos os frames da câmera atual estão completos
  - Previne renderização de frames duplicados de câmeras anteriores

### Removido
- **Funcionalidade de Atualização Automática do Addon**: Removida funcionalidade de atualização automática do addon
  - Removido operador `SPRITE_RENDER_OT_UpdateAddon` devido a problemas de estabilidade
  - Removida classe `SPRITE_RENDER_AddonPreferences` e botão de atualização das Preferências do Addon
  - Atualizações do addon agora devem ser feitas manualmente desinstalando e reinstalando o addon
  - Esta mudança foi feita para prevenir crashes e melhorar a estabilidade

### Detalhes Técnicos
- Refatorado método `_render_next_frame()` em `SPRITE_RENDER_OT_RenderAll`:
  - Reordenadas verificações: verificação de câmeras finalizadas agora acontece antes da validação de frame
  - Melhorada lógica de frame step para identificar corretamente quando a câmera está completa
  - Corrigido avanço de frame para mover imediatamente para a próxima câmera quando os frames estão esgotados
  - Melhor tratamento de casos extremos em sequências de frame step

---

## [0.3.7] - 2025

### Alterado
- **Reorganização de Tabs**: Melhorada estrutura e organização de tabs
  - **Tab Info**: Renomeado de "Header" para "Info" e movido para primeira posição na sidebar
  - **Tab Execute Removida**: Tab removida para simplificar interface
  - **Ações de Renderização**: Botões de renderização e teste movidos para tab Render
  - **Ordem das Tabs**: Nova ordem é Info → Setup → Cameras → Animations → Render
  - Melhor fluxo de trabalho: todas as ações relacionadas a renderização (configurações, saída e execução) em um lugar

### Detalhes Técnicos
- Removido operador `SPRITE_RENDER_OT_SetMainTab_Execute`
- Renomeado `SPRITE_RENDER_OT_SetMainTab_Header` para `SPRITE_RENDER_OT_SetMainTab_Info`
- Atualizado `main_panel_tab` EnumProperty: removido EXECUTE, renomeado HEADER para INFO, reordenados itens
- Tab padrão mudou de SETUP para INFO
- Tab Render agora inclui seção "Render Actions" com botões Render All e Test Cameras

---

## [0.3.6] - 2025

### Adicionado
- **Sistema de Navegação Lateral**: Redesign completo da UI com interface de tabs
  - **Menu Lateral**: Sidebar vertical com botões de ícone para navegação fácil (similar ao UVPackmaster)
  - **5 Tabs Principais**: Setup, Cameras, Animations, Render, Execute
  - **Tab Header**: Tab adicional na parte inferior da sidebar para informações de versão, documentação e progresso de renderização
  - **Tooltips**: Cada botão de tab mostra descrição específica ao passar o mouse
  - **Interface Consolidada**: Toda funcionalidade organizada em um único painel principal
  - Reduz desordem da UI de 9 painéis separados para 1 painel unificado com navegação
- **Armature na Tab Setup**: Adicionado campo de seleção de armature na tab Setup
  - Localizado abaixo da seção Light Pivot para fluxo de trabalho lógico
  - Redundante com tab Animations para conveniência
  - Torna configuração de setup mais completa em um lugar

### Alterado
- **Reestruturação Completa da UI**: Reorganização major da interface
  - **Antes**: 9 painéis colapsáveis separados (Header, Project, Light Pivot, Camera Creation, Cameras, Animations, Render Settings, Output, Actions)
  - **Depois**: 1 painel principal com navegação lateral e 6 tabs
  - Informações do header integradas ao painel principal (não mais separadas)
  - Todo conteúdo acessível através de navegação por tabs
- **UI de Sincronização de Shift**: Melhorada interface de controle de shift
  - **Rótulos dos Botões**: Mudado de "Sync X/Y" para "Desync Shift X/Y"
  - **Lógica Invertida**: Botões agora mostram estado de dessincronização (pressionado = dessincronizado, não pressionado = sincronizado)
  - **Estado Padrão**: Sincronização de shift habilitada por padrão (botões não pressionados = sincronizado)
  - Mais intuitivo: botão pressionado significa "permitir valores individuais"
- **Organização de Tabs**: Conteúdo reorganizado em grupos lógicos
  - **Tab Setup**: Project, Light Pivot, Armature, Camera Creation
  - **Tab Cameras**: Lens Settings, Camera Options, Camera List
  - **Tab Animations**: Modo de animação, configuração Actions/NLA, ferramentas de teste
  - **Tab Render**: Render Settings (Resolution, Frame Step, Playback Speed) + configuração Output
  - **Tab Execute**: Botões de renderização e teste
  - **Tab Header**: Versão, autor, documentação, progresso de renderização

### Corrigido
- **Crash de UI com Propriedades Invertidas**: Corrigido crash ao usar getters/setters para propriedades booleanas invertidas
  - Substituídos getters/setters problemáticos por operadores toggle simples
  - Criados operadores `SPRITE_RENDER_OT_ToggleDesyncShiftX` e `SPRITE_RENDER_OT_ToggleDesyncShiftY`
  - Previne crashes `EXCEPTION_ACCESS_VIOLATION` no sistema de UI do Blender
- **Definições Duplicadas de Operadores**: Corrigido problema onde operadores toggle eram definidos duas vezes
  - Removidas definições de classe duplicadas que estavam causando problemas de renderização de UI
  - Tab Cameras agora exibe todo conteúdo corretamente (Lens Settings, Camera Options, Camera List, botão Detect Cameras)

### Detalhes Técnicos
- Novo painel: `SPRITE_RENDER_PT_MainPanel` com navegação lateral
- Novo operador: `SPRITE_RENDER_OT_SetMainTab` para troca de tabs
- Novos operadores: `SPRITE_RENDER_OT_ToggleDesyncShiftX` e `SPRITE_RENDER_OT_ToggleDesyncShiftY` para controle de shift
- Sistema de tabs: `main_panel_tab` EnumProperty com 6 opções
- Layout da sidebar: Coluna vertical com botões de ícone, botão header na parte inferior
- Troca de conteúdo: Área de conteúdo dinâmica baseada na tab selecionada

---

## [0.3.5] - 2025

### Adicionado
- **Painel Render Settings**: Novo painel dedicado para configurações de renderização
  - **Resolution**: Controles de resolução X e Y (movidos do painel Cameras)
  - **Frame Step**: Habilitar/desabilitar frame stepping com valor de step configurável (1-100)
    - Útil para animações feitas para FPS mais altos (60, 30 fps) que precisam ser renderizadas em intervalos menores
    - Ajusta automaticamente cálculo de contagem total de renderização quando habilitado
    - Exemplo: Step de 2 renderiza frames 1, 3, 5, 7... (pula cada outro frame)
  - **Playback Speed**: Controle de FPS com botão apply (movido do painel Animations)
  - Localizado entre painéis Animations e Output para melhor fluxo de trabalho
- **Ferramenta de Teste de Contagem de Frames**: Ferramenta de debug temporária para testar cálculo de frames
  - Botão "🧪 Test Frame Count" aparece quando Frame Step está habilitado
  - Calcula e exibe total de frames sem renderizar
  - Mostra detalhamento por animação com e sem step aplicado
  - Ajuda a verificar configuração de frame step antes de renderizar
- **Atualização Automática do Addon**: Nova funcionalidade de atualização integrada ao addon
  - Botão "Update Addon from ZIP" nas Preferências do Addon (Preferences → Add-ons → Sprite Render Tool)
  - Abre diálogo de arquivo para selecionar novo arquivo ZIP
  - Cria backup automaticamente antes de atualizar
  - Extrai e instala nova versão
  - Recarrega todos os módulos automaticamente
  - Restaura backup automaticamente se atualização falhar
  - Não precisa desinstalar/reinstalar o addon manualmente
  - Integrado perfeitamente à interface de preferências do addon do Blender

### Alterado
- **Estado Padrão do Painel Header**: Painel Header agora inicia minimizado (colapsado) por padrão
  - Melhor organização da UI - usuários podem expandir quando necessário
  - Versão, autor e botão de documentação ainda acessíveis quando expandido
- **Preset Padrão de Câmera**: Mudado preset padrão de câmera de 4 câmeras para 5 câmeras
  - Preset padrão agora é "5 Cameras - Front, Front Right, Right, Back Right, Back"
  - Melhor padrão para a maioria dos fluxos de trabalho de renderização de sprites
- **Template Padrão de Output**: Mudado template padrão de nome de saída
  - **Antes**: `$projectName_$objectName_$animation_$camera_$frame`
  - **Depois**: `$objectName_$animation_$frame`
  - Template padrão simplificado sem nome de projeto e câmera
- **Reorganização da UI**: Movidas configurações relacionadas a renderização para novo painel Render Settings
  - Resolution movido do painel Cameras para painel Render Settings
  - Frame Step movido do painel Animations para painel Render Settings
  - Playback Speed movido da caixa de teste Animations para painel Render Settings
  - Melhor organização das opções de configuração de renderização

### Corrigido
- **Frame Step Não Funcionando**: Corrigido problema onde frame step não estava sendo aplicado durante renderização
  - Cálculo de frame step agora funciona corretamente em ambos os modos de renderização síncrono e assíncrono
  - Contagem total de frames calculada corretamente com step aplicado
  - Iteração de frame pula frames corretamente de acordo com valor de step
- **Bug de Reset do Contador Sequencial**: Corrigido problema onde contador sequencial de frames estava resetando ao trocar câmeras
  - Contador sequencial agora só reseta ao iniciar nova animação, não ao trocar câmeras
  - Previne sobrescrita de arquivos quando `$camera` não está no template de saída
  - Frames continuam numerando sequencialmente através de todas as câmeras para a mesma animação
- **NLA Strip Não Reativando na Troca de Câmera**: Corrigido problema onde NLA strip não estava sendo reativada ao trocar câmeras
  - Primeira câmera às vezes estava usando animação aleatória em vez da correta
  - NLA strip agora reativa corretamente ao trocar câmeras em ambos os modos de renderização síncrono e assíncrono
  - Garante que animação correta está ativa para cada ângulo de câmera
  - Aplicado antes de cada renderização para garantir estado correto da animação
- **Crash de Atualização do Addon**: Corrigido crash ao atualizar addon após reload de módulo
  - Protegidas chamadas `self.report()` com try/except para prevenir crashes
  - Adicionado fallback para `print()` para mensagens de erro
  - Melhorado tratamento de erros durante processo de atualização do addon

### Detalhes Técnicos
- Cálculo de frame step: `range(start_frame, end_frame + 1, step)` quando habilitado
- Frame step aplicado em ambos métodos `execute()` (síncrono) e `_render_next_frame()` (assíncrono)
- Lógica de contador sequencial: Só reseta em nova animação (`_current_frame == 0` E `_current_cam_index == 0`)
- Operador de atualização: `SPRITE_RENDER_OT_UpdateAddon` com sistema completo de tratamento de erros e backup
- Localização de backup: `{addon_path}_backup` para segurança
- Operador de teste: `SPRITE_RENDER_OT_TestFrameCount` (ferramenta de debug temporária)

---

## [0.3.4] - 2025

### Alterado
- **Modularização do Código**: Reestruturação completa da base de código do addon em arquitetura modular
  - Dividido `Sprite Render Tool.py` monolítico em módulos organizados:
    - `constants.py`: Presets de câmera e valores constantes
    - `properties.py`: Todas as classes PropertyGroup e definições UIList
    - `utils.py`: Funções auxiliares e utilitários
    - `panels.py`: Todas as classes de painel UI
    - `operators.py`: Todas as classes de operador
    - `__init__.py`: Ponto de entrada com registro e suporte a hot-reload
  - Melhorada manutenibilidade e organização do código
  - Melhor separação de responsabilidades
  - Mais fácil estender e modificar componentes individuais

### Corrigido
- **Bug de Instalação**: Corrigido erro `RuntimeError: 'method-wrapper' object has no attribute 'bl_info'`
  - Resolvido problema de importação circular entre `__init__.py` e `panels.py`
  - Adicionada definição local de `bl_info` em `panels.py` para evitar dependências circulares
  - Garantida ordem adequada de carregamento de módulos

### Detalhes Técnicos
- Nova estrutura de diretório: pacote `sprite_render_tool/` com arquivos modulares
- Suporte a hot-reload mantido para fluxo de trabalho de desenvolvimento
- Toda lógica de registro/desregistro adequadamente organizada por módulo
- Compatibilidade retroativa mantida - sem mudanças funcionais no comportamento do addon

---

## [0.3.3] - 2025

### Alterado
- **Divisão da Sincronização de Shift**: Botão "Sync Shift" dividido em dois toggles separados
  - **Sync Shift X**: Toggle independente para sincronização de shift horizontal
  - **Sync Shift Y**: Toggle independente para sincronização de shift vertical
  - Permite controle granular - sincronizar um eixo mantendo o outro independente
  - Botões posicionados lado a lado na seção Lens Settings
- **Rótulo Dinâmico de Propriedade de Lente**: Rótulo de configurações de lente agora muda dinamicamente com base no tipo de câmera
  - Mostra "Focal Length" quando o tipo de câmera é Perspective
  - Mostra "Orthographic Scale" quando o tipo de câmera é Orthographic
  - Propriedade correta (`cam_data.lens` ou `cam_data.ortho_scale`) é aplicada com base no tipo de câmera
- **Reorganização da UI do Painel Cameras**: Layout e organização melhorados das configurações de câmera
  - **Camera Count**, **Custom Output Names** e **Enable Full Rotation** agora estão sempre visíveis
  - Essas propriedades estão posicionadas após Lens Settings e antes da Camera List colapsável
  - Apenas a lista de câmeras real permanece colapsável dentro da seção "Camera List"
  - Fluxo de trabalho melhorado: configurações essenciais estão sempre acessíveis

### Removido
- **Botão de Documentação do Painel Project**: Removido botão de documentação do cabeçalho do painel Project
  - Documentação ainda está acessível via o botão principal de documentação no painel Header

### Corrigido
- **Preservação de Valores de Shift Individuais**: Corrigido problema onde valores de shift individuais das câmeras eram perdidos ao desabilitar sincronização
  - Quando a sincronização está habilitada, valores individuais agora são preservados
  - Quando a sincronização está desabilitada, câmeras restauram seus valores de shift individuais originais
  - Valores são mantidos corretamente ao alternar sincronização ligada/desligada

---

## [0.3.2] - 2025

### Alterado
- **Reorganização da UI**: Reestruturação completa da interface do addon
  - Cada seção agora é um painel separado e colapsável
  - Removidas caixas internas e toggles - cada painel é a própria seção
  - Organização e navegação melhoradas
- **Estrutura de Painéis**: Novo layout de painéis
  - **Painel Header**: Informações gerais (versão, autor, botão de documentação)
  - **Painel Project**: Configurações do projeto
  - **Painel Light Pivot**: Configuração do pivô de luz
  - **Painel Camera Creation**: Criação de presets de câmera
  - **Painel Cameras**: Gerenciamento de câmeras e configurações de lente
  - **Painel Animations**: Configuração de animações
  - **Painel Output**: Configurações de saída
  - **Painel Actions**: Botões de renderização e teste
- **Botões de Documentação**: Melhor posicionamento dos botões de documentação
  - Painel header: Botão grande de documentação abaixo do autor
  - Outros painéis: Botão pequeno de documentação no cabeçalho do painel (canto superior direito)

### Removido
- **Referência ao Repositório GitHub**: Removida referência ao repositório GitHub privado do painel header

---

## [0.3.1] - 2025

### Adicionado
- **Configurações de Resolução Sincronizadas**: Novos controles de resolução em Lens Settings
  - Campos Resolution X e Y sincronizados em todas as câmeras
  - Aplicados às configurações de renderização da cena automaticamente
- **Toggle de Sincronização de Shift**: Novo botão "Sync Shift" em Lens Settings
  - Permite alternar entre valores de shift sincronizados e individuais
  - Quando dessincronizado, cada câmera pode ter seus próprios valores de shift
- **Shift Individual por Câmera**: Controles de shift por câmera
  - Campos Shift X e Y aparecem para cada câmera quando o shift está dessincronizado
  - Valores de shift exibidos antes de Render Order na lista de câmeras
  - Valores aplicados automaticamente quando alterados

### Alterado
- **UI de Lens Settings**: Layout melhorado da seção de configurações de lente
  - Seção Lens Settings agora está sempre visível (sem toggle)
  - Removidas opções Sensor Width e Sensor Fit
  - Adicionada opção Camera Type (Perspective/Orthographic)
  - Layout corresponde ao painel de lente padrão do Blender
- **Organização da Lista de Câmeras**: Melhor gerenciamento da lista de câmeras
  - Todas as câmeras individuais agrupadas em uma subseção colapsável "Camera List"
  - Camera List pode ser ocultada/exibida com um toggle
  - Lens Settings permanecem sempre acessíveis

### Corrigido
- **Aplicação de Lens Settings**: Corrigida sincronização de configurações de lente
  - Configurações agora aplicadas corretamente quando câmeras são criadas via presets
  - Configurações aplicadas corretamente quando câmeras são detectadas
  - Resolução aplicada antes de cada renderização

---

## [0.3.0] - 2025

### Adicionado
- **Sistema de Presets de Câmera**: Novo sistema de criação de câmeras com presets predefinidos
  - **8 Configurações de Preset Disponíveis**:
    - 1 Câmera - Front
    - 2 Câmeras - Front, Back
    - 2 Câmeras - Front, Right
    - 3 Câmeras - Front, Left, Right
    - 3 Câmeras - Front, Right, Back
    - 4 Câmeras - Front, Right, Back, Left (Direções Cardeais)
    - 5 Câmeras - Front, Front Right, Right, Back Right, Back
    - 8 Câmeras - 360 Graus (Distribuídas uniformemente)
  - Câmeras são automaticamente posicionadas ao redor do objeto pivô (ou origem)
  - Câmeras automaticamente apontam para o centro com orientação correta
  - Distância configurável do ponto pivô
- **Seção de Criação de Câmeras**: Nova seção dedicada na UI para presets de câmera
  - Localizada antes da seção Light Pivot para melhor fluxo de trabalho
  - Dropdown para selecionar tipo de preset
  - Slider de distância para ajustar distância da câmera
  - Botão "Create Cameras" para aplicar o preset
- **Substituição Automática de Câmeras**: Sistema inteligente de gerenciamento de câmeras
  - Rastreia câmeras criadas pelo plugin
  - Automaticamente deleta câmeras criadas anteriormente pelo plugin ao aplicar um novo preset
  - Afeta apenas câmeras criadas pelo plugin, preservando câmeras criadas manualmente
  - Previne acúmulo de câmeras não utilizadas

### Alterado
- **Layout da UI**: Reordenadas seções para melhor fluxo de trabalho
  - Seção Light Pivot movida antes da seção Camera Creation
  - Deixa mais claro configurar o pivô de iluminação antes de criar câmeras
- **Sistema de Rotação de Câmeras**: Melhorado cálculo de rotação de câmeras
  - Câmeras agora apontam corretamente para o objeto pivô/centro
  - Corrigidos problemas de roll (rotação ao redor do eixo de visualização)
  - Câmeras mantêm orientação correta independentemente da posição (front, side, back)
  - Usa cálculo de rotação baseado em matriz para resultados confiáveis

### Corrigido
- **Bugs de Rotação de Câmeras**: Corrigidos múltiplos problemas de orientação de câmeras
  - Corrigido câmeras apontando para baixo em vez de para o centro
  - Corrigido câmeras laterais sendo rotacionadas 90 graus incorretamente
  - Corrigido câmera traseira sendo invertida (rotação de 180 graus)
  - Todas as câmeras agora mantêm orientação vertical correta
- **Problemas de Undo/Crash**: Corrigidos crashes ao desfazer criação de câmeras
  - Adicionada validação adequada antes de acessar objetos de câmera
  - Corrigido `ReferenceError` quando objetos são removidos por undo
  - Melhorado tratamento de erros para deleção de câmeras
- **Erros de Collection Property**: Corrigido `TypeError` com `bpy.data.objects` e `bpy.data.cameras`
  - Substituído uso incorreto do operador `in` pelo método `get()` adequado
  - Corrigidas todas as verificações de existência de objetos em todo o código

### Detalhes Técnicos
- Novo PropertyGroup: `PluginCameraName` para rastrear câmeras criadas pelo plugin
- Nova CollectionProperty: `plugin_created_cameras` em `SpriteRenderSettings`
- Novo Operator: `SPRITE_RENDER_OT_ApplyCameraPreset` para criar câmeras a partir de presets
- Estrutura de dados de preset de câmera: dicionário `CAMERA_PRESETS` com 8 configurações
- Cálculo de rotação: Usa abordagem baseada em matriz com tratamento adequado de vetor up
- Rastreamento de câmeras: Limpeza automática de câmeras criadas pelo plugin ao aplicar novos presets

---

## [0.2.8] - 2025

### Alterado
- **Layout da UI**: Reordenadas seções para melhorar o entendimento do usuário
  - Seção Light Pivot agora aparece acima da seção Cameras
  - Deixa mais claro que a configuração do pivô de luz afeta a renderização das câmeras
  - Melhora o fluxo de trabalho configurando iluminação antes das câmeras

### Adicionado
- **Botões de documentação específicos por seção**: Adicionados botões de ajuda em cada seção principal
  - Cada seção (Project, Light Pivot, Cameras, Animations, Output) agora tem um botão de documentação
  - Botões abrem a página de documentação correspondente no navegador padrão
  - Fornece acesso rápido a guias relevantes sem sair do Blender
  - Links de documentação:
    - **Project**: Abre página principal de documentação
    - **Light Pivot**: Abre documentação de Iluminação
    - **Cameras**: Abre documentação de Câmeras
    - **Animations**: Abre documentação de Animações
    - **Output**: Abre documentação de Saída

### Detalhes Técnicos
- Novos operadores: `SPRITE_RENDER_OT_OpenDocumentationProject`, `SPRITE_RENDER_OT_OpenDocumentationLighting`, `SPRITE_RENDER_OT_OpenDocumentationCameras`, `SPRITE_RENDER_OT_OpenDocumentationAnimations`, `SPRITE_RENDER_OT_OpenDocumentationOutput`
- Função `draw_section_toggle()` modificada para aceitar parâmetro opcional de operador de documentação
- Todos os links de documentação apontam para a versão em inglês (`/en/`) da documentação

---

## [0.2.7] - 2025

### Alterado
- **UI de Output**: Campo Output Path movido acima do template Output Name
  - Deixa mais claro onde os arquivos serão salvos antes de configurar a nomenclatura
  - Rótulo atualizado de "Use Folders" para "Create Folders" para maior clareza
- **Terminologia**: Referências atualizadas de "pivot object" para "light pivot object" em todo o código
  - Mensagens de erro e comentários agora usam terminologia mais clara
  - Melhora o entendimento do propósito da funcionalidade

### Adicionado
- **Log de debug do light pivot**: Adicionada mensagem de log ao iniciar renderização com light pivot
  - Mostra qual objeto pivot está sendo usado
  - Mostra quantos slots de rotação de luz (câmeras) estão vinculados
  - Também registra quando o light pivot está desabilitado ou não configurado
- **Log de rotação do Test Cameras**: Adicionados logs detalhados de rotação ao usar o botão Test Cameras
  - Mostra valores de rotação sendo aplicados de cada câmera (antes e depois)
  - Exibe rotação em graus para modos XYZ (rotação completa) e apenas Z
  - Ajuda a depurar problemas de rotação de luz

### Corrigido
- **Enable Full Rotation (XYZ)**: Corrigido bug onde o modo de rotação completa não funcionava corretamente
  - Problema era causado pela propriedade `light_rotation` retornando um objeto `Euler` em vez de uma tupla
  - Código agora trata corretamente tanto objetos `Euler` quanto formatos tupla/lista
  - Rotação XYZ completa agora funciona como esperado quando habilitada

---

## [0.2.6] - 2025

### Adicionado
- **Botão de documentação**: Adicionado botão de ajuda no painel principal para abrir a documentação
  - Botão localizado ao lado do número da versão no topo do painel
  - Abre o site oficial de documentação no navegador padrão
  - Fornece acesso rápido a guias, tutoriais e FAQ
  - URL atualizada em `bl_info` para apontar para a documentação oficial

### Alterado
- **Localização**: Traduzidos todos os tooltips e descrições do português para inglês
  - Descrição e tooltips dos itens de `animation_mode` EnumProperty agora em inglês
  - Todos os tooltips voltados ao usuário agora estão consistentemente em inglês
  - Melhora a acessibilidade para usuários internacionais
- **README.md**: Adicionadas instruções de instalação e seção de documentação
  - Guia de instalação passo a passo
  - Link para documentação oficial com visão geral dos tópicos disponíveis
  - Nota sobre acesso à documentação a partir do painel do addon

---

## [0.2.5] - 2025

**Destaques:**
- Adicionado **Cancelamento com tecla ESC**: Capacidade de cancelar renderização pressionando a tecla ESC
  - Operador modal detecta automaticamente o pressionamento da tecla ESC durante a renderização
  - Cancela a renderização imediatamente quando ESC é pressionado
  - Funciona junto com o botão de cancelar existente
- Adicionado **Botão para abrir pasta de saída**: Botão para abrir a pasta de saída no explorador de arquivos
  - Localizado ao lado do campo "Output Path" na seção Output
  - Converte automaticamente caminhos relativos do Blender (`//`) para caminhos absolutos
  - Cria a pasta se ela não existir antes de abrir
  - Suporte multiplataforma (Windows, macOS, Linux)

---

## [0.2.4] - 2025

### Removido
- **Sistema de debug**: Removidas todas as funcionalidades e elementos de UI relacionados a debug
  - Removida propriedade booleana `debug_light_rotation`
  - Removida propriedade toggle `show_section_debug`
  - Removida seção de debug do painel UI
  - Removida função de callback `update_debug_light_rotation()`
  - Removidos todos os prints de debug e mensagens de log
  - Simplificado método `apply_light_rotation()` removendo parâmetro de debug e logging condicional

### Alterado
- Assinatura do método `apply_light_rotation()` simplificada: removido parâmetro `debug`
  - Método agora apenas aplica rotação sem qualquer saída de debug
  - Todas as chamadas para `apply_light_rotation()` atualizadas para usar assinatura simplificada

### Detalhes Técnicos
- Código limpo removendo condicionais e prints relacionados a debug
- Melhorada a manutenibilidade do código removendo infraestrutura de debug não utilizada

---

## [0.2.3] - 2025

**Destaques:**
- Adicionada **Validação de caminho de saída**: O add-on agora valida se o caminho de saída está configurado e existe antes de renderizar
  - Previne renderização quando o caminho de saída está vazio ou inválido
  - Mostra mensagens de erro claras quando a validação do caminho falha
  - Funciona em ambos os modos de renderização síncrona e assíncrona

**Corrigido:**
- **Suporte a caminhos relativos do Blender**: Corrigido o tratamento de caminhos relativos do Blender (começando com `//`)
  - Agora converte corretamente caminhos relativos para caminhos absolutos
  - Previne problemas quando o Blender salva caminhos como relativos (ex.: `//TestRender\`)
  - Aplicado a todos os métodos de processamento de caminho

---

## [0.2.2] - 2025

**Destaques:**
- Adicionado **Toggle de Habilitar Light Pivot**: Nova propriedade booleana `enable_light_pivot` para controlar a funcionalidade de pivô de luz
  - Quando habilitado (padrão: `True`): A rotação de luz é aplicada ao objeto pivô durante a renderização
  - Quando desabilitado: A rotação de luz é ignorada, mesmo se um objeto pivô estiver configurado
  - O campo de seleção do objeto pivô só é visível quando `enable_light_pivot` está habilitado
  - Isso permite que os usuários desabilitem temporariamente a rotação de luz sem remover a configuração do objeto pivô

**Alterado:**
- A rotação de luz agora só é aplicada quando tanto `pivot_object` está definido QUANTO `enable_light_pivot` está habilitado
- O campo de UI do objeto pivô é exibido condicionalmente com base no estado de `enable_light_pivot`

---

## [0.2.1] - 2025

**Destaques:**
- Fluxo de trabalho multi-câmera aprimorado com `render_order` por câmera.
- Adicionada **rotação de luz baseada em pivô** por câmera, com rotação XYZ completa opcional.
- Introduzidas **opções de estrutura de pastas de saída**:
  - Pastas Project/Object/Animation/Camera.
- Adicionado **template de saída** com placeholders:
  - `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`.
- Implementado **Render All (async)** com:
  - Barra de progresso, mensagens de status e contadores de renderização.
  - Botão de cancelar renderização.
- Adicionados painéis **Animations Test** para Actions e NLA:
  - Visualização, navegação de frames e controles de FPS personalizados.
- Adicionados helpers de detecção automática:
  - **Detect Cameras**
  - **Detect Actions**
  - **Detect NLA Strips**
