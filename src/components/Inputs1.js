import React from 'react'


const Inputs = (props) => {
    
      function storyTitleInput (event) {
        if (event.target.value !== localStorage.getItem('title')) 
          localStorage.setItem('title', event.target.value)
      }
    
      function bookNameInput (event) {
        if (event.target.value !== localStorage.getItem('bookName')) 
          localStorage.setItem('bookName', event.target.value)
      }
    
      
    return (
        <div style={{textAlign: 'left', margin: '0 auto', width: '80%'}}>
            <p style={{textDecoration: 'underline', color: 'darkred'}}>SELECT YOUR STORY:</p><p>Story Number:</p>
            <select selected={props.currentValue} name="Story Number" onChange={props.handleChange} style={{fontSize: '15px', height: '30px', margin: '10px'}}>
                <option value='null'>-</option>
                <option value='0'>300</option>
                <option value='1'>301</option>
                <option value='2'>302</option>
                <option value='3'>303</option>
                <option value='4'>304</option>
                <option value='5'>305</option>
                <option value='6'>306</option>
                <option value='7'>307</option>
                <option value='8'>308</option>
                <option value='9'>309</option>
                <option value='10'>310</option>
                <option value='11'>311</option>
                <option value='12'>312</option>
                <option value='13'>313</option>
                <option value='14'>314</option>
                <option value='15'>315</option>
                <option value='16'>316</option>
                <option value='17'>317</option>
                <option value='18'>318</option>
                <option value='19'>319</option>
                <option value='20'>320</option>
                <option value='21'>321</option>
                <option value='22'>322</option>
                <option value='23'>323</option>
                <option value='24'>324</option>
                <option value='25'>325</option>
                <option value='26'>326</option>
                <option value='27'>327</option>
                <option value='28'>328</option>
                <option value='29'>329</option>
                <option value='30'>330</option>
                <option value='31'>331</option>
                <option value='32'>332</option>
                <option value='33'>333</option>
                <option value='34'>334</option>
                <option value='35'>335</option>
                <option value='36'>336</option>
                <option value='37'>337</option>
                <option value='38'>338</option>
                <option value='39'>339</option>
                <option value='40'>340</option>
                <option value='41'>341</option>
                <option value='42'>342</option>
                <option value='43'>343</option>
                <option value='44'>344</option>
                <option value='45'>345</option>
                <option value='46'>346</option>
                <option value='47'>347</option>
                <option value='48'>348</option>
                <option value='49'>349</option>
                <option value='50'>350</option>
                <option value='51'>351</option>
                <option value='52'>352</option>
                <option value='53'>353</option>
                <option value='54'>354</option>
                <option value='55'>355</option>
                <option value='56'>356</option>
                <option value='57'>357</option>
                <option value='58'>358</option>
                <option value='59'>359</option>
                <option value='60'>360</option>
                <option value='61'>361</option>
                <option value='62'>362</option>
                <option value='63'>363</option>
                <option value='64'>364</option>
                <option value='65'>365</option>
                <option value='66'>366</option>
                <option value='67'>367</option>
                <option value='68'>368</option>
                <option value='69'>369</option>
                <option value='70'>370</option>
                <option value='71'>371</option>
                <option value='72'>372</option>
                <option value='73'>373</option>
                <option value='74'>374</option>
                <option value='75'>375</option>
                <option value='76'>376</option>
                <option value='77'>377</option>
                <option value='78'>378</option>
                <option value='79'>379</option>
                <option value='80'>380</option>
                <option value='81'>381</option>
                <option value='82'>382</option>
                <option value='83'>383</option>
                <option value='84'>384</option>
                <option value='85'>385</option>
                <option value='86'>386</option>
                <option value='87'>387</option>
                <option value='88'>388</option>
                <option value='89'>389</option>
                <option value='90'>390</option>
                <option value='91'>391</option>
                <option value='92'>392</option>
                <option value='93'>393</option>
                <option value='94'>394</option>
                <option value='95'>395</option>
                <option value='96'>396</option>
                <option value='97'>397</option>
                <option value='98'>398</option>
                <option value='99'>399</option>
                <option value='100'>400</option>
                <option value='101'>401</option>
                <option value='102'>402</option>
                <option value='103'>403</option>
                <option value='104'>404</option>
                <option value='105'>405</option>
                <option value='106'>406</option>
                <option value='107'>407</option>
                <option value='108'>408</option>
                <option value='109'>409</option>
                <option value='110'>410</option>
                <option value='111'>411</option>
                <option value='112'>412</option>
                <option value='113'>413</option>
                <option value='114'>414</option>
                <option value='115'>415</option>
                <option value='116'>416</option>
                <option value='117'>417</option>
                <option value='118'>418</option>
                <option value='119'>419</option>
                <option value='120'>420</option>
                <option value='121'>421</option>
                <option value='122'>422</option>
                <option value='123'>423</option>
                <option value='124'>424</option>
                <option value='125'>425</option>
                <option value='126'>426</option>
                <option value='127'>427</option>
                <option value='128'>428</option>
                <option value='129'>429</option>
                <option value='130'>430</option>
                <option value='131'>431</option>
            </select>
            <br />
            <hr />
            <h1 style={{display: `${props.display}`, margin: '5px'}}>REFERENCE: {props.bookName} {props.reference}</h1>
            <p>Story Title:<br /><span style={{color: 'red'}}>{props.title}</span></p>
            <input type='text' placeholder='Translation of red text goes here...' onChange={storyTitleInput} style={{border: 'solid 0.5px black', width: '100%', height: '15px'}}/>
            <br />
            <hr />
            <p>BookName:<br /><span style={{color: 'red'}}>{props.bookName}</span></p>
            <input type='text' placeholder='Translation of red text goes here...' onChange={bookNameInput} style={{border: 'solid 0.5px black', width: '100%', height: '15px'}}/>
            <br />
            
        </div>
    )
    
}

export default Inputs;