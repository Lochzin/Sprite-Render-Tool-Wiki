# Sugestões de GIFs Demonstrativos para Documentação

Este documento lista todas as sugestões de GIFs animados que seriam úteis para demonstrar funcionalidades do Sprite Render Tool na documentação.

---

## 🎯 PRIORIDADE ALTA — GIFs Essenciais

### 1. **index.md — Main Panel (UI)**

#### GIF 1: Visão Geral do Painel
- **O que mostrar**: Painel completo com todas as seções expandidas
- **Duração**: ~5-10 segundos
- **Ações**: Scroll pelo painel mostrando todas as seções (Project, Cameras, Light Pivot, Animations, Output, Render Progress)
- **Onde colocar**: Após a seção "Main Panel (UI)"

#### GIF 2: Fluxo Básico Completo
- **O que mostrar**: Workflow completo do início ao fim
- **Duração**: ~30-45 segundos
- **Ações**:
  1. Abrir o painel (Sidebar N)
  2. Configurar Project Name e Object Name
  3. Configurar Light Pivot object
  4. Clicar em "Detect Cameras" e ver a lista sendo preenchida
  5. Clicar em "Detect Actions" e ver a lista sendo preenchida
  6. Configurar Output Path e template
  7. Clicar em "Render All"
  8. Mostrar barra de progresso atualizando
- **Onde colocar**: Na seção "Basic Workflow"

#### GIF 3: Botão Open Output Folder
- **O que mostrar**: Botão sendo clicado e explorador de arquivos abrindo
- **Duração**: ~3-5 segundos
- **Ações**: 
  - Clicar no botão "Open Output Folder"
  - Mostrar o explorador de arquivos abrindo na pasta correta
- **Onde colocar**: Na seção "Output" do Main Panel e na página Output.md

---

### 2. **Animations.md — Animation Test Panel**

#### GIF 4: Preview Action em Funcionamento
- **O que mostrar**: Animação sendo previewed no viewport
- **Duração**: ~10-15 segundos
- **Ações**:
  - Selecionar uma Action na lista
  - Clicar em "Preview Action"
  - Mostrar a timeline rodando e o personagem animando no viewport
  - Mostrar os controles de frame (first, previous, next, last) sendo usados
- **Onde colocar**: Na seção "Animation Test Panel"

#### GIF 5: Preview NLA Strip
- **O que mostrar**: NLA strip sendo previewed
- **Duração**: ~10-15 segundos
- **Ações**:
  - Selecionar um NLA strip na lista
  - Clicar em "Preview NLA Strip"
  - Mostrar a animação rodando
- **Onde colocar**: Na seção "Animation Test Panel"

#### GIF 6: Navegação de Frames
- **O que mostrar**: Controles de frame navegando pela animação
- **Duração**: ~8-10 segundos
- **Ações**:
  - Clicar em "First" → mostra primeiro frame
  - Clicar em "Next" várias vezes → avança frames
  - Clicar em "Previous" → volta frames
  - Clicar em "Last" → mostra último frame
- **Onde colocar**: Na seção "Animation Test Panel"

#### GIF 7: Alternando entre ACTIONS e NLA
- **O que mostrar**: Diferença visual entre os dois modos
- **Duração**: ~10 segundos
- **Ações**:
  - Mostrar modo ACTIONS com lista de Actions
  - Mudar para modo NLA
  - Mostrar lista de NLA Strips aparecendo
  - Mostrar a mesma animação sendo previewed em ambos os modos
- **Onde colocar**: Na seção "Animation Modes"

---

### 3. **Cameras.md — Test Cameras**

#### GIF 8: Test Cameras Alternando Câmeras
- **O que mostrar**: Botão alternando entre câmeras configuradas
- **Duração**: ~15-20 segundos
- **Ações**:
  - Clicar em "Test Cameras" várias vezes
  - Mostrar a viewport mudando para cada câmera
  - Mostrar o nome da câmera mudando (se visível na UI)
  - Se houver light pivot, mostrar a luz rotacionando
- **Onde colocar**: Na seção "Testing Cameras"

#### GIF 9: Detect Cameras Preenchendo Lista
- **O que mostrar**: Botão detectando e preenchendo a lista automaticamente
- **Duração**: ~5-8 segundos
- **Ações**:
  - Mostrar lista vazia ou com poucas câmeras
  - Clicar em "Detect Cameras"
  - Mostrar a lista sendo preenchida automaticamente
  - Mostrar os valores de Light Rotation sendo calculados
- **Onde colocar**: Na seção "Detecting Cameras Automatically"

