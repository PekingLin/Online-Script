// ==UserScript==
// @name        　Customized JIRA
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  Toggle the visibility of the JIRA sidebar on and off with a button
// @author       ChatGPT
// @match        https://jira.shanqu.cc/*
// @grant        GM_setValue
// @grant        GM_getValue
//@grant         GM_addStyle
// ==/UserScript==



// 获取当前网页的URL
var currentUrl = window.location.href;
let observer = null;
const edit_issue_button = document.querySelector('#edit-issue');
const create_issue_button=document.querySelector('#create_link');
//const edit_comment_button=document.querySelector('edit-comment');

//监听点击创建按钮
create_issue_button.addEventListener('click', function() {
// 监听 DOM 变化的回调函数

const observerCallback = function(mutationsList, observer) {
  // 遍历每一个变化
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // DOM 变化为子节点变化


     // 判断新添加的节点是否是新建弹窗
      const create_issue_dialog = document.getElementById('create-issue-dialog');
      if (create_issue_dialog) {
        create_issue_dialog.style.width = '80%';
        create_issue_dialog.style.height = '90%';
        create_issue_dialog.style.top = '40px';
        for (const node of mutation.addedNodes) {
          if (node.classList && node.classList.contains('aui-dialog2-content') && node.classList.contains('jira-dialog-core-content')) {
            node.style.maxHeight = 'none';
          }
        }
      }
    }
  }


};

    // 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(observerCallback);

// 配置观察选项
const config = { attributes: true, childList: true, subtree: true };
//const config = { childList: true };

// 传入目标节点和观察选项
const targetNode1 = document.body;
observer.observe(targetNode1, config);

})

//Hide sidebar button
if (/https:\/\/jira\.shanqu\.cc\/browse\/*/.test(currentUrl)||/https:\/\/jira\.shanqu\.cc\/projects\/ZHIQU\/issues\/*/
.test(currentUrl)) {


  // Add button to page
  const toggleButton = document.createElement('div');
  toggleButton.id = 'toggle-sidebar';
  toggleButton.addEventListener('click', () => {
    const sidebar = document.getElementById('viewissuesidebar');
    const currentValue = sidebar.style.display;
    const newValue = currentValue === 'none' ? '' : 'none';
    sidebar.style.display = newValue;
    GM_setValue('sidebarState', newValue);
    toggleButton.classList.toggle('on');
  });
  document.body.appendChild(toggleButton);

  // Set button initial state based on stored value
  const storedState = GM_getValue('sidebarState');
  if (storedState) {
      // Wait viewissuesdebar loading
      let intervalId = setInterval(function() {
  let sidebar = document.getElementById("viewissuesidebar");
  if (sidebar) {
    clearInterval(intervalId);
    const sidebar = document.getElementById('viewissuesidebar');
    sidebar.style.display = storedState;
    if (storedState === 'none') {
      toggleButton.classList.add('on');
    }
  }
}, 1000);

  }


// Add custom styles to the button
const customCSS = `
#toggle-sidebar {
  position: fixed;
  z-index: 999;
  top: 10px;
  right: 340px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

#toggle-sidebar:before {
  content: 'Hide';
  position: absolute;
  top:200%;

   transform: translateY(-50%);
  font-size: 12px;
  font-weight: bold;
  color: #333;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

#toggle-sidebar:hover:before {
  left: 0px;
  opacity: 1;
}

#toggle-sidebar.on {
  background-color: #5cb85c;
}

#toggle-sidebar.on:before {
  content: 'Show';
  left: 0px;
}
`;

// Add custom styles to page
const styleElement = document.createElement('style');
styleElement.innerHTML = customCSS;
document.head.appendChild(styleElement);


const observerCallback = function(mutationsList, observer) {
  // 遍历每一个变化
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // DOM 变化为子节点变化
setTimeout(() => console.log("你好!"), 50)
      // 判断新添加的节点是否为侧边栏
      const sidebar = document.getElementById('viewissuesidebar');
      if (sidebar) {
        const storedState = GM_getValue('sidebarState');
        sidebar.style.display = storedState;
      }


     //判断新添加的节点是否是底部添加评论按钮
      const filter_wrapper = document.getElementById('filter-wrapper');
      if (filter_wrapper) {
          filter_wrapper.style.display='none'
      }

           //判断添加的节点是否展开附件
       const attachmentModule = document.getElementById('attachmentmodule');
      if (attachmentModule) {
                  attachmentModule.classList.add('collapsed');
        attachmentModule.classList.remove('expanded');

      }


           //判断新添加的节点是否是编辑评论弹窗
      const edit_comment = document.getElementById('edit-comment');
      if (edit_comment) {
          edit_comment.style.width='80%';
          edit_comment.style.left='10%';
          edit_comment.style.top='3%';
          edit_comment.style.removeProperty('margin-left');
          edit_comment.style.removeProperty('margin-top');
          edit_comment.style.height='94%';
      }
        const formBody = document.querySelector('#edit-comment .form-body, #comment-edit .form-body');
                if (formBody) {
                    formBody.style.height = '720px';
                }
       const editor = document.querySelector('.tox-tinymce.jira-editor-container');
      if (editor) {
        editor.style.height = '500px';
      }

    }
  }
};

    // 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(observerCallback);

// 配置观察选项
const config = { attributes: true, childList: true, subtree: true };
//const config = { childList: true };

// 传入目标节点和观察选项
const targetNode1 = document.body;
observer.observe(targetNode1, config);





//监听点击编辑按钮
edit_issue_button.addEventListener('click', function() {
// 监听 DOM 变化的回调函数

const observerCallback = function(mutationsList, observer) {
  // 遍历每一个变化
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // DOM 变化为子节点变化

     // 判断新添加的节点是否是编辑弹窗
      const edit_issue_dialog = document.getElementById('edit-issue-dialog');
      if (edit_issue_dialog) {
        edit_issue_dialog.style.width = '80%';
        edit_issue_dialog.style.height = '90%';
        edit_issue_dialog.style.top = '40px';
        for (const node of mutation.addedNodes) {
          if (node.classList && node.classList.contains('aui-dialog2-content') && node.classList.contains('jira-dialog-core-content')) {
            node.style.maxHeight = 'none';
          }
        }
      }
    }
  }


};

    // 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(observerCallback);

// 配置观察选项
const config = { attributes: true, childList: true, subtree: true };
//const config = { childList: true };

// 传入目标节点和观察选项
const targetNode1 = document.body;
observer.observe(targetNode1, config);

})






//固定title栏
    GM_addStyle(`
     .issue-body-content {
    position: absolute;
    top: 180px;
  },
     .aui-dialog2-large {
    width: 80%;
}

`);
    var stalker =document.getElementById('stalker');
    stalker.style.position='fixed';
    stalker.style.left='56px';
    stalker.style.right='16px';



}


else if (window.location.href.indexOf('https://jira.shanqu.cc/secure/CreateIssue.jspa') !== -1) {
    GM_addStyle(`
  .aui-page-focused-large #footer .footer-body, .aui-page-focused-large .aui-page-header, .aui-page-focused-large .aui-page-panel, .aui-page-size-large #footer .footer-body, .aui-page-size-large .aui-page-header, .aui-page-size-large .aui-page-panel {
    width:80%
  }
`);
    //var description =document.getElementById('description');
    //description.style.height = '700px';

}
