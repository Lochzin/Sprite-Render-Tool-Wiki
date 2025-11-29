# Output

This page explains how the **Sprite Render Tool** builds folder structures and filenames for your rendered sprites.

---

## Output Template

The core of the naming system is `output_template`:
- Default value:  
  `$projectName_$objectName_$animation_$camera_$frame`

This string is used both to generate:
- Folder names (indirectly, via `$animation` and `$camera` when folder options are enabled), and
- The final **file name** (before adding the `.png` extension).

### Available Placeholders

You can use the following variables inside `output_template`:
- `$projectName`: taken from `Project Name` in the UI.
- `$objectName`: taken from `Object Name` in the UI.
- `$animation`: current animation (Action name, NLA strip name, or `"STATIC"` in Static mode).
- `$camera`: camera or output name (see **Cameras** docs).
- `$frame`: frame index, formatted as `0001`, `0002`, etc.

The helper in the main panel (`get_output_example`) shows a live preview of what the template would look like with sample values.

---

## Base Path Cleaning

The starting point for all output is the Blender scene render path:
- `context.scene.render.filepath`

Before using it, the add‑on passes it through `clean_base_path(base_path, settings)`:
- Normalizes slashes to the OS separator.
- Splits into path components.
- Strips off what looks like a file name or “fake folder” at the end, for example:
  - Things with known image extensions (`.png`, `.jpg`, `.exr`, etc.).
  - Parts that contain both `.` and `_` and have a valid extension.
  - Parts that look like exported sprite names (mixed digits and underscores).
- If `settings` is provided, it also removes trailing folders that match:
  - `project_name`
  - `object_name`
  - Any potential camera names or output names
    - This prevents duplicating `Project/Object/Camera` levels when they are also added via the folder options.

If, after cleaning, the path is empty, the user’s home dir is used as a fallback.

---

## Folder Structure (Use Folders)

The folder options in the **Output** section:
- `Project Folder`
- `Object Folder`
- `Animation Folder`
- `Camera Folder`

control which levels are added after the cleaned base path. The helper:
- `build_dir_parts(settings, anim_name, camera_name)`

builds a list in this order:
1. `project_name` (if **Project Folder** is enabled)
2. `object_name` (if **Object Folder** is enabled)
3. `anim_name` (if **Animation Folder** is enabled)
4. `camera_name` (if **Camera Folder** is enabled)

The final directory is:
- `final_dir = os.path.join(clean_base_path, *dir_parts)`

### Directory Creation

The operator ensures directories exist in two passes:

1. **create_output_directories** (before rendering):
   - Uses the chosen animation mode (Actions / NLA / Static) to collect all animation names.
   - For each animation and (optionally) each camera, builds `dir_parts` and:
     - Calls `os.makedirs(final_dir, exist_ok=True)`.
   - This provides early feedback if some paths cannot be created.

2. **build_output_path_simple** (per frame):
   - Repeats the same directory logic to compute `final_dir`.
   - Calls `os.makedirs(final_dir, exist_ok=True)` defensively.
   - Builds the final file name inside that directory.

---

## File Name Construction

The helper `build_output_path_simple(context, settings, anim_name, camera_name, frame, original_filepath)`:
- Uses the **original** `render.filepath` from when rendering started (to avoid drift).
- Cleans it with `clean_base_path` (with `settings`).
- Builds `final_dir` as described above.
- Computes `filename` from `output_template`:
  - Replaces placeholders with actual values.
  - Uses `os.path.basename(filename)` to ensure only the last part becomes the file name.
  - Replaces invalid characters (`<>:"|?*\/`) with `_`.
  - Falls back to `"render"` if the result is empty.
- Returns `os.path.join(final_dir, filename + ".png")`.

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
  - **Use Folders**:
    - Project: ON
    - Object: ON
    - Animation: ON
    - Camera: ON
  - `render.filepath`: `D:/Sprites/`  
- Resulting structure (simplified):
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0001.png`
  - `D:/Sprites/MyGame/Hero/walk/front/MyGame_Hero_walk_front_0002.png`
  - `D:/Sprites/MyGame/Hero/walk/back/MyGame_Hero_walk_back_0001.png`

### Example 2 — No Camera in Template

- `output_template`: `$projectName_$objectName_$animation_$frame`
- Two cameras, `front` and `back`.
- `$camera` is not used, so the add‑on uses an internal sequential counter per animation:
  - `MyGame_Hero_walk_0001.png` (first camera, frame 1)
  - `MyGame_Hero_walk_0002.png` (first camera, frame 2)
  - `MyGame_Hero_walk_0003.png` (second camera, frame 1)
  - etc.

This can be useful if you are packing multi‑camera frames together in a custom pipeline or building sprite sheets programmatically.

---

## Tips

- Always set `render.filepath` to a **directory**, not a file name; the add‑on will try to clean it, but keeping it as a folder reduces surprises.
- Use short, human‑readable names for **Project**, **Object**, animations and cameras to produce clean asset names.
- If you change folder options mid‑project, be aware that new renders may go to different paths than older ones; keep your game project’s import paths in sync.


