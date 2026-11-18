# Output

Esta página explica como o **Sprite Render Tool** constrói estruturas de pastas e nomes de arquivos para seus sprites renderizados.

---

## Template de Saída

O núcleo do sistema de nomenclatura é o campo **Output Name** (`output_template`):
- Valor padrão:  
  `$objectName_$animation_$frame`

Esta string é usada para gerar o **nome do arquivo** final (antes de adicionar a extensão `.png`). Os nomes das pastas vêm das opções de pasta (veja abaixo), não do template.

### Placeholders Disponíveis

Você pode usar as seguintes variáveis dentro do template:
- `$projectName`: obtido de `Project Name` na UI.
- `$objectName`: obtido de `Object Name` na UI.
- `$animation`: animação atual (nome da Action, nome da NLA strip, nome do Frame Range, ou `"STATIC"` no modo Static).
- `$camera`: nome da câmera ou output name (veja a documentação de **Cameras**).
- `$frame`: índice do frame, formatado como `0001`, `0002`, etc.

A seção **Show Available Placeholders** na tab Render mostra uma visualização ao vivo de como o template ficaria com valores de exemplo. A visualização é apenas aproximada: ela não aplica a limpeza de nome de arquivo descrita abaixo.

> **⚠️ Sempre inclua `$frame` no template.** O add-on não verifica isso: sem `$frame`, todos os frames de uma animação são salvos com o mesmo nome e cada um sobrescreve o anterior, e você termina com uma única imagem. Da mesma forma, duas câmeras que acabem com o mesmo `Output Name` (e a mesma pasta) sobrescrevem uma à outra. Arquivos que já existem são sempre sobrescritos sem aviso.

---

## Output Path (Caminho de Saída)

O ponto de partida para toda a saída é o campo **Output Path**, que é o caminho de renderização da cena do Blender (`scene.render.filepath`, também exibido nas Output Properties). Ele deve ser uma **pasta existente**: o add-on cria as subpastas abaixo dela, mas não a pasta em si.

O que saber:
- Caminhos relativos começando com `//` são convertidos para caminhos absolutos.
- Se você digitar algo que parece um nome de arquivo no fim do caminho (por exemplo `D:/Sprites/hero_walk_0001.png`), o add-on descarta essa última parte e usa a pasta anterior.
- Se as últimas pastas do caminho tiverem o mesmo nome do Project, do Object ou de uma câmera, e a opção de pasta correspondente estiver habilitada, elas também são descartadas, para que o mesmo nível não seja criado duas vezes (por exemplo `D:/Sprites/MyGame` com **Project Folder** ligado e Project Name `MyGame` vira `D:/Sprites` + `MyGame/`).
- Se não sobrar nada depois dessa limpeza, a pasta home do usuário é usada.
- Use sempre uma **pasta** aqui, não um nome de arquivo. Nomes que parecem arquivos de sprite (por exemplo `sprites_v2_final`) podem ser confundidos com nomes de arquivo e descartados.

> **⚠️ Problema conhecido (Linux / macOS)**: na versão atual, caminhos absolutos como `/home/usuario/sprites` perdem a `/` inicial quando o add-on os processa, são tratados como relativos e o Render All falha ("Output path does not exist") ou grava no lugar errado. Caminhos do Windows com letra de unidade funcionam; caminhos UNC (`\\servidor\pasta`) não são suportados. Até isso ser corrigido, o Render All só é confiável no Windows. (O botão **Open Output Folder** usa o caminho como digitado e funciona nos três sistemas.)

---

## Estrutura de Pastas (Create Folders)

As opções de pasta na seção **Output**:
- `Project Folder`
- `Object Folder`
- `Animation Folder`
- `Camera Folder`

controlam quais níveis são adicionados após o caminho de saída. Eles são sempre criados nesta ordem:
1. `Project Name` (se **Project Folder** estiver habilitado)
2. `Object Name` (se **Object Folder** estiver habilitado)
3. Nome da animação (se **Animation Folder** estiver habilitado)
4. Nome da câmera (se **Camera Folder** estiver habilitado)

Exemplo: com as quatro habilitadas, `D:/Sprites/` vira `D:/Sprites/MyGame/Hero/walk/front/`.

O que conta como "nome da animação" depende do **Animation Mode**:
- **ACTIONS**: o nome de cada Action habilitada na lista.
- **NLA**: o nome de cada strip (da lista `NLA Strips`, ou das tracks NLA da armadura se a lista estiver vazia).
- **STATIC**: `STATIC`.
- **FRAME_RANGES**: o nome de cada intervalo de frames habilitado.

O nome da câmera é o nome do objeto de câmera ou, se **Custom Output Names** estiver habilitado, seu `Output Name`.

### Criação de Diretórios

Antes do primeiro frame, o add-on cria todas as pastas de cada animação (e de cada câmera, quando **Camera Folder** está ligado). Se alguma pasta não puder ser criada, aparecem um aviso e um erro por pasta na barra de status/editor Info do Blender, e o render continua, falhando frame a frame nessas pastas.

> **⚠️ Problema conhecido (caracteres inválidos em nomes de pasta)**: a limpeza de caracteres inválidos é aplicada **somente ao nome do arquivo**. Os nomes de Project, Object, Animation e Camera são usados como digitados nos nomes de pasta. Nomes com `|`, `:`, `?`, `*` ou `"`, ou terminados em ponto ou espaço (por exemplo Actions do Mixamo como `Armature|mixamo.com|Layer0`), podem fazer a criação de pastas falhar no Windows, e uma `/` em um nome cria subpastas extras. Renomeie essas Actions/câmeras/objetos antes de renderizar.

