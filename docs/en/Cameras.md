# Cameras — Setup and Workflow

This page explains how to configure cameras inside the **Sprite Render Tool** and how light rotation is driven from them.

---

## Camera List

The camera system is backed by the `CameraItem` property group:
- `name`: camera object name in Blender.
- `output_name`: name used in the generated filenames (optional, when **Custom Output Names** is enabled).
- `light_rotation`: Euler rotation (XYZ) used to rotate the **pivot object**.
- `render_order`: the order in which each camera will be rendered.

In the **Cameras** section of the main panel you will see:
- `Camera Count`: how many cameras should exist in the list.
- Per‑camera subpanels (`Camera 1`, `Camera 2`, ...):
  - `Name`
  - `Output Name` (only visible when **Custom Output Names** is enabled)
  - `Render Order`
  - `Light Rotation`:
    - either a single Z value, or a full XYZ rotation, depending on **Enable Full Rotation (XYZ)**.

When you change `Camera Count`, the list of `CameraItem` entries is automatically grown or shrunk to match.

---

## Detecting Cameras Automatically

The **Detect Cameras** button (`sprite_render.autofill_light_rotation`) scans the current **View Layer** for active cameras and fills the add‑on camera list:
- Only cameras that are:
  - of type `CAMERA`
  - not hidden in viewport
  - not hidden for render
are considered.

For each detected camera it:
- Sets `name` and `output_name` to the Blender camera name.
- Computes an automatic Z rotation for `light_rotation` based on the relative position between the camera and the **pivot object**.
- Assigns `render_order` sequentially (0, 1, 2, ...).

> **Important**: the **Pivot Object** must be set in the **Light Pivot** section; otherwise the operator will cancel with an error.

### Automatic Detection Limitations

**Detect Cameras** attempts to find the ideal light pivot rotation for each camera angle, but this **only works correctly for horizontal angles** (like in boomer shooter first-person games, where cameras are all on the same horizontal plane around the character).

For renders that need to be done at **different angles** (from above, diagonally, or in multiple planes), you will need to **manually adjust** the pivot rotation angle (`Light Rotation`) for each camera after using Detect Cameras.

> **Note**: A visual debug tool will be added in the future to help visualize and adjust these pivot rotation angles.

---

## Light Pivot and Light Rotation

The add‑on uses a **pivot object** (any Blender object) to drive lighting direction for each camera:
- The pivot is stored in `SpriteRenderSettings.pivot_object`.
- Before rendering each frame for a given camera, the operator calls:
  - `SPRITE_RENDER_OT_RenderAll.apply_light_rotation(...)`

Depending on **Enable Full Rotation (XYZ)**:
- **Disabled** (default):
  - Only the Z axis of the pivot is changed, using `cam_item.light_rotation[2]`.
  - Good for top‑down / isometric lighting where “around the character” is enough.
- **Enabled**:
  - Full Euler XYZ from `cam_item.light_rotation` is applied to the pivot.
  - Use this for more complex lighting setups.

When **Light Rotation Debug** is enabled in the **Debug** section:
- The operator logs before‑and‑after pivot rotation (in degrees) to the Blender console for the first camera, so you can verify the values being applied.

### 💡 Lighting Tip

You can use the **Light Pivot** strategically to create a more complete lighting system:

- **Lights inside the pivot**: Place lights as children of the pivot object (or group them with the pivot). These lights **will rotate** along with the cameras around the character, creating consistent lighting that follows the camera's point of view.

- **Lights outside the pivot**: Add additional lights that are **not** children of the pivot. These lights will remain fixed and can be used to:
  - Illuminate naturally dark areas of the character or object (such as the underside, back, or shadow areas).
  - Create ambient or fill lighting that doesn't change with camera rotation.
  - Add static highlights or rim lights.

This combination allows you to create richer, more controlled lighting, where the main light rotates with the camera while auxiliary lights fill areas that need additional illumination.

---

## Render Order

Each camera has a `Render Order` integer:
- Cameras are sorted by `render_order` before any rendering happens.
- Both the synchronous (`execute`) and asynchronous (`invoke` + timer) render paths use this ordering.

Use this to:
- Make sure front / side / back cameras always render in a consistent sequence.
- Control how progress is reported and how your folders get filled over time.

---

## Custom Output Names vs Camera Names

You can choose whether filenames refer to:
- The actual **camera object name** in Blender, or
- A **custom output name** (for example `front`, `side`, `back`, `iso_NE`, etc.).

In **Cameras**:
- Enable **Custom Output Names** to use `output_name` instead of `name` when building paths.
- The add‑on uses:
  - `cam_item.output_name` when custom names are enabled and not empty.
  - Otherwise, `cam_item.name`.

This value is then passed into the `$camera` placeholder in the `output_template` when building filenames.

---

## Testing Cameras

The **Test Cameras** button (`sprite_render.test_cameras`) helps you quickly preview your camera setup:
- It finds the current scene camera in the add‑on list.
- Selects the **next** camera in the list (cyclically).
- Sets the scene camera to that object and switches the 3D Viewport to camera view.
- If a pivot is set, it also applies the corresponding light rotation using the shared `apply_light_rotation` helper.

Use this to:
- Walk through all configured cameras.
- Confirm that framing and lighting are consistent before starting a full render batch.


