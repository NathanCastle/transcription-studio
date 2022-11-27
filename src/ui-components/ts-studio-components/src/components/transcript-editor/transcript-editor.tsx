import { Component, h, State} from '@stencil/core';
import { PropertyChangeListener } from '../../models/propertyChangeListener';
import {Session} from '../../models/session';
import { SpeechSegment } from '../../models/speechSegment';

@Component({
  tag: 'tsc-transcript-editor',
  styleUrl: 'transcript-editor.css',
  shadow: true,
})
export class TranscriptEditor implements PropertyChangeListener {
    onPropertyChange(source: any, property: string) {
        if (property === "fullTranscript"){
            this.segmentList = source.fullTranscript;
        }
    }
    @State() segmentList?: SpeechSegment[]

    disconnectedCallback(){
        Session._instance.unregisterListener(this);
    }

    componentWillLoad(){
        Session._instance.registerListener(this);
    }

  render() {
    let output = <div>Nothing to see here</div>
    if (this.segmentList){
        output = this.segmentList.map((item) => {
            return <tsc-speaker-slice segment={item}></tsc-speaker-slice>
        }) ;
    }
    return <div class="transcript-container">
        {output}
    </div>
  }
}
