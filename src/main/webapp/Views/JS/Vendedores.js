document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = '/api/vendedores';
    const puestosApi = '/api/puestos';
    const vendedorId = new URLSearchParams(window.location.search).get('id');

    const tableBody = document.getElementById('vendedoresTableBody');
    const searchInput = document.getElementById('buscar');
    const searchButton = document.getElementById('buscarBtn');
    const claveInput = document.getElementById('clave');
    const puestoSelect = document.getElementById('puesto');
    const form = document.getElementById('updateForm');


    async function cargarVendedor() {
        try {
            const vendedorResponse = await fetch(`${apiUrl}/${vendedorId}`);
            const vendedor = await vendedorResponse.json();

            document.getElementById('clave').value = vendedor.clave;
            document.getElementById('nombre').value = vendedor.nombre;
            document.getElementById('direccion').value = vendedor.direccion;
            document.getElementById('telefono').value = vendedor.telefono;
            document.getElementById('salario').value = vendedor.salario;


            const puestosResponse = await fetch(puestosApi);
            const puestos = await puestosResponse.json();
            puestos.forEach(puesto => {
                const option = document.createElement('option');
                option.value = puesto.id;
                option.textContent = puesto.nombre;
                if (puesto.id === vendedor.puestoId) {
                    option.selected = true;
                }
                puestoSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar datos del vendedor:', error);
        }
    }


    async function cargarVendedores(query = '') {
        try {
            const response = await fetch(`${apiUrl}?search=${query}`);
            const vendedores = await response.json();
            tableBody.innerHTML = '';

            vendedores.forEach((vendedor, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${vendedor.nombre}</td>
                    <td>${vendedor.direccion}</td>
                    <td>${vendedor.telefono}</td>
                    <td>${vendedor.salario}</td>
                    <td>${vendedor.puesto.nombre}</td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar los vendedores:', error);
        }
    }


    if (vendedorId) {
        await cargarVendedor();
    }


    await cargarVendedores();


    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        await cargarVendedores(query);
    });


    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const updatedData = {
            clave: document.getElementById('clave').value,
            nombre: document.getElementById('nombre').value,
            direccion: document.getElementById('direccion').value,
            telefono: document.getElementById('telefono').value,
            salario: document.getElementById('salario').value,
            puestoId: document.getElementById('puesto').value,
        };

        try {
            const response = await fetch(`${apiUrl}/${vendedorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                alert('Vendedor actualizado correctamente');
                window.location.href = '/PSW/Views/HTML/Venta/Vendedor/TablaVendedor.html';
            } else {
                alert('Error al actualizar el vendedor');
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    });


    const API_CLAVE_URL = `${apiUrl}/clave`;
    try {
        const claveResponse = await fetch(API_CLAVE_URL);
        if (!claveResponse.ok) throw new Error('Error al obtener la clave.');
        const claveData = await claveResponse.json();
        claveInput.value = claveData.clave;
    } catch (error) {
        console.error('Error cargando clave:', error);
        claveInput.value = 'Error al cargar clave';
    }
});
