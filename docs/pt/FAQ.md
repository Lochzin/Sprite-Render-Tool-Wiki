# FAQ

Esta página lista perguntas comuns sobre o uso do **Sprite Render Tool** e como resolver problemas típicos.

---

## Geral

**P: Quais versões do Blender são suportadas?**  
**R:** O `bl_info` no add-on especifica Blender **5.0.0** como a versão mínima. Ele é projetado para Blender 5.x e posteriores. O add-on foi inicialmente desenvolvido para Blender 4.0, então é possível que funcione (talvez até completamente bem) em versões anteriores, mas isso não foi testado e não é oficialmente suportado.

**P: Onde encontro o painel Sprite Render Tool?**  
**R:** Depois de ativar o add-on nas Preferências, vá em:  
`3D Viewport > Sidebar (N) > Sprite Render`. É um painel principal com o **Render All** no topo e botões laterais de abas (Info, Setup, Cameras, Animations, Render).

**P: Posso usar o add-on em português?**  
**R:** Sim. Coloque o idioma do Blender em português (`Edit > Preferences > Interface > Language`) e os painéis, tooltips e mensagens aparecem em português. Os botões de documentação continuam abrindo a wiki em inglês.

---

## Câmeras e Iluminação

**P: Meus renders parecem vir da câmera errada. O que devo verificar?**  
**R:** Confirme que:
- A lista **Cameras (render order)** tem as câmeras certas. Linhas em vermelho são câmeras que não existem (o checklist oferece **Remove them**).
- Use **Test Cameras**, ou o ícone de câmera de uma linha, para ver através de uma câmera configurada.
- Lembre que a ordem da lista é a ordem de render.

**P: A luz não gira por câmera, ou parece errada. Como investigar?**  
**R:** Verifique:
- Na aba **Setup** (seção **Light Pivot**), `Enable Light Pivot` está ligado e um `Object` pivô está definido.
- `Enable Full Rotation (XYZ)` está correto: desligado usa só Z, ligado usa o `Light Rotation` XYZ completo da câmera.
- Clique em **Test Cameras** (com o viewport em shading **Rendered**) e veja o pivô girar; os valores de rotação são escritos no editor Info do Blender.
- A rotação de luz automática é só em Z; ajuste à mão para câmeras em outras alturas (veja [Lighting](Lighting.md)).

**P: O botão Detect Cameras não faz nada. Por quê?**  
**R:** O **Detect Cameras** precisa de:
- Um objeto **Light Pivot** **só se `Enable Light Pivot` estiver ligado**. Com o pivô habilitado e nenhum objeto definido, ele cancela com "Light pivot object is not set". Com ele desligado, não precisa de pivô e toda rotação de luz fica 0.
- Pelo menos uma câmera da View Layer atual que não esteja oculta no viewport nem desabilitada no viewport ou para render. Se nenhuma servir, mostra um aviso e deixa a lista como está.

Quando funciona, ele **adiciona** as câmeras novas e mantém as linhas existentes (ordem, `Output Name`, shift). A rotação de luz das câmeras detectadas é recalculada.

**P: O Create Cameras pergunta "Replace cameras?". Ele vai apagar minhas câmeras?**  
**R:** Não. Ele só apaga as câmeras que o add-on criou numa execução anterior. Suas próprias câmeras nunca são apagadas, mesmo com nome parecido (a nova câmera ganha o sufixo `.001`).

![Cinco câmeras criadas em volta do personagem com o preset de 5 câmeras](/_static/images/SRT_Scene_Cameras.png)

---

## Animações

**P: As Actions não aparecem na lista.**  
**R:** No modo **ACTIONS** clique em **Detect Actions** (ou em `+` e escolha a Action pelo nome). Ele adiciona as Actions do arquivo que podem animar objetos (não luzes nem materiais). Se continuar vazio, confirme que existem Actions no arquivo e que elas não estão numa biblioteca.

