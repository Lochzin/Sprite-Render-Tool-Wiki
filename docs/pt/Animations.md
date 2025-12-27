# Animações

Esta página explica como o **Sprite Render Tool** lida com animações nos quatro modos: **ACTIONS**, **NLA**, **STATIC** e **FRAME_RANGES**.

---

## Modos de Animação

> **Localização no add-on**: Tab **Animations**

Na seção **Animations** do painel principal você escolhe o modo via `Animation Mode`:
- **ACTIONS**: renderiza a partir de uma lista curada de Actions.
- **NLA**: renderiza a partir de NLA strips na armadura alvo.
- **STATIC**: renderiza apenas o frame atual.
- **FRAME_RANGES**: renderiza intervalos de frames específicos sem rig ou animação.

O modo selecionado controla como as animações são coletadas e como a armadura é preparada para reprodução.

---

## Configurações Comuns

Estas se aplicam em todos os modos:
- `Target Armature` (`target_armature`):
  - O objeto de armadura cujas animações serão renderizadas.
- `is_previewing`:
  - Flag interna usada para saber se uma visualização de animação está sendo reproduzida atualmente.
- `custom_fps`:
  - Usado por **Apply FPS** para sobrescrever o FPS da cena durante visualizações.

Quando `Animation Mode` muda para **NLA**, o add-on:
- Limpa a `action` atual de `target_armature.animation_data` (se houver).
- Garante que `use_nla` está habilitado, para que o NLA esteja ativo.

---

## Modo ACTIONS

### Lista de Actions

O modo **Actions** usa uma lista personalizada (`actions: CollectionProperty(type=ActionItem)`):
- Cada `ActionItem` tem:
  - `name`: o nome da Action em `bpy.data.actions`.
  - `frame_start`, `frame_end`: intervalo de frames para renderizar.
  - `enabled`: se esta action deve ser incluída nas renderizações.
  - `sync_secondary`, `secondary_armature`, `secondary_action`:
    - Projetado para sincronizar uma segunda armadura; parcialmente implementado e marcado como "não implementado" na UI por enquanto.

**Detect Actions** (`sprite_render.detect_actions`):
- Limpa a lista atual.
- Itera sobre todas as `bpy.data.actions`.
- Adiciona um `ActionItem` por Action, com intervalo baseado em `action.frame_range`.

Você também pode:
- Adicionar itens com **Add Action**.
- Remover o item atualmente selecionado com **Remove Action**.

A propriedade `actions_index`:
- Rastreia qual item está selecionado na lista da UI.
- Dispara `update_actions_index` quando alterado para aplicar a nova Action à armadura e atualizar o intervalo de frames da cena.

### Renderização no Modo ACTIONS

Quando `Render All` é iniciado no modo **ACTIONS**:
- O operador coleta animações da lista `actions`:
  - Apenas aquelas com `enabled == True`.
- Para cada action:
  - Procura a Action em `bpy.data.actions` usando seu nome.
  - Atribui-a a `target_armature.animation_data.action`.
  - Garante que `use_nla` está desabilitado, para que a Action dirija a pose diretamente.
- Em seguida, itera sobre todos os frames de `frame_start` a `frame_end` e sobre todas as câmeras configuradas.

O caminho de renderização assíncrono (`invoke` + timer) usa a mesma lógica ao inicializar cada nova animação.

---

## Modo NLA

> **Localização no add-on**: Tab **Animations** → Modo **NLA** selecionado

### Lista de NLA Strips

No modo **NLA**, o add-on pode:
- Coletar automaticamente NLA strips diretamente da armadura, ou
- Usar uma lista curada `nla_strips: CollectionProperty(type=NLAItem)`.

Cada `NLAItem` armazena:
- `name`: nome da strip.
- `track_name`: nome da track NLA.
- `frame_start`, `frame_end`: intervalo ao longo da timeline.
- `enabled`: se esta strip deve ser renderizada.

**Detect NLA Strips** (`sprite_render.detect_nla_strips`):
- Requer uma `Target Armature` válida com `animation_data` e tracks NLA.
- Limpa a lista `nla_strips` existente.
- Itera por todas as tracks e strips NLA.
- Adiciona itens para strips que têm uma `action`.
- Define `enabled` com base em se a track e a strip estão mutadas.

Você também pode:
- Adicionar itens manualmente com **Add NLA Strip**.
- Remover o selecionado com **Remove NLA Strip**.

A propriedade `nla_strips_index`:
- Rastreia qual NLA strip está selecionada na lista.
- Dispara `update_nla_strips_index` para:
  - Mutar todas as tracks/strips.
  - Desmutar apenas a strip selecionada e sua track.
  - Atualizar o intervalo de frames da cena para o início/fim da strip.

### Helper de Ativação NLA

O helper estático:
- `SPRITE_RENDER_OT_RenderAll.activate_nla_strip(obj, strip_name, track_name=None)`
- Muta todas as strips, depois desmuta exatamente a strip com o nome fornecido (e track opcional).
- Força uma atualização de objeto/view layer quando bem-sucedido.

Esta função é usada tanto para:
- Visualizações de teste (`test_nla_strip`), quanto
- Renderização real no modo NLA.

### Renderização no Modo NLA

Quando `Render All` é executado com **NLA** selecionado:
- As animações são coletadas via:
  - `collect_nla_animations(obj, settings)`
  - Ou da lista `nla_strips` configurada, ou do NLA da armadura se a lista estiver vazia.
