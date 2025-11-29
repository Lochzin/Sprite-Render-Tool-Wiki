---
layout: default
title: "Changelog — Sprite Render Tool"
nav_order: 7
---

## Changelog — Sprite Render Tool

Esta página rastreia mudanças no **Sprite Render Tool** ao longo do tempo.

---

## [0.2.2] - 2024

### Corrigido

- **Gerenciamento de Caminho de Saída**: Corrigido problema onde as renderizações estavam sendo salvas tanto dentro quanto fora das pastas de câmera quando `use_camera_folder` estava habilitado, causando arquivos duplicados. A limpeza do caminho base agora remove corretamente os nomes de pastas dinâmicas (project, object, camera) do caminho antes de reconstruí-lo.

- **Reset do Contador de Frames**: Corrigido o contador de frames que não estava resetando entre diferentes animações quando nenhuma pasta estava configurada. O contador sequencial agora reseta corretamente para cada nova animação.

- **Contador de Frames da Pasta de Câmera**: Corrigido o contador de frames que não estava resetando entre câmeras quando `use_camera_folder` está habilitado. Agora:

  - Quando `use_camera_folder` está habilitado: O contador de frames reseta para 1 para cada câmera (cada câmera recebe sua própria sequência numerada: 1, 2, 3...)

  - Quando `use_camera_folder` está desabilitado: O contador de frames continua sequencialmente entre câmeras e só reseta ao mudar de animação

### Mudanças Técnicas

- Aprimorado o método `clean_base_path()` para aceitar parâmetro `settings` e remover nomes de pastas dinâmicas do caminho base

- Atualizado `build_dir_parts()` para verificar se `camera_name` não está vazio antes de adicionar às partes do diretório

- Modificada a lógica do contador de frames nos métodos `execute()` e `_render_next_frame()` para respeitar a configuração `use_camera_folder`

- Adicionada variável de rastreamento `_previous_cam_index` para detecção adequada de mudança de câmera no modo de renderização assíncrona

---

## [0.2.1] - 2024

**Destaques:**
- Fluxo de trabalho multi-câmera aprimorado com `render_order` por câmera.
- Adicionada **rotação de luz baseada em pivô** por câmera, com rotação XYZ completa opcional.
- Introduzidas **opções de estrutura de pastas de saída**:
  - Pastas Project/Object/Animation/Camera.
- Adicionado **template de saída** com placeholders:
  - `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`.
- Implementado **Render All (async)** com:
  - Barra de progresso, mensagens de status e contadores de renderização.
  - Botão de cancelar renderização.
- Adicionados painéis **Animations Test** para Actions e NLA:
  - Visualização, navegação de frames e controles de FPS personalizados.
- Adicionados helpers de detecção automática:
  - **Detect Cameras**
  - **Detect Actions**
  - **Detect NLA Strips**

---

