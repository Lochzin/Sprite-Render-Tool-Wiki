# Iluminação

Esta página explica como o sistema **Light Pivot** funciona no **Sprite Render Tool** e como usá-lo para criar iluminação eficaz para suas renderizações de sprites.

---

## Visão Geral

O add-on usa um **light pivot** (geralmente um empty object) para controlar a direção da iluminação para cada câmera. Isso permite criar uma iluminação consistente que rotaciona com a câmera, o que é especialmente útil para **boomer shooters** e jogos com **visão 360 graus do personagem/objeto**.

Esta abordagem de iluminação padronizada ajuda a manter uma iluminação uniforme em todos os sprites, o que é particularmente importante ao trabalhar com **normal maps**, pois a iluminação consistente garante que os detalhes do normal map sejam adequadamente visíveis e consistentes em todos os ângulos da câmera durante o render final que será executado durante o jogo.

---

## Objeto Light Pivot

O **Light Pivot** é um objeto do Blender que atua como um ponto de controle para a rotação da iluminação. Você pode usar qualquer objeto do Blender como pivô, embora geralmente se use um **empty object** (objetos mesh também funcionam, mas empty objects são preferidos por sua simplicidade).

```python
Detalhes técnicos:
- O pivô é armazenado em SpriteRenderSettings.pivot_object
- Antes de renderizar cada frame, o operador chama:
  SPRITE_RENDER_OT_RenderAll.apply_light_rotation(...)
```

### Toggle Enable Light Pivot

O add-on inclui uma propriedade booleana `enable_light_pivot` para controlar a funcionalidade de pivô de luz:
- **Quando habilitado** (padrão: `True`): A rotação de luz é aplicada ao light pivot durante a renderização.
- **Quando desabilitado**: A rotação de luz é ignorada, mesmo se um light pivot estiver configurado.
- O campo de seleção do light pivot só é visível quando `enable_light_pivot` está habilitado.

Isso permite que você desabilite temporariamente a rotação de luz sem remover a configuração do light pivot.

---

## Rotação de Luz

Cada câmera no add-on tem uma propriedade `light_rotation` (rotação Euler XYZ) que controla como o light pivot é rotacionado para esse ângulo de câmera específico.

### Modos de Rotação

Dependendo de **Enable Full Rotation (XYZ)**:

- **Desabilitado** (padrão):
  - Apenas o eixo Z do pivô é alterado.
  - Ideal para **boomer shooters** e jogos com **visão 360 graus do personagem/objeto**, onde todas as câmeras estão no mesmo plano horizontal ao redor do personagem.
  - Bom para iluminação top-down / isométrica onde "ao redor do personagem" é suficiente.
  - Este é o caso de uso mais comum para renderização de sprites.

- **Habilitado**:
  - Euler XYZ completo é aplicado ao pivô.
  - Útil para **boomer shooters** mais complexos onde há **diferenças de níveis de altura** (múltiplos níveis verticais, escadas, plataformas, etc.).
  - Use isso para configurações de iluminação mais complexas que requerem rotação em múltiplos eixos.
  - Útil quando as câmeras estão posicionadas em diferentes ângulos verticais (de cima, de baixo, diagonal).

```python
Detalhes técnicos:
- Desabilitado: usa cam_item.light_rotation[2] (apenas eixo Z)
- Habilitado: aplica cam_item.light_rotation completo (XYZ)
```

### Rotação Automática de Luz

Ao usar o botão **Detect Cameras**, o add-on calcula automaticamente uma rotação Z para cada câmera baseada na posição relativa entre a câmera e o light pivot.

> **Importante**: O objeto **Light Pivot** deve ser definido na seção **Light Pivot** antes de usar o Detect Cameras; caso contrário, o operador cancelará com um erro.

#### Limitações da Detecção Automática

O **Detect Cameras** tenta encontrar a rotação ideal do pivô de luz para cada ângulo de câmera, mas isso **só funciona corretamente para ângulos horizontais** (como em jogos boomer shooter em primeira pessoa, onde as câmeras estão todas no mesmo plano horizontal ao redor do personagem).

