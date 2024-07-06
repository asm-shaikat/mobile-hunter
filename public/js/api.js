const loadIphone = async (searchText = 'iphone') => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    try {
        const res = await fetch(url);
        const result = await res.json();
        displayData(result.data);
    } catch (error) {
        console.error("Failed to load data", error);
    }
}

const displayData = (phones) => {
    const mobileCard = document.getElementById('mobile-card');
    mobileCard.textContent = '';
    if (phones.length === 0) {
        mobileCard.innerHTML = '<p class="text-gray-600">No results found</p>';
        return;
    }
    
    phones.forEach(phone => {
        const card = document.createElement('div');
        card.className = 'card bg-white rounded-lg shadow-lg overflow-hidden w-72';
        card.innerHTML = `
            <figure class="h-auto overflow-hidden">
                <img src="${phone.image}" alt="${phone.phone_name}" class="w-full object-cover" />
            </figure>
            <div class="p-4">
                <h2 class="text-lg font-semibold">${phone.phone_name}</h2>
                <p class="mt-2 text-gray-600">${phone.brand}</p>
                <div class="mt-4">
                    <button class="btn btn-primary w-full m-1" onclick="showPopup('${phone.slug}')">Details</button>
                    <button class="btn btn-primary w-full m-1">Buy Now</button>
                </div>
            </div>
        `;
        mobileCard.appendChild(card);
    });
    // Hide loading screen and show content
    document.getElementById('loading-section').style.display = 'none';
    document.getElementById('content-section').style.display = 'block';
}

function search(){
    const searchText = document.getElementById('search').value.trim();
    if (searchText === '') {
        loadIphone();
    } else {
        loadIphone(searchText);
    }
     // Show loading screen and hide content
     document.getElementById('loading-section').style.display = 'flex';
     document.getElementById('content-section').style.display = 'none';
}

function showPopup(slug){
    mobileDetails.showModal();
    showDetails(slug);
}
 const showDetails = async (slug) =>{
    const details = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const result = await details.json();
    const res = result.data;
    console.log(res);
    const content = document.getElementById('mobileDetails');
    content.innerHTML = `
    <div class="modal-box">
              <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <img src="${res.image}" alt="${res.phone_name}" class="w-32 object-cover" />
              <h3 class="text-lg font-bold">Name: ${res.name}</h3>
              <p>Chipset: ${res.mainFeatures.chipSet?res.mainFeatures.chipSet:"Not Available"}</p>
              <p>Display Size: ${res.mainFeatures.displaySize?res.mainFeatures.displaySize:"Not Available"}</p>
              <p class="py-4">Press ESC key or click on ✕ button to close</p>
            </div>
    `
 }
document.addEventListener('DOMContentLoaded', () => {
    loadIphone(); 
});