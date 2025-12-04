# FAQ

This page lists common questions about using the **Sprite Render Tool** and how to solve typical issues.

---

## General

**Q: Which Blender versions are supported?**  
**A:** The `bl_info` in the add‑on specifies Blender **5.0.0** as the minimum version. It is designed for Blender 5.x and later. The add-on was initially developed for Blender 4.0, so it may work (possibly even fully) on earlier versions, but this has not been tested and is not officially supported.

**Q: Where do I find the Sprite Render Tool panel?**  
**A:** After enabling the add‑on in Preferences, go to:  
`3D Viewport > Sidebar (N) > Sprite Render`.

---

## Cameras and Lighting

**Q: My renders look like they are coming from the wrong camera. What should I check?**  
**A:** Make sure:
- The **Cameras** list has the correct `Name` values (they must match existing camera objects).
- In the 3D Viewport, use **Test Cameras** to cycle through configured cameras and confirm which one is active.
- The scene camera is being set correctly by the add‑on (you should see the camera change when cycling).

**Q: Light does not rotate per camera, or looks wrong. How can I debug this?**  
**A:** Check the following:
- Ensure a **Light Pivot** object is set in the **Light Pivot** section.
- Verify `Enable Full Rotation (XYZ)` is set correctly:
  - Off: only Z axis is used.
  - On: full XYZ from the camera's `light_rotation` is applied.
- Make sure `Enable Light Pivot` is enabled in the **Light Pivot** section.

**Q: The Detect Cameras button does nothing. Why?**  
**A:** The **Auto-fill Light Rotations** operator requires:
- A valid **Light Pivot** object (otherwise it cancels with an error).
- At least one camera that is:
  - of type `CAMERA`
  - not hidden in viewport
  - not hidden for render  
Make sure you are on the correct View Layer and that the cameras are visible.

---

## Animations

**Q: Actions are not showing up in the list.**  
**A:** In **ACTIONS** mode:
- Click **Detect Actions**.
- The tool reads from `bpy.data.actions` and fills the list.
- If still empty, confirm that Actions exist in your file and are not stored in a different blend file or library.

**Q: NLA strips are not detected.**  
**A:** In **NLA** mode:
- Set a valid **Target Armature**.
- Make sure the armature has `animation_data` with NLA tracks and strips.
- Click **Detect NLA Strips**.
- If still empty, verify that your NLA strips are on the chosen armature and actually have Actions assigned.

**Q: The wrong animation plays during render.**  
**A:** Possible causes:
- In **ACTIONS** mode:
  - Check that the correct Action is enabled in the list.
  - Confirm its `frame_start` and `frame_end` cover the intended range.
- In **NLA** mode:
  - Verify the selected NLA strip in the list matches the strip you expect.
  - Use **Preview NLA Strip** to see if only that strip is active before rendering.

**Q: Preview Action / Preview NLA Strip doesn’t seem to play.**  
**A:** Check:
- Timeline playback:
  - Make sure the timeline is not paused by some other modal operator.
- `is_previewing` state:
  - When preview starts, the add‑on calls `bpy.ops.screen.animation_play()`.
  - Use **Stop Preview** if play got stuck or if another preview is running.

---

## Output and Files

**Q: Where are my images being saved?**  
**A:** The final path is built from:
- `scene.render.filepath` (cleaned by the add‑on), plus
- Optional folder levels (**Project/Object/Animation/Camera**), plus
- File name from `output_template` with placeholders:
  - `$projectName`, `$objectName`, `$animation`, `$camera`, `$frame`  
Check the **Output** section and your Render Properties to know exactly where files go.

**Q: I changed `Project Name` or `Object Name` but old images are still in the previous folder.**  
**A:** The add‑on does not move or delete old renders:
- New renders use your new settings to build new folders/filenames.
- You may need to clean up old directories manually if you want to avoid duplicates.

**Q: Filenames look strange or contain unexpected underscores.**  
**A:** The add‑on:
- Replaces characters that are invalid on common file systems: `<>:"|?*\/` with `_`.
- Uses `os.path.basename` on the template output to avoid nested paths in a single filename.
If you see extra `_`, it is likely sanitizing characters or removing accidental slashes in the template.

---

## Performance and Stability

**Q: Blender freezes while rendering. Is this normal?**  
**A:** The **synchronous** path (`execute`) will block the UI, especially on long batches. Use:
- The default **Render All** from the panel, which starts the **async** timer‑based flow, updating UI between frames and allowing cancellation.

**Q: How can I stop a long render batch?**  
**A:** You can cancel rendering in two ways:
- **Cancel Render button**: Click the **Cancel Render** button in the **Render Progress** section.
- **ESC key**: Press the **ESC** key at any time during rendering.
- Both methods set a cancellation flag, and rendering stops gracefully after the current frame is finished.

---

## Licensing

**Q: Can I redistribute the add‑on?**  
**A:** GPL compliance allows certain code redistributions under specific conditions, but:
- The **Commercial Distribution Terms** forbid redistributing the **purchased file as a commercial product**.
- Third‑party redistributions do **not** receive support or guaranteed updates.
Always read the `LICENSE.md` and **Licenca.md** page before redistributing anything.

**Q: Do my users need to buy the add‑on if I use it in my studio?**  
**A:** It depends on your license:
- Individual license: 1 user.
- Studio / Commercial: up to 5 users per license (extendable on request).  
For precise details and edge cases, refer to the official license text.

---

## Support and Community

**Q: Where can I get help or discuss the add-on with other users?**  
**A:** You can:
- Join the community discussions: [GitHub Discussions](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/discussions)
- Ask questions, share tips, and connect with other users

**Q: How do I report a bug or issue?**  
**A:** If you encounter a bug or have a technical issue:
- Open an issue on GitHub: [Report a Bug](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/issues)
- Please include details about your Blender version, what you were trying to do, and any error messages


