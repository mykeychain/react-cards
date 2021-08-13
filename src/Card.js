import React from "react";

/** Card
 *    props:
 *      - url: "http://..."
 *      - code: "KH"
 * 
 *    CardApp -> Card
 */
function Card ({url, code}) {
    const style = {position: "absolute"};

    return (
        <img src={url} alt={code} style={style} key={code}></img>
    );
}


export default Card