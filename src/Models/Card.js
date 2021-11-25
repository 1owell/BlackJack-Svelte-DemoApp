export class Card {
    constructor(code, value, suit, imageURL, faceDown = false) {
        this.code     = code;
        this.value    = value;
        this.suit     = suit;
        this.imageURL = imageURL;
        this.faceDown = faceDown
    }

    get possibleValues() {
        if (parseInt(this.value)) {
            return [parseInt(this.value)];
        } else if (this.isAce) {
            return [1, 11];
        } else {
            // face card
            return [10];
        }
    }

    get isAce() {
        return this.value === "ACE";
    }

    get isTen() {
        return this.possibleValues[0] === 10;
    }

    flip() {
        this.faceDown = !this.faceDown;
    }
}