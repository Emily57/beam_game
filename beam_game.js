var your_pt = 0;
var enemy_pt = 0;
var judge = "";
var game_number = 1;
var your_win = 0;
var your_lose = 0;
var game_turn = 0;
var history_text = "";
var disabled_charge = document.getElementById("action_charge");
var disabled_barrier = document.getElementById("action_barrier");
var disabled_beam = document.getElementById("action_beam");
disabled_charge.disabled = false;
disabled_barrier.disabled = false;
disabled_beam.disabled = true;
function resetGame() {
  your_pt = 0;
  enemy_pt = 0;
  game_turn = 0;
  judge = "";
  if(disabled_charge.disabled == true){
    game_number++;
  }
  disabled_charge.disabled = false;
  disabled_barrier.disabled = false;
  disabled_beam.disabled = true;
  document.getElementById("your_action").innerHTML = "";
  document.getElementById("enemy_action").innerHTML = "";
  document.getElementById("game_continuation").innerHTML = "Game Start";
  document.getElementById("judge").innerHTML = "";
  document.getElementById("game_number").innerHTML = "第"+game_number+"試合";
  document.getElementById("you_gauge").innerHTML = "□□□□□";
  document.getElementById("enemy_gauge").innerHTML = "□□□□□";
}
function myGame(your_select) {
  document.getElementById("game_continuation").innerHTML = "Continuation";
  action_charge = document.form1.action_charge.value;
  action_barrier = document.form1.action_barrier.value;
  action_beam = document.form1.action_beam.value;
  if(your_pt===0 && enemy_pt===0){
    enemyNumber = 0;
  } else if (enemy_pt>=5) {
    enemyNumber = 2;
  } else if(your_pt===0 && enemy_pt ==4){
    enemyNumber = 0;
  } else if (your_pt===0) {
    enemyNumber = Math.floor(Math.random()*3);
    while(enemyNumber == 1){
      enemyNumber = Math.floor(Math.random()*3);
    }
  } else if (enemy_pt>=1) {
    enemyNumber = Math.floor(Math.random()*3);
  } else {
    enemyNumber = Math.floor(Math.random()*2);
  }
  if( enemyNumber === 0 ){
    enemy_action = "Charge";
    enemy_pt++;
  } else if( enemyNumber == 1 ){
    enemy_action = "Barrier";
  } else if( enemyNumber == 2 ){
    enemy_action = "Beam";
    enemy_pt--;
  }
  if (your_select === "charge") {
    your_action = "Charge";
    your_pt++;
  } else if (your_select === "barrier") {
    your_action = "Barrier";
  } else if (your_select === "beam") {
    your_action = "Beam";
    your_pt--;
  }
  if(your_pt>0){
    disabled_beam.disabled = false;
  } else {
    disabled_beam.disabled = true;
  }
  game_turn++;
  if(your_action == "Beam" && your_pt >=4 && enemy_action =="Beam" && enemy_pt>=4){
    your_pt = your_pt -4;
    enemy_pt = enemy_pt -4;
  } else if (your_action == "Beam" && your_pt >=4) {
    judge = "!!HIGH BEAM!!　　YOU WIN!!".fontcolor("red").big().bold();
    your_win++;
    your_pt = your_pt -4;
    document.getElementById("game_continuation").innerHTML = "";
    disabled_charge.disabled = true;
    disabled_barrier.disabled = true;
    disabled_beam.disabled = true;
  } else if (enemy_action == "Beam" && enemy_pt >=4) {
    judge = "!!HIGH BEAM!!　　YOU LOSE...".fontcolor("blue").big().bold();
    your_lose++;
    enemy_pt = enemy_pt -4;
    document.getElementById("game_continuation").innerHTML = "";
    disabled_charge.disabled = true;
    disabled_barrier.disabled = true;
    disabled_beam.disabled = true;
  } else if (your_action == "Beam" && enemy_action == "Charge") {
    judge = "YOU WIN!".fontcolor("red").big().bold();
    your_win++;
    document.getElementById("game_continuation").innerHTML = "";
    disabled_charge.disabled = true;
    disabled_barrier.disabled = true;
    disabled_beam.disabled = true;
  } else if (your_action == "Charge" && enemy_action == "Beam") {
    judge = "YOU LOSE...".fontcolor("blue").big().bold();
    your_lose++;
    document.getElementById("game_continuation").innerHTML = "";
    disabled_charge.disabled = true;
    disabled_barrier.disabled = true;
    disabled_beam.disabled = true;
  }
var enemy_gauge_text = ""
for(i=5;i>enemy_pt;i--){
  enemy_gauge_text += "□"
}
for(i=0;i<enemy_pt;i++){
  enemy_gauge_text += "■"
}

var your_gauge_text = ""
for(i=5;i>your_pt;i--){
  your_gauge_text += "□"
}
for(i=0;i<your_pt;i++){
  your_gauge_text += "■"
}
history_text = game_number+'-'+game_turn+') Enemy:'+enemy_action+'　You:'+your_action+'<br>';
document.getElementById("action_history").innerHTML += history_text;
document.getElementById("your_action").innerHTML = your_action;
document.getElementById("enemy_action").innerHTML = enemy_action;
document.getElementById("judge").innerHTML = judge;
document.getElementById("you_gauge").innerHTML = your_gauge_text;
document.getElementById("enemy_gauge").innerHTML = enemy_gauge_text;
document.getElementById("your_KOs").innerHTML = " - "+your_win+"勝"+your_lose+"敗";
}
