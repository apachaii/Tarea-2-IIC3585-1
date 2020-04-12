const AMOUNT_OF_CHANNELS = 2;
const TIME_BEFORE_PRESS = 4500; // in miliseconds
const TIME_BEFORE_DISSAPEAR = (TIME_BEFORE_PRESS * 10) / 9; // in miliseconds
const ERROR_MARGIN = 200; // in miliseconds
const AVERAGE_BLUE_BY_SECOND = 0.7;
const AVERAGE_GREEN_BY_SECOND = 0.6;

const FIRST_PLAYER_BLUE = "z";
const FIRST_PLAYER_GREEN = "x";
const SECOND_PLAYER_BLUE = "n";
const SECOND_PLAYER_GREEN = "m";

const FIRST_POINTS_TEXT = "Puntos jugador 1:";
const SECOND_POINTS_TEXT = "Puntos jugador 2:";

const key_text = {
  jugador_1: [FIRST_PLAYER_BLUE, FIRST_PLAYER_GREEN],
  jugador_2: [SECOND_PLAYER_BLUE, SECOND_PLAYER_GREEN],
};

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

      // The key guide
      const guide_text = document.createElement("p");
      guide_text.innerText = key_text[juego.classList[1]][index];
      silueta.appendChild(guide_text);

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

let gameStartMoment = 0;
let gameStarted = false;

let currentBluePress = {};
let currentGreenPress = {};

function getPressEmitArray(circle_spawn_moments) {
  return circle_spawn_moments.map((currnt_value, index, array) => {
    let emit_moment = 0;
    if (index !== 0) {
      emit_moment = array[index - 1] + TIME_BEFORE_PRESS + ERROR_MARGIN;
    }
    return {
      emit_moment,
      press_moment: currnt_value + TIME_BEFORE_PRESS,
    };
  });
}

const changeCurrentBluePress = (pressInfo) => (currentBluePress = pressInfo);
const changeCurrentGreenPress = (pressInfo) => (currentGreenPress = pressInfo);

function setCurrentPressEmition(emitArray, changePressCallback) {
  Rx.Observable.from(emitArray)
    .flatMap((change_press_moment) =>
      Rx.Observable.timer(change_press_moment.emit_moment).map(
        (_) => change_press_moment.press_moment
      )
    )
    .subscribe((press_moment) => {
      changePressCallback({
        time: press_moment,
        players_pressed: { jugador_1: false, jugador_2: false },
      });
    });
}

function startCirlesSpawn(spawn_moments, chanel, color) {
  const spawn_times = Rx.Observable.from(
    spawn_moments
  ).flatMap((spawn_moment) =>
    Rx.Observable.timer(spawn_moment).map((_) => spawn_moment)
  );

  spawn_times.subscribe((spawn_moment) => {
    const canal_test = document.getElementsByClassName(chanel);

    Array.from(canal_test).forEach(function (chanel) {
      const colored_square = document.createElement("div");

      const press_moment = spawn_moment + TIME_BEFORE_PRESS;
      colored_square.className = `cuadrado_musical ${press_moment} ${color}`;

      chanel.appendChild(colored_square);

      Rx.Observable.timer(TIME_BEFORE_PRESS - ERROR_MARGIN).subscribe((_) => {
        if (colored_square.parentNode) {
          const star_paragraph = document.createElement("p");
          star_paragraph.innerText = "\u{2726}";
          colored_square.appendChild(star_paragraph);
        }
      });

      Rx.Observable.timer(TIME_BEFORE_PRESS + ERROR_MARGIN).subscribe((_) => {
        if (colored_square.parentNode) {
          colored_square.textContent = "";
        }
      });

      Rx.Observable.timer(TIME_BEFORE_DISSAPEAR).subscribe((_) => {
        if (colored_square.parentNode) {
          colored_square.parentNode.removeChild(colored_square);
        }
      });
    });
  });
}

function change_points(displayId, default_text) {
  const display = document.getElementById(displayId);
  let points = 0;

  function displayPoints() {
    display.innerText = `${default_text} ${points}`;
  }

  displayPoints();

  return {
    changePoints: (change) => {
      points += change;
      displayPoints();
    },
    resetPoints: () => {
      points = 0;
      displayPoints();
    },
  };
}

const first_player_points = change_points("puntaje_1", FIRST_POINTS_TEXT);
const second_player_points = change_points("puntaje_2", SECOND_POINTS_TEXT);

