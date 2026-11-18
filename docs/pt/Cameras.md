# Câmeras

Esta página explica como configurar câmeras dentro do **Sprite Render Tool**. Para informações sobre iluminação e o sistema Light Pivot, veja [Lighting](Lighting.md).

Tudo nesta página está no painel **3. Cameras**, exceto a resolução, que fica em **5. Render Settings**.

---

## Presets de Criação de Câmeras

> **Localização no add-on**: painel **3. Cameras** → caixa **Create Cameras** (também o botão **Create** do **Start Here**)

A caixa **Create Cameras** cria câmeras a partir de um preset:

- Opções de **Preset**:
  - 1 Camera - Front
  - 2 Cameras - Front, Back
  - 2 Cameras - Front, Right
  - 3 Cameras - Front, Left, Right
  - 3 Cameras - Front, Right, Back
  - 4 Cameras - Front, Right, Back, Left (Direções Cardinais)
  - 5 Cameras - Front, Front Right, Right, Back Right, Back (padrão)
  - 8 Cameras - 360 Degrees (distribuídas uniformemente)
  - **Custom - N cameras in 360 Degrees**: N câmeras distribuídas uniformemente ao redor do alvo, começando pela frente. O campo `Cameras` (padrão 8) aparece só neste preset. As câmeras se chamam `Camera_000`, `Camera_045`, ... (o ângulo em graus)
- `Elevation`: ângulo das câmeras acima do plano horizontal (-89° a 89°, padrão 0°). **0° = na altura do alvo**; **30-45° dá uma visão 3/4 ou isométrica**. A distância até o alvo continua a mesma
- `Target Height`: altura acima do pivô (ou da origem) para onde as câmeras olham (padrão 0)
- `Distance`: distância do pivô (ou da origem) até as câmeras (padrão 10)

**Como funciona:**
- O ponto de referência é o **objeto Light Pivot** (se houver um) ou a origem da cena (0, 0, 0). As câmeras olham para o ponto de referência elevado por `Target Height`
- As câmeras são criadas na coleção ativa, com as configurações da caixa **Lens Settings**
- A lista de câmeras do add-on é substituída pelas novas câmeras, ordenadas por ângulo a partir da frente. Cada câmera recebe a rotação de luz automaticamente (veja abaixo)
- O add-on lembra quais câmeras ele criou (elas são marcadas internamente). Na próxima vez que você clicar em **Create Cameras**, **somente essas câmeras são apagadas e recriadas**, e o Blender pede confirmação antes ("Replace cameras?"). Câmeras que você mesmo criou nunca são apagadas

> **Conflito de nomes**: as câmeras dos presets se chamam `Camera_Front`, `Camera_Right`, `Camera_Back`, `Camera_Left`, `Camera_FrontRight`, `Camera_BackRight`, `Camera_BackLeft` e `Camera_FrontLeft`. Se a sua cena já tiver um objeto com um desses nomes, **ele não é alterado** e o Blender dá à nova câmera um sufixo (por exemplo `Camera_Front.001`). A lista e os nomes de arquivo usam o nome real da nova câmera.

---

## Lens Settings

> **Localização no add-on**: painel **3. Cameras** → caixa **Lens Settings**

Controles sincronizados para todas as câmeras da lista:

- **Type**: Perspective ou Orthographic
- **Focal Length** (Perspective, em mm) ou **Orthographic Scale** (Orthographic): o rótulo acompanha o tipo de câmera
- **Shift X / Y**: deslocamento da câmera
  - **Desync Shift X** e **Desync Shift Y** são botões de alternância independentes
  - **Solto** (padrão): todas as câmeras compartilham o valor de shift daquele eixo
  - **Pressionado**: cada câmera mantém seu próprio valor naquele eixo, editado na lista de câmeras
  - Uma mensagem abaixo mostra "All cameras are synchronized" ou quais eixos são por câmera
- **Clip Start / End**: distâncias de corte próxima e distante

Os valores são aplicados a todas as câmeras da lista quando você os altera, quando clica em **Create Cameras** e quando clica em **Detect Cameras**. No início das imagens de cada câmera, o render aplica o shift de novo (compartilhado ou individual).

![Lens Settings Expanded](/_static/images/SRT_LensSettings_Expanded.png)

A **resolução** (`Resolution X / Y`) fica em **5. Render Settings**; veja [Render](Render.md).

---

## Lista de Câmeras

> **Localização no add-on**: painel **3. Cameras** → caixa **Cameras (render order)**

Abaixo da opção **Custom Output Names** fica a lista de câmeras:

- `+` adiciona à lista os **objetos de câmera selecionados** da cena (ou o ativo)
- `-` remove a linha selecionada da lista (o objeto de câmera **não** é apagado)
- **Setas para cima / baixo** movem a linha selecionada. **A ordem da lista é a ordem de render**
- O **ícone de câmera** de cada linha torna aquela câmera a câmera da cena, muda o 3D Viewport para a visão de câmera e, se o Light Pivot estiver habilitado e definido, gira o pivô para essa câmera. Linhas cujo objeto de câmera não existe aparecem destacadas com um ícone de erro

