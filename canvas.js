var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 5;

setCanvas(canvas);
function setCanvas(canvas) {

    wResize(); //一开始屏幕自适应屏幕的宽高

    function wResize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }

    window.onresize = function () {
        wResize();
    }
}

listenToUser(canvas);

var eraserEnabled = false;

pen.onclick = function(){
    eraserEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active');

}

eraser.onclick = function(){
    eraserEnabled = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}

clear.onclick = function(){
    context.clearRect(0,0,canvas.width,canvas.height);
}

red.onclick = function(){
    context.strokeStyle = 'red';
    red.classList.add('active');
    blue.classList.remove('active');
    green.classList.remove('active');

}

blue.onclick = function(){
    context.strokeStyle = 'deepskyblue';
    red.classList.remove('active');
    blue.classList.add('active');
    green.classList.remove('active');


}

green.onclick = function(){
    context.strokeStyle = 'olivedrab';
    red.classList.remove('active');
    blue.classList.remove('active');
    green.classList.add('active');

}

thin.onclick = function(){
    lineWidth = 5;
    thin.classList.add('active');
    thick.classList.remove('active');
}

thick.onclick = function(){
    lineWidth = 10;
    thick.classList.add('active');
    thin.classList.remove('active');
}

download.onclick = function(){
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'context';
    a.click();
}

function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.stroke();

}


function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = lineWidth ;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}





function listenToUser(canvas){

    var using = false;
    var lastPoint = {x: undefined, y: undefined};

    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function(a){

            var x = a.touches[0].clientX;
            var y =a.touches[0].clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x, y, 20, 20);
            }
            else {
                lastPoint = {x: x, y: y}
            }
        }

        canvas.ontouchmove = function(a){

            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;
            if (!using) {return}
            if (eraserEnabled) {
                context.clearRect(x, y, 20, 20);
            }
            else{

                var newPoint = {"x": x, "y": y};
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;

            }
        }

        canvas.ontouchhend = function(a){

            using = false;
        }
    }

    else{

            canvas.onmousedown = function (a) {

                var x = a.clientX;
                var y = a.clientY;
                using = true;
                if (eraserEnabled) {
                    context.clearRect(x, y, 20, 20);
                }
                else {
                    lastPoint = {x: x, y: y}
                }

            }

            canvas.onmousemove = function (a) {
                var x = a.clientX;
                var y = a.clientY;
                if (!using) {return}
                if (eraserEnabled) {
                    context.clearRect(x, y, 20, 20);
                }
                else{

                    var newPoint = {"x": x, "y": y};
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint;

                }
            }

            canvas.onmouseup = function (a) {
                using = false;
            }
        }

}










