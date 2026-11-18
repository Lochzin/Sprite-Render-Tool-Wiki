# Cameras

This page explains how to configure cameras inside the **Sprite Render Tool**. For information about lighting and the Light Pivot system, see [Lighting](Lighting.md).

Everything on this page is in the **Cameras** tab, except the resolution, which is in the **Render** tab.

![Cameras tab: Create Cameras, Lens Settings and camera list](/_static/images/SRT_CameraTab.png)

---

## Camera Creation Presets

> **Location in add-on**: **Cameras** tab → **Create Cameras** box

The **Create Cameras** box creates cameras from a preset:

- **Preset** options:
  - 1 Camera - Front
  - 2 Cameras - Front, Back
  - 2 Cameras - Front, Right
  - 3 Cameras - Front, Left, Right
  - 3 Cameras - Front, Right, Back
  - 4 Cameras - Front, Right, Back, Left (Cardinal Directions)
  - 5 Cameras - Front, Front Right, Right, Back Right, Back (default)
  - 8 Cameras - 360 Degrees (evenly distributed)
  - **Custom - N cameras in 360 Degrees**: N cameras evenly spaced around the target, starting at the front. The `Cameras` field (default 8) appears only for this preset. The cameras are named `Camera_000`, `Camera_045`, ... (the angle in degrees)
- `Elevation`: angle of the cameras above the horizontal plane (-89° to 89°, default 0°). **0° = level**; **30-45° gives a 3/4 or isometric-style view**. The distance to the target stays the same
- `Target Height`: height above the pivot (or the origin) that the cameras look at (default 0)
- `Rotation Offset`: rotates the whole camera ring around the pivot (default 0°). Use it when the character is rotated, so the `front` camera looks at the character's front
- `Elevation`, `Target Height`, `Distance` and `Rotation Offset` move the cameras created by **Create Cameras** in real time, no need to create them again
- `Distance`: distance from the pivot (or the origin) to the cameras (default 10)

**How it works:**
- The reference point is the **Light Pivot object** (if one is set) or the scene origin (0, 0, 0). The cameras look at the reference point raised by `Target Height`
- Cameras are created in the active collection, with the lens settings of the **Lens Settings** box
- The camera list of the add-on is replaced by the new cameras, ordered by angle starting at the front. Each camera gets its light rotation automatically (see below)
- The add-on remembers which cameras it created (they are marked internally). The next time you click **Create Cameras**, **only those cameras are deleted and recreated**, and Blender asks you to confirm first ("Replace cameras?"). Cameras you made yourself are never deleted

> **Name conflicts**: preset cameras are named `Camera_Front`, `Camera_Right`, `Camera_Back`, `Camera_Left`, `Camera_FrontRight`, `Camera_BackRight`, `Camera_BackLeft` and `Camera_FrontLeft`. If your scene already has an object with one of these names, **it is left untouched** and Blender names the new camera with a suffix (for example `Camera_Front.001`). The list and the file names use the real name of the new camera.

![Create Cameras box with preset, elevation, target height and distance](/_static/images/SRT_CreateCameras.png)

![Five cameras created around the character with the 5-camera preset](/_static/images/SRT_Scene_Cameras.png)

---

## Lens Settings

> **Location in add-on**: **Cameras** tab → **Lens Settings** box

Synchronized controls for all cameras of the list:

- **Type**: Perspective or Orthographic
- **Focal Length** (Perspective, in mm) or **Orthographic Scale** (Orthographic): the label follows the camera type
- **Shift X / Y**: camera shift
  - **Desync Shift X** and **Desync Shift Y** are independent toggle buttons
  - **Unpressed** (default): all cameras share the shift value of that axis
  - **Pressed**: each camera keeps its own value for that axis, edited in the camera list
  - A message below shows "All cameras are synchronized" or which axes are set per camera
- **Clip Start / End**: near and far clipping distances

The values are applied to every camera of the list when you change them, when you click **Create Cameras** and when you click **Detect Cameras**. At the start of each camera's images, the render applies the shift again (shared or individual).

![Lens Settings Expanded](/_static/images/SRT_LensSettings_Expanded.png)

The **resolution** (`Resolution X / Y`) is in the **Render** tab; see [Render](Render.md).

---

## Camera List

> **Location in add-on**: **Cameras** tab → **Cameras (render order)** box

Below the **Custom Output Names** toggle you find the list of cameras:

