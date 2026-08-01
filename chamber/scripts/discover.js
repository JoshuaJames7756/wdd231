// scripts/discover.js
import discoverItems from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Navigation Menu Control (idéntico al resto del sitio) ---
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            if (navMenu.classList.contains("open")) {
                menuToggle.innerHTML = "&#10005;";
                menuToggle.setAttribute("aria-label", "Close navigation menu");
            } else {
                menuToggle.innerHTML = "&#9776;";
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
        const formattedDate = modificationDate.toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });
        lastModifiedSpan.textContent = `Last Update: ${formattedDate}`;
    }

    // --- 3. Render the 8 discover cards, one per named grid area ---
    const gridContainer = document.querySelector("#discover-grid");
    const areaNames = ["a", "b", "c", "d", "e", "f", "g", "h"];

    if (gridContainer) {
        discoverItems.forEach((item, index) => {
            const card = document.createElement("section");
            card.className = "discover-card";
            card.style.gridArea = areaNames[index];

            card.innerHTML = `
                <figure>
                    <img src="images/${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
                </figure>
                <h2>${item.name}</h2>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button type="button" class="learn-more-btn">Learn More</button>
            `;

            gridContainer.appendChild(card);
        });
    }

    // --- 4. Last visit message via localStorage ---
    displayVisitMessage();
});

function displayVisitMessage() {
    const visitMessageEl = document.querySelector("#visit-message");
    if (!visitMessageEl) return;

    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    let message;

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysBetween = Math.floor((now - Number(lastVisit)) / millisecondsPerDay);

        if (daysBetween < 1) {
            message = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysBetween} days ago.`;
        }
    }

    visitMessageEl.textContent = message;
    localStorage.setItem("lastVisit", String(now));
}