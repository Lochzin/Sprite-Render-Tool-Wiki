# Animations

This page explains how the **Sprite Render Tool** handles animations in the four modes: **ACTIONS**, **NLA**, **STATIC**, and **FRAME_RANGES**.

![Animations tab with the action list](/_static/images/SRT_AnimationTab.png)

---

## Animation Modes

> **Location in add-on**: **Animations** tab

Choose the mode with `Animation Mode`:
- **Use Actions** (ACTIONS, default): render from a list of Actions.
- **Use NLA** (NLA): render from NLA strips of the target armature.
- **Static Render** (STATIC): render only the current frame.
- **Frame Ranges** (FRAME_RANGES): render specific frame ranges without rig or animation.

**Changing the mode, or selecting an item in a list, does not change your scene** while no preview is active. The scene is only touched by the **Preview** buttons and by Render All, and both put it back afterwards (see [Render](Render.md)).

**Live preview.** While a preview is active, selecting another Action / NLA Strip in the list switches the preview at once, and editing the selected item's `Start Frame` / `End Frame` updates the timeline start / end instantly (the current frame is kept inside the new range).

---

## Common Settings

> **Location in add-on**: **Animations** tab, below `Animation Mode`

- `Armature` (`target_armature`): the armature whose animations are rendered. It can be set here or in the **Setup** tab (**Armature** section; it is the same setting), and is shown in **ACTIONS**, **NLA** and **FRAME_RANGES** modes (it is required in the first two, where the checklist reports an error without it; in FRAME_RANGES it is only used to warn about its active Action). Only armature objects can be picked.
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

> **Location in add-on**: **Animations** tab → `Animation Mode` = **Use Actions**

Each row (`ActionItem`) has:
- `Action`: the Action name, chosen with a searchable field of the Actions of the file.
- `Start Frame`, `End Frame`.
- Enabled checkbox.
- When **Sync Secondary Armature** is on (see below), each row also has:
  - `Sync Secondary`: play the secondary Action during this animation.
  - `Secondary Armature`: only with **Different Armature per Animation** on (empty = the shared `Armature`).
  - `Secondary Action`: the Action played by the secondary armature. It must have **the same frames** as the main Action (no loop or clamp is done).
  - A red line tells what is missing (no armature, no Action, the secondary armature is the main one, the Action has no object slot).

### Sync Secondary Armature

> **Location in add-on**: **Animations** tab → **Use Actions** → checkbox below `Armature`

A second armature (for example the rider of a horse) plays its own Action together with the main one, in the preview and in Render All. The checkbox is off by default; ticking it opens its settings:

- `Armature`: the secondary armature, **the same for every animation**.
- `Prefix`: the rule to find the secondary Action of each row: **secondary name = prefix + main name**. Prefix `Rider`: `Idle` → `RiderIdle`, `Gallop` → `RiderGallop`.
  - The exact name is tried first. If it does not exist, the names are compared after the **Clean Action Names** rules (the `Armature|` / `Armature.001|` prefix and `|mixamo.com|Layer0` suffix of FBX/Mixamo are ignored, spaces = `_`), so `Armature|Gallop` finds `Armature.001|RiderGallop|mixamo.com|Layer0`. That second match is used only if exactly one Action fits.
- `Different Armature per Animation` (off by default): hides the shared `Armature` and shows a `Secondary Armature` field on each row instead, for scenes where the animations do not all use the same secondary armature.

With the checkbox on, **Detect Actions does everything at once**: it adds the Actions and, for every row whose secondary Action is found, turns `Sync Secondary` on and sets the `Secondary Action`. The rows that are secondary Actions themselves (`RiderGallop`...) are **disabled**, since rendering them on the main armature makes no sense. Rows without a match are left as they are. Running Detect Actions again on an existing list fills it too.

With the checkbox off, the render and the preview ignore Sync Secondary (the rows keep their settings).

