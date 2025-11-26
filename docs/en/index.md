---
layout: default
title: "Sprite Render Tool — Official Wiki"
nav_order: 1
---

## Sprite Render Tool — Official Wiki

Add-on for **Blender** focused on generating 2D sprites from 3D animations, with **multi‑camera support**, **automatic animation detection** (Actions and NLA), and **highly customizable file naming**, ideal for 2D games and sprite pipelines.

---

## Overview

**Sprite Render Tool** is an add-on that:
- **Renders animations as sprites**: iterates over frames of Actions or NLA strips and saves each frame as an image.
- **Supports multiple cameras**: you define a list of cameras, render order, and optional custom output names.
- **Controls lighting via a pivot**: uses a pivot object to rotate the “light” relative to the camera (great for isometric/top‑down sprites).
- **Generates organized output folders**: structures directories by project, object, animation, and camera.
- **Provides an animation test panel**: preview Actions or NLA directly from the add-on.
- **Shows progress and allows cancelling**: integrated progress bar and cancel button while rendering.

It works with Blender **5.0.0+** (according to the add-on `bl_info`).

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

The main panel is implemented by the `SPRITE_RENDER_PT_MainPanel` class and organizes the workflow into sections:

- **🔖 Project**
  - `Project Name`
  - `Object Name`

- **🎥 Cameras**
  - `Camera Count`: number of cameras in the internal list.
  - `Custom Output Names`: use names different from the camera object names for file output.
  - `Enable Full Rotation (XYZ)`: controls whether the pivot rotates in XYZ or only around Z.
  - For each camera (`Camera 1`, `Camera 2`, ...):
    - `Name`: name of the camera object in the scene.
    - `Output Name`: name used in file names (if `Custom Output Names` is enabled).
    - `Render Order`: order in which this camera will be rendered.
    - `Light Rotation`: light/pivot rotation (Z only or XYZ).
  - **Detect Cameras** button (`sprite_render.autofill_light_rotation`):
    - Detects visible cameras in the current View Layer.
    - Fills the list with names, count, and Z rotation based on the pivot object.

- **💡 Light Pivot**
  - `Pivot Object`: object used as the pivot for light rotation.

- **🎞️ Animations**
  - `Target Armature`: the armature to animate.
  - `Animation Mode`:
    - **NLA**: use NLA strips.
    - **ACTIONS**: use Actions listed inside the add-on.
    - **STATIC**: render only the current frame.

  **ACTIONS Mode:**
  - `Actions` list (`SPRITE_RENDER_UL_Actions`):
    - Each item has: `enabled`, `name`, `frame_start`, `frame_end`, and secondary sync options (not yet implemented).
  - Buttons:
    - `Detect Actions`: reads `bpy.data.actions` and populates the list.
    - `Add`, `Remove`: manually manage the list.
  - **Animations Test (ACTIONS)**:
    - `Preview Action` / `Stop Preview`
    - Frame controls (first, previous, next, last).
    - `Custom FPS` setting + `Apply` button.

  **NLA Mode:**
  - `NLA Strips` list (`SPRITE_RENDER_UL_NLAStrips`):
    - Each item: `enabled`, `name` (strip name), `track_name`, `frame_start`, `frame_end`.
  - Buttons:
    - `Detect NLA Strips`: reads NLA tracks from the target armature.
    - `Add`, `Remove`: manually manage the list.
  - **Animations Test (NLA)**:
    - `Preview NLA Strip` / `Stop Preview`
    - Frame controls (first, previous, next, last).
    - `Custom FPS` setting + `Apply` button.

- **💾 Output**
  - `Output Name` (`output_template`):
    - Default template:  
      `$projectName_$objectName_$animation_$camera_$frame`
  - **Available placeholders:**
    - `$projectName`: project name.
    - `$objectName`: object/character name.
    - `$animation`: Action or NLA Strip name.
    - `$camera`: camera name or `output_name`.
    - `$frame`: frame number formatted as `0001`, `0002`, etc.
  - **Use Folders:**
    - `Project Folder`, `Object Folder`, `Animation Folder`, `Camera Folder`  
    - Builds a folder hierarchy based on these levels.
  - `Output Path` (from the Blender scene render settings): base folder where everything will be created.

- **🐛 Debug**
  - `Light Rotation Debug`: prints debug information about pivot rotation to the console.

- **📊 Render Progress**
  - Shown while rendering:
    - `[current/total]`, percentage, progress bar, and status message.
    - **❌ Cancel Render** button.

- **⚙️ Actions (Footer)**
  - `🚀 Render All` (`sprite_render.render_all`):
    - Starts rendering all animations and cameras (asynchronous version using a timer).
  - `🎯 Test Cameras` (`sprite_render.test_cameras`):
    - Cycles through the configured cameras for preview.

---

## Basic Workflow

- **1. Prepare the scene**
  - Set up your character / armature.
  - Create Actions or NLA strips for your animations.
  - Create the cameras that will be used for sprites.
  - Optionally create a `Pivot` object to control lighting rotation around the character.

- **2. Configure the Sprite Render panel**
  - In **Project**: set `Project Name` and `Object Name`.
  - In **Cameras**:
    - Set the `Pivot Object` in the **Light Pivot** section.
    - Click **Detect Cameras** to auto-fill the list.
    - Adjust `Render Order`, `Output Name`, and `Light Rotation` as needed.

- **3. Choose the animation mode**
  - **ACTIONS**:
    - Click **Detect Actions** to import all Actions.
    - Adjust `frame_start` and `frame_end` for each action and enable only the ones you want to render.
  - **NLA**:
    - Select a `Target Armature`.
    - Click **Detect NLA Strips`.
  - **STATIC**:
    - The add-on uses the current frame to render; useful for thumbnails or poses.

- **4. Configure Output**
  - Adjust `output_template` if you want a different file naming pattern.
  - Enable the `Use Folders` options according to how you want to organize files.
  - In `Output Path` (Blender Render Properties), choose the base folder where everything will be saved.

- **5. Test before rendering everything**
  - Use **Test Cameras** to check each camera.
  - Use the **Animations Test** panel (Actions or NLA) to preview animations before rendering.

- **6. Render**
  - Click **Render All**.
  - Monitor progress in the **Render Progress** section.
  - If needed, use **Cancel Render** to stop (it will stop after the current frame finishes).

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

For full details, see the dedicated page: **[License](Licenca.md)** (can be created from the content of `LICENSE.md`).

---

## Suggested Wiki Pages

Use this Home page as the main index. Recommended pages (we can create them next):
- **Cameras.md**: detailed configuration of cameras and light rotation.
- **Animations.md**: ACTIONS, NLA, and STATIC modes in depth.
- **Output.md**: examples of `output_template` usage and folder structure.
- **Debug.md**: using `Light Rotation Debug` and common debugging tips.
- **Licenca.md**: full/summary commercial license text + GPL notes.
- **FAQ.md**: common questions and troubleshooting.
- **Changelog.md**: version history (e.g., 0.2.1, etc.).

Tell me which of these pages you want to create now and I'll fill them with detailed content.

---

## Language / Idioma

**English** | [Português](/pt/)
