import { Component, Prop, h, Event, EventEmitter, State, Watch } from '@stencil/core';
import { PropertyChangeListener } from '../../models/propertyChangeListener';
import { Session } from '../../models/session';

@Component({
    tag: 'tsc-audio-player',
    styleUrl: 'audio-player.css',
    shadow: true,
})
export class AudioPlayer implements PropertyChangeListener {
    onPropertyChange(source: Session, property: string) {
        if (property === "playbackPosition"){
            this.audioPlayer.currentTime = this.currentTime = source.playbackPosition;
        }
        else if (property === "audioUrl"){
            this.src = source.audioUrl;
        }
    }

    @State() src: string;
    @State() currentTime: number = 0;
    @State() isPlaying: boolean = false;
    @State() durection: number = 0;
    @State() audioPlayer: HTMLAudioElement;

    componentWillLoad(){
        Session._instance.registerListener(this);
    }
    disconnectedCallback(){
        Session._instance.unregisterListener(this);
    }

    handleTogglePlayPause(){
        if (this.isPlaying){
            this.audioPlayer.pause();
        }
        else {
            this.audioPlayer.play();
        }
    }

    _handlePlayerDrivenPause(){
        this.isPlaying = false;
    }
    _handlePlayerDrivenPlay(){
        this.isPlaying = true;
    }

    _connectAudioPlayer(el:HTMLElement){
        this.audioPlayer = el as HTMLAudioElement;
    }

    _moveTrack(amount:number){

        this.audioPlayer.currentTime= this.audioPlayer.currentTime + amount;
    }

    render() {
        return <div class='player-container'>
            <div class="progress-bar"></div>

            <div class="playback-controls">
                <button onClick={() => this._moveTrack(-30)}>&lt;-30</button>
                <button onClick={() => this._moveTrack(-15)}>&lt;-15</button>
                <button onClick={() => this._moveTrack(-10)}>&lt;-10</button>
                <button onClick={() => this.handleTogglePlayPause()} style={{'height':'50px'}}>{this.isPlaying ? 'Pause': 'Play'}</button>
                <button onClick={() => this._moveTrack(10)}>&gt;+10</button>
                <button onClick={() => this._moveTrack(15)}>&gt;+15</button>
                <button onClick={() => this._moveTrack(30)}>&gt;+30</button>
            </div>
            <div class="right-controls">
            </div>
            <audio onPlay={() => this._handlePlayerDrivenPlay()} onPause={() => this._handlePlayerDrivenPause()} src={this.src} preload='metadata'  ref={(el)=> (this.audioPlayer = el as HTMLAudioElement)}>XX</audio>
        </div>
    }
}
