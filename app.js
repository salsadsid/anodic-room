

const spinner = toggle => {
    document.getElementById('spinner').style.display = toggle;
}

// fetch data from openapi.programming-hero.com
spinner("none");
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
    // console.log(phones.data)
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

    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    console.log(url)
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
                    <p class="card-text">Release Date: ${phoneDetails.data.releaseDate}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
    `
    detailInfo.appendChild(div);

}