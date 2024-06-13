import { generateRandomParagraph } from "./generateRandomParagraph";

export const resetTest = (
  setParagraph: React.Dispatch<React.SetStateAction<string>>,
  initialMaxTime: number,
  setMaxTime: React.Dispatch<React.SetStateAction<number>>,
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>,
  setMistakes: React.Dispatch<React.SetStateAction<number>>,
  setCharIndex: React.Dispatch<React.SetStateAction<number>>,
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
  setWpm: React.Dispatch<React.SetStateAction<number>>,
  setCpm: React.Dispatch<React.SetStateAction<number>>,
  setCorrectWrong: React.Dispatch<React.SetStateAction<string[]>>,
  charRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
  setTimeIsUp: React.Dispatch<React.SetStateAction<boolean>>,
  inputRef: React.RefObject<HTMLInputElement>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setCountWords: React.Dispatch<React.SetStateAction<number>>,
  difficulty: string
) => {
  const newParagraph = generateRandomParagraph(6, difficulty);
  setParagraph(newParagraph);
  setMaxTime(initialMaxTime);
  setTimeLeft(initialMaxTime);
  setMistakes(0);
  setCharIndex(0);
  setIsTyping(false);
  setWpm(0);
  setCpm(0);
  setScore(0);
  setCorrectWrong(Array(newParagraph.length).fill(''));
  setCountWords(0);
  charRefs.current.forEach((charRef) => {
    if (charRef) {
      charRef.classList.remove('correct', 'wrong');
    }
  });

  setTimeIsUp(false);
  if (inputRef.current) {
    inputRef.current.value = '';
    inputRef.current.focus();
  }
};