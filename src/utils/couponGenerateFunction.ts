const arr = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export default function couponGenerate() {
  let tempCoupon = '';

  for (let i = 0; i < 6; i++) {
    tempCoupon = tempCoupon + arr[Math.floor(Math.random() * arr.length)];
  }

  return tempCoupon;
}
