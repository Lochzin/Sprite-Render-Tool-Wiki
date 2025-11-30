# Output

Esta página explica como o **Sprite Render Tool** constrói estruturas de pastas e nomes de arquivos para seus sprites renderizados.

---

## Template de Saída

O núcleo do sistema de nomenclatura é `output_template`:
- Valor padrão:  
  `$projectName_$objectName_$animation_$camera_$frame`

Esta string é usada tanto para gerar:
- Nomes de pastas (indiretamente, via `$animation` e `$camera` quando as opções de pasta estão habilitadas), quanto
- O **nome do arquivo** final (antes de adicionar a extensão `.png`).

### Placeholders Disponíveis

Você pode usar as seguintes variáveis dentro de `output_template`:
- `$projectName`: obtido de `Project Name` na UI.
- `$objectName`: obtido de `Object Name` na UI.
- `$animation`: animação atual (nome da Action, nome da NLA strip, ou `"STATIC"` no modo Static).
- `$camera`: nome da câmera ou output name (veja a documentação de **Cameras**).
- `$frame`: índice do frame, formatado como `0001`, `0002`, etc.

O helper no painel principal (`get_output_example`) mostra uma visualização ao vivo de como o template ficaria com valores de exemplo.

---

## Limpeza do Caminho Base

O ponto de partida para toda a saída é o caminho de renderização da cena do Blender:
- `context.scene.render.filepath`

Antes de usá-lo, o add-on passa-o por `clean_base_path(base_path, settings)`:
- Normaliza barras para o separador do SO.
- Divide em componentes de caminho.
- Remove o que parece ser um nome de arquivo ou "pasta falsa" no final, por exemplo:
  - Coisas com extensões de imagem conhecidas (`.png`, `.jpg`, `.exr`, etc.).
  - Partes que contêm tanto `.` quanto `_` e têm uma extensão válida.
  - Partes que parecem nomes de sprites exportados (dígitos e underscores misturados).
- Se `settings` for fornecido, também remove pastas finais que correspondem a:
  - `project_name`
  - `object_name`
  - Quaisquer nomes de câmera ou output name potenciais
    - Isso evita duplicar níveis `Project/Object/Camera` quando eles também são adicionados via as opções de pasta.

Se, após a limpeza, o caminho estiver vazio, o diretório home do usuário é usado como fallback.

---

## Estrutura de Pastas (Use Folders)

As opções de pasta na seção **Output**:
- `Project Folder`
- `Object Folder`
- `Animation Folder`
- `Camera Folder`

controlam quais níveis são adicionados após o caminho base limpo. O helper:
- `build_dir_parts(settings, anim_name, camera_name)`

constrói uma lista nesta ordem:
1. `project_name` (se **Project Folder** estiver habilitado)
2. `object_name` (se **Object Folder** estiver habilitado)
3. `anim_name` (se **Animation Folder** estiver habilitado)
4. `camera_name` (se **Camera Folder** estiver habilitado)

O diretório final é:
- `final_dir = os.path.join(clean_base_path, *dir_parts)`

### Criação de Diretórios

O operador garante que os diretórios existem em duas passagens:

1. **create_output_directories** (antes de renderizar):
   - Usa o modo de animação escolhido (Actions / NLA / Static) para coletar todos os nomes de animação.
   - Para cada animação e (opcionalmente) cada câmera, constrói `dir_parts` e:
     - Chama `os.makedirs(final_dir, exist_ok=True)`.
   - Isso fornece feedback antecipado se alguns caminhos não puderem ser criados.

2. **build_output_path_simple** (por frame):
   - Repete a mesma lógica de diretório para calcular `final_dir`.
   - Chama `os.makedirs(final_dir, exist_ok=True)` defensivamente.
   - Constrói o nome do arquivo final dentro desse diretório.

---

## Construção do Nome do Arquivo

O helper `build_output_path_simple(context, settings, anim_name, camera_name, frame, original_filepath)`:
- Usa o `render.filepath` **original** de quando a renderização começou (para evitar deriva).
- Limpa-o com `clean_base_path` (com `settings`).
- Constrói `final_dir` conforme descrito acima.
- Calcula `filename` a partir de `output_template`:
  - Substitui placeholders com valores reais.
  - Usa `os.path.basename(filename)` para garantir que apenas a última parte se torne o nome do arquivo.
  - Substitui caracteres inválidos (`<>:"|?*\/`) com `_`.
  - Usa `"render"` como fallback se o resultado estiver vazio.
- Retorna `os.path.join(final_dir, filename + ".png")`.

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
  - **Use Folders**:
    - Project: ON
    - Object: ON
    - Animation: ON
    - Camera: ON
  - `render.filepath`: `D:/Sprites/`  
- Estrutura resultante (simplificada):
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0001.png`
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0002.png`
  - `D:/Sprites/MyGame/Hero/walk/back/MyGame_Hero_walk_back_0001.png`

### Exemplo 2 — Sem Câmera no Template

- `output_template`: `$projectName_$objectName_$animation_$frame`
- Duas câmeras, `front` e `back`.
- `$camera` não é usado, então o add-on usa um contador sequencial interno por animação:
  - `MyGame_Hero_walk_0001.png` (primeira câmera, frame 1)
  - `MyGame_Hero_walk_0002.png` (primeira câmera, frame 2)
  - `MyGame_Hero_walk_0003.png` (segunda câmera, frame 1)
  - etc.

Isso pode ser útil se você estiver empacotando frames de múltiplas câmeras juntos em um pipeline personalizado ou construindo sprite sheets programaticamente.

---

## Abrir Pasta de Saída

O botão **Open Output Folder**, localizado ao lado do campo `Output Path` na seção **Output**, fornece acesso rápido ao seu diretório de saída:

- **Abre a pasta**: Abre o explorador de arquivos do sistema (Windows Explorer, macOS Finder ou gerenciador de arquivos Linux) no local do caminho de saída
- **Conversão automática de caminho**: Converte caminhos relativos do Blender (começando com `//`) para caminhos absolutos antes de abrir
- **Cria pastas ausentes**: Se a pasta de saída não existir, ela será criada automaticamente antes de abrir
- **Multiplataforma**: Funciona no Windows, macOS e Linux

Isso é especialmente útil quando você quer verificar rapidamente seus sprites renderizados ou verificar o local de saída sem navegar manualmente pelo sistema de arquivos.

---

## Dicas

- Sempre defina `render.filepath` para um **diretório**, não um nome de arquivo. O add-on valida o caminho antes de renderizar e mostrará um erro claro se o caminho estiver inválido.
- Use nomes curtos e legíveis para **Project**, **Object**, animações e câmeras para produzir nomes de assets limpos.
- Se você alterar opções de pasta no meio do projeto, esteja ciente de que novas renderizações podem ir para caminhos diferentes das mais antigas; mantenha os caminhos de importação do seu projeto de jogo sincronizados.




