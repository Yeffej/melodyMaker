/** @type {HTMLCanvasElement} */
const Canvas = document.getElementById('canvas1')
const ctx = Canvas.getContext('2d')
const ClefImage = new Image()
ClefImage.src = './src/Images/ClefNote2.png'

const NOTES = ['E6', 'D6', 'C6', 'B5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 
'G4', 'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'G3', 'F3']
const FREQ = [1318.510, 1174.660, 1046.500, 987.767, 880.000, 783.991, 698.456, 659.255, 
587.330, 523.251, 493.883, 436.040, 392.440, 349.228, 329.620, 293.665, 261.626, 246.942, 
222.000, 195.998, 174.614]

const NotesQuantity = NOTES.length;
let SPACING
const Mouse = {
    x: undefined,
    y: undefined, 
    isPressed: false
}
const Margin = {
    R: undefined,
    L: undefined
}
const notesArray = []
/** @type {AudioContext} */
let AudioCtx
const COMPARE_TIME = 300

window.addEventListener('load', () => {
    fitContent()
    AddListeners()
    animate()
})

function fitContent() {
    Canvas.width = document.body.clientWidth
    Canvas.height = document.body.clientHeight

    Margin.R = Canvas.width * 0.90
    Margin.L = Canvas.width * 0.10
}

function AddListeners() {
    window.addEventListener('resize', fitContent);

    Canvas.addEventListener('mousedown', handleMousedown)
    Canvas.addEventListener('mouseup', handleMouseup)
    Canvas.addEventListener('mousemove', handleMousemove)
}

function DrawScene() {
    SPACING = Canvas.height / NotesQuantity
    // const centerX = Canvas.width/2
    const centerY = Canvas.height/2
    const index = Math.round(Mouse.y/SPACING)


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
        x: Margin.R,
        y: index * SPACING,
    }

    DrawNote(location, 0.5)
    DrawClef({
        x: Margin.L,
        y: centerY
    })
    movingNotes()
}

// functions of the listeners: 
function handleMousedown() {
    Mouse.isPressed = true
    
    notesArray.push(new Note({x: Margin.R, y: Mouse.y}))
}

function handleMouseup() {
    Mouse.isPressed = false
}

function handleMousemove(e) {
    Mouse.x = e.x
    Mouse.y = e.y
}

function animate() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height)
    DrawScene()
    requestAnimationFrame(animate)
}