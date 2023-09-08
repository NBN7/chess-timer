export const secondsParse = (miliseconds: number) => {
  return Math.floor((miliseconds / 1000) % 60) < 10
    ? "0" + Math.floor((miliseconds / 1000) % 60)
    : Math.floor((miliseconds / 1000) % 60);
};
