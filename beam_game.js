var yourPt = (enemyPt = 0);
var judge = "";
var gameTurn = 0;
var enemyActionIcon = "";
var yourActionIcon = "";
var judgeHistoryText = "";
var enemyGaugeText = (yourGaugeText = "");
var gameNumber = localStorage.getItem("Number");
var historyText = localStorage.getItem("History");
var yourWin = localStorage.getItem("Wins");
var yourLose = localStorage.getItem("Loses");
var disabledCharge = document.getElementById("action_charge");
var disabledBarrier = document.getElementById("action_barrier");
var disabledBeam = document.getElementById("action_beam");
//img
var chargeIcon =
  '<img src="./img/Charge_icon.png" width="100px" height="100px"/>';
var barrierIcon =
  '<img src="./img/Barrier_icon.png" width="100px" height="100px"/>';
var enemyBeamIcon =
  '<img id ="Beam_icon" src="./img/Beam_icon.png" width="100px" height="100px" scale(1, -1)"/>';
var yourBeamIcon =
  '<img src="./img/Beam_icon.png" width="100px" height="100px"/>';
var enemyHighBeamIcon =
  '<img id ="Beam_icon" src="./img/Beam_icon.png" width="400px" height="115px" scale(1, -1)"/>';
var yourHighBeamIcon =
  '<img src="./img/Beam_icon.png" width="400px" height="115px"/>';

set_ready();

function set_ready() {
  if (gameNumber === null) {
    gameNumber = 1;
    historyText = "";
    yourWin = yourLose = 0;
  }
  set_disabeled(false);
  document.getElementById("game_continuation").innerHTML =
    "<font size='5'>Game Start</font>";
  document.getElementById("game_number").innerHTML =
    "<font size='6'>" + gameNumber + "</font>試合目";
  document.getElementById("your_KOs").innerHTML =
    yourWin + "勝" + yourLose + "敗";
  document.getElementById("action_history").innerHTML = historyText;
  document.getElementById("you_gauge").innerHTML = "□□□□□";
  document.getElementById("enemy_gauge").innerHTML = "□□□□□";
}

function set_disabeled(trueOrFalse) {
  disabledCharge.disabled = trueOrFalse;
  disabledBarrier.disabled = trueOrFalse;
  disabledBeam.disabled = true;
}

function reset_game() {
  yourPt = enemyPt = 0;
  gameTurn = 0;
  judge = "";
  judgeHistoryText = "";
  document.getElementById("your_action").innerHTML = "";
  document.getElementById("enemy_action").innerHTML = "";
  document.getElementById("judge").innerHTML = "";
  set_ready();
}

function random_number(ary) {
  enemyNumber = ary[Math.floor(Math.random() * ary.length)];
  return enemyNumber;
}

function judge_process(yourJudge) {
  if (yourJudge === "win") {
    judge = "YOU WIN!!".fontcolor("red").big().bold(); //!!HIGH BEAM!!
    yourWin++;
    judgeHistoryText = "ーーYOU WIN!";
  } else {
    judge = "YOU LOSE...".fontcolor("blue").big().bold();
    yourLose++;
    judgeHistoryText = "ーーYOU LOSE...";
  }
  document.getElementById("game_continuation").innerHTML = "";
  set_disabeled(true);
}

function my_game(your_select) {
  document.getElementById("game_continuation").innerHTML =
    "<font size='4'>Continuation</font>";
  action_charge = document.form1.action_charge.value;
  action_barrier = document.form1.action_barrier.value;
  action_beam = document.form1.action_beam.value;

  if (yourPt === 0 && (enemyPt === 0 || enemyPt === 4)) {
    enemyNumber = 0;
  } else if (enemyPt >= 5) {
    enemyNumber = 2;
  } else if (yourPt === 0) {
    //プレイヤーのチャージが0なら、バリアは不要
    random_number([0, 2]);
  } else if (enemyPt === 0) {
    random_number([0, 1]);
  } else {
    random_number([0, 1, 2]);
  }

  switch (
    enemyNumber //敵の行動決定
  ) {
    case 0:
      enemy_action = "Charge";
      enemyPt++;
      enemyActionIcon = chargeIcon;
      break;
    case 1:
      enemy_action = "Barrier";
      enemyActionIcon = barrierIcon;
      break;
    case 2:
      if (enemyPt >= 5) {
        enemy_action = "HIGH Beam";
        enemyPt = enemyPt - 5;
        enemyActionIcon = enemyHighBeamIcon;
      } else {
        enemy_action = "Beam";
        enemyPt--;
        enemyActionIcon = enemyBeamIcon;
      }
      break;
  }

  switch (
    your_select //プレイヤーの行動決定
  ) {
    case "charge":
      your_action = "Charge";
      yourPt++;
      yourActionIcon = chargeIcon;
      break;
    case "barrier":
      your_action = "Barrier";
      yourActionIcon = barrierIcon;
      break;
    case "beam":
      if (yourPt >= 5) {
        your_action = "HIGH Beam";
        yourPt = yourPt - 5;
        yourActionIcon = yourHighBeamIcon;
      } else {
        your_action = "Beam";
        yourPt--;
        yourActionIcon = yourBeamIcon;
      }
      break;
  }

  if (yourPt > 0) {
    disabledBeam.disabled = false;
  } else {
    disabledBeam.disabled = true;
  }

  //勝敗処理
  if (your_action === "HIGH Beam" && enemy_action !== "HIGH Beam") {
    judge_process("win");
  } else if (your_action !== "HIGH Beam" && enemy_action === "HIGH Beam") {
    judge_process("lose");
  } else if (your_action == "Beam" && enemy_action == "Charge") {
    judge_process("win");
  } else if (your_action == "Charge" && enemy_action == "Beam") {
    judge_process("lose");
  }

  enemyGaugeText = "";
  for (i = 5; i > enemyPt; i--) {
    enemyGaugeText += "□";
  }
  for (i = 0; i < enemyPt; i++) {
    enemyGaugeText += "■";
  }
  yourGaugeText = "";
  for (i = 5; i > yourPt; i--) {
    yourGaugeText += "□";
  }
  for (i = 0; i < yourPt; i++) {
    yourGaugeText += "■";
  }

  gameTurn++;

  historyText =
    gameNumber +
    "-" +
    gameTurn +
    ") Enemy:" +
    enemy_action +
    "　You:" +
    your_action +
    "　" +
    judgeHistoryText +
    "<br>" +
    historyText;
  document.getElementById("action_history").innerHTML = historyText;
  document.getElementById("your_action").innerHTML = yourActionIcon;
  document.getElementById("enemy_action").innerHTML = enemyActionIcon;
  document.getElementById("judge").innerHTML = judge;
  document.getElementById("you_gauge").innerHTML = yourGaugeText;
  document.getElementById("enemy_gauge").innerHTML = enemyGaugeText;
  document.getElementById("your_KOs").innerHTML =
    yourWin + "勝" + yourLose + "敗";

  if (disabledCharge.disabled) {
    gameNumber++;
  }
  localStorage.setItem("History", historyText);
  localStorage.setItem("Number", gameNumber);
  localStorage.setItem("Wins", yourWin);
  localStorage.setItem("Loses", yourLose);
}

function reset_all() {
  gameNumber = 1;
  historyText = "";
  yourWin = 0;
  yourLose = 0;
  localStorage.setItem("History", historyText);
  localStorage.setItem("Number", gameNumber);
  localStorage.setItem("Wins", yourWin);
  localStorage.setItem("Loses", yourLose);
  reset_game();
}
//https://icon-icons.com/ja/
