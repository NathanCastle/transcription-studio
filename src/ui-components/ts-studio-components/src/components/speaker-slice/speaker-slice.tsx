import { Component, Prop, h, State, Watch } from '@stencil/core';
import { PropertyChangeListener } from '../../models/propertyChangeListener';
import { Session } from '../../models/session';
import { SpeechSegment } from '../../models/speechSegment';
import { formatSecondsToTimestamp } from '../../utils/utils';

@Component({
  tag: 'tsc-speaker-slice',
  styleUrl: 'speaker-slice.css',
  shadow: true,
})
export class SpeakerSlice implements PropertyChangeListener {
  onPropertyChange(_: any, property: string) {
    if (property === "playbackPosition") {
      this.isNowPlaying = this.segment.endTimeSeconds > Session._instance.playbackPosition && Session._instance.playbackPosition >= this.segment.startTimeSeconds;
    }
    else if (property === 'renamedSegments') {
      this.speakerName = this.segment.speakerLabel;
    }
  }
  @Prop() segment?: SpeechSegment;
  @State() isNowPlaying: boolean = false;
  @State() speakerName: string;
  @State() timeStampStart: number;
  @State() timeStampEnd: string;
  @State() speechContent: string;

  disconnectedCallback() {
    Session._instance.unregisterListener(this);
  }

  componentWillLoad() {
    Session._instance.registerListener(this);
    this.timeStampStart = this.segment.startTimeSeconds;
    this.timeStampEnd = this.segment.endTimeSeconds + "";
    this.speechContent = this.segment.speechContent;
    this.speakerName = this.segment.speakerLabel;
  }

  @Watch('segment')
  HandleSegmentApplied(newValue?: SpeechSegment, oldValue?: SpeechSegment) {
    this.timeStampStart = newValue.startTimeSeconds;
    this.timeStampEnd = newValue.endTimeSeconds + "";
    this.speechContent = newValue.speechContent;
    this.speakerName = newValue.speakerLabel;
  }

  _handleCopyAboveRequest() {
    this.speakerName = this.segment.speakerLabel = this.segment.previousSegment.speakerLabel
  }

  _handleFillDownRequest() {
    let nextSegment = this.segment.nextSegment;
    while (nextSegment != null) {
      nextSegment.speakerLabel = this.segment.speakerLabel;
      nextSegment = nextSegment.nextSegment;
    }

    Session._instance._notifyListeners('renamedSegments')
  }

  _handleMergeRequest() {

  }

  _handlePlayRequest() {
    Session._instance.seek(this.segment.startTimeSeconds);
  }

  _handleSpeakerChange(evt: Event) {
    // Update model
    this.speakerName = (evt.target as HTMLInputElement).value;
    this.segment.speakerLabel = this.speakerName;
  }

  render() {
    return <div class={{ "sliceContainer": true, "playing": this.isNowPlaying }}>
      <div class="timestampArea">
        {formatSecondsToTimestamp(this.timeStampStart)}
      </div>
      <div class="speakerName">
        <input type='text' value={this.speakerName} onChange={(evt) => this._handleSpeakerChange(evt)}></input>
      </div>
      <button class="playButton" onClick={() => this._handlePlayRequest()}>
        <svg viewBox='0 0 16 16' xmlns="http://www.w3.org/2000/svg" width="14" height="14" aria-label="Play Recording"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" /></svg>
      </button>
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
