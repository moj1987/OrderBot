const Order = require("./as1-order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE: Symbol("size"),
  FRUITS: Symbol("fruits"),
  SHOTS: Symbol("specialty shots"),
  EATS: Symbol("eats"),
});

module.exports = class PizzaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sFruits = "";
    this.sSpecialtyShot = "";
    this.sEats = "";
    this.sItem = "smoothie";
    this.sPrice = 7;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SIZE;
        aReturn.push(
          "Was up mate?(Please go back re-read it with Aussie accent)"
        );
        aReturn.push("What size smoothie would you like?");
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.FRUITS;
        this.sSize = sInput;
        aReturn.push("What fruits would you like in the blend?");
        break;
      case OrderState.FRUITS:
        this.stateCur = OrderState.SHOTS;
        this.sFruits = sInput;
        aReturn.push(
          "Would you like specialty shots in it? (Non-Scotish. Sorry)"
        );
        break;
      case OrderState.SHOTS:
        this.stateCur = OrderState.EATS;
        if (sInput.toLowerCase != "no") {
          this.sSpecialtyShot = sInput;
          this.sPrice += 2;
        }
        aReturn.push("Would you like eats with it?");
        break;
      case OrderState.EATS:
        this.isDone(true);
        if (sInput.toLowerCase != "no") {
          this.sEats = sInput;
          this.sPrice += 5;
        }

        //Order summary
        aReturn.push("Thank-you for your order of");
        aReturn.push(`${this.sSize} ${this.sItem} with ${this.sFruits}`);

        if (this.sSpecialtyShot) {
          aReturn.push(` and a shot of ${this.sSpecialtyShot}`);
        }

        //Check if order had eats and put it in the summary
        if (this.sEats) {
          aReturn.push(`Plus ${this.sEats}`);
        }

        //Total price
        aReturn.push(`That'd be $${this.sPrice}`);

        //Time stamp for the order which is 20mins away
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please open the door at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
