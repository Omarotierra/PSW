document.addEventListener('DOMContentLoaded', function() { 
    const basePath = window.location.hostname === 'localhost:8080' 
        ? '/PSW'  // En entorno local
        : '/PSW-1.0-SNAPSHOT'; // En entorno de producción

    const navbarHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">METASOFT</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="${basePath}/Views/Principal/Principal.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${basePath}/Views/Venta/Piezas.html">Piezas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${basePath}/Views/Venta/Producto.html">Producto</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${basePath}/Views/RRHH/Prestaciones.html">Prestaciones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${basePath}/Views/RRHH/EmpleadoPrestacion.html">Empleado Prestaciones</a>
                    </li>
                </ul>
            </div>
        </nav>
    `;
    document.getElementById('navbar').innerHTML = navbarHTML;
});
