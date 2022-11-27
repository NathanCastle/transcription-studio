import { Component, Prop, h, Event, EventEmitter, State, Watch } from '@stencil/core';
import { PropertyChangeListener } from '../../models/propertyChangeListener';
import {Session} from '../../models/session';
import {SpeechSegment} from '../../models/speechSegment';

@Component({
  tag: 'tsc-speaker-slice',
  styleUrl: 'speaker-slice.css',
  shadow: true,
})
export class SpeakerSlice implements PropertyChangeListener {
  onPropertyChange(source: any, property: string) {
    if (property === "playbackPosition"){
      // TODO = highlight in view if currently playing
    }
  }
  @Prop() segment?:SpeechSegment;

  @State() speakerName: string;
  @State() timeStampStart: string;
  @State() timeStampEnd: string;
  @State() speechContent: string;

disconnectedCallback(){
  Session._instance.unregisterListener(this);
}

  componentWillLoad(){
    Session._instance.registerListener(this);
    this.timeStampStart = this.segment.startTimeSeconds + "";
    this.timeStampEnd = this.segment.endTimeSeconds + "";
    this.speechContent = this.segment.speechContent;
    this.speakerName = this.segment.speakerLabel;
  }

  @Watch('segment')
  HandleSegmentApplied(newValue?:SpeechSegment, oldValue?:SpeechSegment){
    this.timeStampStart = newValue.startTimeSeconds + "";
    this.timeStampEnd = newValue.endTimeSeconds + "";
    this.speechContent = newValue.speechContent;
    this.speakerName = newValue.speakerLabel;
  }

  _handleCopyAboveRequest() {
    this.speakerName = this.segment.speakerLabel = this.segment.previousSegment.speakerLabel
  }

  _handleFillDownRequest() {

  }

  _handleMergeRequest() {

  }

  _handlePlayRequest() {
    Session._instance.seek(this.segment.startTimeSeconds);
  }

  _handleSpeakerChange(evt:Event) {
    // Update model
    this.speakerName = (evt.target as HTMLInputElement).value;
    this.segment.speakerLabel = this.speakerName;
  }

  render() {
    return <div class="sliceContainer">
      <div class="timestampArea">
        {this.timeStampStart}
      </div>
      <div class="speakerName">
        <input type='text' value={this.speakerName} onChange={(evt) => this._handleSpeakerChange(evt)}></input>
      </div>
      <button class="playButton" onClick={() => this._handlePlayRequest()}>&gt;</button>
      <div class="textArea">
        {this.speechContent}
      </div>
      <div class="toolWrapper">
        <div class="toolContainer">
          <button onClick={() => this._handleCopyAboveRequest()}>Copy Previous Speaker Label</button>
          <button onClick={() => this._handleMergeRequest()}>Merge with above paragraph</button>
          <button onClick={() => this._handleFillDownRequest()}>Fill Speaker Label Down</button>
        </div>
      </div>

    </div>
  }
}
