# Changelog

This page tracks changes to the **Sprite Render Tool** over time.

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
