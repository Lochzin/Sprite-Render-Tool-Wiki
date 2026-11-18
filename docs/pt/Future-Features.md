# Futuras Features

Esta página lista funcionalidades planejadas e melhorias para o **Sprite Render Tool** que ainda não foram implementadas, mas estão no roadmap.

---

## Funcionalidades Planejadas

### Funcionalidades de Animação

- **Modo Sub-Actions**: Suporte para a funcionalidade de sub-actions do Blender (introduzida no Blender 4.4). Este novo modo de animação permitirá que os usuários trabalhem com sub-actions, que fornecem uma forma de organizar e gerenciar hierarquias de animação complexas dentro de uma única action. Esta funcionalidade complementará os modos existentes ACTIONS, NLA, STATIC e FRAME_RANGES, fornecendo mais flexibilidade para fluxos de trabalho de animação avançados.

### Funcionalidades de Configuração de Câmeras

- **Presets de Câmeras Salvos**: o add-on já tem os presets prontos, o preset Custom (N câmeras em 360 graus) e `Elevation` / `Target Height` / `Distance`. Ainda planejado:
  - Criar e salvar seus próprios presets com ângulos de câmera livres para configurações usadas com frequência
  - Compartilhamento e importação/exportação de presets
  - Isso agilizará o fluxo de trabalho para usuários que frequentemente trabalham com arranjos de câmeras personalizados

### Melhorias de UI/UX

- **Links de Ajuda Contextual**: toda propriedade e operador já tem um tooltip, e as seções Project & Output, Light Pivot, Cameras, Animations e Render Settings têm um botão de ajuda. Ainda planejado:
  - Botões de ajuda que abrem a seção exata da documentação
  - Botões de documentação que abrem a wiki no idioma da interface do Blender (hoje sempre abrem o inglês)

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

