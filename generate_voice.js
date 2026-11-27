const fs = require('fs');

// Generate a gentle romantic piano/music melody in 44.1kHz 16-bit mono PCM WAV
const sampleRate = 44100;
const bpm = 68;
const beatSec = 60 / bpm;

// Musical note frequencies (Romantic Ballad in D major / B minor)
// D4, F#4, A4, B4, C#5, D5, E5, F#5, A5
const notes = {
  'REST': 0,
  'D3': 146.83, 'F#3': 185.00, 'A3': 220.00, 'B3': 246.94,
  'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C#5': 554.37, 'D5': 587.33, 'E5': 659.25, 'F#5': 739.99, 'A5': 880.00
};

// Melody matching: "Hum tere pyaar mein saara aalam kho baithe..."
const melody = [
  // "Ham tere pyaar main"
  { note: 'F#4', dur: 1.0 }, { note: 'A4', dur: 1.0 }, { note: 'B4', dur: 1.5 }, { note: 'A4', dur: 1.0 },
  // "saara aalam"
  { note: 'F#4', dur: 1.2 }, { note: 'E4', dur: 1.0 }, { note: 'D4', dur: 2.0 },
  // "kho baithe he kho baithe"
  { note: 'E4', dur: 1.0 }, { note: 'F#4', dur: 1.2 }, { note: 'D4', dur: 1.8 },
  { note: 'E4', dur: 1.0 }, { note: 'F#4', dur: 1.2 }, { note: 'D4', dur: 2.2 },
  
  // "tum kehete ho ki"
  { note: 'A4', dur: 1.0 }, { note: 'B4', dur: 1.0 }, { note: 'D5', dur: 1.5 },
  // "aise pyaar ko bhul jaao"
  { note: 'C#5', dur: 1.0 }, { note: 'B4', dur: 1.0 }, { note: 'A4', dur: 1.2 }, { note: 'F#4', dur: 1.8 },
  // "bhul jaao"
  { note: 'E4', dur: 1.2 }, { note: 'D4', dur: 2.5 },

  // Repeat: "Ham tere pyaar main saara aalam"
  { note: 'F#4', dur: 1.0 }, { note: 'A4', dur: 1.0 }, { note: 'B4', dur: 1.5 }, { note: 'A4', dur: 1.0 },
  { note: 'F#4', dur: 1.2 }, { note: 'E4', dur: 1.0 }, { note: 'D4', dur: 2.0 },
  // "kho baithe he kho baithe"
  { note: 'E4', dur: 1.0 }, { note: 'F#4', dur: 1.2 }, { note: 'D4', dur: 1.8 },
  { note: 'E4', dur: 1.0 }, { note: 'F#4', dur: 1.2 }, { note: 'D4', dur: 2.2 },

  // "tum kehete ho ki aise pyaar ko bhul jaao, bhul jaao"
  { note: 'A4', dur: 1.0 }, { note: 'B4', dur: 1.0 }, { note: 'D5', dur: 1.5 },
  { note: 'C#5', dur: 1.0 }, { note: 'B4', dur: 1.0 }, { note: 'A4', dur: 1.2 }, { note: 'F#4', dur: 1.8 },
  { note: 'E4', dur: 1.2 }, { note: 'D4', dur: 2.5 },

  // Final soft refrain: "ham tere pyaar main saara aalam..."
  { note: 'F#4', dur: 1.2 }, { note: 'A4', dur: 1.2 }, { note: 'D5', dur: 2.0 }, { note: 'B4', dur: 1.5 },
  { note: 'A4', dur: 2.0 }, { note: 'F#4', dur: 2.0 }, { note: 'D4', dur: 3.5 },
];

let totalDuration = melody.reduce((acc, n) => acc + n.dur * beatSec * 0.7, 0) + 1.5;
const totalSamples = Math.floor(sampleRate * totalDuration);
const pcmBuffer = Buffer.alloc(totalSamples * 2); // 16-bit mono

let currentSample = 0;

for (const item of melody) {
  const noteFreq = notes[item.note] || 0;
  const noteDuration = item.dur * beatSec * 0.7;
  const noteSamples = Math.floor(sampleRate * noteDuration);

  for (let i = 0; i < noteSamples && (currentSample + i) < totalSamples; i++) {
    const t = i / sampleRate;
    let sampleVal = 0;

    if (noteFreq > 0) {
      // Natural Acoustic Instrument Envelope (gentle attack, soft decay, warm harmonics)
      const attack = Math.min(1, i / (sampleRate * 0.04));
      const decay = Math.exp(-3.2 * t);
      const envelope = attack * decay;

      // Rich harmonics: Fundamental + Octave + 5th + warm vibrato
      const vibrato = Math.sin(2 * Math.PI * 4.8 * t) * 1.5;
      const fundamental = Math.sin(2 * Math.PI * (noteFreq + vibrato) * t);
      const harmonic2 = 0.45 * Math.sin(2 * Math.PI * (noteFreq * 2) * t);
      const harmonic3 = 0.22 * Math.sin(2 * Math.PI * (noteFreq * 3) * t);
      const warmSub = 0.3 * Math.sin(2 * Math.PI * (noteFreq * 0.5) * t);

      sampleVal = (fundamental + harmonic2 + harmonic3 + warmSub) * envelope * 0.55;
    }

    // Convert to 16-bit signed integer (-32768 to 32767)
    const int16 = Math.max(-32768, Math.min(32767, Math.floor(sampleVal * 28000)));
    pcmBuffer.writeInt16LE(int16, (currentSample + i) * 2);
  }

  currentSample += noteSamples;
}

// Write standard RIFF WAV Header
const wavHeader = Buffer.alloc(44);
wavHeader.write('RIFF', 0);
wavHeader.writeUInt32LE(36 + pcmBuffer.length, 4);
wavHeader.write('WAVE', 8);
wavHeader.write('fmt ', 12);
wavHeader.writeUInt32LE(16, 16); // Subchunk1Size
wavHeader.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
wavHeader.writeUInt16LE(1, 22);  // NumChannels (1 = Mono)
wavHeader.writeUInt32LE(sampleRate, 24); // SampleRate
wavHeader.writeUInt32LE(sampleRate * 2, 28); // ByteRate
wavHeader.writeUInt16LE(2, 32);  // BlockAlign
wavHeader.writeUInt16LE(16, 34); // BitsPerSample
wavHeader.write('data', 36);
wavHeader.writeUInt32LE(pcmBuffer.length, 40);

const finalWav = Buffer.concat([wavHeader, pcmBuffer]);
fs.writeFileSync('public/audio/voice.mp3', finalWav);
console.log('Successfully created public/audio/voice.mp3 with length:', totalDuration.toFixed(1), 'seconds');
