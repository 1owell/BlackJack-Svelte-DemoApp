export class Card {
    constructor(code, value, suit, imageURL, faceDown = false) {
        this.code     = code;
        this.value    = value;
        this.suit     = suit;
        this.imageURL = imageURL;
        this.faceDown = faceDown
    }

    get baseNumericalValue() {
        if (parseInt(this.value)) {
            return parseInt(this.value);
        } else if (this.isAce) {
            return 1;
        } else {
            // face card
            return 10;
        }
    }

    get isAce() {
        return this.value === "ACE";
    }

    get isTen() {
        return this.baseNumericalValue === 10;
    }

    flip() {
        this.faceDown = !this.faceDown;
    }
}