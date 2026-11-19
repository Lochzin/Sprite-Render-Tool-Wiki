# Output

Esta página explica como o **Sprite Render Tool** monta a estrutura de pastas e os nomes de arquivo dos seus sprites renderizados.

> **Localização no add-on**: aba **Setup** → seção **Project & Output**

---

## Output Folder

O ponto de partida é o campo **Output Folder** (`output_dir`, padrão `//sprites/`).

- A pasta é **criada automaticamente** (com as pastas-pai) quando você renderiza, então não precisa existir. O campo não fica vermelho enquanto a pasta não existe (o Blender o trata como caminho de saída, como o Output Path da cena).
- Uma pasta digitada **sem** `//` e sem letra de unidade ou `/` inicial (por exemplo `sprites`) também é relativa ao arquivo `.blend`, nunca à pasta de trabalho do Blender.
- Caminhos que começam com `//` são relativos ao arquivo `.blend`. **Salve o arquivo antes**: com o arquivo sem salvar, o add-on mostra um erro pedindo para salvar ou escolher uma pasta absoluta.
- `~` é expandido para a sua pasta pessoal.
- Caminhos absolutos funcionam no Windows (`D:\Sprites`, UNC `\\servidor\compartilhamento\sprites`), no Linux e no macOS (`/home/usuario/sprites`).
- O campo é usado exatamente como digitado (não é "limpo").
- No Windows, caracteres que o sistema não aceita em um caminho (`< > : " | ? *`, exceto o `:` da unidade) são um erro no checklist.

![Pasta de saída, modelo de nome, prévia da primeira imagem e opções de pastas](/_static/images/SRT_OutputFolder.png)

### Modo legado (Output Folder vazio)

Se você deixar `Output Folder` **vazio**, o add-on usa o **Output Path** da cena (Output Properties > `scene.render.filepath`; ele aparece no painel como um segundo campo). Neste modo valem as regras antigas de limpeza, e a pasta precisa já existir:
- Uma parte com cara de nome de arquivo no fim do caminho (por exemplo `D:/Sprites/hero_walk_0001.png`) é descartada e usa-se a pasta anterior.
- Pastas finais com o mesmo nome do Projeto, do Objeto ou de uma câmera são descartadas quando a opção de pasta correspondente está ligada, para não criar o mesmo nível duas vezes.
- Se não sobrar nada, usa-se a sua pasta pessoal.

### Prévia da primeira imagem

**First image will be saved as:** mostra o caminho completo da primeira imagem. Ele é montado pelas mesmas funções do render, então o que você vê é o que é salvo. A caixa também mostra:
- avisos do modelo (por exemplo `$frame` ausente ou variável desconhecida),
- colisões de nomes,
- um erro quando o caminho não pode ser montado (por exemplo um caminho `//` com o arquivo sem salvar),
- "No $camera: frames are numbered in sequence across cameras." quando há várias câmeras e `$camera` não está no modelo.

---

## Modelo de Nome (Output Template)

O campo **Output Name** (`output_template`) monta o **nome do arquivo** (sem extensão). Padrão: `$objectName_$animation_$frame`. Os nomes das pastas vêm das opções de pasta (abaixo), não do modelo.

### Variáveis Disponíveis

- `$projectName`: `Project Name`.
- `$objectName`: `Object Name`.
- `$animation`: animação atual (nome da Action, da NLA strip, do Frame Range, ou `STATIC`).
- `$camera`: nome do objeto de câmera ou, com **Custom Output Names**, o `Output Name` da câmera.
- `$frame`: número do frame com 4 dígitos (`0001`, `0002`, ...).

Sob o campo, botões (`projectName`, `objectName`, `animation`, `camera`, `frame`) acrescentam uma variável ao modelo (uma variável que já está no modelo não é adicionada de novo), e **Default** / **Per camera** definem os modelos `$objectName_$animation_$frame` e `$objectName_$animation_$camera_$frame`. **Available Placeholders** (recolhível) lista as variáveis e mostra uma prévia do nome com valores de exemplo.

> **`$frame` é obrigatório.** Sem ele cada frame sobrescreveria o mesmo arquivo, então o checklist mostra um erro (botão **Add $frame**) e o Render All fica desabilitado. Dois pares animação / câmera que gravariam o mesmo arquivo também são um erro (**colisão de nomes**). Arquivos que já existem são sobrescritos (o diálogo de confirmação mostra quantos).

### Caso Especial: `$camera` Ausente

Se `$camera` **não** está no modelo, `$frame` é um **contador sequencial por animação** (reinicia em 1 a cada animação e continua contando ao passar para a próxima câmera), então câmeras diferentes nunca geram o mesmo nome.

Se `$camera` **está** no modelo, `$frame` é o número real do frame da timeline, normalmente gerando uma sequência por câmera.

**Restart Frame Numbering Per Camera** (desligado por padrão): quando ligado, o contador também reinicia em 1 a cada câmera, então a pasta de cada câmera começa em `0001`. Só tem efeito com **Camera Folder** ligado e sem `$camera` no modelo (caso contrário fica cinza / é ignorado).

---

## Estrutura de Pastas (Create Folders)

`Project`, `Object`, `Animation` e `Camera` escolhem quais níveis são adicionados abaixo da pasta de saída, sempre nesta ordem:
1. Project Name (padrão desligado)
2. Object Name (padrão ligado)
3. Nome da animação (padrão ligado)
4. Nome da câmera (padrão ligado)

