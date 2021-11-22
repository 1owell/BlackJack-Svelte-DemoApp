const apiBase = 'https://deckofcardsapi.com/api';

function drawCard() {

}


function getCardValue(value) {

}

function startGame(deckAmount = 6) {
    fetch(`${ apiBase }/deck/new/shuffle/?deck_count=${ deckAmount }`)
        .then(response => response.json)
        .then(deck => deck);

        // {
        //     "success": true,
        //     "deck_id": "3p40paa87x90",
        //     "shuffled": true,
        //     "remaining": 52
        // }
}

function drawCard(deckId) {
    //https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
    fetch(`${ apiBase }/deck/${ deckId }/draw`)
        .then(response => response.json)
        .then(card => {
            //{"success": true, "deck_id": "tahmumsgi822", "cards": [{"code": "0C", "image": "https://deckofcardsapi.com/static/img/0C.png", "images": {"svg": "https://deckofcardsapi.com/static/img/0C.svg", "png": "https://deckofcardsapi.com/static/img/0C.png"}, "value": "10", "suit": "CLUBS"}], "remaining": 51}
        })
}

function evaluateHand(cards) {
    
}

/**
 * 1. Be able to start a game by getting a new deck id from api
 * 2. Deal card to player
 * 3. Deal card to dealer (face up)
 * 4. Deal card to player
 * 5. Deal card to dealer (face down)
 * 5.5. If dealer face up card is 10 or A, then evaluate hand for BJ
 * 6. Check value of player's hand for 21
 * 7. Check value of dealer's hand for 21
 * 8. If both have 21, then tie, otherwise if one has 21 that hand wins
 * 9. Otherwise, once player has hit the stand btn, dealer stands on 17+ and evaluates game
 *  Dealer hits until bust or 17+
 * 10.
 */