export class Hand {

    constructor(cards = []) {
        this.cards = cards;
    }


    // Add a new card to the hand
    addCard(card) {
        // TODO
    }


    // Get the hand's current value
    get handValue() {
        // TODO
    }


    // Checks if the hand is a Blackjack
    get isBlackjack() {
        let hasAce = false;
        let hasTen = false;
        for (const card of this.cards) {
            if (card.isAce) hasAce = true;
            if (card.isTen) hasTen = true;
        }

        return hasAce && hasTen && this.cards.length == 2;
    }
}