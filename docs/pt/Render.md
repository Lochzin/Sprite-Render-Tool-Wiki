# Renderização

Esta página explica a funcionalidade da tab **Render**, que inclui configurações de renderização, configuração de saída e ações de renderização.

---

## Configurações de Renderização

> **Localização no add-on**: Tab **Render** → Seção **Render Settings**

A seção **Render Settings** fornece controles para resolução, frame stepping e velocidade de reprodução:

### Resolução

- **Resolution X / Y**: Resolução de renderização compartilhada por todas as câmeras
  - Os valores são gravados nas configurações de renderização da cena do Blender (`Resolution X/Y`) quando você os altera (desde que a lista de câmeras tenha ao menos uma câmera existente) e quando você usa **Create Cameras** ou **Detect Cameras**
  - O **Render All não aplica a resolução novamente** antes de renderizar: a resolução usada é a que estiver nas **Output Properties** da cena naquele momento
  - Se você alterar a resolução nas Output Properties manualmente, os valores mostrados aqui deixam de corresponder ao render real. Edite os valores aqui de novo (ou confira as Output Properties) antes de renderizar
  - O `Resolution %` das Output Properties não é alterado: mantenha em **100%**, ou os sprites sairão em outro tamanho

### Frame Step

O recurso **Frame Step** permite renderizar cada N-ésimo frame em vez de todos os frames:

- **Enable Frame Step**: Toggle para habilitar/desabilitar frame stepping
- **Step**: Valor de step (1-100)
  - Quando definido como 1: renderiza todos os frames (comportamento normal)
  - A contagem começa no primeiro frame de cada animação (seu `frame_start`)
  - Quando definido como 2 (animação começando no frame 1): renderiza frames 1, 3, 5, 7... (pula cada outro frame)
  - Quando definido como 3 (animação começando no frame 1): renderiza frames 1, 4, 7, 10... (pula 2 frames entre cada frame renderizado)
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
- > **Nota**: funciona nos modos **ACTIONS**, **NLA** e **STATIC**. No modo **FRAME_RANGES** ele não conta os intervalos e informa "No animations found" (limitação conhecida da versão atual)

### Playback Speed

- **FPS**: Configuração personalizada de frames por segundo
- Botão **Apply**: Aplica a configuração de FPS à cena do Blender
  - Isso afeta a velocidade de reprodução da animação no viewport
  - Útil para visualizar animações em velocidades diferentes
  - Não afeta a renderização real dos frames (os frames ainda são renderizados em seus números de frame originais)

---

## Configuração de Saída

> **Localização no add-on**: Tab **Render** → Seção **Output**

