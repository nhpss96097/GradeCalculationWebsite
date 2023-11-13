/* --------------------------------- 開場圖片動畫 --------------------------------- */

let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

//(要控制的對象, duration, 控制對象的原始狀態, 控制對象動畫結束後的狀態, 設定提早開始)
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

//當時間到執行指定的function
window.setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);
//2500毫秒 = 1 + 1.2 + 0.3 = 2.5秒

/* ---------------------------------- 網站功能 ---------------------------------- */

//阻止整個網站的Enter key
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//阻止按鈕送出資訊
//return Nodelist，對新增的元素無效
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//根據成績(A、B、C)，改變相對應的顏色和計算成績
let allSelects = document.querySelectorAll("select"); //靜態NodeList，對新增的元素無效

allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    // console.log(e.target.value);

    setGPA();
    changeColor(e.target); //e.target = <select>
  });
});

//改變學分，成績也要更新
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

//改變顏色方法
function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B-" ||
    target.value == "B+"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C-" ||
    target.value == "C+"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D-" ||
    target.value == "D+"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "grey";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
    target.style.color = "white";
  }
}

//成績代表的數值
function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

//成績計算方法
function setGPA() {
  let formLength = document.querySelectorAll("form").length; //學分數+成績
  let credits = document.querySelectorAll(".class-credit"); //學分數
  let selects = document.querySelectorAll("select"); //選擇的成績
  let sum = 0; //分子
  let creditSum = 0; //分母

  for (let i = 0; i < credits.length; i++) {
    // console.log(credits[i]);
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formLength; i++) {
    // 成績總和 = 學分 * 成績的數值
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  // console.log("sum is " + sum);
  // console.log("creditSum is " + creditSum);

  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    //toFixed = 取到小數點後 X 位
    result = (sum / creditSum).toFixed(2);
  }
  //取得GPA文字的元素，並加入 result 的成績計算結果
  document.getElementById("result-gpa").innerText = result;
}

/* --------------------------------- 增加按鈕功能 --------------------------------- */
let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");

  newDiv.classList.add("grader"); //增加class

  /* --------------------------------- 製作5個小元素 -------------------------------- */
  // 3 個 input 內容
  // 1 個 select 元素
  // 1 個最後的按鈕 trash-button

  /* ---------------------------------- input --------------------------------- */
  //要注意設定的屬性是不是和 html 中所設計的一樣

  //設定第一個input內容(課程表單)
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text"); //創建一個屬性
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type");

  //設定第二個教室表單(class-number)
  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("class-number");

  //設定第三個學分表單
  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credit");

  //有更改學分要計算成績
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  /* --------------------------------- select --------------------------------- */

  //創建一個新的class：select
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");

  //空白select
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);

  //A
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);

  //A-
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);

  //B+
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);

  //B
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);

  //B-
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);

  //C+
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);

  //C
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);

  //C-
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);

  //D+
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);

  //D
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);

  //D-
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);

  //F
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  //有更改成績要重新計算成績，以及改變選擇成績的顏色
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  /* ----------------------------- trash-button 按鈕 ---------------------------- */
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);

  //設定新增的垃圾桶按鈕功能
  newButton.addEventListener("click", (e) => {
    e.preventDefault(); //阻止按鈕送出預設事件

    //設定按下按鈕的動畫
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";

    // animationend 監聽動畫完成後
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove(); //刪除這個 form 元素。 *方法要記得加上()括弧
        setGPA(); //刪除後要重新計算成績
      }
    );
  });

  //在select下新增對應的成績選項
  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  //在newDiv下新增對應的元素
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  //在form下新增div元素
  newForm.appendChild(newDiv);

  //選取所有的all-inputs標籤，新增newForm的資料進去
  document.querySelector(".all-inputs").appendChild(newForm);

  //新增 form 表單的動畫
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

/* ------------------------------ 按下垃圾桶刪除 form 功能 ------------------------------ */
let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.parentElement);

    //新增消失動畫(搭配CSS)
    e.target.parentElement.parentElement.classList.add("remove");
  });
});

//刪除 form 表單
allTrash.forEach((trash) => {
  let form = trash.parentElement.parentElement;

  // transitionend 監聽動畫事件結束時
  form.addEventListener("transitionend", (e) => {
    e.target.remove(); //刪除表單
    setGPA(); //如果刪除表單要重新計算成績
  });
});

/* ---------------------------------- 排序演算法功能 --------------------------------- */
// merge sort
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");

btn1.addEventListener("click", () => {
  handleSorting("descending"); //由大到小(降序)
});

btn2.addEventListener("click", () => {
  handleSorting("ascending"); // 由小到大(升序)
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];

  /* --------------------------------- 抓取資料並存入 -------------------------------- */
  for (let i = 0; i < graders.length; i++) {
    // console.log(graders[i]);
    let class_name = graders[i].children[0].value; //graders[i].children[0]中的資料 = class category(課程)
    let class_number = graders[i].children[1].value; //class number
    let class_credit = graders[i].children[2].value; //credit 學分
    let class_grade = graders[i].children[3].value; //grade 成績
    //注意每個抓出來的值都是 string

    // let class_object = {
    //   //設定一個屬性名稱，等於什麼值
    //   class_name: class_name,
    //   class_number: class_number,
    //   class_credit: class_credit,
    //   class_number: class_number,
    // };

    // console.log(class_name, class_number, class_credit, class_grade);

    //如果有任一表單不是空的，就把資料存入 class_object。
    //全是空的則不做動作
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      //快速寫法
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      //把存入的資料放進 objectArray 陣列
      objectArray.push(class_object);
    } else {
      return;
    }
  }

  //取得 object array 之後，將成績 string 換成數字
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  //將排序好的數值存入 objectArray
  objectArray = mergeSort(objectArray);

  // objectArray 本身是由小到大排序，如果按 descending 就讓他反轉成由大到小排序
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }
  console.log(objectArray);

  /* ------------------------------- 根據排序內容(objectArray)更新網頁 ------------------------------- */
  //1.更新內容結構
  //2.重選元素重做事件監聽
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = ""; //清空內容

  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
      <input
        type="text"
        placeholder="class category"
        class="class-type"
        list="opt"
        value=${objectArray[i].class_name}
      /><!--
      --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value=${objectArray[i].class_number}
      /><!--
      --><input
        type="number"
        placeholder="credits"
        min="0"
        max="6"
        class="class-credit"
        value=${objectArray[i].class_credit}
      /><!--
      --><select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option></select
      ><!--
      --><button class="trash-button">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    </form>`;
  }
  // select 可直接用JS更改
  //整個 html 結構已經改變，因此需要重選一次元素
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  // select 事件監聽
  allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select); //事先轉換顏色
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  // credit 事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  // 垃圾桶按鈕監聽
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();

      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";

      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

/* --------------------------------- merge sort -------------------------------- */
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }

  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

//拆開陣列
function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }
  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
