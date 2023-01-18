
// Spinner 

const spinner = toggle => {
    document.getElementById('spinner').style.display = toggle;
}
spinner("none");

// Display Error Message

const errorMessage = (displayText) => {
    const notFound = document.getElementById('not-found');
    const h3 = document.createElement('h3');
    h3.classList.add('text-center');
    h3.classList.add('mt-4');
    if (displayText === "no-entry") {
        h3.innerText = "Please Enter Phone Name";
    }
    else if (displayText === "no-result") {
        h3.innerText = "Search result not found";
    }
    else {
        h3.innerText = displayText;
    }
    notFound.appendChild(h3);
}

// fetch data from openapi.programming-hero.com

const loadPhone = async () => {
    const searchText = document.getElementById('searchText').value;
    const notFound = document.getElementById('not-found');
    const container = document.getElementById('phone-container');
    const detailInfo = document.getElementById('details');
    notFound.textContent = "";


    if (searchText == "") {
        errorMessage("no-entry");
        container.textContent = "";
        detailInfo.textContent = "";
    }
    else {
        spinner("block");
        fetchPhone(searchText)
    }

}

const fetchPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        searchPhone(data);
    }
    catch (error) {
        spinner("none");
        const errorText = error.toString();
        errorMessage(errorText);
    }
}
fetchPhone("samsung");
// Show results in bootstrap cards

const searchPhone = phones => {

    const container = document.getElementById('phone-container');
    const notFound = document.getElementById('not-found');
    const detailInfo = document.getElementById('details');
    const twentyPhones = phones.data.slice(0, 20);
    notFound.textContent = "";
    container.textContent = "";
    if (phones.status == false) {
        spinner("none");
        detailInfo.textContent = "";
        errorMessage('no-result');
    }
    else {
        spinner("none");
        detailInfo.textContent = "";
        twentyPhones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                    <div class="card border shadow-lg">
                        <div class="d-flex justify-content-center">
                        <img src="${phone.image}"
                        class="card-img-top w-75 m-3">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">Brand: ${phone.brand}</p>

                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"onclick="LoadDetails('${phone.slug}')"> Explore
                            </button>
                        </div>
                    </div>
            `
            container.appendChild(div);

        })
    }
}

// load data for Phone Details 

const LoadDetails = async (id) => {

    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    // console.log(url)
    try {
        const res = await fetch(url);
        const data = await res.json();
        exploreMore(data);
    }
    catch (error) {
        displayErrorMessage(error)
    }
}

// Show Phone Details

const exploreMore = async (phoneDetails) => {
    // console.log(phoneDetails);
    const detailInfo = document.getElementById('details');
    detailInfo.textContent = "";
    const div = document.createElement('div');
    div.classList.add('mx-auto');
    div.innerHTML = `
    <div class="card mx-auto col-12 border border-primary border-3 shadow ">
      <div class="col-lg-4 mx-auto d-flex justify-content-center">
      <img src="${phoneDetails.data.image}" class="card-img-top mt-3">
      </div>
        <div class="card-body">
            <h5 class="card-title">${phoneDetails.data.name}</h5>
            <p class="card-text">Release Date: ${phoneDetails.data.releaseDate ? phoneDetails.data.releaseDate : "Not Available"}</p>
            <table class="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th scope="col">Main Features</th>
                        <th scope="col">Others Features</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row"><span class="fw-bold">Chipset: </span> ${phoneDetails.data.mainFeatures?.chipSet ? phoneDetails.data.mainFeatures?.chipSet : "No Information"}</td>
                        <td><span class="fw-bold">WLAN: </span> ${phoneDetails.data.others?.WLAN ? phoneDetails.data.others?.WLAN : "No Information"}</td>
                    </tr>
                    <tr>
                        <td scope="row"><span class="fw-bold">Display Size: </span>  ${phoneDetails.data.mainFeatures?.displaySize ? phoneDetails.data.mainFeatures?.displaySize : "No Information"}</td>
                        <td><span class="fw-bold">Bluetooth: </span> ${phoneDetails.data.others?.Bluetooth ? phoneDetails.data.others?.Bluetooth : "No Information"}</td>
                    </tr>
                    <tr>
                        <td scope="row"><span class="fw-bold">Storage: </span>  ${phoneDetails.data.mainFeatures?.storage ? phoneDetails.data.mainFeatures?.storage : "No information"}</td>
                        <td><span class="fw-bold">GPS: </span> ${phoneDetails.data.others?.GPS ? phoneDetails.data.others?.GPS : "No Information"}</td>
                    </tr>
                    <tr>
                        <td scope="row"><span class="fw-bold">Memory: </span>  ${phoneDetails.data.mainFeatures?.memory ? phoneDetails.data.mainFeatures?.memory : "No Information"}</td>
                        <td><span class="fw-bold">USB: </span> ${phoneDetails.data.others?.USB ? phoneDetails.data.others?.USB : "No Information"}</td>
                    </tr>
                    <tr>
                        <td scope="row"></td>
                        <td><span class="fw-bold">NFC: </span> ${phoneDetails.data.others?.NFC ? phoneDetails.data.others?.NFC : "No Information"}</td>
                    </tr>
                    <tr>
                        <td scope="row"></td>
                        <td><span class="fw-bold">Radio: </span> ${phoneDetails.data.others?.Radio ? phoneDetails.data.others?.Radio : "No Information"}</td>
                    </tr >
                </tbody >
            </table>
        <p><span class="fw-bold">Sensors: </span> ${phoneDetails.data.mainFeatures?.sensors.join(" || ") ? phoneDetails.data.mainFeatures?.sensors.join(" || ") : "No Information"}</p>
        </div >
    </div >
`
    detailInfo.appendChild(div);
}