**Clean Action Names** (desligado por padrão, abaixo das opções de pasta): usa nomes de animação legíveis em pastas e arquivos. Remove o prefixo `Armature|` (ou `Armature.001|`) e o sufixo `|mixamo.com|Layer0` colocados pelo importador de FBX, e troca espaços por `_`: `Armature|Running|mixamo.com|Layer0` vira `Running` e `Strafe Left|mixamo.com|Layer0` vira `Strafe_Left`. Vale para `$animation` e para a pasta Animation; a Action em si não é renomeada.

Exemplo com os quatro ligados: `D:/Sprites/` vira `D:/Sprites/MyGame/Hero/walk/front/`.

O "nome da animação" depende do **Animation Mode**: o nome da Action (ACTIONS), o nome da strip (NLA), `STATIC`, ou o nome do intervalo (FRAME_RANGES). O nome da câmera é o nome do objeto de câmera ou seu `Output Name` (Custom Output Names).

### Criação de Diretórios

Antes da primeira imagem, o add-on cria as pastas de cada animação (e câmera, quando **Camera Folder** está ligado; sem ele há uma pasta por animação). Se uma pasta não puder ser criada, um aviso e um erro por pasta aparecem no editor Info do Blender.

---

## Nomes Seguros (Windows, Linux e macOS)

**Todo** nome que entra em um caminho (Project, Object, animação, câmera e o resultado do modelo) é limpo do mesmo jeito:
- Os caracteres `< > : " / \ | ?` e `*`, e caracteres de controle, viram `_`. Por exemplo, `Armature|mixamo.com|Layer0` vira `Armature_mixamo.com_Layer0`.
- Espaços no início e no fim, e pontos no fim, são removidos.
- Nomes reservados do Windows (`CON`, `PRN`, `AUX`, `NUL`, `COM1`-`COM9`, `LPT1`-`LPT9`) ganham o prefixo `_`.
- Nomes com mais de 200 caracteres são encurtados.
- Um nome vazio vira `_` (pastas) ou `render` (nome de arquivo). Um nome de câmera vazio em `$camera` continua vazio.
- Se o modelo tiver `/` ou `\`, só o último trecho é usado como nome do arquivo.
- A extensão é sempre `.png`.

Como pastas e arquivos usam a mesma limpeza, o resultado é o mesmo em todos os sistemas.

> **Formato de imagem**: o add-on nomeia todos os arquivos `.png` e usa as configurações de imagem da sua cena. O checklist pede **File Format = PNG** (erro) e **Color = RGBA** (aviso), e avisa se **Film > Transparent** está desligado ou se `Resolution %` não é 100, cada um com um botão **Fix**.

---

## Exemplos

### Exemplo 1 — Sequências Clássicas por Câmera

- `Project Name`: `MyGame`, `Object Name`: `Hero`
- `Output Name`: `$projectName_$objectName_$animation_$camera_$frame`
- **Create Folders**: Project, Object, Animation e Camera ligados
- `Output Folder`: `D:/Sprites/`
- Resultado:
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0001.png`
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0002.png`
  - `D:/Sprites/MyGame/Hero/walk/back/MyGame_Hero_walk_back_0001.png`

### Exemplo 2 — Sem Câmera no Modelo

- `Output Name`: `$projectName_$objectName_$animation_$frame`; duas câmeras (`front`, `back`) e uma animação `walk` com 2 frames; **Camera Folder** desligado.
- O contador continua entre as câmeras:
  - `MyGame_Hero_walk_0001.png` (front, frame 1)
  - `MyGame_Hero_walk_0002.png` (front, frame 2)
  - `MyGame_Hero_walk_0003.png` (back, frame 1)
  - `MyGame_Hero_walk_0004.png` (back, frame 2)

Com **Camera Folder** ligado, cada câmera ainda ganha sua própria pasta, mas os números continuam correndo entre as câmeras.

---

## Open Output Folder

O campo `Output Folder` é texto simples (não fica colorido, mesmo que a pasta ainda não exista; o render a cria). Ao lado dele, o botão **Browse** escolhe uma pasta e o botão de pasta abre no seu explorador de arquivos (Windows Explorer, Finder do macOS ou o gerenciador de arquivos do Linux) a pasta que o render vai usar, criando-a se não existir. No modo legado (`Output Folder` vazio) ele abre o **Output Path** da cena.

---

## Dicas

- Use nomes curtos e legíveis para Project, Object, animações e câmeras.
- Se você mudar as opções de pasta no meio de um projeto, novos renders podem ir para caminhos diferentes dos antigos; mantenha os caminhos de importação do seu jogo em dia.
- O add-on nunca apaga renders antigos.

---

## Para Desenvolvedores

Esta seção descreve detalhes internos e pode mudar entre versões; não é necessária para usar o add-on. As funções puras de caminho e nome estão em `sprite_render_tool/utils.py` e têm testes `pytest` em `tests/` (sem precisar do Blender):

- `sanitize_component(name)`: a limpeza descrita acima.
- `expand_template(...)`: monta o nome do arquivo a partir do modelo.
- `resolve_base_dir(...)`, `clean_base_path(...)`: a pasta base (a segunda é a heurística legada).
- `build_dir_parts(...)`, `build_final_path(...)`, `find_collisions(...)`.

`sprite_render_tool/operators/paths.py` acrescenta o lado Blender (local do `.blend`, configurações): `resolve_output_dir`, `validate_output_path`, `create_output_directories`, `build_output_path_simple`, `get_preview_info`.
