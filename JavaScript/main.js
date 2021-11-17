/*  https://dev.opera.com/articles/html5-canvas-painting/ */
/* Options & Code du Canvas */


/* JS Canvas ------------------------------------------------------------------------------------ */

function moveDrawligne(oEvent) {
    var oCanvas = oEvent.currentTarget,
        oCtx = null,
        oPos = null;
    if (oCanvas.bDraw == false) {
        return false;
    }
    oPos = getPosition(oEvent, oCanvas);
    oCtx = oCanvas.getContext('2d');

    //dessine
    oCtx.strokeStyle = '#000000';
    oCtx.lineWidth = 2;
    oCtx.beginPath();
    oCtx.moveTo((oCanvas.posX), oCanvas.posY);
    oCtx.lineTo(oPos.posX, oPos.posY);
    oCtx.stroke();

    oCanvas.posX = oPos.posX;
    oCanvas.posY = oPos.posY;
}

function getPosition(oEvent, oCanvas) {
    var oRect = oCanvas.getBoundingClientRect(),
        oEventEle = oEvent.changedTouches ? oEvent.changedTouches[0] : oEvent;
    return {
        posX: (oEventEle.clientX - oRect.left) / (oRect.right - oRect.left) * oCanvas.width,
        posY: (oEventEle.clientY - oRect.top) / (oRect.bottom - oRect.top) * oCanvas.height
    };
}

function downDrawligne(oEvent) {
    oEvent.preventDefault();
    var oCanvas = oEvent.currentTarget,
        oPos = getPosition(oEvent, oCanvas);
    oCanvas.posX = oPos.posX;
    oCanvas.posY = oPos.posY;
    oCanvas.bDraw = true;
    capturer(false);
}

function upDrawligne(oEvent) {
    var oCanvas = oEvent.currentTarget;
    oCanvas.bDraw = false;
    capturer(true);
}

function initCanvas() {
    var oCanvas = document.getElementById("canvas");
    oCanvas.bDraw = false;
    oCanvas.width = 200;
    oCanvas.height = 150;
    oCtx = oCanvas.getContext('2d');

    oCanvas.addEventListener("mousedown", downDrawligne);
    oCanvas.addEventListener("mouseup", upDrawligne);
    oCanvas.addEventListener("mousemove", moveDrawligne);
    oCanvas.addEventListener("touchstart", downDrawligne);
    oCanvas.addEventListener("touchend", upDrawligne);
    oCanvas.addEventListener("touchmove", moveDrawligne);
}

function nettoyer(oEvent) {
    var oCanvas = document.getElementById("canvas"),
        oCtx = oCanvas.getContext('2d');
    oCtx.clearRect(0, 0, oCanvas.width, oCanvas.height);
    capturer(false);
}

document.addEventListener('DOMContentLoaded', function() {
    initCanvas();
    document.getElementById("btn_clear").addEventListener("click", nettoyer);
});

/* ---------------------------------------------------------------------------------------------- */

/* fonction show canvas or areatext*/

function showDraw() {
    var draw = document.getElementById("canvas");
    var text = document.getElementById("textArea");
    var clear = document.getElementById("btn_clear");
    draw.style.display = "block";
    text.style.display = "none"
    clear.style.display = "block"
}

function showText() {
    var text = document.getElementById("textArea");
    var draw = document.getElementById("canvas");
    var clear = document.getElementById("btn_clear");
    text.style.display = "block";
    draw.style.display = "none"
    clear.style.display = "none"
}

/* ---------------------------------------------------------------------------------------------- */