# Installation

This page provides detailed instructions on how to install and update the **Sprite Render Tool** in Blender.

---

## Requirements

- **Blender 5.0.0** or newer
- Add-on file: `Sprite Render Tool.zip`

---

## Initial Installation

### Step by Step

1. **Open Blender**
   - Launch Blender (version 5.0.0 or newer)

2. **Access Preferences**
   - Go to `Edit > Preferences...` (or `Blender > Preferences...` on macOS)
   - Click on the **Add-ons** tab in the sidebar menu

3. **Install the Add-on**
   - At the top of the Add-ons window, locate the **dropdown arrow** (▼) next to the tags button
   - Click the dropdown arrow to open the menu
   - Select **Install from disk...**
   - Navigate to the `Sprite Render Tool.zip` file
   - Select the file and click **Install Add-on**

4. **Enable the Add-on**
   - In the add-ons list, search for **Sprite Render Tool**
   - Check the checkbox next to the add-on name to enable it
   - The add-on is now installed and ready to use

5. **Locate the Panel**
   - The Sprite Render Tool panel will appear at:
     - `3D Viewport > Sidebar (N) > Sprite Render`

---

## Verifying Installation

After installation, you can verify that the add-on was installed correctly:

- **In the Add-ons panel:**
  - The add-on should appear in the list with a checked checkbox
  - You can see information about the add-on, including version and author

- **In the 3D Viewport:**
  - Open the sidebar by pressing `N` in the 3D Viewport
  - Look for the **Sprite Render** tab
  - You should see the main panel with all tabs (Info, Setup, Cameras, Animations, Render)

---

## Updating the Add-on

### Recommended Method: Uninstall and Reinstall

To avoid issues with duplicate versions, it is **highly recommended** to uninstall the old version before installing a new one:

1. **Uninstall the Old Version**
   - Go to `Edit > Preferences... > Add-ons`
   - Search for "Sprite Render Tool" in the list
   - Click the **Uninstall** button next to the add-on
   - This completely removes the old version

2. **Install the New Version**
   - Follow the **Initial Installation** steps above
   - Use the ZIP file from the new version

3. **Verify Installation**
   - Confirm that only one version of the add-on appears in the list
   - Verify that the panel works correctly

### ⚠️ Issues with Duplicate Versions

If you encounter bugs or strange behavior after an update, it may be that duplicate versions are installed:

**Solution:**
1. Go to `Edit > Preferences... > Add-ons`
2. Search for **all** instances of "Sprite Render Tool" in the list
3. Click **Uninstall** for **each** instance found
4. **Restart Blender** completely
5. Install the **most recent version** following the installation steps above

---

## Uninstallation

To completely remove the add-on:

1. Go to `Edit > Preferences... > Add-ons`
2. Search for "Sprite Render Tool" in the list
3. Click the **Uninstall** button
4. The add-on will be completely removed from Blender

**Note:** This only removes the add-on. Your project files and Blender settings are not affected.

---

## Troubleshooting

### The add-on doesn't appear in the list after installation

- Verify that you are using Blender 5.0.0 or newer
- Make sure the ZIP file is not corrupted
- Try reinstalling the add-on

### The panel doesn't appear in the 3D Viewport

- Verify that the add-on is enabled in `Edit > Preferences... > Add-ons`
- Make sure you are in the **3D Viewport** (not in other areas like Shader Editor or Animation)
- Press `N` to open the sidebar if it's closed
- Look for the **Sprite Render** tab in the sidebar

### Errors when loading the add-on

- Verify that you have the correct Blender version (5.0.0+)
- Make sure there are no duplicate versions installed
- Check the Blender console for specific error messages
- Try uninstalling and reinstalling the add-on

---

## Next Steps

After successful installation:

1. **Configure Your Project**
   - Read the [Basic Guide](index.md#basic-guide) on the main page
   - Configure Project Name and Object Name in the **Setup** tab

2. **Explore the Documentation**
   - [Cameras](Cameras.md) - How to configure cameras
   - [Lighting](Lighting.md) - Light Pivot system
   - [Animations](Animations.md) - Animation modes
   - [Render](Render.md) - Render settings
   - [Output](Output.md) - Folder structure and file naming

3. **Consult the FAQ**
   - See the [FAQ](FAQ.md) page for common questions and solutions

---

## Support

If you encounter problems during installation:

- **FAQ**: See the [FAQ](FAQ.md) page for common solutions
- **GitHub Issues**: Report issues at [GitHub Issues](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/issues)
- **GitHub Discussions**: Join discussions at [GitHub Discussions](https://github.com/Lochzin/Sprite-Render-Tool-Wiki/discussions)

