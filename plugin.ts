import {
  ViewUpdate,
  PluginValue,
  EditorView,
  ViewPlugin,
} from "@codemirror/view";
import * as Grammarly from '@grammarly/editor-sdk'

const initialize = Grammarly.init('client_SZRuwBMe5opCznxqMQCG3q')
const initializeGrammarly = (view: EditorView) => {
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
		style.innerHTML = `

/*
			article 
			{
				left: 320px !important;
			}*/

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

	initialize(view: EditorView){
		return initializeGrammarly(view);
	}
		

}

export const grammarlyPlugin = ViewPlugin.fromClass(GrammarlyPlugin);


