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

  /**
   * Get the power of the tool use based on charge time.
   *
   * @param charge int
   *   1 - 4 indicating how long the player 'charged' the tool before use.
   */
  getToolPower(charge) {
    return this.level * charge;
  }
}

export default Tool;
