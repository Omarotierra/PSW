document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "/api/clientes";
  const tableBody = document.getElementById("clientesTableBody");
  const searchInput = document.getElementById("buscar");
  const searchButton = document.getElementById("buscarBtn");

  const modalTitle = document.getElementById("modalTitle");
  const modalNombre = document.getElementById("modalNombre");
  const modalRFC = document.getElementById("modalRFC");
  const modalDireccion = document.getElementById("modalDireccion");
  const saveButton = document.getElementById("saveButton");

  let currentClienteId = null;

  async function cargarClientes(query = "") {
    const response = await fetch(`${apiUrl}?search=${query}`);
    const clientes = await response.json();
    tableBody.innerHTML = "";
    clientes.forEach((cliente, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${cliente.nombre}</td>
                <td>${cliente.rfc}</td>
                <td>${cliente.direccion}</td>
                <td>
                    <button class="btn btn-sm btn-primary edit-btn" data-id="${
                      cliente.id
                    }">Editar</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${
                      cliente.id
                    }">Eliminar</button>
                </td>
            `;
      tableBody.appendChild(row);
    });

    document
      .querySelectorAll(".edit-btn")
      .forEach((btn) =>
        btn.addEventListener("click", (e) =>
          abrirModalEditar(e.target.dataset.id)
        )
      );
    document
      .querySelectorAll(".delete-btn")
      .forEach((btn) =>
        btn.addEventListener("click", (e) =>
          eliminarCliente(e.target.dataset.id)
        )
      );
  }

  document.getElementById("addButton").addEventListener("click", () => {
    modalTitle.textContent = "Agregar Cliente";
    modalNombre.value = "";
    modalRFC.value = "";
    modalDireccion.value = "";
    currentClienteId = null;
    $("#modalCliente").modal("show");
  });

  async function abrirModalEditar(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const cliente = await response.json();
    modalTitle.textContent = "Editar Cliente";
    modalNombre.value = cliente.nombre;
    modalRFC.value = cliente.rfc;
    modalDireccion.value = cliente.direccion;
    currentClienteId = id;
    $("#modalCliente").modal("show");
  }

  saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = {
      nombre: modalNombre.value,
      rfc: modalRFC.value,
      direccion: modalDireccion.value,
    };
    const method = currentClienteId ? "PUT" : "POST";
    const url = currentClienteId ? `${apiUrl}/${currentClienteId}` : apiUrl;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Operación realizada con éxito");
      $("#modalCliente").modal("hide");
      cargarClientes();
    } else {
      alert("Error al realizar la operación");
    }
  });

  async function eliminarCliente(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Cliente eliminado");
        cargarClientes();
      } else {
        alert("Error al eliminar el cliente");
      }
    }
  }

  searchButton.addEventListener("click", () =>
    cargarClientes(searchInput.value.trim())
  );

  cargarClientes();
});
