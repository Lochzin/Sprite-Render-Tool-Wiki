# Changelog

This page tracks changes to the **Sprite Render Tool** over time.

---

## [0.3.8] - 2024

### Fixed
- **Render Duplication Bug**: Fixed issue where render process was rendering extra frames after completing the last camera
  - Improved frame and camera advancement logic in asynchronous render loop
  - Fixed frame validation when using frame step feature
  - Now correctly advances to next camera when all frames for current camera are complete
  - Prevents rendering duplicate frames from previous cameras

### Removed
- **Automatic Addon Update Feature**: Removed automatic addon update functionality
  - Removed `SPRITE_RENDER_OT_UpdateAddon` operator due to stability issues
  - Removed `SPRITE_RENDER_AddonPreferences` class and update button from Addon Preferences
  - Addon updates must now be done manually by uninstalling and reinstalling the addon
  - This change was made to prevent crashes and improve stability

### Technical Details
- Refactored `_render_next_frame()` method in `SPRITE_RENDER_OT_RenderAll`:
  - Reordered checks: cameras finished check now happens before frame validation
  - Improved frame step logic to correctly identify when camera is complete
  - Fixed frame advancement to immediately move to next camera when frames are exhausted
  - Better handling of edge cases in frame step sequences

---

## [0.3.7] - 2024

### Changed
- **Tab Reorganization**: Improved tab structure and organization
  - **Info Tab**: Renamed from "Header" to "Info" and moved to first position in sidebar
  - **Execute Tab Removed**: Tab removed to simplify interface
  - **Render Actions**: Render and test buttons moved to Render tab
  - **Tab Order**: New order is Info → Setup → Cameras → Animations → Render
  - Better workflow: all render-related actions (settings, output, and execution) in one place

### Technical Details
- Removed `SPRITE_RENDER_OT_SetMainTab_Execute` operator
- Renamed `SPRITE_RENDER_OT_SetMainTab_Header` to `SPRITE_RENDER_OT_SetMainTab_Info`
- Updated `main_panel_tab` EnumProperty: removed EXECUTE, renamed HEADER to INFO, reordered items
- Default tab changed from SETUP to INFO
- Render tab now includes "Render Actions" section with Render All and Test Cameras buttons

---

## [0.3.6] - 2024

### Added
- **Sidebar Navigation System**: Complete UI redesign with tabbed interface
  - **Menu Lateral**: Vertical sidebar with icon buttons for easy navigation (similar to UVPackmaster)
  - **5 Main Tabs**: Setup, Cameras, Animations, Render, Execute
  - **Header Tab**: Additional tab at the bottom of sidebar for version info, documentation, and render progress
  - **Tooltips**: Each tab button shows specific description on hover
  - **Consolidated Interface**: All functionality organized into a single main panel
  - Reduces UI clutter from 9 separate panels to 1 unified panel with navigation
- **Armature in Setup Tab**: Added armature selection field to Setup tab
  - Located below Light Pivot section for logical workflow
  - Redundant with Animations tab for convenience
  - Makes setup configuration more complete in one place

### Changed
- **Complete UI Restructure**: Major interface reorganization
  - **Before**: 9 separate collapsible panels (Header, Project, Light Pivot, Camera Creation, Cameras, Animations, Render Settings, Output, Actions)
  - **After**: 1 main panel with sidebar navigation and 6 tabs
  - Header information integrated into main panel (no longer separate)
  - All content accessible through tab navigation
- **Shift Synchronization UI**: Improved shift control interface
  - **Button Labels**: Changed from "Sync X/Y" to "Desync Shift X/Y"
  - **Inverted Logic**: Buttons now show desync state (pressed = desynced, unpressed = synced)
  - **Default State**: Shift synchronization enabled by default (buttons unpressed = synced)
  - More intuitive: button pressed means "allow individual values"
- **Tab Organization**: Content reorganized into logical groups
  - **Setup Tab**: Project, Light Pivot, Armature, Camera Creation
  - **Cameras Tab**: Lens Settings, Camera Options, Camera List
  - **Animations Tab**: Animation mode, Actions/NLA configuration, testing tools
  - **Render Tab**: Render Settings (Resolution, Frame Step, Playback Speed) + Output configuration
  - **Execute Tab**: Render and test buttons
  - **Header Tab**: Version, author, documentation, render progress

