# Animations

This page explains how the **Sprite Render Tool** handles animations in the four modes: **ACTIONS**, **NLA**, **STATIC**, and **FRAME_RANGES**.

---

## Animation Modes

> **Location in add-on**: **2. Character & Animations** panel

Choose the mode with `Animation Mode`:
- **Use Actions** (ACTIONS, default): render from a list of Actions.
- **Use NLA** (NLA): render from NLA strips of the target armature.
- **Static Render** (STATIC): render only the current frame.
- **Frame Ranges** (FRAME_RANGES): render specific frame ranges without rig or animation.

**Changing the mode, or selecting an item in a list, never changes your scene.** The scene is only touched by the **Preview** buttons and by Render All, and both put it back afterwards (see [Render](Render.md)).

---

## Common Settings

> **Location in add-on**: **2. Character & Animations** panel, below `Animation Mode`

- `Armature` (`target_armature`): the armature whose animations are rendered. It is set only here, and is shown only in **ACTIONS** and **NLA** modes (it is required there; the checklist reports an error without it). Only armature objects can be picked.
- `Preview FPS` + **Apply** (`sprite_render.apply_fps`): sets `scene.render.fps` to the value and `scene.render.fps_base` to 1.0. It only affects playback speed in the viewport, not which frames are rendered.

---

## Lists (Actions, NLA, Frame Ranges)

The three lists work the same way:
- Each row has a checkbox (enabled / disabled) and the name. Only **enabled** rows are rendered. Each row shows `start-end (N)` where N is the number of frames.
- `+` adds an empty row, `-` removes the selected row.
- **Enable All** / **Disable All** change every row of the list.
- Rows that point to something that does not exist (an Action or NLA strip that is not in the file) are shown in red with an error icon. The checklist offers a **Disable them** button.
- The selected row shows its fields: start and end frame, and the extra fields of the mode.

---

## ACTIONS Mode

> **Location in add-on**: **2. Character & Animations** → `Animation Mode` = **Use Actions**

Each row (`ActionItem`) has:
- `Action`: the Action name, chosen with a searchable field of the Actions of the file.
- `Start Frame`, `End Frame`.
- Enabled checkbox.
- `Sync Secondary Armature`, `Secondary Armature`, `Secondary Action`: **not implemented**. The panel shows "Sync Secondary: not implemented". Only **Preview Action** plays the secondary action; **Render All ignores it**, and the checklist shows a warning if it is on (with a **Turn off** button).

**Detect Actions** (`sprite_render.detect_actions`, also in **Start Here**):
- **Adds** the Actions of the file that are not in the list yet. Existing rows keep their frame range and enabled state.
- Skips Actions that cannot animate an object (lights, materials, shape keys...).
- The range comes from `action.frame_range` (start rounded down, end rounded up).
- A message reports how many were added and warns if some rows point to Actions that no longer exist.

![Detect Actions](/_static/images/SRT_DetectActions.gif)

### Rendering in ACTIONS Mode

When **Render All** runs in ACTIONS mode:
- Only enabled rows are rendered, each through every camera of the list.
- At the start of **every** animation / camera pair, the Action is assigned to the `Armature` and `use_nla` is turned off, so the Action drives the pose. This includes the first camera of each animation and setups with a single camera.
- With Blender's slotted Actions, if the armature has no Action Slot after the assignment, the first suitable slot is used.
- An Action that does not exist is reported as a warning and its images are counted as failed (the checklist normally stops this before the render starts).

> **Tip**: if an Action is detected but does not play, check the **Action Slot** of the armature in **Properties** → **Object Properties** → **Animation**.

---

## NLA Mode

> **Location in add-on**: **2. Character & Animations** → `Animation Mode` = **Use NLA**

Each row (`NLAItem`) has:
- `Strip Name`: the name of the NLA strip.
- `Track Name`: the track that holds it (optional; it tells apart strips with the same name).
- `Start Frame`, `End Frame`, enabled checkbox.

**Detect NLA Strips** (`sprite_render.detect_nla_strips`, also in **Start Here**):
- Requires an `Armature` with NLA tracks.
- **Adds** the strips (that have an Action) that are not in the list yet, including strips of muted tracks (added as disabled when the track or the strip is muted). Existing rows keep their range and enabled state.
- Range: start rounded down, end rounded up.

If the NLA list is empty, Render All collects the strips straight from the armature's NLA tracks.

### Rendering in NLA Mode

At the start of every animation / camera pair:
- `use_nla` is turned on.
- The Action that was active on the armature is taken off for the duration of the render (it would play on top of the NLA), and **put back at the end**.
- Only the selected strip (and its track) is unmuted. A strip that cannot be found is reported as a warning and skipped.

---

## STATIC Mode

> **Location in add-on**: **2. Character & Animations** → `Animation Mode` = **Static Render**

- There is no animation list and no armature is needed.
- The add-on renders **only the current frame** of the scene.
- The animation name is `STATIC` (usable in `$animation` and in the Animation folder).

Use this mode for thumbnails, key poses and single-frame renders.

---

## FRAME_RANGES Mode

> **Location in add-on**: **2. Character & Animations** → `Animation Mode` = **Frame Ranges**

Renders specific frame ranges without armature or animation data:
- Each row (`FrameRangeItem`) has an editable name (also in the list), start frame, end frame and a checkbox.
- **Add** (`+`) creates a row named `Range N`, with the scene's frame range as the default range. **Remove** (`-`) deletes the selected one.
- The end frame is never lower than the start frame: changing one pushes the other along.
- The range name is the `$animation` value (and the Animation folder name).
- **Test Frame Count** works in this mode too.

---

## Animation Test

> **Location in add-on**: **2. Character & Animations** → **Animation Test** (collapsible; ACTIONS and NLA modes only)

Use it to check an animation before rendering. Select a row first.

- **Preview Action** (`sprite_render.test_action`):
  - Assigns the selected Action to the armature, turns off NLA, sets the timeline start / end and current frame to the row's range, applies the secondary Action if configured, and starts playback.
- **Preview NLA Strip** (`sprite_render.test_nla_strip`):
  - Turns NLA on, takes the active Action off, mutes every strip except the selected one, sets the timeline range and starts playback.
- **Stop Preview** (`sprite_render.stop_preview`):
  - Stops playback and **restores the scene**: Action (and slot), `use_nla`, NLA mute states, timeline range and current frame, resolution and camera shifts. Starting several previews in a row keeps the original state from before the first one.
  - If you stop playback yourself (Space / ESC), the button becomes **Restore Scene**; click it to put the scene back.
  - Starting Render All while a preview is active restores the scene first.
- **Frame Control**: frame counter (`Frame N (range start-end)`) and first / previous / next / last buttons.

![Preview NLA Strip](/_static/images/SRT_PreviewNLA.gif)

![Frame Navigation Controls](/_static/images/SRT_FrameControls.gif)

---

## Tips and Best Practices

- Keep your **Action** and **NLA** names descriptive (e.g. `walk_front`, `idle_side`, `attack_back`) to generate meaningful file names. Characters invalid in file names (like the `|` of Mixamo names) are replaced by `_`.
- In **ACTIONS** mode, disable the Actions you do not want to render to reduce render time.
- In **NLA** mode, use the list when you want to choose strips independently of their mute state in your working file.
- Use the **Animation Test** to check frame ranges and speed before long batches, and read the checklist in **5. Render Settings** before rendering.
