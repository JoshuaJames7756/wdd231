// scripts/weather-spot.js

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Navigation Menu Control ---
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            if (navMenu.classList.contains("open")) {
                menuToggle.textContent = "X"; // Solución: X de texto elegante en lugar de la equis roja emoji
                menuToggle.classList.add("open"); // Permite aplicar los estilos de rotación y color del CSS
                menuToggle.setAttribute("aria-label", "Close navigation menu");
            } else {
                menuToggle.textContent = "☰";
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            }
        });
    }

    // --- 2. Footer Dynamic Elements ---
    const yearSpan = document.querySelector("#current-year");
    const lastModifiedSpan = document.querySelector("#last-modified");

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        const modificationDate = new Date(document.lastModified);
        const formattedDate = modificationDate.toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        lastModifiedSpan.textContent = `Last Update: ${formattedDate}`;
    }

    // --- 3. Weather Fetching (Cochabamba) ---
    const apiKey = "73a6837ff124bd4776e4b0995430f8bf";
    const lat = "-17.3895";
    const lon = "-66.1568";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function fetchWeather() {
        try {
            // Fetch Current Weather
            const responseWeather = await fetch(weatherUrl);
            if (responseWeather.ok) {
                const currentData = await responseWeather.json();
                displayCurrentWeather(currentData);
            }

            // Fetch Forecast
            const responseForecast = await fetch(forecastUrl);
            if (responseForecast.ok) {
                const forecastData = await responseForecast.json();
                displayForecast(forecastData);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    function displayCurrentWeather(data) {
        const tempElement = document.getElementById("current-temp");
        const descElement = document.getElementById("weather-desc");
        if (tempElement && descElement) {
            tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
            // Capitalizar la descripción del clima
            const description = data.weather[0].description;
            descElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
        }
    }

    function displayForecast(data) {
        const forecastContainer = document.getElementById("forecast-container");
        if (!forecastContainer) return;

        forecastContainer.innerHTML = "";
        
        // Filtrar lecturas diarias del mediodía (12:00:00) para obtener 3 días consecutivos
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        dailyData.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            const temp = Math.round(day.main.temp);
            
            const forecastHTML = `
                <div class="forecast-day">
                    <span class="day-name">${dayName}</span>
                    <span class="day-temp"><strong>${temp}°C</strong></span>
                </div>
            `;
            forecastContainer.innerHTML += forecastHTML;
        });
    }

    // --- 4. Premium Spotlights (Gold/Silver Members) ---
    const membersUrl = "data/members.json";

    async function fetchSpotlights() {
        try {
            const response = await fetch(membersUrl);
            if (response.ok) {
                const members = await response.json();
                
                // Filtrar niveles Gold (3) y Silver (2)
                const premiumMembers = members.filter(member => member.level === 3 || member.level === 2);
                
                // Obtener entre 2 y 3 aleatorios
                const selectedMembers = getRandomMembers(premiumMembers, 3);
                
                displaySpotlights(selectedMembers);
            }
        } catch (error) {
            console.error("Error loading spotlights:", error);
        }
    }

    function getRandomMembers(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function displaySpotlights(members) {
        const spotlightsContainer = document.getElementById("spotlights-container");
        if (!spotlightsContainer) return;

        spotlightsContainer.innerHTML = "";

        members.forEach(member => {
            const card = document.createElement("div");
            card.className = "spotlight-card";
            
            const levelName = member.level === 3 ? "Gold" : "Silver";
            const levelClass = levelName.toLowerCase();

            card.innerHTML = `
                <span class="badge ${levelClass}">${levelName} Member</span>
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="75">
                <h3>${member.name}</h3>
                <p class="phone">📞 ${member.phone}</p>
                <p class="address">📍 ${member.address}</p>
                <p class="website"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            `;
            spotlightsContainer.appendChild(card);
        });
    }

    // Inicializar llamadas de la página de inicio
    fetchWeather();
    fetchSpotlights();
});