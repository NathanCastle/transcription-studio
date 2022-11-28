# Transcript Studio

Project goal: provide a front-end/UI that enables full workflows for transcribing audio using [Whisper](https://github.com/openai/whisper)

Background: OpenAI recently released Whisper, which achieves close to human-level transcription, far better than existing solutions like Otter and Zoom's built-in transcription. Unfortunately, Whisper does not provide any UI for editing transcripts, labeling speakers, or correcting errors.

Project MVP and stages:

- **MVP**: UI supports importing .vtt produced by Whisper, playing audio for segments of the transcription, combining transcript segments, and labeling segments. Once edited, the transcript can be exported in a usable format.
- **Future goal**: Provide user-friendly UI that enables downloading and setting up Whisper backend
- **Future goal**: Support running Whisper transcription from within the app
- **Future goal**: Integrate with ffmpeg and youtube-dl to make it easy to transcribe youtube videos and recordings not already in .wav format.

## License and 3rd-party software

This project uses Bootstrap icons under the MIT license. License reproduced in full below:

> The MIT License (MIT)
> 
> Copyright (c) 2019-2021 The Bootstrap Authors
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.