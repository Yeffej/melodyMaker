/** @type {HTMLCanvasElement} */
const Canvas = document.getElementById('canvas1')
const ctx = Canvas.getContext('2d')

const NOTES = ['E6', 'D6', 'C6', 'B5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 
'G4', 'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'G3', 'F3']
const FREQ = [1318.510, 1174.660, 1046.500, 987.767, 880.000, 783.991, 698.456, 659.255, 
587.330, 523.251, 493.883, 436.040, 392.440, 349.228, 329.620, 293.665, 261.626, 246.942, 
222.000, 195.998, 174.614]

const NotesQuantity = NOTES.length;
let SPACING


window.addEventListener('load', ()=> {
    fitContent()
    AddListeners()
    DrawScene()
    
})

function fitContent() {
    Canvas.width = document.body.clientWidth
    Canvas.height = document.body.clientHeight
}

function AddListeners() {
    window.addEventListener('resize', fitContent); 
}

function DrawNote(location) {
    ctx.fillStyle = '#000'
}

function DrawScene() {
    SPACING = Canvas.height / NotesQuantity
    const centerX = Canvas.width/2
    const centerY = Canvas.height/2

    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1

    for(let i = -2; i <= 2; i++) {
        let y = centerY - SPACING * i * 2
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(Canvas.width, y)
        ctx.stroke()
        ctx.closePath()
    }

    const location = {
        x: centerX,
        y: centerY,
    }

    DrawNote(location)
}
