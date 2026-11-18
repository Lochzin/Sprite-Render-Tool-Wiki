# FAQ

This page lists common questions about using the **Sprite Render Tool** and how to solve typical issues.

---

## General

**Q: Which Blender versions are supported?**  
**A:** The `bl_info` in the add‑on specifies Blender **5.0.0** as the minimum version. It is designed for Blender 5.x and later. The add-on was initially developed for Blender 4.0, so it may work (possibly even fully) on earlier versions, but this has not been tested and is not officially supported.

**Q: Where do I find the Sprite Render Tool panel?**  
**A:** After enabling the add‑on in Preferences, go to:  
`3D Viewport > Sidebar (N) > Sprite Render`. It is one main panel with **Render All** at the top and side tab buttons (Info, Setup, Cameras, Animations, Render).

**Q: Can I use the add-on in Portuguese?**  
**A:** Yes. Set Blender's language to Portuguese (`Edit > Preferences > Interface > Language`) and the panels, tooltips and messages are shown in Portuguese. The documentation buttons still open the English wiki.

---

## Cameras and Lighting

**Q: My renders look like they are coming from the wrong camera. What should I check?**  
**A:** Make sure:
- The **Cameras (render order)** list has the right cameras. Rows in red are cameras that do not exist (the checklist offers **Remove them**).
- Use **Test Cameras**, or the camera icon of a row, to see through a configured camera.
- Remember that the list order is the render order.

**Q: Light does not rotate per camera, or looks wrong. How can I troubleshoot this?**  
**A:** Check the following:
- In the **Setup** tab (**Light Pivot** section), `Enable Light Pivot` is on and a pivot `Object` is set.
- `Enable Full Rotation (XYZ)` is set correctly: off uses only Z, on uses the full XYZ `Light Rotation` of the camera.
- Click **Test Cameras** (with the viewport in **Rendered** shading) and watch the pivot rotate; the rotation values are written to Blender's Info editor.
- Automatic light rotation is Z only; adjust it by hand for cameras at other heights (see [Lighting](Lighting.md)).

**Q: The Detect Cameras button does nothing. Why?**  
**A:** **Detect Cameras** needs:
- A **Light Pivot** object **only if `Enable Light Pivot` is on**. With the pivot enabled but no object set, it cancels with "Light pivot object is not set". With it off, no pivot is needed and every light rotation is 0.
- At least one camera of the current View Layer that is not hidden in the viewport and not disabled in the viewport or for render. If none qualifies, it shows a warning and leaves the list unchanged.

When it works it **adds** the new cameras and keeps your existing rows (order, `Output Name`, shift). The light rotation of the detected cameras is recalculated.

**Q: Create Cameras asks "Replace cameras?". Will it delete my cameras?**  
**A:** No. It only deletes the cameras that the add-on created in a previous run. Your own cameras are never deleted, even if they have a similar name (the new camera gets a `.001` suffix instead).

![Five cameras created around the character with the 5-camera preset](/_static/images/SRT_Scene_Cameras.png)

---

## Animations

**Q: Actions are not showing up in the list.**  
**A:** In **ACTIONS** mode click **Detect Actions** (or `+` and pick the Action by name). It adds the Actions of the file that can animate objects (not lights or materials). If it is still empty, confirm that Actions exist in your file and are not stored in a library.

**Q: Actions are detected but nothing happens when I try to preview or render them.**  
**A:** Check that an `Armature` is set in the **Animations** tab and that the row is enabled and not red. The add-on assigns the Action (and a suitable Action Slot) for you; if it still does not play, check the **Action Slot** of the armature in **Properties** → **Object Properties** → **Animation**.

**Q: NLA strips are not detected.**  
**A:** In **NLA** mode set an `Armature` with NLA tracks and click **Detect NLA Strips**. Only strips with an Action are added; strips of muted tracks come in as disabled.

**Q: The wrong animation plays during render.**  
**A:** The Action or strip is applied for every animation and camera. Check that the right rows are enabled, that their frame ranges are correct and that the checklist has no problems. Use **Preview Action / Preview NLA Strip** to see an animation alone.

**Q: Preview Action / Preview NLA Strip doesn't seem to play.**  
**A:** Make sure the timeline is not paused by another modal operator. If playback stopped (Space / ESC) the button becomes **Restore Scene**: click it to put the scene back, then start the preview again.

**Q: I used a preview and now my armature has another Action.**  
**A:** Click **Stop Preview** / **Restore Scene**. It restores the Action, NLA mute states, timeline range, current frame, resolution and camera shifts of before the first preview.

