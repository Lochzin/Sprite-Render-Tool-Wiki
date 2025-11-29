# Cameras — Setup and Workflow

This page explains how to configure cameras inside the **Sprite Render Tool**. For information about lighting and the Light Pivot system, see [Lighting](Lighting.md).

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
- Computes an automatic Z rotation for `light_rotation` based on the relative position between the camera and the **pivot object** (if configured).
- Assigns `render_order` sequentially (0, 1, 2, ...).

> **Important**: The **Pivot Object** must be set in the **Light Pivot** section if you want automatic light rotation calculation; otherwise the operator will cancel with an error.

### Automatic Detection Limitations

**Detect Cameras** attempts to find the ideal light pivot rotation for each camera angle, but this **only works correctly for horizontal angles** (like in boomer shooter first-person games, where cameras are all on the same horizontal plane around the character).

For renders that need to be done at **different angles** (from above, diagonally, or in multiple planes), you will need to **manually adjust** the pivot rotation angle (`Light Rotation`) for each camera after using Detect Cameras.

For more information about light rotation and lighting setup, see [Lighting](Lighting.md).

---

## Light Rotation per Camera

Each camera has a `light_rotation` property (Euler rotation XYZ) that controls how the **Light Pivot** object is rotated for that specific camera angle. This is configured in the camera's subpanel in the **Cameras** section.

For detailed information about the Light Pivot system, lighting strategies, and how to use light rotation effectively, see the [Lighting](Lighting.md) page.

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

> **Tip**: For detailed information about lighting and the Light Pivot system, see [Lighting](Lighting.md).


