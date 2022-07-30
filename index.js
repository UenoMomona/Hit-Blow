// 変数の定義
let ans =[];
let predict_array = [];
let result = {hit: 0, blow: 0 };
let record_pre = [];
let record_res = [];
let checked = 0;

// 要素の検出
let start = document.getElementById('start');
let start_page = document.getElementById('start_page');
let game_page = document.getElementById('game_page');
let end_page = document.getElementById('end_page');
let pre_0 = document.getElementById('pre_0');
let pre_1 = document.getElementById('pre_1');
let pre_2 = document.getElementById('pre_2');
let pre_3 = document.getElementById('pre_3');
let pre_4 = document.getElementById('pre_4');
let pre_5 = document.getElementById('pre_5');
let digit_1 = document.getElementById('digit_1');
let digit_2 = document.getElementById('digit_2');
let digit_3 = document.getElementById('digit_3');
let digit_4 = document.getElementById('digit_4');
let result_h = document.getElementById('result_h');
let result_b = document.getElementById('result_b');
let decide = document.getElementById('decide');
let reset = document.getElementById('reset');
let ans_show = document.getElementById('ans');
// ボタンを押したら
start.addEventListener('click', startEvent);
pre_0.addEventListener('click', addPredict);
pre_1.addEventListener('click', addPredict);
pre_2.addEventListener('click', addPredict);
pre_3.addEventListener('click', addPredict);
pre_4.addEventListener('click', addPredict);
pre_5.addEventListener('click', addPredict);
decide.addEventListener('click',check_restart);
reset.addEventListener('click', reset_fun);

let record_pre_show = document.getElementById("record_pre");


// メソッド
function startEvent(){
  // 0~5の六種類を並べる
  let array = [0, 1, 2, 3, 4, 5];
  arrayShuffle(array);

  for (let i = 0; i < 4; i++){
    ans.push(array.shift());
  }
  console.log(ans);
  start_page.style.display = "none";
  game_page.style.display = "";
}

// startEvent内で使用
function arrayShuffle(array){
  for(let j = 0; j < Math.random() * 10; j++){
    for(let i = 0; i < array.length; i++){
      let r = Math.floor(Math.random()* array.length);
      let tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
  }
  return array;
}


// 予想値の入力
function addPredict(){
  if(predict_array.length < 4){
    num = Number(this.value);
    predict_array.push(num)
    // 一度推したボタンは押せなくする
    switch(this.id){
      case 'pre_0':
        pre_0.disabled = true;
        break;
      case 'pre_1':
        pre_1.disabled = true;
        break;
      case 'pre_2':
        pre_2.disabled = true;
        break;
      case 'pre_3':
        pre_3.disabled = true;
        break;
      case 'pre_4':
        pre_4.disabled = true;
        break;
      case 'pre_5':
        pre_5.disabled = true;
        break;
      default:
        break;
    }
    // 押した答えを表示する
    for (var i = 1; i < predict_array.length + 1; i++) {
      eval("digit_" + i + ".innerHTML =" + predict_array[i-1] + ";");
      // console.log(eval("digit_" + i));
    }
  }
  // console.log(predict_array);
}

function check_restart(){
  if(predict_array.length == 4){
    if(checked == 0){
      check();
    }else if(checked == 1){
      restart();
    }
  }
}



function check(){
    for(let i = 0; i < 4; i++){
      if(predict_array[i] == ans[i]){
        // console.log("hit");
        result.hit++;
      }else if(ans.includes(predict_array[i])){
        // console.log("blow");
        result.blow++;
      }
    }
    // console.log(result);
    // 結果の表示
    result_h.innerHTML = result['hit'];
    result_b.innerHTML = result['blow'];

    checked = 1;
    decide.innerHTML = "Restart";

    if(result['hit'] == 4){
      game_page.style.display = "none";
      end_page.style.display = "";
      ans_show.innerHTML = ans
    }
}

function restart(){
  if(result['hit'] != 4){
    record_pre.push(predict_array);
    predict_array = [];
    record_res.push(result);
    result = {hit: 0, blow: 0 };
    // console.log(record_res);
    // 過去の結果を表示する
    i = record_pre.length -1;
    record_pre_show.innerHTML +="<div class='record'>" + "<" + record_pre.length + ">" + "<br> "+ record_pre[i] +  "<br>" + "hit:" + record_res[i]['hit'] + "blow:" + record_res[i]['blow']+ "<br></div>" ;
    
    checked = 0;
    decide.innerHTML = "Enter";
    // ボタンをリセットする
    pre_0.disabled = false;
    pre_1.disabled = false;
    pre_2.disabled = false;
    pre_3.disabled = false;
    pre_4.disabled = false;
    pre_5.disabled = false;
    decide.disabled = false;
    //　結果の表示を消す
    digit_1.innerHTML = "";
    digit_2.innerHTML = "";
    digit_3.innerHTML = "";
    digit_4.innerHTML = "";
    result_h.innerHTML = "";
    result_b.innerHTML = "";
  }
}

function reset_fun(){
      // 変数をリセットする
      ans =[];
      predict_array = [];
      result = {hit: 0, blow: 0 };
      record_pre = [];
      record_res = [];
      checked = 0;
      // ボタンをリセットする
      start.disabled = false;
      pre_0.disabled = false;
      pre_1.disabled = false;
      pre_2.disabled = false;
      pre_3.disabled = false;
      pre_4.disabled = false;
      pre_5.disabled = false;
      decide.disabled = false;

          //　結果の表示を消す
    digit_1.innerHTML = "";
    digit_2.innerHTML = "";
    digit_3.innerHTML = "";
    digit_4.innerHTML = "";
    result_h.innerHTML = "";
    result_b.innerHTML = "";
    
    record_pre_show.innerHTML = "";
    decide.innerHTML = "Enter";

      end_page.style.display = "none";
      start_page.style.display = "";
}