const API_URL = 'http://localhost:8081/asistencias'; // Cambia la URL según tu API

// Cargar datos de la API
async function loadAsistencia() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Limpiar la tabla antes de llenarla
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        // Poblar la tabla con datos de la API
        data.forEach(asistencia => {
            const row = document.createElement('tr');
            row.onclick = () => selectRow(asistencia.clave, row);
            row.className = 'table-row';
            row.innerHTML = `
                <th scope="row">${asistencia.clave}</th>
                <td>${asistencia.claveEmpleado}</td>
                <td>${asistencia.fecha}</td>
                <td>${asistencia.hora}</td>
                <td>${asistencia.tipo}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Guardar nueva asistencia en la API
async function saveNewAsistencia() {
    const claveEmpleado = document.getElementById('addClaveEmpleado').value;
    const fecha = document.getElementById('addFecha').value;
    const hora = document.getElementById('addHora').value;
    const tipo = document.getElementById('addTipo').value || 'Entrada'; // Valor predeterminado si está vacío

    const nuevaAsistencia = {
        claveEmpleado,
        fecha,
        hora,
        tipo
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaAsistencia)
        });

        if (response.ok) {
            loadAsistencia(); // Recargar la tabla
            $('#addModal').modal('hide');
            document.getElementById('addClaveEmpleado').value = '';
            document.getElementById('addFecha').value = '';
            document.getElementById('addHora').value = '';
            document.getElementById('addTipo').value = '';
        } else {
            console.error('Error al guardar la asistencia');
        }
    } catch (error) {
        console.error('Error al guardar la asistencia:', error);
    }
}

// Editar asistencia existente
async function saveChanges() {
    const clave = document.getElementById('clave').value;
    const claveEmpleado = document.getElementById('claveEmpleado').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const tipo = document.getElementById('tipo').value || 'Entrada';

    const asistenciaActualizada = {
        claveEmpleado,
        fecha,
        hora,
        tipo
    };

    try {
        const response = await fetch(`${API_URL}/${clave}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistenciaActualizada)
        });

        if (response.ok) {
            loadAsistencia(); // Recargar la tabla
            $('#editModal').modal('hide');
        } else {
            console.error('Error al actualizar la asistencia');
        }
    } catch (error) {
        console.error('Error al actualizar la asistencia:', error);
    }
}

// Eliminar asistencia
async function confirmDelete() {
    if (!selectedClave) return;

    try {
        const response = await fetch(`${API_URL}/${selectedClave}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadAsistencia(); // Recargar la tabla
            $('#deleteConfirmModal').modal('hide');
            selectedClave = null;
            document.querySelector('.btn-editar').disabled = true;
            document.querySelector('.btn-eliminar').disabled = true;
        } else {
            console.error('Error al eliminar la asistencia');
        }
    } catch (error) {
        console.error('Error al eliminar la asistencia:', error);
    }
}

// Llamar al cargar datos al inicio
document.addEventListener('DOMContentLoaded', loadAsistencia);
