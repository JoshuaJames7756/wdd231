const membersUrl = "data/members.json";

async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
        
        const members = await response.json();
        
        // 1. Filtrar miembros Gold (3) y Silver (2)
        const eligibleMembers = members.filter(member => 
            member.membershipLevel === "Gold" || member.membershipLevel === "Silver" ||
            member.membershipLevel === 3 || member.membershipLevel === 2
        );

        // 2. Seleccionar aleatoriamente entre 2 y 3 miembros
        const selectedMembers = getRandomMembers(eligibleMembers, 3);

        // 3. Renderizar en el HTML
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error("Error cargando los spotlights:", error);
    }
}

// Función auxiliar para desordenar el array y obtener 'n' elementos
function getRandomMembers(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

function displaySpotlights(membersList) {
    const spotlightContainer = document.getElementById("spotlights-container");
    spotlightContainer.innerHTML = ""; // Limpiar

    membersList.forEach(member => {
        const card = document.createElement("section");
        card.className = "spotlight-card";
        
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="Logo de ${member.name}">
            <p><strong>Teléfono:</strong> ${member.phone}</p>
            <p><strong>Dirección:</strong> ${member.address}</p>
            <a href="${member.website}" target="_blank">Visitar Sitio Web</a>
            <span class="badge ${member.membershipLevel.toLowerCase()}">${member.membershipLevel} Member</span>
        `;
        
        spotlightContainer.appendChild(card);
    });
}

loadSpotlights();