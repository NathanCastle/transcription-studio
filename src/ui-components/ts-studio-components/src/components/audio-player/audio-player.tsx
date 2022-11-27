import { Component, h, State, Watch } from '@stencil/core';
import { PropertyChangeListener } from '../../models/propertyChangeListener';
import { Session } from '../../models/session';

@Component({
    tag: 'tsc-audio-player',
    styleUrl: 'audio-player.css',
    shadow: true,
})
export class AudioPlayer implements PropertyChangeListener {
    onPropertyChange(source: Session, property: string, flags:string[] | undefined) {
        if (property === "playbackPosition" && (!flags || !flags.includes('noseek'))) {
            this.audioPlayer.currentTime = this.currentTime = source.playbackPosition;
        }
        else if (property === "audioUrl") {
            this.src = source.audioUrl;
        }
    }

    /* performant time display */
    private stopId: number;
    incrementTime = () => {
        this.currentTime = this.audioPlayer.currentTime;
        Session._instance.notifyProgressChange(this.audioPlayer.currentTime);
        this.stopId = requestAnimationFrame(this.incrementTime);
      };

    @State() src: string;
    @State() currentTime: number = 0;
    @State() isPlaying: boolean = false;
    @State() durection: number = 0;
    @State() audioPlayer: HTMLAudioElement;

    componentDidLoad(){
    }

    componentWillLoad() {
        Session._instance.registerListener(this);
    }
    disconnectedCallback() {
        Session._instance.unregisterListener(this);
    }

    handleTogglePlayPause() {
        if (this.isPlaying) {
            this.audioPlayer.pause();
            cancelAnimationFrame(this.stopId);
            this.isPlaying = false;
        }
        else {
            this.audioPlayer.play();
            this.incrementTime();
        }
    }

    _handlePlayerDrivenPause() {
        this.isPlaying = false;
            cancelAnimationFrame(this.stopId);
    }
    _handlePlayerDrivenPlay() {
        this.isPlaying = true;
        this.incrementTime();
    }

    _connectAudioPlayer(el: HTMLElement) {
        this.audioPlayer = el as HTMLAudioElement;
    }

    _moveTrack(amount: number) {
        this.audioPlayer.currentTime = this.audioPlayer.currentTime + amount;
    }

    _getIconBack() {
        return <svg xmlns="http://www.w3.org/2000/svg" class="svg-float-center" width="16" height="16" viewBox="0 0 16 16">
            <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
        </svg>;
    }
    _getIconForward() {
        return <svg xmlns="http://www.w3.org/2000/svg" class="svg-float-center" width="16" height="16" viewBox="0 0 16 16">
            <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" />
        </svg>
    }

    render() {
        let playPauseIcon = this.isPlaying ?
            <svg role='img' aria-label="Pause recording" width="32" height="32" viewBox='0 0 16 16'><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z" /></svg>
            : <svg viewBox='0 0 16 16' xmlns="http://www.w3.org/2000/svg" width="32" height="32" aria-label="Play Recording"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" /></svg>;
        return <div class='player-container'>
            <div class="progress-bar"></div>
            <div class="left-controls">
                {this.currentTime} of {this.audioPlayer.duration}
            </div>
            <div class="playback-controls">
                <button aria-label='Rewind playback 30 seconds' onClick={() => this._moveTrack(-30)}>{this._getIconBack()}30</button>
                <button aria-label='Rewind playback 15 seconds' onClick={() => this._moveTrack(-15)}>{this._getIconBack()}15</button>
                <button aria-label='Rewind playback 10 seconds' onClick={() => this._moveTrack(-10)}>{this._getIconBack()}10</button>
                <button onClick={() => this.handleTogglePlayPause()} style={{ 'height': '50px' }}>{playPauseIcon}</button>
                <button aria-label='Skip playback 10 seconds' onClick={() => this._moveTrack(10)}>{this._getIconForward()}10</button>
                <button aria-label='Skip playback 15 seconds' onClick={() => this._moveTrack(15)}>{this._getIconForward()}15</button>
                <button aria-label='Skip playback 30 seconds' onClick={() => this._moveTrack(30)}>{this._getIconForward()}30</button>
            </div>
            <div class="right-controls">
            </div>
            <audio onPlay={() => this._handlePlayerDrivenPlay()} onPause={() => this._handlePlayerDrivenPause()} src={this.src} preload='none' ref={(el) => (this.audioPlayer = el as HTMLAudioElement)}>XX</audio>
        </div>
    }
}
