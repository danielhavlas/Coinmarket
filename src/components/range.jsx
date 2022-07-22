import React from "react";

function Range ({selected, range, index, selectRange}){

    const style = {
        backgroundColor: selected===index? "#4B40EE" : "transparent",
        color: selected===index? "#ffffff" : "#6F7177"

    }
    return(
        <button className='range-button' style={style} onClick={() => selectRange(index)}> {range}</button>
    )
}
export default Range;