function manage_key_press(
  time_passed,
  player_points,
  currentPress,
  currentPlayer,
  chanel
) {
  if (
    Math.abs(time_passed - currentPress.time) <= ERROR_MARGIN &&
    !currentPress.players_pressed[currentPlayer]
  ) {
    player_points.changePoints(100);
    currentPress.players_pressed[currentPlayer] = true;

    // remove square
    const to_remove_square = document
      .getElementsByClassName(currentPlayer)[0]
      .getElementsByClassName(chanel)[0]
      .getElementsByClassName(`${currentPress.time}`)[0];
    to_remove_square.parentNode.removeChild(to_remove_square);
  } else {
    player_points.changePoints(-100);
  }
}

// Setting keydowns
const keyDowns = Rx.Observable.fromEvent(document, "keydown");
keyDowns.subscribe(function (keyDown) {
  if (!gameStarted) {
    return;
  }

  const time_passed = Date.now() - gameStartMoment;
  switch (keyDown.key) {
    case FIRST_PLAYER_BLUE:
      manage_key_press(
        time_passed,
        first_player_points,
        currentBluePress,
        "jugador_1",
        "canal_0"
      );
      break;
    case FIRST_PLAYER_GREEN:
      manage_key_press(
        time_passed,
        first_player_points,
        currentGreenPress,
        "jugador_1",
        "canal_1"
      );
      break;
    case SECOND_PLAYER_BLUE:
      manage_key_press(
        time_passed,
        second_player_points,
        currentBluePress,
        "jugador_2",
        "canal_0"
      );
      break;
    case SECOND_PLAYER_GREEN:
      manage_key_press(
        time_passed,
        second_player_points,
        currentGreenPress,
        "jugador_2",
        "canal_1"
      );
      break;

    default:
      break;
  }
});

// These functions are taken from here:
// https://stackoverflow.com/questions/18218256/generate-an-array-of-numbers-from-an-interval-and-keeping-a-minimum-distance-of
function rand(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

// from:     starting number
// to:       ending number
// inc:      distance between each random number
// amount:   total number of random numbers
function spacedRandArray(from, to, inc, amount) {
  let retArray = [rand(from, to)]; // sets the first element
  let temp = null;

  for (let x = 0; x < amount - 1; x++) {
    do {
      temp = rand(from, to);
    } while (Math.abs(temp - retArray[x]) <= inc);

    retArray.push(temp);
  }

  return retArray;
}

function compareFunction(a, b) {
  return a - b;
}

const play_button = document.getElementById("play");
const my_audio = document.getElementById("myaudio");

function start_game() {
  // reset game
  play_button.disabled = true;
  gameStartMoment = Date.now();
  gameStarted = true;
  first_player_points.resetPoints();
  second_player_points.resetPoints();

  const { duration } = my_audio;
  const duration_in_milliseconds = Math.ceil(duration * 1000);

  // Randomly select stars
  const blue_square_amout = Math.ceil(
    Math.ceil(duration) * AVERAGE_BLUE_BY_SECOND
  );
  const green_square_amout = Math.ceil(
    Math.ceil(duration) * AVERAGE_GREEN_BY_SECOND
  );

  console.log(duration_in_milliseconds, ERROR_MARGIN, blue_square_amout);

  let spawn_moments_blue = spacedRandArray(
    0,
    duration_in_milliseconds,
    ERROR_MARGIN * 2,
    blue_square_amout
  ).sort(compareFunction);
  let spawn_moments_green = spacedRandArray(
    0,
    duration_in_milliseconds,
    ERROR_MARGIN * 2,
    green_square_amout
  ).sort(compareFunction);

  // Set the starts
  const blue_emit_array = getPressEmitArray(spawn_moments_blue);
  setCurrentPressEmition(blue_emit_array, changeCurrentBluePress);

  const green_emit_array = getPressEmitArray(spawn_moments_green);
  setCurrentPressEmition(green_emit_array, changeCurrentGreenPress);

  // Spawn the circles
  startCirlesSpawn(spawn_moments_blue, "canal_0", "azul");
  startCirlesSpawn(spawn_moments_green, "canal_1", "verde");

  // Start music
  Rx.Observable.timer(TIME_BEFORE_PRESS).subscribe((_) => {
    my_audio.play();
  });

  // stop game after music
  Rx.Observable.timer(TIME_BEFORE_PRESS + duration_in_milliseconds).subscribe(
    (_) => {
      play_button.disabled = false;
      gameStarted = false;
    }
  );
}

play_button.onclick = start_game;
