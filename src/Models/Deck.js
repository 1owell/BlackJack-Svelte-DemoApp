import { Card } from "./Card"

const apiBase = 'https://deckofcardsapi.com/api';

// Performs the network call to the given URL, and returns a promise that eventually resolves and parses the JSON.
async function cardFetch(url) {
    return fetch(url).then(res => res.json()).then(res => {
        if (res.success == false) throw new Error(res.error);
        return res;
    });
}


// Fetch a new deck and return its ID if no existing deck, otherwise shuffle the deck
export async function prepareCards(deckAmount = 6) {
    const deckIDKey = "deckID"
    const currentDeck = localStorage.getItem(deckIDKey);
    
    if (currentDeck) {
        try {
            return await cardFetch(`${ apiBase }/deck/${ currentDeck }/shuffle`).then(deck => deck.deck_id);
        } catch(err) {
            // deck id is invalid
            localStorage.removeItem(deckIDKey);
        }
    }
    
    return await cardFetch(`${ apiBase }/deck/new/shuffle/?deck_count=${ deckAmount }`)
                    .then(deck => {
                        localStorage.setItem(deckIDKey, deck.deck_id);
                        return deck.deck_id;
                    });
}


// Draws a card or cards from the deck and returns a Card object
export async function fetchCards(amount, deck) {
    return cardFetch(`${ apiBase }/deck/${ deck }/draw/?count=${ amount }`)
                .then(res => res.cards.map(card => new Card(card.code, card.value, card.suit, card.image))); 
}