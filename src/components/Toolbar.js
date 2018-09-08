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
            backgroundColor: 'lightyellow'
          }}>
            <img className={styles.toolbarButtons} src={Chapter} alt='Chapter'/>
            <img className={styles.toolbarButtons} src={Verse} alt='Verse'/>
            <img className={styles.toolbarButtons} src={Source} alt='Source'/>
            <img className={styles.toolbarButtons} src={Black} alt='Black'/>
            <img className={styles.toolbarButtons} src={Red} alt='Red'/>
            <img className={styles.toolbarButtons} src={Green} alt='Green'/>
            <img className={styles.toolbarButtons} src={Blue} alt='Blue'/>
            <img className={styles.toolbarButtons} src={Footnote} alt='Footnote'/>
            <img className={styles.toolbarButtons} src={Subtitle} alt='Subtitle'/>
        </div>
    )
}

export default Toolbar;