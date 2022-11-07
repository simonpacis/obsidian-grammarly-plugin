import { Extension } from '@codemirror/state';

import { addIcon, App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import * as Grammarly from '@grammarly/editor-sdk'
import { grammarlyPlugin } from './plugin'

// Remember to rename these classes and interfaces!
//
//

export interface ObsidianGrammarlyPluginSettings {
	left_offset: string;
	top_offset: string;
}

const DEFAULT_SETTINGS: ObsidianGrammarlyPluginSettings = {
	left_offset: '0',
	top_offset: '0'
}


export default class ObsidianGrammarlyPlugin extends Plugin {
	private ext: Extension;
	private extArray: Extension[] = [];
	settings: ObsidianGrammarlyPluginSettings;

	async onload(){

		await this.loadSettings();

		addIcon('grammarly', '<svg fill="currentColor"  viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12C0 5.372 5.373 0 12 0c6.628 0 12 5.372 12 12m-9.633 1.626a.81.815 0 0 0-.799.965c.071.393.44.662.84.662h1.257l.729-.102c-1.166 1.71-3.19 2.498-5.405 2.15-1.802-.282-3.35-1.502-4.003-3.205-1.483-3.865 1.34-7.556 5.02-7.556 1.916 0 3.598 1.122 4.562 2.478.277.39.763.504 1.133.248a.795.8 0 0 0 .236-1.069h.006a7.04 7.04 0 0 0-6.425-3.233c-3.508.236-6.347 3.107-6.55 6.617-.233 4.086 3.007 7.421 7.037 7.421a6.976 6.976 0 0 0 5.304-2.413l-.153.855v.773c0 .4.269.77.662.84a.814.814 0 0 0 .964-.8v-4.63h-4.415"/></svg>');

		const ribbonIconEl = this.addRibbonIcon('grammarly', 'Enable Grammarly', (evt: MouseEvent) => {
			this.enableGrammarly();
		});

		this.addCommand({
			id: "enable-grammarly",
			name: "Enable Grammarly",
			editorCallback: (editor, view) => {
				this.enableGrammarly();
			},
		});
		if (!this.ext) {
			this.ext = grammarlyPlugin;
			this.extArray = [this.ext];
			this.registerEditorExtension(this.extArray);
		}

		this.addSettingTab(new MainSettingsTab(this.app, this));

	}

	onunload() {

	}

	enableGrammarly() {
		new Notice('Grammarly has been enabled.');
		const view = this?.app?.workspace?.activeLeaf?.view;
		if (view != null) {
			const editorView = (view as any).editor.cm;

			const plugin = editorView.plugin(grammarlyPlugin);

			if (plugin) {
				plugin.initialize(editorView, this.settings);

				/* Look for Grammarly-powered tooltip, and if found, remove element. */
				const tooltip_observer = new MutationObserver(tooltip_callback);

				function tooltip_callback (mutations: MutationRecord[]) {
					for(var i = 0; i < mutations.length; i++)
					{
						var mutation = mutations[i];
						if(mutation.addedNodes.length > 0)
							{
								for(var ii = 0; ii < mutation.addedNodes.length; ii++)
								{
									var node = mutation.addedNodes[ii] as HTMLBodyElement;
									if(node.innerText == "Grammarly-powered editor")
										{
											node.remove();
										}
								}
							}
					}
				}

				var tooltip_observer_element = document.querySelector("body")!;

				tooltip_observer.observe(tooltip_observer_element, {childList: true});

			}
		}
	}
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class MainSettingsTab extends PluginSettingTab {
	plugin: ObsidianGrammarlyPlugin;

	constructor(app: App, plugin: ObsidianGrammarlyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Grammarly Plugin Settings'});

		new Setting(containerEl)
		.setName('Left Popover Offset (in pixels)')
		.setDesc('The Grammarly popover is placed incorrectly when using certain themes. If you encoutner this, this setting allows you to offset it to the left it so that it looks right.')
		.addText(text => text
						 .setPlaceholder('Enter offset (in pixels)')
						 .setValue(this.plugin.settings.left_offset)
						 .onChange(async (value) => {
							 this.plugin.settings.left_offset = value;
							 await this.plugin.saveSettings();
						 }));
		new Setting(containerEl)
		.setName('Top Popover Offset (in pixels)')
		.setDesc('The Grammarly popover is placed incorrectly when using certain themes. If you encoutner this, this setting allows you to offset it from the top so that it looks right.')
		.addText(text => text
						 .setPlaceholder('Enter offset (in pixels)')
						 .setValue(this.plugin.settings.top_offset)
						 .onChange(async (value) => {
							 this.plugin.settings.top_offset = value;
							 await this.plugin.saveSettings();
						 }));
	}
}
