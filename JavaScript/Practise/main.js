const container = document.querySelector(".main");
const ctryContainer = document.querySelector(".ctryDisplay");
const searchInput = document.querySelector(".searchInput");


//Step-4: (Create each contry card) Displaying a specific clicked country
const addCtry = async (data) => {
  container.style.display = "none";
  document.querySelector(".searchInput").style.display="none";
  document.querySelector(".logo").style.display="none";
  const ctryData = await data;
  console.log(ctryData);
  const { common, nativeName, official } = data[0].name;
  const ctryFlag = data[0].flags.png;
  const ctryLanguages = Object.values(data[0].languages).join(",");
  const cntryArea = data[0].area;
  const ctryContinent = data[0].continents.join(" , ");
  const ctryPopulation = data[0].population;
  const ctryMaplink = data[0].maps.googleMaps;
  const ctryCapital = Object.values(data[0].capital).join(" ,");
  const ctryRegion = data[0].region;
  const ctryLagLog = data[0].latlng;
  const ctryCodes = data[0].car;
  console.log(ctryCodes);
  let ctryBorders = "No shared borders";
  if (data[0].hasOwnProperty("borders")) {
    ctryBorders = Object.values(data[0]?.borders).join(",");
  }
  ctryContainer.innerHTML = `
  <div class="container-1"  style="margin: 20px; ">
  <div class="" style="width: 400px; height: 400px;">
      <h2 style="margin-bottom:25px">Names</h2>
      <table class="table table-sm " style=" font-weight:500;background-color: rgba(255, 255, 255, 0.6);">
          </thead>
          <tbody>
              <tr>
                  <th scope="row">Comman Name</th>
                  <td>${common}</td>
              </tr>
          </tbody>
          <tbody>
              <tr>
                  <th scope="row">Native Name</th>
                  <td>${Object.values(nativeName)[0].official}</td>
              </tr>
          </tbody>
          <tbody>
              <tr>
                  <th scope="row">Official Name</th>
                  <td>${official}</td>
              </tr>
          </tbody>
          <tbody>
          <tr>
              <th scope="row">Languages Used</th>
              <td>${ctryLanguages}</td>
            
          </tr>
      </tbody>
      </table>
  </div>

  <div class="" style="width: 400px; height: 400px;">
      <h2 style="margin-bottom:25px">Codes</h2>
      <table class="table table-sm" style=" font-weight:500;background-color: rgba(255, 255, 255, 0.6);">
          </thead>
          <tbody>
              <tr>
                  <th scope="row">ISO 3166-1 alpha-2</th>
                  <td>${data[0].cca2}</td>
              </tr>
          </tbody>
          <tbody>
              <tr>
                  <th scope="row">ISO 3166-1 alpha-3</th>
                  <td>${data[0].cca3}</td>
              </tr>
          </tbody>
          <tbody>
              <tr>
                  <th scope="row">Calling code</th>
                  <td>${
                    data[0].ccn3.charAt(0).toUpperCase() + data[0].ccn3.slice(1)
                  }</td>
              </tr>
          </tbody>
          <tbody>
          <tr>
              <th scope="row">Week Start</th>
              <td>${data[0].startOfWeek}</td>
            
          </tr>
      </tbody>
      </table>
  </div>
  
</div>
<div class="container-2"  style="margin: 20px;">
<div class="" style="width: 400px; height: 400px; margin-top=-50%">
<h2 style="margin-bottom:25px">Geography</h2>
<table class="table table-sm" style=" font-weight:500;background-color: rgba(255, 255, 255, 0.6);">
    <tbody>
        <tr>
            <th scope="row">Continent</th>
            <td>${ctryContinent}</td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <th scope="row">Map Link</th>
            <td> <a href="${ctryMaplink}">${ctryMaplink}</a></td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <th scope="row">Capital </th>
            <td>${ctryCapital}</td>
        </tr>
    </tbody>
    <tbody>
    <tr>
        <th scope="row">Border Country</th>
        <td>${ctryBorders}</td>
    </tr>
</tbody>
<tbody>
    <tr>
        <th scope="row">Lat & Log </th>
        <td>${ctryLagLog}</td>
    </tr>
</tbody>
<tbody>
<tr>
    <th scope="row">Population</th>
    <td>${ctryPopulation}</td>
</tr>
</tbody>
<tbody>
<tr>
    <th scope="row">Contry Region</th>
    <td>${ctryRegion}</td>
</tr>
</tbody>
<tbody>
<tr>
<th scope="row">Contry Area</th>
<td>${cntryArea}  km²</td>

</tr>
</tbody>

</table>
<button type="button" style="margin-left: 30%; margin-top: 30px; width:150px" class="btn btn-secondary reload">Back</button>
</div>

</div>
<div class="imageDiv" style="width: 400px; height: 300px; margin-top: 100px;">
  <img src="${ctryFlag}" alt="" style="width: 400px; height: 300px;">
  <h3  style="display: flex; justify-content: center; align-items: center; background-color: rgba(255, 255, 255, 0.6) ">${official}</h3>
</div>
  `;

  const reload = ctryContainer.querySelector(".reload");
  reload.addEventListener("click", () => {
    location.reload();
  });
};


//Calling api when we click on each card 
const individualCountry = async (name) => {
  const cntyResponse = await fetch(
    `https://restcountries.com/v3.1/name/${name}`
  );
  const cityJson = await cntyResponse.json();
  addCtry(cityJson);
};


//Step -3:(Followed by step two adding cards)Each Card
const formCard = (name, currencies, flags, population, languages) => {
  const nameOfContry = name.official;
  const spokenLanguage = Object.values(languages).join(" , ");
  const currency = Object.values(currencies)[0].name;
  const currencySymbol = Object.values(currencies)[0].symbol;
  const flag = flags.png;
  const card = document.createElement("div");
  card.classList.add("card","col-md-9");

  card.innerHTML = `
    <div class="card-item" >
  <img src="${flag}" class="card-img-top" style="height:150px" alt="contryFlag">
  <div class="card-body">
    <h5 class="card-title">${nameOfContry}</h5>
    <p class="card-text">Commonly used languages  in ${name.common} is ${spokenLanguage}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Currency Name: ${currency} </li>
    <li class="list-group-item">Currency Symbol : ${currencySymbol}</li>
    <li class="list-group-item">Population : ${population}</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link"><button type="button" class="btn btn-primary">More About this country  . . .</button> </a>
  </div>
</div>
    `;
  const btn = card.querySelector("button");
  btn.addEventListener("click", () => {
    individualCountry(nameOfContry);
  });

  container.appendChild(card);
};


//2.Step -2: Api fetch
const fetchApi = async () => {
  try{
    const response = await fetch("https://restcountries.com/v3.1/all");
    const json = await response.json();
    return json;
  }
  catch(e)
  {
    container.textContent=e;
  }
};

//Step - 1 :Api Call
const fetchData = async () => {
  const data = await fetchApi();
  data.map((element, index) => {
    const { name, currencies, flags, population, languages } = element;
    formCard(name, currencies, flags, population, languages);
  });
};

//Step - 0: Execution Starts
fetchData();
//Search Functionality
searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();
   const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const cardTitle = card
      .querySelector(".card-title")
      .textContent.toLowerCase();
    if (searchText === "" || cardTitle.includes(searchText)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});