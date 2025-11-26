## Changelog — Sprite Render Tool

This page is a suggested template for tracking changes to the **Sprite Render Tool** over time.

> **Note:** Only version **0.2.1** is visible in the provided code snippet (`bl_info["version"] = (0, 2, 1)`). Older versions below are examples; adjust or remove them to match your real history.

---

## 0.2.1

**Release date:** (fill in)

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

## 0.2.0 (example)

**Release date:** (fill in, or remove if not applicable)

**Changes:**
- Initial integration of NLA‑based rendering.
- First version of per‑camera handling (without full pivot rotation features).
- Early progress reporting improvements.

---

## 0.1.0 (example)

**Release date:** (fill in, or remove if not applicable)

**Changes:**
- First public beta of Sprite Render Tool.
- Basic Action‑based sprite rendering.
- Initial UI panel in the 3D Viewport sidebar.

---

## How to Maintain This File

For each new version:
- Update `bl_info["version"]` in the add‑on code.
- Add a new section at the top of this file with:
  - Version number.
  - Release date.
  - Bullet list of key changes (features, fixes, behavior changes, UI changes).


