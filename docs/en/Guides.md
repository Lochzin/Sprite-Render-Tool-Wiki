# Guides and Workflows

This page is the starting point for **doing things** with the Sprite Render Tool: a complete first-render guide and seven ready-to-follow workflows. Every number, folder and image on this page comes from a real render made with add-on **0.3.12** in **Blender 5.1.2** (EEVEE, 256 × 256 px, to keep the tests fast). The field values are the ones used in the test, so you can reproduce each result and then adapt it to your own character.

> **About the examples.** The test characters are about 1.7 m tall, so the camera `Distance` and `Target Height` values are small (`3.2` and `0.85`). For a taller or smaller character, change those two values until the character fills the frame. The example output folder is `D:\Sprites\Render`; use any folder you like.

> **Light first.** Every workflow below assumes the **Light Pivot** step ([Basic Guide, step 1](#basic-guide)): the light is a **child** of the pivot Empty and the pivot is selected in the add-on. Otherwise the light stays still while the cameras turn and the sprites come out lit differently in each direction ([Workflow 7](#workflow-7-light-pivot-consistent-light-in-every-direction) shows the difference).

---

## Choosing the workflow

| Your situation | Use |
| --- | --- |
| It is my first time, I just want sprites out of one animation | [Basic Guide](#basic-guide), then [Workflow 1](#workflow-1-one-character-8-directions-one-looping-animation) |
| One character, one looping animation, 8 directions | [Workflow 1](#workflow-1-one-character-8-directions-one-looping-animation) |
| Several animations for a game engine (one folder per camera, short names) | [Workflow 2](#workflow-2-animation-set-for-a-game-engine) |
| Character and animations downloaded from Mixamo (FBX, dirty names, T-pose) | [Workflow 3](#workflow-3-mixamo-animations) |
| The animation is already arranged in the NLA editor, or I want to control the frame numbers | [Workflow 4](#workflow-4-nla-mode-with-a-combined-sequence) |
| A prop, an effect, a rig-less object, or "just give me frames 1 to 12" | [Workflow 5](#workflow-5-frame-ranges-without-a-rig-props-and-test-frames) |
| A mount with a rider, or any scene with **two armatures** | [Workflow 6](#workflow-6-horse-with-a-rider-two-armatures) |
| Any multi-direction set (**always**): attach the light to the Light Pivot | [Basic Guide, step 1](#basic-guide) and [Workflow 7](#workflow-7-light-pivot-consistent-light-in-every-direction) |

---

## Basic Guide

From zero to your first render. It uses a character with a few Actions, 4 cameras and one animation (`Running`).

### 0. Before you start

- Install and enable the add-on ([Installation](Installation.md)). The panel is in `3D Viewport > Sidebar (N) > Sprite Render`.
- Have a rigged character with at least one Action (or NLA strip).
- **Save the .blend file** if you keep the default `Output Folder` (`//sprites/`): a `//` path is relative to the saved file. Otherwise type an absolute folder, such as `D:\Sprites\Render`.

![Sprite Render panel: Render All and the icon tabs](/_static/images/SRT_Sidebar.png)

The **Render All** button is always at the top of the panel. The icon column on the left selects the tab: **Info**, **Setup**, **Cameras**, **Animations**, **Render**.

### 1. Light Pivot (light attached to the pivot)

The Light Pivot makes the light turn together with the cameras, so every direction is lit the same way. Do this **before** creating the cameras.

1. Add an **Empty** at the **same position as the character**. It is recommended that both sit at the **world center** (origin, `0, 0, 0`); the test uses `LightPivot` at the origin, where the character stands.
2. Make your light (`Sun`) a **child** of the Empty: select the light, then the Empty (active), `Ctrl+P` > **Object (Keep Transform)**. Aim the light as you want it for the **front** camera. You can add **as many lights as you want** as children of the same Empty; they all turn together with the cameras.
3. **Setup** tab > **Light Pivot** section: tick `Enable Light Pivot` and choose `Object` = `LightPivot`.

![Setup tab, Light Pivot section](/_static/images/SRT_LightPivot.png)

Checked in the test: with the light attached, the pivot turns from camera to camera (`0°, 90°, 180°, 270°` in the 4-camera preset) and the light turns with it. See [Workflow 7](#workflow-7-light-pivot-consistent-light-in-every-direction) for the result with and without the light attached.

### 2. Cameras (**Cameras** tab)

1. In the **Create Cameras** box choose the `Preset` that fits your game (how many directions you need). The test uses `4 Cameras - Front, Right, Back, Left`.
2. Adjust `Elevation`, `Rotation Offset`, `Target Height` and `Distance` for your character and your camera style. The test uses `10°`, `0°`, `0.85` and `3.2`.
   - `Elevation`: camera tilt (`0°` = level with the character; `30°`–`45°` = 3/4 or isometric view).
   - `Rotation Offset`: turns the camera ring around the pivot. If your character is rotated, use this value so the `Front` camera looks at the character's front.
   - `Target Height`: height of the point the cameras look at (aim at the middle of the character's body).
   - `Distance`: distance from the cameras to the pivot.
3. Click **Create Cameras**. The preset's cameras (in the test, `Camera_Front`, `Camera_Right`, `Camera_Back`, `Camera_Left`) appear in the scene and in the list **Cameras (render order)**.
4. Once created, changing `Elevation`, `Rotation Offset`, `Target Height` and `Distance` **moves the cameras in real time**: adjust while looking at the viewport, no need to create them again.

The cameras look at the Light Pivot (raised by `Target Height`); without a pivot they would look at the world origin. Each camera also gets its `Light Rotation` (`0°, 90°, 180°, 270°` here), which is what turns the pivot. The camera names are **world directions** (front = the camera on the `-Y` side), not the direction your character faces.

![Cameras tab](/_static/images/SRT_CameraTab.png)

### 3. Animations (**Animations** tab)

1. `Animation Mode` = `Use Actions` (default).
2. `Armature` = your character's armature.
3. Click **Detect Actions**. Every Action of the file is listed with its frame range. Static poses (1–2 frames, such as the T-pose of an FBX) are listed **disabled**.
4. Tick only the animations you want to render (in the test, `Running`, frames `1` to `22`). Use **Disable All**, then tick the ones you want. Use the Action names of **your** model.
5. Optional: turn on **Preview Action** to see the animation in the viewport. With the preview on, **selecting another animation in the list** switches the preview at once, and editing the selected animation's `Start Frame` / `End Frame` updates the timeline instantly.

![Animations tab](/_static/images/SRT_AnimationTab.png)

### 4. Output (**Setup** tab, **Project & Output**)

1. `Project Name` = `MyGame`, `Object Name` = `Enemy01`.
2. `Output Folder` = your folder (example: `D:\Sprites\Render`).
3. Leave `Output Name` = `$objectName_$animation_$frame` and **Create Folders**: `Object`, `Animation`, `Camera` ticked.
4. Read **First image will be saved as:** to confirm the real path of the first file.

![Setup tab: Project & Output](/_static/images/SRT_SetupTab.png)

### 5. Check (**Render** tab)

- Read the checklist (**Ready to render?**). A warning such as *Film > Transparent is off* has a **Fix** button; click it. **Render All** stays disabled while the checklist shows errors.
- `Resolution` X / Y = `256` / `256` for a quick test (use your final size later).

![Render tab](/_static/images/SRT_RenderTab.png)

### 6. Render

1. Click **Render All**. The dialog shows the number of images, the destination and the estimated time. Click **Render**.
2. Watch the progress bar at the top of the panel. **ESC** or **Cancel Render** stops after the current frame.
3. Blender is busy while each frame renders; this is normal.

![Confirmation dialog](/_static/images/SRT_ConfirmDialog.png)

### 7. The result

4 cameras × 22 frames = **88 images** (about 10 s in the test).

```
D:\Sprites\Render\
└─ Enemy01\
   └─ Running\
      ├─ Camera_Front\   Enemy01_Running_0001.png … Enemy01_Running_0022.png
      ├─ Camera_Right\   Enemy01_Running_0023.png … Enemy01_Running_0044.png
      ├─ Camera_Back\    Enemy01_Running_0045.png … Enemy01_Running_0066.png
      └─ Camera_Left\    Enemy01_Running_0067.png … Enemy01_Running_0088.png
```

Rows = cameras (front, right, back, left), columns = frames 1, 7, 13 and 19 of each camera:

![Result of the Basic Guide: 4 cameras, frames 1, 7, 13 and 19](/_static/images/workflows/SRT_WF0_BasicGuide.png)

> The file numbers keep counting across cameras (`Camera_Right` starts at `0023`). To restart at `0001` in each camera folder, see [Workflow 2](#workflow-2-animation-set-for-a-game-engine). Notice that the character is lit the same way in every row: that is the Light Pivot at work.

When the render ends, the add-on puts back your Action, NLA, timeline, resolution, camera and Light Pivot (see [Render](Render.md)).

---

## Workflow 1: one character, 8 directions, one looping animation

**Goal.** The classic sprite set: one looping animation seen from 8 directions.

**When to use.** Top-down or isometric games that need 8-way characters, or any first complete export.

**Setup**

| Where | Field | Value |
| --- | --- | --- |
| **Setup** tab > **Light Pivot** | `Enable Light Pivot` / `Object` | ticked / `LightPivot` (the `Sun` is its child; do this **before** **Create Cameras**) |
| **Cameras** tab | `Preset` | `8 Cameras - 360 Degrees` |
| **Cameras** tab | `Elevation` / `Target Height` / `Distance` | `10°` / `0.85` / `3.2` |
| **Cameras** tab | **Create Cameras** | click |
| **Animations** tab | `Animation Mode` / `Armature` | `Use Actions` / your armature |
| **Animations** tab | **Detect Actions** | click, then keep only `Running` ticked (frames `1`–`22`) |
| **Setup** tab | `Project Name` / `Object Name` | `MyGame` / `Enemy01` |
| **Setup** tab | `Output Name` and **Create Folders** | defaults |
| **Render** tab | `Resolution` | `256` × `256` |

Click **Render All**: 8 cameras × 22 frames = **176 images** (20.6 s in the test).

**Result**

```
D:\Sprites\Render\
└─ Enemy01\
   └─ Running\
      ├─ Camera_Front\        Enemy01_Running_0001.png … 0022.png
      ├─ Camera_FrontRight\   Enemy01_Running_0023.png … 0044.png
      ├─ Camera_Right\        Enemy01_Running_0045.png … 0066.png
      ├─ Camera_BackRight\    Enemy01_Running_0067.png … 0088.png
      ├─ Camera_Back\         Enemy01_Running_0089.png … 0110.png
      ├─ Camera_BackLeft\     Enemy01_Running_0111.png … 0132.png
      ├─ Camera_Left\         Enemy01_Running_0133.png … 0154.png
      └─ Camera_FrontLeft\    Enemy01_Running_0155.png … 0176.png
```

First frame of each direction (the camera order of the list is the render order):

![Workflow 1: the 8 directions, frame 1](/_static/images/workflows/SRT_WF1_EightDirections.png)

**Tips**

- The preset `8 Cameras - 360 Degrees` starts at the front and goes through `FrontRight`, `Right`, `BackRight`, `Back`, `BackLeft`, `Left`, `FrontLeft`. Use `Custom - N cameras in 360 Degrees` (field `Cameras`) for 4, 6, 12 or 16 directions.
- Preset names are **world directions**: `Camera_Front` sits on the `-Y` side of the scene. If your character looks toward `+X`, `Camera_Front` shows its side. Rotate the character, or turn on **Custom Output Names** (Cameras tab) and give each camera the name you want ([Workflow 2](#workflow-2-animation-set-for-a-game-engine)).
- Do a quick test first: **Render** tab > **Enable Frame Step** with a large `Step`. The **Test Frame Count** button reports in the Blender status bar / Info editor how many frames and images the setup will render, without rendering.

---

## Workflow 2: animation set for a game engine

**Goal.** Several animations, one folder per camera, short and predictable file names, and the frame counter starting at `0001` in each camera folder.

**When to use.** You import the sprites into an engine (Godot, Unity, GameMaker…) that reads one folder per animation and direction.

**Setup**

| Where | Field | Value |
| --- | --- | --- |
| **Setup** tab > **Light Pivot** | `Enable Light Pivot` / `Object` | ticked / `LightPivot` (the `Sun` is its child; do this **before** **Create Cameras**) |
| **Cameras** tab | `Preset` | `4 Cameras - Front, Right, Back, Left` (same `Elevation` / `Target Height` / `Distance` as before) |
| **Cameras** tab | `Custom Output Names` | ticked |
| **Cameras** tab | selected camera > `Output Name` | `Camera_Front` → `S`, `Camera_Right` → `E`, `Camera_Back` → `N`, `Camera_Left` → `W` |
| **Animations** tab | **Detect Actions** | keep `Running`, `Walking` and `Strafe_Left` ticked |
| **Setup** tab | `Project Name` / `Object Name` | `IronHorse` / `Enemy01` |
| **Setup** tab | `Output Name` | `$animation_$frame` (no `$camera`: the camera folder already separates the files) |
| **Setup** tab | **Create Folders** | `Object` ✔, `Animation` ✔, `Camera` ✔, `Project` ✘ |
| **Setup** tab | `Restart Frame Numbering Per Camera` | ticked |

Check **First image will be saved as:** before rendering. Result: 3 animations × 4 cameras = **348 images** (40.8 s).

**Result**

```
D:\Sprites\Render\
└─ Enemy01\
   ├─ Running\
   │  ├─ S\   Running_0001.png … Running_0022.png
   │  ├─ E\   Running_0001.png … Running_0022.png
   │  ├─ N\   Running_0001.png … Running_0022.png
   │  └─ W\   Running_0001.png … Running_0022.png
   ├─ Strafe_Left\
   │  ├─ S\   Strafe_Left_0001.png … Strafe_Left_0033.png
   │  └─ E, N, W (same pattern)
   └─ Walking\
      ├─ S\   Walking_0001.png … Walking_0032.png
      └─ E, N, W (same pattern)
```

Frame 8 of every animation (rows) from every camera (columns S, E, N, W):

![Workflow 2: three animations, four directions](/_static/images/workflows/SRT_WF2_GameSet.png)

**Tips**

- **Without** `Restart Frame Numbering Per Camera` the counter continues across the cameras of the same animation. In a second test with only `Walking` and the option off, the folders were `S` `0001`–`0032`, `E` `0033`–`0064`, `N` `0065`–`0096` and `W` `0097`–`0128`. With the option on, every folder starts at `0001`.
- The option only works while the **Camera** folder is ticked, and it only matters when the template has **no** `$camera`. If `$camera` is in the template, the number is the timeline frame itself (see [Workflow 4](#workflow-4-nla-mode-with-a-combined-sequence)).
- The checklist blocks the render if two animation/camera pairs would write the same files (collision), so you cannot overwrite your own sprites by accident.
- With **Custom Output Names** the custom name is what goes into the camera folder and into `$camera`.

---

## Workflow 3: Mixamo animations

**Goal.** Render a Mixamo character with several Mixamo animations, even though the imported Actions have unusable names and the FBX brings a static T-pose.

**When to use.** Your character (`Enemy01.fbx`) and animations (`Running.fbx`, `Walking.fbx`, `Strafe Left.fbx`, `Pistol Kneeling Idle.fbx`) were downloaded from Mixamo with the same skeleton.

**Setup**

1. `File > Import > FBX`: import the character, then each animation FBX. Every animation FBX brings its own armature (`Armature.001`, `.002`…).
2. Delete the extra armatures (keep the character's one). The Actions stay in the file (the importer gives them a fake user) and work on the character because the bone names are the same.
3. **Rename the Actions** before using the add-on. In the test, Blender named them `Armature.001|mixamo.com|Layer0`, `Armature.002|mixamo.com|Layer0`… (the name of the animation is **not** kept). Rename them in `Outliner > Blender File > Actions` (double-click) to `Running`, `Walking`, `Strafe_Left`, `Pistol_Kneeling_Idle`.
4. Add-on: **Setup** tab > **Light Pivot**: `Enable Light Pivot` ticked and `Object` = `LightPivot` (the `Sun` is its child, see the [Basic Guide](#basic-guide)). Then `Preset` `2 Cameras - Front, Back` (`10°` / `0.85` / `3.2`), `Animation Mode` `Use Actions`, `Armature` = the character's armature, **Detect Actions**.
5. **Detect Actions** lists 5 Actions: the four animations enabled, and the T-pose (`1` frame) **disabled**. Leave the T-pose off.
6. **Setup** tab: tick **Clean Action Names** (harmless once the names are clean). **Render** tab: `Enable Frame Step` with `Step` = `6` (only to keep this test small).

Result: 72 images (8.1 s).

```
D:\Sprites\Render\
└─ Enemy01\
   ├─ Pistol_Kneeling_Idle\
   │  ├─ Camera_Front\  Enemy01_Pistol_Kneeling_Idle_0001.png … 0020.png
   │  └─ Camera_Back\   Enemy01_Pistol_Kneeling_Idle_0021.png … 0040.png
   ├─ Running\          Camera_Front (0001–0004), Camera_Back (0005–0008)
   ├─ Strafe_Left\      Camera_Front (0001–0006), Camera_Back (0007–0012)
   └─ Walking\          Camera_Front (0001–0006), Camera_Back (0007–0012)
```

Rows: `Running`, `Walking`, `Strafe_Left`, `Pistol_Kneeling_Idle` (front camera, first 4 frames of each):

![Workflow 3: four Mixamo animations](/_static/images/workflows/SRT_WF3_Mixamo.png)

**What happens if you skip the renaming** (same file, real output):

| Option | Folder and file names |
| --- | --- |
| Raw names, **Clean Action Names** off | `Enemy01\Armature.001_mixamo.com_Layer0\Camera_Front\Enemy01_Armature.001_mixamo.com_Layer0_0001.png` |
| Raw names, **Clean Action Names** on | `Enemy01\Armature.001\Camera_Front\Enemy01_Armature.001_0001.png` |

**Tips and traps**

- **Clean Action Names** only removes the importer's `|mixamo.com|Layer0` suffix (and the `Armature|` prefix, and turns spaces into `_`). With Blender's FBX importer the real animation name is already lost, so you still get `Armature.001`: **rename the Actions yourself**.
- Rename **before** pressing **Detect Actions**. If you rename afterwards, the old list entries point to Actions that no longer exist: the checklist shows an error (*enabled action(s) not found*, with a **Fix** button that only disables them) and Detect Actions adds the new names **on top** of the old ones. Remove each stale row with the `-` button.
- The T-pose of an FBX (an Action of 1–2 frames) is listed disabled on purpose.
- Mixamo Actions start at frame `1`, so `Running` is `1`–`22` and `Walking` is `1`–`32`.

---

## Workflow 4: NLA mode with a combined sequence

**Goal.** Use animations already arranged on the timeline of the NLA editor, and keep **the timeline frame numbers** in the file names.

**When to use.** Your animations are NLA strips (with trimming, scale, repeat or a specific start frame), or you want to see in the file name which timeline frame the image belongs to.

**Setup in Blender (NLA editor).** On the character's armature (no active Action: push the Actions down), create:

| Track | Strip | Action | Frames |
| --- | --- | --- | --- |
| `Locomotion` | `Walk` | `Walking` | `1`–`32` |
| `Locomotion` | `Run` | `Running` | `33`–`54` (right after `Walk`) |
| `Extras` (track **muted**) | `Strafe` | `Strafe_Left` | `1`–`33` |

**Setup in the add-on**

| Where | Field | Value |
| --- | --- | --- |
| **Setup** tab > **Light Pivot** | `Enable Light Pivot` / `Object` | ticked / `LightPivot` (the `Sun` is its child; do this **before** **Create Cameras**) |
| **Cameras** tab | `Preset` | `4 Cameras - Front, Right, Back, Left` (`10°` / `0.85` / `3.2`) |
| **Animations** tab | `Animation Mode` / `Armature` | `Use NLA` / your armature |
| **Animations** tab | **Detect NLA Strips** | lists `Walk`, `Run` (enabled) and `Strafe` (**disabled**: its track is muted) |
| **Setup** tab | `Output Name` | `$animation_$camera_$frame` |
| **Render** tab | `Enable Frame Step` / `Step` | ticked / `3` |

Result: 2 animations × 4 cameras = **76 images** (8.7 s).

```
D:\Sprites\Render\
└─ Enemy01\
   ├─ Walk\
   │  ├─ Camera_Front\   Walk_Camera_Front_0001.png … Walk_Camera_Front_0031.png   (11 images)
   │  ├─ Camera_Right\   Walk_Camera_Right_0001.png … 0031.png
   │  ├─ Camera_Back\    …
   │  └─ Camera_Left\    …
   └─ Run\
      ├─ Camera_Front\   Run_Camera_Front_0033.png … Run_Camera_Front_0054.png     (8 images)
      └─ Camera_Right, Camera_Back, Camera_Left (same pattern)
```

Top row: `Walk`; bottom row: `Run` (front camera):

![Workflow 4: NLA strips Walk and Run](/_static/images/workflows/SRT_WF4_NLA.png)

**Tips**

- In NLA mode the name used for `$animation` and the animation folder is the **strip name** (`Walk`), not the Action name (`Walking`).
- Because the template has `$camera`, the number in the file is the **timeline frame**: `Run` starts at `0033`. Without `$camera` the add-on uses a counter that restarts at `0001` for every animation.
- **Detect NLA Strips** respects the mute state: muted tracks and strips are listed disabled. You can still tick one: the render un-mutes just that strip while it renders and puts the mutes back afterwards (checked in the test).
- The strip list is the **frame range of each strip** on the timeline. Each strip is rendered on its own (the other strips are muted while it renders), so two consecutive strips become two animations, not one long sequence.
- Your NLA state (mutes, `use_nla`, active Action) is restored when the render ends.
- With **Frame Step** the last frame of the range is skipped when the range does not fit the step (`Walk` `1`–`32`, step `3`: last file is frame `31`).

---

## Workflow 5: Frame Ranges without a rig (props and test frames)

**Goal.** Render ranges of the timeline for objects that do not need an Action list: props, effects, objects animated by keyframes, or a quick test of a few frames.

**When to use.** The animation is on the timeline (an object with keyframes, a simulation…) and you do not want to use Actions or NLA. Also for a "test render" of one frame per camera.

**Setup.** In the test, the object `Prop` (a monkey head) has keyframes: it spins on Z in frames `1`–`13` and bounces in `14`–`24`.

| Where | Field | Value |
| --- | --- | --- |
| **Setup** tab > **Light Pivot** | `Enable Light Pivot` / `Object` | ticked / `LightPivot` (the `Sun` is its child; do this **before** **Create Cameras**) |
| **Cameras** tab | `Preset` | `4 Cameras - Front, Right, Back, Left`; `Elevation` `10°`, `Target Height` `1.0`, `Distance` `6.0` |
| **Animations** tab | `Animation Mode` | `Frame Ranges` (the `Armature` field is not needed) |
| **Animations** tab | `+` (Add Frame Range) | three times; edit `Name`, `Frame Start`, `Frame End` of each |
| range 1 | | `Spin`, `1`, `12` |
| range 2 | | `Bounce`, `14`, `24` |
| range 3 | | `Test`, `7`, `7` (single frame; leave it disabled until you want a test render) |
| **Setup** tab | `Object Name` | `Prop` |

Render with `Spin` and `Bounce` enabled: 2 ranges × 4 cameras = **92 images** (10.0 s). Then disable both, enable `Test`, and render again: **4 images**, one per camera (0.5 s).

```
D:\Sprites\Render\
└─ Prop\
   ├─ Spin\
   │  ├─ Camera_Front\   Prop_Spin_0001.png … 0012.png
   │  ├─ Camera_Right\   Prop_Spin_0013.png … 0024.png
   │  ├─ Camera_Back\    Prop_Spin_0025.png … 0036.png
   │  └─ Camera_Left\    Prop_Spin_0037.png … 0048.png
   ├─ Bounce\            Camera_Front (0001–0011) … Camera_Left (0034–0044)
   └─ Test\              Camera_Front\Prop_Test_0001.png … Camera_Left\Prop_Test_0004.png
```

Rows: `Spin` (front), `Bounce` (front), and the 4 `Test` images (front, right, back, left):

![Workflow 5: Spin, Bounce and a one-frame test](/_static/images/workflows/SRT_WF5_FrameRanges.png)

**Tips**

- In this mode **no Action or NLA strip is applied**: the scene is rendered exactly as it evaluates at those frames. The panel says so (*Renders the scene as it is*). If a rigged object still has an active Action, that Action decides the pose.
- The `+` button copies the scene frame range into the new entry; edit the numbers afterwards.
- A one-frame range (`Frame Start` = `Frame End`) is the fastest way to check the cameras, framing, light and output names with real files.
- **Static Render** (also in `Animation Mode`) renders only the current frame, with the name `STATIC` for the animation.

---

## Workflow 6: horse with a rider (two armatures)

**Goal.** Render a set where **two armatures** move together (a horse and a rider) with 8 directions.

**When to use.** Mounts, vehicles with a driver, a character with a separate rigged weapon or pet.

**What the add-on does with two armatures.** The add-on applies Actions/strips only to the armature in the `Armature` field. The second armature keeps whatever it already has. (The **Sync Secondary** option of the Actions list is shown as *not implemented*; it is only used by the preview.) Three facts verified in the test scene (`Horse_Armature` + `Rider_Armature`):

- **Detect Actions lists every object Action of the whole file**: `Gallop`, `GallopFast`, `Idle` of the horse **and** `RiderGallop`, `RiderGallopFast`, `RiderIdle` of the rider. Untick the ones you do not want (**Disable All**, then tick, or use the `-` button).
- In **Use Actions** mode with `Armature` = `Horse_Armature`, the horse gallops but the rider **keeps its own active Action (`RiderIdle`)** for every frame. It is not synchronized.
- The reliable solution is **NLA mode** with both armatures arranged identically on the timeline.

**Setup in Blender (NLA editor).** Give **both** armatures the same strips at the same frames, in one track each, and clear the active Action of both armatures (push the Actions down):

| Strip | Horse (`Horse_Armature`) | Rider (`Rider_Armature`) | Frames |
| --- | --- | --- | --- |
| `Gallop` | `Gallop` | `RiderGallop` | `1`–`17` |
| `GallopFast` | `GallopFast` | `RiderGallopFast` | `20`–`36` |
| `Idle` | `Idle` | `RiderIdle` | `40`–`105` |

**Setup in the add-on**

| Where | Field | Value |
| --- | --- | --- |
| **Setup** tab > **Light Pivot** | `Enable Light Pivot` / `Object` | ticked / `LightPivot` (the `Sun` is its child; do this **before** **Create Cameras**) |
| **Cameras** tab | `Preset` | `8 Cameras - 360 Degrees`; `Elevation` `15°`, `Target Height` `1.3`, `Distance` `6.0` |
| **Animations** tab | `Animation Mode` / `Armature` | `Use NLA` / `Horse_Armature` (the **horse**, not the rider) |
| **Animations** tab | **Detect NLA Strips** | lists the three strips of the horse; untick `Idle` |
| **Setup** tab | `Project Name` / `Object Name` | `MyGame` / `HorseRider` |

Render: 2 animations × 8 cameras × 17 frames = **272 images** (34.5 s).

```
D:\Sprites\Render\
└─ HorseRider\
   ├─ Gallop\
   │  ├─ Camera_Front\        HorseRider_Gallop_0001.png … 0017.png
   │  ├─ Camera_FrontRight\   HorseRider_Gallop_0018.png … 0034.png
   │  ├─ Camera_Right\        0035 … 0051
   │  ├─ Camera_BackRight\    0052 … 0068
   │  ├─ Camera_Back\         0069 … 0085
   │  ├─ Camera_BackLeft\     0086 … 0102
   │  ├─ Camera_Left\         0103 … 0119
   │  └─ Camera_FrontLeft\    0120 … 0136
   └─ GallopFast\             same 8 camera folders, HorseRider_GallopFast_0001 … 0136
```

Rows 1–2: the first frame of `Gallop` in each direction. Row 3: `GallopFast` from the front camera (frames 1, 6, 11, 16):

![Workflow 6: horse with rider, 8 directions](/_static/images/workflows/SRT_WF6_HorseRider.png)

**Tips and traps**

- **Always clear the rider's active Action** when you use NLA. If the rider keeps an active Action (`RiderIdle`) next to its NLA strips, the active Action is evaluated on top and the rider keeps the idle pose (measured in the test: the pose of the rider at frame 5 is the idle pose, not the gallop).
- The strips of the two armatures must start at the same frames: the rider is not driven by the add-on, it just follows the timeline while the add-on moves the horse's strips.
- Detect NLA Strips only reads the **target** armature. Pick the one that has the strips you want to list.
- If you only need the horse (or the rider keeps one pose), **Use Actions** is enough: `Armature` = `Horse_Armature`, untick the three `Rider…` Actions.
- Both armatures are restored when the render ends (the test left both with the strips and without active Actions exactly as before).

---

## Workflow 7: Light Pivot, consistent light in every direction

**Goal.** Make the light look the same from every camera, as if it were attached to the camera. **This is not optional**: every workflow above assumes it.

**When to use.** Always, for any set with more than one direction.

**Setup.** Exactly [Basic Guide, step 1](#basic-guide): `LightPivot` Empty at the center, `Sun` as its child, `Enable Light Pivot` ticked and `Object` = `LightPivot`; then **Create Cameras** (`8 Cameras - 360 Degrees`, `15°`, `1.3`, `6.0`). Each camera gets a `Light Rotation` (Z) of `0°, 45°, 90° … 315°`. `Animation Mode` = `Static Render` here, only to get one frame per camera quickly.

**Light attached vs light loose.** Same scene, same cameras, same frame, 8 images each time (about 1 s). In each pair the left image has the `Sun` **loose** (not a child of the pivot) and the right image has it **attached**:

![Workflow 7: Sun loose (left) and attached to the Light Pivot (right), same camera](/_static/images/workflows/SRT_WF7_LightPivot.png)

Measured in the test (the light's world rotation around Z at each camera):

| Camera | Pivot rotation | `Sun` loose | `Sun` attached |
| --- | --- | --- | --- |
| `Camera_Front` | `0°` | `-26°` | `-26°` |
| `Camera_Right` | `90°` | `-26°` | `64°` |
| `Camera_Back` | `180°` | `-26°` | `154°` |
| `Camera_Left` | `270°` | `-26°` | `-116°` |

```
D:\Sprites\Render\
└─ HorseRider\
   └─ STATIC\
      ├─ Camera_Front\   HorseRider_STATIC_0001.png
      ├─ Camera_FrontRight\ … 0002
      └─ … Camera_FrontLeft\ HorseRider_STATIC_0008.png
```

**Tips and traps**

- **The trap.** If `Enable Light Pivot` is ticked and `Object` is set, but the light is **not a child** of the pivot, the pivot still turns for every camera (the add-on does its part) but nothing is lit by it: the light stays fixed (`-26°` in all rows above) and the sprites come out lit differently from each direction. The checklist does not warn about it. Check the outliner: the `Sun` must be listed under `LightPivot`.
- If `Enable Light Pivot` is ticked but **no `Object` is chosen**, nothing is rotated and the checklist does not warn either.
- With **Create Cameras**, the cameras look at the pivot raised by `Target Height`. If you already have cameras, use **Detect Cameras**: it recalculates the `Light Rotation` of each one.
- The pivot rotation is put back when the render ends (the test pivot returned to `0°, 0°, 0°`).
- For a light that also needs to tilt (not only turn around Z), tick `Enable Full Rotation (XYZ)` and edit the `Light Rotation (XYZ)` of each camera.

See also [Lighting](Lighting.md).

---

## Common problems

Only things that were observed while building these workflows.

| Problem | Cause and solution |
| --- | --- |
| The folders and files are called `Armature.001_mixamo.com_Layer0` | Mixamo names. Rename the Actions in the Outliner (Blender File view) **before** Detect Actions. **Clean Action Names** alone leaves `Armature.001` ([Workflow 3](#workflow-3-mixamo-animations)). |
| I renamed an Action and the checklist shows *enabled action(s) not found* | The list still has the old name. Remove the stale rows with `-` (or **Fix**, which only disables them) and run **Detect Actions** again. |
| **Detect Actions** added Actions I do not want (other characters, the rider) | It lists every object Action of the file. Use **Disable All** and tick the ones you want ([Workflow 6](#workflow-6-horse-with-a-rider-two-armatures)). |
| The T-pose is not in the list as enabled | Actions of 1–2 frames are listed disabled on purpose. |
| The second armature (rider) stays still or keeps its idle pose | Only the `Armature` field is animated. Use NLA with both armatures arranged the same, and clear the active Action of the second ([Workflow 6](#workflow-6-horse-with-a-rider-two-armatures)). |
| File numbers do not restart in each camera folder | Tick `Restart Frame Numbering Per Camera` (needs the **Camera** folder) ([Workflow 2](#workflow-2-animation-set-for-a-game-engine)). |
| With **Frame Step** the last frame is missing | The range is walked from the first frame in steps; a last frame that does not fit the step is skipped (`1`–`32` step `3` ends at `31`). |
| One side of the character is always dark, or each direction is lit differently | The light is not attached to the Light Pivot (or the pivot is not enabled / chosen). Make the `Sun` a **child** of the pivot Empty and select it in **Setup > Light Pivot** ([Workflow 7](#workflow-7-light-pivot-consistent-light-in-every-direction)). The add-on does not warn about it. |
| `Camera_Front` shows my character from the side | Camera names are world directions (`-Y` = front), not the character's facing. Rotate the character or use **Custom Output Names**. |
| The character is tiny in the frame | Lower `Distance` and set `Target Height` to about half the character's height; for a 1.7 m character the test used `3.2` and `0.85`. |
| *Film > Transparent is off* | Click **Fix** in the checklist (sprites need an alpha channel; the add-on writes PNG, RGBA). |
| **Render All** is greyed out | The checklist has an error; the tooltip of the button shows the first one. |
| The `//sprites/` folder is rejected | A `//` folder is relative to the saved .blend. Save the file or type an absolute folder. |

Speed reference: about 0.12 s per image at 256 × 256 in EEVEE on the test machine. Use the dialog of **Render All** for the estimate on your scene.
