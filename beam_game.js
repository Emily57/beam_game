var your_pt = 0;
var enemy_pt = 0;
var judge = "〜続行〜";
action_save.checked = true ;
function resetGame() {
  your_pt = 0;
  enemy_pt = 0;
  judge = "〜続行〜";
  document.getElementById("your_action").innerHTML = "";
  document.getElementById("enemy_action").innerHTML = "";
  document.getElementById("judge").innerHTML = "Game Start";
  document.getElementById("your_gauge").innerHTML = "自分のゲージは "+your_pt+"pt";
  document.getElementById("enemy_gauge").innerHTML = "相手のゲージは "+enemy_pt+"pt";
  }
  function myGame() {
    action_save = document.form1.action_save.checked;
    action_barrier = document.form1.action_barrier.checked;
    action_beam = document.form1.action_beam.checked;
  if(your_pt===0 && action_beam === true){
    window.alert("ゲージが0ptなのでビームは選択できません！");
  } else {
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
    if (action_save === true) {
      your_action = "溜める";
      your_pt++;
    } else if (action_barrier === true) {
      your_action = "バリア";
    } else if (action_beam === true) {
      your_action = "ビーム";
      your_pt--;
    }
  if(your_action == "ビーム" && your_pt >=4 && enemy_action =="ビーム" && enemy_pt>=4){
    your_pt = your_pt -4;
    enemy_pt = enemy_pt -4;
  } else if (your_action == "ビーム" && your_pt >=4) {
    judge = "!!HIGH BEAM!!　　YOU WIN!!";
  } else if (enemy_action == "ビーム" && enemy_pt >=4) {
    judge = "!!HIGH BEAM!!　　YOU LOSE...";
  } else if (your_action == "ビーム" && enemy_action == "溜める") {
    judge = "YOU WIN!";
  } else if (your_action == "溜める" && enemy_action == "ビーム") {
      judge = "YOU LOSE...";
  }
document.getElementById("your_action").innerHTML = "自分の選択は "+your_action;
document.getElementById("enemy_action").innerHTML = "相手の選択は "+enemy_action;
document.getElementById("judge").innerHTML = judge;
document.getElementById("your_gauge").innerHTML = "自分のゲージは "+your_pt+"pt";
document.getElementById("enemy_gauge").innerHTML = "相手のゲージは "+enemy_pt+"pt";
    }
}
