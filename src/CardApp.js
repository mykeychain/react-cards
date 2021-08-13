import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card.js";

const BASE_URL = "http://deckofcardsapi.com/api/deck/"

/** CardApp
 *    state:
 *      - pile: {cards: [{code, url}, ...], remaining: 51}
 *      - deckId: "string"
 * 
 *    CardApp -> Card
 */
function CardApp() {
    const [{cards, remaining}, setPile] = useState({cards: [], remaining: 0});
    const [deckId, setDeckId] = useState("");

    // useEffect: gets and sets deck id on mount
    useEffect(function setDeckIdOnMount() {
        async function getDeckId() {
            const newDeckUrl = `${BASE_URL}new/shuffle/?deck_count=1`;
            const resp = await axios.get(newDeckUrl);
            setDeckId(resp.data.deck_id);
            setPile(oldPile => (
                {
                    cards: [...oldPile.cards],
                    remaining: resp.data.remaining,
                }
            ));
        }
        getDeckId();
    }, [ ])

    // getCard: draws 1 card from cards API and sets card code & url
    async function getCard() {
        const resp = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
        const newCard = {
            code: resp.data.cards[0].code,
            url: resp.data.cards[0].image,
        }

        setPile(oldPile => (
            {
                cards: [...oldPile.cards, newCard],
                remaining: resp.data.remaining
            }
        ));
    }

    // handleClick: 
    function handleClick() {
        console.log("remaing cards: ", remaining)
        if (remaining === 0) {
            alert("Error: no cards remaining!")
        } else {
            getCard();
        }
    }


    return (
        <div className="CardApp">
            <button onClick={handleClick}>Gimme a Card</button>
            {cards.map(card => <Card url={card.url} code={card.code} key={card.code}/>)}
        </div>
    )
}

export default CardApp;