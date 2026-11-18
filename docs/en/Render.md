# Render

This page explains the **5. Render Settings** panel (checklist, resolution, Frame Step, Test Cameras) and how **Render All** works. Output folders and file names are in [Output](Output.md).

---

## Checklist (Ready to render?)

> **Location in add-on**: **5. Render Settings** panel, at the top

The add-on checks your setup all the time and lists the problems here. The header says **Ready to render?** or **Fix these before rendering**. Many problems have a **Fix** button that solves them in one click.

**Errors** (they block Render All; the button is greyed out and its tooltip shows the first error):

| Problem | Fix button |
| --- | --- |
| ACTIONS / NLA mode without an `Armature` | – |
| The animation list is empty, or no animation is enabled | – |
| Enabled rows with an empty name | **Disable them** |
| Enabled Actions / NLA strips that do not exist | **Disable them** |
| End frame before the start frame | **Swap start/end** |
| No cameras, or blank / missing camera objects in the list | **Remove them** (for blank / missing ones) |
| `Output Name` without `$frame` | **Add $frame** |
| Output name collisions (two animation / camera pairs would write the same files) | – (add `$animation` / `$camera` or enable the folders) |
| Output folder empty, not a folder, not writable, or (Windows) with characters such as `< > : " | ? *` | – |
| Image format is not PNG | **Use PNG** (also sets RGBA) |

**Warnings** (they do not block):

| Problem | Fix button |
| --- | --- |
| Sync Secondary is on (it is not used by the render) | **Turn off** |
| Unknown placeholder in the `Output Name` (it is kept as text) | – |
| **Frame Ranges** mode with an active Action on the `Armature`: it will play in every range | – |
| Color mode is not RGBA (the PNG has no alpha) | **Use RGBA** |
| **Film > Transparent** is off (opaque background) | **Turn on** |
| `Resolution %` in Output Properties is not 100 | **Set 100%** |

An **info** line appears when the output folder does not exist yet and will be created.

At the bottom, the checklist shows `N image(s): A anim x C cam` and, once a render has finished in this Blender session, `~estimated time`.

---

## Render Settings

> **Location in add-on**: **5. Render Settings** panel

### Resolution

- **Resolution X / Y**: resolution shared by all cameras.
- The values are written to the scene (`Resolution X / Y` of Output Properties) when you change them, and when you use **Create Cameras** or **Detect Cameras**.
- **Render All applies the resolution again** at the start of every animation / camera pair, so the render always uses the values shown here.
- `Resolution %` is not changed by the add-on: keep it at **100%** (the checklist warns and offers **Set 100%**).

### Frame Step

Render every Nth frame instead of every frame:

- **Enable Frame Step**: turns it on.
- **Step**: value from 1 to 100 (default 2). 1 renders every frame.
- Counting starts at the first frame of each animation (`frame_start`):
  - Step 2 on an animation starting at frame 1: frames 1, 3, 5, 7...
  - Step 3: frames 1, 4, 7, 10...
- A line shows "Renders every N frame(s)".

Use cases: animations made for a higher FPS (60, 30), sprite sheets with fewer frames, quick tests.

**Test Frame Count** (shown when Frame Step is on) reports in Blender's Info / status bar the number of animations, the frames with and without step, the total of renders (frames x cameras) and the frames of each animation, without rendering. It works in every animation mode.

### Test Cameras

**Test Cameras** cycles through the cameras of the list (scene camera + camera view in the viewport + light rotation). See [Cameras](Cameras.md).

---

## Render All

> **Location in add-on**: main panel (**Sprite Render**), at the top

- **Operator**: `sprite_render.render_all`
- The button is disabled while the checklist has errors, or while a render is already running.

### Confirmation dialog

Clicking **Render All** opens a summary before anything is rendered:
- `A animation(s) x C camera(s), F frame(s) each set` and `= I image(s)`
- **Destination**: the base output folder
- **Estimated time**: `~X (from the last render)`. The estimate uses the speed of the last render finished in this Blender session; before that it says "unknown until the first frames finish"
- `N existing file(s) will be overwritten`, when files with the same names already exist (existing files are overwritten without further warning)
- The warnings of the checklist, if any

Click **Render** to start, or close the dialog to cancel.

### While rendering

- The **Render All** button is replaced by a progress bar (`Rendering current/total (percent%)`), a status line (`'animation' frame N, camera 'name' (~time left)`) and **Cancel Render**. They are visible with any sub-panel open.
- The estimated time left appears after the first image is finished.
- **Blender is still busy while each image renders**: the panel is updated *between* images, so with heavy scenes it may look frozen for a few seconds at a time. Lower the samples or resolution, or use Frame Step, to speed up long batches.
- **ESC** or **Cancel Render** stop the render **after the current image**. If the cancel arrives after the last image, the render counts as complete.
- **Ctrl+Z is blocked** during the render. Only one render can run at a time.
- If you close the window or load another file, the render ends and the scene is restored.

### How it works

1. The setup is validated (same checks as the checklist), the output folders are created, and a preview that was playing is stopped and restored.
2. The add-on builds the list of images: for each enabled animation (STATIC: the current frame; FRAME_RANGES: each enabled range), each camera in list order, each frame (with Frame Step).
3. At the start of every animation / camera pair it applies again: the Action or NLA strip, the camera, the resolution, the camera shift and the Light Pivot rotation.
4. Each image is saved as PNG. If one image fails, it is counted and the render goes on.
5. When it ends, the status line shows a summary, for example `Render complete: 40 of 40 rendered (63.2 s).` or `Render cancelled: 12 of 40 rendered, 1 failed (20.1 s).`, and the scene is restored.

From a script, `bpy.ops.sprite_render.render_all()` runs the same queue without the dialog, blocking until it finishes.

### What is restored after the render

When the render ends, is cancelled or fails, the add-on puts back:
- the output path (`scene.render.filepath`), the scene camera and the current frame
- the Light Pivot rotation
- the active Action (and its slot) and `use_nla` of the armature(s), and the mute state of every NLA track and strip
- the timeline start / end
- the resolution (X, Y and %)
- the camera shifts

The Animation Test does the same with **Stop Preview** / **Restore Scene**. Choosing a mode or selecting a list item never changes the scene.

### Cancelling a stuck state

If the panel shows "rendering" but no render is running (for example after a crash), the **Cancel Render** button resets the state. The state is also reset when the add-on is enabled and when a file is loaded.

---

## Workflow Tips

1. **Before rendering:**
   - Follow **Start Here**, then read the checklist and use the **Fix** buttons
   - Check "First image will be saved as:" in **1. Project & Output**
   - Use **Test Cameras** and **Animation Test**
   - Use **Test Frame Count** if you use Frame Step

2. **During rendering:**
   - Follow the progress in the main panel
   - Avoid working on the scene during a batch
   - Press **ESC** or **Cancel Render** to stop

3. **After rendering:**
   - Open the destination folder from the dialog or from "First image will be saved as:"
   - Check the folder structure and file names

---

## Related Documentation

- [Output](Output.md): output folder, templates, folders and file names
- [Cameras](Cameras.md): camera configuration and testing
- [Lighting](Lighting.md): Light Pivot system
- [Animations](Animations.md): animation modes
