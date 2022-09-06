import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cards from './Cards';

const BASE_DECK_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
const BASE_CARD_URL = 'https://deckofcardsapi.com/api/deck/';

/** Deck component.
 *
 * State:
 * - deckId
 *
 * Effects:
 * - shuffle deck upon mount & shuffle button click
 * - draw card upon button click
 */
function Deck() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(function shuffleDeck() {
    async function getDeck() {
      const response = await axios.get(BASE_DECK_URL);
      setDeck(response.data);
    }

    getDeck();
  }, [])


  async function drawCard() {
    const cardRes = await axios.get(`${BASE_CARD_URL}${deck.deck_id}/draw`);
    setCards(c => [...c, cardRes.data.cards[0]]);
    setDeck({...deck, remaining: cardRes.data.remaining});
  }
  console.log(cards)

  return (
    <>
      {deck.remaining === 0 && <p>Error: no cards remaining!</p>}
      {deck.remaining >= 1 && <button onClick={drawCard}>Draw a Card</button>}
      {cards.length > 0 && <Cards cards={cards} />}
    </>
  )


}

export default Deck;