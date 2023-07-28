console.log("欢迎使用gpt-screen-shooter插件。插件项目地址：https://github.com/quarkape/gpt-screen-shooter。")
console.log("欢迎star和fork项目，以获得后续的更新通知~")

// 你可以自行修改下面的配置或者新增新的配置内容

const fontSizeA = 24; // 输入内容区域的字号，默认24
const colorA = "#000000"; // 输入内容区域的字色，十六进制表示，默认黑色 #000000
const fontSizeB = 24; // 输出内容区域的字号，默认24
const colorB = "#000000"; // 输出内容区域的字色，十六进制表示，默认黑色 #000000
const ContentWidth = 60; // 整体内容占页面的宽度，不建设设置为100%，不然导出的图片需要放大、左右滑动查看，不太方便


chrome.runtime.onMessage.addListener((req, sender, resp) => {
  const opt = req.opt;
  if (opt === 0) {
    // 隐藏侧边栏
    const nav = document.querySelector(".bg-gray-900");
    nav.style.display = "none";

    // 隐藏下方输入框
    const input = document.getElementsByClassName("pt-2")[1];
    input.style.display = "none";

    // 设置为可滚动
    const whole = document.querySelector(".w-full");
    whole.classList.remove("overflow-hidden");
    whole.classList.remove("h-full");

    const whole2 = document.querySelector(".max-w-full");
    whole2.classList.remove("overflow-hidden");

    const whole3 = document.querySelector(".transition-width");
    whole3.classList.remove("overflow-hidden");

    whole3.children[1].classList.remove("overflow-hidden");

    // 回复内容样式
    let gc = document.getElementsByClassName("prose");
    for (let i=0;i<gc.length;i++) {
      gc[i].style.fontWeight = "bold";
      gc[i].style.fontSize = fontSizeA + "px";
      gc[i].style.color = colorB;
    }

    // 发送内容样式
    let sc = document.getElementsByClassName("min-h-[20px]");
    for (let i=0;i<sc.length;i++) {
      sc[i].style.fontWeight = "bold";
      sc[i].style.fontSize = fontSizeB + "px";
      sc[i].style.color = "#000000";
    }

    // 所有内容样式
    const ac = document.getElementsByClassName("lg:max-w-[38rem]");
    for (const item of ac) {
      item.style.width = ContentWidth + "% !important";
      item.style.maxWidth = ContentWidth + "%";
      item.style.left = (100 - ContentWidth)/2 + "%"
    }

    resp("处理成功，请打开浏览器开发者工具，手动截屏");
  } 

  // if(opt === 1) {
  //   // 显示侧边栏
  //   const nav = document.querySelector(".bg-gray-900");
  //   nav.style.display = "block";

  //   // 显示下方输入框
  //   const input = document.getElementsByClassName("pt-2")[1];
  //   input.style.display = "block";

  //   // 恢复
  //   const whole = document.querySelector(".w-full");
  //   whole.classList.add("overflow-hidden");

  //   const whole2 = document.querySelector(".max-w-full");
  //   whole2.classList.add("overflow-hidden");

  //   const whole3 = document.querySelector(".transition-width");
  //   whole3.classList.add("overflow-hidden");

  //   whole3.children[1].classList.add("overflow-hidden");

  //   // 将回复内容设置样式
  //   let gc = document.getElementsByClassName("prose");
  //   for (let i=0;i<gc.length;i++) {
  //     gc[i].style.fontWeight = "normal";
  //     gc[i].style.fontSize = "16px";
  //   }

  //   // 将发送内容设置样式
  //   let sc = document.getElementsByClassName("min-h-[20px]");
  //   for (let i=0;i<sc.length;i++) {
  //     sc[i].style.fontWeight = "normal";
  //     sc[i].style.fontSize = "16px";
  //   }
  //   resp("恢复成功");
  // }

  // 复制文本到剪贴板
  let chatRecords = "";
  if (opt === 1 || opt === 2) {
    // 获取main标签
    const mainNode = document.getElementsByTagName("main")[0];
    const chats = mainNode.children[0].children[0].children[0].children[0].children;
    for (const item of chats) {
      // 如果是发送内容
      if (item.className == "group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800") {
        chatRecords += `\n【输入内容】\n${item.children[0].children[1].children[0].children[0].children[0].innerHTML}`;
      } else if (item.className == "group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]") {
        chatRecords += `\n【输出内容】\n${item.children[0].children[1].children[0].children[0].children[0].innerText}\n-----`;
      }
    }
    if (opt === 1) {
      const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);
      a.addEventListener("click", () => {
        toClipBoard(chatRecords);
      })
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      })
      resp("复制成功，可直接在输入框粘贴");
    } else {
      save2Text(chatRecords);
      resp("导出成功");
    }
  }
})


function toClipBoard(content) {
  const textarea = document.createElement('textarea');
  document.body.appendChild(textarea);
  textarea.style.position = 'fixed';
  textarea.style.top = '10px';
  textarea.value = content;
  textarea.select();
  document.execCommand('copy', true);
  setTimeout(() => {
    document.body.removeChild(textarea);
  }, 1000)
}

function save2Text(content) {
  const a = document.createElement("a");
  a.setAttribute("download", "chatgpt导出内容");
  a.style.display = "none";
  const blob = new Blob([content]);
  a.setAttribute("href", URL.createObjectURL(blob));
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
  }, 1000)
}