- Cada entrada de animação contém:
  - `strip_name`, `frame_start`, `frame_end`, `track_name`.
- Antes de renderizar frames para uma animação específica:
  - O operador garante que `animation_data.use_nla = True`.
  - Chama `activate_nla_strip` para desmutar apenas aquela strip.
- Em seguida, como com Actions, itera sobre todos os frames e câmeras.

O caminho de renderização assíncrono usa a mesma sequência via seu callback de timer (`_render_next_frame`).

---

## Modo STATIC

> **Localização no add-on**: Tab **Animations** → Modo **STATIC** selecionado

No modo **STATIC**:
- Não há lista de animações.
- O add-on renderiza **apenas o frame atual** da cena.

Para criação de diretórios, o add-on trata o nome da animação como `"STATIC"`:
- Isso ainda pode ser usado em `$animation` dentro do `output_template`.

Use este modo para:
- Thumbnails.
- Poses-chave.
- Visualizações de frame único de um personagem ou prop.

---

## Modo FRAME_RANGES

> **Localização no add-on**: Tab **Animations** → Modo **FRAME_RANGES** selecionado

### Lista de Frame Ranges

O modo **FRAME_RANGES** permite renderizar intervalos de frames específicos sem precisar de armature ou dados de animação:
- Cada `FrameRangeItem` tem:
  - `name`: nome personalizável para o intervalo (ex.: "Test Frames", "Sequence 1-10")
  - `frame_start`, `frame_end`: intervalo de frames para renderizar
  - `enabled`: se este intervalo deve ser incluído nas renderizações
- Permite renderizar múltiplos intervalos personalizados (ex.: frames 1-10, 20-30, 50-60)
- Útil para renderizar sequências específicas ou frames de teste sem configurar animações

**Gerenciamento de Frame Ranges**:
- Você pode adicionar itens com **Add Frame Range**
  - Um novo intervalo é criado com nome padrão "Range {número}" baseado no tamanho da lista
  - Os valores padrão de `frame_start` e `frame_end` são baseados no intervalo de frames da cena (`scene.frame_start` e `scene.frame_end`)
- Remover o item atualmente selecionado com **Remove Frame Range**
- Validação automática garante `frame_end >= frame_start` para cada intervalo (corrige automaticamente se `frame_end < frame_start`)
- A lista exibe cada intervalo mostrando o nome e o intervalo de frames no formato "frame_start-frame_end"

### Renderização no Modo FRAME_RANGES

Quando `Render All` é iniciado no modo **FRAME_RANGES**:
- O operador coleta intervalos da lista `frame_ranges`:
  - Apenas aqueles com `enabled == True`
- Para cada intervalo:
  - Itera sobre todos os frames de `frame_start` a `frame_end` e sobre todas as câmeras configuradas
  - Não requer armature ou animação - renderiza frames estáticos da cena
- O nome do intervalo pode ser usado em `$animation` dentro do `output_template`

Use este modo para:
- Renderizar sequências específicas de frames sem configurar animações
- Testar frames individuais ou intervalos de frames
- Renderizar frames estáticos de diferentes estados da cena

---

## Painel de Teste de Animações

Os modos **ACTIONS** e **NLA** incluem um subpainel **Animations Test**, controlado por `show_section_animations_test`. **Nota**: O modo **FRAME_RANGES** não possui painel de teste, pois não requer animação ou armature.

![Animation Test Expanded](/_static/images/SRT_AnimationTest_Expanded.png)

- **Preview Action** (`sprite_render.test_action`):
  - Aplica a Action selecionada a `target_armature`.
  - Desabilita o uso de NLA.
  - Define `frame_start`, `frame_end` e frame atual.
  - Se a sincronização secundária estiver habilitada e configurada, aplica a action secundária a outra armadura.
  - Define `is_previewing = True` e inicia a reprodução da timeline (`bpy.ops.screen.animation_play()`).

- **Preview NLA Strip** (`sprite_render.test_nla_strip`):
  - Garante que a armadura tem `animation_data` e NLA habilitado.
  - Muta todas as strips, depois desmuta apenas a selecionada.
  - Define o intervalo de frames para o início e fim da strip.
  - Força uma atualização da view layer.
  - Define `is_previewing = True` e inicia a reprodução.

- **Stop Preview** (`sprite_render.stop_preview`):
  - Para a reprodução da timeline se estiver em execução.
  - Define `is_previewing = False`.

O painel de teste também expõe:
- Botões de navegação de frame (primeiro, anterior, próximo, último).
- `Custom FPS` + **Apply FPS** (`sprite_render.apply_fps`), que define:
  - `scene.render.fps = custom_fps`
  - `scene.render.fps_base = 1.0`

---

## Dicas e Melhores Práticas

- Mantenha os nomes de suas **Action** e **NLA** descritivos (ex.: `walk_front`, `idle_side`, `attack_back`) para gerar nomes de arquivos significativos.
- No modo **ACTIONS**, desabilite quaisquer actions que você não deseja renderizar para reduzir o tempo total de renderização.
- No modo **NLA**, use a lista curada `nla_strips` quando quiser controle refinado sobre quais strips são incluídas, independente do estado de mute no seu arquivo de trabalho.
- Use o painel **Animations Test** para verificar intervalos de frames e velocidade de reprodução de animações antes de iniciar lotes de renderização longos.

