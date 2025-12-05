# Lighting

This page explains how the **Light Pivot** system works in the **Sprite Render Tool** and how to use it to create effective lighting for your sprite renders.

---

## Overview

The add-on uses a **light pivot** (typically an empty object) to drive lighting direction for each camera. This allows you to create consistent lighting that rotates with the camera, which is especially useful for **boomer shooters** and games with **360-degree character/object views**. 

This standardized lighting approach helps maintain uniform illumination across all sprites, which is particularly important when working with **normal maps**, as consistent lighting ensures that normal map details are properly visible and consistent across all camera angles during the final render that will be executed during gameplay.

---

## Light Pivot Object

The **Light Pivot** is a Blender object that acts as a control point for lighting rotation. You can use any Blender object as the pivot, though typically an **empty object** is used (mesh objects can also work, but empty objects are preferred for their simplicity).

```python
Technical details:
- The pivot is stored in SpriteRenderSettings.pivot_object
- Before rendering each frame, the operator calls:
  SPRITE_RENDER_OT_RenderAll.apply_light_rotation(...)
```

### Enable Light Pivot Toggle

The add-on includes an `enable_light_pivot` boolean property to control the light pivot feature:
- **When enabled** (default: `True`): Light rotation is applied to the light pivot during rendering.
- **When disabled**: Light rotation is ignored, even if a light pivot is configured.
- The light pivot selection field is only visible when `enable_light_pivot` is enabled.

This allows you to temporarily disable light rotation without removing the light pivot configuration.

---

## Light Rotation

Each camera in the add-on has a `light_rotation` property (Euler rotation XYZ) that controls how the light pivot is rotated for that specific camera angle.

### Rotation Modes

Depending on **Enable Full Rotation (XYZ)**:

- **Disabled** (default):
  - Only the Z axis of the pivot is changed.
  - Ideal for **boomer shooters** and games with **360-degree character/object views**, where all cameras are on the same horizontal plane around the character.
  - Good for top-down / isometric lighting where "around the character" is enough.
  - This is the most common use case for sprite rendering.

- **Enabled**:
  - Full Euler XYZ rotation is applied to the pivot.
  - Useful for more complex **boomer shooters** where there are **height level differences** (multiple vertical levels, stairs, platforms, etc.).
  - Use this for more complex lighting setups that require rotation in multiple axes.
  - Useful when cameras are positioned at different vertical angles (above, below, diagonal).

```python
Technical details:
- Disabled: uses cam_item.light_rotation[2] (Z axis only)
- Enabled: applies full cam_item.light_rotation (XYZ)
```

### Automatic Light Rotation

When using the **Detect Cameras** button, the add-on automatically calculates a Z rotation for each camera based on the relative position between the camera and the light pivot.

> **Important**: The **Light Pivot** object must be set in the **Light Pivot** section before using Detect Cameras; otherwise the operator will cancel with an error.

#### Automatic Detection Limitations

**Detect Cameras** attempts to find the ideal light pivot rotation for each camera angle, but this **only works correctly for horizontal angles** (like in boomer shooter first-person games, where cameras are all on the same horizontal plane around the character).

For renders that need to be done at **different angles** (from above, diagonally, or in multiple planes), you will need to **manually adjust** the pivot rotation angle (`Light Rotation`) for each camera after using Detect Cameras.

---

## Visualizing Light Rotation

You can visually see the light pivot rotation in real-time using the **Test Cameras** button:

**How to use:**
1. Set up your lights and light pivot object
2. Set the 3D Viewport shading to **Rendered** mode (press `Z` and select "Rendered" or use the viewport shading dropdown)
3. Click the **Test Cameras** button to cycle through cameras
4. As you switch between cameras, you will see the light pivot rotate in real-time in the viewport

**What you'll see:**
- In **Z-only rotation mode**: The pivot rotates around the Z axis as you switch cameras
- In **Full XYZ rotation mode**: The pivot rotates in all three axes according to each camera's `light_rotation` values
- Lights that are children of the pivot will rotate along with it, showing you exactly how the lighting will look from each camera angle

This visual feedback makes it easy to:
- Verify that rotation values are correct for each camera
- Adjust `Light Rotation` values while seeing the results immediately
- Fine-tune lighting for cameras at different angles (not just horizontal)

---

## 💡 Advanced Lighting Strategy

You can use the **Light Pivot** strategically to create a more complete lighting system:

### Lights Inside the Pivot

Place lights as **children of the light pivot** (or group them with the light pivot). These lights **will rotate** along with the cameras around the character, creating consistent lighting that follows the camera's point of view.

**Use this for:**
- Main key lights that should follow the camera angle.
- Directional lighting that needs to rotate with each camera position.
- Consistent primary illumination across all camera angles.
- **Highlights and rim lights**: If you want highlights that work similarly across all angles, place them inside the pivot. Highlights placed outside the pivot can become too strong and overexposed when the camera moves behind the original position.

### Lights Outside the Pivot

Add additional lights that are **not** children of the pivot. These lights will remain fixed and can be used to:

- **Illuminate dark areas**: Light naturally dark areas of the character or object (such as the underside, back, or shadow areas).
- **Ambient/fill lighting**: Create ambient or fill lighting that doesn't change with camera rotation.

### Combining Both Approaches

This combination allows you to create richer, more controlled lighting:
- The **main light** (inside the pivot) rotates with the camera, providing consistent primary illumination.
- **Auxiliary lights** (outside the pivot) fill areas that need additional illumination and remain constant.

This is especially useful for:
- Characters with complex geometry that have areas that are always in shadow.
- Creating more realistic lighting with multiple light sources.

---

## Workflow Tips

1. **Start simple**: Begin with a single light as a child of the light pivot to understand the basic rotation behavior.

2. **Add fill lights**: Once the main lighting is working, add fixed lights outside the pivot to fill dark areas.

3. **Test with Test Cameras**: Use the **Test Cameras** button to cycle through cameras and verify that lighting looks correct from each angle.

4. **Adjust manually**: For cameras at non-horizontal angles, manually adjust the `Light Rotation` values after using Detect Cameras.

5. **Visualize rotation**: Set viewport shading to **Rendered** mode and use the **Test Cameras** button to see the light pivot rotation in real-time as you cycle through cameras.

---

## Related Topics

- See [Cameras](Cameras.md) for information about camera setup and how light rotation is configured per camera.

