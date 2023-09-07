export const useMinutesParse = () => {
  const minutesParse = (miliseconds: number) => {
    return Math.floor(miliseconds / 60 / 1000);
  };

  return { minutesParse };
};
