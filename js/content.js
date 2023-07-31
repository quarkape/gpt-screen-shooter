console.log("欢迎使用gpt-screen-shooter插件。插件项目地址：https://github.com/quarkape/gpt-screen-shooter。")
console.log("欢迎star和fork项目，以获得后续的更新通知~")

// 你可以自行修改下面的配置或者新增新的配置内容

const fontSizeA = 42; // 输入内容区域的字号，默认24
const colorA = "#0081ff"; // 输入内容区域的字色，十六进制表示，默认黑色 #000000
const fontSizeB = 42; // 输出内容区域的字号，默认24
const colorB = "#000000"; // 输出内容区域的字色，十六进制表示，默认黑色 #000000
const ContentWidth = 100; // 整体内容占页面的宽度，如果设置为100，建议字号尽量大
// const showAvatar = true; // 是否显示头像
const stickyHeight = 200; // 顶部留空，以防止手机刘海遮住
const inputPre = "【输入内容】"; //输入内容前缀
const inputSuf = "【输出内容】"; //输出内容前缀
const inputB = true; //输入内容加粗
const outputB = true; //输出内容加粗
const divider = "------"; // 分隔符
const fileName = "gpt-screen-shooter导出内容"; // 导出文本名称


chrome.runtime.onMessage.addListener((req, sender, resp) => {
  const opt = req;
  console.log(opt)
  // return;
  if (opt.type === 0) {
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

    // 修改顶部内容，增加宽度，删除模型名称
    const sticky = document.getElementsByClassName("sticky")[document.getElementsByClassName("sticky").length - 1];
    sticky.style.height = stickyHeight + "px";
    sticky.innerHTML = "";

    // 发送内容样式
    const sc = document.getElementsByClassName("min-h-[20px]");
    for (let i=0;i<sc.length;i++) {
      sc[i].style.fontWeight = opt.inputB ? "bold" : "normal";
      sc[i].style.lineHeight = ((Number(opt.fontSize ? opt.fontSize : fontSizeA)) + 16) + "px";
      sc[i].style.fontSize = (opt.fontSize ? opt.fontSize : fontSizeA) + "px";
      sc[i].style.color = opt.inputColor ? `#${opt.inputColor}` : colorA;
    }

    // 回复内容样式
    const gc = document.getElementsByClassName("prose");
    for (let i=0;i<gc.length;i++) {
      gc[i].style.fontWeight = opt.outputB ? "bold" : "normal";
      gc[i].style.fontSize = (opt.fontSize ? opt.fontSize : fontSizeB) + "px";
      gc[i].style.color = opt.outputColor ? `#${opt.outputColor}` : colorB;
    }

    // 隐藏头像
    if (!opt.showAvatar) {
      const imgs = document.getElementsByTagName("img");
      for (const item of imgs) {
        item.style.display = "none";
      }
      const svgs = document.getElementsByClassName("w-[30px]");
      for (const item of svgs) {
        item.style.display = "none";
      }
    }

    // 所有内容样式
    const ac = document.getElementsByClassName("lg:max-w-[38rem]");
    for (const item of ac) {
      item.style.width = (opt.width ? Number(opt.width) : ContentWidth) + "% !important";
      item.style.maxWidth = (opt.width ? Number(opt.width) : ContentWidth) + "%";
      item.style.left = (100 - (opt.width ? Number(opt.width) : ContentWidth))/2 + "%"
    }

    resp("处理成功，请打开浏览器开发者工具，手动截屏");
  }

  // 复制文本到剪贴板
  let chatRecords = "";
  if (opt.type === 1 || opt.type === 2) {
    // 获取main标签
    const mainNode = document.getElementsByTagName("main")[0];
    const chats = mainNode.children[0].children[0].children[0].children[0].children;
    for (const item of chats) {
      // 如果是发送内容
      if (item.className == "group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800") {
        chatRecords += opt.divider ? opt.divider : divider;
        chatRecords += `\n${opt.inputPre ? opt.inputPre : inputPre}\n${item.children[0].children[1].children[0].children[0].children[0].innerHTML}`;
      } else if (item.className == "group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]") {
        chatRecords += `\n${opt.inputSuf ? opt.inputSuf : inputSuf}\n${item.children[0].children[1].children[0].children[0].children[0].innerText}\n`;
        chatRecords += opt.divider ? opt.divider : divider;
        chatRecords += '\n\n'
      }
    }
    if (opt.type === 1) {
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
      save2Text(chatRecords, opt);
      resp("导出成功");
    }
  }
})


// 复制文本至剪切板
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

// 导出文本
function save2Text(content, opt) {
  console.log(444, opt)
  const a = document.createElement("a");
  a.setAttribute("download", opt.fileName ? opt.fileName : fileName);
  a.style.display = "none";
  const blob = new Blob([content]);
  a.setAttribute("href", URL.createObjectURL(blob));
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
  }, 1000)
}