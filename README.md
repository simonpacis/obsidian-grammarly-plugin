# Obsidian Grammarly Plugin

**This project will no longer be maintained, as Grammarly has chosen to discontinue their SDK. The plugin will cease to function on Jan 10, 2024.**

This is a plugin for [Obsidian](https://obsidian.md) which adds [Grammarly](https://grammarly.com) support directly in your editor.

![Demo](https://user-images.githubusercontent.com/7118482/227655456-41008759-1a48-4e07-9211-a185b9a7b062.gif)

**NOTE 1**: This plugin is a work in progress.
It will be submitted to "Community Plugins" at a later time.

**NOTE 2**: This is essentially just a wrapper for the Grammarly SDK. As such, there are many bugs that will be marked as wontfix. However, do not let this stop you from submitting issues.

## Installation

### Option 1: BRAT (easiest)
- Install BRAT from Community Plugins in Obsidian
- Open Command Palette and run the command "BRAT: Add a beta plugin for testing"
- Use the following link: https://github.com/simonpacis/obsidian-grammarly-plugin
- Click "Add Plugin"
- Go to Community Plugins, refresh, and enable Obsidian Grammarly plugin

### Option 2: Manual install

**Do not clone the repo or download it as zip. This is not how this plug-in is installed.**

Quick starting guide for installing the plugin:
- Download obsidian-grammarly-plugin.zip from the latest release.
	- Go to: https://github.com/simonpacis/obsidian-grammarly-plugin/releases
	- Go to the latest release, click "Assets" and download the zip-file from here.
- Extract the file in a .obsidian/plugins folder in your Vault (.obsidian is probably hidden)
- Open Obsidian, go to "Community Plugins" and enable "Grammarly Plugin".

## Usage

There are two ways to use this plugin.

1. Click on the Grammarly logo in the left ribbon.
2. Open the command palette and run the "Enable Grammarly" command.

Grammarly will now be enabled for the remainder of the session.
At the moment you (generally) have to quit Obsidian to get rid of it.

## Logging in
Thanks to [kpgabriel](https://github.com/kpgabriel) it is possible to connect your Grammarly account so that premium features are available. To do this, enable Grammarly and click "Connect to your Grammarly account". Follow the login procedure and you're all set.

### Offset
Some themes change the way the Grammarly popover is positioned, and therefore it might be far off from where it is supposed to be. In the settings for the plugin it is possible to offset the popover (left and top) in pixels.

E.g. for the default Obsidian theme I have found a left offset of "320" and a top offset of "100" to be helpful.

Please note that the offset doesn't live-change. It is only applied the first time you "Enable Grammarly". You may have to restart Obsidian in between offset changes.

## About
This plugin is pretty simple.
It includes the Grammarly Editor SDK so that you get a Grammarly button in the lower left corner of your editor window.
You also get underlines and the typical in-place substitutions that Grammarly provides.

## Developing the plugin
If you're interested in further developing the plugin, you are more than welcome to do so and submit PR's.

Quick-start:

- Clone the repo
- Run ```npm install```
- Run ```npm run dev``` to generate main.js.
- Link the plugin folder `ln -s $PWD ~/YourObsidianVault/.obsidian/plugins/`

The plugin is based on the following unofficial developer docs: [https://marcus.se.net/obsidian-plugin-docs/getting-started/create-your-first-plugin](https://marcus.se.net/obsidian-plugin-docs/getting-started/create-your-first-plugin)

## Roadmap
Obsidian Grammarly Plugin is far from done.
This is more of a proof-of-concept version at this stage.
Here are the planned features before submission to "Community Plugins" will be made.

### 1.0.0
- [X] Support for logging in to your own Grammarly account (for premium features)
- [ ] Style customizations
- [ ] Custom settings
- [ ] Ability to disable Grammarly
- [X] Hide/move "Grammarly-powered editor" tooltip
- [ ] Test on Windows
- [ ] Test on macOS
- [ ] Test on iOS
- [ ] Test on Android

## Known bugs
- [ ] Grammarly fails in files with embedded PDF's (see issue [#2](https://github.com/simonpacis/obsidian-grammarly-plugin/issues/2))


## Related Projects
- https://github.com/simonpacis/obsidian-angry-reviewer
- https://github.com/denisoed/obsidian-orthography
- https://github.com/Clemens-E/obsidian-languagetool-plugin

## Contributors
- simonpacis
- kpgabriel
- iloveitaly
- d4n3sh
