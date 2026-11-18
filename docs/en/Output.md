# Output

This page explains how the **Sprite Render Tool** builds folder structures and filenames for your rendered sprites.

---

## Output Template

The core of the naming system is the **Output Name** field (`output_template`):
- Default value:  
  `$objectName_$animation_$frame`

This string is used to generate the final **file name** (before adding the `.png` extension). Folder names come from the folder options (see below), not from the template.

### Available Placeholders

You can use the following variables inside the template:
- `$projectName`: taken from `Project Name` in the UI.
- `$objectName`: taken from `Object Name` in the UI.
- `$animation`: current animation (Action name, NLA strip name, Frame Range name, or `"STATIC"` in Static mode).
- `$camera`: camera or output name (see **Cameras** docs).
- `$frame`: frame index, formatted as `0001`, `0002`, etc.

The **Show Available Placeholders** section in the Render tab shows a live preview of what the template would look like with sample values. The preview is only an approximation: it does not apply the file name cleaning described below.

> **⚠️ Always include `$frame` in the template.** The add-on does not check this: without `$frame`, every frame of an animation is saved with the same name and each one overwrites the previous, so you end up with a single image. Likewise, two cameras that end up with the same `Output Name` (and the same folder) overwrite each other. Files that already exist are always overwritten without warning.

---

## Output Path

The starting point for all output is the **Output Path** field, which is the Blender scene render path (`scene.render.filepath`, also shown in Output Properties). It must be an **existing folder**: the add-on creates the subfolders below it, but not the folder itself.

Things to know:
- Relative paths starting with `//` are converted to absolute paths.
- If you type something that looks like a file name at the end of the path (for example `D:/Sprites/hero_walk_0001.png`), the add-on discards that last part and uses the folder before it.
- If the last folders of the path have the same name as the Project, the Object or a camera, and the corresponding folder option is enabled, they are also discarded, so the same level is not created twice (for example `D:/Sprites/MyGame` with **Project Folder** on and Project Name `MyGame` becomes `D:/Sprites` + `MyGame/`).
- If nothing is left after this cleaning, your home folder is used.
- Always use a **folder** here, not a file name. Names that look like sprite files (for example `sprites_v2_final`) can be mistaken for file names and discarded.

> **⚠️ Known issue (Linux / macOS)**: in the current version, absolute paths such as `/home/user/sprites` lose the leading `/` when the add-on processes them, are treated as relative and Render All fails ("Output path does not exist") or writes to the wrong place. Windows paths with a drive letter work; UNC paths (`\\server\share`) are not supported. Until it is fixed, Render All is only reliable on Windows. (The **Open Output Folder** button uses the path as typed and works on all three systems.)

---

## Folder Structure (Create Folders)

The folder options in the **Output** section:
- `Project Folder`
- `Object Folder`
- `Animation Folder`
- `Camera Folder`

control which levels are added after the output path. They are always created in this order:
1. `Project Name` (if **Project Folder** is enabled)
2. `Object Name` (if **Object Folder** is enabled)
3. Animation name (if **Animation Folder** is enabled)
4. Camera name (if **Camera Folder** is enabled)

Example: with all four enabled, `D:/Sprites/` becomes `D:/Sprites/MyGame/Hero/walk/front/`.

