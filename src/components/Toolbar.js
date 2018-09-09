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
import styles from './Toolbar.css'

const Toolbar = (props) => {
    return (
        <div style={{
            width: 'fit-content',
            height: 'fit-content',
            padding: '4px 4px 0 4px',
            border: '2px solid',
            margin: '0 auto',
            borderRadius: '10px',
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,1)',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            zIndex: '1000'
          }}>
            <img className={styles.toolbarButtons} src={SVReader} alt='Logo' style={{marginRight: '0px'}}/>
            <img className={styles.toolbarButtons} src={Editor} alt='Logo' style={{marginRight: '20px'}}/>
            <img className={styles.toolbarButtons} src={Chapter} onClick={props.chapter} alt='Chapter'/>
            <img className={styles.toolbarButtons} src={Verse} onClick={props.verse} alt='Verse'/>
            <img className={styles.toolbarButtons} src={Source} onClick={props.source} alt='Source'/>
            <img className={styles.toolbarButtons} src={Black} onClick={props.black} alt='Black'/>
            <img className={styles.toolbarButtons} src={Red} onClick={props.red} alt='Red'/>
            <img className={styles.toolbarButtons} src={Green} onClick={props.green} alt='Green'/>
            <img className={styles.toolbarButtons} src={Blue} onClick={props.blue} alt='Blue'/>
            <img className={styles.toolbarButtons} src={Footnote} onClick={props.footnote} alt='Footnote'/>
            <img className={styles.toolbarButtons} src={Subtitle} onClick={props.subtitle} alt='Subtitle'/>
        </div>
    )
}

export default Toolbar;