### Fixed
- **UI Crash with Inverted Properties**: Fixed crash when using getters/setters for inverted boolean properties
  - Replaced problematic property getters/setters with simple toggle operators
  - Created `SPRITE_RENDER_OT_ToggleDesyncShiftX` and `SPRITE_RENDER_OT_ToggleDesyncShiftY` operators
  - Prevents `EXCEPTION_ACCESS_VIOLATION` crashes in Blender's UI system
- **Duplicate Operator Definitions**: Fixed issue where toggle operators were defined twice
  - Removed duplicate class definitions that were causing UI rendering issues
  - Cameras tab now displays all content correctly (Lens Settings, Camera Options, Camera List, Detect Cameras button)

### Technical Details
- New panel: `SPRITE_RENDER_PT_MainPanel` with sidebar navigation
- New operator: `SPRITE_RENDER_OT_SetMainTab` for tab switching
- New operators: `SPRITE_RENDER_OT_ToggleDesyncShiftX` and `SPRITE_RENDER_OT_ToggleDesyncShiftY` for shift control
- Tab system: `main_panel_tab` EnumProperty with 6 options
- Sidebar layout: Vertical column with icon buttons, header button at bottom
- Content switching: Dynamic content area based on selected tab

---

## [0.3.5] - 2024

### Added
- **Render Settings Panel**: New dedicated panel for render configuration settings
  - **Resolution**: X and Y resolution controls (moved from Cameras panel)
  - **Frame Step**: Enable/disable frame stepping with configurable step value (1-100)
    - Useful for animations made for higher FPS (60, 30 fps) that need to be rendered at lower intervals
    - Automatically adjusts total render count calculation when enabled
    - Example: Step of 2 renders frames 1, 3, 5, 7... (skips every other frame)
  - **Playback Speed**: FPS control with apply button (moved from Animations panel)
  - Located between Animations and Output panels for better workflow
- **Frame Count Test Tool**: Temporary debug tool to test frame calculation
  - "🧪 Test Frame Count" button appears when Frame Step is enabled
  - Calculates and displays total frames without rendering
  - Shows detailed breakdown per animation with and without step applied
  - Helps verify frame step configuration before rendering
- **Automatic Addon Update**: New update functionality built into the addon
  - "Update Addon from ZIP" button in Addon Preferences (Preferences → Add-ons → Sprite Render Tool)
  - Opens file dialog to select new ZIP file
  - Automatically creates backup before updating
  - Extracts and installs new version
  - Reloads all modules automatically
  - Restores backup automatically if update fails
  - No need to manually uninstall/reinstall the addon
  - Integrated seamlessly into Blender's addon preferences interface

### Changed
- **Header Panel Default State**: Header panel now starts minimized (collapsed) by default
  - Improved UI organization - users can expand when needed
  - Version, author, and documentation button still accessible when expanded
- **Default Camera Preset**: Changed default camera preset from 4 cameras to 5 cameras
  - Default preset is now "5 Cameras - Front, Front Right, Right, Back Right, Back"
  - Better default for most sprite rendering workflows
- **Default Output Template**: Changed default output name template
  - **Before**: `$projectName_$objectName_$animation_$camera_$frame`
  - **After**: `$objectName_$animation_$frame`
  - Simplified default template without project name and camera
- **UI Reorganization**: Moved render-related settings to new Render Settings panel
  - Resolution moved from Cameras panel to Render Settings panel
  - Frame Step moved from Animations panel to Render Settings panel
  - Playback Speed moved from Animations test box to Render Settings panel
  - Better organization of render configuration options

### Fixed
- **Frame Step Not Working**: Fixed issue where frame step was not being applied during rendering
  - Frame step calculation now works correctly in both synchronous and asynchronous render modes
  - Total frame count correctly calculated with step applied
  - Frame iteration properly skips frames according to step value