**P: As Actions são detectadas mas nada acontece ao tentar visualizar ou renderizar.**  
**R:** Confira se há uma `Armature` definida na aba **Animations** e se a linha está habilitada e não está vermelha. O add-on atribui a Action (e um Action Slot adequado) por você; se ainda assim não tocar, confira o **Action Slot** da armadura em **Properties** → **Object Properties** → **Animation**.

**P: As NLA strips não são detectadas.**  
**R:** No modo **NLA** defina uma `Armature` com NLA tracks e clique em **Detect NLA Strips**. Só strips com Action são adicionadas; strips de tracks mutadas entram desabilitadas.

**P: A animação errada toca durante o render.**  
**R:** A Action ou strip é aplicada em cada animação e câmera. Confira se as linhas certas estão habilitadas, se os intervalos de frames estão corretos e se o checklist não tem problemas. Use **Preview Action / Preview NLA Strip** para ver uma animação sozinha.

**P: Preview Action / Preview NLA Strip parece não tocar.**  
**R:** Confira se a timeline não está pausada por outro operador modal. Se a reprodução parou (Space / ESC), o botão vira **Restore Scene**: clique nele para devolver a cena e inicie o preview de novo.

**P: Usei um preview e agora minha armadura está com outra Action.**  
**R:** Clique em **Stop Preview** / **Restore Scene**. Ele restaura a Action, os estados de mute do NLA, o intervalo da timeline, o frame atual, a resolução e os shifts das câmeras de antes do primeiro preview.

---

## Render

**P: O Render All está cinza. Por quê?**  
**R:** O checklist na aba **Render** tem pelo menos um erro (ou um render já está rodando). Passe o mouse sobre o botão para ver o primeiro erro e use os botões **Fix**.

**P: O que o diálogo antes do render me mostra?**  
**R:** O número de animações, câmeras e imagens, a pasta de destino, o tempo estimado (só depois que um render terminou nesta sessão do Blender), quantos arquivos existentes serão sobrescritos e os avisos. Clique em **Render** para iniciar.

**P: O render altera minha cena?**  
**R:** Ele altera coisas enquanto roda e as devolve quando termina, é cancelado ou falha: Action ativa e slot, `use_nla`, estados de mute do NLA, intervalo da timeline, frame atual, resolução (X, Y e %), shifts das câmeras, câmera da cena, caminho de saída e rotação do Light Pivot. Veja [Render](Render.md).

**P: O Blender trava durante o render. Isso é normal?**  
**R:** Até certo ponto. O **Render All** renderiza uma imagem por vez com o render do próprio Blender, que bloqueia a interface enquanto cada imagem renderiza. A barra de progresso, o **Cancel Render** e o **ESC** são tratados **entre** as imagens. Ele não está realmente travado: espere a imagem atual terminar.
- Reduza os samples / a resolução, ou use o **Frame Step**, para acelerar lotes longos.
- O Ctrl+Z fica bloqueado durante o render e só um render roda por vez.

**P: Como paro um lote de render longo?**  
**R:** Pressione **ESC** ou clique em **Cancel Render** (painel principal, visível durante o render). O render para depois da imagem atual e a cena é restaurada.

**P: O painel diz "renderizando" mas nada está renderizando.**  
**R:** Clique em **Cancel Render** para zerar o estado. O estado também é zerado quando o add-on é ativado e quando um arquivo é carregado.

![Checklist com um erro que bloqueia o Render All](/_static/images/SRT_RenderChecklist_Error.png)

---

## Output e Arquivos

**P: Onde minhas imagens estão sendo salvas?**  
**R:** Veja **First image will be saved as:** na aba **Setup** (seção **Project & Output**). O caminho é a `Output Folder` (padrão `//sprites/`, criada automaticamente; relativa ao arquivo .blend, então salve o arquivo antes), mais as pastas opcionais (**Project / Object / Animation / Camera**), mais o nome do arquivo vindo do `Output Name`.