---

## Construção do Nome do Arquivo

O nome do arquivo é construído a partir do template **Output Name**:
- Os placeholders são substituídos por seus valores reais.
- Se o resultado contiver separadores de caminho, somente a última parte é mantida.
- Caracteres inválidos em nomes de arquivo (`<>:"|?*\/`) são substituídos por `_`.
- Se o resultado estiver vazio, `render` é usado.
- A extensão `.png` é sempre adicionada.

O arquivo é gravado dentro da pasta construída acima, por exemplo `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0001.png`.

> **Formato de imagem**: o add-on sempre nomeia os arquivos como `.png`, mas usa as configurações de imagem da sua cena como estão. Antes de renderizar, defina **File Format = PNG** e **Color = RGBA** nas Output Properties (e ative **Film → Transparent** nas Render Properties para sprites transparentes). Ele também não altera a porcentagem de resolução: mantenha em 100%.

### Caso Especial: `$camera` Ausente

Se `$camera` **não** estiver presente no template:
- O add-on usa um **contador sequencial por animação** em vez do número do frame da timeline ao construir o valor `$frame`.
- Isso evita que a câmera A e a câmera B produzam nomes de arquivos idênticos para os mesmos frames.

Se `$camera` **estiver** presente:
- O número real do frame da timeline é usado para `$frame`.
- Você normalmente obterá uma sequência de imagens separada por câmera, com nomes como:
  - `MyGame_Hero_walk_front_0001.png`
  - `MyGame_Hero_walk_front_0002.png`
  - `MyGame_Hero_walk_back_0001.png`

---

## Exemplos

### Exemplo 1 — Sequências Clássicas Por Câmera

- Configurações:
  - `Project Name`: `MyGame`
  - `Object Name`: `Hero`
  - `output_template`: `$projectName_$objectName_$animation_$camera_$frame`
  - **Create Folders**:
    - Project: ON
    - Object: ON
    - Animation: ON
    - Camera: ON
  - `render.filepath`: `D:/Sprites/`  
- Estrutura resultante (simplificada):
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0001.png`
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0002.png`
  - `D:/Sprites/MyGame/Hero/walk/back/MyGame_Hero_walk_back_0001.png`

Como `$camera` está no template, `$frame` é o número real do frame da timeline e cada câmera tem sua própria sequência.

### Exemplo 2 — Sem Câmera no Template

- `output_template`: `$projectName_$objectName_$animation_$frame`
- Duas câmeras, `front` e `back`, e uma animação `walk` com 2 frames.
- `$camera` não é usado, então o add-on usa um contador sequencial interno por animação (ele continua contando ao passar para a câmera seguinte e recomeça em 1 a cada nova animação):
  - `MyGame_Hero_walk_0001.png` (primeira câmera, frame 1)
  - `MyGame_Hero_walk_0002.png` (primeira câmera, frame 2)
  - `MyGame_Hero_walk_0003.png` (segunda câmera, frame 1)
  - `MyGame_Hero_walk_0004.png` (segunda câmera, frame 2)

Com **Camera Folder** ligado, cada câmera ainda tem sua própria pasta, mas a numeração continua correndo entre as câmeras.

Isso pode ser útil se você estiver empacotando frames de múltiplas câmeras juntos em um pipeline personalizado ou construindo sprite sheets programaticamente.

---

## Abrir Pasta de Saída

O botão **Open Output Folder**, localizado ao lado do campo `Output Path` na seção **Output**, fornece acesso rápido ao seu diretório de saída:

- **Abre a pasta**: Abre o explorador de arquivos do sistema (Windows Explorer, macOS Finder ou gerenciador de arquivos Linux) na pasta escrita em `Output Path`
- **Conversão automática de caminho**: Converte caminhos relativos do Blender (começando com `//`) para caminhos absolutos antes de abrir
- **Cria pastas ausentes**: Se a pasta de saída não existir, ela será criada automaticamente antes de abrir
- **Somente a pasta base**: Abre o próprio `Output Path`, não as subpastas Project/Object/Animation/Camera criadas pelo render
- Funciona no Windows, macOS e Linux

Isso é especialmente útil quando você quer verificar rapidamente seus sprites renderizados ou verificar o local de saída sem navegar manualmente pelo sistema de arquivos.

---

## Dicas

- Sempre defina `Output Path` para uma **pasta** existente, não um nome de arquivo. O add-on verifica se a pasta existe antes de renderizar e mostra um erro se ela não existir.
- Use nomes curtos e legíveis para **Project**, **Object**, animações e câmeras para produzir nomes de assets limpos, e evite caracteres inválidos em nomes de pasta (veja o aviso acima).
- Se você alterar opções de pasta no meio do projeto, esteja ciente de que novas renderizações podem ir para caminhos diferentes das mais antigas; mantenha os caminhos de importação do seu projeto de jogo sincronizados.

---

## Para Desenvolvedores

Esta seção descreve helpers internos e pode mudar entre versões; não é necessária para usar o add-on.

- `clean_base_path(base_path, settings)` (em `operators.py`): a função que implementa a limpeza de caminho descrita na seção "Output Path" acima.
- `build_dir_parts(settings, anim_name, camera_name)`: retorna a lista de níveis de pasta na ordem Project → Object → Animation → Camera.
- `create_output_directories`: executa antes da renderização e chama `os.makedirs(..., exist_ok=True)` para cada combinação de animação/câmera.
- `build_output_path_simple(context, settings, anim_name, camera_name, frame, original_filepath)`: constrói o caminho final de cada frame, usando o `render.filepath` definido quando a renderização começou, e cria a pasta novamente de forma defensiva.