#### GIF 10: Light Rotation Mudando com Câmeras
- **O que mostrar**: Luz rotacionando ao alternar câmeras
- **Duração**: ~15-20 segundos
- **Ações**:
  - Com light pivot configurado
  - Alternar entre câmeras usando "Test Cameras"
  - Mostrar a luz (ou pivot) rotacionando para cada câmera
  - Destacar a diferença de iluminação no personagem
- **Onde colocar**: Na seção "Light Rotation per Camera"

---

### 4. **Lighting.md — Light Pivot System**

#### GIF 11: Light Pivot Rotacionando com Câmeras
- **O que mostrar**: Pivot rotacionando enquanto câmeras mudam
- **Duração**: ~20-25 segundos
- **Ações**:
  - Mostrar o pivot object (empty) na viewport
  - Alternar entre câmeras
  - Mostrar o pivot rotacionando suavemente
  - Mostrar como as luzes filhas do pivot seguem a rotação
- **Onde colocar**: Na seção "Light Rotation"

#### GIF 12: Comparação Luzes Dentro vs Fora do Pivot
- **O que mostrar**: Diferença entre luzes dentro e fora do pivot
- **Duração**: ~25-30 segundos
- **Ações**:
  - **Parte 1**: Mostrar cena com luz apenas dentro do pivot, alternar câmeras (luz gira)
  - **Parte 2**: Mostrar cena com luz apenas fora do pivot, alternar câmeras (luz fixa)
  - **Parte 3**: Mostrar cena com ambas (resultado final)
- **Onde colocar**: Na seção "Advanced Lighting Strategy"

#### GIF 13: Enable Light Pivot Ligado/Desligado
- **O que mostrar**: Diferença quando o toggle está ativo/inativo
- **Duração**: ~10-15 segundos
- **Ações**:
  - Mostrar toggle "Enable Light Pivot" desabilitado
  - Alternar câmeras (luz não muda)
  - Habilitar toggle
  - Alternar câmeras novamente (luz rotaciona)
- **Onde colocar**: Na seção "Enable Light Pivot Toggle"

#### GIF 14: Rotação Z-only vs XYZ Completa
- **O que mostrar**: Diferença entre os dois modos de rotação
- **Duração**: ~20-25 segundos
- **Ações**:
  - **Parte 1**: Com "Enable Full Rotation (XYZ)" desabilitado, alternar câmeras (apenas rotação Z)
  - **Parte 2**: Habilitar "Enable Full Rotation (XYZ)"
  - **Parte 3**: Alternar câmeras novamente (rotação XYZ completa)
  - Destacar a diferença visual
- **Onde colocar**: Na seção "Rotation Modes"

---

### 5. **Output.md — Open Output Folder**

#### GIF 15: Botão Abrindo Explorador de Arquivos
- **O que mostrar**: Botão abrindo o explorador
- **Duração**: ~5-8 segundos
- **Ações**:
  - Clicar no botão "Open Output Folder"
  - Mostrar o explorador de arquivos abrindo
  - Mostrar a pasta correta sendo exibida
  - Se possível, mostrar arquivos renderizados na pasta
- **Onde colocar**: Na seção "Open Output Folder"

#### GIF 16: Estrutura de Pastas Sendo Criada
- **O que mostrar**: Pastas sendo criadas durante renderização
- **Duração**: ~15-20 segundos
- **Ações**:
  - Mostrar o explorador de arquivos
  - Iniciar renderização
  - Mostrar pastas sendo criadas (Project/Object/Animation/Camera)
  - Mostrar arquivos sendo salvos dentro das pastas
- **Onde colocar**: Na seção "Folder Structure (Use Folders)"

---

## 📊 PRIORIDADE MÉDIA — GIFs Muito Úteis

### 6. **index.md — Render Progress**

#### GIF 17: Barra de Progresso Durante Renderização
- **O que mostrar**: Progresso da renderização em tempo real
- **Duração**: ~20-30 segundos
- **Ações**:
  - Clicar em "Render All"
  - Mostrar a seção "Render Progress" aparecendo
  - Mostrar contador [current/total] atualizando
  - Mostrar porcentagem aumentando
  - Mostrar barra de progresso preenchendo
  - Mostrar mensagem de status mudando
- **Onde colocar**: Na seção "Render Progress"

#### GIF 18: Cancelamento com ESC ou Botão
- **O que mostrar**: Renderização sendo cancelada
- **Duração**: ~10-15 segundos
- **Ações**:
  - Iniciar renderização
  - Mostrar progresso rodando
  - Pressionar ESC (ou clicar em "Cancel Render")
  - Mostrar renderização parando após o frame atual
  - Mostrar mensagem de cancelamento
- **Onde colocar**: Na seção "Render Progress" e no FAQ

---

