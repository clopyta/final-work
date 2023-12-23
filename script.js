// the extension for git commit didn't work.
//lin2.tlu.ee redirects me to  https://www.tlu.ee
// Function to fetch random book title
async function fetchRandomBook() {
    const url = 'http://openlibrary.org/search.json?q=the+walking+dead';

    try {
        const response = await fetch(url);
        const data = await response.json();
        // Extract the title from the API response or handle accordingly
        const bookTitle = data.docs[0]?.title || 'Unknown Book Title';
        return bookTitle;
    } catch (error) {
        console.error('Error fetching book data:', error);
        return 'Unknown Book Title';
    }
}

// Function to fetch random radio station
async function fetchRandomRadioStation() {
    const url = ' http://www.radio-browser.info/webservice/json/stations/bykeyword?keyword=hello';

    try {
        const response = await fetch(url);
        const data = await response.json();
        // Extract the radio station title from the API response or handle accordingly
        const radioStation = data.results[0]?.stationname || 'Unknown Radio Station';
        return radioStation;
    } catch (error) {
        console.error('Error fetching radio station data:', error);
        return 'Unknown Radio Station';
    }
}



// to display items
function displayItems(containerClass, items, itemType) {
    const container = document.querySelector(containerClass);
    container.innerHTML = '';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        // Random image selection. from item type
        let images;
        if (itemType === 'music') {
            images = ['music 1.jpeg', 'music 2.jpeg', 'music 3.jpeg']; // Music images
        } else if (itemType === 'books') {
            images = ['book 1.jpeg', 'book 2.jpeg']; // Book images
        }
        const randomImage = images[Math.floor(Math.random() * images.length)];

        const img = document.createElement('img');
        img.src = `images/${randomImage}`;
        img.alt = item.title;

        const title = document.createElement('h3');
        title.textContent = item.title;

        const description = document.createElement('p');
        description.textContent = item.description;

        itemDiv.appendChild(img);
        itemDiv.appendChild(title);
        itemDiv.appendChild(description);

        container.appendChild(itemDiv);
    });
}


// Function for random selection on button click
async function handleRandomSelection() {
    const randomBook = await fetchRandomBook();
    const randomRadioStation = await fetchRandomRadioStation();

    displayItems('.books-container', [{ title: randomBook, description: 'Random Book Description' }], 'books');
    displayItems('.music-container', [{ title: randomRadioStation, description: 'Random Radio Station' }], 'music');
}

// Event listener for button click
const randomButton = document.getElementById('randomButton');
randomButton.addEventListener('click', handleRandomSelection);

// Form and other existing functions remain unchanged
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Hide the form
        form.style.display = 'none';

        // Display the "Thank you" message
        thankYouMessage.style.display = 'block';
    });
});
