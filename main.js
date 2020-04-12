const AMOUNT_OF_CHANNELS = 2;
const TIME_BEFORE_PRESS = 4500; // in miliseconds
const TIME_BEFORE_DISSAPEAR = (TIME_BEFORE_PRESS * 10) / 9; // in miliseconds
const ERROR_MARGIN = 200; // in miliseconds

const FIRST_PLAYER_BLUE = "z";
const FIRST_PLAYER_GREEN = "x";
const SECOND_PLAYER_BLUE = "n";
const SECOND_PLAYER_GREEN = "m";

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

// Game started

let gameStart = Date.now();

const spawn_moments = [1000, 1400, 1800, 2200, 2600, 3000, 3400];

// Blue press moment

let currentBluePress = { time: 0, players_pressed: [false, false] };

const press_moments_emit = spawn_moments.map((currnt_value, index, array) => {
  let emit_moment = 0;
  if (index !== 0) {
    emit_moment = array[index - 1] + TIME_BEFORE_PRESS + ERROR_MARGIN;
  }
  return {
    emit_moment,
    press_moment: currnt_value + TIME_BEFORE_PRESS,
  };
});

Rx.Observable.from(press_moments_emit)
  .flatMap((change_press_moment) =>
    Rx.Observable.timer(change_press_moment.emit_moment).map(
      (_) => change_press_moment.press_moment
    )
  )
  .subscribe((press_moment) => {
    currentBluePress = { time: press_moment, players_pressed: [false, false] };
  });

const spawn_times = Rx.Observable.from(spawn_moments).flatMap((spawn_moment) =>
  Rx.Observable.timer(spawn_moment).map((_) => spawn_moment)
);

const subscribe = spawn_times.subscribe((spawn_moment) => {
  const canal_test = document.getElementsByClassName("canal_0");

  Array.from(canal_test).forEach(function (chanel) {
    const image = document.createElement("img");
    image.src = "azul.png";

    const press_moment = spawn_moment + TIME_BEFORE_PRESS;
    image.className = `cuadrado_musical ${press_moment}`;

    chanel.appendChild(image);

    Rx.Observable.timer(TIME_BEFORE_DISSAPEAR).subscribe((_) => {
      chanel.removeChild(image);
    });
  });
});

let first_player_points = 0;
const first_player_display_points = document.getElementById("puntos");
function change_fist_player_points(change) {
  first_player_points += change;
  first_player_display_points.innerText = `${first_player_points}`;
}

let second_player_points = 0;

const keyDowns = Rx.Observable.fromEvent(document, "keydown");
keyDowns.subscribe(function (keyDown) {
  const time_passed = Date.now() - gameStart;
  switch (keyDown.key) {
    case FIRST_PLAYER_BLUE:
      // IF the difference is lower than the
      let pointsChange = 0;
      if (
        Math.abs(time_passed - currentBluePress.time) <= ERROR_MARGIN &&
        !currentBluePress.players_pressed[0]
      ) {
        pointsChange = 100;
        currentBluePress.players_pressed[0] = true;

        // remove square
        const to_remove_square = document
          .getElementsByClassName("jugador_1")[0]
          .getElementsByClassName(`${currentBluePress.time}`)[0];
        console.log(to_remove_square);
        to_remove_square.parentNode.removeChild(to_remove_square);
      } else {
        pointsChange = -100;
      }
      change_fist_player_points(pointsChange);
      break;

    default:
      break;
  }
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
