# Output

This page explains how the **Sprite Render Tool** builds folder structures and file names for your rendered sprites.

> **Location in add-on**: **Setup** tab → **Project & Output** section

---

## Output Folder

The starting point is the **Output Folder** field (`output_dir`, default `//sprites/`).

- The folder is **created automatically** (with its parents) when you render, so it does not need to exist. The field is not drawn in red while the folder is missing (Blender treats it as an output path, like the scene's Output Path).
- A folder typed **without** `//` and without a drive or leading `/` (for example `sprites`) is also relative to the `.blend` file, never to Blender's working directory.
- Paths starting with `//` are relative to the `.blend` file. **Save the file first**: with an unsaved file, the add-on reports an error asking you to save it or to choose an absolute folder.
- `~` is expanded to your home folder.
- Absolute paths work on Windows (`D:\Sprites`, UNC `\\server\share\sprites`), Linux and macOS (`/home/user/sprites`).
- The field is used exactly as typed (it is not "cleaned").
- On Windows, characters that the system does not allow in a path (`< > : " | ? *`, except the drive colon) are an error in the checklist.

![Output folder, name template, first-image preview and folder options](/_static/images/SRT_OutputFolder.png)

### Legacy mode (empty Output Folder)

If you leave `Output Folder` **empty**, the add-on uses the scene's **Output Path** (Output Properties > `scene.render.filepath`; it is shown in the panel as a second field). In this mode the old cleaning rules apply, and the folder must already exist:
- A file-name-looking part at the end of the path (for example `D:/Sprites/hero_walk_0001.png`) is discarded and the folder before it is used.
- Trailing folders with the same name as the Project, the Object or a camera are discarded when the matching folder option is on, so the same level is not created twice.
- If nothing is left, your home folder is used.

### First image preview

**First image will be saved as:** shows the full path of the first image. It is built by the same functions as the render, so what you see is what is saved. The box also shows:
- template warnings (for example `$frame` missing or an unknown placeholder),
- name collisions,
- an error when the path cannot be built (for example a `//` path with an unsaved file),
- "No $camera: frames are numbered in sequence across cameras." when you have several cameras and `$camera` is not in the template.

---

## Output Template

The **Output Name** field (`output_template`) builds the **file name** (without extension). Default: `$objectName_$animation_$frame`. Folder names come from the folder options (below), not from the template.

### Available Placeholders

- `$projectName`: `Project Name`.
- `$objectName`: `Object Name`.
- `$animation`: current animation (Action name, NLA strip name, Frame Range name, or `STATIC`).
- `$camera`: camera object name or, with **Custom Output Names**, the camera's `Output Name`.
- `$frame`: frame number with 4 digits (`0001`, `0002`, ...).

Under the field, buttons (`projectName`, `objectName`, `animation`, `camera`, `frame`) append a placeholder to the template (a placeholder already in the template is not added again), and **Default** / **Per camera** set the templates `$objectName_$animation_$frame` and `$objectName_$animation_$camera_$frame`. **Available Placeholders** (collapsible) lists the variables and shows a name preview with sample values.

> **`$frame` is required.** Without it every frame would overwrite the same file, so the checklist shows an error (button **Add $frame**) and Render All is disabled. Two animation / camera pairs that would write the same file are also an error (**name collision**). Files that already exist are overwritten (the confirmation dialog shows how many).

### Special Case: Missing `$camera`

If `$camera` is **not** in the template, `$frame` is a **per-animation sequential counter** (it restarts at 1 for each animation and keeps counting when it moves to the next camera), so different cameras never produce the same name.

If `$camera` **is** in the template, `$frame` is the real timeline frame number, usually giving one sequence per camera.

**Restart Frame Numbering Per Camera** (off by default): when on, the counter also restarts at 1 for each camera, so every camera folder starts at `0001`. It only has an effect when **Camera Folder** is on and `$camera` is not in the template (otherwise it is greyed out / ignored).

---

## Folder Structure (Create Folders)

`Project`, `Object`, `Animation` and `Camera` choose which levels are added below the output folder, always in this order:
1. Project Name (default off)
2. Object Name (default on)
3. Animation name (default on)
4. Camera name (default on)

**Clean Action Names** (off by default, below the folder options): uses readable animation names in folders and files. It removes the `Armature|` (or `Armature.001|`) prefix and the `|mixamo.com|Layer0` suffix added by the FBX importer, and turns spaces into `_`: `Armature|Running|mixamo.com|Layer0` becomes `Running` and `Strafe Left|mixamo.com|Layer0` becomes `Strafe_Left`. It applies to `$animation` and to the Animation folder; the Action itself is not renamed.

Example with all four on: `D:/Sprites/` becomes `D:/Sprites/MyGame/Hero/walk/front/`.

The "animation name" depends on the **Animation Mode**: the Action name (ACTIONS), the strip name (NLA), `STATIC`, or the frame range name (FRAME_RANGES). The camera name is the camera object name or its `Output Name` (Custom Output Names).

### Directory Creation

Before the first image, the add-on creates the folders of every animation (and camera, when **Camera Folder** is on; without it there is one folder per animation). If a folder cannot be created, a warning and one error per folder appear in Blender's Info editor.

---

## Safe Names (Windows, Linux and macOS)

**Every** name that goes into a path (Project, Object, animation, camera, and the template result) is cleaned the same way:
- The characters `< > : " / \ | ?` and `*`, and control characters, become `_`. For example, `Armature|mixamo.com|Layer0` becomes `Armature_mixamo.com_Layer0`.
- Spaces at the start and end, and dots at the end, are removed.
- Windows reserved names (`CON`, `PRN`, `AUX`, `NUL`, `COM1`-`COM9`, `LPT1`-`LPT9`) get a `_` prefix.
- Names longer than 200 characters are shortened.
- An empty name becomes `_` (folders) or `render` (file name). An empty camera name in `$camera` stays empty.
- If the template contains `/` or `\`, only its last segment is used as the file name.
- The extension is always `.png`.

Because folders and files use the same cleaning, the result is the same on all systems.

> **Image format**: the add-on names every file `.png` and uses your scene's image settings. The checklist asks for **File Format = PNG** (error) and **Color = RGBA** (warning), and warns if **Film > Transparent** is off or `Resolution %` is not 100, each with a **Fix** button.

---

## Examples

### Example 1 — Classic Per-Camera Sequences

- `Project Name`: `MyGame`, `Object Name`: `Hero`
- `Output Name`: `$projectName_$objectName_$animation_$camera_$frame`
- **Create Folders**: Project, Object, Animation and Camera on
- `Output Folder`: `D:/Sprites/`
- Result:
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0001.png`
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0002.png`
  - `D:/Sprites/MyGame/Hero/walk/back/MyGame_Hero_walk_back_0001.png`

### Example 2 — No Camera in the Template

- `Output Name`: `$projectName_$objectName_$animation_$frame`; two cameras (`front`, `back`) and an animation `walk` with 2 frames; **Camera Folder** off.
- The counter keeps running across cameras:
  - `MyGame_Hero_walk_0001.png` (front, frame 1)
  - `MyGame_Hero_walk_0002.png` (front, frame 2)
  - `MyGame_Hero_walk_0003.png` (back, frame 1)
  - `MyGame_Hero_walk_0004.png` (back, frame 2)

With **Camera Folder** on, each camera still gets its own folder, but the numbers keep running across cameras.

---

## Open Output Folder

The `Output Folder` field is plain text (it is not coloured, even when the folder does not exist yet; the render creates it). Next to it, the **Browse** button picks a folder and the folder button opens the folder the render will use in your file explorer (Windows Explorer, macOS Finder or the Linux file manager), creating it if it does not exist. In legacy mode (empty `Output Folder`) it opens the scene's **Output Path**.

---

## Tips

- Use short, readable names for Project, Object, animations and cameras.
- If you change the folder options in the middle of a project, new renders may go to different paths than old ones; keep your game's import paths in sync.
- The add-on never deletes old renders.

---

## For Developers

This section describes internals and may change between versions; it is not needed to use the add-on. The pure path and name functions are in `sprite_render_tool/utils.py` and have `pytest` tests in `tests/` (no Blender needed):

- `sanitize_component(name)`: the cleaning described above.
- `expand_template(...)`: builds the file name from the template.
- `resolve_base_dir(...)`, `clean_base_path(...)`: the base folder (the second one is the legacy heuristic).
- `build_dir_parts(...)`, `build_final_path(...)`, `find_collisions(...)`.

`sprite_render_tool/operators/paths.py` adds the Blender side (`.blend` location, settings): `resolve_output_dir`, `validate_output_path`, `create_output_directories`, `build_output_path_simple`, `get_preview_info`.