![Sync Secondary Armature ticked: secondary Armature, Prefix, and the row's Sync Secondary / Secondary Action](/_static/images/SRT_AnimationTab_SyncSecondary.png)

**Detect Actions** (`sprite_render.detect_actions`):
- **Adds** the Actions of the file that are not in the list yet. Existing rows keep their frame range and enabled state.
- Skips Actions that cannot animate an object (lights, materials, shape keys...). With slotted Actions (Blender 4.4+) an Action is kept when at least one of its slots targets an object.
- **Static poses are added disabled**: an Action of 1 to 2 frames (for example the T-pose that comes with an FBX) is listed with start = end and unchecked. Tick it if you really want to render it.
- The range comes from `action.frame_range` (start rounded down, end rounded up).
- A message reports how many were added (and how many static poses were added disabled) and warns if some rows point to Actions that no longer exist.

![Detect Actions](/_static/images/SRT_DetectActions.gif)

![Action list after Detect Actions](/_static/images/SRT_ActionsList.png)

### Rendering in ACTIONS Mode

When **Render All** runs in ACTIONS mode:
- Only enabled rows are rendered, each through every camera of the list.
- At the start of **every** animation / camera pair, the Action is assigned to the `Armature` and `use_nla` is turned off, so the Action drives the pose. This includes the first camera of each animation and setups with a single camera.
- With Blender's slotted Actions, if the armature has no Action Slot after the assignment, the first suitable slot is used.
- An Action that does not exist is reported as a warning and its images are counted as failed (the checklist normally stops this before the render starts).
- **Sync Secondary**: for an entry with it on, the `Secondary Action` is assigned to the secondary armature at the start of every animation / camera pair (the slot is picked as above, and `use_nla` is turned off on it). An entry without Sync Secondary renders the secondary armature as you left it (it is put back if a previous animation changed it). If the secondary Action cannot be used (no armature, no Action, no object slot) the render shows one warning for that animation and renders it without the secondary Action. Both armatures are restored at the end. Sync Secondary is only used in **Use Actions** mode (for NLA, see the horse-and-rider workflow in the Guides).

> **Tip**: if an Action is detected but does not play, check the **Action Slot** of the armature in **Properties** → **Object Properties** → **Animation**.

---

## NLA Mode

> **Location in add-on**: **Animations** tab → `Animation Mode` = **Use NLA**

Each row (`NLAItem`) has:
- `Strip Name`: the name of the NLA strip.
- `Track Name`: the track that holds it (optional; it tells apart strips with the same name).
- `Start Frame`, `End Frame`, enabled checkbox.

**Detect NLA Strips** (`sprite_render.detect_nla_strips`):
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

> **Location in add-on**: **Animations** tab → `Animation Mode` = **Static Render**

- There is no animation list and no armature is needed.
- The add-on renders **only the current frame** of the scene.
- The animation name is `STATIC` (usable in `$animation` and in the Animation folder).

Use this mode for thumbnails, key poses and single-frame renders.

---

## FRAME_RANGES Mode

> **Location in add-on**: **Animations** tab → `Animation Mode` = **Frame Ranges**

Renders specific frame ranges without armature or animation data. **It renders the scene as it is**: no Action or NLA strip is applied, so whatever is active on the armature plays in every range. If the `Armature` has an active Action, the checklist shows a warning with its name.

- Each row (`FrameRangeItem`) has an editable name (also in the list), start frame, end frame and a checkbox.
- **Add** (`+`) creates a row named `Range N`, with the scene's frame range as the default range. **Remove** (`-`) deletes the selected one.
- The end frame is never lower than the start frame: changing one pushes the other along.
- The range name is the `$animation` value (and the Animation folder name).
- **Test Frame Count** works in this mode too.

---

## Animation Test

> **Location in add-on**: **Animations** tab → **Animation Test** (collapsible; ACTIONS and NLA modes only)

Use it to check an animation before rendering. Select a row first.

- **Preview Action** (`sprite_render.test_action`):
  - Assigns the selected Action to the armature, turns off NLA, sets the timeline start / end and current frame to the row's range, applies the secondary Action if Sync Secondary is on (same rules as the render; a row without it shows the secondary armature as you left it), and starts playback. If the timeline is already playing, previewing another item keeps it playing (it never toggles playback off).
- **Preview NLA Strip** (`sprite_render.test_nla_strip`):
  - Turns NLA on, takes the active Action off, mutes every strip except the selected one, sets the timeline range and starts playback.
- **Stop Preview** (`sprite_render.stop_preview`):
  - Stops playback and **restores the scene**: Action (and slot), `use_nla`, NLA mute states, timeline range and current frame, resolution and camera shifts. Starting several previews in a row keeps the original state from before the first one.
  - If you stop playback yourself (Space / ESC), the button becomes **Restore Scene**; click it to put the scene back.
  - Starting Render All while a preview is active restores the scene first.
- **Frame Control**: frame counter (`Frame N (range start-end)`) and first / previous / next / last buttons.

![Preview NLA Strip](/_static/images/SRT_PreviewNLA.gif)

![Frame Navigation Controls](/_static/images/SRT_FrameControls.gif)

![Animation Test expanded with Preview Action and Frame Control](/_static/images/SRT_AnimationTest_Expanded.png)

---

## Tips and Best Practices

- Keep your **Action** and **NLA** names descriptive (e.g. `walk_front`, `idle_side`, `attack_back`) to generate meaningful file names. Characters invalid in file names (like the `|` of Mixamo names) are replaced by `_`.
- In **ACTIONS** mode, disable the Actions you do not want to render to reduce render time.
- In **NLA** mode, use the list when you want to choose strips independently of their mute state in your working file.
- Use the **Animation Test** to check frame ranges and speed before long batches, and read the checklist in the **Render** tab before rendering.
