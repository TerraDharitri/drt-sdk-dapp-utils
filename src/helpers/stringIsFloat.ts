import BigNumber from 'bignumber.js';
import { ZERO } from '../constants';

export const stringIsFloat = (amount: string) => {
  if (amount == null) {
    return false;
  }

  if (isNaN(amount as any)) {
    return false;
  }

  if (String(amount).includes('Infinity')) {
    return false;
  }

  let [wholes, decimals] = amount.split('.');

  const LocalBigNumber = BigNumber.clone();

  if (decimals) {
    const areAllNumbers = decimals
      .split('')
      .every((digit) => !isNaN(parseInt(digit)));

    LocalBigNumber.set({
      DECIMAL_PLACES: areAllNumbers
        ? decimals.length
        : BigNumber.config().DECIMAL_PLACES
    });

    // Remove trailing zeros in decimals
    while (decimals.charAt(decimals.length - 1) === ZERO) {
      decimals = decimals.slice(0, -1);
    }
  }

  const number = decimals ? [wholes, decimals].join('.') : wholes;

  const bNparsed = new LocalBigNumber(number);

  // bNparsed is never null, so no need to check for null explicitly
  const compResult = bNparsed.comparedTo(0);
const output =
  bNparsed.toString(10) === number &&
  compResult !== null &&
  compResult >= 0;

  return output;
};
