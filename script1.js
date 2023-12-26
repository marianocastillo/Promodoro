let miCanvas = document.createElement("canvas");
miCanvas.setAttribute("id", "miCanvas");
document.body.appendChild(miCanvas);
miCanvas.width = 460;
miCanvas.height = 460;

let contexto = miCanvas.getContext("2d");
let variacion = 7;
let giro = variacion;
setInterval(function () {
  giro += variacion;

  contexto.save();
  contexto.translate(miCanvas.width / 2, miCanvas.height / 2);
  contexto.rotate(gradosARadianes(giro % 360));
  dibujarCuadricula();
  contexto.restore();

  dibujarReloj();
}, 100);

function dibujarReloj() {
  contexto.save();
  contexto.translate(miCanvas.width / 2, miCanvas.height / 2);

  contexto.beginPath();
  contexto.fillStyle = "white";
  contexto.arc(0, 0, 200, 0, 2 * Math.PI);
  contexto.fill();
  contexto.stroke();

  dibujarLineasDeHoras();
  dibujarLineasDeMinutos();
  dibujarNumeros(true);
  dibujarMarca("AILOGIC");

  let fechaActual = new Date();
  let segundos = fechaActual.getSeconds() / 60;
  let minutos = (fechaActual.getMinutes() + segundos) / 60;
  let horas = (fechaActual.getHours() + minutos) / 12;

  dibujarAguja("black", 10, 100, horas);
  dibujarAguja("blue", 8, 150, minutos);
  dibujarAguja("red", 4, 160, segundos);

  contexto.beginPath();
  contexto.fillStyle = "black";
  contexto.arc(0, 0, 10, 0, 2 * Math.PI);
  contexto.fill();

  contexto.restore();
}

function dibujarCuadricula(incremento = 20) {
  contexto.save();
  contexto.fillStyle = "white";

  contexto.lineWidth = 1;

  let rojo, verde, azul, color;
  rojo = Math.round(Math.random() * 255);
  verde = Math.round(Math.random() * 255);
  azul = Math.round(Math.random() * 255);
  color = `rgb(${rojo}, ${verde}, ${azul})`;
  contexto.strokeStyle = color;

  for (let y = -miCanvas.height / 2; y < miCanvas.height / 2; y += incremento) {
    contexto.beginPath();
    contexto.moveTo(-miCanvas.width, y);
    contexto.lineTo(miCanvas.width, y);
    contexto.stroke();
  }

  for (let x = -miCanvas.width / 2; x < miCanvas.width / 2; x += incremento) {
    contexto.beginPath();
    contexto.moveTo(x, -miCanvas.height);
    contexto.lineTo(x, miCanvas.height);
    contexto.stroke();
  }
  contexto.restore();
}

function dibujarMarca(marca = "Rolex") {
  contexto.save();
  contexto.beginPath();
  contexto.textAlign = "center";
  contexto.font = "30px Arial";
  contexto.strokeText(marca, 0, -60);
  contexto.stroke();
  contexto.restore();
}

function dibujarAguja(color, grosor, tamanio, angulo) {
  tamanio = -Math.abs(tamanio);
  contexto.save();
  contexto.beginPath();
  contexto.rotate(gradosARadianes(angulo * 360));
  contexto.strokeStyle = color;
  contexto.fillStyle = color;
  contexto.shadowColor = "black";
  contexto.shadowOffsetX = 5;
  contexto.shadowOffsetY = 5;
  contexto.shadowBlur = 5;
  contexto.globalAlpha = 0.6;
  contexto.moveTo(0, 0);
  contexto.lineTo(-grosor, tamanio / 4);
  contexto.lineTo(0, tamanio);
  contexto.lineTo(grosor, tamanio / 4);
  contexto.closePath();
  contexto.stroke();
  contexto.fill();
  contexto.restore();
}

function gradosARadianes(grados = 0) {
  return grados * (Math.PI / 180);
}

function dibujarNumeros(sonRomanos = false) {
  const numerosRomanos = " ,i,ii,iii,iv,v,vi,vii,viii,ix,x,xi,xii"
    .toUpperCase()
    .split(",");

  let numero = 1;
  contexto.save();
  contexto.lineWidth = 1;
  contexto.strokeStyle = "black";
  contexto.font = "20px Arial";
  contexto.textAlign = "center";
  do {
    contexto.rotate(gradosARadianes(30));
    contexto.beginPath();
    contexto.strokeText(sonRomanos ? numerosRomanos[numero] : numero, 0, -150);
    contexto.stroke();
    numero++;
  } while (numero <= 12);
  contexto.restore();
}

function dibujarLineasDeHoras() {
  contexto.save();
  let lineasDeHoras = 12;
  contexto.lineWidth = 3;
  contexto.strokeStyle = "black";
  while (lineasDeHoras > 0) {
    contexto.beginPath();
    contexto.moveTo(0, -185);
    contexto.lineTo(0, -170);
    contexto.stroke();

    contexto.rotate(gradosARadianes(30));
    lineasDeHoras -= 1;
  }
  contexto.restore();
}

function dibujarLineasDeMinutos() {
  contexto.save();
  let numero = 0;
  contexto.lineWidth = 1;
  while (numero < 60) {
    contexto.beginPath();
    contexto.strokeStyle = "blue";
    contexto.moveTo(0, -185);
    contexto.lineTo(0, -175);
    contexto.stroke();

    contexto.strokeStyle = "gray";
    contexto.textAlign = "center";
    contexto.strokeText(numero, 0, -190);

    contexto.rotate(gradosARadianes(6));
    numero++;
  }
  contexto.restore();
}