### 7. **Animations.md — Detect Actions / Detect NLA**

#### GIF 19: Detect Actions Preenchendo Lista
- **O que mostrar**: Botão detectando Actions automaticamente
- **Duração**: ~5-8 segundos
- **Ações**:
  - Mostrar lista vazia ou com poucas Actions
  - Clicar em "Detect Actions"
  - Mostrar a lista sendo preenchida com todas as Actions do arquivo
  - Mostrar frame_start e frame_end sendo preenchidos automaticamente
- **Onde colocar**: Na seção "ACTIONS Mode" > "Actions List"

#### GIF 20: Detect NLA Strips Preenchendo Lista
- **O que mostrar**: Botão detectando NLA strips automaticamente
- **Duração**: ~5-8 segundos
- **Ações**:
  - Ter um armature com NLA strips configuradas
  - Selecionar o Target Armature
  - Clicar em "Detect NLA Strips"
  - Mostrar a lista sendo preenchida com todas as strips
- **Onde colocar**: Na seção "NLA Mode" > "NLA Strips List"

---

### 8. **FAQ.md**

#### GIF 21: Localizando o Painel
- **O que mostrar**: Como encontrar o painel no Blender
- **Duração**: ~5-8 segundos
- **Ações**:
  - Mostrar viewport do Blender
  - Pressionar N para abrir sidebar
  - Mostrar aba "Sprite Render" aparecendo
  - Mostrar painel "Sprite Render" expandido
- **Onde colocar**: Na resposta "Where do I find the Sprite Render Tool panel?"

#### GIF 22: Test Cameras para Verificar Câmeras
- **O que mostrar**: Usando Test Cameras para debug
- **Duração**: ~10-15 segundos
- **Ações**:
  - Mostrar problema: renderização saindo da câmera errada
  - Usar "Test Cameras" para ciclar pelas câmeras
  - Mostrar qual câmera está ativa
  - Verificar configuração na lista
- **Onde colocar**: Na resposta sobre "My renders look like they are coming from the wrong camera"

---

## 📝 PRIORIDADE BAIXA — GIFs Opcionais

### 9. **Output.md — Output Template**

#### GIF 23: Preview do Template Mudando
- **O que mostrar**: Preview do template atualizando em tempo real
- **Duração**: ~10-15 segundos
- **Ações**:
  - Mostrar campo "Output Name" (output_template)
  - Alterar Project Name → mostrar preview mudando
  - Alterar Object Name → mostrar preview mudando
  - Alterar template diretamente → mostrar preview atualizando
- **Onde colocar**: Na seção "Output Template"

---

### 10. **index.md — Quick Installation**

#### GIF 24: Processo de Instalação
- **O que mostrar**: Instalando o add-on passo a passo
- **Duração**: ~15-20 segundos
- **Ações**:
  - Abrir Edit > Preferences
  - Clicar em Add-ons
  - Clicar em Install...
  - Selecionar arquivo "Sprite Render Tool.py"
  - Buscar "Sprite Render Tool" na lista
  - Habilitar o add-on
  - Mostrar painel aparecendo
- **Onde colocar**: Na seção "Quick Installation"

---

## 🎬 GIFs Especiais — Workflows Completos

### GIF 25: Workflow Completo do Início ao Fim
- **O que mostrar**: Todo o processo de configuração e renderização
- **Duração**: ~60-90 segundos (pode ser acelerado)
- **Ações**:
  1. Abrir Blender com cena preparada
  2. Abrir painel (Sidebar N)
  3. Configurar Project Name: "MyGame"
  4. Configurar Object Name: "Hero"
  5. Criar/selecionar Light Pivot object
  6. Clicar em "Detect Cameras" → ver lista preenchendo
  7. Ajustar Render Order se necessário
  8. Selecionar Target Armature
  9. Mudar para modo ACTIONS
  10. Clicar em "Detect Actions" → ver lista preenchendo
  11. Habilitar/desabilitar Actions desejadas
  12. Configurar Output Path
  13. Configurar Output Template
  14. Habilitar pastas (Project/Object/Animation/Camera)
  15. Usar "Test Cameras" para verificar
  16. Usar "Preview Action" para testar animação
  17. Clicar em "Render All"
  18. Mostrar progresso rodando
  19. Mostrar arquivos sendo salvos
  20. Abrir pasta de saída e mostrar resultado final
- **Onde colocar**: No final da seção "Basic Workflow" ou como vídeo separado

---

### GIF 26: Comparação de Lighting Strategies
- **O que mostrar**: Comparação lado a lado de diferentes setups de luz
- **Duração**: ~30-40 segundos
- **Ações**:
  - **Cena 1**: Apenas luz dentro do pivot
    - Alternar câmeras mostrando luz girando
  - **Cena 2**: Apenas luz fora do pivot
    - Alternar câmeras mostrando luz fixa
  - **Cena 3**: Ambas (setup completo)
    - Alternar câmeras mostrando resultado final
