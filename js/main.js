/**
 * /*  https://dev.opera.com/articles/html5-canvas-painting/
 *
 * @format
 */

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
    oCtx = oCanvas.getContext("2d");

    //dessine
    oCtx.strokeStyle = "#000000";
    oCtx.lineWidth = 2;
    oCtx.beginPath();
    oCtx.moveTo(oCanvas.posX, oCanvas.posY);
    oCtx.lineTo(oPos.posX, oPos.posY);
    oCtx.stroke();

    oCanvas.posX = oPos.posX;
    oCanvas.posY = oPos.posY;
}

function getPosition(oEvent, oCanvas) {
    var oRect = oCanvas.getBoundingClientRect(),
        oEventEle = oEvent.changedTouches ? oEvent.changedTouches[0] : oEvent;
    return {
        posX:
            ((oEventEle.clientX - oRect.left) / (oRect.right - oRect.left)) *
            oCanvas.width,
        posY:
            ((oEventEle.clientY - oRect.top) / (oRect.bottom - oRect.top)) *
            oCanvas.height,
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
    oCtx = oCanvas.getContext("2d");

    oCanvas.addEventListener("mousedown", downDrawligne);
    oCanvas.addEventListener("mouseup", upDrawligne);
    oCanvas.addEventListener("mousemove", moveDrawligne);
    oCanvas.addEventListener("touchstart", downDrawligne);
    oCanvas.addEventListener("touchend", upDrawligne);
    oCanvas.addEventListener("touchmove", moveDrawligne);
}

var urlcourante = document.location.href;
var oImage = document.createElement("img");

function capturer(bAction) {
    var oCapture = document.getElementById("canvas");
    oCapture.innerHTML = "";
    if (bAction == true) {
        oCanvas = document.getElementById("canvas");
        oImage.src = oCanvas.toDataURL("image/png");
        oCapture.appendChild(oImage);
    }
}

function nettoyer(oEvent) {
    var oCanvas = document.getElementById("canvas"),
        oCtx = oCanvas.getContext("2d");
    oCtx.clearRect(0, 0, oCanvas.width, oCanvas.height);
    oImage.src = "";
    capturer(false);
}

document.addEventListener("DOMContentLoaded", function() {
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
    text.style.display = "none";
    clear.style.display = "block";
}

function showText() {
    var text = document.getElementById("textArea");
    var draw = document.getElementById("canvas");
    var clear = document.getElementById("btn_clear");
    text.style.display = "block";
    draw.style.display = "none";
    clear.style.display = "none";
}

/* ---------------------------------------------------------------------------------------------- */

const formulaire = document.getElementById("formulaire");
const signature = document.getElementById("textArea");
const signaturePencil = document.getElementById("canvas");

const STATE = {
    Input: [],
    Signature: "",
    SignaturePencil: "",
};

const initState = () => {
    STATE.Signature = [];
    STATE.SignaturePencil = [];
    for (i = 1; i <= 6; i++) {
        STATE.Input[i] = "";
    }
};

const displayConfirmMessage = () => {
    const message = document.querySelector(".confirmation");
    message.style.display = "block";
    setTimeout(() => {
        message.style.display = "none";
    }, 3000);
};

var ancre = "submit"

function jump(h) {
    var top = document.getElementById(h).offsetTop;
    window.scrollTo(0, top);
}

function InputValidation(num) {
    var Erreur = document.getElementById("error-" + num.toString());
    var Question = document.getElementsByName("Q" + num.toString());
    var Carte = document.getElementById("card" + num.toString());
    flag = false
    for (var i = 0; i < Question.length; i++) {
        if (Question[i].checked) {
            Erreur.className = "text-danger d-none";
            Carte.classList.add("border-success");
            Carte.classList.remove("border-danger");
            flag = true
        }
    }
    if (!flag) {
        Erreur.className = "text-danger d-block";
        Carte.classList.remove("border-success");
        Carte.classList.add("border-danger");
        if ((ancre == "submit") && (i = Question.length)) {
            ancre = "card" + num.toString();
        }
    }
}

function InputValidationSignature(num) {
    Erreur = document.getElementById("error-" + num);
    var Carte = document.getElementById("card" + num);
    // Si oImage.src !== "" comme condition du if alors après effacement
    // du dessin on peut quand meme valider avec un dessin vide
    if (signature.value !== "" || oImage.src !== urlcourante) {
        Erreur.className = "text-danger d-none";
        Carte.classList.add("border-success");
        Carte.classList.remove("border-danger");
    } else {
        Erreur.className = "text-danger d-block";
        Carte.classList.remove("border-success");
        Carte.classList.add("border-danger");
    }
    STATE.Signature.push(signature.value);
    STATE.SignaturePencil.push(oImage.src);
};

signaturePencil.addEventListener('touch', () => {
    const body = document.querySelector('body')
    body.style.overflowY = 'hidden'
})

formulaire.addEventListener("submit", (e) => {
    ancre = "submit"
    e.preventDefault();
    e.stopPropagation();
    initState();
    for (i = 1; i <= 6; i++) {
        InputValidation(i);
    }
    InputValidationSignature(7);

    const error = document.querySelector(".border-danger");
    if (error === null) {
        displayConfirmMessage();
    }
    jump(ancre);
});