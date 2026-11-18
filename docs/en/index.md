# Sprite Render Tool — Official Wiki

Add-on for **Blender** focused on generating 2D sprites from 3D animations, with **multi‑camera support**, **automatic animation detection** (Actions and NLA), and **highly customizable file naming**, ideal for 2D games and sprite pipelines.

---

## Overview

**Sprite Render Tool** is an add-on that:
- **Renders animations as sprites**: iterates over frames of Actions or NLA strips and saves each frame as an image.
- **Supports multiple cameras**: you define a list of cameras, render order, and optional custom output names.
- **Controls lighting via a pivot**: uses a pivot object to rotate the “light” relative to the camera (great for isometric/top‑down sprites).
- **Generates organized output folders**: structures directories by project, object, animation, and camera.
- **Provides an animation test panel**: preview Actions or NLA directly from the add-on.
- **Shows progress and allows cancelling**: integrated progress bar, cancel button, and ESC key support while rendering.
- **Checks your setup before rendering**: a checklist with one-click **Fix** buttons and a confirmation dialog with image count and estimated time.
- **Restores your scene**: Actions, NLA, timeline, resolution, camera and light are put back when the render ends.
- **Portuguese interface**: panels and tooltips are translated when Blender is set to Portuguese.

It works with Blender **5.0.0+**.

---

## Installation

For detailed installation, update, and troubleshooting instructions, see the dedicated page: **[Installation](Installation.md)**.

**Quick summary:**
- **Add-on file**: `Sprite Render Tool.zip`
- **Compatibility**: Blender 5.0.0 or newer
- **Location**: `Edit > Preferences... > Add-ons` → Click dropdown arrow (▼) → **Install from disk...** → Select ZIP file → Enable the add-on
- **Panel**: `View3D > Sidebar (N) > Sprite Render > Sprite Render`

---

## Main Panel (UI)

The add-on lives in `3D Viewport > Sidebar (N) > Sprite Render`. It is **one main panel with sub-panels**, listed in workflow order (there are no tabs). Each sub-panel with a help icon (?) in its header opens the matching page of this wiki (always in English).

| Order | Panel | Purpose |
| --- | --- | --- |
| – | **Sprite Render** (main) | Render All, progress, Start Here guide |
| 1 | **1. Project & Output** | names, output folder, file name template, folders |
| 2 | **2. Character & Animations** | animation mode, armature, animation lists, preview |
| 3 | **3. Cameras** | create / detect cameras, lens, camera list |
| 4 | **4. Light** | Light Pivot |
| 5 | **5. Render Settings** | checklist, resolution, Frame Step, Test Cameras |
| – | **Info** (closed by default) | version, author, documentation |

### Sprite Render (main panel)

- **Render All**: starts the render. It is greyed out while the checklist has errors (the tooltip shows the first one). It opens a confirmation dialog first (see [Render](Render.md)).
- **While rendering**: the button is replaced by Blender's progress bar (`Rendering current/total (percent%)`), a status line (animation, frame, camera and estimated time left) and a red **Cancel Render** button. This is visible whichever sub-panel is open. **ESC** also cancels.
- **Start Here** (only until cameras and animations exist, and never while rendering):
  1. **Cameras**: **Create** (creates the camera preset) and **Detect** (adds the visible cameras of the scene). Shown with a check mark when the list has cameras.
  2. **Animations**: **Detect Actions**, **Detect NLA Strips** or **Add Frame Range**, depending on the Animation Mode. In **STATIC** mode this step is always done.
  3. Set the output path (Project & Output).
  4. Press Render All.

### 1. Project & Output

- `Project Name`, `Object Name`
- `Output Folder` (default `//sprites/`) and a button next to it that opens a folder in the file explorer. Leave the field empty to use the scene's Output Path (legacy behavior)
- `Output Name` template (default `$objectName_$animation_$frame`), buttons to append `projectName`, `objectName`, `animation`, `camera`, `frame`, and the template presets **Default** and **Per camera**
- **First image will be saved as:** the real path of the first image, with template warnings and name collisions
- **Available Placeholders** (collapsible): variables and a name preview
- **Create Folders**: `Project`, `Object`, `Animation`, `Camera`

See [Output](Output.md).

### 2. Character & Animations

