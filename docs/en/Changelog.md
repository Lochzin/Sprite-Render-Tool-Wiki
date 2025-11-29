---
layout: default
title: "Changelog — Sprite Render Tool"
nav_order: 7
---

## Changelog — Sprite Render Tool

This page tracks changes to the **Sprite Render Tool** over time.

---

## [0.2.2] - 2024

### Fixed

- **Output Path Management**: Fixed issue where renders were being saved both inside and outside camera folders when `use_camera_folder` was enabled, causing duplicate files. The base path cleaning now properly removes dynamic folder names (project, object, camera) from the path before reconstructing it.

- **Frame Counter Reset**: Fixed frame counter not resetting between different animations when no folders were configured. The sequential counter now properly resets for each new animation.

- **Camera Folder Frame Counter**: Fixed frame counter not resetting between cameras when `use_camera_folder` is enabled. Now:

  - When `use_camera_folder` is enabled: Frame counter resets to 1 for each camera (each camera gets its own numbered sequence: 1, 2, 3...)

  - When `use_camera_folder` is disabled: Frame counter continues sequentially across cameras and only resets when changing animations

### Technical Changes

- Enhanced `clean_base_path()` method to accept `settings` parameter and remove dynamic folder names from base path

- Updated `build_dir_parts()` to check if `camera_name` is not empty before adding to directory parts

- Modified frame counter logic in both `execute()` and `_render_next_frame()` methods to respect `use_camera_folder` setting

- Added `_previous_cam_index` tracking variable for proper camera change detection in async rendering mode

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

---

