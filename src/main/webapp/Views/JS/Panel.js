document.addEventListener('DOMContentLoaded', () => {
    const hamBurger = document.querySelector(".toggle-btn");
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const mainContent = document.querySelector(".main");


    hamBurger.addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("expand");
    });


    sidebarLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const url = link.getAttribute("data-url");
            loadContent(url);
        });
    });


    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                mainContent.innerHTML = html;
            })
            .catch(error => {
                mainContent.innerHTML = `<h1 class="text-center text-danger">Error al cargar el contenido</h1>
                                         <p class="text-center">${error.message}</p>`;
                console.error(error);
            });
    }


    loadContent("../../Views/HTML/Principal/Principal.html");
});
