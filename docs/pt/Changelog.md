# Changelog

Esta página rastreia mudanças no **Sprite Render Tool** ao longo do tempo.

---

## [0.3.2] - 2024

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

## [0.3.1] - 2024

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

## [0.3.0] - 2024

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

## [0.2.8] - 2024

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

## [0.2.7] - 2024

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

## [0.2.6] - 2024

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

## [0.2.5] - 2024

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
