// the extension for git commit didn't work.
//lin2.tlu.ee redirects me to  https://www.tlu.ee
// Function to fetch random book title
async function fetchRandomBook() {
    const url = 'https://hapi-books.p.rapidapi.com/search/the+walking+dead';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5209bdecd9msh126f5e9c3490516p131c73jsn7fc32ea205f3',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Parsing response as JSON
        const books = data.results.map(book => book.title).filter(title => title); // Extracting and filtering titles
        const randomBook = books[Math.floor(Math.random() * books.length)]; // Selecting a random title
        return randomBook || 'No Book Title Available';
    } catch (error) {
        console.error('Error fetching book data:', error);
        return 'No Book Title Available';
    }
}

// Function to fetch random radio station
async function fetchRandomRadioStation() {
    const url = 'https://radio-world-75-000-worldwide-fm-radio-stations.p.rapidapi.com/search_radio.php?keyword=hello&limit=10&page=1&order=ASC';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5209bdecd9msh126f5e9c3490516p131c73jsn7fc32ea205f3',
            'X-RapidAPI-Host': 'radio-world-75-000-worldwide-fm-radio-stations.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Parsing response as JSON
        const stations = data.result.map(station => station.name).filter(name => name); // Extracting and filtering station names
        const randomStation = stations[Math.floor(Math.random() * stations.length)]; // Selecting a random station
        return randomStation || 'No Radio Station Available';
    } catch (error) {
        console.error('Error fetching radio station data:', error);
        return 'No Radio Station Available';
    }
}




/*// Function to fetch random book title. the url is a searching it is not random
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
}*/





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
