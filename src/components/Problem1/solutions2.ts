// Using Array.reduce() to sum numbers from 1 to n
// Time Complexity: O(n), as it iterates through all numbers up to n
// Space Complexity: O(n), as it creates an array of size n
export default function solution2(n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, num) => acc + num, 0);
}