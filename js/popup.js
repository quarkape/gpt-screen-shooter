tab_id = null;

// 判断当前tab的id
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  tab_id = tabs[0].id;
})

// 跳转到项目地址
document.getElementById("proj").addEventListener("click", () => {
  window.open("https://github.com/quarkape/gpt-screen-shooter.git");
})

// 开始处理logo
document.getElementById("deal").addEventListener("click", () => {
  chrome.tabs.sendMessage(tab_id, {opt: 0}, (resp) => {
      document.getElementById("ans").innerText = resp;
  })
})

document.getElementById("copy").addEventListener("click", () => {
  chrome.tabs.sendMessage(tab_id, {opt: 1}, (resp) => {
      document.getElementById("ans").innerText = resp;
  })
})

document.getElementById("export").addEventListener("click", () => {
  chrome.tabs.sendMessage(tab_id, {opt: 2}, (resp) => {
      document.getElementById("ans").innerText = resp;
  })
})