Para renderizações que precisam ser feitas em **ângulos diferentes** (de cima, diagonalmente, ou em múltiplos planos), você precisará **ajustar manualmente** o ângulo de rotação do pivô (`Light Rotation`) para cada câmera após usar o Detect Cameras.

---

## Visualizando a Rotação de Luz

Você pode ver visualmente a rotação do pivô de luz em tempo real usando o botão **Test Cameras**:

**Como usar:**
1. Configure suas luzes e o objeto light pivot
2. Defina o shading do 3D Viewport para o modo **Rendered** (pressione `Z` e selecione "Rendered" ou use o dropdown de shading do viewport)
3. Clique no botão **Test Cameras** para percorrer as câmeras
4. Ao alternar entre câmeras, você verá o pivô de luz rotacionar em tempo real no viewport

**O que você verá:**
- No **modo de rotação apenas Z**: O pivô rotaciona ao redor do eixo Z ao alternar câmeras
- No **modo de rotação completa XYZ**: O pivô rotaciona nos três eixos de acordo com os valores `light_rotation` de cada câmera
- Luzes que são filhos do pivô rotacionarão junto com ele, mostrando exatamente como a iluminação ficará de cada ângulo de câmera

Este feedback visual facilita:
- Verificar se os valores de rotação estão corretos para cada câmera
- Ajustar valores de `Light Rotation` enquanto vê os resultados imediatamente
- Ajustar finamente a iluminação para câmeras em diferentes ângulos (não apenas horizontais)

---

## 💡 Estratégia Avançada de Iluminação

Você pode usar o **Light Pivot** estrategicamente para criar um sistema de iluminação mais completo:

### Luzes Dentro do Pivô

Coloque luzes como **filhos do light pivot** (ou agrupe-as com o light pivot). Essas luzes **irão rotacionar** junto com as câmeras ao redor do personagem, criando uma iluminação consistente que segue o ponto de vista da câmera.

**Use isso para:**
- Luzes principais (key lights) que devem seguir o ângulo da câmera.
- Iluminação direcional que precisa rotacionar com cada posição da câmera.
- Iluminação primária consistente em todos os ângulos da câmera.
- **Highlights e rim lights**: Se você quiser highlights que funcionem de forma semelhante em todos os ângulos, coloque-os dentro do pivot. Highlights colocados fora do pivot podem ficar muito fortes e estourados quando a câmera se move para trás da posição original.

### Luzes Fora do Pivô

Adicione luzes adicionais que **não** sejam filhos do pivô. Essas luzes permanecerão fixas e podem ser usadas para:

- **Iluminar áreas escuras**: Iluminar áreas naturalmente escuras do personagem ou objeto (como a parte inferior, costas, ou áreas de sombra).
- **Iluminação ambiente/fill**: Criar iluminação ambiente ou fill lights que não mudam com a rotação da câmera.

### Combinando Ambas as Abordagens

Esta combinação permite criar uma iluminação mais rica e controlada:
- A **luz principal** (dentro do pivô) rotaciona com a câmera, fornecendo iluminação primária consistente.
- **Luzes auxiliares** (fora do pivô) preenchem áreas que precisam de iluminação adicional e permanecem constantes.

Isso é especialmente útil para:
- Personagens com geometria complexa que têm áreas que estão sempre em sombra.
- Criar iluminação mais realista com múltiplas fontes de luz.

---

## Dicas de Fluxo de Trabalho

1. **Comece simples**: Comece com uma única luz como filho do light pivot para entender o comportamento básico de rotação.

2. **Adicione fill lights**: Uma vez que a iluminação principal esteja funcionando, adicione luzes fixas fora do pivô para preencher áreas escuras.

3. **Teste com Test Cameras**: Use o botão **Test Cameras** para percorrer as câmeras e verificar se a iluminação está correta em cada ângulo.

4. **Ajuste manualmente**: Para câmeras em ângulos não horizontais, ajuste manualmente os valores de `Light Rotation` após usar o Detect Cameras.

5. **Visualize a rotação**: Defina o shading do viewport para o modo **Rendered** e use o botão **Test Cameras** para ver a rotação do pivô de luz em tempo real ao percorrer as câmeras.

---

## Tópicos Relacionados

- Veja [Câmeras](Cameras.md) para informações sobre configuração de câmeras e como a rotação de luz é configurada por câmera.


