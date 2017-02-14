/**
 *
 * Created by ChengXiancheng on 2017/2/11.
 */

function Clock(bigX,bigY,bigRadius,lineWidth,bigColor){
    this.bigX=bigX;
    this.bigY=bigY;
    this.bigRadius=bigRadius;
    this.bigLineWidth=lineWidth;
    this.bigColor=bigColor;
    this.draw();
}
Clock.prototype={
    constructor:Clock,
    //入口方法
    draw:function(){
        //1、绘制大圆
        this.drawBigCircle();
        //2、绘制刻度盘
        this.drawDials();

        //3、绘制指针
        //根据指定时间计算出三个指针位于大圆的弧度
        var date=new Date("2017/2/11 19:55:30");
        var h=date.getHours();
        var hChange=h%12;
        this.drawTick(Math.PI/6*(hChange-3),50,"black",8);

        //1：-Math.PI/3-->Math.PI/6*(-2)
        //2：-Math.PI/6-->Math.PI/6*(-1)
        //3：0           Math.PI/6*0
        //4：Math.PI/6
        //5：Math.PI/6*2
        //6：Math.PI/6*3

        var m=date.getMinutes();
        this.drawTick(Math.PI/30*m-Math.PI/2,80,"blue",5);

        var s=date.getSeconds();
        this.drawTick(Math.PI/30*s-Math.PI/2,100,"red",3);

        //15分：0
        //20分：PI/6
        //21分：2*Math.PI/60  *21
        //25分：PI/6*2

        //每一分占据的弧度值：2*Math.PI/60




    },
    drawBigCircle:function(){
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.bigX,this.bigY,this.bigRadius,0,2*Math.PI);
        ctx.lineWidth=this.bigLineWidth;
        ctx.strokeStyle=this.bigColor;
        ctx.stroke();

        ctx.restore();
    },

    drawDials:function(){
        //第一个刻度线的弧度
        var startRadian=-Math.PI/3;

        //相邻刻度线之间的弧度差
        var radianDiff=2*Math.PI/60;

        for (var i = 0; i < 60; i++) {
            //如果i能被5除尽，表示此时是一个长刻度
            var length,lineWidth;
            if(i%5==0){
                length=25;
                lineWidth=10;

                //只有在大刻度线的时候才需要绘制文字
                this.drawText(i/5+1,startRadian+radianDiff*i,length);

            }else{
                length=5;
                lineWidth=4;
            }


            this.drawDial(length,startRadian+radianDiff*i,lineWidth);
        }
    },

    //绘制单个刻度线
    drawDial:function(length,radian,lineWidth){
        var bigRadiusChange=this.bigRadius-this.bigLineWidth/2;

        // sin(radian)=h1/(bigRadius-length);
        // cos(radian)=b1/(bigRadius-length);
        var h1=Math.sin(radian)*(bigRadiusChange-length);
        var b1=Math.cos(radian)*(bigRadiusChange-length);
        //
        // sin(radian)=h2/bigRadius;
        // cos(radian)=b2/bigRadius;
        var h2=bigRadiusChange*Math.sin(radian);
        var b2=bigRadiusChange*Math.cos(radian);

        //刻度线开始坐标
        var startX=this.bigX+b1,startY=this.bigY+h1;
        //刻度线结束坐标
        var endX=this.bigX+b2,endY=this.bigY+h2;

        ctx.save();

        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.lineWidth=lineWidth;
        ctx.stroke();

        ctx.restore();

    },


    drawText:function(text,radian,length){
        //文字的坐标到圆心的距离
        var bigRadiusChange=this.bigRadius-this.bigLineWidth/2-length-12;

        // sin(radian)=h1/(bigRadius-length);
        // cos(radian)=b1/(bigRadius-length);
        var h1=Math.sin(radian)*(bigRadiusChange);
        var b1=Math.cos(radian)*(bigRadiusChange);

        var x=this.bigX+b1;
        var y=this.bigY+h1;

        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.font="20px 微软雅黑";
        ctx.fillText(text,x,y);

    },

    /**
     * 绘制单个指针的方法
     * @param radian 指针的终点位于大圆的弧度值
     * @param length 指针的长度
     * @param color 指针的颜色
     * @param lineWidth 指针的线宽
     */
    drawTick:function(radian,length,color,lineWidth){
        var h1=Math.sin(radian)*length;
        var b1=Math.cos(radian)*length;

        //求出指针的结束坐标
        var x=this.bigX+b1,y=this.bigY+h1;

        ctx.save();

        //绘制指针
        ctx.beginPath();
        ctx.moveTo(this.bigX,this.bigY);
        ctx.lineTo(x,y);
        ctx.strokeStyle=color;
        ctx.lineWidth=lineWidth;
        ctx.lineCap="round";//设置线帽
        ctx.stroke();

        ctx.restore();
    }
}