class Canvas {
    constructor(canvas) {
        this.canvas = canvas; // 画布
        this.ctx = canvas.getContext('2d'); // 绘图环境
        this.width = canvas.width; // 画布宽
		this.height = canvas.height; // 画布高
        this.lineWidth = 1; // 线宽
		this.strokeColor = 'red';	// 画笔颜色
		this.fillColor = 'green';	// 填充色
		this.toolName = 'tablet';	// 默认选中直线形状
		this.drawType = 'stroke';	//默认的绘制方式是划\填充
		this.history = [];	//默认的历史记录为数组
		this.edges = 3;	//默认的边数为3  
    }

    //将角度转换成弧度函数
    getAngle(arc) {
        return Math.PI / 180 * arc;
    }
}

/**
 * 初始化
 * strokeColor画笔颜色
 * fillColor 填充色
 */
Canvas.prototype.init = function() {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.fillStyle = this.fillColor;
}

/**
 * 文字
 * strokeColor画笔颜色
 * fillColor 填充色
 */
 Canvas.prototype.text = function() {
    this.ctx[this.drawType]();
}

/**
 * 直线
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 */

Canvas.prototype.line = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1 - 0.5,y1 - 0.5);
    this.ctx.lineTo(x2 - 0.5,y2 - 0.5);
    this.ctx.closePath();
    this.ctx.stroke();
}

/**
 * 写字板
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 */

Canvas.prototype.tablet = function(x1, y1, x2, y2) {
    this.ctx.lineTo(x2, y2);
    this.ctx[this.drawType]();
}

/**
 * 矩形
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 */

Canvas.prototype.rect = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.rect(x1 - 0.5, y1 - 0.5, x2-x1, y2-y1);
    this.ctx.closePath();
    this.ctx[this.drawType]();
}

/**
 * 等腰三角形
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 */

Canvas.prototype.triangle = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.lineTo(x1, y1);
    this.ctx.lineTo(x2,y2);
    this.ctx.lineTo(2*x1-x2,y2);
    this.ctx.closePath();
    this.ctx[this.drawType]();
}


/**
 * 直角三角形
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 */

Canvas.prototype.triangleL = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.lineTo(x1,y1);
    this.ctx.lineTo(x2,y2);
    this.ctx.lineTo(x1,y2);
    this.ctx.closePath();
    this.ctx[this.drawType]();
}

/**
 * 多边形
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 */

Canvas.prototype.polygon = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
        let deg = 360/this.edges;
        let r = Math.sqrt(Math.pow(x2-x1,2),Math.pow(y2-y1),2);

        for(let i=0;i<this.edges;i++){
            let x = r*Math.sin(deg*i*Math.PI/180);
            let y = r*Math.cos(deg*i*Math.PI/180)*(-1);
            this.ctx.lineTo(x1+x,y1+y);
        }
        this.ctx.closePath();
        this.ctx[this.drawType]();
}

/**
 * 圆形
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 */

Canvas.prototype.circle = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    let r = Math.sqrt(Math.pow(x2-x1,2),Math.pow(y2-y1),2);
    this.ctx.arc(x1,y1,r,0,2*Math.PI);
    this.ctx.closePath();
    this.ctx[this.drawType]();
}

/**
 * 圆弧
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 * anticlockwise:true为逆时针，false为顺时针
 * isLineTo 绘制起点与终点连线
 */

 Canvas.prototype.arc = function(x1, y1, x2, y2, startAngle = 0, endAngle = 180, anticlockwise = true, isLineTo) {
    let r = Math.sqrt(Math.pow(x2-x1,2),Math.pow(y2-y1),2);
    this.ctx.beginPath();

    this.ctx.arc(x1, y1, r, this.getAngle(startAngle), this.getAngle(endAngle), anticlockwise);
    if (isLineTo) {
        this.ctx.closePath();
    }

    this.ctx[this.drawType]();
}

/**
 * 扇形
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 * anticlockwise:true为逆时针，false为顺时针
 */

 Canvas.prototype.sector = function(x1, y1, x2, y2, startAngle = 0, endAngle = 90, anticlockwise = false) {
    let r = Math.sqrt(Math.pow(x2-x1,2),Math.pow(y2-y1),2);
    this.ctx.beginPath();
    this.ctx.moveTo(x1,y1);
    this.ctx.arc(x1, y1, r, this.getAngle(startAngle), this.getAngle(endAngle), anticlockwise);
    this.ctx.closePath();
    this.ctx[this.drawType]();
}

/**
 * 椭圆
 * x1，y1=>起点X轴坐标，Y轴坐标
 * x2，y2=>终点X轴坐标，Y轴坐标
 */

Canvas.prototype.ellipse = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    for(let i=0;i<2*Math.PI;i+=0.01){
        this.ctx.lineTo(((x2-x1)/2)*Math.cos(i)+(x2+x1)/2,((y2-y1)/2)*Math.sin(i)+(y2+y1)/2);
    }
    this.ctx.closePath();
    this.ctx[this.drawType]();
}

/**
 * 保存
 * 
 */

Canvas.prototype.save = function() {
    return this.canvas.toDataURL().replace('image/png','image/stream');
}

/**
 * 橡皮擦
 * 
 */

Canvas.prototype.eraser = function(x1, y1, x2, y2) {
    this.ctx.clearRect(x2, y2, 10, 10);
}

/**
 * 撤回
 * 
 */

Canvas.prototype.undo = function() {
    if ( this.history.length == 0) {
        return;
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.history.pop();
    if (this.history.length == 0) {
        return;
    }
    this.ctx.putImageData(this.history[this.history.length - 1], 0, 0);
}

/**
 * 清空
 * 
 */
Canvas.prototype.clear = function() {
    this.history.length = 0;
    this.ctx.clearRect(0, 0, this.width, this.height);
}

/**
 * 绘画
 * 
 */

Canvas.prototype.drawing = function() {
    let that = this;
    this.canvas.onmousedown = function(e) {
        let sx = e.offsetX;
        let sy = e.offsetY;		
        that.init();
        if(that.toolName=="tablet"){
            that.ctx.beginPath();
            that.ctx.moveTo(sx,sy);
        }
        this.onmousemove = function(e){
            let mx = e.offsetX;
            let my = e.offsetY;
            if (that.toolName!= "eraser") {
                that.ctx.clearRect(0, 0, that.width, that.height);
                    if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
            }

            that[that.toolName](sx,sy,mx,my);
        }	

        this.onmouseup = function(){
            that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
            this.onmousemove=null;
            this.onmouseup=null;
        }
    }
}

/**
 * 设置线宽
 * 
 */

Canvas.prototype.setLineWidth = function(number) {
    this.lineWidth = number
}

export default Canvas;