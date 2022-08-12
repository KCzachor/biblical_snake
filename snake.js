//import { question } from './question.js'

const questions = 
    [
        {
            "id": "0",
            "quest": "2 + 2 = 4",
            "answer": "true"
        },
        {
            "id": "1",
            "quest": "2 - 2 = 4",
            "answer": "false"
        },
        {
            "id": "2",
            "quest": "1 * 2 = 4",
            "answer": "false"
        }
    ]

//console.log(question)

const canvas = document.querySelector('#snGame')
const ctx = canvas.getContext('2d')
const question = document.querySelector("#question")


canvas.width="500" 
canvas.height="500"

const width = canvas.width
const height = canvas.height

const snWidth = 50
const snHeight = 50//clearInterval(timer);

//timer
const snSpeed = 50

//colors
const snHeadColor = "rgb(0, 0, 50)"
const snTailColor = "rgb(0, 0, 150)"
const trueAppleColor = "rgb(6, 91, 9)"
const falseAppleColor = "rgb(250, 0, 0)"

let snHeadX = 300
let snHeadY = 100

let direction = "r"

let longOfTail=3

let snBodyX = []
let snBodyY = []

let trueAppleX //= Math.floor(Math.random()*10%10)*50
let trueAppleY //= Math.floor(Math.random()*10%10)*50

let falseAppleX 
let falseAppleY

newApple()
//console.log(appleX)
//console.log(appleY)

	
for(let i = 1; i<=longOfTail; i++)
{
	snBodyY[i] = snHeadY
	snBodyX[i] = snHeadX-snWidth*i
	
}

window.addEventListener("load", draw)

let timer = setInterval(() => {
    //alert("działa")
   
	


	for(let i=longOfTail; i>=2; i--)
	{
		snBodyX[i] = snBodyX[i-1]
		snBodyY[i] = snBodyY[i-1]
	}	
	
	snBodyX[1] = snHeadX
	snBodyY[1] = snHeadY
	
	 if(direction=="r")
        snHeadX+=snSpeed

    if(direction=="l")
        snHeadX-=snSpeed

    if(direction=="u")
        snHeadY-=snSpeed

    if(direction=="d")
        snHeadY+=snSpeed


	

	let bittedTail=false
	for(let i=1; i<=longOfTail; i++)
		if(snBodyX[i]==snHeadX && snBodyY[i]==snHeadY)
				bittedTail=true

	if(snHeadX<0 || snHeadX>=width || 
		snHeadY<0 || snHeadY>=height ||
		bittedTail)
	{
		eatApple("wall")
	}


	if(snHeadX==trueAppleX && snHeadY==trueAppleY)
	{
		eatApple("true")
	}

	if(snHeadX==falseAppleX && snHeadY==falseAppleY)
	{
		eatApple("false")
	}

	draw()

	document.querySelector("#points").innerHTML=longOfTail-3
    question.innerHTML = questions[longOfTail-3].quest

}, 1000)

function draw()
{
    ctx.fillStyle = "rgb(90, 255, 10)"
    ctx.fillRect(0, 0, width, height)

	//snake
    ctx.fillStyle = snHeadColor
    ctx.fillRect(snHeadX, snHeadY, snWidth, snHeight)
	
	ctx.fillStyle = snTailColor
	for(let i=1; i<=longOfTail; i++)
		ctx.fillRect(snBodyX[i], snBodyY[i], snWidth, snHeight)
	
	//apples	
	ctx.fillStyle = trueAppleColor
	ctx.fillRect(trueAppleX, trueAppleY, snWidth, snHeight)
	
	ctx.fillStyle = falseAppleColor
	ctx.fillRect(falseAppleX, falseAppleY, snWidth, snHeight)
	

}

document.addEventListener("keyup", (element)=>{
    //alert(element.code)
    if(element.code == "ArrowLeft" && direction!="r") direction="l"
    else if(element.code == "ArrowRight" && direction!="l") direction="r"
    else if(element.code == "ArrowUp" && direction!="d") direction="u"
    else if(element.code == "ArrowDown" && direction!="u") direction="d"
})

function newApple()
{
	let badPosition
	do
	{
		badPosition = false
		trueAppleX = Math.floor(Math.random()*10%10)*50
		trueAppleY = Math.floor(Math.random()*10%10)*50
		if(trueAppleX==snHeadX && trueAppleX==snHeadY)
			badPosition=true

		for(let i=1; i<=longOfTail; i++)
			if(trueAppleX==snBodyX[i] && trueAppleY==snBodyY[i])
				badPosition=true	
		
	} while(badPosition)

	do
	{
		badPosition = false
		falseAppleX = Math.floor(Math.random()*10%10)*50
		falseAppleY = Math.floor(Math.random()*10%10)*50
		if(falseAppleX==snHeadX && falseAppleX==snHeadY)
			badPosition=true

		if(falseAppleX==trueAppleX && falseAppleX==trueAppleY)
			badPosition=true

		for(let i=1; i<=longOfTail; i++)
			if(falseAppleX==snBodyX[i] && falseAppleY==snBodyY[i])
				badPosition=true	
		
	} while(badPosition)
}

function eatApple(ans)
{
	if(ans==questions[longOfTail-3].answer)
	{
		longOfTail++
		if(longOfTail-3 < questions.length)
		{
			newApple()
		}
		else
		{
			clearInterval(timer)
			alert("Gratulacje wygrałeś!")
		}
		
	}
	else
	{
		clearInterval(timer)
		alert("koniec gry")
	}
	
}


