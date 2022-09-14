import React from "react";

interface IRangeProps {
    selected: number,
    range: string,
    index: number,
    selectRange: (index: number) => void
}

function Range ({selected, range, index, selectRange}: IRangeProps){

    const style = {
        backgroundColor: selected===index? "#4B40EE" : "",
        color: selected===index? "#ffffff" : ""

    }
    return(
        <button className='range-button' style={style} onClick={() => selectRange(index)}> {range}</button>
    )
}
export default Range;