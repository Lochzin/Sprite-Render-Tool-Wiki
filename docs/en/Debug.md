---
layout: default
title: "Debug — Light Rotation and Rendering"
nav_order: 5
---

## Debug — Light Rotation and Rendering

This page covers debugging tools and patterns built into the **Sprite Render Tool**.

---

## Debug Section in the UI

In the main panel there is a **🐛 Debug** section with:
- `Light Rotation Debug` (toggle)

When enabled:
- The add‑on prints detailed information to the Blender console regarding how the **pivot object** rotation is applied:
  - Pivot object name.
  - Camera name.
  - Requested rotation values.
  - Original rotation vs. new rotation (in degrees).
  - Any errors that occur while trying to apply rotation.

This is implemented in `SPRITE_RENDER_OT_RenderAll.apply_light_rotation` via `report_func` calls when `debug=True`.

---

## Light Rotation Debug Details

When light rotation debug is active, for the first camera in the ordered list (or the first camera/frame in async mode) the add‑on logs:
- Original pivot Euler rotation (degrees).
- The desired rotation coming from `cam_item.light_rotation`.
- Whether full XYZ rotation is enabled.
- The final pivot rotation after applying the change.

In Z‑only mode:
- It logs original Z and new Z in degrees.

If an exception occurs:
- A `DEBUG: Failed to rotate pivot 'Name': <error>` message is reported.

Use this to:
- Confirm that your per‑camera light rotations are set up as expected.
- Diagnose cases where the pivot is not rotating or is rotating in the wrong axis/order.

---

## Render Progress and Cancellation

While rendering via `Render All` in async mode, the add‑on exposes debug‑like information in the UI:
- Progress section shows:
  - `render_current` / `render_total`
  - `render_progress` percentage (0–100)
  - `render_status` string describing what is currently being rendered
- A **Cancel Render** button:
  - Calls `SPRITE_RENDER_OT_CancelRender`, which sets a shared `_should_cancel` flag.
  - The timer callback `_render_next_frame` checks this flag and stops gracefully after the current frame.

In the console, each frame logs something like:
- `Rendering [X/Y] (Z%): 'AnimName' frame F, camera 'CameraName'`

This helps you:
- Monitor where the render is in long batches.
- See which animation/camera/frame caused any error messages.

---

## Synchronous vs Asynchronous Render

There are two paths inside `SPRITE_RENDER_OT_RenderAll`:
- `execute`: synchronous, straight loop (can block the UI during long renders).
- `invoke` + `_render_next_frame` + Blender timer:
  - Processes one frame per timer tick (default 0.1s delay between checks).
  - Updates the UI progress bar and status string between frames.
  - Allows for cancellation requests via the **Cancel Render** operator.

If you need to debug logic around:
- Animation activation,
- Directory building,
- Camera selection,
you can compare the console output between these two modes to ensure both are behaving consistently.

---

## Common Debugging Tips

- If cameras appear to render from the wrong angle:
  - Use **Test Cameras** to verify the active camera.
  - Enable **Light Rotation Debug** and check the console logs for each camera’s rotation.
- If animations look wrong:
  - In **ACTIONS** mode, verify the frame range and that `use_nla` is disabled for the target armature while previewing.
  - In **NLA** mode, use the **Preview NLA Strip** button to ensure only the desired strip is unmuted.
- If files are showing up in unexpected folders:
  - Check the current scene’s `render.filepath`.
  - Verify which **Use Folders** options are enabled in the **Output** section.
  - Look at console messages about directory creation failures (if any).


