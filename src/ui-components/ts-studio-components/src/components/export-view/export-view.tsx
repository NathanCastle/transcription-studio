import { Component, h, State } from '@stencil/core';
import { PropertyChangeListener } from '../../models/propertyChangeListener';
import { Session } from '../../models/session';

@Component({
    tag: 'tsc-export-view',
    styleUrl: 'export-view.css',
    shadow: true,
})
export class ExportView implements PropertyChangeListener {
    onPropertyChange(source: Session, property: string, flags:string[] | undefined) {
        // TODO = update on innersegment changes
        if (property === "fullTranscript") {
        }
    }

    @State() SelectedExportMode:"html"|"markdown" = "markdown"
    @State() RawContent:string;

    componentDidLoad(){
    }

    componentWillLoad() {
        Session._instance.registerListener(this);
    }
    disconnectedCallback() {
        Session._instance.unregisterListener(this);
    }

    _renderTranscriptMarkdown() {
        if (!Session._instance.fullTranscript){
            return <pre>No markdown here</pre>
        }
        return <pre>
            {
                Session._instance.fullTranscript.map((segment) => {
                    return `- [[${segment.speakerLabel}]]: ${segment.speechContent}`
                }).join("\n")
            }
        </pre>
    }

    _renderTranscriptHTML() {
        if (!Session._instance.fullTranscript){
            return <div>No transcript :(</div>
        }
        return Session._instance.fullTranscript.map((segment, idx, all) => {
            return <div>
                <h4>{segment.speakerLabel}</h4>
                <p>{segment.speechContent}</p>
            </div>
        });
    }

    render() {
        let content = this.SelectedExportMode === "html" ? this._renderTranscriptHTML() : this._renderTranscriptMarkdown();
        return <div class='export-container'>
            <div class="settings-area">
            <menu>
                <menuitem class={{"format-option": true, "format-option-selected": this.SelectedExportMode === "markdown"}} onClick={() => this.SelectedExportMode = "markdown"}>Markdown</menuitem>
                <menuitem class={{"format-option": true, "format-option-selected": this.SelectedExportMode === "html"}} onClick={() => this.SelectedExportMode = "html"}>HTML</menuitem>
            </menu>
            <h3>Markdown options</h3>
            <h3>HTML options</h3>
            </div>
            <div class='preview-area'>
                {content}
            </div>
            <div class='export-toolbar'>
                <button>Copy to clipboard</button>
            </div>
        </div>
    }
}