A seção **Output** na [tab Render](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#render-tab) fornece controles para onde e como os arquivos são salvos. Para informações detalhadas sobre templates de saída, estruturas de pastas e nomenclatura de arquivos, veja a página dedicada [Output](Output.md).

### Output Path

- **Output Path**: Pasta base onde todos os arquivos renderizados serão criados
  - Isso usa as configurações de renderização da cena do Blender (`scene.render.filepath`)
  - Pode usar caminhos relativos do Blender (começando com `//`)
  - O add-on automaticamente converte caminhos relativos para caminhos absolutos
  - A pasta **já deve existir** quando você clicar em Render All (o add-on cria as subpastas Project/Object/Animation/Camera, mas não a pasta base). O valor padrão desse campo no Blender pode apontar para uma pasta que não existe no seu sistema
  - > **⚠️ Problema conhecido (Linux / macOS)**: na versão atual, caminhos absolutos como `/home/usuario/sprites` perdem a `/` inicial quando o add-on os processa e passam a ser tratados como caminhos relativos; o render pode falhar com "Output path does not exist" ou salvar os arquivos no lugar errado. Caminhos do Windows com letra de unidade (`D:\Sprites`) funcionam. Caminhos de rede UNC (`\\servidor\pasta`) também não são suportados. Caminhos relativos ao `.blend` (`//`) são convertidos primeiro em absolutos, então também são afetados. Até isso ser corrigido, o Render All só é confiável no Windows
- Botão **📂 Open Output Folder**: Abre no explorador de arquivos do sistema a pasta escrita em **Output Path**
  - Cria automaticamente a pasta se ela não existir
  - Funciona no Windows, macOS e Linux (usa o gerenciador de arquivos padrão do sistema)
  - Abre apenas a pasta base (não as subpastas Project/Object/Animation/Camera criadas pelo render)

> **Antes de renderizar, confira as configurações de imagem nas Output Properties do Blender.** O add-on sempre nomeia os arquivos como `.png`, mas **não** força o formato de imagem: use **File Format = PNG**, **Color = RGBA** e, para sprites transparentes, ative **Film → Transparent** nas Render Properties. Outros formatos (JPEG, EXR...) podem fazer o render contar como falha ou gerar arquivos incompatíveis com a extensão `.png`.

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

> **Localização no add-on**: Tab **Render** → Seção **Render Actions**

A seção **Render Actions** contém os botões principais para renderização e teste:

### 🚀 Render All

- **Operador**: `sprite_render.render_all`
- **Funcionalidade**: Inicia a renderização de todas as animações e câmeras habilitadas
- **Modo**: Renderização conduzida por um timer, uma imagem por passo
  - **O Blender fica ocupado enquanto cada imagem renderiza**: cada frame é renderizado com o render do próprio Blender (bloqueante), então a interface não responde nesse intervalo. O painel, o progresso e o botão Cancel só atualizam **entre** os frames. Com cenas pesadas a interface pode parecer travada por alguns segundos seguidos; isso é normal
  - Rastreamento de progresso: veja o progresso na tab **Render**, abaixo de **Render Actions** (só aparece durante a renderização e só é desenhado na tab Render)
  - Cancelável: use o botão **Cancel Render** ou pressione **ESC** para parar (para depois que o frame atual terminar)
  - Não inicie o Render All de novo enquanto um render está em andamento (o botão continua clicável) e evite desfazer (Ctrl+Z) durante o render

**Como funciona:**
1. Verifica se há ao menos uma câmera configurada e se o caminho de saída existe
2. Cria as subpastas de saída
3. Renderiza cada animação habilitada (no modo **STATIC**: o frame atual; no modo **FRAME_RANGES**: cada intervalo habilitado)
4. Para cada animação, renderiza todas as câmeras configuradas, ordenadas por `Render Order`
5. Aplica frame step se habilitado
6. Salva cada frame como uma imagem PNG
7. Mostra progresso na [tab Render](https://lochzin.github.io/Sprite-Render-Tool-Wiki/pt/index.html#render-tab) (abaixo da seção Render Actions)

**Rastreamento de progresso:**
- Contagem de frames atual: `[atual/total]`
- Porcentagem completa
- Barra de progresso
- Mensagem de status (animação atual, câmera, frame)

**O que o render altera no seu arquivo:**
- Restaurado quando o render termina (ou é cancelado): caminho de saída (`Output Path`), câmera da cena, frame atual e a rotação do Light Pivot
- **Não restaurado**: a Action atribuída à armadura, o estado de mute das NLA strips, `use_nla`, o intervalo inicial/final da timeline e a resolução da cena. O mesmo acontece ao selecionar um item nas listas de Actions/NLA ou ao usar as previews. Salve uma cópia do arquivo antes de um lote longo se precisar do estado original de volta

**Coisas a conferir antes de renderizar** (na versão atual o add-on não valida isso por você):
- O template `Output Name` deve conter `$frame`; caso contrário todo frame sobrescreve o mesmo arquivo. Arquivos existentes são sempre sobrescritos sem aviso
- Se `$camera` não estiver no template e as câmeras não tiverem pasta de câmera, as imagens de câmeras diferentes são numeradas em sequência (veja [Output](Output.md))
- Nos modos **ACTIONS** e **NLA**, defina uma **Target Armature** e confirme que todo item habilitado aponta para uma Action/strip existente; uma Action inexistente não é aplicada (a armadura mantém a pose que tinha) e uma NLA strip inexistente é pulada com um aviso
- Não deixe nomes de câmera em branco na Camera List (um nome vazio conta como render com falha)
- No modo **ACTIONS**, selecione na lista a Action desejada antes de renderizar: veja o aviso em [Animações](Animations.md) (seção "Renderização no Modo ACTIONS")

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
   - Monitore o progresso na tab **Render** (seção Render Progress)
   - A interface só atualiza entre os frames; cada frame bloqueia o Blender enquanto renderiza, então evite mexer na cena durante um lote
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

