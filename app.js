/*
Game Function
  - Player must guess a number between min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify the player of the correct answer if looses
  - Let player to choose play again
*/

//Game values
let min=1,
    max=10,
    winningNum=getRandomNum(min,max),
    guessesLeft=3

//UI Elements
const game=document.querySelector('#game'),
      minNum=document.querySelector('.min-num'),
      maxNum=document.querySelector('.max-num'),
      guessBtn=document.querySelector('#guess-btn'),
      guessInput=document.querySelector('#guess-input'),
      message=document.querySelector('.message')

//Assign UI min and max
minNum.textContent=min
maxNum.textContent=max

//PLayagain event listener
game.addEventListener('mousedown',function(e){
   if(e.target.className==='play-again'){
     window.location.reload()
   }
})

//Listen for guess
guessBtn.addEventListener('click',function(){
  let guess=parseInt(guessInput.value)

  //Validate
  if(isNaN(guess) || guess<min || guess>max){
    setMessage(`Please Enter a Number Between ${min} and ${max}`,'red')
  } else {

  //Check if winning number
  if(guess===winningNum){
    //Game-over won
    gameOver(true,`${winningNum} is correct ! YOU WIN...`)

  } else {
    guessesLeft-=1

    if(guessesLeft===0){
      //Game over - lost

      gameOver(false,`Game Over ! YOU LOST... The Correct Number was ${winningNum}.`)
    } else {
      //Game continues - answer wrong

      //change border color
      guessInput.style.borderColor='red'

      //Clear input
      guessInput.value=''

      //Tell user its wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left...`,'red')
    }

  }
}
}) 

function gameOver(won,msg){
  let color
  won===true? color='green' : color='red'
  //Disable Input
  guessInput.disabled=true
  //change border color
  guessInput.style.borderColor=color
  //Set text color
  message.style.color=color
  //Set message
  setMessage(msg)

  //Play-again
  guessBtn.style.color='blue'
  guessBtn.style.borderColor='blue'
  guessBtn.value='Play Again'
  guessBtn.className+='play-again'
}

//get Winning number
function getRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

//Set message
function setMessage(msg,color){
  message.style.color=color
  message.textContent=msg
}