/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Session } from "./models/session";
import { SpeechSegment } from "./models/speechSegment";
export namespace Components {
    interface TscAppLayout {
        "getSession": () => Promise<Session>;
    }
    interface TscAppLayoutPanel {
        "title": string;
    }
    interface TscAudioPlayer {
    }
    interface TscSpeakerSlice {
        "segment"?: SpeechSegment;
    }
    interface TscTranscriptEditor {
    }
}
declare global {
    interface HTMLTscAppLayoutElement extends Components.TscAppLayout, HTMLStencilElement {
    }
    var HTMLTscAppLayoutElement: {
        prototype: HTMLTscAppLayoutElement;
        new (): HTMLTscAppLayoutElement;
    };
    interface HTMLTscAppLayoutPanelElement extends Components.TscAppLayoutPanel, HTMLStencilElement {
    }
    var HTMLTscAppLayoutPanelElement: {
        prototype: HTMLTscAppLayoutPanelElement;
        new (): HTMLTscAppLayoutPanelElement;
    };
    interface HTMLTscAudioPlayerElement extends Components.TscAudioPlayer, HTMLStencilElement {
    }
    var HTMLTscAudioPlayerElement: {
        prototype: HTMLTscAudioPlayerElement;
        new (): HTMLTscAudioPlayerElement;
    };
    interface HTMLTscSpeakerSliceElement extends Components.TscSpeakerSlice, HTMLStencilElement {
    }
    var HTMLTscSpeakerSliceElement: {
        prototype: HTMLTscSpeakerSliceElement;
        new (): HTMLTscSpeakerSliceElement;
    };
    interface HTMLTscTranscriptEditorElement extends Components.TscTranscriptEditor, HTMLStencilElement {
    }
    var HTMLTscTranscriptEditorElement: {
        prototype: HTMLTscTranscriptEditorElement;
        new (): HTMLTscTranscriptEditorElement;
    };
    interface HTMLElementTagNameMap {
        "tsc-app-layout": HTMLTscAppLayoutElement;
        "tsc-app-layout-panel": HTMLTscAppLayoutPanelElement;
        "tsc-audio-player": HTMLTscAudioPlayerElement;
        "tsc-speaker-slice": HTMLTscSpeakerSliceElement;
        "tsc-transcript-editor": HTMLTscTranscriptEditorElement;
    }
}
declare namespace LocalJSX {
    interface TscAppLayout {
    }
    interface TscAppLayoutPanel {
        "title"?: string;
    }
    interface TscAudioPlayer {
    }
    interface TscSpeakerSlice {
        "segment"?: SpeechSegment;
    }
    interface TscTranscriptEditor {
    }
    interface IntrinsicElements {
        "tsc-app-layout": TscAppLayout;
        "tsc-app-layout-panel": TscAppLayoutPanel;
        "tsc-audio-player": TscAudioPlayer;
        "tsc-speaker-slice": TscSpeakerSlice;
        "tsc-transcript-editor": TscTranscriptEditor;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "tsc-app-layout": LocalJSX.TscAppLayout & JSXBase.HTMLAttributes<HTMLTscAppLayoutElement>;
            "tsc-app-layout-panel": LocalJSX.TscAppLayoutPanel & JSXBase.HTMLAttributes<HTMLTscAppLayoutPanelElement>;
            "tsc-audio-player": LocalJSX.TscAudioPlayer & JSXBase.HTMLAttributes<HTMLTscAudioPlayerElement>;
            "tsc-speaker-slice": LocalJSX.TscSpeakerSlice & JSXBase.HTMLAttributes<HTMLTscSpeakerSliceElement>;
            "tsc-transcript-editor": LocalJSX.TscTranscriptEditor & JSXBase.HTMLAttributes<HTMLTscTranscriptEditorElement>;
        }
    }
}