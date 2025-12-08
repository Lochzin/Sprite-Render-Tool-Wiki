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
- **Quick output access**: button to open the output folder directly in your file explorer.

It works with Blender **5.0.0+**.

---

## Quick Installation

- **Add-on file**: `Sprite Render Tool.py`
- **Compatibility**: Blender 5.0.0 or newer.

**Steps:**
- **1.** Open Blender → `Edit > Preferences... > Add-ons`  
- **2.** Click **Install...** and choose `Sprite Render Tool.py`  
- **3.** Search for **Sprite Render Tool** in the add-ons list and enable it  
- **4.** The panel will appear at: `View3D > Sidebar (N) > Sprite Render > Sprite Render`

---

## Main Panel (UI)

The addon interface uses a **sidebar navigation system** with tabbed interface. All functionality is organized into a single main panel with 5 main tabs accessible via icon buttons in the left sidebar:

### Sidebar Navigation

The left sidebar contains icon buttons for easy navigation between tabs:
- **📋 Info** (INFO): Version, author, documentation, and render progress
- **⚙️ Setup** (SETTINGS): Project, Light Pivot, Armature, Camera Creation
- **📷 Cameras** (CAMERA_DATA): Lens Settings, Camera Options, Camera List
- **🦴 Animations** (ARMATURE_DATA): Animation mode, Actions/NLA configuration, testing
- **🎬 Render** (RENDER_STILL): Render Settings, Output configuration, Render Actions

![Sidebar](/_static/images/SRT_Sidebar.png)

Each tab button shows a tooltip on hover with a specific description.

### Tab Contents

#### 📋 Info Tab
- Version information
- Author information
- Large **📖 Open Documentation** button
- **📚 Additional Resources** (collapsible section):
  - **Changelog** button: opens changelog documentation
  - **Future Features** button: opens future features documentation
  - **License** button: opens license documentation
  - Section starts minimized by default

![Info Tab](/_static/images/SRT_InfoTab.png)

#### ⚙️ Setup Tab
- **📁 Project Section**:
  - `Project Name`
  - `Object Name`
- **💡 Light Pivot Section**:
  - `Enable Light Pivot`: toggle to enable/disable light pivot rotation
  - `Light Pivot Object`: object used as the light pivot for light rotation (visible when enabled)
  - **💡 Tip**: You can place lights as children of the light pivot (they will rotate with cameras) and add fixed lights outside the light pivot to illuminate dark areas of the character.
  - Small documentation button in section header
  - For detailed information about lighting setup and strategies, see [Lighting](Lighting.md).
- **🦴 Armature Section**:
  - `Armature`: target armature selection (redundant with Animations tab for convenience)
- **📷 Camera Creation Section**:
  - `Preset`: dropdown to select camera preset configuration (1, 2, 3, 4, 5, or 8 cameras)
  - `Distance`: slider to adjust camera distance from pivot point
  - **Create Cameras** button: creates cameras based on selected preset
  - Small documentation button in section header
  - For more information about camera presets, see [Cameras](Cameras.md).

![Setup Tab](/_static/images/SRT_SetupTab.png)

#### 📷 Cameras Tab
- **📐 Lens Settings** (always visible):
  - `Type`: Camera projection type (Perspective/Orthographic)
  - `Focal Length / Orthographic Scale`: lens property (label changes based on camera type)
  - `Desync Shift X` / `Desync Shift Y`: independent toggle buttons (pressed = desynced, unpressed = synced)
  - `Shift X` / `Shift Y`: camera shift values (synchronized or individual per camera)
  - `Clip Start` / `Clip End`: clipping distances
- `Camera Count`: number of cameras in the internal list
- `Custom Output Names`: use names different from the camera object names for file output
- `Enable Full Rotation (XYZ)`: controls whether the pivot rotates in XYZ or only around Z
- **📋 Camera List** (collapsible):
  - For each camera (`Camera 1`, `Camera 2`, ...):
    - `Name`: name of the camera object in the scene
    - `Output Name`: name used in file names (if `Custom Output Names` is enabled)
    - `Shift X` / `Shift Y`: individual shift values (visible when `Desync Shift X` or `Desync Shift Y` is enabled, respectively)
    - `Render Order`: order in which this camera will be rendered
    - `Light Rotation`: light/pivot rotation (Z only or XYZ)
- **Detect Cameras** button (`sprite_render.autofill_light_rotation`):
  - Detects visible cameras in the current View Layer
  - Fills the list with names, count, and Z rotation based on the pivot object
- Small documentation button in section header

![Camera Tab](/_static/images/SRT_CameraTab.png)

#### 🦴 Animations Tab
- `Target Armature`: the armature to animate
- `Animation Mode`:
  - **NLA**: use NLA strips
  - **ACTIONS**: use Actions listed inside the add-on
  - **STATIC**: render only the current frame

**ACTIONS Mode:**
- `Actions` list:
  - Each item has: `enabled`, `name`, `frame_start`, `frame_end`, and secondary sync options (not yet implemented)
- Buttons:
  - `Detect Actions`: reads `bpy.data.actions` and populates the list
  - `Add`, `Remove`: manually manage the list
- **🎬 Animations Test** (collapsible):
  - `Preview Action` / `Stop Preview`
  - Frame controls (first, previous, next, last)
  - Frame counter display

