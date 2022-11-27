import { PropertyChangeListener } from "./propertyChangeListener";
import { SpeechSegment } from "./speechSegment";

export class Session {
    static _instance: Session = new Session();
    listeners:PropertyChangeListener[] = [];
    audioUrl?:string;
    webVTT?:string;
    fullTranscript?:SpeechSegment[];
    playbackPosition:number = 0;

    notifyProgressChange(time:number){
        this.playbackPosition = time;
        this._notifyListenersFlagged('playbackPosition', ['noseek'])
    }

    seek(time:number){
        this.playbackPosition = time;
        this._notifyListeners("playbackPosition")
    }

    loadAudioDataURL(data:string){
        this.audioUrl = data;
        this.playbackPosition = 0;
        this._notifyListeners("audioUrl")
        this._notifyListeners("playbackPosition");
    }

    registerListener(listener:PropertyChangeListener){
        this.listeners.push(listener)
    }
    unregisterListener(listener:PropertyChangeListener) {
        this.listeners = this.listeners.filter((item) => item !== listener);
    }

    loadTranscript(inputVTT:string){
        this.webVTT = inputVTT;
        this._processVTT(this.webVTT);
        this.playbackPosition = 0;
        this._notifyListeners("webVTT")
        this._notifyListeners("fullTranscript");
        this._notifyListeners("playbackPosition");
    }

    _processVTT(inputVTT:string){
        let allSegments:SpeechSegment[] = []
        let segmentInProgress = new SpeechSegment();
        let timestampRegex = /([0-9]*\:)*([0-9]*.[0-9]*)?\ --> ([0-9]*\:)*([0-9]*.[0-9]*)?/
        let appendTranscript  = () => {
            if (allSegments.length > 0){
                let lastSegment = allSegments[allSegments.length - 1]
                lastSegment.nextSegment = segmentInProgress;
                segmentInProgress.previousSegment = lastSegment;
            }
            allSegments.push(segmentInProgress);
            segmentInProgress = new SpeechSegment();
        }

        for(var line of inputVTT.split('\n')){
            if (line === "WEBVTT"){
                continue;
            }
            if (line.trim() === "" && segmentInProgress.endTimeSeconds){
                appendTranscript();
                continue;
            }
            let timestamp = line.match(timestampRegex);
            if (timestamp){
                let [rawStart, rawEnd] = timestamp[0].split(' --> ')
                segmentInProgress.startTimeSeconds = this._parseTimeStamp(rawStart);
                segmentInProgress.endTimeSeconds = this._parseTimeStamp(rawEnd);
            }
            else {
                segmentInProgress.speechContent = line;
            }
        }
        appendTranscript();
        this.fullTranscript = allSegments;
    }

    _parseTimeStamp(input:string){
        let seconds = 0.0;
        let parts = input.split(':')
        for (var part of parts){
            seconds += (seconds * 60) + parseFloat(part);
        }
        return seconds;
    }

    _notifyListeners(property:string){
        this._notifyListenersFlagged(property, undefined)
    }
    _notifyListenersFlagged(property:string, flags: string[] | undefined){
        for(var listener of this.listeners){
            listener.onPropertyChange(this, property, flags);
        }
    }
}