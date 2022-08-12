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
const appleColor = "rgb(250, 0, 0)"

let snHeadX = 300
let snHeadY = 100

let direction = "r"

let longOfTail=3

let snBodyX = []
let snBodyY = []

let appleX //= Math.floor(Math.random()*10%10)*50
let appleY //= Math.floor(Math.random()*10%10)*50

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
		clearInterval(timer)
		alert("koniec gry")
	}


	if(snHeadX==appleX && snHeadY==appleY)
	{
		longOfTail++
		newApple()
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
	
	//apple	
	ctx.fillStyle = appleColor
	ctx.fillRect(appleX, appleY, snWidth, snHeight)
		

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
		appleX = Math.floor(Math.random()*10%10)*50
		appleY = Math.floor(Math.random()*10%10)*50
		if(appleX==snHeadX && appleX==snHeadY)
			badPosition=true

		for(let i=1; i<=longOfTail; i++)
			if(appleX==snBodyX[i] && appleY==snBodyY[i])
				badPosition=true	
		
	} while(badPosition)

}