- **Sequential Counter Reset Bug**: Fixed issue where sequential frame counter was resetting when changing cameras
  - Sequential counter now only resets when starting a new animation, not when changing cameras
  - Prevents file overwriting when `$camera` is not in the output template
  - Frames continue numbering sequentially across all cameras for the same animation
- **NLA Strip Not Reactivating on Camera Change**: Fixed issue where NLA strip was not being reactivated when changing cameras
  - First camera was sometimes using a random animation instead of the correct one
  - NLA strip now correctly reactivates when changing cameras in both synchronous and asynchronous render modes
  - Ensures correct animation is active for each camera angle
  - Applied before each render to guarantee correct animation state
- **Addon Update Crash**: Fixed crash when updating addon after module reload
  - Protected `self.report()` calls with try/except to prevent crashes
  - Added fallback to `print()` for error messages
  - Improved error handling during addon update process

### Technical Details
- Frame step calculation: `range(start_frame, end_frame + 1, step)` when enabled
- Frame step applied in both `execute()` (synchronous) and `_render_next_frame()` (asynchronous) methods
- Sequential counter logic: Only resets on new animation (`_current_frame == 0` AND `_current_cam_index == 0`)
- Update operator: `SPRITE_RENDER_OT_UpdateAddon` with full error handling and backup system
- Backup location: `{addon_path}_backup` for safety
- Test operator: `SPRITE_RENDER_OT_TestFrameCount` (temporary debug tool)

---

## [0.3.4] - 2024

### Changed
- **Code Modularization**: Complete restructuring of the addon codebase into a modular architecture
  - Split monolithic `Sprite Render Tool.py` into organized modules:
    - `constants.py`: Camera presets and constant values
    - `properties.py`: All PropertyGroup classes and UIList definitions
    - `utils.py`: Helper functions and utilities
    - `panels.py`: All UI panel classes
    - `operators.py`: All operator classes
    - `__init__.py`: Entry point with registration and hot-reload support
  - Improved code maintainability and organization
  - Better separation of concerns
  - Easier to extend and modify individual components

### Fixed
- **Installation Bug**: Fixed `RuntimeError: 'method-wrapper' object has no attribute 'bl_info'` error
  - Resolved circular import issue between `__init__.py` and `panels.py`
  - Added local `bl_info` definition in `panels.py` to avoid circular dependencies
  - Ensured proper module loading order

### Technical Details
- New directory structure: `sprite_render_tool/` package with modular files
- Hot-reload support maintained for development workflow
- All registration/unregistration logic properly organized per module
- Backward compatibility maintained - no functional changes to addon behavior

---

## [0.3.3] - 2024

### Changed
- **Split Shift Synchronization**: "Sync Shift" button divided into two separate toggles
  - **Sync Shift X**: Independent toggle for horizontal shift synchronization
  - **Sync Shift Y**: Independent toggle for vertical shift synchronization
  - Allows granular control - sync one axis while keeping the other independent
  - Buttons placed side-by-side in the Lens Settings section
- **Dynamic Lens Property Label**: Lens settings label now changes dynamically based on camera type
  - Shows "Focal Length" when camera type is Perspective
  - Shows "Orthographic Scale" when camera type is Orthographic
  - Correct property (`cam_data.lens` or `cam_data.ortho_scale`) is applied based on camera type
- **Cameras Panel UI Reorganization**: Improved layout and organization of camera settings
  - **Camera Count**, **Custom Output Names**, and **Enable Full Rotation** are now always visible
  - These properties are positioned after Lens Settings and before the collapsible Camera List
  - Only the actual camera list remains collapsible within the "Camera List" section
  - Improved workflow: essential settings are always accessible

### Removed
- **Project Panel Documentation Button**: Removed documentation button from Project panel header
  - Documentation is still accessible via the main documentation button in the Header panel

### Fixed
- **Individual Shift Values Preservation**: Fixed issue where individual camera shift values were lost when disabling sync
  - When sync is enabled, individual values are now preserved
  - When sync is disabled, cameras restore their original individual shift values
  - Values are correctly maintained when toggling sync on/off

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
