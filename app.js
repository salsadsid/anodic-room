

const spinner = toggle => {
    document.getElementById('spinner').style.display = toggle;
}
spinner("none");
// fetch data from openapi.programming-hero.com
const loadPhone = async () => {
    const searchText = document.getElementById('searchText').value;
    const notFound = document.getElementById('not-found');
    notFound.textContent = ""
    if (searchText == "") {
        const h3 = document.createElement('h3');
        h3.innerText = "Please Enter Phone Name";
        h3.classList.add('text-center');
        h3.classList.add('mt-4');
        notFound.appendChild(h3);
    }
    else {
        spinner("block");
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        try {
            const res = await fetch(url);
            const data = await res.json();
            searchPhone(data);
        }
        catch (error) {
            displayErrorMessage(error)
        }
    }

}
const displayErrorMessage = (error) => {
    spinner("none");
    const notFound = document.getElementById('not-found');
    const h3 = document.createElement('h3');
    h3.innerText = error;
    h3.classList.add('text-center');
    h3.classList.add('mt-4');
    notFound.appendChild(h3);

}

// Show results in bootstrap cards

const searchPhone = phones => {

    const container = document.getElementById('phone-container');
    const notFound = document.getElementById('not-found');
    notFound.innerText = "";
    container.textContent = "";
    // console.log(phones)
    if (phones.status == false) {
        const h3 = document.createElement('h3');
        h3.innerText = "Search result not found";
        h3.classList.add('text-center');
        h3.classList.add('mt-4');
        notFound.appendChild(h3);
        spinner("none");
    }
    else {
        spinner("none");
        phones.data.forEach(phone => {

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                    <div class="card">
                        <img src="${phone.image}" class="card-img-top"class="w-50">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">Brand: ${phone.brand}</p>
                            <button class="btn btn-primary" onclick="LoadDetails('${phone.slug}')">Explore</button>
                        </div>
                    </div>
            `
            container.appendChild(div);

        })
    }
}

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

const exploreMore = async (phoneDetails) => {
    console.log(phoneDetails)
    const detailInfo = document.getElementById('details');
    detailInfo.textContent = "";
    const div = document.createElement('div');

    div.classList.add('card');
    div.classList.add('mx-auto');
    div.innerHTML = `
            <div class="card mx-auto">
                <img src="${phoneDetails.data.image}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Release Date: ${phoneDetails.data.releaseDate ? phoneDetails.data.releaseDate : "Release Date Not Found"}</p>
                    <table class="table table-bordered border-primary">
                        <thead>
                            <tr>
                                <th scope="col">Main Features</th>
                                <th scope="col">Others</th>
                                <th scope="col">Sensors</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row"><span class="fw-bold">Chipset:</span> ${phoneDetails.data.mainFeatures.chipSet}</td>
                                <td><span class="fw-bold">WLAN:</span> ${phoneDetails.data.others?.WLAN ? phoneDetails.data.others.WLAN : "No Information"}</td>
                                <td>Otto</td>
                                
                            </tr>
                            <tr>
                                <td scope="row"><span class="fw-bold">Display Size:</span>  ${phoneDetails.data.mainFeatures.displaySize}</td>
                                <td><span class="fw-bold">Bluetooth:</span> ${phoneDetails.data.others?.Bluetooth ? phoneDetails.data.others?.Bluetooth : "No Information"}</td>
                                <td>Thornton</td>
                               
                            </tr>
                            <tr>
                                <td scope="row"><span class="fw-bold">Storage:</span>  ${phoneDetails.data.mainFeatures.storage}</td>
                                <td><span class="fw-bold">GPS:</span> ${phoneDetails.data.others?.GPS ? phoneDetails.data.others?.GPS : "No Information"}</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <td scope="row"><span class="fw-bold">Memory</span>  ${phoneDetails.data.mainFeatures.memory}</td>
                                <td><span class="fw-bold">USB:</span> ${phoneDetails.data.others?.USB ? phoneDetails.data.others?.USB : "No Information"}</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <td scope="row"><span class="fw-bold">Memory</span>  ${phoneDetails.data.mainFeatures.memory}</td>
                                <td><span class="fw-bold">NFC:</span> ${phoneDetails.data.others?.NFC ? phoneDetails.data.others?.NFC : "No Information"}</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <td scope="row"><span class="fw-bold">Memory</span>  ${phoneDetails.data.mainFeatures.memory}</td>
                                <td><span class="fw-bold">Radio:</span> ${phoneDetails.data.others?.Radio ? phoneDetails.data.others?.Radio : "No Information"}</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    `
    detailInfo.appendChild(div);

}