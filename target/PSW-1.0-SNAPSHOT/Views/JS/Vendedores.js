document.addEventListener("DOMContentLoaded", async () => {
  const apiUrl = "/api/vendedores";
  const puestosApi = "/api/puestos";

  const tableBody = document.getElementById("vendedoresTableBody");
  const searchInput = document.getElementById("buscar");
  const searchButton = document.getElementById("buscarBtn");

  const modalTitle = document.getElementById("modalTitle");
  const modalForm = document.getElementById("vendedorForm");
  const modalClave = document.getElementById("modalClave");
  const modalNombre = document.getElementById("modalNombre");
  const modalDireccion = document.getElementById("modalDireccion");
  const modalTelefono = document.getElementById("modalTelefono");
  const modalSalario = document.getElementById("modalSalario");
  const modalPuesto = document.getElementById("modalPuesto");
  const saveButton = document.getElementById("saveButton");

  let currentVendedorId = null;

  async function cargarVendedores(query = "") {
    try {
      const response = await fetch(`${apiUrl}?search=${query}`);
      const vendedores = await response.json();
      tableBody.innerHTML = "";

      vendedores.forEach((vendedor, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${vendedor.nombre}</td>
                    <td>${vendedor.direccion}</td>
                    <td>${vendedor.telefono}</td>
                    <td>${vendedor.salario}</td>
                    <td>${vendedor.puesto.nombre}</td>
                    <td>
                        <button class="btn btn-sm btn-primary edit-btn" data-id="${
                          vendedor.id
                        }">Editar</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-id="${
                          vendedor.id
                        }">Eliminar</button>
                    </td>
                `;
        tableBody.appendChild(row);
      });

      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", (e) =>
          abrirModalEditar(e.target.dataset.id)
        );
      });
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) =>
          eliminarVendedor(e.target.dataset.id)
        );
      });
    } catch (error) {
      console.error("Error al cargar los vendedores:", error);
    }
  }

  async function cargarPuestos() {
    try {
      const response = await fetch(puestosApi);
      const puestos = await response.json();
      modalPuesto.innerHTML = "";
      puestos.forEach((puesto) => {
        const option = document.createElement("option");
        option.value = puesto.id;
        option.textContent = puesto.nombre;
        modalPuesto.appendChild(option);
      });
    } catch (error) {
      console.error("Error al cargar los puestos:", error);
    }
  }

  document.getElementById("addButton").addEventListener("click", () => {
    modalTitle.textContent = "Agregar Vendedor";
    modalForm.reset();
    modalClave.disabled = true;
    cargarClave();
    cargarPuestos();
    currentVendedorId = null;
    $("#modalVendedor").modal("show");
  });

  async function abrirModalEditar(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const vendedor = await response.json();

      modalTitle.textContent = "Editar Vendedor";
      modalClave.value = vendedor.clave;
      modalNombre.value = vendedor.nombre;
      modalDireccion.value = vendedor.direccion;
      modalTelefono.value = vendedor.telefono;
      modalSalario.value = vendedor.salario;
      currentVendedorId = id;

      cargarPuestos().then(() => {
        modalPuesto.value = vendedor.puestoId;
      });

      $("#modalVendedor").modal("show");
    } catch (error) {
      console.error("Error al cargar datos del vendedor:", error);
    }
  }

  saveButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const vendedorData = {
      nombre: modalNombre.value,
      direccion: modalDireccion.value,
      telefono: modalTelefono.value,
      salario: modalSalario.value,
      puestoId: modalPuesto.value,
    };

    const method = currentVendedorId ? "PUT" : "POST";
    const url = currentVendedorId ? `${apiUrl}/${currentVendedorId}` : apiUrl;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendedorData),
      });

      if (response.ok) {
        alert(currentVendedorId ? "Vendedor actualizado" : "Vendedor agregado");
        $("#modalVendedor").modal("hide");
        cargarVendedores();
      } else {
        alert("Error al guardar los datos");
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  });

  async function eliminarVendedor(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este vendedor?")) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Vendedor eliminado");
        cargarVendedores();
      } else {
        alert("Error al eliminar el vendedor");
      }
    } catch (error) {
      console.error("Error al eliminar el vendedor:", error);
    }
  }

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    cargarVendedores(query);
  });

  async function cargarClave() {
    try {
      const response = await fetch(`${apiUrl}/clave`);
      const { clave } = await response.json();
      modalClave.value = clave;
    } catch (error) {
      console.error("Error al cargar la clave:", error);
    }
  }

  cargarVendedores();
});
