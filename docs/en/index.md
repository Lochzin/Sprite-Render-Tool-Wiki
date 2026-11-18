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

The add-on lives in `3D Viewport > Sidebar (N) > Sprite Render`. It is **one main panel** with two parts:

- **At the top**: the **Render All** button. While a render is running it is replaced by the progress bar, the status line and **Cancel Render**. This part is visible in every tab.
- **Below**: a column of **icon-only side buttons** (the tabs) on the left, and the content of the selected tab on the right. The selected tab is highlighted, and each button shows a tooltip when you hover over it. The tab that is open by default is **Setup**.

| Icon | Tab | Content |
| --- | --- | --- |
| Info (i) | **Info** | version, author, documentation links |
| Gear | **Setup** | **Project & Output**, **Light Pivot** and **Armature** sections |
| Camera | **Cameras** | create / detect cameras, lens settings, camera list |
| Armature | **Animations** | animation mode, animation lists, preview |
| Render still | **Render** | **Render Settings** section: checklist, resolution, Frame Step, Test Cameras |

The tabs, from top to bottom, are: Info, Setup, Cameras, Animations, Render. The sections that have a small help icon (?) in their header (Project & Output, Light Pivot, Cameras, Animations, Render Settings) open the matching page of this wiki (always in English).

![Sidebar](/_static/images/SRT_Sidebar.png)

### Render All and progress (top of the panel)

- **Render All**: starts the render. It is greyed out while the checklist has errors (the tooltip shows the first one). It opens a confirmation dialog first (see [Render](Render.md)).
- **While rendering**: the button is replaced by Blender's progress bar (`Rendering current/total (percent%)`), a status line (animation, frame, camera and estimated time left) and a red **Cancel Render** button. **ESC** also cancels.

### Info tab

Version (read from the add-on), author, **Open Documentation**, **Changelog**, **Future Features** and **License**.

![Info tab](/_static/images/SRT_InfoTab.png)

### Setup tab

- **Project & Output** section:
  - `Project Name`, `Object Name`
  - `Output Folder` (default `//sprites/`) and a button next to it that opens a folder in the file explorer. Leave the field empty to use the scene's Output Path (legacy behavior)
  - `Output Name` template (default `$objectName_$animation_$frame`), buttons that append `projectName`, `objectName`, `animation`, `camera`, `frame`, and the template presets **Default** and **Per camera**
  - **First image will be saved as:** the real path of the first image, with template warnings and name collisions
  - **Available Placeholders** (collapsible): variables and a name preview
  - **Create Folders**: `Project`, `Object`, `Animation`, `Camera`, plus `Clean Action Names` and `Restart Frame Numbering Per Camera` (both off by default)
- **Light Pivot** section: `Enable Light Pivot`, `Object` (the pivot, shown when enabled) and `Enable Full Rotation (XYZ)`
- **Armature** section: `Armature`, the target armature. It is the same setting as the `Armature` field of the Animations tab

See [Output](Output.md) and [Lighting](Lighting.md).

![Setup tab: Project & Output, Light Pivot and Armature](/_static/images/SRT_SetupTab.png)

### Cameras tab

- **Create Cameras** box: `Preset`, `Cameras` (only for the Custom preset), `Elevation`, `Target Height`, `Distance`, **Create Cameras**
- **Detect Cameras**
- **Lens Settings**: `Type`, `Focal Length` / `Orthographic Scale`, **Desync Shift X / Y**, `Shift X` / `Y`, `Clip Start` / `End`
- `Custom Output Names`
- **Cameras (render order)**: the list with `+`, `-`, move up / down and a "view through camera" icon per row; the selected camera has `Camera`, `Output Name` (when Custom Output Names is on), per-camera Shift (when desynced) and `Light Rotation`

See [Cameras](Cameras.md).

![Cameras tab: Create Cameras, Lens Settings and camera list](/_static/images/SRT_CameraTab.png)

### Animations tab

- `Animation Mode`: **Use Actions** (default), **Use NLA**, **Static Render**, **Frame Ranges**
- `Armature` (Actions, NLA and Frame Ranges modes; required in the first two, in Frame Ranges it is only used to warn about its active Action)
- The list of the current mode, with `+` / `-` buttons, the fields of the selected item, **Enable All** / **Disable All** and the **Detect** button
- `Preview FPS` + **Apply**
- **Animation Test** (collapsible, Actions and NLA modes): **Preview Action** / **Preview NLA Strip**, **Stop Preview** (or **Restore Scene** when playback already stopped), frame counter and first / previous / next / last buttons

See [Animations](Animations.md).

![Animations tab with the action list](/_static/images/SRT_AnimationTab.png)

### Render tab

**Render Settings** section:
- **Checklist** ("Ready to render?"): problems with **Fix** buttons and the image / time summary
- **Resolution** X / Y
- **Frame Step**: `Enable Frame Step`, `Step`, **Test Frame Count**
- **Test Cameras**

See [Render](Render.md).

![Render tab: checklist, resolution and Frame Step](/_static/images/SRT_RenderTab.png)

### Language

If Blender's language is Portuguese (Brazil or Portugal), the panels, tooltips and messages are shown in Portuguese. Any other language shows English.

---

## Basic Guide

A short step-by-step to render your first sprites. The names below are the real buttons and tabs of the add-on.

1. **Prepare the scene**
   - Set up your character / armature and its Actions or NLA strips.
   - Optionally create a **Light Pivot** (an Empty) and put your lights inside it.
   - Save the .blend file if you want to use a `//` relative output folder.

2. **Cameras** (**Cameras** tab)
   - Click **Create Cameras** to create a preset (choose `Preset`, `Elevation`, `Distance`), or **Detect Cameras** to add the cameras you already have.
   - Check the camera list. Reorder it with the arrows (list order is the render order) and use **Test Cameras** (**Render** tab) to look through them.

3. **Animations** (**Animations** tab)
   - Choose the `Animation Mode`. In Actions and NLA modes pick the `Armature` first.
   - Click **Detect Actions** or **Detect NLA Strips** (or `+` for a frame range), and keep only the animations you want enabled.

4. **Output** (**Setup** tab, **Project & Output** section)
   - Set `Project Name`, `Object Name` and the `Output Folder`.
   - Adjust the `Output Name` and the **Create Folders** options. Check "First image will be saved as:".
   - Optional: in the **Light Pivot** section, enable the Light Pivot and pick the pivot `Object`.

5. **Check** (**Render** tab)
   - Read the checklist and use the **Fix** buttons. Set the resolution and, if needed, **Frame Step**.

6. **Render**
   - Click **Render All** (top of the panel), check the summary dialog and click **Render**.
   - Watch the progress at the top of the panel. Press **ESC** or **Cancel Render** to stop (after the current frame).
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

