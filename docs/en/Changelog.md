# Changelog — Sprite Render Tool

This page tracks changes to the **Sprite Render Tool** over time.

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
