# Changelog

This page tracks changes to the **Sprite Render Tool** over time.

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
