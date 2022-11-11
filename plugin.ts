import {
	ViewUpdate,
	PluginValue,
	EditorView,
	ViewPlugin,
} from "@codemirror/view";
import * as Grammarly from '@grammarly/editor-sdk';
import {ObsidianGrammarlyPluginSettings} from './main';

const initializeGrammarly = (view: EditorView, settings: ObsidianGrammarlyPluginSettings) => {
const initialize = Grammarly.init(settings.client_id);
	initialize.then((grammarly) => {
		grammarly.addPlugin(
			view.contentDOM,
			{
				documentDialect: 'auto-text', // 'british',
				documentDomain: 'academic',
				activation: 'immediate',
			},
			view.scrollDOM
		);

		var host = document.querySelector("grammarly-editor-plugin");
		var style = document.createElement('style');

		// Not really sure how to style the shadow root in another way. This fixes positioning errors that for some reason occur with Grammarly SDK in Obsidian.


		var inner_html  = `
		.nvqxur1>:nth-child(2):not(article)
		{
			left: 80px !important;
		}

		div:has(div[aria-label="Grammarly Settings"])
		{
			left: 80px !important;
		}

		div[role="tooltip"] {
			left: 80px !important;
		}
		`;

		if(settings.left_offset != "0")
			{
				inner_html = inner_html + `
				.nvqxur1 div[role=dialog]
				{
					left: ` + settings.left_offset + `px !important;
				}`
			}

		if(settings.top_offset != "0")
			{
				inner_html = inner_html + `
				.nvqxur1 div[role=dialog]
				{
					top: ` + settings.top_offset + `px !important;
				}`
			}

			style.innerHTML = inner_html;

			host?.shadowRoot?.appendChild(style);
	})
}
class GrammarlyPlugin implements PluginValue {
	constructor(view: EditorView) {
	}

	update(update: ViewUpdate) {
	}

	destroy() {
	}

	initialize(view: EditorView, settings: ObsidianGrammarlyPluginSettings){
		return initializeGrammarly(view, settings);
	}


}

export const grammarlyPlugin = ViewPlugin.fromClass(GrammarlyPlugin);


