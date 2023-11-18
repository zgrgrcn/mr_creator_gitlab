//1
chrome.contextMenus.create({
  id: "PiA",
  title: "PiA",
  contexts: ["selection"],
});

//1.2 uat
chrome.contextMenus.create({
  id: "uat",
  title: "uat",
  parentId: "PiA",
  contexts: ["selection"],
});
//1.2 sit1
chrome.contextMenus.create({
  id: "sit1",
  title: "sit1",
  parentId: "PiA",
  contexts: ["selection"],
});

//1.2.3 camundaViewer
chrome.contextMenus.create({
  id: "camundaViewerUat",
  title: "camundaViewer",
  parentId: "uat",
  contexts: ["all"],
});

//1.2.3 camundaViewer
chrome.contextMenus.create({
  id: "camundaViewerSit",
  title: "camundaViewer",
  parentId: "sit1",
  contexts: ["selection"],
});

function searchUrbanDict(info, tab) {
  /*
  menuItemId:camundaViewer"
  parentMenuItemId:uat"
  selectionText:create"
  */
  if (info.menuItemId.startsWith("camundaViewer")) {
    chrome.tabs.create({
      url: `https://si-bpmn-api.${info.parentMenuItemId}.dnext.al.vodafone.com/api/si-bpmn/viewer.html?processInstanceId=${info.selectionText}`,
    });
  }
}

chrome.contextMenus.onClicked.addListener(searchUrbanDict);
