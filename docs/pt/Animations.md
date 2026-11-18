# Animações

Esta página explica como o **Sprite Render Tool** trata animações nos quatro modos: **ACTIONS**, **NLA**, **STATIC** e **FRAME_RANGES**.

![Aba Animations com a lista de actions](/_static/images/SRT_AnimationTab.png)

---

## Modos de Animação

> **Localização no add-on**: aba **Animations**

Escolha o modo em `Animation Mode`:
- **Use Actions** (ACTIONS, padrão): renderiza a partir de uma lista de Actions.
- **Use NLA** (NLA): renderiza a partir das NLA strips da armadura alvo.
- **Static Render** (STATIC): renderiza apenas o frame atual.
- **Frame Ranges** (FRAME_RANGES): renderiza intervalos de frames específicos sem rig ou animação.

**Trocar o modo, ou selecionar um item de uma lista, não altera a sua cena** enquanto nenhum preview está ativo. A cena só é tocada pelos botões de **Preview** e pelo Render All, e os dois a devolvem ao estado original depois (veja [Render](Render.md)).

**Preview ao vivo.** Com um preview ativo, selecionar outra Action / NLA Strip na lista troca o preview na hora, e editar o `Start Frame` / `End Frame` do item selecionado atualiza o início / fim da timeline instantaneamente (o frame atual é mantido dentro do novo intervalo).

---

## Configurações Comuns

> **Localização no add-on**: aba **Animations**, abaixo de `Animation Mode`

- `Armature` (`target_armature`): a armadura cujas animações são renderizadas. Pode ser definida aqui ou na aba **Setup** (seção **Armature**; é a mesma configuração) e aparece nos modos **ACTIONS**, **NLA** e **FRAME_RANGES** (é obrigatória nos dois primeiros, onde o checklist acusa erro sem ela; em FRAME_RANGES só serve para avisar sobre a Action ativa dela). Só objetos do tipo armadura podem ser escolhidos.
- `Preview FPS` + **Apply** (`sprite_render.apply_fps`): define `scene.render.fps` com o valor e `scene.render.fps_base` como 1.0. Afeta só a velocidade de reprodução no viewport, não quais frames são renderizados.

---

## Listas (Actions, NLA, Frame Ranges)

As três listas funcionam do mesmo jeito:
- Cada linha tem uma caixa de seleção (habilitado / desabilitado) e o nome. Só as linhas **habilitadas** são renderizadas. Cada linha mostra `início-fim (N)`, onde N é o número de frames.
- `+` adiciona uma linha vazia, `-` remove a linha selecionada.
- **Enable All** / **Disable All** alteram todas as linhas da lista.
- Linhas que apontam para algo que não existe (uma Action ou NLA strip que não está no arquivo) aparecem em vermelho com um ícone de erro. O checklist oferece o botão **Disable them**.
- A linha selecionada mostra seus campos: frame inicial e final, e os campos extras do modo.

---

## Modo ACTIONS

> **Localização no add-on**: aba **Animations** → `Animation Mode` = **Use Actions**

Cada linha (`ActionItem`) tem:
- `Action`: o nome da Action, escolhido com um campo com busca entre as Actions do arquivo.
- `Start Frame`, `End Frame`.
- Caixa de habilitado.
- Com o **Sync Secondary Armature** ligado (veja abaixo), cada linha também tem:
  - `Sync Secondary`: toca a Action secundária durante esta animação.
  - `Secondary Armature`: só com **Different Armature per Animation** ligado (vazio = o `Armature` compartilhado).
  - `Secondary Action`: a Action tocada pela armadura secundária. Ela precisa ter **os mesmos frames** da Action principal (não há loop nem clamp).
  - Uma linha vermelha diz o que falta (sem armadura, sem Action, armadura secundária igual à principal, Action sem slot de objeto).

### Sync Secondary Armature

> **Local no add-on**: aba **Animations** → **Use Actions** → checkbox abaixo do `Armature`

Uma segunda armadura (por exemplo o cavaleiro de um cavalo) toca a própria Action junto com a principal, no preview e no Render All. O checkbox vem desmarcado; ao marcá-lo, as opções aparecem:

- `Armature`: a armadura secundária, **a mesma para todas as animações**.
- `Prefix`: a regra para achar a Action secundária de cada linha: **nome da secundária = prefixo + nome da principal**. Prefixo `Rider`: `Idle` → `RiderIdle`, `Gallop` → `RiderGallop`.
  - Primeiro tenta o nome exato. Se ele não existir, os nomes são comparados depois das regras do **Clean Action Names** (o prefixo `Armature|` / `Armature.001|` e o sufixo `|mixamo.com|Layer0` de FBX/Mixamo são ignorados, espaços = `_`), então `Armature|Gallop` encontra `Armature.001|RiderGallop|mixamo.com|Layer0`. Essa segunda comparação só vale se exatamente uma Action casar.
- `Different Armature per Animation` (desligado por padrão): esconde o `Armature` compartilhado e mostra um campo `Secondary Armature` em cada linha, para cenas em que as animações não usam todas a mesma armadura secundária.

Com o checkbox marcado, o **Detect Actions faz tudo de uma vez**: adiciona as Actions e, em toda linha cuja Action secundária for encontrada, liga o `Sync Secondary` e define a `Secondary Action`. As linhas que são elas mesmas Actions secundárias (`RiderGallop`...) são **desabilitadas**, porque renderizá-las na armadura principal não faz sentido. Linhas sem correspondência ficam como estão. Rodar o Detect Actions de novo numa lista que já existe também a preenche.

Com o checkbox desmarcado, o render e o preview ignoram o Sync Secondary (as linhas guardam suas configurações).

![Sync Secondary Armature marcado: Armature secundário, Prefix e o Sync Secondary / Secondary Action da linha](/_static/images/SRT_AnimationTab_SyncSecondary.png)

**Detect Actions** (`sprite_render.detect_actions`):
- **Adiciona** as Actions do arquivo que ainda não estão na lista. Linhas existentes mantêm o intervalo de frames e o estado de habilitado.
- Ignora Actions que não podem animar um objeto (luzes, materiais, shape keys...). Com Actions com slots (Blender 4.4+), a Action é mantida quando pelo menos um dos slots aponta para um objeto.
- **Poses estáticas entram desabilitadas**: uma Action de 1 a 2 frames (por exemplo a T-pose que vem com um FBX) é listada com início = fim e desmarcada. Marque se realmente quiser renderizá-la.
- O intervalo vem de `action.frame_range` (início arredondado para baixo, fim para cima).
- Uma mensagem informa quantas foram adicionadas (e quantas poses estáticas entraram desabilitadas) e avisa se alguma linha aponta para Actions que não existem mais.

![Detect Actions](/_static/images/SRT_DetectActions.gif)

![Lista de actions depois do Detect Actions](/_static/images/SRT_ActionsList.png)

### Renderizando no Modo ACTIONS

Quando o **Render All** roda no modo ACTIONS:
- Só as linhas habilitadas são renderizadas, cada uma por todas as câmeras da lista.
- No início de **cada** par animação / câmera, a Action é atribuída à `Armature` e `use_nla` é desligado, para que a Action controle a pose. Isso inclui a primeira câmera de cada animação e configurações com uma única câmera.
- Com as Actions com slots do Blender, se a armadura ficar sem Action Slot após a atribuição, o primeiro slot adequado é usado.
- Uma Action que não existe é reportada como aviso e suas imagens contam como falhas (normalmente o checklist impede isso antes do render começar).
- **Sync Secondary**: num item com ele ligado, a `Secondary Action` é atribuída à armadura secundária no início de cada par animação / câmera (o slot é escolhido como acima, e o `use_nla` dela é desligado). Um item sem Sync Secondary renderiza a armadura secundária como você a deixou (ela é reposta se uma animação anterior a mudou). Se a Action secundária não puder ser usada (sem armadura, sem Action, sem slot de objeto), o render mostra um aviso para aquela animação e a renderiza sem a Action secundária. As duas armaduras são restauradas no fim. Sync Secondary só é usado no modo **Use Actions** (para NLA, veja o workflow do cavalo com cavaleiro nos Guias).

> **Dica**: se uma Action é detectada mas não toca, confira o **Action Slot** da armadura em **Properties** → **Object Properties** → **Animation**.

---

## Modo NLA

> **Localização no add-on**: aba **Animations** → `Animation Mode` = **Use NLA**

Cada linha (`NLAItem`) tem:
- `Strip Name`: o nome da NLA strip.
- `Track Name`: a track que a contém (opcional; diferencia strips com o mesmo nome).
- `Start Frame`, `End Frame`, caixa de habilitado.

**Detect NLA Strips** (`sprite_render.detect_nla_strips`):
- Exige uma `Armature` com NLA tracks.
- **Adiciona** as strips (que têm Action) que ainda não estão na lista, incluindo strips de tracks mutadas (adicionadas como desabilitadas quando a track ou a strip está mutada). Linhas existentes mantêm intervalo e estado de habilitado.
- Intervalo: início arredondado para baixo, fim para cima.

