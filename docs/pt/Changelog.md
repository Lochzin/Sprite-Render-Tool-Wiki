## Changelog — Sprite Render Tool

Esta página é um template sugerido para rastrear mudanças no **Sprite Render Tool** ao longo do tempo.

> **Nota:** Apenas a versão **0.2.1** é visível no snippet de código fornecido (`bl_info["version"] = (0, 2, 1)`). Versões mais antigas abaixo são exemplos; ajuste ou remova-as para corresponder ao seu histórico real.

---

## 0.2.1

**Data de lançamento:** (preencher)

**Destaques:**
- Melhorado o fluxo de trabalho multi-câmera com `render_order` por câmera.
- Adicionada **rotação de luz baseada em pivot** por câmera, com rotação XYZ completa opcional.
- Introduzidas **opções de estrutura de pastas de saída**:
  - Pastas Project/Object/Animation/Camera.
- Adicionado **template de saída** com placeholders:
  - `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`.
- Implementado **Render All (async)** com:
  - Barra de progresso, mensagens de status e contadores de renderização.
  - Botão de cancelar renderização.
- Adicionados painéis **Animations Test** para Actions e NLA:
  - Visualização, navegação de frames e controles de FPS customizado.
- Adicionados helpers de detecção automática:
  - **Detect Cameras**
  - **Detect Actions**
  - **Detect NLA Strips**

---

## 0.2.0 (exemplo)

**Data de lançamento:** (preencher, ou remover se não aplicável)

**Mudanças:**
- Integração inicial de renderização baseada em NLA.
- Primeira versão de manipulação por câmera (sem recursos completos de rotação de pivot).
- Melhorias iniciais de relatório de progresso.

---

## 0.1.0 (exemplo)

**Data de lançamento:** (preencher, ou remover se não aplicável)

**Mudanças:**
- Primeira beta pública do Sprite Render Tool.
- Renderização básica de sprites baseada em Actions.
- Painel UI inicial no Sidebar do 3D Viewport.

---

## Como Manter Este Arquivo

Para cada nova versão:
- Atualize `bl_info["version"]` no código do add-on.
- Adicione uma nova seção no topo deste arquivo com:
  - Número da versão.
  - Data de lançamento.
  - Lista de mudanças principais (recursos, correções, mudanças de comportamento, mudanças de UI).

