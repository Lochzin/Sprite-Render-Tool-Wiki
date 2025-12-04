# Futuras Features

Esta página lista funcionalidades planejadas e melhorias para o **Sprite Render Tool** que ainda não foram implementadas, mas estão no roadmap.

---

## Funcionalidades Planejadas

### Ferramentas de Debug Visual

- **Visualizador de Rotação do Pivot de Luz**: Uma ferramenta de debug visual para ajudar a visualizar e ajustar ângulos de rotação do pivot para câmeras em diferentes ângulos (não apenas horizontal). Esta funcionalidade foi tentada uma vez, mas não pôde ser implementada devido a limitações da API do Blender. Pode ser revisitada no futuro caso haja muita demanda dos usuários.

### Funcionalidades de Animação

- **Modo Sub-Actions**: Suporte para a funcionalidade de sub-actions do Blender (introduzida no Blender 4.4). Este novo modo de animação permitirá que os usuários trabalhem com sub-actions, que fornecem uma forma de organizar e gerenciar hierarquias de animação complexas dentro de uma única action. Esta funcionalidade complementará os modos existentes ACTIONS, NLA e STATIC, fornecendo mais flexibilidade para fluxos de trabalho de animação avançados.

- **Sincronização de Armadura Secundária**: Implementação completa da funcionalidade de sincronização de armadura secundária. Atualmente, a UI tem placeholders para `sync_secondary`, `secondary_armature` e `secondary_action`, mas a funcionalidade ainda não está totalmente implementada.

### Funcionalidades de Configuração de Câmeras

- **Presets de Câmeras**: Configurações rápidas para arranjos de câmeras comuns:
  - Presets para 1, 2, 3, 4 e 5 câmeras com ângulos e rotações pré-configurados
  - Criação e salvamento de presets customizados para configurações de câmeras frequentemente usadas
  - Funcionalidade de compartilhamento e importação/exportação de presets
  - Isso agilizará o fluxo de trabalho para usuários que frequentemente trabalham com arranjos de câmeras padrão (vistas frontal, traseira, lateral, etc.)

### Melhorias de UI/UX

- **Botões de Ajuda Contextual**: Integração de botões de ajuda/documentação em toda a UI que vinculam diretamente às seções relevantes da wiki:
  - Seção **Animation Mode**: Botão que leva à página de documentação de Animações
  - Seção **Cameras**: Botão que leva à página de documentação de Câmeras
  - Seção **Light Pivot**: Botão que leva à página de documentação de Iluminação
  - Seção **Output**: Botão que leva à página de documentação de Saída
  - Botão **FAQ**: Acesso rápido a perguntas frequentes
  - Esses botões fornecerão acesso instantâneo à documentação detalhada sem sair do Blender, melhorando a curva de aprendizado para novos usuários e servindo como referência rápida para usuários experientes

### Funcionalidades de Saída

- **Renderização de Normal Maps**: Opção para renderizar normal maps simultaneamente com a renderização normal. Isso permitirá que os usuários gerem tanto as imagens de sprites padrão quanto seus normal maps correspondentes em uma única passada de renderização, garantindo alinhamento perfeito e iluminação consistente entre as duas saídas.

- **Suporte a Múltiplas Resoluções**: Suporte para renderizar múltiplas resoluções por câmera ou múltiplas resoluções para a mesma câmera. Esta funcionalidade permitirá que os usuários gerem sprites em diferentes resoluções (ex.: 1x, 2x, 4x) em um único lote de renderização, o que é útil para jogos que precisam de sprites em múltiplos níveis de qualidade ou para diferentes densidades de display.

---

## Solicitações de Funcionalidades

Se você tiver sugestões de funcionalidades que gostaria de ver, considere:

- Abrir uma issue no repositório do projeto: [GitHub Issues](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/issues)
- Participar das discussões da comunidade: [GitHub Discussions](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/discussions)
- Entrar em contato com o desenvolvedor diretamente
- Contribuir para o projeto

---

**Nota**: Este é um documento vivo. Funcionalidades podem ser adicionadas, removidas ou repriorizadas com base no feedback dos usuários e nas prioridades de desenvolvimento.

