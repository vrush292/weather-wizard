const apiKey = 'eb10c803a85d139345232ced9053b823'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the entire response to see its structure
            if (data.main && data.weather) { // Check if main and weather exist
                locationElement.textContent = data.name;
                const temperature = Math.round(data.main.temp); // Get the temperature
                temperatureElement.textContent = `${temperature}°C`;
                descriptionElement.textContent = data.weather[0].description;

                // Change background based on weather conditions and temperature
                changeBackground(temperature, data.weather[0].main);
            } else {
                throw new Error('Weather data not available');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Error: ' + error.message; // Display error message
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
        });
}

function changeBackground(temperature, weatherCondition) {
    const body = document.body;
    let imageUrl; // Declare the imageUrl variable

    // First, check the weather condition
    switch (weatherCondition.toLowerCase()) {
        case 'rain':
            imageUrl = 'rain.jpg'; // Rainy weather image
            break;
        case 'snow':
            imageUrl = 'snowfall.jpg'; // Snowy weather image
            break;
        case 'thunderstorm':
            imageUrl = 'thunder.jpg'; // Thunderstorm image
            break;
        default:
            // If no specific weather condition matches, check temperature
            if (temperature < 0) {
                imageUrl = 'snow.jpg'; // Cold weather image
            } else if (temperature >= 0 && temperature < 10) {
                imageUrl = 'cloudy.jpg'; // Cool weather image
            } else if (temperature >= 10 && temperature < 20) {
                imageUrl = 'cool.jpg'; // Mild weather image
            } else if (temperature >= 20) {
                imageUrl = 'sunny.jpg'; // Warm weather image
            } else {
                imageUrl = 'background.jpg'; // Default background image
            }
            break;
    }

    // Set the background image
    body.style.backgroundImage = `url('${imageUrl}')`;
    
    // Additional styles for the body
    body.style.backgroundSize = 'cover'; // Cover the entire body
    body.style.backgroundPosition = 'center'; // Center the background image
    body.style.transition = 'background-image 0.5s ease'; // Smooth transition for background change
}