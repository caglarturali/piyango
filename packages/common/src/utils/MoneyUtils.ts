export class MoneyUtils {
  private currency: string;
  private amount: number;

  constructor(amount: number, currency: string = '₺') {
    this.amount = amount;
    this.currency = currency;
  }

  /**
   * Returns formatted monetary value.
   * @param fractions Number of fractions
   * @param showCurrency Show currency or not
   */
  format(fractions: number = 0, showCurrency: boolean = false): string {
    const moneyStr = Number(this.amount.toFixed(fractions)).toLocaleString();
    if (showCurrency) return `${this.currency} ${moneyStr}`;
    return moneyStr;
  }
}
