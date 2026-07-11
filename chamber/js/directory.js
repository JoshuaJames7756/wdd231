// --- Responsive Menu Control ---
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    if (navMenu.classList.contains("open")) {
        menuToggle.textContent = "❌";
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});

// --- Data Fetching & Directory Display ---
const jsonURL = "data/members.json";
const container = document.querySelector("#directory-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
    try {
        const response = await fetch(jsonURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        container.innerHTML = `<p class="error">Unable to load directory data at this time.</p>`;
    }
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.className = "member-card";

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="100">
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p class="website"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <p class="membership-level">Level: ${getMembershipName(member.level)}</p>
        `;
        container.appendChild(card);
    });
}

function getMembershipName(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Regular Member";
}

// --- View Layout Toggle Listeners ---
gridButton.addEventListener("click", () => {
    container.classList.add("grid-layout");
    container.classList.remove("list-layout");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    container.classList.add("list-layout");
    container.classList.remove("grid-layout");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

// --- Footer Automatic Elements ---
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

// Initialize execution
getMembers();