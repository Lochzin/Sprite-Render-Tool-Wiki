# Changelog

This page tracks changes to the **Sprite Render Tool** over time.

---

## [0.3.2] - 2024

### Changed
- **UI Reorganization**: Complete restructure of the addon interface
  - Each section is now a separate collapsible panel
  - Removed internal boxes and toggles - each panel is the section itself
  - Improved organization and navigation
- **Panel Structure**: New panel layout
  - **Header Panel**: General information (version, author, documentation button)
  - **Project Panel**: Project settings
  - **Light Pivot Panel**: Light pivot configuration
  - **Camera Creation Panel**: Camera preset creation
  - **Cameras Panel**: Camera management and lens settings
  - **Animations Panel**: Animation configuration
  - **Output Panel**: Output settings
  - **Actions Panel**: Render and test buttons
- **Documentation Buttons**: Improved documentation button placement
  - Header panel: Large documentation button below author
  - Other panels: Small documentation button in the panel header (top right)

### Removed
- **GitHub Repository Reference**: Removed reference to private GitHub repository from header panel

---

## [0.3.1] - 2024

### Added
- **Synchronized Resolution Settings**: New resolution controls in Lens Settings
  - Resolution X and Y fields synchronized across all cameras
  - Applied to scene render settings automatically
- **Shift Synchronization Toggle**: New "Sync Shift" button in Lens Settings
  - Allows toggling between synchronized and individual shift values
  - When desynchronized, each camera can have its own shift values
- **Individual Camera Shift**: Per-camera shift controls
  - Shift X and Y fields appear for each camera when shift is desynchronized
  - Shift values displayed before Render Order in camera list
  - Values automatically applied when changed

### Changed
- **Lens Settings UI**: Improved lens settings section layout
  - Lens Settings section is now always visible (no toggle)
  - Removed Sensor Width and Sensor Fit options
  - Added Camera Type (Perspective/Orthographic) option
  - Layout matches Blender's default camera lens panel
- **Camera List Organization**: Better camera list management
  - All individual cameras grouped in a collapsible "Camera List" subsection
  - Camera List can be hidden/shown with a toggle
  - Lens Settings remain always accessible

### Fixed
- **Lens Settings Application**: Fixed lens settings synchronization
  - Settings now correctly applied when cameras are created via presets
  - Settings correctly applied when cameras are detected
  - Resolution applied before each render

---

## [0.3.0] - 2024

### Added
- **Camera Preset System**: New camera creation system with predefined presets
  - **8 Preset Configurations Available**:
    - 1 Camera - Front
    - 2 Cameras - Front, Back
    - 2 Cameras - Front, Right
    - 3 Cameras - Front, Left, Right
    - 3 Cameras - Front, Right, Back
    - 4 Cameras - Front, Right, Back, Left (Cardinal Directions)
    - 5 Cameras - Front, Front Right, Right, Back Right, Back
    - 8 Cameras - 360 Degrees (Evenly distributed)
  - Cameras are automatically positioned around the pivot object (or origin)
  - Cameras automatically point toward the center with correct orientation
  - Configurable distance from the pivot point
- **Camera Creation Section**: New dedicated section in the UI for camera presets
  - Located before Light Pivot section for better workflow
  - Dropdown to select preset type
  - Distance slider to adjust camera distance
  - "Create Cameras" button to apply the preset
- **Automatic Camera Replacement**: Smart camera management system
  - Tracks cameras created by the plugin
  - Automatically deletes previously created plugin cameras when applying a new preset
  - Only affects cameras created by the plugin, preserving manually created cameras
  - Prevents accumulation of unused cameras

### Changed
- **UI Layout**: Reordered sections for better workflow
  - Light Pivot section moved before Camera Creation section
  - Makes it clearer to configure lighting pivot before creating cameras
- **Camera Rotation System**: Improved camera rotation calculation
  - Cameras now correctly point toward the pivot object/center
  - Fixed roll (rotation around view axis) issues
  - Cameras maintain correct orientation regardless of position (front, side, back)
  - Uses matrix-based rotation calculation for reliable results

