# Animations

This page explains how the **Sprite Render Tool** handles animations in the four modes: **ACTIONS**, **NLA**, **STATIC**, and **FRAME_RANGES**.

---

## Animation Modes

> **Location in add-on**: **Animations** tab

In the **Animations** section of the main panel you choose the mode via `Animation Mode`:
- **ACTIONS**: render from a curated list of Actions.
- **NLA**: render from NLA strips on the target armature.
- **STATIC**: render only the current frame.
- **FRAME_RANGES**: render specific frame ranges without rig or animation.

The selected mode controls how animations are collected and how the armature is prepared for playback.

---

## Common Settings

> **Location in add-on**: **Animations** tab → **Target Armature** field (always visible at the top of the tab)

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

> **Location in add-on**: **Animations** tab → **ACTIONS** mode selected

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

> **Location in add-on**: **Animations** tab → **NLA** mode selected

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

> **Location in add-on**: **Animations** tab → **STATIC** mode selected

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

## FRAME_RANGES Mode

> **Location in add-on**: **Animations** tab → **FRAME_RANGES** mode selected

### Frame Ranges List

The **FRAME_RANGES** mode allows rendering specific frame ranges without needing armature or animation data:
- Each `FrameRangeItem` has:
  - `name`: customizable name for the range (e.g., "Test Frames", "Sequence 1-10")
  - `frame_start`, `frame_end`: frame range to render
  - `enabled`: whether this range should be included in renders
- Allows rendering multiple custom ranges (e.g., frames 1-10, 20-30, 50-60)
- Useful for rendering specific sequences or test frames without setting up animations

**Frame Ranges Management**:
- You can add items with **Add Frame Range**
  - A new range is created with default name "Range {number}" based on the list size
  - Default `frame_start` and `frame_end` values are based on the scene's frame range (`scene.frame_start` and `scene.frame_end`)
- Remove the currently selected item with **Remove Frame Range**
- Automatic validation ensures `frame_end >= frame_start` for each range (automatically corrects if `frame_end < frame_start`)
- The list displays each range showing the name and frame range in the format "frame_start-frame_end"

### Rendering in FRAME_RANGES Mode

When `Render All` is started in **FRAME_RANGES** mode:
- The operator collects ranges from the `frame_ranges` list:
  - Only those with `enabled == True`
- For each range:
  - Iterates over all frames from `frame_start` to `frame_end` and over all configured cameras
  - Does not require armature or animation - renders static frames from the scene
- The range name can be used in `$animation` within the `output_template`

Use this mode for:
- Rendering specific frame sequences without setting up animations
- Testing individual frames or frame ranges
- Rendering static frames from different scene states

---

## Animation Test Panel

**ACTIONS** and **NLA** modes include an **Animations Test** subpanel, controlled by `show_section_animations_test`. **Note**: **FRAME_RANGES** mode does not have a test panel, as it does not require animation or armature.

![Animation Test Expanded](/_static/images/SRT_AnimationTest_Expanded.png)

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


