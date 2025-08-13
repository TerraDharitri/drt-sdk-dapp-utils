import BigNumber from 'bignumber.js';

export const stringIsInteger = (
  integer: string,
  positiveNumbersOnly = true
) => {
  const stringInteger = String(integer);
  if (!stringInteger.match(/^[-]?\d+$/)) {
    return false;
  }
  const bNparsed = new BigNumber(stringInteger);
  const limit = positiveNumbersOnly ? 0 : -1;

  const compResult = bNparsed.comparedTo(0);
  return (
    bNparsed.toString(10) === stringInteger &&
    compResult !== null &&
    compResult >= limit
  );
};
