const loadIphone = async () => {
    const url = 'https://openapi.programming-hero.com/api/phones?search=iphone';
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
                    <button class="btn btn-primary w-full">Buy Now</button>
                </div>
            </div>
        `;
        mobileCard.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', loadIphone);