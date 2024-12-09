document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">METASOFT</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/PSW/Views/Principal/Principal.html">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contact.html">Empleado</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/PSW/Views/Venta/TablaPiezas.html">Pieza</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" /PSW/Views/Venta/TablaProducto.html">Producto</a>
          </li>
          <li>
            <a class="nav-link" href="/PSW-1.0-SNAPSHOT/Views/Venta/Clientes.html">Clientes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/PSW-1.0-SNAPSHOT/Views/RRHH/Prestaciones.html">Prestaciones</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/PSW-1.0-SNAPSHOT/Views/RRHH/EmpleadoPrestacion.html">EmpleadoPrestaciones</a>
          </li>
          <li>
            <a class="nav-link" href="/PSW-1.0-SNAPSHOT/Views/Venta/Vendedores.html">Vendedores</a>
          </li>
        </ul>
      </div>
    </nav>
  `;
  document.getElementById("navbar").innerHTML = navbarHTML;
});