### Fixed
- **Camera Rotation Bugs**: Fixed multiple camera orientation issues
  - Fixed cameras pointing downward instead of toward center
  - Fixed side cameras being rotated 90 degrees incorrectly
  - Fixed back camera being upside down (180 degrees rotation)
  - All cameras now maintain correct vertical orientation
- **Undo/Crash Issues**: Fixed crashes when undoing camera creation
  - Added proper validation before accessing camera objects
  - Fixed `ReferenceError` when objects are removed by undo
  - Improved error handling for camera deletion
- **Collection Property Errors**: Fixed `TypeError` with `bpy.data.objects` and `bpy.data.cameras`
  - Replaced incorrect `in` operator usage with proper `get()` method
  - Fixed all object existence checks throughout the code

### Technical Details
- New PropertyGroup: `PluginCameraName` for tracking plugin-created cameras
- New CollectionProperty: `plugin_created_cameras` in `SpriteRenderSettings`
- New Operator: `SPRITE_RENDER_OT_ApplyCameraPreset` for creating cameras from presets
- Camera preset data structure: `CAMERA_PRESETS` dictionary with 8 configurations
- Rotation calculation: Uses matrix-based approach with proper up vector handling
- Camera tracking: Automatic cleanup of plugin-created cameras when applying new presets

---

## [0.2.8] - 2024

### Changed
- **UI Layout**: Reordered sections to improve user understanding
  - Light Pivot section now appears above the Cameras section
  - Makes it clearer that light pivot configuration affects camera rendering
  - Improves workflow by configuring lighting before cameras

### Added
- **Section-specific documentation buttons**: Added help buttons in each main section
  - Each section (Project, Light Pivot, Cameras, Animations, Output) now has a documentation button
  - Buttons open the corresponding documentation page in the default web browser
  - Provides quick access to relevant guides without leaving Blender
  - Documentation links:
    - **Project**: Opens main documentation page
    - **Light Pivot**: Opens Lighting documentation
    - **Cameras**: Opens Cameras documentation
    - **Animations**: Opens Animations documentation
    - **Output**: Opens Output documentation

### Technical Details
- New operators: `SPRITE_RENDER_OT_OpenDocumentationProject`, `SPRITE_RENDER_OT_OpenDocumentationLighting`, `SPRITE_RENDER_OT_OpenDocumentationCameras`, `SPRITE_RENDER_OT_OpenDocumentationAnimations`, `SPRITE_RENDER_OT_OpenDocumentationOutput`
- Modified `draw_section_toggle()` function to accept optional documentation operator parameter
- All documentation links point to English version (`/en/`) of the documentation

---

## [0.2.7] - 2024

### Changed
- **Output UI**: Moved the Output Path field above the Output Name template
  - Makes it clearer where files will be saved before configuring naming
  - Label updated from "Use Folders" to "Create Folders" for better clarity
- **Terminology**: Updated references from "pivot object" to "light pivot object" throughout the codebase
  - Error messages and comments now use clearer terminology
  - Improves understanding of the feature's purpose

### Added
- **Light pivot debug log**: Added log message when starting render with light pivot
  - Shows which pivot object is being used
  - Shows how many light rotation slots (cameras) are linked
  - Also logs when light pivot is disabled or not configured
- **Test Cameras rotation log**: Added detailed rotation logs when using Test Cameras button
  - Shows rotation values being applied from each camera (before and after)
  - Displays rotation in degrees for both XYZ (full rotation) and Z-only modes
  - Helps debug light rotation issues

### Fixed
- **Enable Full Rotation (XYZ)**: Fixed bug where full rotation mode was not working correctly
  - Issue was caused by `light_rotation` property returning an `Euler` object instead of a tuple
  - Code now correctly handles both `Euler` objects and tuple/list formats
  - Full XYZ rotation now works as expected when enabled

