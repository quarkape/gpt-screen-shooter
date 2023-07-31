let tab_id = null;
let curType = 0;

// 判断当前tab的id
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  tab_id = tabs[0].id;
})

const dealNode =  document.getElementsByClassName("deal-opt")[0];
const copyNode =  document.getElementsByClassName("copy-opt")[0];
const exportNode =  document.getElementsByClassName("export-opt")[0];
const ansNode =  document.getElementById("ans");

// 跳转到项目地址
document.getElementById("proj").addEventListener("click", () => {
  window.open("https://github.com/quarkape/gpt-screen-shooter.git");
})

const nodeArr = [dealNode, copyNode, exportNode];

document.getElementsByClassName("opt-item")[0].addEventListener("click", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  if (tagName === 'input' || tagName === "label") {
    const forName = (tagName === "label" ? e.target.htmlFor : e.target.id) + "-opt";
    console.log(forName)
    nodeArr.forEach((item, index) => {
      if (item.className.includes(forName)) {
        item.classList.add("showconf");
        curType = index;
      } else {
        item.classList.remove("showconf");
      }
    })
  }
})

// 封装参数
document.querySelector(".btn").addEventListener("click", () => {
  const obj = {};
  obj.type = curType;
  if (curType === 0) {
    obj.fontSize = document.getElementById("font-size").value;
    obj.width = document.getElementById("width").value;
    obj.inputColor = document.getElementById("input-color").value;
    obj.inputB = document.getElementById("inba").checked;
    obj.outputColor = document.getElementById("output-color").value;
    obj.outputB = document.getElementById("outba").checked;
    obj.showAvatar = document.getElementById("showa").checked;
  } else if (curType === 1) {
    obj.inputPre = document.getElementById("input-prea").value;
    obj.inputSuf = document.getElementById("input-sufa").value;
    obj.divider = document.getElementById("dividera").value;
  } else {
    obj.fileName = document.getElementById("export-name").value;
    obj.inputPre = document.getElementById("input-pre").value;
    obj.inputSuf = document.getElementById("input-suf").value;
    obj.divider = document.getElementById("divider").value;
  }
  chrome.tabs.sendMessage(tab_id, obj, (resp) => {
    ansNode.innerText = resp;
  })
})