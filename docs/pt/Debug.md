## Debug — Rotação de Luz e Renderização

Esta página cobre ferramentas de depuração e padrões integrados ao **Sprite Render Tool**.

---

## Seção Debug na UI

No painel principal há uma seção **🐛 Debug** com:
- `Light Rotation Debug` (alternância)

Quando habilitado:
- O add-on imprime informações detalhadas no console do Blender sobre como a rotação do **objeto pivô** é aplicada:
  - Nome do objeto pivô.
  - Nome da câmera.
  - Valores de rotação solicitados.
  - Rotação original vs. nova rotação (em graus).
  - Quaisquer erros que ocorram ao tentar aplicar a rotação.

Isso é implementado em `SPRITE_RENDER_OT_RenderAll.apply_light_rotation` via chamadas `report_func` quando `debug=True`.

---

## Detalhes do Debug de Rotação de Luz

Quando o debug de rotação de luz está ativo, para a primeira câmera na lista ordenada (ou a primeira câmera/frame no modo assíncrono) o add-on registra:
- Rotação Euler original do pivô (graus).
- A rotação desejada vinda de `cam_item.light_rotation`.
- Se a rotação XYZ completa está habilitada.
- A rotação final do pivô após aplicar a mudança.

No modo apenas Z:
- Ele registra Z original e novo Z em graus.

Se ocorrer uma exceção:
- Uma mensagem `DEBUG: Failed to rotate pivot 'Name': <error>` é relatada.

Use isso para:
- Confirmar que suas rotações de luz por câmera estão configuradas conforme esperado.
- Diagnosticar casos onde o pivô não está rotacionando ou está rotacionando no eixo/ordem errados.

---

## Progresso de Renderização e Cancelamento

Durante a renderização via `Render All` no modo assíncrono, o add-on expõe informações semelhantes a debug na UI:
- A seção de progresso mostra:
  - `render_current` / `render_total`
  - Porcentagem `render_progress` (0–100)
  - String `render_status` descrevendo o que está sendo renderizado atualmente
- Um botão **Cancel Render**:
  - Chama `SPRITE_RENDER_OT_CancelRender`, que define uma flag compartilhada `_should_cancel`.
  - O callback de timer `_render_next_frame` verifica esta flag e para graciosamente após o frame atual.

No console, cada frame registra algo como:
- `Rendering [X/Y] (Z%): 'AnimName' frame F, camera 'CameraName'`

Isso ajuda você a:
- Monitorar onde a renderização está em lotes longos.
- Ver qual animação/câmera/frame causou quaisquer mensagens de erro.

---

## Renderização Síncrona vs Assíncrona

Há dois caminhos dentro de `SPRITE_RENDER_OT_RenderAll`:
- `execute`: síncrono, loop direto (pode bloquear a UI durante renderizações longas).
- `invoke` + `_render_next_frame` + timer do Blender:
  - Processa um frame por tick do timer (atraso padrão de 0.1s entre verificações).
  - Atualiza a barra de progresso da UI e a string de status entre frames.
  - Permite solicitações de cancelamento via o operador **Cancel Render**.

Se você precisar depurar lógica em torno de:
- Ativação de animação,
- Construção de diretórios,
- Seleção de câmera,
você pode comparar a saída do console entre esses dois modos para garantir que ambos estão se comportando consistentemente.

---

## Dicas Comuns de Depuração

- Se as câmeras parecem renderizar do ângulo errado:
  - Use **Test Cameras** para verificar a câmera ativa.
  - Habilite **Light Rotation Debug** e verifique os logs do console para a rotação de cada câmera.
- Se as animações parecem erradas:
  - No modo **ACTIONS**, verifique o intervalo de frames e que `use_nla` está desabilitado para a armadura alvo durante a visualização.
  - No modo **NLA**, use o botão **Preview NLA Strip** para garantir que apenas a strip desejada está desmutada.
- Se os arquivos estão aparecendo em pastas inesperadas:
  - Verifique o `render.filepath` da cena atual.
  - Verifique quais opções **Use Folders** estão habilitadas na seção **Output**.
  - Procure mensagens do console sobre falhas de criação de diretórios (se houver).




