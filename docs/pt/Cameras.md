# Câmeras

Esta página explica como configurar câmeras dentro do **Sprite Render Tool**. Para informações sobre iluminação e o sistema Light Pivot, veja [Iluminação](Lighting.md).

---

## Lista de Câmeras

O sistema de câmeras é suportado pelo grupo de propriedades `CameraItem`:
- `name`: nome do objeto de câmera no Blender.
- `output_name`: nome usado nos nomes de arquivos gerados (opcional, quando **Custom Output Names** está habilitado).
- `light_rotation`: rotação Euler (XYZ) usada para rotacionar o **light pivot**.
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
- Calcula uma rotação Z automática para `light_rotation` baseada na posição relativa entre a câmera e o **light pivot** (se configurado).
- Atribui `render_order` sequencialmente (0, 1, 2, ...).

> **Importante**: O objeto **Light Pivot** deve ser definido na seção **Light Pivot** se você quiser o cálculo automático de rotação de luz; caso contrário, o operador cancelará com um erro.

### Limitações da Detecção Automática

O **Detect Cameras** tenta encontrar a rotação ideal do pivô de luz para cada ângulo de câmera, mas isso **só funciona corretamente para ângulos horizontais** (como em jogos boomer shooter em primeira pessoa, onde as câmeras estão todas no mesmo plano horizontal ao redor do personagem).

Para renderizações que precisam ser feitas em **ângulos diferentes** (de cima, diagonalmente, ou em múltiplos planos), você precisará **ajustar manualmente** o ângulo de rotação do pivô (`Light Rotation`) para cada câmera após usar o Detect Cameras.

Para mais informações sobre rotação de luz e configuração de iluminação, veja [Iluminação](Lighting.md).

---

## Rotação de Luz por Câmera

Cada câmera tem uma propriedade `light_rotation` (rotação Euler XYZ) que controla como o **light pivot** é rotacionado para esse ângulo de câmera específico. Isso é configurado no subpainel da câmera na seção **Cameras**.

Para informações detalhadas sobre o sistema Light Pivot, estratégias de iluminação e como usar a rotação de luz efetivamente, veja a página [Iluminação](Lighting.md).

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
- Se um light pivot estiver definido, ele também aplica a rotação de luz correspondente.

```python
Detalhe técnico: Usa o helper compartilhado apply_light_rotation
```

Use isso para:
- Percorrer todas as câmeras configuradas.
- Confirmar que o enquadramento e a iluminação são consistentes antes de iniciar um lote completo de renderização.

> **Dica**: Para informações detalhadas sobre iluminação e o sistema Light Pivot, veja [Iluminação](Lighting.md).

