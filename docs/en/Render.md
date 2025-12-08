# Render

This page explains the **Render** tab functionality, which includes render settings, output configuration, and render actions.

![Render Tab](/_static/images/SRT_RenderTab.png)

---

## Render Settings

The **Render Settings** section provides controls for resolution, frame stepping, and playback speed:

### Resolution

- **Resolution X / Y**: Render resolution synchronized across all cameras
  - These values are automatically applied to the Blender scene render settings
  - All cameras will render at the same resolution
  - Resolution is applied before each render to ensure consistency

### Frame Step

The **Frame Step** feature allows you to render every Nth frame instead of all frames:

- **Enable Frame Step**: Toggle to enable/disable frame stepping
- **Step**: Step value (1-100)
  - When set to 1: renders all frames (normal behavior)
  - When set to 2: renders frames 1, 3, 5, 7... (skips every other frame)
  - When set to 3: renders frames 1, 4, 7, 10... (skips 2 frames between each rendered frame)
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

### Playback Speed

- **FPS**: Custom frames per second setting
- **Apply** button: Applies the FPS setting to the Blender scene
  - This affects animation playback speed in the viewport
  - Useful for previewing animations at different speeds
  - Does not affect the actual frame rendering (frames are still rendered at their original frame numbers)

---

## Output Configuration

The **Output** section in the Render tab provides controls for where and how files are saved. For detailed information about output templates, folder structures, and file naming, see the dedicated [Output](Output.md) page.

### Output Path

- **Output Path**: Base folder where all rendered files will be created
  - This uses the Blender scene render settings (`scene.render.filepath`)
  - Can use Blender relative paths (starting with `//`)
  - The add-on automatically converts relative paths to absolute paths
- **📂 Open Output Folder** button: Opens the output folder in your system's file explorer
  - Automatically creates the folder if it doesn't exist
  - Cross-platform support (Windows, macOS, Linux)

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

The **Render Actions** section contains the main buttons for rendering and testing:

### 🚀 Render All

- **Operator**: `sprite_render.render_all`
- **Functionality**: Starts rendering all enabled animations and cameras
- **Mode**: Asynchronous rendering using a timer
  - Non-blocking: you can continue working in Blender while rendering
  - Progress tracking: see render progress in the **Info** tab
  - Cancellable: use **Cancel Render** button or press **ESC** to stop

**How it works:**
1. Validates output path before starting
2. Renders each enabled animation
3. For each animation, renders all configured cameras
4. Applies frame step if enabled
5. Saves each frame as a PNG image
6. Shows progress in the Render tab (below Render Actions section)

**Progress tracking:**
- Current frame count: `[current/total]`
- Percentage complete
- Progress bar
- Status message (current animation, camera, frame)

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
   - Monitor progress in the **Info** tab
   - You can continue working in Blender (asynchronous rendering)
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

