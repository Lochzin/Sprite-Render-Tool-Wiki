# Renderização

Esta página explica a funcionalidade da tab **Render**, que inclui configurações de renderização, configuração de saída e ações de renderização.

![Render Tab](/_static/images/SRT_RenderTab.png)

---

## Configurações de Renderização

A seção **Render Settings** fornece controles para resolução, frame stepping e velocidade de reprodução:

### Resolução

- **Resolution X / Y**: Resolução de renderização sincronizada em todas as câmeras
  - Esses valores são automaticamente aplicados às configurações de renderização da cena do Blender
  - Todas as câmeras renderizarão na mesma resolução
  - A resolução é aplicada antes de cada renderização para garantir consistência

### Frame Step

O recurso **Frame Step** permite renderizar cada N-ésimo frame em vez de todos os frames:

- **Enable Frame Step**: Toggle para habilitar/desabilitar frame stepping
- **Step**: Valor de step (1-100)
  - Quando definido como 1: renderiza todos os frames (comportamento normal)
  - Quando definido como 2: renderiza frames 1, 3, 5, 7... (pula cada outro frame)
  - Quando definido como 3: renderiza frames 1, 4, 7, 10... (pula 2 frames entre cada frame renderizado)
  - E assim por diante...

**Casos de uso:**
- Animações feitas para FPS mais altos (60, 30 fps) que precisam ser renderizadas em intervalos menores
- Criar sprite sheets com menos frames para otimização de performance
- Testar configurações de renderização sem renderizar todos os frames

Botão **🧪 Test Frame Count**:
- Aparece quando Frame Step está habilitado
- Calcula e exibe total de frames que serão renderizados sem realmente renderizar
- Mostra detalhamento por animação com e sem step aplicado
- Ajuda a verificar configuração de frame step antes de iniciar um lote completo de renderização

### Playback Speed

- **FPS**: Configuração personalizada de frames por segundo
- Botão **Apply**: Aplica a configuração de FPS à cena do Blender
  - Isso afeta a velocidade de reprodução da animação no viewport
  - Útil para visualizar animações em velocidades diferentes
  - Não afeta a renderização real dos frames (os frames ainda são renderizados em seus números de frame originais)

---

## Configuração de Saída

A seção **Output** na tab Render fornece controles para onde e como os arquivos são salvos. Para informações detalhadas sobre templates de saída, estruturas de pastas e nomenclatura de arquivos, veja a página dedicada [Output](Output.md).

### Output Path

- **Output Path**: Pasta base onde todos os arquivos renderizados serão criados
  - Isso usa as configurações de renderização da cena do Blender (`scene.render.filepath`)
  - Pode usar caminhos relativos do Blender (começando com `//`)
  - O add-on automaticamente converte caminhos relativos para caminhos absolutos
- Botão **📂 Open Output Folder**: Abre a pasta de saída no explorador de arquivos do sistema
  - Cria automaticamente a pasta se ela não existir
  - Suporte multiplataforma (Windows, macOS, Linux)

### Template de Nome de Saída

- **Output Name** (`output_template`): String de template para gerar nomes de arquivos
  - Template padrão: `$objectName_$animation_$frame`
  - Veja [Output](Output.md) para informações detalhadas sobre templates e placeholders

### Placeholders Disponíveis

A seção **📋 Show Available Placeholders** (colapsável) exibe:
- `$projectName`: Nome do projeto das configurações
- `$objectName`: Nome do objeto/personagem das configurações
- `$animation`: Nome da animação/action
- `$camera`: Nome da câmera ou nome de saída
- `$frame`: Número do frame (formatado como 0001, 0002, etc.)

A seção também mostra uma prévia ao vivo de como o nome de saída ficaria com valores de exemplo.

### Create Folders

Organize arquivos de saída em uma hierarquia de pastas:
- **Project Folder**: Cria uma pasta com o nome do projeto
- **Object Folder**: Cria uma pasta com o nome do objeto
- **Animation Folder**: Cria uma pasta com o nome da animação
- **Camera Folder**: Cria uma pasta com o nome da câmera

Essas pastas são construídas na ordem: `Project/Object/Animation/Camera/` (baseado em quais opções estão habilitadas).

Para mais detalhes sobre estrutura de pastas e nomenclatura de arquivos, veja [Output](Output.md).

---

## Ações de Renderização

A seção **Render Actions** contém os botões principais para renderização e teste:

### 🚀 Render All

- **Operador**: `sprite_render.render_all`
- **Funcionalidade**: Inicia a renderização de todas as animações e câmeras habilitadas
- **Modo**: Renderização assíncrona usando um timer
  - Não bloqueante: você pode continuar trabalhando no Blender enquanto renderiza
  - Rastreamento de progresso: veja o progresso da renderização na tab **Info**
  - Cancelável: use o botão **Cancel Render** ou pressione **ESC** para parar

**Como funciona:**
1. Valida o caminho de saída antes de iniciar
2. Renderiza cada animação habilitada
3. Para cada animação, renderiza todas as câmeras configuradas
4. Aplica frame step se habilitado
5. Salva cada frame como uma imagem PNG
6. Mostra progresso na tab Render (abaixo da seção Render Actions)

**Rastreamento de progresso:**
- Contagem de frames atual: `[atual/total]`
- Porcentagem completa
- Barra de progresso
- Mensagem de status (animação atual, câmera, frame)

### 🎯 Test Cameras

- **Operador**: `sprite_render.test_cameras`
- **Funcionalidade**: Percorre as câmeras configuradas para visualização
- **Casos de uso**:
  - Visualizar rapidamente todos os ângulos de câmera
  - Verificar enquadramento da câmera antes de renderizar
  - Verificar configuração de iluminação com rotação do light pivot
  - Visualizar rotação de luz no modo de shading **Rendered** do viewport

**Como funciona:**
1. Encontra a câmera da cena atual na lista de câmeras do add-on
2. Seleciona a próxima câmera na lista (ciclicamente)
3. Define a câmera da cena para esse objeto
4. Muda a 3D Viewport para a visualização da câmera
5. Se um light pivot estiver definido, aplica a rotação de luz correspondente

> **Dica**: Para informações detalhadas sobre teste de câmeras e visualização de rotação de luz, veja [Câmeras](Cameras.md) e [Iluminação](Lighting.md).

---

## Dicas de Fluxo de Trabalho

1. **Antes de renderizar:**
   - Defina resolução em Render Settings
   - Configure caminho de saída e template
   - Habilite/desabilite opções de pasta conforme necessário
   - Use **Test Cameras** para verificar configuração de câmeras
   - Use **🧪 Test Frame Count** se estiver usando Frame Step

2. **Durante a renderização:**
   - Monitore o progresso na tab **Info**
   - Você pode continuar trabalhando no Blender (renderização assíncrona)
   - Pressione **ESC** ou clique em **Cancel Render** para parar (para após o frame atual completar)

3. **Após a renderização:**
   - Use **📂 Open Output Folder** para acessar rapidamente os arquivos renderizados
   - Verifique se a estrutura de pastas corresponde às suas expectativas
   - Verifique se os nomes de arquivos seguem seu template

---

## Documentação Relacionada

- [Output](Output.md): Informações detalhadas sobre templates de saída, estruturas de pastas e nomenclatura de arquivos
- [Câmeras](Cameras.md): Configuração de câmeras e testes
- [Iluminação](Lighting.md): Sistema de light pivot e estratégias de iluminação
- [Animações](Animations.md): Modos de animação e configuração

