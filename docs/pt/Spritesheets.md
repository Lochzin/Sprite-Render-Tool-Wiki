# Spritesheets

A aba **Spritesheet** (último botão lateral, ícone de imagem) monta **spritesheets** a partir dos PNGs que o **Render All** gravou: um PNG com os frames em grade e um arquivo **JSON** que diz onde está cada frame. É uma etapa opcional depois do render e também funciona sobre uma pasta renderizada antes.

![Aba Spritesheet](/_static/images/SRT_SpritesheetTab.png)

---

## Fluxo

1. Renderize com o **Render All** normalmente.
2. Quando o render termina, aparece o botão **Make Spritesheets** (Montar Spritesheets) embaixo do Render All. Ele abre a aba Spritesheet (você também pode clicar no ícone de imagem).
3. Escolha o **Grouping** (Agrupamento), a **Order** (Ordem) e os espaçamentos.
4. Clique em **Preview** para ver a primeira sheet em um Image Editor (nada é salvo), ajuste e clique em **Generate Spritesheets**.
5. As sheets são salvas e a última aparece em um Image Editor. O botão de pasta ao lado do Generate abre a pasta das sheets.

> **Como os frames são encontrados:** a aba não varre a pasta às cegas. Ela usa a **configuração atual** (animações habilitadas, câmeras e sua ordem, Frame Step, Output Name, opções de pastas, Clean Action Names) e as mesmas funções que o render usa para nomear os arquivos. Então mantenha a configuração que gerou o render; se você a mudou, os frames aparecem como faltando.

---

## Opções

| Opção | O que faz |
| --- | --- |
| **Renders** | Pasta com a árvore do render (a mesma estrutura que o Render All grava). Vazio = a **Output Folder** de Project & Output. Use para montar sheets de um render anterior salvo em outro lugar. |
| **Sheets** | Onde as sheets são salvas. Vazio = uma pasta `spritesheets` dentro da pasta de renders. |
| **Grouping** | **Animation + Camera**: uma sheet por animação e câmera. **Animation**: uma sheet por animação, com todas as suas câmeras. **All in One (Atlas)**: tudo em uma sheet. |
| **Order** | **Row per Camera**: uma linha para cada câmera (e animação, no atlas), uma coluna para cada frame. **Sequence**: todos os frames em sequência, quebrando a linha após **Columns**. |
| **Columns** | Colunas na ordem Sequence. `0` = automático (perto de um quadrado). |
| **Padding** | Pixels vazios entre dois frames. |
| **Margin** | Pixels vazios em volta de toda a sheet. |
| **Uniform Frame Size** | Ligado (padrão): todos os frames precisam ter o mesmo tamanho (o Render All sempre gera uma resolução); um tamanho diferente para com uma mensagem clara. Desligado: aceita tamanhos diferentes, cada célula fica do tamanho do maior frame e o frame fica no canto superior esquerdo da célula (o JSON traz o tamanho real de cada frame). |
| **Skip Missing Frames** | Desligado (padrão): um frame faltando impede a sheet e a mensagem diz qual. Ligado: a sheet é montada mesmo assim. Em Row per Camera a célula fica vazia para as colunas continuarem alinhadas; em Sequence os frames fecham o buraco. |
| **Delete Frame PNGs After Generating** | Desligado por padrão. Veja abaixo. |

A caixa abaixo das opções mostra quantas sheets e frames a configuração atual gera e o tamanho da maior sheet (estimado pela resolução do add-on). Acima de **8192 px** há um aviso (muitas GPUs e engines limitam texturas a isso); acima de **16384 px** a sheet é recusada: use outro agrupamento, Sequence com menos colunas ou um Frame Step.

**Check Frames** procura os arquivos e informa quantos foram encontrados e quantos faltam (os primeiros caminhos faltando vão para o log Info).

---

## Saída

Para cada sheet:

- `<Objeto>_<Animação>_<Câmera>_sheet.png` (Animation + Camera), `<Objeto>_<Animação>_sheet.png` (Animation) ou `<Objeto>_atlas.png` (Atlas): RGBA, 8 bits, fundo transparente. Os pixels de cada frame são **idênticos** ao PNG renderizado.
- Um `.json` com o mesmo nome.

![Exemplo: agrupamento Animation, Row per Camera (uma linha por câmera)](/_static/images/SRT_Spritesheet_Example.png)

### JSON

Formato genérico (`"format": "sprite-render-tool-sheet"`), coordenadas em pixels a partir do canto **superior esquerdo**:

```json
{
  "image": "Hero_Gallop_sheet.png",
  "size": {"w": 202, "h": 104},
  "frame_size": {"w": 64, "h": 48},
  "origin": "top-left",
  "fps": 30.0, "frame_step": 8, "playback_fps": 3.75,
  "layout": {"grouping": "ANIMATION", "order": "ROWS", "columns": 3, "rows": 2, "padding": 2, "margin": 3},
  "frame_count": 6,
  "animations": [
    {"name": "Gallop", "camera": "Camera_Front", "frame_count": 3,
     "frames": [{"index": 0, "scene_frame": 1, "x": 3, "y": 3, "w": 64, "h": 48,
                 "column": 0, "row": 0, "source": "Gallop/Hero_Gallop_Camera_Front_0001.png"}]}
  ]
}
```

- `fps` é o FPS da cena; `playback_fps` = fps / Frame Step (a velocidade que mantém o tempo original).
- `animations` tem uma entrada por animação + câmera, com os frames na ordem de reprodução.

Formatos para Godot, Unity, Phaser/TexturePacker e exportação de GIF estão planejados (veja [Funcionalidades Futuras](Future-Features.md)).

---

## Apagar os PNGs individuais

Com **Delete Frame PNGs After Generating** ligado, o **Generate Spritesheets** mostra antes uma confirmação com o número de PNGs que serão apagados. Eles só são apagados **depois que todas as sheets foram salvas**, e somente:

- frames que foram lidos e colocados em uma sheet salva;
- arquivos dentro da pasta de renders (nunca as próprias sheets).

Os arquivos são apagados de vez (não vão para a Lixeira). Pastas vazias ficam. Deixe a opção desligada se quiser montar outros layouts depois.

---

## A cena não é alterada

Os frames são carregados um de cada vez em imagens temporárias removidas logo em seguida. Só uma imagem fica no arquivo: **Sprite Sheet Preview**, a última sheet (Preview ou Generate), para você conferir no Image Editor. Apague-a pelo Image Editor / visão Blender File se não quiser que ela seja salva no .blend.

---

## Documentação relacionada

- [Render](Render.md): Render All, checklist e confirmação
- [Output](Output.md): Output Folder, Output Name e pastas (a aba Spritesheet usa as mesmas configurações para achar os frames)
