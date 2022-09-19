var buttonOpenPages = document.getElementById("button-openPages");
buttonOpenPages.addEventListener("click", () => {
  var env = document.getElementById("drop-down").value;
  var branchPrefix = document.getElementById("branch-prefix").value;

  var sourceBranch = document.getElementById("sourceBranch").value;
  var develop = document.getElementById("develop");
  var sit1 = document.getElementById("sit1");
  var uat = document.getElementById("uat");
  if (develop.checked) {
    window.open(
      `https://gitlab.com/pia-team/egnatia/${env}/-/merge_requests/new?merge_request%5Bsource_branch%5D=${branchPrefix}-${sourceBranch}&merge_request%5Btarget_branch%5D=develop`,
      "_blank"
    );
  }
  if (sit1.checked) {
    window.open(
      `https://gitlab.com/pia-team/egnatia/${env}/-/merge_requests/new?merge_request%5Bsource_branch%5D=${branchPrefix}-${sourceBranch}&merge_request%5Btarget_branch%5D=sit1`,
      "_blank"
    );
  }
  if (uat.checked) {
    window.open(
      `https://gitlab.com/pia-team/egnatia/${env}/-/merge_requests/new?merge_request%5Bsource_branch%5D=${branchPrefix}-${sourceBranch}&merge_request%5Btarget_branch%5D=uat`,
      "_blank"
    );
  }
});
