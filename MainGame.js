import React, { useEffect, useState } from 'react';



function MainGame(){


    const [tiles, setTiles] = useState([
        {id: '1', text: '🎃', matching: false},
        {id: '1', text: '🎃', matching: false},
        {id: '2', text: '🤖', matching: false},
        {id: '3', text: '👾', matching: false},
        {id: '2', text: '🤖', matching: false},
        {id: '3', text: '👾', matching: false},
        {id: '4', text: '👽', matching: false},
        {id: '5', text: '🤡', matching: false},
        {id: '5', text: '👽', matching: false},
        {id: '4', text: '🤡', matching: false},
        {id: '6', text: '👻', matching: false},
        {id: '6', text: '👻', matching: false},
        
    ])

    const [choiceOne, setchoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)

   
   const [time, setTime] = useState([
    { id: Math.random(),timeText: '0'}
   ])
  
    const [turn, setTurn] = useState(0)

    useEffect(() => {

      if(choiceOne && choiceTwo){
        if(choiceOne.id === choiceTwo.id){
          setTiles(prevcard => {
            return prevcard.map(card => {
              if(card.id === choiceOne.id){
                return {...card, matching: true}
              } else {
                return card
              }
            })
          })
          ResetTurn()
        } else {
          ResetTurn()
        }
         
      }


     

    }, [choiceOne, choiceTwo])


    const SetGame = () => {

      const newTurn = turn
     
     setTiles(prevcard => {
      prevcard.sort(() => Math.random() -0.5)
     })
      
      setchoiceOne(null)
      setChoiceTwo(null)
      setTurn(prevTurn => prevTurn +=1)

      const RemoveList = tiles.map(card => {
        if(choiceOne === null && choiceTwo === null){
          return {...card, matching: false} 
          
        }
      })

      
      //setTime(prevtime => {
        //prevtime.map(e => {
         // var day = new Date()
         // var second = day.getSeconds()

          //return {...e, timeText: second}
        //})
     //// })
     // console.log(time)

    
      setTiles(RemoveList)

      

      console.log(tiles)

    }

    const HandleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setchoiceOne(card)

    }


    const ResetTurn = () => {
      setchoiceOne(null)
      setChoiceTwo(null)
     
    
    }

    
    


  

   

    
    const TiliesElement = tiles.map(card => {
      return <TilieComponent flliped={card === choiceOne || card === choiceTwo || card.matching} HandleChoice={HandleChoice} card={card} />
    })

   
    return(
        
      <div className='web-app-flex-container'>
        <button onClick={SetGame} className='btn-game'>New game</button>
        
        <h1 className='web-app-title'>Memory Game</h1>
        <div className='card-box'>
            {TiliesElement}
        </div>
      </div>
    )
}


function TilieComponent(props){

  return(
    <div onClick={() => props.HandleChoice(props.card)} className={`none ${props.flliped ? 'active' : ''}`} key={props.card.id}>{props.card.text}</div>
  )
}






export default MainGame