---

## [0.2.6] - 2024

### Added
- **Documentation button**: Added help button in the main panel to open documentation
  - Button located next to the version number at the top of the panel
  - Opens the official documentation website in the default web browser
  - Provides quick access to guides, tutorials, and FAQ
  - URL updated in `bl_info` to point to the official documentation

### Changed
- **Localization**: Translated all tooltips and descriptions from Portuguese to English
  - `animation_mode` EnumProperty description and item tooltips now in English
  - All user-facing tooltips are now consistently in English
  - Improves accessibility for international users
- **README.md**: Added installation instructions and documentation section
  - Step-by-step installation guide
  - Link to official documentation with overview of available topics
  - Note about accessing documentation from the addon panel

---

## [0.2.5] - 2024

**Highlights:**
- Added **ESC key cancellation**: Ability to cancel rendering by pressing ESC key
  - Modal operator automatically detects ESC key press during rendering
  - Cancels render immediately when ESC is pressed
  - Works alongside the existing cancel button
- Added **Open output folder button**: Button to open output folder in file explorer
  - Located next to the "Output Path" field in the Output section
  - Automatically converts Blender relative paths (`//`) to absolute paths
  - Creates folder if it doesn't exist before opening
  - Cross-platform support (Windows, macOS, Linux)

---

## [0.2.4] - 2024

### Removed
- **Debug system**: Removed all debug-related features and UI elements
  - Removed `debug_light_rotation` boolean property
  - Removed `show_section_debug` toggle property
  - Removed debug section from UI panel
  - Removed `update_debug_light_rotation()` callback function
  - Removed all debug print statements and log messages
  - Simplified `apply_light_rotation()` method by removing debug parameter and conditional logging

### Changed
- `apply_light_rotation()` method signature simplified: removed `debug` parameter
  - Method now only applies rotation without any debug output
  - All calls to `apply_light_rotation()` updated to use simplified signature

### Technical Details
- Cleaned up code by removing debug-related conditionals and print statements
- Improved code maintainability by removing unused debug infrastructure

---

## [0.2.3] - 2024

**Highlights:**
- Added **Output path validation**: The add-on now validates if the output path is configured and exists before rendering
  - Prevents rendering when output path is empty or invalid
  - Shows clear error messages when path validation fails
  - Works in both synchronous and asynchronous rendering modes

**Fixed:**
- **Blender relative path support**: Fixed handling of Blender's relative paths (starting with `//`)
  - Now correctly converts relative paths to absolute paths
  - Prevents issues when Blender saves paths as relative (e.g., `//TestRender\`)
  - Applied to all path processing methods

---

## [0.2.2] - 2024

**Highlights:**
- Added **Enable Light Pivot Toggle**: New `enable_light_pivot` boolean property to control the light pivot feature
  - When enabled (default: `True`): Light rotation is applied to the pivot object during rendering
  - When disabled: Light rotation is ignored, even if a pivot object is configured
  - The pivot object selection field is only visible when `enable_light_pivot` is enabled
  - This allows users to temporarily disable light rotation without removing the pivot object configuration

**Changed:**
- Light rotation is now only applied when both `pivot_object` is set AND `enable_light_pivot` is enabled
- The pivot object UI field is conditionally displayed based on `enable_light_pivot` state

---

## [0.2.1] - 2024

**Highlights:**
- Improved multi‑camera workflow with `render_order` per camera.
- Added **pivot‑based light rotation** per camera, with optional full XYZ rotation.
- Introduced **output folder structure options**:
  - Project/Object/Animation/Camera folders.
- Added **output template** with placeholders:
  - `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`.
- Implemented **Render All (async)** with:
  - Progress bar, status messages, and render counters.
  - Cancel render button.
- Added **Animations Test** panels for both Actions and NLA:
  - Preview, frame navigation, and custom FPS controls.
- Added automatic detection helpers:
  - **Detect Cameras**
  - **Detect Actions**
  - **Detect NLA Strips**
