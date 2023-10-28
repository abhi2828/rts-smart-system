import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}

const numberToFloat = (value: string) => {
  return +parseFloat(value);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const toFloat = (value: number | string, precision = 2) => {
  if (typeof value === 'string') {
    value = numberToFloat(value);
  }

  return +value.toFixed(precision);
};

export const countDecimals = (value: number) => {
  if (Math.floor(value) !== value) {
    const decimalPart = value.toString().split('.')[1];

    return decimalPart ? decimalPart.length : 0;
  }

  return 0;
};

export const validPrice = (price: number) => {
  return (
    !isNaN(parseFloat(price.toString())) &&
    countDecimals(price) <= 2 &&
    price >= 0 &&
    price <= 999999.99
  );
};