What counts as the "animation name" depends on the **Animation Mode**:
- **ACTIONS**: the name of each enabled Action in the list.
- **NLA**: the name of each strip (from the `NLA Strips` list, or from the armature's NLA tracks if the list is empty).
- **STATIC**: `STATIC`.
- **FRAME_RANGES**: the name of each enabled frame range.

The camera name is the camera object name or, if **Custom Output Names** is enabled, its `Output Name`.

### Directory Creation

Before the first frame, the add-on creates all folders for every animation (and every camera, when **Camera Folder** is on). If some folder cannot be created, a warning and one error per folder appear in Blender's status bar/Info editor, and the render continues, failing frame by frame for those folders.

> **⚠️ Known issue (invalid characters in folder names)**: the cleaning of invalid characters is applied to the **file name only**. Project, Object, Animation and Camera names are used as typed as folder names. Names with `|`, `:`, `?`, `*` or `"`, or ending in a dot or space (for example Mixamo Actions such as `Armature|mixamo.com|Layer0`), can make folder creation fail on Windows, and a `/` in a name creates extra subfolders. Rename those Actions/cameras/objects before rendering.

---

## File Name Construction

The file name is built from the **Output Name** template:
- Placeholders are replaced with their actual values.
- If the result contains path separators, only the last part is kept.
- Characters that are invalid in file names (`<>:"|?*\/`) are replaced with `_`.
- If the result is empty, `render` is used.
- The extension `.png` is always added.

The file is written inside the folder built above, e.g. `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0001.png`.

> **Image format**: the add-on always names the files `.png`, but it uses the image settings of your scene as they are. Before rendering, set **File Format = PNG** and **Color = RGBA** in Output Properties (and enable **Film → Transparent** in Render Properties for transparent sprites). It does not change the resolution percentage either: keep it at 100%.

### Special Case: Missing `$camera`

If `$camera` is **not** present in the template:
- The add‑on uses a **per‑animation sequential counter** instead of the timeline frame number when building the `$frame` value.
- This prevents camera A and camera B from producing identical filenames for the same frames.

If `$camera` **is** present:
- The actual timeline frame number is used for `$frame`.
- You will typically get a separate image sequence per camera, with names like:
  - `MyGame_Hero_walk_front_0001.png`
  - `MyGame_Hero_walk_front_0002.png`
  - `MyGame_Hero_walk_back_0001.png`

---

## Examples

### Example 1 — Classic Per‑Camera Sequences

- Settings:
  - `Project Name`: `MyGame`
  - `Object Name`: `Hero`
  - `output_template`: `$projectName_$objectName_$animation_$camera_$frame`
  - **Create Folders**:
    - Project: ON
    - Object: ON
    - Animation: ON
    - Camera: ON
  - `render.filepath`: `D:/Sprites/`  
- Resulting structure (simplified):
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0001.png`
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0002.png`
  - `D:/Sprites/MyGame/Hero/walk/back/MyGame_Hero_walk_back_0001.png`

Because `$camera` is in the template, `$frame` is the real timeline frame number and each camera gets its own sequence.

### Example 2 — No Camera in Template

- `output_template`: `$projectName_$objectName_$animation_$frame`
- Two cameras, `front` and `back`, and an animation `walk` with 2 frames.
- `$camera` is not used, so the add‑on uses an internal sequential counter per animation (it keeps counting when it moves to the next camera and restarts at 1 for each new animation):
  - `MyGame_Hero_walk_0001.png` (first camera, frame 1)
  - `MyGame_Hero_walk_0002.png` (first camera, frame 2)
  - `MyGame_Hero_walk_0003.png` (second camera, frame 1)
  - `MyGame_Hero_walk_0004.png` (second camera, frame 2)

With **Camera Folder** on, each camera still gets its own folder but the numbers keep running across cameras.

This can be useful if you are packing multi‑camera frames together in a custom pipeline or building sprite sheets programmatically.

---

## Open Output Folder

The **Open Output Folder** button, located next to the `Output Path` field in the **Output** section, provides quick access to your output directory:

- **Opens the folder**: Launches your system's file explorer (Windows Explorer, macOS Finder, or Linux file manager) at the folder written in `Output Path`
- **Automatic path conversion**: Converts Blender relative paths (starting with `//`) to absolute paths before opening
- **Creates missing folders**: If the output folder doesn't exist, it will be created automatically before opening
- **Base folder only**: It opens the `Output Path` itself, not the Project/Object/Animation/Camera subfolders created by the render
- Works on Windows, macOS and Linux

This is especially useful when you want to quickly check your rendered sprites or verify the output location without manually navigating through your file system.

---

## Tips

- Always set `Output Path` to an existing **directory**, not a file name. The add-on checks that the folder exists before rendering and shows an error if it does not.
- Use short, human‑readable names for **Project**, **Object**, animations and cameras to produce clean asset names, and avoid characters that are invalid in folder names (see the warning above).
- If you change folder options mid‑project, be aware that new renders may go to different paths than older ones; keep your game project’s import paths in sync.

---

## For Developers

This section describes internal helpers and may change between versions; it is not needed to use the add-on.

- `clean_base_path(base_path, settings)` (in `operators.py`): the function that implements the path cleaning described in the "Output Path" section above.
- `build_dir_parts(settings, anim_name, camera_name)`: returns the list of folder levels in the order Project → Object → Animation → Camera.
- `create_output_directories`: runs before rendering and calls `os.makedirs(..., exist_ok=True)` for every animation/camera combination.
- `build_output_path_simple(context, settings, anim_name, camera_name, frame, original_filepath)`: builds the final path for each frame, using the `render.filepath` that was set when the render started, and creates the folder again defensively.
