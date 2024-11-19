document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = '/api/clientes'; 
    const clienteId = new URLSearchParams(window.location.search).get('id');  

    const tableBody = document.getElementById('clientesTableBody'); 
    const searchInput = document.getElementById('buscar');
    const searchButton = document.getElementById('buscarBtn');
    const claveInput = document.getElementById('clave');
    const form = document.getElementById('updateForm') || document.getElementById('form-cliente');  

    
    async function cargarCliente() {
        try {
            const clienteResponse = await fetch(`${apiUrl}/${clienteId}`);
            const cliente = await clienteResponse.json();

            document.getElementById('clave').value = cliente.clave;
            document.getElementById('nombre').value = cliente.nombre;
            document.getElementById('rfc').value = cliente.rfc;
            document.getElementById('direccion').value = cliente.direccion;
            document.getElementById('telefono').value = cliente.telefono;
            document.getElementById('salario').value = cliente.salario || ''; 
        } catch (error) {
            console.error('Error al cargar datos del cliente:', error);
        }
    }

    
    async function cargarClientes(query = '') {
        try {
            const response = await fetch(`${apiUrl}?search=${query}`);
            const clientes = await response.json();
            tableBody.innerHTML = '';

            clientes.forEach((cliente, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.rfc}</td>
                    <td>${cliente.direccion}</td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        }
    }

    
    if (clienteId) {
        await cargarCliente();
    }

    
    await cargarClientes();

    
    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        await cargarClientes(query);
    });

    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const updatedData = {
            clave: document.getElementById('clave').value,
            nombre: document.getElementById('nombre').value,
            rfc: document.getElementById('rfc').value,
            direccion: document.getElementById('direccion').value,
            telefono: document.getElementById('telefono').value,
            salario: document.getElementById('salario').value,
        };

        try {
            const response = await fetch(`${apiUrl}/${clienteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                alert('Cliente actualizado correctamente');
                window.location.href = '/PSW/Views/Venta/Cliente/TablaCliente.html';  
            } else {
                alert('Error al actualizar el cliente');
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
