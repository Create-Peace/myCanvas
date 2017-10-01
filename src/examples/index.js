
class Circle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = Math.random() * 10
        this._mx = Math.random()
        this._my = Math.random()
    }
    // 画圆
    drawCircle(ctx) {
        ctx.beginPath()

        ctx.arc(this.x, this.y, this.r, 0, 36)

        ctx.closePath()
        ctx.fillStyle = 'rgba(250, 250, 250 .3)'
        ctx.fill()

    }
    //  画直线
    drawLine(ctx, _circle) {
        let dx = this.x - _circle.x
        let dy = this.y - _circle.y
        let d = Math.sqrt(dx * dx + dy * dy)

        if (d < 150) {
            ctx.beginPath()

            ctx.moveTo(this.x, this.y)

            ctx.lineTo(_circle.x, _circle.y)

            ctx.closePath()

            ctx.strokeStyle = 'rgba(204, 204, 204, .3)'

            ctx.stroke()
        }
    }
    // w, h 屏幕宽度和高度
    move(w, h) {
        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx)
        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my)
        this.x += this._mx / 2
        this.y += this._my / 2
    }
}

class currentCirle extends Circle {
    constructor(x, y) {
        super(x, y)
    }
    drawCircle(ctx) {
        ctx.beginPath()

        this.r = 8
        ctx.arc(this.x, this.y, this.r, 0, 360)

        ctx.closePath()
        ctx.fillStyle = 'rgba(255, 77, 54, .6)'
        ctx.fill()
    }
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame


let canvas = document.querySelector('#canvas')

//    let ctx = canvas.getContext('2d')

//    console.log(ctx)

let w = canvas.width = canvas.offsetWidth

let h = canvas.height = canvas.offsetHeight

let circles = []

let current_circle = new currentCirle(0, 0)

let Draw = function () {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    console.log(this.ctx)

    this.w = w

    this.h = h

    this.circles = []

    this.current_circle = new currentCirle(0, 0)
    this.init(60)
}
Draw.prototype.connectLine = function () {
    console.log(this.ctx, this.w, this.h)
    let w = this.w
    let h = this.h
    this.ctx.clearRect(0, 0, w, h)
    console.log(this.circles.length)
    for (let i = 0; i < this.circles.length; i++) {
        this.circles[i].move(w, h)
        this.circles[i].drawCircle(this.ctx)

        for (let j = i + 1; j < this.circles.length; j++) {
            console.log(this.circles[i])
            this.circles[i].drawLine(this.ctx, this.circles[j])
        }
    }
    if (this.current_circle.x) {
        this.current_circle.drawCircle(this.ctx)
        for (var k = 1; k < this.circles.length; k++) {
            this.current_circle.drawLine(this.ctx, this.circles[k])
        }
    }
    requestAnimationFrame(this.connectLine.bind(this))
}

Draw.prototype.init = function (num) {
    for (var i = 0; i < num; i++) {
        this.circles.push(new Circle(Math.random() * this.w, Math.random() * this.h))
    }
    console.log(this.circles.length)
    this.connectLine()
}

window.addEventListener('load', function () {
    const draw = new Draw()
    window.onmousemove = function (e) {
        e = e || window.event

        draw.current_circle.x = e.clientX
        draw.current_circle.y = e.clientY
    }

    window.onmouseout = function () {
        draw.current_circle.x = null
        draw.current_circle.y = null
    }
})


//    var c = document.querySelector('#canvas')
//    var ctx=c.getContext("2d");
//    ctx.beginPath()
//    ctx.arc(45, 45, 50, 0, 2*Math.PI)
//    ctx.closePath()
//    ctx.fillStyle = 'rgba(250, 0, 0, .3'
//    ctx.fill();