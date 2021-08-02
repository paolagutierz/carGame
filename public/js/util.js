const roadKM = 6;
const screenWidth = screen.width;
const pixelsByKM = screenWidth / roadKM;
const pixelsBYMeter = pixelsByKM / 1000;

function throwDice() {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  const img = document.getElementById("diceimg");
  img.setAttribute("src", `../images/${randomNumber}.png`);

  const numberOfCars = document.getElementById("numberOfCars").value;
  const attempts = document.getElementById("attempts");
  const playerNumber = (attempts.value % numberOfCars) + 1;

  attempts.value = Number(attempts.value) + 1;

  moveCar(playerNumber, randomNumber);

  document.getElementById("alert").innerText =
    "Es turno de " +
    document.getElementById(
      `player${playerNumber == numberOfCars ? 1 : playerNumber + 1}`
    ).value;
}

function moveCar(playerNumber, randomNumber) {
  const carSize = 100;
  const car = document.getElementsByClassName(`car${playerNumber}`)[0];
  const actualPosition = Number(car.style.left.replace("px", ""));

  car.style.left = `${actualPosition + pixelsToMove(randomNumber)}px`;

  if (actualPosition + pixelsToMove(randomNumber) > screenWidth - carSize) {
    document.getElementById(`isWinnerPlayer${playerNumber}`).value = true;
    showPodium(playerNumber);
    persistData();
  }
}

function showPodium(playerNumber) {
  const firstPlaceName = document.getElementById(`player${playerNumber}`).value;
  let secondPlaceName = "";
  let secondPlaceValue = "";
  let thirdPlaceName = "";
  let thirdPlaceValue = "";
  let numberOfCars = document.getElementById("numberOfCars").value;

  for (let i = 1; i <= numberOfCars; i++) {
    if (playerNumber === i) {
      continue;
    }

    const car = document.getElementsByClassName(`car${i}`)[0];
    const actualPosition = Number(car.style.left.replace("px", ""));

    if (secondPlaceName === "") {
      secondPlaceName = document.getElementById(`player${i}`).value;
      secondPlaceValue = actualPosition;
    } else {
      if (secondPlaceValue < actualPosition) {
        secondPlaceValue = actualPosition;
        secondPlaceName = document.getElementById(`player${i}`).value;
      } else if (numberOfCars >= 3) {
        if (thirdPlaceName === "") {
          thirdPlaceName = document.getElementById(`player${i}`).value;
          thirdPlaceValue = actualPosition;
        } else if (thirdPlaceValue < actualPosition) {
          thirdPlaceName = document.getElementById(`player${i}`).value;
          thirdPlaceValue = actualPosition;
        }
      }
    }
  }

  alert(
    "Primer lugar: " +
      firstPlaceName +
      "\nSegundo lugar: " +
      secondPlaceName +
      (thirdPlaceName !== "" ? "\nTercer lugar: " + thirdPlaceName : "")
  );
}

function pixelsToMove(meters) {
  return meters * pixelsBYMeter * 100;
}

function restart() {
  const numberOfCars = document.getElementById("numberOfCars").value;
  for (let i = 1; i <= numberOfCars; i++) {
    const car = document.getElementsByClassName(`car${i}`)[0];
    car.style.left = 0;
  }
}

function persistData() {
  document.getElementById("submit").click();
}

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("click").addEventListener("click", throwDice);
  document.getElementById("restart").addEventListener("click", restart);
});
