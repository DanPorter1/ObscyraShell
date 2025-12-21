// POWERSHELL
const sections = document.querySelectorAll(".psection");

sections.forEach(sec => {
    sec.querySelector(".psection-head").addEventListener("click", () => {
        sections.forEach(s => s !== sec && s.classList.remove("open"));
        sec.classList.toggle("open");
    });
});
