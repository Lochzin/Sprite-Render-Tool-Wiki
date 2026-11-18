# Render

Esta página explica a aba **Render** (checklist, resolução, Frame Step, Test Cameras) e como o **Render All** funciona. Pastas de saída e nomes de arquivo estão em [Output](Output.md).

---

## Checklist (Ready to render?)

> **Localização no add-on**: aba **Render**, no topo

O add-on confere sua configuração o tempo todo e lista os problemas aqui. O cabeçalho diz **Ready to render?** (Pronto para renderizar?) ou **Fix these before rendering** (Corrija antes de renderizar). Muitos problemas têm um botão **Fix** que resolve com um clique.

**Erros** (bloqueiam o Render All; o botão fica cinza e o tooltip mostra o primeiro erro):

| Problema | Botão Fix |
| --- | --- |
| Modo ACTIONS / NLA sem `Armature` | – |
| A lista de animações está vazia, ou nenhuma animação está habilitada | – |
| Linhas habilitadas com nome vazio | **Disable them** |
| Actions / NLA strips habilitadas que não existem | **Disable them** |
| Frame final antes do frame inicial | **Swap start/end** |
| Sem câmeras, ou objetos de câmera em branco / inexistentes na lista | **Remove them** (para as em branco / inexistentes) |
| `Output Name` sem `$frame` | **Add $frame** |
| Colisões de nomes de saída (dois pares animação / câmera gravariam os mesmos arquivos) | – (adicione `$animation` / `$camera` ou habilite as pastas) |
| Pasta de saída vazia, que não é pasta, sem permissão de escrita, ou (Windows) com caracteres como `< > : " | ? *` | – |
| Formato de imagem diferente de PNG | **Use PNG** (também define RGBA) |

**Avisos** (não bloqueiam):

| Problema | Botão Fix |
| --- | --- |
| Sync Secondary ligado (o render não o usa) | **Turn off** |
| Variável desconhecida no `Output Name` (ela é mantida como texto) | – |
| Modo **Frame Ranges** com uma Action ativa na `Armature`: ela tocará em todos os intervalos | – |
| Modo de cor diferente de RGBA (o PNG fica sem alfa) | **Use RGBA** |
| **Film > Transparent** desligado (fundo opaco) | **Turn on** |
| `Resolution %` do Output Properties diferente de 100 | **Set 100%** |

Uma linha de **informação** aparece quando a pasta de saída ainda não existe e será criada.

No final, o checklist mostra `N image(s): A anim x C cam` e, depois que um render terminou nesta sessão do Blender, o `~tempo estimado`.

![Checklist com um erro que bloqueia o Render All](/_static/images/SRT_RenderChecklist_Error.png)

![Checklist com um aviso e o botão de correção Turn on](/_static/images/SRT_RenderChecklist_Warning.png)

---

## Render Settings

> **Localização no add-on**: aba **Render**

![Aba Render: checklist, resolução e Frame Step](/_static/images/SRT_RenderTab.png)

### Resolution

- **Resolution X / Y**: resolução compartilhada por todas as câmeras.
- Os valores são gravados na cena (`Resolution X / Y` do Output Properties) quando você os altera, e quando usa **Create Cameras** ou **Detect Cameras**.
- **O Render All aplica a resolução de novo** no início de cada par animação / câmera, então o render sempre usa os valores mostrados aqui.
- O `Resolution %` não é alterado pelo add-on: mantenha em **100%** (o checklist avisa e oferece **Set 100%**).

### Frame Step

Renderiza um a cada N frames em vez de todos:

- **Enable Frame Step**: liga o recurso.
- **Step**: valor de 1 a 100 (padrão 2). 1 renderiza todos os frames.
- A contagem começa no primeiro frame de cada animação (`frame_start`):
  - Step 2 numa animação que começa no frame 1: frames 1, 3, 5, 7...
  - Step 3: frames 1, 4, 7, 10...
- Uma linha mostra "Renders every N frame(s)".

Usos: animações feitas para FPS maior (60, 30), sprite sheets com menos frames, testes rápidos.

**Test Frame Count** (aparece com o Frame Step ligado) informa, na barra de status / editor Info do Blender, o número de animações, os frames com e sem step, o total de renders (frames x câmeras) e os frames de cada animação, sem renderizar. Funciona em todos os modos de animação.

### Test Cameras

**Test Cameras** percorre as câmeras da lista (câmera da cena + visão de câmera no viewport + rotação de luz). Veja [Cameras](Cameras.md).

---

## Render All

> **Localização no add-on**: painel principal (**Sprite Render**), no topo

- **Operador**: `sprite_render.render_all`
- O botão fica desabilitado enquanto o checklist tiver erros, ou enquanto um render já estiver rodando.

