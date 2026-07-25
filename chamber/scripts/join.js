// --- scripts/join.js ---

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Responsive Menu Control (idéntico a directory.js) ---
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

    // --- 2. Footer Dynamic Elements (idéntico a directory.js) ---
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

    // --- 3. Timestamp hidden field ---
    const timestampField = document.querySelector("#timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // --- 4. Fallback de modales para navegadores sin soporte de command/commandfor ---
    const supportsCommand = "command" in HTMLButtonElement.prototype;

    if (!supportsCommand) {
        document.querySelectorAll(".modal-trigger").forEach((btn) => {
            btn.addEventListener("click", () => {
                const modal = document.getElementById(btn.getAttribute("commandfor"));
                if (modal) modal.showModal();
            });
        });

        document.querySelectorAll(".modal-close").forEach((btn) => {
            btn.addEventListener("click", () => {
                const modal = document.getElementById(btn.getAttribute("commandfor"));
                if (modal) modal.close();
            });
        });
    }
});