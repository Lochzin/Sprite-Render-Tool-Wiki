# Changelog

Esta página rastreia mudanças no **Sprite Render Tool** ao longo do tempo.

---

## [0.2.4] - 2024

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

## [0.2.3] - 2024

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

## [0.2.2] - 2024

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

## [0.2.1] - 2024

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
