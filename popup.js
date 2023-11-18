let projectDD = document.getElementById("drop-down");
let branchDD = document.getElementById("branch-drop-down");
let buttonOpenPages = document.getElementById("button-openPages");

let token = "";
chrome.storage.local.get("gitlabToken", (result) => {
  if (!result || !result.gitlabToken) {
    alert("Please set your gitlab token in the options page");
    chrome.runtime.openOptionsPage() // open options page
  }
  token = result.gitlabToken;
  Http1.open("GET", "https://gitlab.com/api/v4/groups/10121421");
  Http1.setRequestHeader("Authorization", "Bearer " + token);
  Http1.send();
});

const Http1 = new XMLHttpRequest();
Http1.responseType = "json";

let projectList = [];

Http1.onreadystatechange = (e) => {
  if (Http1.response == null) {
    return;
  }
  if (!Http1.response.projects) {
    console.log("projects not found", Http1.response);
    return;
  }
  let elements = Http1.response.projects
    .sort((a, b) => b.last_activity_at.localeCompare(a.last_activity_at))
    .map((project) => ({ name: project.name, id: project.id }));

  elements = elements.slice(0, 10);
  console.log(elements.map((elt) => elt.name));
  for (let elt of elements) {
    let option = document.createElement("option");
    option.text = elt.name;
    option.value = elt.id;
    projectDD.appendChild(option);

    projectList.push(elt);
  }

  getBranches(elements[0].id);
};

buttonOpenPages.addEventListener("click", () => {
  var env = projectDD.value;
  projectList
    .filter((project) => project.id == env)
    .map((project) => {
      env = project.name;
    });
  var branch = branchDD.value;

  var develop = document.getElementById("develop");
  var sit1 = document.getElementById("sit1");
  var uat = document.getElementById("uat");
  console.log("env: " + env + " branch: " + branch);
  if (develop.checked) {
    window.open(
      `https://gitlab.com/pia-team/egnatia/${env}/-/merge_requests/new?merge_request%5Bsource_branch%5D=${branch}&merge_request%5Btarget_branch%5D=develop`,
      "_blank"
    );
  }
  if (sit1.checked) {
    window.open(
      `https://gitlab.com/pia-team/egnatia/${env}/-/merge_requests/new?merge_request%5Bsource_branch%5D=${branch}&merge_request%5Btarget_branch%5D=sit1`,
      "_blank"
    );
  }
  if (uat.checked) {
    window.open(
      `https://gitlab.com/pia-team/egnatia/${env}/-/merge_requests/new?merge_request%5Bsource_branch%5D=${branch}&merge_request%5Btarget_branch%5D=uat`,
      "_blank"
    );
  }
});

function getBranches(project) {
  const Http2 = new XMLHttpRequest();
  Http2.responseType = "json";
  Http2.open(
    "GET",
    `https://gitlab.com/api/v4/projects/${project}/repository/branches?page=1&per_page=100`
  );
  Http2.setRequestHeader("Authorization", "Bearer " + token);
  Http2.send();

  Http2.onreadystatechange = (e) => {
    if (Http2.response == null) return;

    //get second page if needed
    if (Http2.getResponseHeader("X-Total-Pages") > 1) {
      const Http3 = new XMLHttpRequest();
      Http3.responseType = "json";
      Http3.open(
        "GET",
        `https://gitlab.com/api/v4/projects/${project}/repository/branches?page=2&per_page=100`
      );
      Http3.setRequestHeader("Authorization", "Bearer " + token);
      Http3.send();
      Http3.onreadystatechange = (e) => {
        if (Http3.response == null) return;
        // Http2.response.concat(Http3.response);
        let branchNameList = Http2.response
          .concat(Http3.response)
          .sort((a, b) =>
            b.commit.committed_date.localeCompare(a.commit.committed_date)
          )
          .map((branch) => branch.name);

        branchDD.innerHTML = "";
        branchNameList = branchNameList.slice(0, 10);
        console.log(branchNameList);
        for (let elt of branchNameList) {
          let option = document.createElement("option");
          option.text = elt;
          option.value = elt;
          branchDD.appendChild(option);
        }
      };
    } else {
      let branchNameList = Http2.response
        .sort((a, b) =>
          b.commit.committed_date.localeCompare(a.commit.committed_date)
        )
        .map((branch) => branch.name);

      branchDD.innerHTML = "";
      branchNameList = branchNameList.slice(0, 10);
      console.log(branchNameList);
      for (let elt of branchNameList) {
        let option = document.createElement("option");
        option.text = elt;
        option.value = elt;
        branchDD.appendChild(option);
      }
    }
  };
}
