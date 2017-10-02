


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame
class Circle {
    constructor (x, y, r) {
        this.x  = x 
        this.y = y
        this.r = r
        this.ctx = document.querySelector('#canvas').getContext('2d')
        // this.drawCircle()
        this.pro = 0
    }
    progress () {
        
        this.pro += 1
        console.log(this.pro)
    }
    drawCircle () {

        let ctx = this.ctx
        let pro = this.pro
        console.log(ctx)
        ctx.beginPath()
        
        // ctx.closePath()
       console.log(pro)
        ctx.arc(100, 75 , 35, 0,  Math.PI / 180 * pro )
        ctx.fillStyle = 'rgba(250, 250, 250, 1)'
        ctx.fill()
        ctx.lineWidth = 5
        ctx.strokeStyle="#aaf";
        ctx.stroke();
    }
}




// var circle = new Circle()

class AnimalCircle extends Circle {
    constructor(x, y, r) {
        super(x, y, r)
        this.addPro()
        this.animateId
    }
    addPro () {
        this.pro ++ 
       
        if (this.pro < 360) {
            this.animateId = requestAnimationFrame(this.addPro.bind(this))
        } else {
            console.log(this.pro)
            cancelAnimationFrame(this.animateId)
        }
        this.drawCircle()
    }
}
 new AnimalCircle()

// requestAnimationFrame(circle.progress)


