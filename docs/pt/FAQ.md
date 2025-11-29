---
layout: default
title: "FAQ — Perguntas Frequentes"
nav_order: 6
---

## FAQ — Perguntas Frequentes

Esta página lista perguntas comuns sobre o uso do **Sprite Render Tool** e como resolver problemas típicos.

---

## Geral

**P: Quais versões do Blender são suportadas?**  
**R:** O `bl_info` no add-on especifica Blender **5.0.0** como a versão mínima. Ele é projetado para Blender 5.x e posteriores; versões anteriores não são oficialmente suportadas.

**P: Onde encontro o painel Sprite Render Tool?**  
**R:** Após habilitar o add-on em Preferences, vá para:  
`3D Viewport > Sidebar (N) > Sprite Render > Sprite Render`.

---

## Câmeras e Iluminação

**P: Minhas renderizações parecem estar vindo da câmera errada. O que devo verificar?**  
**R:** Certifique-se de que:
- A lista **Cameras** tem os valores `Name` corretos (eles devem corresponder a objetos de câmera existentes).
- Na 3D Viewport, use **Test Cameras** para percorrer as câmeras configuradas e confirmar qual está ativa.
- A câmera da cena está sendo definida corretamente pelo add-on (você deve ver a câmera mudar ao percorrer).

**P: A luz não rotaciona por câmera, ou parece errada. Como posso depurar isso?**  
**R:** Verifique o seguinte:
- Certifique-se de que um **Pivot Object** está definido na seção **Light Pivot**.
- Ative **Light Rotation Debug** na seção **Debug** para ver saída detalhada do console.
- Verifique se `Enable Full Rotation (XYZ)` está definido corretamente:
  - Desligado: apenas o eixo Z é usado.
  - Ligado: XYZ completo do `light_rotation` da câmera é aplicado.

**P: O botão Detect Cameras não faz nada. Por quê?**  
**R:** O operador **Auto-fill Light Rotations** requer:
- Um **Pivot Object** válido (caso contrário, cancela com um erro).
- Pelo menos uma câmera que seja:
  - do tipo `CAMERA`
  - não oculta no viewport
  - não oculta para renderização  
Certifique-se de que você está na View Layer correta e que as câmeras estão visíveis.

---

## Animações

**P: Actions não aparecem na lista.**  
**R:** No modo **ACTIONS**:
- Clique em **Detect Actions**.
- A ferramenta lê de `bpy.data.actions` e preenche a lista.
- Se ainda estiver vazia, confirme que Actions existem no seu arquivo e não estão armazenadas em um arquivo blend diferente ou biblioteca.

**P: NLA strips não são detectadas.**  
**R:** No modo **NLA**:
- Defina uma **Target Armature** válida.
- Certifique-se de que a armadura tem `animation_data` com tracks e strips NLA.
- Clique em **Detect NLA Strips**.
- Se ainda estiver vazia, verifique se suas NLA strips estão na armadura escolhida e realmente têm Actions atribuídas.

**P: A animação errada toca durante a renderização.**  
**R:** Possíveis causas:
- No modo **ACTIONS**:
  - Verifique se a Action correta está habilitada na lista.
  - Confirme que seu `frame_start` e `frame_end` cobrem o intervalo pretendido.
- No modo **NLA**:
  - Verifique se a NLA strip selecionada na lista corresponde à strip que você espera.
  - Use **Preview NLA Strip** para ver se apenas essa strip está ativa antes de renderizar.

**P: Preview Action / Preview NLA Strip não parece tocar.**  
**R:** Verifique:
- Reprodução da timeline:
  - Certifique-se de que a timeline não está pausada por algum outro operador modal.
- Estado `is_previewing`:
  - Quando a visualização começa, o add-on chama `bpy.ops.screen.animation_play()`.
  - Use **Stop Preview** se a reprodução ficou travada ou se outra visualização estiver em execução.

---

## Output e Arquivos

**P: Onde minhas imagens estão sendo salvas?**  
**R:** O caminho final é construído a partir de:
- `scene.render.filepath` (limpo pelo add-on), mais
- Níveis de pasta opcionais (**Project/Object/Animation/Camera**), mais
- Nome do arquivo de `output_template` com placeholders:
  - `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`  
Verifique a seção **Output** e suas Render Properties para saber exatamente onde os arquivos vão.

**P: Alterei `Project Name` ou `Object Name` mas imagens antigas ainda estão na pasta anterior.**  
**R:** O add-on não move ou exclui renderizações antigas:
- Novas renderizações usam suas novas configurações para construir novas pastas/nomes de arquivos.
- Você pode precisar limpar diretórios antigos manualmente se quiser evitar duplicatas.

**P: Nomes de arquivos parecem estranhos ou contêm underscores inesperados.**  
**R:** O add-on:
- Substitui caracteres que são inválidos em sistemas de arquivos comuns: `<>:"|?*\/` com `_`.
- Usa `os.path.basename` na saída do template para evitar caminhos aninhados em um único nome de arquivo.
Se você vir `_` extras, provavelmente está sanitizando caracteres ou removendo barras acidentais no template.

---

## Performance e Estabilidade

**P: O Blender congela durante a renderização. Isso é normal?**  
**R:** O caminho **síncrono** (`execute`) bloqueará a UI, especialmente em lotes longos. Use:
- O **Render All** padrão do painel, que inicia o fluxo **assíncrono** baseado em timer, atualizando a UI entre frames e permitindo cancelamento.

**P: Como posso parar um lote de renderização longo?**  
**R:** Use o botão **Cancel Render** na seção **Render Progress**:
- O add-on define uma flag de cancelamento.
- A renderização para graciosamente após o frame atual terminar.

---

## Licenciamento

**P: Posso redistribuir o add-on?**  
**R:** A conformidade GPL permite certas redistribuições de código sob condições específicas, mas:
- Os **Termos de Distribuição Comercial** proíbem redistribuir o **arquivo comprado como um produto comercial**.
- Redistribuições de terceiros **não** recebem suporte ou atualizações garantidas.
Sempre leia o `LICENSE.md` e a página **License.md** antes de redistribuir qualquer coisa.

**P: Meus usuários precisam comprar o add-on se eu usá-lo no meu estúdio?**  
**R:** Depende da sua licença:
- Licença individual: 1 usuário.
- Estúdio / Comercial: até 5 usuários por licença (extensível mediante solicitação).  
Para detalhes precisos e casos extremos, consulte o texto da licença oficial.



