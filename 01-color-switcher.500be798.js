const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};t.startBtn.addEventListener("click",(function(){t.stopBtn.removeAttribute("disabled"),t.startBtn.setAttribute("disabled","true"),e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.stopBtn.addEventListener("click",(function(){e&&clearInterval(e),t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled","true")})),t.stopBtn.setAttribute("disabled","true");let e=null;
//# sourceMappingURL=01-color-switcher.500be798.js.map