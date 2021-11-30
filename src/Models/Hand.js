export class Hand {
    constructor(cards = []) {
        this.cards = cards;
    }

    // Add a new card to the hand
    addCard(card) {
        this.cards.push(card);
        return this;
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

    // Get the hand's current value
    get handValue() {
        
        let handValue = 0;
        let aceCount  = 0;

        for (const card of this.cards) {
            card.isAce ? aceCount++ : handValue += card.baseNumericalValue;
        }
            
        while(aceCount > 0) {
            aceCount--;
            handValue += 11;
            if ((handValue > 21) || (handValue + aceCount > 21)) handValue -= 10;
        }

        return handValue;
    }
}