export class Hand {
    constructor(cards = []) {
        this.cards = cards;
    }

    // Add a new card to the hand
    addCard(card) {
        this.cards.push(card);
        return this;
    }

    get isBlackjack() {
        let hasAce = false;
        let hasTen = false;
        for (const card of this.cards) {
            if (card.isAce) hasAce = true;
            if (card.isTen) hasTen = true;
        }

        return hasAce && hasTen;
    }

    // Get the hand's current value
    get handValue() {
        
        let handValue = 0;
        let aceCount  = 0;

        for (const card of this.cards) {
            card.isAce ? aceCount++ : handValue += card.possibleValues[0];
        }
            
        while(aceCount > 0) {
            aceCount--;
            handValue += 11;
            if ((handValue > 21) || (handValue + aceCount > 21)) handValue -= 10;
        }

        return handValue;
    }
}