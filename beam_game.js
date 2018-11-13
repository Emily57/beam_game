var your_pt = 0;
var enemy_pt = 0;
var judge = "〜続行〜";
var game_number = 1;
var your_win = 0;
var your_lose = game_number -1 -your_win;
var disabled_save = document.getElementById("action_save");
var disabled_barrier = document.getElementById("action_barrier");
var disabled_beam = document.getElementById("action_beam");
disabled_save.disabled = false;
disabled_barrier.disabled = false;
disabled_beam.disabled = true;
function resetGame() {
  your_pt = 0;
  enemy_pt = 0;
  judge = "〜続行〜";
  if(disabled_save.disabled == true){
    game_number++;
  }
  disabled_save.disabled = false;
  disabled_barrier.disabled = false;
  disabled_beam.disabled = true;
  document.getElementById("your_action").innerHTML = "";
  document.getElementById("enemy_action").innerHTML = "";
  document.getElementById("judge").innerHTML = "Game Start";
  document.getElementById("game_number").innerHTML = "第"+game_number+"試合";
  document.getElementById("your_gauge").innerHTML = "自分のゲージは "+your_pt+"pt";
  document.getElementById("enemy_gauge").innerHTML = "相手のゲージは "+enemy_pt+"pt";
}
function myGame(your_select) {
  action_save = document.form1.action_save.value;
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
    enemy_action = "溜める";
    enemy_pt++;
  } else if( enemyNumber == 1 ){
    enemy_action = "バリア";
  } else if( enemyNumber == 2 ){
    enemy_action = "ビーム";
    enemy_pt--;
  }
  if (your_select === "save") {
    your_action = "溜める";
    your_pt++;
  } else if (your_select === "barrier") {
    your_action = "バリア";
  } else if (your_select === "beam") {
    your_action = "ビーム";
    your_pt--;
  }
  if(your_pt>0){
    disabled_beam.disabled = false;
  } else {
    disabled_beam.disabled = true;
  }
  if(your_action == "ビーム" && your_pt >=4 && enemy_action =="ビーム" && enemy_pt>=4){
    your_pt = your_pt -4;
    enemy_pt = enemy_pt -4;
  } else if (your_action == "ビーム" && your_pt >=4) {
    judge = "!!HIGH BEAM!!　　YOU WIN!!";
    your_win++;
    disabled_save.disabled = true;
    disabled_barrier.disabled = true;
    disabled_beam.disabled = true;
  } else if (enemy_action == "ビーム" && enemy_pt >=4) {
    judge = "!!HIGH BEAM!!　　YOU LOSE...";
    your_lose++;
    disabled_save.disabled = true;
    disabled_barrier.disabled = true;
    disabled_beam.disabled = true;
  } else if (your_action == "ビーム" && enemy_action == "溜める") {
    judge = "YOU WIN!";
    your_win++;
    disabled_save.disabled = true;
    disabled_barrier.disabled = true;
    disabled_beam.disabled = true;
  } else if (your_action == "溜める" && enemy_action == "ビーム") {
    judge = "YOU LOSE...";
    your_lose++;
    disabled_save.disabled = true;
    disabled_barrier.disabled = true;
    disabled_beam.disabled = true;
  }
document.getElementById("your_action").innerHTML = "自分の選択は "+your_action;
document.getElementById("enemy_action").innerHTML = "相手の選択は "+enemy_action;
document.getElementById("judge").innerHTML = judge;
document.getElementById("your_gauge").innerHTML = "自分のゲージは "+your_pt+"pt";
document.getElementById("enemy_gauge").innerHTML = "相手のゲージは "+enemy_pt+"pt";
document.getElementById("your_KOs").innerHTML = " - "+your_win+"勝"+your_lose+"敗";
}
