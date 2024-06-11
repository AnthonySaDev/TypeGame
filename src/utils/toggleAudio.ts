export const toggleAudio = (audio: HTMLAudioElement, isMuted: boolean) => {
  audio.loop = true;
  audio.volume = isMuted ? 0 : 0.03;
  if (!isMuted) {
    audio.play();
  } else {
    audio.pause();
  }
};