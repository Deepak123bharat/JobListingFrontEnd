var arr = ["Frontend", "Backend", "JavaScript", "HTML", "CSS"];

// load the data from data.json and insert to the DOM
function loadData(data) {
  let container = document.getElementById("container");
  container.innerHTML = "";
  let containerData = "";
  console.log("data", data);
  data.forEach((element) => {
    let skills = "";
    element.skills.forEach((data) => {
      skills += `<p><b>${data}</b></p>`;
    });

    let jobPost = `<div class="job-listing">
      <img class="job-listing-img"
          src="${element.logo_url}" />
      <div class="job-listing-innerdiv">
          <div class="details">
              <div class="details-top">
                  <h2 class="company-name" style="color:#7ba9a7;">${element.company}</h2>
                  <div class="job-tag">
                      <p id="new">New!</p>
                      <p id="featured" >
                          Featured</p>
                  </div>
              </div>
              <div class="details-middle">
                  <h2 class="position-type">${element.title}</h2>
              </div>
              <div class="details-bottom">
                  <p>${element.date_posted}</p>
                  <p>&bull;</p>
                  <p>${element.employment_type}</p>
                  <p>&bull;</p>
                  <p>${element.location}</p>
              </div>

          </div>
          <div id="hr"></div>
          <div class="tech-stack">
              ${skills}
          </div>
      </div>
  </div>`;

    containerData += jobPost;
  });
  container.innerHTML += containerData;
}

function fetchData() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((json) => {
      data = [...json.jobs];
      loadData(data);
    });
}

let stringSkills = "";
for (let i = 0; i < 5; i++) {
  stringSkills += `<div  class="poup-skills" >${arr[i]}</div> <hr/>`;
}
document.getElementById("search-poup").innerHTML = stringSkills;
let skills = document.querySelector("#search-poup").childNodes;
Array.from(skills).forEach((element) => {
  if (element.nodeName === "DIV") {
    element.addEventListener("click", (e) => {
      let div = document.createElement("div");
      div.className = "tech-stack-input";

      let button = document.createElement("button");
      button.innerText = "X";
      button.style = "height:40%";
      button.addEventListener("click", () => {
        div.outerHTML = "";
        updateContainer();
      });

      let text = document.createElement("p");
      text.innerText = e.target.innerHTML;

      div.appendChild(text);
      div.appendChild(button);
      document.getElementById("search-input1").append(div);

      div.className = "tech-stack-input";
      updateContainer();
      togglePopup();
    });
  }
});

function updateContainer() {
  let allInput = document.getElementById("search-input1").childNodes;
  allInput = Array.from(allInput);
  let out = [];
  if (data.length === 0) {
    fetchData();
  }
  console.log("allinput", allInput, data);
  for (let j = 0; j < data.length; j++) {
    let shouldInclude = true;
    for (let i = 1; i < allInput.length; i++) {
      if (
        !data[j].skills.includes(allInput[i].firstChild.firstChild.nodeValue)
      ) {
        shouldInclude = false;
        break;
      }
    }
    if (shouldInclude) {
      out.push(data[j]);
    }
  }
  console.log("out", out);
  loadData(out);
}

document.getElementById("clear").addEventListener("click", () => {
  document.getElementById("search-input1").innerHTML = "";
  updateContainer();
});

function togglePopup() {
  if (document.getElementById("search-poup").style.visibility === "visible")
    document.getElementById("search-poup").style.visibility = "hidden";
  else document.getElementById("search-poup").style.visibility = "visible";
}
