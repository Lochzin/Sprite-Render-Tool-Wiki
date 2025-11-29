## Câmeras — Configuração e Fluxo de Trabalho

Esta página explica como configurar câmeras dentro do **Sprite Render Tool** e como a rotação da luz é controlada a partir delas.

---

## Lista de Câmeras

O sistema de câmeras é suportado pelo grupo de propriedades `CameraItem`:
- `name`: nome do objeto de câmera no Blender.
- `output_name`: nome usado nos nomes de arquivos gerados (opcional, quando **Custom Output Names** está habilitado).
- `light_rotation`: rotação Euler (XYZ) usada para rotacionar o **objeto pivô**.
- `render_order`: a ordem em que cada câmera será renderizada.

Na seção **Cameras** do painel principal você verá:
- `Camera Count`: quantas câmeras devem existir na lista.
- Subpainéis por câmera (`Camera 1`, `Camera 2`, ...):
  - `Name`
  - `Output Name` (visível apenas quando **Custom Output Names** está habilitado)
  - `Render Order`
  - `Light Rotation`:
    - ou um único valor Z, ou uma rotação XYZ completa, dependendo de **Enable Full Rotation (XYZ)**.

Quando você altera `Camera Count`, a lista de entradas `CameraItem` é automaticamente expandida ou reduzida para corresponder.

---

## Detectando Câmeras Automaticamente

O botão **Detect Cameras** (`sprite_render.autofill_light_rotation`) escaneia a **View Layer** atual em busca de câmeras ativas e preenche a lista de câmeras do add-on:
- Apenas câmeras que são:
  - do tipo `CAMERA`
  - não ocultas no viewport
  - não ocultas para renderização
são consideradas.

Para cada câmera detectada ele:
- Define `name` e `output_name` para o nome da câmera do Blender.
- Calcula uma rotação Z automática para `light_rotation` baseada na posição relativa entre a câmera e o **objeto pivô**.
- Atribui `render_order` sequencialmente (0, 1, 2, ...).

> **Importante**: o **Pivot Object** deve ser definido na seção **Light Pivot**; caso contrário, o operador cancelará com um erro.

### Limitações da Detecção Automática

O **Detect Cameras** tenta encontrar a rotação ideal do light pivot para cada ângulo de câmera, mas isso **só funciona corretamente para ângulos horizontais** (como em jogos boomer shooter em primeira pessoa, onde as câmeras estão todas no mesmo plano horizontal ao redor do personagem).

Para renderizações que precisam ser feitas em **ângulos diferentes** (de cima, diagonalmente, ou em múltiplos planos), você precisará **ajustar manualmente** o ângulo de rotação do pivot (`Light Rotation`) para cada câmera após usar o Detect Cameras.

> **Nota**: Futuramente será adicionado um debug visual para ajudar a visualizar e ajustar esses ângulos de rotação do pivot.

---

## Light Pivot e Rotação de Luz

O add-on usa um **objeto pivô** (qualquer objeto do Blender) para controlar a direção da iluminação para cada câmera:
- O pivô é armazenado em `SpriteRenderSettings.pivot_object`.
- Antes de renderizar cada frame para uma câmera específica, o operador chama:
  - `SPRITE_RENDER_OT_RenderAll.apply_light_rotation(...)`

Dependendo de **Enable Full Rotation (XYZ)**:
- **Desabilitado** (padrão):
  - Apenas o eixo Z do pivô é alterado, usando `cam_item.light_rotation[2]`.
  - Bom para iluminação top-down / isométrica onde "ao redor do personagem" é suficiente.
- **Habilitado**:
  - Euler XYZ completo de `cam_item.light_rotation` é aplicado ao pivô.
  - Use isso para configurações de iluminação mais complexas.

Quando **Light Rotation Debug** está habilitado na seção **Debug**:
- O operador registra informações detalhadas sobre como a rotação do **objeto pivô** é aplicada:
  - Nome do objeto pivô.
  - Nome da câmera.
  - Valores de rotação solicitados.
  - Rotação original vs. nova rotação (em graus).
  - Quaisquer erros que ocorram ao tentar aplicar a rotação.

### 💡 Dica de Iluminação

Você pode usar o **Light Pivot** de forma estratégica para criar um sistema de iluminação mais completo:

- **Luzes dentro do pivô**: Coloque luzes como filhos do objeto pivô (ou agrupe-as com o pivô). Essas luzes **irão rotacionar** junto com as câmeras ao redor do personagem, criando uma iluminação consistente que segue o ponto de vista da câmera.

- **Luzes fora do pivô**: Adicione luzes adicionais que **não** sejam filhos do pivô. Essas luzes permanecerão fixas e podem ser usadas para:
  - Iluminar áreas naturalmente escuras do personagem ou objeto (como a parte inferior, costas, ou áreas de sombra).
  - Criar iluminação ambiente ou fill lights que não mudam com a rotação da câmera.
  - Adicionar highlights ou rim lights estáticos.

Esta combinação permite criar uma iluminação mais rica e controlada, onde a luz principal rotaciona com a câmera enquanto luzes auxiliares preenchem áreas que precisam de iluminação adicional.

---

## Ordem de Renderização

Cada câmera tem um inteiro `Render Order`:
- As câmeras são ordenadas por `render_order` antes de qualquer renderização acontecer.
- Tanto o caminho de renderização síncrono (`execute`) quanto o assíncrono (`invoke` + timer) usam esta ordenação.

Use isso para:
- Garantir que câmeras front / side / back sempre renderizem em uma sequência consistente.
- Controlar como o progresso é relatado e como suas pastas são preenchidas ao longo do tempo.

---

## Nomes de Saída Personalizados vs. Nomes de Câmera

Você pode escolher se os nomes de arquivos se referem a:
- O **nome do objeto de câmera** real no Blender, ou
- Um **nome de saída personalizado** (por exemplo `front`, `side`, `back`, `iso_NE`, etc.).

Em **Cameras**:
- Habilite **Custom Output Names** para usar `output_name` em vez de `name` ao construir caminhos.
- O add-on usa:
  - `cam_item.output_name` quando nomes personalizados estão habilitados e não vazios.
  - Caso contrário, `cam_item.name`.

Este valor é então passado para o placeholder `$camera` no `output_template` ao construir nomes de arquivos.

---

## Testando Câmeras

O botão **Test Cameras** (`sprite_render.test_cameras`) ajuda você a visualizar rapidamente sua configuração de câmeras:
- Ele encontra a câmera da cena atual na lista do add-on.
- Seleciona a **próxima** câmera na lista (ciclicamente).
- Define a câmera da cena para esse objeto e muda a 3D Viewport para a visualização da câmera.
- Se um pivô estiver definido, ele também aplica a rotação de luz correspondente usando o helper compartilhado `apply_light_rotation`.

Use isso para:
- Percorrer todas as câmeras configuradas.
- Confirmar que o enquadramento e a iluminação são consistentes antes de iniciar um lote completo de renderização.

