


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame

// class Circle {
//     constructor (x, y, r) {
//         this.x  = x 
//         this.y = y
//         this.r = r
//         this.ctx = document.querySelector('#canvas').getthis.Context('2d')
//         // this.drawCircle()
//         this.pro = 0
//     }
//     progress () {
        
//         this.pro += 1
//         console.log(this.pro)
//     }
//     drawCircle () {

//         let ctx = this.ctx
//         let pro = this.pro
//         console.log(ctx)
//         ctx.beginPath()
        
//         // ctx.closePath()
//        console.log(pro)
//         ctx.arc(100, 75 , 35, 0,  Math.PI / 180 * pro )
//         ctx.fillStyle = 'rgba(250, 250, 250, 1)'
//         ctx.fill()
//         ctx.lineWidth = 5
//         ctx.strokeStyle="#aaf";
//         ctx.stroke();
//     }
// }




// var circle = new Circle()

// class AnimalCircle extends Circle {
//     constructor(x, y, r) {
//         super(x, y, r)
//         this.addPro()
//         this.animateId
//     }
//     addPro () {
//         this.pro ++ 
       
//         if (this.pro < 360) {
//             this.animateId = requestAnimationFrame(this.addPro.bind(this))
//         } else {
//             console.log(this.pro)
//             cancelAnimationFrame(this.animateId)
//         }
//         this.drawCircle()
//     }
// }
//  new AnimalCircle()

// requestAnimationFrame(circle.progress)

// loading动画
// 如果动画的标识位不为true，动画在50%之后开始变慢
// 如果loading动画在90%是标识位不为true，停止动画
 class CanvasCircleLoading {
        constructor () {
            this.canvas = document.getElementById("canvas")
            this.context = this.canvas.getContext("2d")
            this.cirX = canvas.width/ 2
            this.cirY = canvas.height/ 2
            this.rad = Math.PI * 2 / 100
            this.n = 1
            this.speed = 150
            this.r = 100
            this.timer = null


        }
        
        //绘制最外层细圈
        writeCircle(){
            this.context.save();         //save和restore可以保证样式属性只运用于该段canvas元素
            this.context.beginPath();    //开始路径
            this.context.strokeStyle = "#49f";       //设置边线的颜色
            this.context.arc(this.cirX, this.cirY, this.r, 0, Math.PI * 2, false);      //画一个圆的路径
            this.context.stroke();       //绘制边线
            this.context.restore();
        }

        //绘制文本
         writeText(n){
            this.context.save();
            this.context.strokeStyle = "#49f";
            this.context.font = "40px Arial";
            this.context.strokeText(this.n.toFixed(0)+"%",this.cirX - 30 ,this.cirY +10);
            this.context.stroke();
            this.context.restore();
        }

        //绘制蓝色外圈
         writeBlue(n){
            this.context.save();
            this.context.strokeStyle = "#49f";
            this.context.lineWidth = 4;
            this.context.beginPath();
            this.context.arc(this.cirX, this.cirY, this.r, -Math.PI/2,-Math.PI/2+ this.rad*n, false);
            this.context.stroke();
            this.context.restore();
        }

         DreamLoading(){
            //清除所有，重新绘制
            this.context.clearRect(0,0,canvas.width,canvas.height)
            this.writeCircle();
            this.writeText(this.n)
            this.writeBlue(this.n)
            if(this.n < 100){
                        
                if(this.n >= 50){
                    this.n = this.n + .01
                    this.stopAnimate()
                } else if (this.n >= 90) {
                    this.n = this.n + .01
                }
                else {
                    this.n= this.n+0.5        
                }
            } else {
                this.n = 0
            }
            //setTimeout(DreamLoading,speed);
            this.timer = requestAnimationFrame(this.DreamLoading.bind(this))
        }
        stopAnimate () {
            console.log('停止动画')
            cancelAnimationFrame(this.timer)
        }
        // 加载完后直接到达成功
        Direct2End () {
            this.n = 100
        }

    }
        
    var loading =  new CanvasCircleLoading ()
    loading.DreamLoading()


