# Future Features

This page lists planned features and improvements for the **Sprite Render Tool** that are not yet implemented but are on the roadmap.

---

## Planned Features

### Animation Features

- **Sub-Actions Mode**: Support for Blender's sub-actions feature (introduced in Blender 4.4). This new animation mode will allow users to work with sub-actions, which provide a way to organize and manage complex animation hierarchies within a single action. This feature will complement the existing ACTIONS, NLA, STATIC, and FRAME_RANGES modes, providing more flexibility for advanced animation workflows.

- **Secondary Armature Sync**: Complete implementation of the secondary armature synchronization feature. Currently, the UI has placeholders for `sync_secondary`, `secondary_armature`, and `secondary_action`, but the functionality is not yet fully implemented.

### Camera Setup Features

- **Saved Camera Presets**: the add-on already has the ready-made presets, the Custom preset (N cameras in 360 degrees) and `Elevation` / `Target Height` / `Distance`. Still planned:
  - Creating and saving your own presets with free camera angles for frequently used setups
  - Preset sharing and import/export
  - This will streamline the workflow for users who frequently work with custom camera arrangements

### UI/UX Improvements

- **Contextual Help Links**: every property and operator already has a tooltip, and the Project & Output, Light Pivot, Cameras, Animations and Render Settings sections have a help button. Still planned:
  - Help buttons that open the exact section of the documentation
  - Documentation buttons that open the wiki in the language of Blender's interface (today they always open English)

### Output Features

- **Normal Maps Rendering**: Option to render normal maps simultaneously with the regular render. This will allow users to generate both the standard sprite images and their corresponding normal maps in a single render pass, ensuring perfect alignment and consistent lighting between the two outputs.

- **Multiple Resolution Support**: Support for rendering multiple resolutions per camera or multiple resolutions for the same camera. This feature will allow users to generate sprites at different resolutions (e.g., 1x, 2x, 4x) in a single render batch, which is useful for games that need sprites at multiple quality levels or for different display densities.

---

## Feature Requests

If you have suggestions for features you'd like to see, please consider:

- Opening an issue on the project repository: [GitHub Issues](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/issues)
- Joining the community discussions: [GitHub Discussions](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/discussions)
- Contacting the developer directly
- Contributing to the project

---

**Note**: This is a living document. Features may be added, removed, or reprioritized based on user feedback and development priorities.

