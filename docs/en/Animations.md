# Animations — Actions, NLA and Static

This page explains how the **Sprite Render Tool** handles animations in the three modes: **ACTIONS**, **NLA**, and **STATIC**.

---

## Animation Modes

In the **Animations** section of the main panel you choose the mode via `Animation Mode`:
- **ACTIONS**: render from a curated list of Actions.
- **NLA**: render from NLA strips on the target armature.
- **STATIC**: render only the current frame.

The selected mode controls how animations are collected and how the armature is prepared for playback.

---

## Common Settings

These apply across modes:
- `Target Armature` (`target_armature`):
  - The armature object whose animations will be rendered.
- `is_previewing`:
  - Internal flag used to know if an animation preview is currently playing.
- `custom_fps`:
  - Used by **Apply FPS** to override scene FPS during previews.

When `Animation Mode` changes to **NLA**, the add‑on:
- Clears the current `action` from `target_armature.animation_data` (if any).
- Ensures `use_nla` is enabled, so NLA is active.

---

## ACTIONS Mode

### Actions List

The **Actions** mode uses a custom list (`actions: CollectionProperty(type=ActionItem)`):
- Each `ActionItem` has:
  - `name`: the Action name in `bpy.data.actions`.
  - `frame_start`, `frame_end`: frame range to render.
  - `enabled`: whether this action should be included in renders.
  - `sync_secondary`, `secondary_armature`, `secondary_action`:
    - Designed to sync a second armature; partially implemented and marked as “not implemented” in the UI for now.

**Detect Actions** (`sprite_render.detect_actions`):
- Clears the current list.
- Loops over all `bpy.data.actions`.
- Adds one `ActionItem` per Action, with range based on `action.frame_range`.

You can also:
- Add items with **Add Action**.
- Remove the currently selected item with **Remove Action**.

The `actions_index` property:
- Tracks which item is selected in the UI list.
- Triggers `update_actions_index` when changed to apply the new Action to the armature and update the scene frame range.

### Rendering in ACTIONS Mode

When `Render All` is launched in **ACTIONS** mode:
- The operator collects animations from the `actions` list:
  - Only those with `enabled == True`.
- For each action:
  - Looks up the Action in `bpy.data.actions` using its name.
  - Assigns it to `target_armature.animation_data.action`.
  - Ensures `use_nla` is disabled, so the Action drives the pose directly.
- It then iterates over all frames from `frame_start` to `frame_end` and over all configured cameras.

The asynchronous render path (`invoke` + timer) uses the same logic when initializing each new animation.

---

## NLA Mode

### NLA Strips List

In **NLA** mode, the add‑on can either:
- Auto‑collect NLA strips directly from the armature, or
- Use a curated list `nla_strips: CollectionProperty(type=NLAItem)`.

Each `NLAItem` stores:
- `name`: strip name.
- `track_name`: NLA track name.
- `frame_start`, `frame_end`: range along the timeline.
- `enabled`: whether this strip should be rendered.

**Detect NLA Strips** (`sprite_render.detect_nla_strips`):
- Requires a valid `Target Armature` with `animation_data` and NLA tracks.
- Clears the existing `nla_strips` list.
- Loops through all NLA tracks and strips.
- Adds items for strips that have an `action`.
- Sets `enabled` based on whether the track and strip are muted.

You can also:
- Add items manually with **Add NLA Strip**.
- Remove the selected one with **Remove NLA Strip**.

The `nla_strips_index` property:
- Tracks which NLA strip is selected in the list.
- Triggers `update_nla_strips_index` to:
  - Mute all tracks/strips.
  - Unmute only the selected strip and its track.
  - Update scene frame range to the strip’s start/end.

### NLA Activation Helper

The static helper:
- `SPRITE_RENDER_OT_RenderAll.activate_nla_strip(obj, strip_name, track_name=None)`
- Mutes all strips, then unmutes exactly the strip with the given name (and optional track).
- Forces an object/view layer update when successful.

This function is used both for:
- Test previews (`test_nla_strip`), and
- Actual rendering in NLA mode.

### Rendering in NLA Mode

When `Render All` runs with **NLA** selected:
- Animations are collected via:
  - `collect_nla_animations(obj, settings)`
  - Either from the configured `nla_strips` list, or from the armature’s NLA if the list is empty.
- Each animation entry contains:
  - `strip_name`, `frame_start`, `frame_end`, `track_name`.
- Before rendering frames for a given animation:
  - The operator ensures `animation_data.use_nla = True`.
  - Calls `activate_nla_strip` to unmute just that strip.
- Then, as with Actions, it iterates over all frames and cameras.

The asynchronous render path uses the same sequence via its timer callback (`_render_next_frame`).

---

## STATIC Mode

In **STATIC** mode:
- There is no animation list.
- The add‑on renders **only the current frame** of the scene.

For directory creation, the add‑on treats the animation name as `"STATIC"`:
- This can still be used in `$animation` within the `output_template`.

Use this mode for:
- Thumbnails.
- Key poses.
- Single‑frame previews of a character or prop.

---

## Animation Test Panel

Both **ACTIONS** and **NLA** modes include an **Animations Test** subpanel, controlled by `show_section_animations_test`:

- **Preview Action** (`sprite_render.test_action`):
  - Applies the selected Action to `target_armature`.
  - Disables NLA usage.
  - Sets `frame_start`, `frame_end`, and current frame.
  - If secondary sync is enabled and configured, applies the secondary action to another armature.
  - Sets `is_previewing = True` and starts timeline playback (`bpy.ops.screen.animation_play()`).

- **Preview NLA Strip** (`sprite_render.test_nla_strip`):
  - Ensures the armature has `animation_data` and NLA enabled.
  - Mutes all strips, then unmutes only the selected one.
  - Sets frame range to the strip’s start and end.
  - Forces a view layer update.
  - Sets `is_previewing = True` and starts playback.

- **Stop Preview** (`sprite_render.stop_preview`):
  - Stops timeline playback if it is running.
  - Sets `is_previewing = False`.

The test panel also exposes:
- Frame navigator buttons (first, previous, next, last).
- `Custom FPS` + **Apply FPS** (`sprite_render.apply_fps`), which sets:
  - `scene.render.fps = custom_fps`
  - `scene.render.fps_base = 1.0`

---

## Tips and Best Practices

- Keep your **Action** and **NLA** names descriptive (e.g. `walk_front`, `idle_side`, `attack_back`) to generate meaningful filenames.
- In **ACTIONS** mode, disable any actions you do not want to render to reduce total render time.
- In **NLA** mode, use the curated `nla_strips` list when you want fine‑grained control over which strips are included, independent of their mute state in your working file.
- Use the **Animations Test** panel to verify frame ranges and animation playback speed before starting long render batches. 


