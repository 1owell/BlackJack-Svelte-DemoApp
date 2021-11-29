import { Card } from "../Models/Card";
import { Hand } from "../Models/Hand";
import { writable, get } from "svelte/store";

class Game {

    static apiBase = 'https://deckofcardsapi.com/api';

    constructor() {
        this.deck  = '';
        this.store = writable({
            dealer: new Hand(),
            player: new Hand(),
            isActive: false,
            playerTurn: true,
            cardsToBeDealt: []
        });
    }

    get isPlayerTurn() {
        return get(this.store).playerTurn
    }

    reset() {
        this.store.set({
            dealer: new Hand(),
            player: new Hand(),
            isActive: true,
            playerTurn: true,
            cardsToBeDealt: []
        });
    }


    drawCards(amount) {
        const cards = await this.fetchCards(amount);
        update(currentGameState => {
            currentGameState.cardsToBeDealt = cards;
            return currentGameState;
        })
    }


    async hit() {
        if (this.isPlayerTurn) {
            const card = await this.fetchCards(1);
            await this.dealCard(0, card, 1000);
        }
    }


    async stand() {
        if (this.isPlayerTurn) {
            await this.startDealerPlay();
        }
    }

    async start() {
        this.reset();

        // get new deck or shuffle existing deck
        this.deck   = await this.prepareCards();
        const cards = await this.fetchCards(4);
        
        // deal out initial cards
        for (const index in cards) {
            await this.dealCard(index, cards[index], 500); 
        }

        // evaluate for blackjack hands
        const gameState = get(this.store);
        const playerHasBJ = gameState.player.isBlackjack;
        const dealerHasBJ = gameState.dealer.isBlackjack;
        if (playerHasBJ || dealerHasBJ) this.blackJack(dealerHasBJ, playerHasBJ);
    }


    async startDealerPlay() {
        // flip card over
        this.store.update(currentGameState => {
            currentGameState.dealer.cards[1].flip();
            currentGameState.playerTurn = false;
            return currentGameState;
        });

        await new Promise(r => setTimeout(r, 1500));

        while(get(this.store).dealer.handValue < 17) {
            const card = await this.fetchCards(1);
            await this.dealCard(1, card, 1500);
        }
        
        this.compareHands();
    }


    compareHands() {
        const gameState = get(this.store)
        const dealerHand = gameState.dealer.handValue;
        const playerHand = gameState.player.handValue;

        if (dealerHand > playerHand && dealerHand <= 21) {
            // dealer wins
            this.endRound("You lost this round.");
        } else if ((dealerHand == playerHand) && (dealerHand <= 21)) {
            // tie
            this.endRound("You tied with the dealer.");
        } else if (((dealerHand < playerHand) || (dealerHand > 21)) && (playerHand <= 21)) {
            // player wins
            this.endRound("You win!");
        }
    }


    endRound(message = '') {
        this.store.update(currentGameState => {
            currentGameState.dealer.cards[1].faceDown = false;
            return currentGameState;
        });

        if (message) alert(message);
        this.store.update(currentGameState => {
            currentGameState.isActive   = false;
            currentGameState.playerTurn = false;
            return currentGameState;
        });
    }


    blackJack(dealer, player) {
        if (dealer && player) {
            this.endRound("You matched the dealer's blackjack! Tie.");
        } else if (player) {
            this.endRound("Blackjack! You win!");
        } else {
            this.endRound("Dealer got Blackjack! You lose.");
        }
    }


    // Checks the round number and deals the given card to the appropriate hand. Updates the game state store.
    async dealCard(round, card, delay) {
        let handValue;
        this.store.update(currentGameState => {
            if (round % 2 == 0) {
                handValue = currentGameState.player.addCard(card).handValue;
            } else {
                if (round == 3) card.faceDown = true;
                handValue = currentGameState.dealer.addCard(card).handValue;
            }

            return currentGameState;
        });

        await new Promise(r => setTimeout(r, delay));

        if (round == 0) {
            if (handValue > 21) {
                this.endRound(`Bust! Your hand is ${ handValue }`);
            } else if (handValue === 21) {
                this.startDealerPlay();
            }
        }
    }


    // Performs the network call to the given URL, and returns a promise that eventually resolves and parses the JSON.
    async cardFetch(url) {
        return fetch(url).then(res => res.json()).then(res => {
            if (res.success == false) throw new Error(res.error);
            return res;
        });
    }


    // Fetch a new deck and return its ID if no existing deck, otherwise shuffle the deck
    async prepareCards(deckAmount = 6) {
        const deckIDKey = "deckID"
        const currentDeck = localStorage.getItem(deckIDKey);
        
        if (currentDeck) {
            try {
                return await this.cardFetch(`${ Game.apiBase }/deck/${ currentDeck }/shuffle`).then(deck => deck.deck_id);
            } catch(err) {
                // deck id is invalid
                localStorage.removeItem(deckIDKey);
            }
        }
        
        return await this.cardFetch(`${ Game.apiBase }/deck/new/shuffle/?deck_count=${ deckAmount }`)
                        .then(deck => {
                            localStorage.setItem(deckIDKey, deck.deck_id);
                            return deck.deck_id;
                        });
    }

    // Draws a card or cards from the deck and returns a Card object
    async fetchCards(amount) {
        return this.cardFetch(`${ Game.apiBase }/deck/${ this.deck }/draw/?count=${ amount }`)
                    .then(res => res.cards.map(card => new Card(card.code, card.value, card.suit, card.image))); 
    }
}


function createGame() {
    
    // Create the store
    const game = new Game();
    const { subscribe } = game.store

    // Call this to start a new round
    const startGame = async () => game.start();
    const hit = async () => game.hit();
    const stand = () => game.stand();

    return {
        subscribe,
        startGame,
        hit,
        stand
    }
}

export const game = createGame();

/**
 x 1. Be able to start a game by getting a new deck id from api
 x 2. Deal card to player
 x 3. Deal card to dealer (face up)
 x 4. Deal card to player
 x 5. Deal card to dealer (face down)
 x 5.5. If dealer face up card is 10 or A, then evaluate hand for BJ
 x 6. Check value of player's hand for 21
 x 7. Check value of dealer's hand for 21
 x 8. If both have 21, then tie, otherwise if one has 21 that hand wins
 * 9. Otherwise, once player has hit the stand btn, dealer stands on 17+ and evaluates game
 *  Dealer hits until bust or 17+
 * 10.
 */