Se a lista NLA estiver vazia, o Render All coleta as strips direto das NLA tracks da armadura.

### Renderizando no Modo NLA

No início de cada par animação / câmera:
- `use_nla` é ligado.
- A Action que estava ativa na armadura é retirada durante o render (ela tocaria por cima do NLA) e **devolvida no final**.
- Só a strip escolhida (e sua track) fica sem mute. Uma strip que não é encontrada é reportada como aviso e pulada.

---

## Modo STATIC

> **Localização no add-on**: aba **Animations** → `Animation Mode` = **Static Render**

- Não há lista de animações e não é preciso armadura.
- O add-on renderiza **apenas o frame atual** da cena.
- O nome da animação é `STATIC` (usável em `$animation` e na pasta Animation).

Use este modo para thumbnails, poses-chave e renders de um único frame.

---

## Modo FRAME_RANGES

> **Localização no add-on**: aba **Animations** → `Animation Mode` = **Frame Ranges**

Renderiza intervalos de frames específicos sem armadura nem dados de animação. **Ele renderiza a cena como ela está**: nenhuma Action ou NLA strip é aplicada, então o que estiver ativo na armadura toca em todos os intervalos. Se a `Armature` tiver uma Action ativa, o checklist mostra um aviso com o nome dela.

- Cada linha (`FrameRangeItem`) tem um nome editável (também na lista), frame inicial, frame final e uma caixa de seleção.
- **Add** (`+`) cria uma linha chamada `Range N`, com o intervalo de frames da cena como padrão. **Remove** (`-`) apaga a selecionada.
- O frame final nunca fica menor que o inicial: alterar um empurra o outro junto.
- O nome do intervalo é o valor de `$animation` (e o nome da pasta Animation).
- **Test Frame Count** também funciona neste modo.

---

## Animation Test

> **Localização no add-on**: aba **Animations** → **Animation Test** (recolhível; só modos ACTIONS e NLA)

Use para conferir uma animação antes de renderizar. Selecione uma linha primeiro.

- **Preview Action** (`sprite_render.test_action`):
  - Atribui a Action selecionada à armadura, desliga o NLA, ajusta início / fim da timeline e o frame atual ao intervalo da linha, aplica a Action secundária se o Sync Secondary estiver ligado (mesmas regras do render; uma linha sem ele mostra a armadura secundária como você a deixou) e inicia a reprodução. Se a timeline já estiver tocando, visualizar outro item a mantém tocando (nunca alterna a reprodução para parada).
- **Preview NLA Strip** (`sprite_render.test_nla_strip`):
  - Liga o NLA, retira a Action ativa, muta todas as strips exceto a selecionada, ajusta o intervalo da timeline e inicia a reprodução.
- **Stop Preview** (`sprite_render.stop_preview`):
  - Para a reprodução e **restaura a cena**: Action (e slot), `use_nla`, estados de mute do NLA, intervalo da timeline e frame atual, resolução e shifts das câmeras. Iniciar vários previews seguidos mantém o estado original de antes do primeiro.
  - Se você parar a reprodução (Space / ESC), o botão vira **Restore Scene**; clique nele para devolver a cena.
  - Iniciar o Render All com um preview ativo restaura a cena primeiro.
- **Frame Control**: contador de frames (`Frame N (range início-fim)`) e botões primeiro / anterior / próximo / último.

![Preview NLA Strip](/_static/images/SRT_PreviewNLA.gif)

![Frame Navigation Controls](/_static/images/SRT_FrameControls.gif)

![Animation Test expandido com Preview Action e Frame Control](/_static/images/SRT_AnimationTest_Expanded.png)

---

## Dicas e Boas Práticas

- Mantenha os nomes de **Action** e **NLA** descritivos (ex.: `walk_front`, `idle_side`, `attack_back`) para gerar nomes de arquivo úteis. Caracteres inválidos em nomes de arquivo (como o `|` dos nomes do Mixamo) viram `_`.
- No modo **ACTIONS**, desabilite as Actions que você não quer renderizar para reduzir o tempo de render.
- No modo **NLA**, use a lista quando quiser escolher strips independentemente do estado de mute no seu arquivo de trabalho.
- Use o **Animation Test** para conferir intervalos de frames e velocidade antes de lotes longos, e leia o checklist na aba **Render** antes de renderizar.
