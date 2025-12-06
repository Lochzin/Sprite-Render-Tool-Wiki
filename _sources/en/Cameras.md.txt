# Cameras

This page explains how to configure cameras inside the **Sprite Render Tool**. For information about lighting and the Light Pivot system, see [Lighting](Lighting.md).

---

## Camera Creation Presets

The **Camera Creation** panel provides a quick way to set up cameras using predefined presets:

- **8 Preset Configurations Available**:
  - 1 Camera - Front
  - 2 Cameras - Front, Back
  - 2 Cameras - Front, Right
  - 3 Cameras - Front, Left, Right
  - 3 Cameras - Front, Right, Back
  - 4 Cameras - Front, Right, Back, Left (Cardinal Directions)
  - 5 Cameras - Front, Front Right, Right, Back Right, Back
  - 8 Cameras - 360 Degrees (Evenly distributed)

**How it works:**
- Select a preset from the dropdown
- Adjust the `Distance` slider to set how far cameras are placed from the pivot point (or origin if no pivot is set)
- Click **Create Cameras** to generate cameras based on the preset
- Cameras are automatically positioned around the light pivot object (or scene origin) and oriented to point toward the center
- The addon automatically tracks and replaces cameras created by previous presets, preserving manually created cameras

**Benefits:**
- Quickly set up common camera arrangements without manual positioning
- Consistent camera angles and orientations
- Automatic light rotation calculation based on camera positions
- Clean workflow: configure lighting pivot first, then create cameras

---

## Lens Settings

The **Lens Settings** section in the **Cameras** panel provides synchronized controls for camera properties:

- **Camera Type**: Perspective or Orthographic projection
- **Focal Length / Orthographic Scale**: The label changes dynamically based on camera type
  - Shows "Focal Length" (in millimeters) when camera type is Perspective
  - Shows "Orthographic Scale" when camera type is Orthographic
  - The correct property is synchronized across all cameras
- **Resolution X / Y**: Render resolution synchronized across all cameras and applied to scene render settings
- **Shift X / Y**: Camera shift values
  - **Desync Shift X** and **Desync Shift Y**: Independent toggle buttons for horizontal and vertical shift synchronization
  - When button is **unpressed** (synced): all cameras share the same shift value for that axis
  - When button is **pressed** (desynced): each camera can have individual shift values for that axis (shown in the Camera List)
- **Clip Start / End**: Near and far clipping distances

All lens settings are automatically applied to cameras when:
- Cameras are created via presets
- Cameras are detected using the **Detect Cameras** button
- Settings are changed in the Lens Settings section

---

## Camera List

The camera system is backed by the `CameraItem` property group:
- `name`: camera object name in Blender.
- `output_name`: name used in the generated filenames (optional, when **Custom Output Names** is enabled).
- `light_rotation`: Euler rotation (XYZ) used to rotate the **light pivot**.
- `render_order`: the order in which each camera will be rendered.

In the **Cameras** panel you will see (in this order):
- **Lens Settings** section (always visible): synchronized camera properties
- **Camera Count**: how many cameras should exist in the list (always visible, positioned after Lens Settings)
- **Custom Output Names**: toggle to use custom output names instead of camera object names (always visible, positioned after Lens Settings)
- **Enable Full Rotation (XYZ)**: toggle to enable full XYZ rotation for light pivot (always visible, positioned after Lens Settings)
- **Camera List** section (collapsible): individual camera settings
  - Per‑camera subpanels (`Camera 1`, `Camera 2`, ...):
    - `Name`
    - `Output Name` (only visible when **Custom Output Names** is enabled)
    - `Shift X` / `Shift Y` (only visible when **Desync Shift X** or **Desync Shift Y** is enabled/pressed in Lens Settings, respectively)
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
- Computes an automatic Z rotation for `light_rotation` based on the relative position between the camera and the **light pivot** (if configured).
- Assigns `render_order` sequentially (0, 1, 2, ...).
- Applies lens settings (focal length, shift, resolution, etc.) from the Lens Settings section.

> **Important**: The **Light Pivot** object must be set in the **Light Pivot** section if you want automatic light rotation calculation; otherwise the operator will cancel with an error.

### Automatic Detection Limitations

**Detect Cameras** attempts to find the ideal light pivot rotation for each camera angle, but this **only works correctly for horizontal angles** (like in boomer shooter first-person games, where cameras are all on the same horizontal plane around the character).

For renders that need to be done at **different angles** (from above, diagonally, or in multiple planes), you will need to **manually adjust** the pivot rotation angle (`Light Rotation`) for each camera after using Detect Cameras.

For more information about light rotation and lighting setup, see [Lighting](Lighting.md).

---

## Light Rotation per Camera

Each camera has a `light_rotation` property (Euler rotation XYZ) that controls how the **light pivot** is rotated for that specific camera angle. This is configured in the camera's subpanel in the **Cameras** section.

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
- If a light pivot is set, it also applies the corresponding light rotation.

```python
Technical detail: Uses the shared apply_light_rotation helper
```

Use this to:
- Walk through all configured cameras.
- Confirm that framing and lighting are consistent before starting a full render batch.
- **Visualize light rotation**: Set viewport shading to **Rendered** mode to see the light pivot rotate in real-time as you cycle through cameras. This works for both Z-only and full XYZ rotation modes.

> **Tip**: For detailed information about lighting, the Light Pivot system, and how to visualize light rotation, see [Lighting](Lighting.md).


