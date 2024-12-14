document.addEventListener('DOMContentLoaded', function() {
    let basePath = '/PSW';

    if (window.location.hostname === 'localhost' && window.location.port === '8080') {
        if (window.location.pathname.includes('/PSW')) {
            basePath = '/PSW'; 
        } else {
            basePath = '/PSW-1.0-SNAPSHOT'; 
        }
    } else {
        const pathParts = window.location.pathname.split('/');
        basePath = `/${pathParts[1] || ''}`;
    }

    // Generación del contenido del navbar
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
