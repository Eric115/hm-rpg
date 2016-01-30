class Tool {
  constructor(level, exp) {
    this.level = level;
    this.exp = exp;
  }

  /**
   * Increase the exp.
   *
   * @param amount number
   *   Amount to increase exp by.
   */
  addExp(amount) {
    this.exp += amount;
  }
}

export default Tool;