**NLA Mode:**
- `NLA Strips` list:
  - Each item: `enabled`, `name` (strip name), `track_name`, `frame_start`, `frame_end`
- Buttons:
  - `Detect NLA Strips`: reads NLA tracks from the target armature
  - `Add`, `Remove`: manually manage the list
- **🎬 Animations Test** (collapsible):
  - `Preview NLA Strip` / `Stop Preview`
  - Frame controls (first, previous, next, last)
  - Frame counter display

![Animation Tab](/_static/images/SRT_AnimationTab.png)

#### 🎬 Render Tab
- **⚙️ Render Settings Section**:
  - **Resolution**:
    - `Resolution X` / `Resolution Y`: resolution synchronized across all cameras
  - **Frame Step**:
    - `Enable Frame Step`: toggle to enable frame stepping
    - `Step`: step value (1-100) - renders every Nth frame (e.g., step of 2 renders frames 1, 3, 5, 7...)
    - **🧪 Test Frame Count** button: calculates and displays total frames without rendering (appears when Frame Step is enabled)
  - **Playback Speed**:
    - `FPS`: custom FPS setting with `Apply` button
- **📤 Output Section**:
  - `Output Path` (from the Blender scene render settings): base folder where everything will be created
  - **📂 Open Output Folder** button: opens the output folder in your system's file explorer
  - `Output Name` (`output_template`):
    - Default template: `$objectName_$animation_$frame`
  - **Available placeholders** (collapsible):
    - `$projectName`: project name
    - `$objectName`: object/character name
    - `$animation`: Action or NLA Strip name
    - `$camera`: camera name or `output_name`
    - `$frame`: frame number formatted as `0001`, `0002`, etc.
  - **Create Folders**:
    - `Project Folder`, `Object Folder`, `Animation Folder`, `Camera Folder`
    - Builds a folder hierarchy based on these levels
  - Small documentation button in section header
  - For detailed information about render settings, output configuration, and render actions, see the dedicated [Render](Render.md) page.
- **🚀 Render Actions Section**:
  - `🚀 Render All` (`sprite_render.render_all`):
    - Starts rendering all animations and cameras (asynchronous version using a timer)
  - `🎯 Test Cameras` (`sprite_render.test_cameras`):
    - Cycles through the configured cameras for preview

![Render Tab](/_static/images/SRT_RenderTab.png)

---

## Basic Guide

This initial guide presents the basic workflow to get started with the Sprite Render Tool. Follow these steps to set up and render your first sprites.

- **1. Prepare the scene**
  - Set up your character / armature.
  - Create Actions or NLA strips for your animations.
  - Create the cameras that will be used for sprites.
  - Optionally create a **Light Pivot** object to control lighting rotation around the character.

- **2. Configure the Sprite Render panel**
  - In **Setup tab**:
    - Set `Project Name` and `Object Name` in the Project section.
    - Enable `Enable Light Pivot` and set the `Light Pivot Object` in the Light Pivot section.
    - (Optional) In Camera Creation section: use presets to quickly create cameras, or skip to manually add cameras.
  - In **Cameras tab**:
    - Configure **Lens Settings** (focal length, shift, clip distances, etc.)
    - Set `Camera Count`, `Custom Output Names`, and `Enable Full Rotation` as needed.
    - Click **Detect Cameras** to auto-fill the list, or manually add cameras.
    - Adjust `Render Order`, `Output Name`, and `Light Rotation` for each camera in the Camera List.

- **3. Choose the animation mode**
  - **ACTIONS**:
    - Click **Detect Actions** to import all Actions.
    - Adjust `frame_start` and `frame_end` for each action and enable only the ones you want to render.
  - **NLA**:
    - Select a `Target Armature`.
    - Click **Detect NLA Strips`.
  - **STATIC**:
    - The add-on uses the current frame to render; useful for thumbnails or poses.

- **4. Configure Render Settings and Output**
  - In **Render tab**:
    - Set `Resolution X` and `Resolution Y` in Render Settings.
    - (Optional) Enable `Frame Step` if you want to render every Nth frame.
    - Adjust `output_template` if you want a different file naming pattern.
    - Enable the `Create Folders` options according to how you want to organize files.
    - In `Output Path`, choose the base folder where everything will be saved.

- **5. Test before rendering everything**
  - Use **Test Cameras** (in Render tab → Render Actions) to check each camera.
  - Use the **Animations Test** section (in Animations tab) to preview animations before rendering.

- **6. Render**
  - Click **Render All** (in Render tab → Render Actions).
  - Monitor progress in the **Render tab** → Render Progress section (appears below Render Actions while rendering).
  - If needed, use **Cancel Render** button or press **ESC** to stop (it will stop after the current frame finishes).

---

## Generated File Structure

The folder and file name logic works as follows:
- **Base path**: the cleaned `scene.render.filepath` (`clean_base_path`) that strips file names and subfolders which could conflict with dynamically generated ones.
- **Optional folder levels**: `Project`, `Object`, `Animation`, `Camera` (via `build_dir_parts`).
- **File name**: based on `output_template`:
  - Replaces `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`.
  - Removes invalid characters for file names.
  - Outputs `.png` images.

If **`$camera` is not present** in the template, the add-on uses a per‑animation sequential counter (instead of the timeline frame number) to avoid filename conflicts between cameras.

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

