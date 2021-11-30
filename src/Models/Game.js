import { Hand } from "./Hand";
import { prepareCards, fetchCards } from "./Deck";
import { writable, get } from "svelte/store";

class Game {

    static newGame() {
        return {
            dealer: new Hand(),
            player: new Hand(),
            isActive: false,
            playerTurn: false,
            isDealing: false
        }
    }


    constructor() {
        this.store = writable(Game.newGame());
    }


    // Returns whether or not it is currently the player's turn
    get isPlayerTurn() {
        return get(this.store).playerTurn;
    }


    // Resets the game state
    reset() {
        this.store.set(Game.newGame());
    }


    // Called when the player indicates that they would like another card dealt to them
    hit() {
        if (this.isPlayerTurn) {
            this.drawCards(1);
        }
    }


    // Called when the player indicates they are locking in their hand
    stand() {
        if (this.isPlayerTurn) {
            this.startDealerPlay();
        }
    }


    // Draws the provided amount of cards, then begins the dealing process
    async drawCards(amount) {
        const currentGameState = get(this.store);
        const cards = (await fetchCards(amount, this.deck)).map((card, index) => { 
            if (index == 3) card.flip();
            
            const dealToPlayer = () => {
                // if game is not active, then it is the initial deal, so evaluate index
                if (currentGameState.isActive) {
                    return currentGameState.playerTurn;
                } else {
                    return index % 2 == 0;
                }
            }

            return { 
                dealToPlayer: dealToPlayer(), 
                card: card 
            }
        });

        this.store.update(g => { g.isDealing = true; return g});

        for (const card of cards) {
            await this.dealCard(card);
        }

        this.store.update(g => { g.isDealing = false; return g});
    }


    // Deals the drawn card(s) in order 
    async dealCard(card) {
        this.store.update(currentGameState => {
            if (card.dealToPlayer) {
                const handValue = currentGameState.player.addCard(card.card).handValue;

                if (handValue > 21) {
                    this.endRound(`Bust! Your hand is ${ handValue }`);
                } else if (handValue === 21) {
                    this.stand();
                }
            } else {
                currentGameState.dealer.addCard(card.card);
            }

            return currentGameState;
        });

        await new Promise(r => setTimeout(r, 500));
    } 


    // Starts a round of Blackjack
    async start() {
        this.reset();

        // get new deck or shuffle existing deck
        this.deck = await prepareCards();

        // deal out initial cards
        await this.drawCards(4);

        // evaluate for blackjack hands
        const currentGameState = get(this.store);
        const playerHas21 = currentGameState.player.isBlackjack;
        const dealerHas21 = currentGameState.dealer.isBlackjack;

        if (playerHas21 || dealerHas21) {
            this.blackJack(dealerHas21, playerHas21);
        } else {
            // player's turn
            this.store.update(currentGameState => {
                currentGameState.playerTurn = true;
                currentGameState.isActive   = true;
                return currentGameState;
            });
        }
    }


    // Starts the dealer's play cycle
    async startDealerPlay() {
        // flip card over
        this.store.update(currentGameState => {
            currentGameState.dealer.cards[1].flip();
            currentGameState.playerTurn = false;
            return currentGameState;
        });

        while(get(this.store).dealer.handValue < 17) {
            await this.drawCards(1);
        }

        this.compareHands();
    }


    compareHands() {
        const gameState  = get(this.store);
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


    async endRound(message = '') {
        this.store.update(currentGameState => {
            currentGameState.dealer.cards[1].faceDown = false;
            currentGameState.isActive   = false;
            currentGameState.playerTurn = false;
            return currentGameState;
        });

        await new Promise(r => setTimeout(r, 1000));

        if (message) alert(message);
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
}


function createGame() {
    
    // Create the store
    const game = new Game();
    const { subscribe } = game.store

    const startGame = () => game.start();
    const hit       = () => game.hit();
    const stand     = () => game.stand();

    return {
        subscribe,
        startGame,
        hit,
        stand
    }
}

export const game = createGame();