---
layout: default
title: "Câmeras — Configuração e Fluxo de Trabalho"
nav_order: 3
---

## Câmeras — Configuração e Fluxo de Trabalho

Esta página explica como configurar câmeras dentro do **Sprite Render Tool** e como a rotação de luz é controlada a partir delas.

---

## Lista de Câmeras

O sistema de câmeras é suportado pelo grupo de propriedades `CameraItem`:
- `name`: nome do objeto de câmera no Blender.
- `output_name`: nome usado nos nomes de arquivos gerados (opcional, quando **Custom Output Names** está habilitado).
- `light_rotation`: rotação Euler (XYZ) usada para rotacionar o **objeto pivot**.
- `render_order`: a ordem em que cada câmera será renderizada.

Na seção **Cameras** do painel principal você verá:
- `Camera Count`: quantas câmeras devem existir na lista.
- Subpainéis por câmera (`Camera 1`, `Camera 2`, ...):
  - `Name`
  - `Output Name` (visível apenas quando **Custom Output Names** está habilitado)
  - `Render Order`
  - `Light Rotation`:
    - ou um único valor Z, ou uma rotação XYZ completa, dependendo de **Enable Full Rotation (XYZ)**.

Quando você altera `Camera Count`, a lista de entradas `CameraItem` é automaticamente aumentada ou reduzida para corresponder.

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
- Calcula uma rotação Z automática para `light_rotation` baseada na posição relativa entre a câmera e o **objeto pivot**.
- Atribui `render_order` sequencialmente (0, 1, 2, ...).

> **Importante**: o **Pivot Object** deve estar definido na seção **Light Pivot**; caso contrário, o operador cancelará com um erro.

---

## Light Pivot e Rotação de Luz

O add-on usa um **objeto pivot** (qualquer objeto do Blender) para controlar a direção da iluminação para cada câmera:
- O pivot é armazenado em `SpriteRenderSettings.pivot_object`.
- Antes de renderizar cada frame para uma câmera dada, o operador chama:
  - `SPRITE_RENDER_OT_RenderAll.apply_light_rotation(...)`

Dependendo de **Enable Full Rotation (XYZ)**:
- **Desabilitado** (padrão):
  - Apenas o eixo Z do pivot é alterado, usando `cam_item.light_rotation[2]`.
  - Bom para iluminação top-down / isométrica onde "ao redor do personagem" é suficiente.
- **Habilitado**:
  - Euler XYZ completo de `cam_item.light_rotation` é aplicado ao pivot.
  - Use isso para configurações de iluminação mais complexas.

Quando **Light Rotation Debug** está habilitado na seção **Debug**:
- O operador registra a rotação do pivot antes e depois (em graus) no console do Blender para a primeira câmera, para que você possa verificar os valores sendo aplicados.

---

## Ordem de Renderização

Cada câmera tem um inteiro `Render Order`:
- As câmeras são ordenadas por `render_order` antes de qualquer renderização acontecer.
- Tanto o caminho de renderização síncrono (`execute`) quanto o assíncrono (`invoke` + timer) usam esta ordenação.

Use isso para:
- Garantir que câmeras frontal / lateral / traseira sempre renderizem em uma sequência consistente.
- Controlar como o progresso é reportado e como suas pastas são preenchidas ao longo do tempo.

---

## Nomes de Saída Customizados vs Nomes de Câmeras

Você pode escolher se os nomes de arquivos se referem a:
- O **nome do objeto de câmera** real no Blender, ou
- Um **nome de saída customizado** (por exemplo `front`, `side`, `back`, `iso_NE`, etc.).

Em **Cameras**:
- Habilite **Custom Output Names** para usar `output_name` em vez de `name` ao construir caminhos.
- O add-on usa:
  - `cam_item.output_name` quando nomes customizados estão habilitados e não estão vazios.
  - Caso contrário, `cam_item.name`.

Este valor é então passado para o placeholder `$camera` no `output_template` ao construir nomes de arquivos.

---

## Testando Câmeras

O botão **Test Cameras** (`sprite_render.test_cameras`) ajuda você a visualizar rapidamente sua configuração de câmeras:
- Ele encontra a câmera da cena atual na lista do add-on.
- Seleciona a **próxima** câmera na lista (ciclicamente).
- Define a câmera da cena para esse objeto e muda o 3D Viewport para a visualização de câmera.
- Se um pivot estiver definido, ele também aplica a rotação de luz correspondente usando o helper compartilhado `apply_light_rotation`.

Use isso para:
- Percorrer todas as câmeras configuradas.
- Confirmar que o enquadramento e a iluminação são consistentes antes de iniciar um lote completo de renderização.

