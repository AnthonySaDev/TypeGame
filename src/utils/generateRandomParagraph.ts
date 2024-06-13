export const generateRandomParagraph = (length: number, difficulty: string): string => {
  const charSets: { [key: string]: string } = {
    facil: 'ABCDEFGHIJKLMNPQRSTUVWXYZ',
    normal: 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789',
    dificil: 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789!@#$%^&*',
    muitoDificil: 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  const chars = charSets[difficulty] || charSets.facil;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