A linha selecionada mostra:
- `Camera`: o objeto de câmera (campo com busca)
- `Output Name`: nome usado em arquivos e pastas (só com **Custom Output Names** ligado)
- `Shift X` / `Y`: shift individual (só nos eixos com **Desync Shift** pressionado)
- `Light Rotation Z` ou `Light Rotation (XYZ)`: a rotação dada ao Light Pivot para esta câmera (XYZ quando **Enable Full Rotation (XYZ)** em **4. Light** está ligado)

> O render confere a lista antes de começar: câmeras em branco ou inexistentes são um erro no checklist (com o botão **Remove them**). Veja [Render](Render.md).

![Camera List Expanded](/_static/images/SRT_CameraList_Expanded.png)

---

## Detectando Câmeras Automaticamente

> **Localização no add-on**: painel **3. Cameras** → botão **Detect Cameras** (também **Detect** no **Start Here**)

**Detect Cameras** (`sprite_render.autofill_light_rotation`) **adiciona** à lista as câmeras da cena. Ele nunca substitui o que você já tem:

- Só entram câmeras da **View Layer** atual que não estão ocultas no viewport, nem desabilitadas no viewport, nem desabilitadas para render
- Câmeras que já estão na lista **mantêm a posição na lista, o `Output Name` e o shift individual**. Câmeras novas vão para o fim, com `Output Name` igual ao nome da câmera e o shift atual da câmera
- Itens cujo objeto de câmera não existe mais são removidos
- A **rotação de luz de todas as câmeras detectadas é recalculada** (só em Z, a partir da posição da câmera e do pivô). Uma rotação de luz digitada à mão é perdida, então ajuste depois de detectar
- Com `Enable Light Pivot` desligado, a rotação de luz fica em 0
- As configurações de lente e shift da caixa **Lens Settings** são aplicadas a todas as câmeras
- Uma mensagem informa quantas câmeras foram adicionadas e quantas há na lista

> **Importante**: um objeto **Light Pivot** **só é necessário quando `Enable Light Pivot` está ligado**. Se estiver ligado e nenhum objeto estiver definido, o operador cancela com "Light pivot object is not set". Se nenhuma câmera servir, mostra um aviso e deixa a lista como está.

### Limitações da Detecção Automática

A rotação de luz calculada por **Detect Cameras** e **Create Cameras** é uma **rotação apenas em Z**: a luz olha na mesma direção da câmera, vista de cima. Funciona bem para câmeras ao redor do personagem num plano horizontal. Para câmeras que olham de cima ou de várias alturas (por exemplo com `Elevation`), ligue **Enable Full Rotation (XYZ)** e **ajuste `Light Rotation` manualmente**.

Para mais informações sobre rotação de luz e configuração de iluminação, veja [Lighting](Lighting.md).

---

## Rotação de Luz por Câmera

Cada câmera tem uma `Light Rotation` que controla como o **Light Pivot** é girado para aquela câmera. Para a mesma posição de câmera, **Create Cameras** e **Detect Cameras** dão o mesmo valor (a luz olha na direção da câmera para o pivô, ou para a origem quando não há pivô). Uma câmera no eixo da frente recebe 0°.

Para informações detalhadas sobre o sistema Light Pivot e estratégias de iluminação, veja [Lighting](Lighting.md).

---

## Ordem de Render

A ordem da lista **Cameras (render order)** é a ordem em que as câmeras são renderizadas: para cada animação, a primeira câmera da lista vem primeiro. Mover uma linha ou rodar **Detect Cameras** renumera a ordem (0, 1, 2, ...).

Use isso para:
- Garantir que as câmeras frente / lado / costas sempre renderizem em sequência consistente.
- Controlar como suas pastas são preenchidas e como o progresso é reportado.

---

## Nomes de Saída Personalizados vs Nomes de Câmera

Você escolhe se os nomes de arquivo e de pasta usam:
- O **nome do objeto de câmera** no Blender (padrão), ou
- Um **nome de saída personalizado** (por exemplo `front`, `side`, `back`, `iso_NE`).

Ligue **Custom Output Names** (abaixo das configurações de lente) e preencha `Output Name` em cada câmera da lista. Esse valor é usado pela variável `$camera` e pela **Camera Folder**. Caracteres inválidos em nomes de arquivo viram `_`.

---

## Testando Câmeras

O botão **Test Cameras** (`sprite_render.test_cameras`, em **5. Render Settings**) ajuda a visualizar a configuração de câmeras:
- Encontra a câmera atual da cena na lista do add-on.
- Seleciona a **próxima** câmera da lista (ciclicamente) e a torna a câmera da cena.
- Muda o 3D Viewport para a visão de câmera.
- Se o Light Pivot estiver habilitado e definido, também aplica a rotação de luz correspondente.

Use para:
- Passar por todas as câmeras configuradas.
- Confirmar que enquadramento e iluminação estão consistentes antes de iniciar um lote de render.
- **Visualizar a rotação de luz**: coloque o shading do viewport em **Rendered** para ver o pivô girar enquanto você alterna entre as câmeras (modos só Z e XYZ).

> **Dica**: o ícone de câmera de cada linha da lista faz o mesmo para uma câmera específica. Para detalhes de iluminação veja [Lighting](Lighting.md).
