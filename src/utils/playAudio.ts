export const playAudio = (src: string, volume: number = 0.1) => {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play();
};