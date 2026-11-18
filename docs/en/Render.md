# Render

This page explains the **Render** tab functionality, which includes render settings, output configuration, and render actions.

---

## Render Settings

> **Location in add-on**: **Render** tab → **Render Settings** section

The **Render Settings** section provides controls for resolution, frame stepping, and playback speed:

### Resolution

- **Resolution X / Y**: Render resolution shared by all cameras
  - The values are written to the Blender scene render settings (`Resolution X/Y`) when you change them (as long as the camera list contains at least one existing camera), and when you use **Create Cameras** or **Detect Cameras**
  - **Render All does not apply the resolution again** before rendering: the resolution used is whatever is in the scene's **Output Properties** at that moment
  - If you change the resolution in Output Properties by hand, the values shown here no longer match the real render. Edit the values here again (or check Output Properties) before rendering
  - `Resolution %` in Output Properties is not touched: keep it at **100%**, or the sprites will come out at a different size

### Frame Step

The **Frame Step** feature allows you to render every Nth frame instead of all frames:

- **Enable Frame Step**: Toggle to enable/disable frame stepping
- **Step**: Step value (1-100)
  - When set to 1: renders all frames (normal behavior)
  - Counting starts at the first frame of each animation (its `frame_start`)
  - When set to 2 (animation starting at frame 1): renders frames 1, 3, 5, 7... (skips every other frame)
  - When set to 3 (animation starting at frame 1): renders frames 1, 4, 7, 10... (skips 2 frames between each rendered frame)
  - And so on...

**Use cases:**
- Animations made for higher FPS (60, 30 fps) that need to be rendered at lower intervals
- Creating sprite sheets with fewer frames for performance optimization
- Testing render settings without rendering all frames

**🧪 Test Frame Count** button:
- Appears when Frame Step is enabled
- Calculates and displays total frames that will be rendered without actually rendering
- Shows detailed breakdown per animation with and without step applied
- Helps verify frame step configuration before starting a full render batch
- > **Note**: it works in **ACTIONS**, **NLA** and **STATIC** modes. In **FRAME_RANGES** mode it does not count the ranges and reports "No animations found" (known limitation of the current version)

### Playback Speed

- **FPS**: Custom frames per second setting
- **Apply** button: Applies the FPS setting to the Blender scene
  - This affects animation playback speed in the viewport
  - Useful for previewing animations at different speeds
  - Does not affect the actual frame rendering (frames are still rendered at their original frame numbers)

---

## Output Configuration

> **Location in add-on**: **Render** tab → **Output** section

