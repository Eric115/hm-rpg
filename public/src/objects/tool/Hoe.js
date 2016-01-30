
class Hoe extends Tool {
  constructor(level, exp) {
    super(level, exp);

    /**
     * Names of animations. These must be public.
     * West animation should be a flipped version of west.
     */
    this.animations = {
      north: "hoe_north",
      east: "hoe_east",
      south: "hoe_south"
    };
  }

}
