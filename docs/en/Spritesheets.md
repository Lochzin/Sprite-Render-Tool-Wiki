# Spritesheets

The **Spritesheet** tab (last side button, image icon) builds **spritesheets** from the PNGs that **Render All** wrote: one PNG with the frames in a grid plus a **JSON** file that tells where each frame is. It is an optional step after the render, and it also works on a folder rendered earlier.

![Spritesheet tab](/_static/images/SRT_SpritesheetTab.png)

---

## Workflow

1. Render with **Render All** as usual.
2. When the render finishes, a **Make Spritesheets** button appears under Render All. It opens the Spritesheet tab (you can also click the image icon).
3. Choose the **Grouping**, the **Order** and the spacing.
4. Click **Preview** to see the first sheet in an Image Editor (nothing is saved), adjust, and click **Generate Spritesheets**.
5. The sheets are saved and the last one is shown in an Image Editor. The folder button next to Generate opens the sheets folder.

> **How the frames are found:** the tab does not scan the folder blindly. It uses the **current setup** (enabled animations, cameras and their order, Frame Step, Output Name, folder options, Clean Action Names) and the same functions the render uses to name the files. So keep the setup that produced the render; if you changed it, the frames are reported as missing.

---

## Options

| Option | What it does |
| --- | --- |
| **Renders** | Folder that holds the render tree (the same structure Render All writes). Empty = the **Output Folder** of Project & Output. Use it to build sheets from an earlier render saved somewhere else. |
| **Sheets** | Where the sheets are saved. Empty = a `spritesheets` folder inside the renders folder. |
| **Grouping** | **Animation + Camera**: one sheet per animation and camera. **Animation**: one sheet per animation, with all its cameras. **All in One (Atlas)**: everything in one sheet. |
| **Order** | **Row per Camera**: one row for each camera (and animation, in the atlas), one column for each frame. **Sequence**: all frames one after the other, wrapping after **Columns**. |
| **Columns** | Columns in Sequence order. `0` = automatic (close to a square). |
| **Padding** | Empty pixels between two frames. |
| **Margin** | Empty pixels around the whole sheet. |
| **Uniform Frame Size** | On (default): all frames must have the same size (Render All always produces one resolution); a different size stops with a clear message. Off: different sizes are allowed, each cell is as large as the largest frame and the frame sits at the top-left of its cell (the JSON has the real size of each frame). |
| **Skip Missing Frames** | Off (default): a missing frame stops the sheet and the message names it. On: the sheet is built anyway. In Row per Camera the missing cell stays empty so the columns stay aligned; in Sequence the frames close the gap. |
| **Delete Frame PNGs After Generating** | Off by default. See below. |

The box below the options shows how many sheets and frames the current setup gives and the size of the largest sheet (estimated from the add-on resolution). Above **8192 px** it warns (many GPUs and engines limit textures to that); above **16384 px** the sheet is refused: use another grouping, Sequence with fewer columns, or a Frame Step.

**Check Frames** looks for the files and reports how many were found and missing (the first missing paths go to the Info log).

---

## Output

For each sheet:

- `<Object>_<Animation>_<Camera>_sheet.png` (Animation + Camera), `<Object>_<Animation>_sheet.png` (Animation) or `<Object>_atlas.png` (Atlas): RGBA, 8 bits, transparent background. The pixels of each frame are **identical** to the rendered PNG.
- A `.json` with the same name.

![Example: Animation grouping, Row per Camera (one row per camera)](/_static/images/SRT_Spritesheet_Example.png)

### JSON

Generic format (`"format": "sprite-render-tool-sheet"`), coordinates in pixels from the **top-left** corner:

```json
{
  "image": "Hero_Gallop_sheet.png",
  "size": {"w": 202, "h": 104},
  "frame_size": {"w": 64, "h": 48},
  "origin": "top-left",
  "fps": 30.0, "frame_step": 8, "playback_fps": 3.75,
  "layout": {"grouping": "ANIMATION", "order": "ROWS", "columns": 3, "rows": 2, "padding": 2, "margin": 3},
  "frame_count": 6,
  "animations": [
    {"name": "Gallop", "camera": "Camera_Front", "frame_count": 3,
     "frames": [{"index": 0, "scene_frame": 1, "x": 3, "y": 3, "w": 64, "h": 48,
                 "column": 0, "row": 0, "source": "Gallop/Hero_Gallop_Camera_Front_0001.png"}]}
  ]
}
```

- `fps` is the scene frame rate; `playback_fps` = fps / Frame Step (the speed that keeps the original timing).
- `animations` has one entry per animation + camera, with its frames in playback order.

Godot, Unity, Phaser/TexturePacker formats and GIF export are planned (see [Future Features](Future-Features.md)).

---

## Deleting the individual PNGs

With **Delete Frame PNGs After Generating** on, **Generate Spritesheets** first shows a confirmation with the number of PNGs that will be deleted. They are deleted only **after every sheet was saved**, and only:

- frames that were read and placed in a saved sheet;
- files inside the renders folder (never the sheets themselves).

The files are deleted permanently (they do not go to the Recycle Bin). Empty folders are left in place. Keep the option off if you may want to build other layouts later.

---

## The scene is not changed

The frames are loaded one at a time into temporary images that are removed right away. Only one image stays in the file: **Sprite Sheet Preview**, the last sheet (Preview or Generate), so you can look at it in the Image Editor. Delete it from the Image Editor / Blender File view if you do not want it saved in the .blend.

---

## Related Documentation

- [Render](Render.md): Render All, checklist and confirmation
- [Output](Output.md): Output Folder, Output Name and folders (the Spritesheet tab uses the same settings to find the frames)
