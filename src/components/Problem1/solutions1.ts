// Using a loop to sum numbers from 1 to n
// Time Complexity: O(n), as it iterates through all numbers up to n
export default function solution1(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}