**P: O Render All diz que meu Output Name não tem `$frame`.**  
**R:** Sem `$frame` cada frame sobrescreveria o mesmo arquivo. Clique em **Add $frame** no checklist, ou adicione com o botão `frame` abaixo do campo `Output Name`.

**P: O checklist informa uma colisão de nomes de saída.**  
**R:** Dois pares animação / câmera gravariam os mesmos arquivos. Adicione `$animation` e `$camera` ao `Output Name`, ou ligue **Animation Folder** / **Camera Folder**.

**P: Mudei o `Project Name` ou `Object Name` mas as imagens antigas continuam na pasta anterior.**  
**R:** O add‑on não move nem apaga renders antigos. Novos renders usam as novas configurações. Limpe as pastas antigas manualmente se necessário.

**P: Os nomes de arquivo têm sublinhados inesperados.**  
**R:** Caracteres inválidos em sistemas de arquivos comuns (`< > : " / \ | ? *`) viram `_` em **nomes de arquivo e de pasta** (por exemplo `Armature|mixamo.com|Layer0` vira `Armature_mixamo.com_Layer0`), e nomes reservados do Windows ganham o prefixo `_`. Veja [Output](Output.md).

**P: Minhas Actions do Mixamo / FBX têm nomes como `Armature|Running|mixamo.com|Layer0`. Dá para ter nomes de pasta limpos?**  
**R:** Sim. Ligue **Clean Action Names** (abaixo de **Create Folders**): os nomes de pasta e de arquivo ficam `Running`. As Actions não são renomeadas.

**P: Cada câmera continua a numeração da anterior. Dá para cada uma começar em 0001?**  
**R:** Sim. Sem `$camera` no `Output Name`, ligue **Camera Folder** e **Restart Frame Numbering Per Camera**.

**P: O Detect Actions adicionou uma Action mas deixou desmarcada.**  
**R:** Actions de 1 a 2 frames (poses estáticas como a T-pose do FBX) entram desabilitadas. Marque a linha se quiser.

**P: Posso renderizar para um caminho absoluto do Linux / macOS ou um caminho de rede?**  
**R:** Sim. Caminhos absolutos (`/home/usuario/sprites`) e caminhos UNC (`\\servidor\compartilhamento`) são suportados.

**P: O checklist reclama do formato de imagem.**  
**R:** O add-on sempre grava `.png`. Use **File Format = PNG** e **Color = RGBA** no Output Properties, **Film > Transparent** no Render Properties e `Resolution %` = 100. Cada item tem um botão **Fix**.

---

## Licenciamento

**P: Posso redistribuir o add-on?**  
**R:** A conformidade GPL permite certas redistribuições de código sob condições específicas, mas:
- Os **Termos de Distribuição Comercial** proíbem redistribuir o **arquivo comprado como um produto comercial**.
- Redistribuições de terceiros **não** recebem suporte ou atualizações garantidas.
Sempre leia o `LICENSE.md` e a página [License](License.md) antes de redistribuir qualquer coisa.

**P: Meus usuários precisam comprar o add-on se eu usá-lo no meu estúdio?**  
**R:** Depende da sua licença:
- Licença individual: 1 usuário.
- Estúdio / Comercial: até 5 usuários por licença (extensível mediante solicitação).  
Para detalhes precisos e casos extremos, consulte o texto da licença oficial.

---

## Suporte e Comunidade

**P: Onde posso obter ajuda ou discutir o add-on com outros usuários?**  
**R:** Você pode:
- Participar das discussões da comunidade: [GitHub Discussions](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/discussions)
- Fazer perguntas, compartilhar dicas e conectar-se com outros usuários

**P: Como reporto um bug ou problema?**  
**R:** Se você encontrar um bug ou tiver um problema técnico:
- Abra uma issue no GitHub: [Reportar um Bug](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/issues)
- Por favor, inclua detalhes sobre sua versão do Blender, o que você estava tentando fazer e quaisquer mensagens de erro


