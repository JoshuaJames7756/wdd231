// --- scripts/thankyou.js ---

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

    // --- 3. Display submitted form data from query string ---
    const params = new URLSearchParams(window.location.search);

    const fields = {
        "first-name": "out-first-name",
        "last-name": "out-last-name",
        "email": "out-email",
        "phone": "out-phone",
        "org-name": "out-org-name",
    };

    for (const [param, elementId] of Object.entries(fields)) {
        const el = document.querySelector(`#${elementId}`);
        if (el) el.textContent = params.get(param) || "—";
    }

    const rawTimestamp = params.get("timestamp");
    const timestampEl = document.querySelector("#out-timestamp");
    if (timestampEl) {
        timestampEl.textContent = rawTimestamp
            ? new Date(rawTimestamp).toLocaleString()
            : "—";
    }
});