- **Onde colocar**: Na seção "Advanced Lighting Strategy"

---

### GIF 27: Comparação de Animation Modes
- **O que mostrar**: Mesma animação em diferentes modos
- **Duração**: ~25-30 segundos
- **Ações**:
  - **ACTIONS mode**: Renderizar animação completa
  - **NLA mode**: Renderizar mesma animação via NLA
  - **STATIC mode**: Renderizar apenas um frame
  - Mostrar resultados lado a lado
- **Onde colocar**: Na seção "Animation Modes" do index.md

---

## 📋 Resumo por Prioridade

### 🔴 Essenciais (Fazer Primeiro)
1. ✅ Test Cameras alternando câmeras (GIF 8)
2. ✅ Preview Action/NLA funcionando (GIF 4, 5)
3. ✅ Light Pivot rotacionando com câmeras (GIF 11)
4. ✅ Render Progress com barra e cancelamento (GIF 17, 18)
5. ✅ Open Output Folder abrindo explorador (GIF 15)

### 🟡 Muito Úteis (Segunda Fase)
6. ✅ Detect Cameras preenchendo lista (GIF 9)
7. ✅ Workflow completo do início ao fim (GIF 25)
8. ✅ Comparação de lighting strategies (GIF 26)
9. ✅ Detect Actions/NLA preenchendo listas (GIF 19, 20)
10. ✅ Navegação de frames (GIF 6)

### 🟢 Opcionais (Se Tiver Tempo)
11. ✅ Comparação de modos de animação (GIF 27)
12. ✅ Preview do template mudando (GIF 23)
13. ✅ Processo de instalação (GIF 24)
14. ✅ Localizando o painel (GIF 21)

---

## 📐 Especificações Técnicas Recomendadas

### Formato
- **Formato**: GIF animado
- **Resolução**: 1280x720 (HD) ou 1920x1080 (Full HD) se possível
- **FPS**: 15-24 fps (balance entre qualidade e tamanho de arquivo)
- **Duração**: Conforme especificado em cada GIF (máximo 90 segundos)

### Otimização
- **Compressão**: Usar ferramentas como GIFsicle ou EZGIF para otimizar
- **Tamanho máximo**: Tentar manter abaixo de 5-10 MB por GIF
- **Cores**: Reduzir paleta de cores se necessário para diminuir tamanho
- **Crop**: Remover áreas desnecessárias da tela

### Captura
- **Ferramentas sugeridas**:
  - OBS Studio (gravar tela, depois converter para GIF)
  - ScreenToGif (Windows)
  - LICEcap (Windows/Mac)
  - Peek (Linux)
  - FFmpeg (conversão de vídeo para GIF)

### Acessibilidade
- **Legendas**: Considerar adicionar legendas em inglês/português se necessário
- **Velocidade**: Para GIFs longos, considerar versão acelerada e versão normal
- **Alternativas**: Manter descrições textuais detalhadas mesmo com GIFs

---

## 📍 Onde Colocar os GIFs na Documentação

### Sintaxe Markdown para Inserir GIFs

```markdown
![Descrição do GIF](assets/images/gifs/nome-do-gif.gif)
```

### Estrutura de Pastas Sugerida

```
docs/
  assets/
    images/
      gifs/
        index-main-panel-overview.gif
        index-basic-workflow.gif
        index-open-output-folder.gif
        animations-preview-action.gif
        animations-preview-nla.gif
        animations-frame-navigation.gif
        cameras-test-cameras.gif
        cameras-detect-cameras.gif
        lighting-pivot-rotation.gif
        lighting-comparison-inside-outside.gif
        lighting-enable-toggle.gif
        lighting-z-vs-xyz.gif
        output-open-folder.gif
        output-folder-structure.gif
        render-progress-bar.gif
        render-cancel-esc.gif
        ...
```

---

## ✅ Checklist de Produção

Para cada GIF:

- [ ] Script/storyboard preparado
- [ ] Cena Blender preparada com exemplo apropriado
- [ ] Captura realizada
- [ ] Edição e otimização feitas
- [ ] Tamanho de arquivo verificado (< 10 MB)
- [ ] Qualidade visual verificada
- [ ] Testado na documentação (local e online)
- [ ] Descrição alternativa adicionada (para acessibilidade)
- [ ] Nome de arquivo seguindo convenção
- [ ] Commit e push realizados

---

**Última atualização**: 2024-12-XX
**Versão do documento**: 1.0

