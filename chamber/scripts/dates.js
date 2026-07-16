// scripts/dates.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Año actual dinámico
    const currentYearElement = document.getElementById("current-year");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // 2. Última modificación del archivo
    const lastModifiedElement = document.getElementById("last-modified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
});