---

## Render

**Q: Render All is greyed out. Why?**  
**A:** The checklist in the **Render** tab has at least one error (or a render is already running). Hover over the button to see the first error, then use the **Fix** buttons.

**Q: What does the dialog before the render tell me?**  
**A:** The number of animations, cameras and images, the destination folder, the estimated time (only after a render has finished in this Blender session), how many existing files will be overwritten and any warnings. Click **Render** to start.

**Q: Does the render change my scene?**  
**A:** It changes things while it runs, and puts them back when it ends, is cancelled or fails: active Action and slot, `use_nla`, NLA mute states, timeline range, current frame, resolution (X, Y and %), camera shifts, scene camera, output path and Light Pivot rotation. See [Render](Render.md).

**Q: Blender freezes while rendering. Is this normal?**  
**A:** To a degree. **Render All** renders one image at a time with Blender's own render, which blocks the interface while each image renders. The progress bar, **Cancel Render** and **ESC** are handled **between** images. It is not really frozen: wait for the current image to finish.
- Lower the render samples / resolution, or use **Frame Step**, to speed up long batches.
- Ctrl+Z is blocked during a render and only one render can run at a time.

**Q: How can I stop a long render batch?**  
**A:** Press **ESC** or click **Cancel Render** (main panel, visible while rendering). The render stops after the current image and the scene is restored.

**Q: The panel says "rendering" but nothing is rendering.**  
**A:** Click **Cancel Render** to reset the state. The state is also reset when the add-on is enabled and when a file is loaded.

![Checklist with an error that blocks Render All](/_static/images/SRT_RenderChecklist_Error.png)

---

## Output and Files

**Q: Where are my images being saved?**  
**A:** Look at **First image will be saved as:** in the **Setup** tab (**Project & Output** section). The path is the `Output Folder` (default `//sprites/`, created automatically; relative to the .blend file, so save the file first), plus the optional folders (**Project / Object / Animation / Camera**), plus the file name from `Output Name`.

**Q: Render All says my Output Name has no `$frame`.**  
**A:** Without `$frame` every frame would overwrite the same file. Click **Add $frame** in the checklist, or add it with the `frame` button below the `Output Name` field.

**Q: The checklist reports an output name collision.**  
**A:** Two animation / camera pairs would write the same files. Add `$animation` and `$camera` to the `Output Name`, or turn on **Animation Folder** / **Camera Folder**.

**Q: I changed `Project Name` or `Object Name` but old images are still in the previous folder.**  
**A:** The add‑on does not move or delete old renders. New renders use the new settings. Clean up old folders manually if needed.

**Q: Filenames contain unexpected underscores.**  
**A:** Characters that are invalid on common file systems (`< > : " / \ | ? *`) are replaced by `_` in **file and folder names** (for example `Armature|mixamo.com|Layer0` becomes `Armature_mixamo.com_Layer0`), and Windows reserved names get a `_` prefix. See [Output](Output.md).

**Q: My Mixamo / FBX Actions have names like `Armature|Running|mixamo.com|Layer0`. Can I get clean folder names?**  
**A:** Yes. Turn on **Clean Action Names** (below **Create Folders**): the folder and file names become `Running`. The Actions are not renamed.

**Q: Each camera continues the numbering of the previous one. Can each start at 0001?**  
**A:** Yes. Without `$camera` in the `Output Name`, turn on **Camera Folder** and **Restart Frame Numbering Per Camera**.

**Q: Detect Actions added an Action but left it unchecked.**  
**A:** Actions of 1 to 2 frames (static poses such as the FBX T-pose) are added disabled. Tick the row if you want it.

**Q: Can I render to a Linux / macOS absolute path or a network path?**  
**A:** Yes. Absolute paths (`/home/user/sprites`) and UNC paths (`\\server\share`) are supported.

**Q: The checklist complains about the image format.**  
**A:** The add-on always writes `.png`. Use **File Format = PNG** and **Color = RGBA** in Output Properties, **Film > Transparent** in Render Properties and `Resolution %` = 100. Each item has a **Fix** button.

---

## Licensing

**Q: Can I redistribute the add‑on?**  
**A:** GPL compliance allows certain code redistributions under specific conditions, but:
- The **Commercial Distribution Terms** forbid redistributing the **purchased file as a commercial product**.
- Third‑party redistributions do **not** receive support or guaranteed updates.
Always read the `LICENSE.md` and the [License](License.md) page before redistributing anything.

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