- `Animation Mode`: **Use Actions** (default), **Use NLA**, **Static Render**, **Frame Ranges**
- `Armature`: the target armature (Actions and NLA modes only)
- The list of the current mode, with `+` / `-` buttons, the fields of the selected item, **Enable All** / **Disable All** and the **Detect** button
- `Preview FPS` + **Apply**
- **Animation Test** (collapsible, Actions and NLA modes): **Preview Action** / **Preview NLA Strip**, **Stop Preview** (or **Restore Scene** when playback already stopped), frame counter and first / previous / next / last buttons

See [Animations](Animations.md).

### 3. Cameras

- **Create Cameras** box: `Preset`, `Cameras` (only for the Custom preset), `Elevation`, `Target Height`, `Distance`, **Create Cameras**
- **Detect Cameras**
- **Lens Settings**: `Type`, `Focal Length` / `Orthographic Scale`, **Desync Shift X / Y**, `Shift X` / `Y`, `Clip Start` / `End`
- `Custom Output Names`
- **Cameras (render order)**: the list with `+`, `-`, move up / down and a "view through camera" icon per row; the selected camera has `Camera`, `Output Name` (when Custom Output Names is on), per-camera Shift (when desynced) and `Light Rotation`

See [Cameras](Cameras.md).

### 4. Light

`Enable Light Pivot`, `Object` (the pivot, shown when enabled) and `Enable Full Rotation (XYZ)`. See [Lighting](Lighting.md).

### 5. Render Settings

- **Checklist** ("Ready to render?"): problems with **Fix** buttons and the image / time summary
- **Resolution** X / Y
- **Frame Step**: `Enable Frame Step`, `Step`, **Test Frame Count**
- **Test Cameras**

See [Render](Render.md).

### Info

Version (read from the add-on), author, **Open Documentation**, **Changelog**, **Future Features** and **License**.

### Language

If Blender's language is Portuguese (Brazil or Portugal), the panels, tooltips and messages are shown in Portuguese. Any other language shows English.

---

## Basic Guide

- **1. Prepare the scene**
  - Set up your character / armature and its Actions or NLA strips.
  - Optionally create a **Light Pivot** (an Empty) and put your lights inside it.
  - Save the .blend file if you want to use a `//` relative output folder.

- **2. Follow Start Here (main panel)**
  - **Create** a camera preset (or **Detect** the cameras you already have).
  - **Detect Actions** / **Detect NLA Strips** (or add frame ranges). In Actions and NLA modes set the `Armature` in **2. Character & Animations**.

- **3. Project & Output**
  - Set `Project Name`, `Object Name` and the `Output Folder`.
  - Adjust the `Output Name` and the `Create Folders` options. Check "First image will be saved as:".

- **4. Cameras and Light** (optional adjustments)
  - Reorder cameras, set `Output Name`s, `Elevation`, lens and shift.
  - Enable the Light Pivot and set the pivot object.

- **5. Render Settings**
  - Read the checklist and use the **Fix** buttons. Set the resolution and, if needed, Frame Step.
  - Use **Test Cameras** and the **Animation Test** to check framing and animation.

- **6. Render**
  - Click **Render All**, check the summary dialog and click **Render**.
  - Watch the progress in the main panel. Press **ESC** or **Cancel Render** to stop (after the current frame).
  - When it ends, your scene is put back as it was (see [Render](Render.md)).

---

## Generated File Structure

- **Base folder**: the `Output Folder` (or, when empty, the folder part of the scene Output Path).
- **Optional folder levels**: `Project`, `Object`, `Animation`, `Camera`.
- **File name**: built from `Output Name`:
  - replaces `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`;
  - invalid characters are replaced by `_` in file **and** folder names;
  - always `.png`.

If **`$camera` is not present** in the template, the add-on uses a per-animation sequential counter (instead of the timeline frame number) to avoid file name conflicts between cameras.

---

## License and Commercial Terms (Summary)

Based on `LICENSE.md`:
- **GPL compliance**: the code follows the legal requirements imposed by the Blender API.
- **Commercial distribution terms**:
  - A purchase grants usage rights (personal or professional) and access to **updates** and **official support**.
  - Third‑party redistributions, even if allowed under GPL, **do not include support or guaranteed updates**.
  - Sharing the purchased download violates the purchase agreement.

For full details, see the dedicated page: **[License](License.md)**.

---

## Support and Community

- **Community Discussions**: Join discussions, ask questions, and share tips with other users on [GitHub Discussions](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/discussions)
- **Report Issues**: Found a bug or have a technical issue? Report it on [GitHub Issues](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/issues)
- **FAQ**: Check the [FAQ](FAQ.md) page for common questions and solutions

