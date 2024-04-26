export default function generateArray(count) {
  const randomNumbers = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
}
