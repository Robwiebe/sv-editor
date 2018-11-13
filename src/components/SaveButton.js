import React from 'react'
import axios from '../axios-firebase'

const SaveButton = (props) => {
    function saveInput () {
        const items = {
            language: props.language,
            story: props.story,
            display: props.display,
            bookId: props.bookId,
            bookName: props.bookName,
            ref: props.reference,
            prevPath: props.prevPath,
            nextPath: props.nextPath,
            path: props.path,
            html: props.html,
            questionsTitle: props.questionsTitle,
            Question1: props.Q1,
            Question2: props.Q2,
            Question3: props.Q3,
            Question4: props.Q4,
        }
        
        axios.put(`/${props.language}/${props.story}.json`, items)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
    
    return (
        <div>
           <button onClick={saveInput} style={{height: '25px', width: 'fit-content', padding: '5px'}}>{props.text}</button>
        </div>
    )
}

export default SaveButton;