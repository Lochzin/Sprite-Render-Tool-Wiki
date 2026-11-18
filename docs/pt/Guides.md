# Guias e Workflows

Esta página é o ponto de partida para **fazer coisas** com o Sprite Render Tool: um guia completo do primeiro render e sete workflows prontos para seguir. Todos os números, pastas e imagens desta página vêm de renders reais feitos com o add-on **0.3.12** no **Blender 5.1.2** (EEVEE, 256 × 256 px, para os testes serem rápidos). Os valores dos campos são os usados no teste, então você pode reproduzir cada resultado e depois adaptá-lo ao seu personagem.

> **Sobre os exemplos.** Os personagens de teste têm cerca de 1,7 m de altura, por isso os valores de `Distance` e `Target Height` das câmeras são pequenos (`3.2` e `0.85`). Para um personagem maior ou menor, ajuste esses dois valores até o personagem preencher o quadro. A pasta de saída dos exemplos é `D:\Sprites\Render`; use a pasta que preferir.

> **Primeiro a luz.** Todos os workflows abaixo pressupõem o passo do **Light Pivot** ([Guia Básico, passo 1](#guia-básico)): a luz é **filha** do Empty pivô e o pivô está selecionado no add-on. Caso contrário a luz fica parada enquanto as câmeras giram e os sprites saem iluminados de forma diferente em cada direção ([Workflow 7](#workflow-7-light-pivot-luz-coerente-em-todas-as-direções) mostra a diferença).

---

## Escolhendo o workflow

| Sua situação | Use |
| --- | --- |
| É a minha primeira vez, só quero sprites de uma animação | [Guia Básico](#guia-básico), depois o [Workflow 1](#workflow-1-um-personagem-8-direções-uma-animação-em-loop) |
| Um personagem, uma animação em loop, 8 direções | [Workflow 1](#workflow-1-um-personagem-8-direções-uma-animação-em-loop) |
| Várias animações para uma engine de jogo (uma pasta por câmera, nomes curtos) | [Workflow 2](#workflow-2-conjunto-de-animações-para-engine-de-jogo) |
| Personagem e animações baixados do Mixamo (FBX, nomes sujos, T-pose) | [Workflow 3](#workflow-3-animações-mixamo) |
| A animação já está montada no editor NLA, ou quero controlar os números dos frames | [Workflow 4](#workflow-4-modo-nla-com-sequência-combinada) |
| Um prop, um efeito, um objeto sem rig, ou "só quero os frames 1 a 12" | [Workflow 5](#workflow-5-frame-ranges-sem-rig-props-e-frames-de-teste) |
| Uma montaria com cavaleiro, ou qualquer cena com **dois armatures** | [Workflow 6](#workflow-6-cavalo-com-cavaleiro-dois-armatures) |
| Qualquer conjunto de várias direções (**sempre**): prender a luz ao Light Pivot | [Guia Básico, passo 1](#guia-básico) e [Workflow 7](#workflow-7-light-pivot-luz-coerente-em-todas-as-direções) |

---

## Guia Básico

Do zero ao primeiro render. Usa um personagem com algumas Actions, 4 câmeras e uma animação (`Running`).

### 0. Antes de começar

- Instale e ative o add-on ([Instalação](Installation.md)). O painel fica em `3D Viewport > Sidebar (N) > Sprite Render`.
- Tenha um personagem com rig e pelo menos uma Action (ou NLA strip).
- **Salve o arquivo .blend** se mantiver a `Output Folder` padrão (`//sprites/`): um caminho `//` é relativo ao arquivo salvo. Caso contrário digite uma pasta absoluta, como `D:\Sprites\Render`.

![Painel Sprite Render: Render All e as abas de ícones](/_static/images/SRT_Sidebar.png)

O botão **Render All** fica sempre no topo do painel. A coluna de ícones à esquerda escolhe a aba: **Info**, **Setup**, **Cameras**, **Animations**, **Render**.

### 1. Light Pivot (luz presa ao pivô)

O Light Pivot faz a luz girar junto com as câmeras, para que todas as direções sejam iluminadas do mesmo jeito. Faça isso **antes** de criar as câmeras.

1. Adicione um **Empty** no centro do personagem (o teste usa `LightPivot` na origem, onde o personagem fica).
2. Faça a sua luz (`Sun`) **filha** do Empty: selecione a luz, depois o Empty (ativo), `Ctrl+P` > **Object (Keep Transform)**. Aponte a luz como quiser para a câmera **front**.
3. Aba **Setup** > seção **Light Pivot**: marque `Enable Light Pivot` e escolha `Object` = `LightPivot`.

![Aba Setup, seção Light Pivot](/_static/images/SRT_LightPivot.png)

Conferido no teste: com a luz presa, o pivô gira de câmera em câmera (`0°, 90°, 180°, 270°` no preset de 4 câmeras) e a luz gira com ele. Veja o [Workflow 7](#workflow-7-light-pivot-luz-coerente-em-todas-as-direções) para o resultado com e sem a luz presa.

### 2. Câmeras (aba **Cameras**)

1. Na caixa **Create Cameras** escolha `Preset` = `4 Cameras - Front, Right, Back, Left`.
2. Defina `Elevation` = `10°`, `Target Height` = `0.85`, `Distance` = `3.2`.
3. Clique em **Create Cameras**. Quatro câmeras (`Camera_Front`, `Camera_Right`, `Camera_Back`, `Camera_Left`) aparecem na cena e na lista **Cameras (render order)**.

As câmeras olham para o Light Pivot (elevado por `Target Height`); sem pivô elas olhariam para a origem do mundo. Cada câmera também recebe seu `Light Rotation` (`0°, 90°, 180°, 270°` aqui), que é o que gira o pivô. Os nomes das câmeras são **direções do mundo** (front = a câmera do lado `-Y`), não a direção para onde o personagem olha.

![Aba Cameras](/_static/images/SRT_CameraTab.png)

### 3. Animações (aba **Animations**)

1. `Animation Mode` = `Use Actions` (padrão).
2. `Armature` = o armature do seu personagem.
3. Clique em **Detect Actions**. Todas as Actions do arquivo são listadas com seu intervalo de frames. Poses estáticas (1–2 frames, como a T-pose de um FBX) entram na lista **desmarcadas**.
4. Deixe só `Running` marcada (frames `1` a `22` no teste). Use **Disable All** e depois marque as que quiser.

![Aba Animations](/_static/images/SRT_AnimationTab.png)

### 4. Saída (aba **Setup**, **Project & Output**)

1. `Project Name` = `MyGame`, `Object Name` = `Enemy01`.
2. `Output Folder` = sua pasta (exemplo: `D:\Sprites\Render`).
3. Mantenha `Output Name` = `$objectName_$animation_$frame` e **Create Folders**: `Object`, `Animation`, `Camera` marcados.
4. Leia **First image will be saved as:** para confirmar o caminho real do primeiro arquivo.

![Aba Setup: Project & Output](/_static/images/SRT_SetupTab.png)

### 5. Conferir (aba **Render**)

- Leia o checklist (**Ready to render?**). Um aviso como *Film > Transparent is off* tem um botão **Fix**; clique nele. **Render All** fica desabilitado enquanto o checklist mostrar erros.
- `Resolution` X / Y = `256` / `256` para um teste rápido (use o tamanho final depois).

![Aba Render](/_static/images/SRT_RenderTab.png)

### 6. Renderizar

1. Clique em **Render All**. O diálogo mostra o número de imagens, o destino e o tempo estimado. Clique em **Render**.
2. Acompanhe a barra de progresso no topo do painel. **ESC** ou **Cancel Render** para depois do frame atual.
3. O Blender fica ocupado enquanto cada frame renderiza; isso é normal.

![Diálogo de confirmação](/_static/images/SRT_ConfirmDialog.png)

### 7. O resultado

4 câmeras × 22 frames = **88 imagens** (cerca de 10 s no teste).

```
D:\Sprites\Render\
└─ Enemy01\
   └─ Running\
      ├─ Camera_Front\   Enemy01_Running_0001.png … Enemy01_Running_0022.png
      ├─ Camera_Right\   Enemy01_Running_0023.png … Enemy01_Running_0044.png
      ├─ Camera_Back\    Enemy01_Running_0045.png … Enemy01_Running_0066.png
      └─ Camera_Left\    Enemy01_Running_0067.png … Enemy01_Running_0088.png
```

Linhas = câmeras (front, right, back, left), colunas = frames 1, 7, 13 e 19 de cada câmera:

![Resultado do Guia Básico: 4 câmeras, frames 1, 7, 13 e 19](/_static/images/workflows/SRT_WF0_BasicGuide.png)

> Os números dos arquivos continuam contando entre câmeras (`Camera_Right` começa em `0023`). Para recomeçar em `0001` em cada pasta de câmera, veja o [Workflow 2](#workflow-2-conjunto-de-animações-para-engine-de-jogo). Repare que o personagem é iluminado do mesmo jeito em todas as linhas: é o Light Pivot trabalhando.

Quando o render termina, o add-on devolve sua Action, NLA, timeline, resolução, câmera e Light Pivot ao que eram (veja [Render](Render.md)).

---

## Workflow 1: um personagem, 8 direções, uma animação em loop

**Objetivo.** O conjunto clássico de sprites: uma animação em loop vista de 8 direções.

**Quando usar.** Jogos top-down ou isométricos com personagens de 8 direções, ou qualquer primeira exportação completa.

**Configuração**

| Onde | Campo | Valor |
| --- | --- | --- |
| aba **Setup** > **Light Pivot** | `Enable Light Pivot` / `Object` | marcado / `LightPivot` (o `Sun` é filho dele; faça isso **antes** de **Create Cameras**) |
| aba **Cameras** | `Preset` | `8 Cameras - 360 Degrees` |
| aba **Cameras** | `Elevation` / `Target Height` / `Distance` | `10°` / `0.85` / `3.2` |
| aba **Cameras** | **Create Cameras** | clique |
| aba **Animations** | `Animation Mode` / `Armature` | `Use Actions` / seu armature |
| aba **Animations** | **Detect Actions** | clique e deixe só `Running` marcada (frames `1`–`22`) |
| aba **Setup** | `Project Name` / `Object Name` | `MyGame` / `Enemy01` |
| aba **Setup** | `Output Name` e **Create Folders** | padrões |
| aba **Render** | `Resolution` | `256` × `256` |

Clique em **Render All**: 8 câmeras × 22 frames = **176 imagens** (20,6 s no teste).

**Resultado**

```
D:\Sprites\Render\
└─ Enemy01\
   └─ Running\
      ├─ Camera_Front\        Enemy01_Running_0001.png … 0022.png
      ├─ Camera_FrontRight\   Enemy01_Running_0023.png … 0044.png
      ├─ Camera_Right\        Enemy01_Running_0045.png … 0066.png
      ├─ Camera_BackRight\    Enemy01_Running_0067.png … 0088.png
      ├─ Camera_Back\         Enemy01_Running_0089.png … 0110.png
      ├─ Camera_BackLeft\     Enemy01_Running_0111.png … 0132.png
      ├─ Camera_Left\         Enemy01_Running_0133.png … 0154.png
      └─ Camera_FrontLeft\    Enemy01_Running_0155.png … 0176.png
```

Primeiro frame de cada direção (a ordem da lista de câmeras é a ordem de render):

![Workflow 1: as 8 direções, frame 1](/_static/images/workflows/SRT_WF1_EightDirections.png)

**Dicas**

- O preset `8 Cameras - 360 Degrees` começa na frente e passa por `FrontRight`, `Right`, `BackRight`, `Back`, `BackLeft`, `Left`, `FrontLeft`. Use `Custom - N cameras in 360 Degrees` (campo `Cameras`) para 4, 6, 12 ou 16 direções.
- Os nomes dos presets são **direções do mundo**: `Camera_Front` fica do lado `-Y` da cena. Se o seu personagem olha para `+X`, `Camera_Front` mostra o lado dele. Gire o personagem, ou marque **Custom Output Names** (aba Cameras) e dê a cada câmera o nome que quiser ([Workflow 2](#workflow-2-conjunto-de-animações-para-engine-de-jogo)).
- Faça um teste rápido antes: aba **Render** > **Enable Frame Step** com um `Step` grande. O botão **Test Frame Count** escreve na barra de status / editor Info do Blender quantos frames e imagens a configuração vai renderizar, sem renderizar.

---

## Workflow 2: conjunto de animações para engine de jogo

**Objetivo.** Várias animações, uma pasta por câmera, nomes de arquivo curtos e previsíveis, e o contador de frames começando em `0001` em cada pasta de câmera.

**Quando usar.** Você importa os sprites numa engine (Godot, Unity, GameMaker…) que lê uma pasta por animação e direção.

**Configuração**

| Onde | Campo | Valor |
| --- | --- | --- |
| aba **Setup** > **Light Pivot** | `Enable Light Pivot` / `Object` | marcado / `LightPivot` (o `Sun` é filho dele; faça isso **antes** de **Create Cameras**) |
| aba **Cameras** | `Preset` | `4 Cameras - Front, Right, Back, Left` (mesmos `Elevation` / `Target Height` / `Distance` de antes) |
| aba **Cameras** | `Custom Output Names` | marcado |
| aba **Cameras** | câmera selecionada > `Output Name` | `Camera_Front` → `S`, `Camera_Right` → `E`, `Camera_Back` → `N`, `Camera_Left` → `W` |
| aba **Animations** | **Detect Actions** | deixe `Running`, `Walking` e `Strafe_Left` marcadas |
| aba **Setup** | `Project Name` / `Object Name` | `IronHorse` / `Enemy01` |
| aba **Setup** | `Output Name` | `$animation_$frame` (sem `$camera`: a pasta da câmera já separa os arquivos) |
| aba **Setup** | **Create Folders** | `Object` ✔, `Animation` ✔, `Camera` ✔, `Project` ✘ |
| aba **Setup** | `Restart Frame Numbering Per Camera` | marcado |

Confira **First image will be saved as:** antes de renderizar. Resultado: 3 animações × 4 câmeras = **348 imagens** (40,8 s).

**Resultado**

```
D:\Sprites\Render\
└─ Enemy01\
   ├─ Running\
   │  ├─ S\   Running_0001.png … Running_0022.png
   │  ├─ E\   Running_0001.png … Running_0022.png
   │  ├─ N\   Running_0001.png … Running_0022.png
   │  └─ W\   Running_0001.png … Running_0022.png
   ├─ Strafe_Left\
   │  ├─ S\   Strafe_Left_0001.png … Strafe_Left_0033.png
   │  └─ E, N, W (mesmo padrão)
   └─ Walking\
      ├─ S\   Walking_0001.png … Walking_0032.png
      └─ E, N, W (mesmo padrão)
```

Frame 8 de cada animação (linhas) em cada câmera (colunas S, E, N, W):

![Workflow 2: três animações, quatro direções](/_static/images/workflows/SRT_WF2_GameSet.png)

**Dicas**

- **Sem** `Restart Frame Numbering Per Camera` o contador continua entre as câmeras da mesma animação. Num segundo teste só com `Walking` e a opção desligada, as pastas foram `S` `0001`–`0032`, `E` `0033`–`0064`, `N` `0065`–`0096` e `W` `0097`–`0128`. Com a opção ligada, todas as pastas começam em `0001`.
- A opção só funciona com a pasta **Camera** marcada, e só importa quando o template **não** tem `$camera`. Se `$camera` está no template, o número é o próprio frame da timeline (veja o [Workflow 4](#workflow-4-modo-nla-com-sequência-combinada)).
- O checklist bloqueia o render se dois pares animação/câmera escreveriam os mesmos arquivos (colisão); assim você não sobrescreve seus sprites sem querer.
- Com **Custom Output Names**, o nome personalizado é o que vai para a pasta da câmera e para `$camera`.

---

## Workflow 3: animações Mixamo

**Objetivo.** Renderizar um personagem do Mixamo com várias animações do Mixamo, mesmo que as Actions importadas tenham nomes inutilizáveis e o FBX traga uma T-pose estática.

**Quando usar.** Seu personagem (`Enemy01.fbx`) e as animações (`Running.fbx`, `Walking.fbx`, `Strafe Left.fbx`, `Pistol Kneeling Idle.fbx`) foram baixados do Mixamo com o mesmo esqueleto.

**Configuração**

1. `File > Import > FBX`: importe o personagem e depois cada FBX de animação. Cada FBX de animação traz seu próprio armature (`Armature.001`, `.002`…).
2. Apague os armatures extras (mantenha o do personagem). As Actions continuam no arquivo (o importador dá a elas um fake user) e funcionam no personagem porque os nomes dos ossos são os mesmos.
3. **Renomeie as Actions** antes de usar o add-on. No teste, o Blender as chamou de `Armature.001|mixamo.com|Layer0`, `Armature.002|mixamo.com|Layer0`… (o nome da animação **não** é mantido). Renomeie em `Outliner > Blender File > Actions` (duplo clique) para `Running`, `Walking`, `Strafe_Left`, `Pistol_Kneeling_Idle`.
4. No add-on: aba **Setup** > **Light Pivot**: `Enable Light Pivot` marcado e `Object` = `LightPivot` (o `Sun` é filho dele, veja o [Guia Básico](#guia-básico)). Depois `Preset` `2 Cameras - Front, Back` (`10°` / `0.85` / `3.2`), `Animation Mode` `Use Actions`, `Armature` = armature do personagem, **Detect Actions**.
5. **Detect Actions** lista 5 Actions: as quatro animações marcadas e a T-pose (`1` frame) **desmarcada**. Deixe a T-pose desligada.
6. Aba **Setup**: marque **Clean Action Names** (inofensivo quando os nomes já estão limpos). Aba **Render**: `Enable Frame Step` com `Step` = `6` (só para manter este teste pequeno).

Resultado: 72 imagens (8,1 s).

```
D:\Sprites\Render\
└─ Enemy01\
   ├─ Pistol_Kneeling_Idle\
   │  ├─ Camera_Front\  Enemy01_Pistol_Kneeling_Idle_0001.png … 0020.png
   │  └─ Camera_Back\   Enemy01_Pistol_Kneeling_Idle_0021.png … 0040.png
   ├─ Running\          Camera_Front (0001–0004), Camera_Back (0005–0008)
   ├─ Strafe_Left\      Camera_Front (0001–0006), Camera_Back (0007–0012)
   └─ Walking\          Camera_Front (0001–0006), Camera_Back (0007–0012)
```

Linhas: `Running`, `Walking`, `Strafe_Left`, `Pistol_Kneeling_Idle` (câmera front, primeiros 4 frames de cada):

![Workflow 3: quatro animações Mixamo](/_static/images/workflows/SRT_WF3_Mixamo.png)

**O que acontece se você pular a renomeação** (mesmo arquivo, saída real):

| Opção | Nomes de pasta e arquivo |
| --- | --- |
| Nomes originais, **Clean Action Names** desligado | `Enemy01\Armature.001_mixamo.com_Layer0\Camera_Front\Enemy01_Armature.001_mixamo.com_Layer0_0001.png` |
| Nomes originais, **Clean Action Names** ligado | `Enemy01\Armature.001\Camera_Front\Enemy01_Armature.001_0001.png` |

**Dicas e armadilhas**

- **Clean Action Names** só remove o sufixo `|mixamo.com|Layer0` do importador (e o prefixo `Armature|`, e troca espaços por `_`). Com o importador de FBX do Blender o nome real da animação já se perdeu, então você ainda fica com `Armature.001`: **renomeie as Actions você mesmo**.
- Renomeie **antes** de clicar em **Detect Actions**. Se renomear depois, as entradas antigas da lista apontam para Actions que não existem mais: o checklist mostra um erro (*enabled action(s) not found*, com um botão **Fix** que apenas as desmarca) e o Detect Actions adiciona os nomes novos **por cima** dos antigos. Remova cada linha obsoleta com o botão `-`.
- A T-pose de um FBX (Action de 1–2 frames) entra na lista desmarcada de propósito.
- As Actions do Mixamo começam no frame `1`: `Running` vai de `1` a `22` e `Walking` de `1` a `32`.

---

## Workflow 4: modo NLA com sequência combinada

**Objetivo.** Usar animações já organizadas na timeline do editor NLA e manter **os números de frame da timeline** nos nomes dos arquivos.

**Quando usar.** Suas animações são NLA strips (com trim, escala, repetição ou um frame inicial específico), ou você quer ver no nome do arquivo a qual frame da timeline a imagem pertence.

**Configuração no Blender (editor NLA).** No armature do personagem (sem Action ativa: faça o push down das Actions), crie:

| Track | Strip | Action | Frames |
| --- | --- | --- | --- |
| `Locomotion` | `Walk` | `Walking` | `1`–`32` |
| `Locomotion` | `Run` | `Running` | `33`–`54` (logo depois de `Walk`) |
| `Extras` (track **mutada**) | `Strafe` | `Strafe_Left` | `1`–`33` |

**Configuração no add-on**

| Onde | Campo | Valor |
| --- | --- | --- |
| aba **Setup** > **Light Pivot** | `Enable Light Pivot` / `Object` | marcado / `LightPivot` (o `Sun` é filho dele; faça isso **antes** de **Create Cameras**) |
| aba **Cameras** | `Preset` | `4 Cameras - Front, Right, Back, Left` (`10°` / `0.85` / `3.2`) |
| aba **Animations** | `Animation Mode` / `Armature` | `Use NLA` / seu armature |
| aba **Animations** | **Detect NLA Strips** | lista `Walk`, `Run` (marcadas) e `Strafe` (**desmarcada**: a track está mutada) |
| aba **Setup** | `Output Name` | `$animation_$camera_$frame` |
| aba **Render** | `Enable Frame Step` / `Step` | marcado / `3` |

Resultado: 2 animações × 4 câmeras = **76 imagens** (8,7 s).

```
D:\Sprites\Render\
└─ Enemy01\
   ├─ Walk\
   │  ├─ Camera_Front\   Walk_Camera_Front_0001.png … Walk_Camera_Front_0031.png   (11 imagens)
   │  ├─ Camera_Right\   Walk_Camera_Right_0001.png … 0031.png
   │  ├─ Camera_Back\    …
   │  └─ Camera_Left\    …
   └─ Run\
      ├─ Camera_Front\   Run_Camera_Front_0033.png … Run_Camera_Front_0054.png     (8 imagens)
      └─ Camera_Right, Camera_Back, Camera_Left (mesmo padrão)
```

Linha de cima: `Walk`; linha de baixo: `Run` (câmera front):

![Workflow 4: NLA strips Walk e Run](/_static/images/workflows/SRT_WF4_NLA.png)

**Dicas**

- No modo NLA o nome usado em `$animation` e na pasta da animação é o **nome da strip** (`Walk`), não o nome da Action (`Walking`).
- Como o template tem `$camera`, o número no arquivo é o **frame da timeline**: `Run` começa em `0033`. Sem `$camera` o add-on usa um contador que recomeça em `0001` a cada animação.
- **Detect NLA Strips** respeita o estado de mute: tracks e strips mutadas entram na lista desmarcadas. Você ainda pode marcar uma: o render tira o mute só daquela strip enquanto renderiza e devolve os mutes depois (conferido no teste).
- A lista traz o **intervalo de frames de cada strip** na timeline. Cada strip é renderizada sozinha (as outras ficam mutadas durante o render dela), então duas strips seguidas viram duas animações, não uma sequência longa.
- O estado do seu NLA (mutes, `use_nla`, Action ativa) é restaurado quando o render termina.
- Com **Frame Step**, o último frame do intervalo é pulado quando o intervalo não encaixa no passo (`Walk` `1`–`32`, passo `3`: o último arquivo é o frame `31`).

---

## Workflow 5: Frame Ranges sem rig (props e frames de teste)

**Objetivo.** Renderizar intervalos da timeline para objetos que não precisam de lista de Actions: props, efeitos, objetos animados por keyframes, ou um teste rápido de alguns frames.

**Quando usar.** A animação está na timeline (um objeto com keyframes, uma simulação…) e você não quer usar Actions nem NLA. Também para um "render de teste" de um frame por câmera.

**Configuração.** No teste, o objeto `Prop` (uma cabeça de macaco) tem keyframes: gira em Z nos frames `1`–`13` e quica em `14`–`24`.

| Onde | Campo | Valor |
| --- | --- | --- |
| aba **Setup** > **Light Pivot** | `Enable Light Pivot` / `Object` | marcado / `LightPivot` (o `Sun` é filho dele; faça isso **antes** de **Create Cameras**) |
| aba **Cameras** | `Preset` | `4 Cameras - Front, Right, Back, Left`; `Elevation` `10°`, `Target Height` `1.0`, `Distance` `6.0` |
| aba **Animations** | `Animation Mode` | `Frame Ranges` (o campo `Armature` não é necessário) |
| aba **Animations** | `+` (Add Frame Range) | três vezes; edite `Name`, `Frame Start`, `Frame End` de cada uma |
| intervalo 1 | | `Spin`, `1`, `12` |
| intervalo 2 | | `Bounce`, `14`, `24` |
| intervalo 3 | | `Test`, `7`, `7` (um só frame; deixe desmarcado até querer um render de teste) |
| aba **Setup** | `Object Name` | `Prop` |

Renderize com `Spin` e `Bounce` marcados: 2 intervalos × 4 câmeras = **92 imagens** (10,0 s). Depois desmarque os dois, marque `Test` e renderize de novo: **4 imagens**, uma por câmera (0,5 s).

```
D:\Sprites\Render\
└─ Prop\
   ├─ Spin\
   │  ├─ Camera_Front\   Prop_Spin_0001.png … 0012.png
   │  ├─ Camera_Right\   Prop_Spin_0013.png … 0024.png
   │  ├─ Camera_Back\    Prop_Spin_0025.png … 0036.png
   │  └─ Camera_Left\    Prop_Spin_0037.png … 0048.png
   ├─ Bounce\            Camera_Front (0001–0011) … Camera_Left (0034–0044)
   └─ Test\              Camera_Front\Prop_Test_0001.png … Camera_Left\Prop_Test_0004.png
```

Linhas: `Spin` (front), `Bounce` (front) e as 4 imagens de `Test` (front, right, back, left):

![Workflow 5: Spin, Bounce e um teste de um frame](/_static/images/workflows/SRT_WF5_FrameRanges.png)

**Dicas**

- Neste modo **nenhuma Action ou NLA strip é aplicada**: a cena é renderizada exatamente como é avaliada naqueles frames. O painel avisa (*Renders the scene as it is*). Se um objeto com rig ainda tem uma Action ativa, ela decide a pose.
- O botão `+` copia o intervalo de frames da cena para a nova entrada; edite os números depois.
- Um intervalo de um frame (`Frame Start` = `Frame End`) é a forma mais rápida de conferir câmeras, enquadramento, luz e nomes de saída com arquivos reais.
- **Static Render** (também em `Animation Mode`) renderiza só o frame atual, com o nome `STATIC` para a animação.

---

## Workflow 6: cavalo com cavaleiro (dois armatures)

**Objetivo.** Renderizar um conjunto em que **dois armatures** se movem juntos (um cavalo e um cavaleiro) com 8 direções.

**Quando usar.** Montarias, veículos com motorista, personagem com arma ou pet em outro rig.

**O que o add-on faz com dois armatures.** O add-on aplica Actions/strips só ao armature do campo `Armature`. O segundo armature fica com o que já tinha. (A opção **Sync Secondary** da lista de Actions aparece como *not implemented*; só é usada na pré-visualização.) Três fatos conferidos na cena de teste (`Horse_Armature` + `Rider_Armature`):

- **Detect Actions lista todas as Actions de objeto do arquivo inteiro**: `Gallop`, `GallopFast`, `Idle` do cavalo **e** `RiderGallop`, `RiderGallopFast`, `RiderIdle` do cavaleiro. Desmarque as que não quer (**Disable All** e depois marque as certas, ou o botão `-`).
- No modo **Use Actions** com `Armature` = `Horse_Armature`, o cavalo galopa mas o cavaleiro **mantém sua própria Action ativa (`RiderIdle`)** em todos os frames. Não fica sincronizado.
- A solução confiável é o **modo NLA** com os dois armatures organizados igualmente na timeline.

**Configuração no Blender (editor NLA).** Dê aos **dois** armatures as mesmas strips nos mesmos frames, numa track cada, e limpe a Action ativa dos dois (push down das Actions):

| Strip | Cavalo (`Horse_Armature`) | Cavaleiro (`Rider_Armature`) | Frames |
| --- | --- | --- | --- |
| `Gallop` | `Gallop` | `RiderGallop` | `1`–`17` |
| `GallopFast` | `GallopFast` | `RiderGallopFast` | `20`–`36` |
| `Idle` | `Idle` | `RiderIdle` | `40`–`105` |

**Configuração no add-on**

| Onde | Campo | Valor |
| --- | --- | --- |
| aba **Setup** > **Light Pivot** | `Enable Light Pivot` / `Object` | marcado / `LightPivot` (o `Sun` é filho dele; faça isso **antes** de **Create Cameras**) |
| aba **Cameras** | `Preset` | `8 Cameras - 360 Degrees`; `Elevation` `15°`, `Target Height` `1.3`, `Distance` `6.0` |
| aba **Animations** | `Animation Mode` / `Armature` | `Use NLA` / `Horse_Armature` (o **cavalo**, não o cavaleiro) |
| aba **Animations** | **Detect NLA Strips** | lista as três strips do cavalo; desmarque `Idle` |
| aba **Setup** | `Project Name` / `Object Name` | `MyGame` / `HorseRider` |

Render: 2 animações × 8 câmeras × 17 frames = **272 imagens** (34,5 s).

```
D:\Sprites\Render\
└─ HorseRider\
   ├─ Gallop\
   │  ├─ Camera_Front\        HorseRider_Gallop_0001.png … 0017.png
   │  ├─ Camera_FrontRight\   HorseRider_Gallop_0018.png … 0034.png
   │  ├─ Camera_Right\        0035 … 0051
   │  ├─ Camera_BackRight\    0052 … 0068
   │  ├─ Camera_Back\         0069 … 0085
   │  ├─ Camera_BackLeft\     0086 … 0102
   │  ├─ Camera_Left\         0103 … 0119
   │  └─ Camera_FrontLeft\    0120 … 0136
   └─ GallopFast\             as mesmas 8 pastas de câmera, HorseRider_GallopFast_0001 … 0136
```

Linhas 1–2: o primeiro frame de `Gallop` em cada direção. Linha 3: `GallopFast` na câmera front (frames 1, 6, 11, 16):

![Workflow 6: cavalo com cavaleiro, 8 direções](/_static/images/workflows/SRT_WF6_HorseRider.png)

**Dicas e armadilhas**

- **Sempre limpe a Action ativa do cavaleiro** quando usar NLA. Se o cavaleiro mantém uma Action ativa (`RiderIdle`) junto das suas NLA strips, a Action ativa é avaliada por cima e o cavaleiro fica na pose de idle (medido no teste: a pose do cavaleiro no frame 5 é a de idle, não a de galope).
- As strips dos dois armatures precisam começar nos mesmos frames: o cavaleiro não é controlado pelo add-on, ele só segue a timeline enquanto o add-on move as strips do cavalo.
- Detect NLA Strips só lê o armature **alvo**. Escolha o que tem as strips que você quer listar.
- Se você só precisa do cavalo (ou o cavaleiro fica numa pose só), **Use Actions** basta: `Armature` = `Horse_Armature`, desmarque as três Actions `Rider…`.
- Os dois armatures são restaurados quando o render termina (no teste os dois voltaram com as strips e sem Actions ativas exatamente como antes).

---

## Workflow 7: Light Pivot, luz coerente em todas as direções

**Objetivo.** Fazer a luz parecer a mesma em todas as câmeras, como se estivesse presa à câmera. **Isto não é opcional**: todos os workflows acima pressupõem este passo.

**Quando usar.** Sempre, para qualquer conjunto com mais de uma direção.

**Configuração.** Exatamente o [Guia Básico, passo 1](#guia-básico): Empty `LightPivot` no centro, `Sun` como filho dele, `Enable Light Pivot` marcado e `Object` = `LightPivot`; depois **Create Cameras** (`8 Cameras - 360 Degrees`, `15°`, `1.3`, `6.0`). Cada câmera recebe um `Light Rotation` (Z) de `0°, 45°, 90° … 315°`. Aqui `Animation Mode` = `Static Render`, só para ter um frame por câmera rapidamente.

**Luz presa x luz solta.** Mesma cena, mesmas câmeras, mesmo frame, 8 imagens cada vez (cerca de 1 s). Em cada par, a imagem da esquerda tem o `Sun` **solto** (não é filho do pivô) e a da direita o tem **preso**:

![Workflow 7: Sun solto (esquerda) e preso ao Light Pivot (direita), mesma câmera](/_static/images/workflows/SRT_WF7_LightPivot.png)

Medido no teste (a rotação da luz no mundo, em Z, em cada câmera):

| Câmera | Rotação do pivô | `Sun` solto | `Sun` preso |
| --- | --- | --- | --- |
| `Camera_Front` | `0°` | `-26°` | `-26°` |
| `Camera_Right` | `90°` | `-26°` | `64°` |
| `Camera_Back` | `180°` | `-26°` | `154°` |
| `Camera_Left` | `270°` | `-26°` | `-116°` |

```
D:\Sprites\Render\
└─ HorseRider\
   └─ STATIC\
      ├─ Camera_Front\   HorseRider_STATIC_0001.png
      ├─ Camera_FrontRight\ … 0002
      └─ … Camera_FrontLeft\ HorseRider_STATIC_0008.png
```

**Dicas e armadilhas**

- **A armadilha.** Se `Enable Light Pivot` está marcado e `Object` escolhido, mas a luz **não é filha** do pivô, o pivô ainda gira a cada câmera (o add-on faz a parte dele) mas nada é iluminado por ele: a luz fica fixa (`-26°` em todas as linhas acima) e os sprites saem iluminados de forma diferente em cada direção. O checklist não avisa. Confira o outliner: o `Sun` precisa aparecer dentro de `LightPivot`.
- Se `Enable Light Pivot` está marcado mas **nenhum `Object` foi escolhido**, nada é rotacionado e o checklist também não avisa.
- Com **Create Cameras**, as câmeras olham para o pivô elevado por `Target Height`. Se você já tem câmeras, use **Detect Cameras**: ele recalcula o `Light Rotation` de cada uma.
- A rotação do pivô é devolvida quando o render termina (no teste o pivô voltou a `0°, 0°, 0°`).
- Para uma luz que também precisa inclinar (não só girar em Z), marque `Enable Full Rotation (XYZ)` e edite o `Light Rotation (XYZ)` de cada câmera.

Veja também [Iluminação](Lighting.md).

---

## Problemas comuns

Somente coisas observadas durante a montagem destes workflows.

| Problema | Causa e solução |
| --- | --- |
| As pastas e arquivos se chamam `Armature.001_mixamo.com_Layer0` | Nomes do Mixamo. Renomeie as Actions no Outliner (visão Blender File) **antes** do Detect Actions. **Clean Action Names** sozinho deixa `Armature.001` ([Workflow 3](#workflow-3-animações-mixamo)). |
| Renomeei uma Action e o checklist mostra *enabled action(s) not found* | A lista ainda tem o nome antigo. Remova as linhas obsoletas com `-` (ou **Fix**, que só as desmarca) e rode **Detect Actions** de novo. |
| O **Detect Actions** adicionou Actions que não quero (outros personagens, o cavaleiro) | Ele lista toda Action de objeto do arquivo. Use **Disable All** e marque as que quer ([Workflow 6](#workflow-6-cavalo-com-cavaleiro-dois-armatures)). |
| A T-pose não aparece marcada na lista | Actions de 1–2 frames entram desmarcadas de propósito. |
| O segundo armature (cavaleiro) fica parado ou na pose de idle | Só o campo `Armature` é animado. Use NLA com os dois armatures organizados igualmente e limpe a Action ativa do segundo ([Workflow 6](#workflow-6-cavalo-com-cavaleiro-dois-armatures)). |
| Os números dos arquivos não recomeçam em cada pasta de câmera | Marque `Restart Frame Numbering Per Camera` (precisa da pasta **Camera**) ([Workflow 2](#workflow-2-conjunto-de-animações-para-engine-de-jogo)). |
| Com **Frame Step** falta o último frame | O intervalo é percorrido do primeiro frame em passos; um último frame que não encaixa no passo é pulado (`1`–`32` passo `3` termina em `31`). |
| Um lado do personagem fica sempre escuro, ou cada direção é iluminada de um jeito | A luz não está presa ao Light Pivot (ou o pivô não está habilitado / escolhido). Faça o `Sun` **filho** do Empty pivô e selecione-o em **Setup > Light Pivot** ([Workflow 7](#workflow-7-light-pivot-luz-coerente-em-todas-as-direções)). O add-on não avisa. |
| `Camera_Front` mostra meu personagem de lado | Os nomes das câmeras são direções do mundo (`-Y` = frente), não a direção do personagem. Gire o personagem ou use **Custom Output Names**. |
| O personagem está minúsculo no quadro | Diminua `Distance` e ajuste `Target Height` para cerca da metade da altura do personagem; para um personagem de 1,7 m o teste usou `3.2` e `0.85`. |
| *Film > Transparent is off* | Clique em **Fix** no checklist (os sprites precisam de canal alfa; o add-on grava PNG, RGBA). |
| **Render All** está cinza | O checklist tem um erro; o tooltip do botão mostra o primeiro. |
| A pasta `//sprites/` é rejeitada | Uma pasta `//` é relativa ao .blend salvo. Salve o arquivo ou digite uma pasta absoluta. |

Referência de velocidade: cerca de 0,12 s por imagem a 256 × 256 no EEVEE na máquina de teste. Use o diálogo do **Render All** para a estimativa da sua cena.