### Diálogo de confirmação

Clicar em **Render All** abre um resumo antes de renderizar qualquer coisa:
- `A animation(s) x C camera(s), F frame(s) each set` e `= I image(s)`
- **Destination**: a pasta de saída base
- **Estimated time**: `~X (from the last render)`. A estimativa usa a velocidade do último render concluído nesta sessão do Blender; antes disso diz "unknown until the first frames finish"
- `N existing file(s) will be overwritten`, quando já existem arquivos com os mesmos nomes (arquivos existentes são sobrescritos sem outro aviso)
- Os avisos do checklist, se houver

Clique em **Render** para iniciar, ou feche o diálogo para cancelar.

![Diálogo de confirmação do Render All (imagens, destino, tempo estimado)](/_static/images/SRT_ConfirmDialog.png)

### Durante o render

- O botão **Render All** é trocado por uma barra de progresso (`Rendering atual/total (porcentagem%)`), uma linha de status (`'animação' frame N, camera 'nome' (~tempo restante)`) e **Cancel Render**. Eles aparecem com qualquer aba aberta.
- O tempo restante estimado aparece depois que a primeira imagem termina.
- **O Blender continua ocupado enquanto cada imagem renderiza**: o painel é atualizado *entre* as imagens, então com cenas pesadas ele pode parecer travado por alguns segundos. Reduza samples ou resolução, ou use o Frame Step, para acelerar lotes longos.
- **ESC** ou **Cancel Render** param o render **depois da imagem atual**. Se o cancelamento chegar depois da última imagem, o render conta como completo.
- **Ctrl+Z fica bloqueado** durante o render. Só um render roda por vez.
- Se você fechar a janela ou carregar outro arquivo, o render termina e a cena é restaurada.

![Barra de progresso e linha de status durante o render](/_static/images/SRT_RenderProgress.png)

### Como funciona

1. A configuração é validada (as mesmas checagens do checklist), as pastas de saída são criadas, e um preview que estava tocando é parado e restaurado.
2. O add-on monta a lista de imagens: para cada animação habilitada (STATIC: o frame atual; FRAME_RANGES: cada intervalo habilitado), cada câmera na ordem da lista, cada frame (com Frame Step).
3. No início de cada par animação / câmera ele aplica de novo: a Action ou NLA strip, a câmera, a resolução, o shift da câmera e a rotação do Light Pivot.
4. Cada imagem é salva como PNG. Se uma imagem falhar, ela é contada e o render continua.
5. Ao terminar, a linha de status mostra um resumo, por exemplo `Render complete: 40 of 40 rendered (63.2 s).` ou `Render cancelled: 12 of 40 rendered, 1 failed (20.1 s).`, e a cena é restaurada.

Em um script, `bpy.ops.sprite_render.render_all()` roda a mesma fila sem o diálogo, bloqueando até terminar.

### O que é restaurado depois do render

Quando o render termina, é cancelado ou falha, o add-on devolve:
- o caminho de saída (`scene.render.filepath`), a câmera da cena e o frame atual
- a rotação do Light Pivot
- a Action ativa (e seu slot) e o `use_nla` da(s) armadura(s), e o estado de mute de cada NLA track e strip
- o início / fim da timeline
- a resolução (X, Y e %)
- os shifts das câmeras

O Animation Test faz o mesmo com **Stop Preview** / **Restore Scene**. Escolher um modo ou selecionar um item de lista nunca altera a cena.

### Destravando um estado preso

Se o painel mostra "renderizando" mas nenhum render está rodando (por exemplo depois de um crash), o botão **Cancel Render** zera o estado. O estado também é zerado quando o add-on é ativado e quando um arquivo é carregado.

---

## Dicas de Fluxo de Trabalho

1. **Antes de renderizar:**
   - Crie ou detecte câmeras e animações, depois leia o checklist (aba **Render**) e use os botões **Fix**
   - Confira "First image will be saved as:" na aba **Setup** (seção **Project & Output**)
   - Use **Test Cameras** e o **Animation Test**
   - Use o **Test Frame Count** se usar Frame Step

2. **Durante o render:**
   - Acompanhe o progresso no painel principal
   - Evite mexer na cena durante um lote
   - Pressione **ESC** ou **Cancel Render** para parar

3. **Depois do render:**
   - Abra a pasta de destino a partir do diálogo ou de "First image will be saved as:"
   - Confira a estrutura de pastas e os nomes de arquivo

---

## Documentação Relacionada

- [Output](Output.md): pasta de saída, modelos, pastas e nomes de arquivo
- [Cameras](Cameras.md): configuração e teste de câmeras
- [Lighting](Lighting.md): sistema Light Pivot
- [Animations](Animations.md): modos de animação
