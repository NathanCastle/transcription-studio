export class SpeechSegment {
    speakerLabel?:string;
    startTimeSeconds?:number;
    endTimeSeconds?:number;
    speechContent?:string;

    nextSegment?:SpeechSegment;
    previousSegment?:SpeechSegment;

}