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
                    <!-- Principal -->
                    <li class="nav-item">
                        <a class="nav-link" href="${basePath}/Views/Principal/Principal.html">Inicio</a>
                    </li>

                    <!-- Manufactura -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="manufacturaDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Manufactura
                        </a>
                        <div class="dropdown-menu" aria-labelledby="manufacturaDropdown">
                            <a class="dropdown-item" href="${basePath}/Views/Manufactura/Manufactura.html">Manufactura</a>
                            <a class="dropdown-item" href="${basePath}/Views/Manufactura/Proveedor.html">Proveedor</a>
                            <a class="dropdown-item" href="${basePath}/Views/Manufactura/ProveedorMaterial.html">Proveedor-Material</a>
                        </div>
                    </li>

                    <!-- Material -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="materialDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Material
                        </a>
                        <div class="dropdown-menu" aria-labelledby="materialDropdown">
                            <a class="dropdown-item" href="${basePath}/Views/Material/Materiales.html">Materiales</a>
                        </div>
                    </li>

                    <!-- RRHH -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="rrhhDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Recursos Humanos
                        </a>
                        <div class="dropdown-menu" aria-labelledby="rrhhDropdown">
                            <a class="dropdown-item" href="${basePath}/Views/RRHH/EmpleadoPrestacion.html">Empleado Prestaciones</a>
                            <a class="dropdown-item" href="${basePath}/Views/RRHH/Prestaciones.html">Prestaciones</a>
                        </div>
                    </li>

                    <!-- Venta -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="ventaDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Venta
                        </a>
                        <div class="dropdown-menu" aria-labelledby="ventaDropdown">
                            <a class="dropdown-item" href="${basePath}/Views/Venta/Piezas.html">Piezas</a>
                            <a class="dropdown-item" href="${basePath}/Views/Venta/Productos.html">Productos</a>
                            <a class="dropdown-item" href="${basePath}/Views/Venta/Clientes.html">Clientes</a>
                            <a class="dropdown-item" href="${basePath}/Views/Venta/Vendedores.html">Vendedores</a>
                            <a class="dropdown-item" href="${basePath}/Views/Venta/Ventas.html">Ventas</a>
                        </div>
                    </li>

                    <!-- Obrero -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="obreroDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Obrero
                        </a>
                        <div class="dropdown-menu" aria-labelledby="obreroDropdown">
                            <a class="dropdown-item" href="${basePath}/Views/Obrero/Asistencias.html">Asistencias</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    `;
    document.getElementById('navbar').innerHTML = navbarHTML;
});
