const membersUrl = "data/members.json";

async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Unable to load members data");

        const members = await response.json();

        // 1. Filter Gold (3) and Silver (2) members — mismo esquema numérico que directory.js
        const eligibleMembers = members.filter(
            (member) => member.level === 3 || member.level === 2
        );

        // 2. Randomly select between 2 and 3 members on each render
        const count = Math.random() < 0.5 ? 2 : 3;
        const selectedMembers = getRandomMembers(eligibleMembers, count);

        // 3. Render to the DOM
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error("Error loading spotlights:", error);
        const container = document.querySelector("#spotlights-container");
        if (container) {
            container.innerHTML = `<p class="error">Unable to load member spotlights at this time.</p>`;
        }
    }
}

// Auxiliary function to shuffle and pick 'n' elements
function getRandomMembers(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

function getMembershipName(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Regular";
}

function displaySpotlights(membersList) {
    const spotlightContainer = document.querySelector("#spotlights-container");
    if (!spotlightContainer) return;
    spotlightContainer.innerHTML = "";

    membersList.forEach((member) => {
        const levelName = getMembershipName(member.level);
        const badgeClass = levelName.toLowerCase();

        const card = document.createElement("section");
        card.className = "spotlight-card";

        card.innerHTML = `
            <span class="badge ${badgeClass}">${levelName}</span>
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;

        spotlightContainer.appendChild(card);
    });
}

loadSpotlights();