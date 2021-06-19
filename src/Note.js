class Note {
    constructor(location, duration) {
        this.index = Math.round(location.y/SPACING)
        this.x = location.x
        this.y = this.index * SPACING
        this.speed = 0.005 * Canvas.width
        this.frequency = FREQ[this.index]
        this.name = NOTES[this.index]
        this.born = new Date().getTime()
        this.duration = 0.5
    }
    Update() {
        this.x -= this.speed
    }
    Draw() {
        DrawNote({x: this.x, y: this.y}, this.duration)
    }
    Transform(){
        let diff = new Date().getTime() - this.born
        // let noteType = Math.floor(diff/5000)
        let noteType = Math.floor(diff/COMPARE_TIME)
        switch (noteType) {
            case 0: 
            this.duration = 0.5
                break;
            case 1: this.duration = 1
                break;
            case 2: this.duration = 2
                break;
            case 3: this.duration = 4
                break;
            default:
                break;
        }
    }
    Play() {
        // console.log('Frequency: ', this.frequency, 'Name: ', this.name)
        MakeSound(this.frequency, this.duration)
    }
}

function DrawClef(location) {
    const aspectRatio = ClefImage.width / ClefImage.height
    const newHeight = Canvas.height * 0.70
    const newWidth = newHeight * aspectRatio 

    ctx.drawImage(ClefImage, location.x, location.y - newHeight/2, newWidth, newHeight)
}

function DrawNote(location, duration) {
    ctx.fillStyle = '#000'
    ctx.strokeStyle = '#000'
    let Radius = SPACING

    // Drawing the circle
    ctx.save()
    ctx.translate(location.x, location.y)
    ctx.rotate(-30* Math.PI/360)
    ctx.scale(1.05, 0.8)
    ctx.beginPath()
    ctx.arc(0, 0, Radius, 0, Math.PI * 2)
    ctx.stroke()
    if(duration <= 1) {
        ctx.fill()
    }
    ctx.closePath()
    ctx.restore()

    // Drawing the vertical line
    if(duration <= 2) {
        ctx.beginPath()
        ctx.moveTo(location.x + SPACING, location.y)
        ctx.lineTo(location.x + SPACING, location.y - SPACING * 5)
        ctx.stroke()
        ctx.closePath()
    }

    // Drawing the curves
    if(duration === 0.5) {
        ctx.beginPath()
        ctx.moveTo(location.x + SPACING, location.y - SPACING * 5)
        ctx.bezierCurveTo(location.x + SPACING * 2, location.y - SPACING * 3.5, 
            location.x + SPACING * 2.5, location.y - SPACING * 2.5,
            location.x + SPACING * 2, location.y - SPACING * 1.5)

        ctx.bezierCurveTo(location.x + SPACING * 2, location.y - SPACING * 2, 
            location.x + SPACING * 2.5, location.y - SPACING * 2.5,
            location.x + SPACING, location.y - SPACING * 4.5)
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
    }
}

function movingNotes() {
    notesArray.forEach((note) => {
        
    })
    for(let i = 0; i < notesArray.length; i++) {
        notesArray[i].Draw()
        notesArray[i].Update()

        if((notesArray[i].x - SPACING) < Margin.L) {
            notesArray[i].Play()
            notesArray.splice(i, 1)
            i--;
        }
        if(notesArray.length > 0 && Mouse.isPressed) {
            notesArray[notesArray.length - 1].Transform()
        }
    }
}