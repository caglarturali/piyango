/**
 * Utilities related to numbers.
 */
export default class NumUtils {
  /**
   * Shuffles array of numbers in place.
   * @param nums Numbers array
   */
  static shuffleNumbers(nums: number[]) {
    for (let i = 0; i < nums.length; i++) {
      const randomIndex = Math.floor(Math.random() * nums.length);
      [nums[i], nums[randomIndex]] = [nums[randomIndex], nums[i]];
    }
  }
}
