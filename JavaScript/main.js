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

function nettoyer(oEvent) {
  var oCanvas = document.getElementById("canvas"),
    oCtx = oCanvas.getContext("2d");
  oCtx.clearRect(0, 0, oCanvas.width, oCanvas.height);
  capturer(false);
}

document.addEventListener("DOMContentLoaded", function () {
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

const form = document.getElementById("form");
const input1 = document.getElementsByName("Q1");
const input2 = document.getElementsByName("Q2");
const input3 = document.getElementsByName("Q3");
const input4 = document.getElementsByName("Q4");
const input5 = document.getElementsByName("Q5");
const input6 = document.getElementsByName("Q6");

const Error1 = document.getElementById('error-1')
const Error2 = document.getElementById('error-2')
const Error3 = document.getElementById('error-3')
const Error4 = document.getElementById('error-4')
const Error5 = document.getElementById('error-5')
const Error6 = document.getElementById('error-6')

const STATE = {
  Input1: "",
  Input2: "",
  Input3: "",
  Input4: "",
  Input5: "",
  Input6: "",
};

const initState = () => {
  STATE.Input1 = [];
  STATE.Input2 = [];
  STATE.Input3 = [];
  STATE.Input4 = [];
  STATE.Input5 = [];
  STATE.Input6 = [];
};

const input1Validation = () => {
  for (var i = 0, length = input1.length; i < length; i++) {
    if (input1[i].checked) {
      STATE.Input1.push(input1[i].value);
    }
  }
  STATE.Input1.length > 0 ? Error1.className = "text-danger d-none" : Error1.className = "text-danger d-block";
}
const input2Validation = () => {
  for (var i = 0, length = input2.length; i < length; i++) {
    if (input2[i].checked) {
      STATE.Input2.push(input2[i].value);
    }
  }
  STATE.Input2.length > 0 ? Error2.className = "text-danger d-none" : Error2.className = "text-danger d-block";

}
  const input3Validation = () => {
  for (var i = 0, length = input3.length; i < length; i++) {
    if (input3[i].checked) {
      STATE.Input3.push(input3[i].value);  
    }
  }
  STATE.Input3.length > 0 ? Error3.className = "text-danger d-none" : Error3.className = "text-danger d-block";

}
  const input4Validation = () => {
  for (var i = 0, length = input4.length; i < length; i++) {
    if (input4[i].checked) {
      STATE.Input4.push(input4[i].value); 
    }
  }
  STATE.Input4.length > 0 ? Error4.className = "text-danger d-none" : Error4.className = "text-danger d-block";

}
  const input5Validation = () => {
  for (var i = 0, length = input5.length; i < length; i++) {
    if (input5[i].checked) {
      STATE.Input5.push(input5[i].value);    
    }
  }
  STATE.Input5.length > 0 ? Error5.className = "text-danger d-none" : Error5.className = "text-danger d-block";

}
  const input6Validation = () => {
  for (var i = 0, length = input6.length; i < length; i++) {
    if (input6[i].checked) {
      STATE.Input6.push(input6[i].value);
    }
  }
  STATE.Input6.length > 0 ? Error6.className = "text-danger d-none" : Error6.className = "text-danger d-block";
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  initState();
  input1Validation();
  input2Validation();
  input3Validation();
  input4Validation();
  input5Validation();
  input6Validation();

  console.log(STATE);
});