- `+` adds the **selected camera objects** of the scene (or the active one) to the list
- `-` removes the selected row from the list (the camera object is **not** deleted)
- **Up / down arrows** move the selected row. **The order of the list is the render order**
- The **camera icon** of each row makes that camera the scene camera, switches the 3D Viewport to camera view and, if the Light Pivot is enabled and set, rotates the pivot for that camera. Rows whose camera object does not exist are highlighted with an error icon

The selected row shows:
- `Camera`: the camera object (searchable field)
- `Output Name`: name used in files and folders (only when **Custom Output Names** is on)
- `Shift X` / `Y`: individual shift (only for the axes with **Desync Shift** pressed)
- `Light Rotation Z` or `Light Rotation (XYZ)`: the rotation given to the Light Pivot for this camera (XYZ when **Enable Full Rotation (XYZ)** in the **Light Pivot** section of the **Setup** tab is on)

> The render checks the list before it starts: blank or missing cameras are an error in the checklist (with a **Remove them** button). See [Render](Render.md).

![Camera List Expanded](/_static/images/SRT_CameraList_Expanded.png)

---

## Detecting Cameras Automatically

> **Location in add-on**: **Cameras** tab → **Detect Cameras** button

**Detect Cameras** (`sprite_render.autofill_light_rotation`) **adds** the cameras of the scene to the list. It never replaces what you already have:

- Only cameras that belong to the current **View Layer** and are not hidden in the viewport, not disabled in the viewport and not disabled for render are considered
- Cameras already in the list **keep their position in the list, `Output Name` and individual shift**. New cameras are added at the end, with `Output Name` equal to the camera name and the current shift of the camera
- Entries whose camera object no longer exists are removed
- The **light rotation of every detected camera is recalculated** (Z only, from the camera and the pivot position). A light rotation you typed by hand is lost, so adjust it after detecting
- With `Enable Light Pivot` off, the light rotation is set to 0
- The lens settings and shift of the **Lens Settings** box are applied to every camera
- A message reports how many cameras were added and how many are in the list

> **Important**: a **Light Pivot** object is **only required when `Enable Light Pivot` is on**. If it is on and no object is set, the operator cancels with "Light pivot object is not set". If no camera qualifies, it shows a warning and leaves the list unchanged.

### Automatic Detection Limitations

The light rotation calculated by **Detect Cameras** and **Create Cameras** is a **rotation around Z only**: the light looks in the same direction as the camera, seen from above. It works well for cameras around the character on a horizontal plane. For cameras that look from above or from several heights (for example with `Elevation`), turn on **Enable Full Rotation (XYZ)** and **adjust `Light Rotation` manually**.

For more information about light rotation and lighting setup, see [Lighting](Lighting.md).

---

## Light Rotation per Camera

Each camera has a `Light Rotation` that controls how the **Light Pivot** is rotated for that camera. For the same camera position, **Create Cameras** and **Detect Cameras** give the same value (the light looks along the direction from the camera to the pivot, or to the origin when there is no pivot). A camera on the front axis gets 0°.

For detailed information about the Light Pivot system and lighting strategies, see [Lighting](Lighting.md).

---

## Render Order

The order of the **Cameras (render order)** list is the order in which cameras are rendered: for each animation, the first camera of the list first. Moving a row or running **Detect Cameras** renumbers the order (0, 1, 2, ...).

Use this to:
- Make sure front / side / back cameras always render in a consistent sequence.
- Control how your folders get filled and how progress is reported.

---

## Custom Output Names vs Camera Names

You can choose whether file and folder names use:
- The **camera object name** in Blender (default), or
- A **custom output name** (for example `front`, `side`, `back`, `iso_NE`).

Turn on **Custom Output Names** (below the lens settings) and fill `Output Name` in each camera of the list. This value is used by the `$camera` placeholder and by the **Camera Folder**. Characters that are invalid in file names are replaced by `_`.

---

## Testing Cameras

The **Test Cameras** button (`sprite_render.test_cameras`, in the **Render** tab) helps you preview your camera setup:
- It finds the current scene camera in the add-on list.
- Selects the **next** camera in the list (cyclically) and makes it the scene camera.
- Switches the 3D Viewport to camera view.
- If the Light Pivot is enabled and set, it also applies the corresponding light rotation.

Use this to:
- Walk through all configured cameras.
- Confirm that framing and lighting are consistent before starting a full render batch.
- **Visualize light rotation**: set viewport shading to **Rendered** to see the pivot rotate as you cycle through cameras (both Z-only and XYZ modes).

> **Tip**: the camera icon of each row in the camera list does the same for one specific camera. For lighting details see [Lighting](Lighting.md).
