// load the data from data.json and insert to the DOM
var arr = [];
function loadData(data) {
  let container = document.getElementById("container");
  let containerData = "";
  data.forEach((element) => {
    let skills = "";
    element.skills.forEach((data) => {
      skills += `<p><b>${data}</b></p>`;
      arr.push(data);
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

fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    loadData(json.jobs);
    let stringSkills = "";
    for (let i = 0; i < 5; i++) {
      stringSkills += `<div class="tech-skills" style="width:90%; padding:8px; border-radius: 8px; height:10px; background-color: white; z-index: 10;">${arr[i]}</div> <hr/>`;
    }
    document.getElementById("search-poup").innerHTML = stringSkills;
    let skills = document.getElementsByClassName("tech-skills");
    Array.from(skills).forEach((element) => {
      element.addEventListener("click", (e) => {
        console.log();
        document.getElementById(
          "search-input1"
        ).innerHTML += `<div class="tech-stack-input">
              <p><b>${e.target.innerHTML}<button style="height:100%">X</button></b></p>
              
            </div>`;

        if (
          document.getElementById("search-poup").style.visibility === "visible"
        )
          document.getElementById("search-poup").style.visibility = "hidden";
        else
          document.getElementById("search-poup").style.visibility = "visible";

        // loadData(data);
      });
    });
  });
