// console
console.log(`%c${'----------\n欢迎使用ChatGPT Screen Shoot插件.\n项目地址:https://github.com/quarkape/gpt-screen-shooter.\n还请给个star,欢迎fork~\n----------'}`, 'font-size: 20px;color: #9c26b0;font-weight: bold;')
console.log('使用方式:\n1、打开需要截图的会话(chat)\n2、打开插件，点击处理网页\n3、等网页处理成功后，插件的弹出框下方会有红色小字提示处理成功\n4、按下F12(或者ctrl+shift+I，或者手动点击浏览器右上角三个点-更多工具-开发者工具)打开开发者工具\n5、在开发者工具中按下ctrl+shift+P打开调试运行窗口\n6、在弹出的窗口中输入Capture full size screen并点击(Edge浏览器是输入：捕获全尺寸屏幕截图)\n7、等待片刻，浏览器会自动开始下载为图片')



chrome.runtime.onMessage.addListener((req, sender, resp) => {
  const opt = req.opt;
  if (!opt) {
    // 隐藏侧边栏
    const nav = document.querySelector(".bg-gray-900");
    nav.style.display = "none";

    // 隐藏下方输入框
    const input = document.getElementsByClassName("pt-2")[1];
    input.style.display = "none";

    // 设置为可滚动
    const whole = document.querySelector(".w-full");
    whole.classList.remove("overflow-hidden");

    const whole2 = document.querySelector(".max-w-full");
    whole2.classList.remove("overflow-hidden");

    const whole3 = document.querySelector(".transition-width");
    whole3.classList.remove("overflow-hidden");

    whole3.children[1].classList.remove("overflow-hidden");

    

    // 将回复内容设置样式
    let gc = document.getElementsByClassName("prose");
    for (let i=0;i<gc.length;i++) {
      gc[i].style.fontWeight = "bold";
      gc[i].style.fontSize = "20px";
    }

    // 将发送内容设置样式
    let sc = document.getElementsByClassName("min-h-[20px]");
    for (let i=0;i<gc.length;i++) {
      sc[i].style.fontWeight = "bold";
      sc[i].style.fontSize = "20px";
    }

    resp("处理成功，请打开浏览器开发者工具，手动截屏");
  } else {
    // 显示侧边栏
    const nav = document.querySelector(".bg-gray-900");
    nav.style.display = "block";

    // 显示下方输入框
    const input = document.getElementsByClassName("pt-2")[1];
    input.style.display = "block";

    // 恢复
    const whole = document.querySelector(".w-full");
    whole.classList.add("overflow-hidden");

    const whole2 = document.querySelector(".max-w-full");
    whole2.classList.add("overflow-hidden");

    const whole3 = document.querySelector(".transition-width");
    whole3.classList.add("overflow-hidden");

    whole3.children[1].classList.add("overflow-hidden");

    // 将回复内容设置样式
    let gc = document.getElementsByClassName("prose");
    for (let i=0;i<gc.length;i++) {
      gc[i].style.fontWeight = "normal";
      gc[i].style.fontSize = "16px";
    }

    // 将发送内容设置样式
    let sc = document.getElementsByClassName("min-h-[20px]");
    for (let i=0;i<gc.length;i++) {
      sc[i].style.fontWeight = "normal";
      sc[i].style.fontSize = "16px";
    }

    resp("恢复成功");
  }
})