The **Output** section in the [Render tab](https://lochzin.github.io/Sprite-Render-Tool-Wiki/en/index.html#render-tab) provides controls for where and how files are saved. For detailed information about output templates, folder structures, and file naming, see the dedicated [Output](Output.md) page.

### Output Path

- **Output Path**: Base folder where all rendered files will be created
  - This uses the Blender scene render settings (`scene.render.filepath`)
  - Can use Blender relative paths (starting with `//`)
  - The add-on automatically converts relative paths to absolute paths
  - The folder **must already exist** when you click Render All (the add-on creates the Project/Object/Animation/Camera subfolders, but not the base folder). Blender's default value for this field may point to a folder that does not exist on your system
  - > **⚠️ Known issue (Linux / macOS)**: in the current version, absolute paths such as `/home/user/sprites` lose the leading `/` when the add-on processes them and are treated as relative paths, so the render may fail with "Output path does not exist" or save files in the wrong place. Windows paths with a drive letter (`D:\Sprites`) work. UNC network paths (`\\server\share`) are not supported either. Paths relative to the `.blend` file (`//`) are converted to absolute paths first, so they are affected too. Until this is fixed, Render All is only reliable on Windows
- **📂 Open Output Folder** button: Opens the folder written in **Output Path** in your system's file explorer
  - Automatically creates the folder if it doesn't exist
  - Works on Windows, macOS and Linux (uses the system's default file manager)
  - It opens the base folder only (not the Project/Object/Animation/Camera subfolders created by the render)

> **Before rendering, check the image settings in Blender's Output Properties.** The add-on always names the files `.png`, but it does **not** force the image format: use **File Format = PNG**, **Color = RGBA** and, for transparent sprites, enable **Film → Transparent** in Render Properties. Other formats (JPEG, EXR...) can make the render count as failed or produce files that don't match the `.png` extension.

### Output Name Template

- **Output Name** (`output_template`): Template string for generating file names
  - Default template: `$objectName_$animation_$frame`
  - See [Output](Output.md) for detailed information about templates and placeholders

### Available Placeholders

The **📋 Show Available Placeholders** section (collapsible) displays:
- `$projectName`: Project name from settings
- `$objectName`: Object/character name from settings
- `$animation`: Animation/Action name
- `$camera`: Camera name or output name
- `$frame`: Frame number (formatted as 0001, 0002, etc.)

The section also shows a live preview of what the output name would look like with sample values.

### Create Folders

Organize output files into a folder hierarchy:
- **Project Folder**: Creates a folder with the project name
- **Object Folder**: Creates a folder with the object name
- **Animation Folder**: Creates a folder with the animation name
- **Camera Folder**: Creates a folder with the camera name

These folders are built in the order: `Project/Object/Animation/Camera/` (based on which options are enabled).

For more details about folder structure and file naming, see [Output](Output.md).

---

## Render Actions

> **Location in add-on**: **Render** tab → **Render Actions** section

The **Render Actions** section contains the main buttons for rendering and testing:

### 🚀 Render All

- **Operator**: `sprite_render.render_all`
- **Functionality**: Starts rendering all enabled animations and cameras
- **Mode**: Rendering driven by a timer, one image per step
  - **Blender is busy while each image renders**: every frame is rendered with Blender's own (blocking) render, so the interface does not respond during that time. The panel, progress and the Cancel button only update **between** frames. With heavy scenes the UI may look frozen for a few seconds at a time; this is normal
  - Progress tracking: see render progress in the **Render** tab, below **Render Actions** (it only appears while rendering and is only drawn in the Render tab)
  - Cancellable: use **Cancel Render** button or press **ESC** to stop (it stops after the current frame finishes)
  - Don't start Render All again while a render is running (the button stays clickable) and avoid undo (Ctrl+Z) during a render

**How it works:**
1. Checks that at least one camera is configured and that the output path exists
2. Creates the output subfolders
3. Renders each enabled animation (in **STATIC** mode: the current frame; in **FRAME_RANGES** mode: each enabled range)
4. For each animation, renders all configured cameras, sorted by `Render Order`
5. Applies frame step if enabled
6. Saves each frame as a PNG image
7. Shows progress in the [Render tab](https://lochzin.github.io/Sprite-Render-Tool-Wiki/en/index.html#render-tab) (below Render Actions section)

**Progress tracking:**
- Current frame count: `[current/total]`
- Percentage complete
- Progress bar
- Status message (current animation, camera, frame)

**What the render changes in your file:**
- Restored when the render ends (or is cancelled): output path (`Output Path`), scene camera, current frame and the rotation of the Light Pivot
- **Not restored**: the Action assigned to the armature, NLA strips mute state, `use_nla`, the timeline start/end range and the scene resolution. The same happens when you select an item in the Actions/NLA lists or use the previews. Save a copy of your file before a long batch if you need the original state back

**Things to check before rendering** (the add-on does not validate them for you in the current version):
- The `Output Name` template should contain `$frame`; otherwise every frame overwrites the same file. Existing files are always overwritten without warning
- If `$camera` is not in the template and the cameras have no camera folder, images from different cameras are numbered in sequence (see [Output](Output.md))
- In **ACTIONS** and **NLA** modes, set a **Target Armature** and make sure every enabled item points to an existing Action/strip; an Action that does not exist is not applied (the armature keeps whatever pose it had) and a missing NLA strip is skipped with a warning
- Do not leave blank camera names in the Camera List (an empty name counts as a failed render)
- In **ACTIONS** mode, select the Action you want in the list before rendering: see the warning in [Animations](Animations.md) (section "Rendering in ACTIONS Mode")

### 🎯 Test Cameras

- **Operator**: `sprite_render.test_cameras`
- **Functionality**: Cycles through configured cameras for preview
- **Use cases**:
  - Quickly preview all camera angles
  - Verify camera framing before rendering
  - Check lighting setup with light pivot rotation
  - Visualize light rotation in **Rendered** viewport shading mode

**How it works:**
1. Finds the current scene camera in the add-on camera list
2. Selects the next camera in the list (cyclically)
3. Sets the scene camera to that object
4. Switches the 3D Viewport to camera view
5. If a light pivot is set, applies the corresponding light rotation

> **Tip**: For detailed information about camera testing and light rotation visualization, see [Cameras](Cameras.md) and [Lighting](Lighting.md).

---

## Workflow Tips

1. **Before rendering:**
   - Set resolution in Render Settings
   - Configure output path and template
   - Enable/disable folder options as needed
   - Use **Test Cameras** to verify camera setup
   - Use **🧪 Test Frame Count** if using Frame Step

2. **During rendering:**
   - Monitor progress in the **Render** tab (Render Progress section)
   - The interface only updates between frames; each frame blocks Blender while it renders, so avoid working on the scene during a batch
   - Press **ESC** or click **Cancel Render** to stop (stops after current frame completes)

3. **After rendering:**
   - Use **📂 Open Output Folder** to quickly access rendered files
   - Check folder structure matches your expectations
   - Verify file names follow your template

---

## Related Documentation

- [Output](Output.md): Detailed information about output templates, folder structures, and file naming
- [Cameras](Cameras.md): Camera configuration and testing
- [Lighting](Lighting.md): Light pivot system and lighting strategies
- [Animations](Animations.md): Animation modes and configuration

