import React from 'react'

const PrevData = (props) => { 
    if (props.data !== null) {     
    return (
        <div>
            <p>Previous Translation: <span style={{color: 'blue'}}>{props.data}</span></p>
        </div>
    )
}}

export default PrevData