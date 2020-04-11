const AMOUNT_OF_CHANNELS = 2;
const TIME_BEFORE_PRESS = 5000; // in miliseconds
const ERROR_MARGIN = 500; // in miliseconds

function build_play_area() {
  const juegos = document.getElementsByClassName("juego");
  Array.from(juegos).forEach(function (juego) {
    // Add channel
    for (let index = 0; index < AMOUNT_OF_CHANNELS; index++) {
      const canal = document.createElement("div");
      canal.className = `canal canal_${index}`;

      // Add the squere Siluete
      const silueta = document.createElement("div");
      silueta.className = "silueta_cuadrado";
      canal.appendChild(silueta);

      // Add line
      const linea = document.createElement("hr");
      linea.className = "linea_guia";
      canal.appendChild(linea);

      juego.appendChild(canal);
    }
  });
}

build_play_area();

const start_moments = [1000, 1600, 3000, 3630, 4200, 6000];
const press_moments = start_moments.map((moment) => moment + TIME_BEFORE_PRESS);

const spawn_times = Rx.Observable.from(start_moments).flatMap((x) =>
  Rx.Observable.timer(x).map((_) => x)
);

const subscribe = spawn_times.subscribe((x) => {
  const canal_test = document.getElementsByClassName("canal_0");

  Array.from(canal_test).forEach(function (chanel) {
    const image = document.createElement("img");
    image.src = "azul.png";
    image.className = "cuadrado_musical";

    chanel.appendChild(image);

    Rx.Observable.timer(TIME_BEFORE_PRESS).subscribe((_) => {
      chanel.removeChild(image);
    });
  });
});

/* let puntos = 0;
let n = 0;
let cuadrado = document.getElementById("div1");
let verde = document.getElementById("div2");
let rojo = document.getElementById("div3");
const subject = new Rx.Subject();
let cambia_tiempo = new Array();
cambia_tiempo[0] = 1000;
cambia_tiempo[1] = 3000;
cambia_tiempo[2] = 5000;

let p = 0;

let red = 0;
let blue = 0;
let greeen = 0;

function rand(n) {
  return Math.floor(Math.random() * n);
}

window.setInterval(function () {
  p++;
}, 1000);

rojo.style.animation = `mymove3`;
cuadrado.style.animation = `mymove3`;
verde.style.animation = `mymove3`;

window.addEventListener("keypress", function (e) {
  let jugar = e.key;
  if (jugar === "j") {
    red = cambia_tiempo[rand(3)];
    greeen = cambia_tiempo[rand(3)];
    blue = cambia_tiempo[rand(3)];

    setTimeout(cuadradoStart, blue);
    setTimeout(verdeStart, greeen);
    setTimeout(rojoStart, red);

    window.setInterval(function () {
      n++;
    }, 1000);

    setInterval(() => {
      console.log(n);
      subject.next(n);
    }, 1000);
  } //fin j
}); //fin 1

function cuadradoStart() {
  cuadrado.style.animation = ``;
}
function verdeStart() {
  verde.style.animation = ``;
}
function rojoStart() {
  rojo.style.animation = ``;
}

subject.subscribe((n) => {
  //cuadrado azul
  t = 9 + blue / 1000;
  window.addEventListener("keypress", function (e) {
    let letra = e.key;

    console.log(n);
    if (letra === "z" && +n === t) {
      cuadrado.style.animation = `mymove3`;
      puntos = puntos + 1;
      console.log("puntos" + puntos);
    } //fin z
  }); //fin 2

  if (n === t) {
    console.log("paso por aca");
    cuadrado.style.animation = `mymove3`;
    puntos = puntos - 10;
  }
});

subject.subscribe((n) => {
  //cuadrado verde
  t = 9 + greeen / 1000;
  window.addEventListener("keypress", function (e) {
    let letra = e.key;

    console.log(n);
    if (letra === "x" && +n === t) {
      verde.style.animation = `mymove3`;
      puntos = puntos + 1;
      console.log("puntos" + puntos);
    } //fin z
  }); //fin 2

  if (n === t) {
    console.log("paso por aca");
    verde.style.animation = `mymove3`;
    puntos = puntos - 10;
  }
});

subject.subscribe((data) => {
  //cuadrado rojo
  t = 9 + red / 1000;
  window.addEventListener("keypress", function (e) {
    let letra = e.key;

    console.log(n);
    if (letra === "c" && +n === t) {
      rojo.style.animation = `mymove3`;
      puntos = puntos + 1;
      console.log("puntos" + puntos);
    } //fin z
  }); //fin 2

  if (n === t) {
    console.log("paso por aca");
    rojo.style.animation = `mymove3`;
    puntos = puntos - 10;
  }
}); */

// window.onload = function () {};
