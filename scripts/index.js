// load the data from data.json and insert to the DOM

var arr = [];

fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    let container = document.getElementById("container");
    let containerData = "";

    json.jobs.forEach((element) => {
      let skills = "";
      element.skills.forEach((data) => {
        skills += `<p><b>${data}</b></p>`;
        arr.push(data);
        // console.log(data);
      });
      // console.log(arr);
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
    let stringSkills = "";
    for (let i = 0; i < 5; i++) {
      stringSkills += `<div style="width:90%; padding:8px; border-radius: 8px; height:10px; background-color: white; z-index: 10;">${arr[i]}</div> <hr/>`;
    }
    document.getElementById("search-poup").innerHTML = stringSkills;
    console.log(arr);
  });
