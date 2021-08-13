cardApp
    props: 
    state:
        deckId
        cards: [{url, code}, ...]
    
    functions: 
        onClick
            axios request for draw card
        effect
            axios request to get deck id on initial render

    cardApp -> Card



Card (presentational component)
    props: 
        url
        code
