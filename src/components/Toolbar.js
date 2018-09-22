import React from 'react'
import Chapter from '../images/Chapter.png'
import Verse from '../images/Verse.png'
import Source from '../images/Source.png'
import Black from '../images/Black.png'
import Red from '../images/Red.png'
import Green from '../images/Green.png'
import Blue from '../images/Blue.png'
import Footnote from '../images/Footnote.png'
import Subtitle from '../images/Subtitle.png'
import SVReader from '../images/SVReader.png'
import Editor from '../images/editor.png'
import LogOut from '../images/LogOut.png'

const Toolbar = (props) => {
    return (
        <div style={{
            width: '97.8%',
            height: 'fit-content',
            padding: '4px 4px 0 4px',
            border: '2px solid',
            margin: '0 auto',
            // borderRadius: '10px',
            textAlign: 'left',
            backgroundColor: 'rgba(255,255,255,1)',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            zIndex: '1000'
          }}>
            <img src={SVReader} alt='Logo' style={{marginRight: '0px'}}/>
            <img src={Editor} alt='Logo' style={{marginRight: '2%'}}/>
            <img src={Chapter} onClick={props.chapter} alt='Chapter'/>
            <img src={Verse} onClick={props.verse} alt='Verse'/>
            <img src={Source} onClick={props.source} alt='Source'/>
            <img src={Black} onClick={props.black} alt='Black'/>
            <img src={Red} onClick={props.red} alt='Red'/>
            <img src={Green} onClick={props.green} alt='Green'/>
            <img src={Blue} onClick={props.blue} alt='Blue'/>
            <img src={Footnote} onClick={props.footnote} alt='Footnote'/>
            <img src={Subtitle} onClick={props.subtitle} alt='Subtitle'/>
            <img src={LogOut} onClick={props.logOutButton} alt='LogOut'/> 
        </div>
    )
}

export default Toolbar;