// Saves options to chrome.storage
function save_options() {
  var gitlabToken = document.getElementById("gitlabToken").value;
  console.log(gitlabToken);
  chrome.storage.local.set({ gitlabToken }, function () {
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function () {
      status.textContent = "";
    }, 1500);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get("gitlabToken", (gitlabToken) => {
    document.getElementById("gitlabToken").value = gitlabToken.gitlabToken;
  });
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
