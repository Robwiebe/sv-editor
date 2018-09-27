import React from 'react'


const LanguageInput = (props) => {    
      
    return (
        <div style={{textAlign: 'left', margin: '0 auto', width: '80%'}}>
            <p style={{textDecoration: 'underline', color: 'darkred'}}>SELECT YOUR LANGUAGE:</p>
            <select selected={props.currentValue} name="Language" onChange={props.languageChange} style={{fontSize: '15px', height: '30px', margin: '10px'}}>
                <option value='null'>-</option>
                <option value='English'>English</option>
                <option value='UniSkript-English'>UniSkript (English)</option>
                <option value='Thai'>Thai</option>
                <option value='Spanish'>Spanish</option>
                <option value='Korean'>Korean</option>
                <option value='Portuguese'>Portuguese</option>
                <option value='Russian'>Russian</option>
                <option value='Uzbek'>Uzbek</option>
                <option value='Kazakh'>Kazakh</option>
                <option value='Kyrgyz'>Kyrgyz</option>
                <option value='Simplified-Chinese'>Simplified Chinese</option>
                <option value='Hebrew'>Hebrew</option>
                <option value='Greek'>Greek</option>
                <option value='French'>French</option>
            </select>
            <hr />
            
        </div>
    )
    
}

export default LanguageInput;