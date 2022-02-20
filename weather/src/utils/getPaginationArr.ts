export const getPaginationGroupArray = (
  currPage: number,
  pageLimit: number
): number[] => {
  const start: number = Math.floor((currPage - 1) / pageLimit) * pageLimit;
  return new Array(pageLimit).fill(null).map((_, idx) => start + idx + 1);
};
