//
// AUDIO API
//

let audioCtx 
let source;
let analyser 
let frequencyAnalyser;

export function refreshAudioData(audio) {
    analyser.getByteTimeDomainData(audio.domainArray);
    // frequencyAnalyser.getByteFrequencyData(audioFrequencyArray)

}

export function setupAudio(audio) {
    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
  
  
      var soundNotAllowed = function (error) {
          console.log( "You must allow your microphone.");
      }
  
      navigator.getUserMedia({audio:true}, function(stream) {
        audioCtx = new AudioContext();
        source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        // frequencyAnalyser = audioCtx.createAnalyser();
        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        analyser.smoothingTimeConstant = 0.85;
        analyser.fftSize = 512;

        // frequencyAnalyser.fftSize = 32;
        // frequencyAnalyser.minDecibels = -90;
        // frequencyAnalyser.maxDecibels = -10;
        // frequencyAnalyser.smoothingTimeConstant = 0.85;
  
        audio.domainArray = new Uint8Array(analyser.frequencyBinCount);
        // audioFrequencyArray = new Uint8Array(frequencyAnalyser.frequencyBinCount);
        source.connect(analyser);
        // analyser.connect(frequencyAnalyser)
        audio.audioReady = true
      }, soundNotAllowed);
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }







