// URL base para la API de materiales
const apiUrl = 'http://localhost:8080/api/materiales';

// Obtener todos los materiales
function obtenerMateriales() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Materiales obtenidos:', data);
            // Aquí puedes procesar los datos, por ejemplo, mostrarlos en una tabla.
        })
        .catch(error => {
            console.error('Error al obtener los materiales:', error);
        });
}

// Obtener un material específico por su clave
function obtenerMaterial(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Material ${id} obtenido:`, data);
            // Aquí puedes mostrar la información del material obtenido.
        })
        .catch(error => {
            console.error(`Error al obtener el material con ID ${id}:`, error);
        });
}

// Crear un nuevo material
function crearMaterial(material) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(material),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Material creado:', data);
            // Aquí puedes actualizar la UI para reflejar el nuevo material.
        })
        .catch(error => {
            console.error('Error al crear el material:', error);
        });
}

// Actualizar un material existente
function actualizarMaterial(id, material) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(material),
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Material con ID ${id} actualizado:`, data);
            // Aquí puedes actualizar la UI para reflejar los cambios.
        })
        .catch(error => {
            console.error(`Error al actualizar el material con ID ${id}:`, error);
        });
}

// Eliminar un material
function eliminarMaterial(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Material con ID ${id} eliminado:`, data);
            // Aquí puedes actualizar la UI para eliminar el material de la lista.
        })
        .catch(error => {
            console.error(`Error al eliminar el material con ID ${id}:`, error);
        });
}

// Ejemplo de cómo llamar a las funciones:
obtenerMateriales(); // Obtener todos los materiales
obtenerMaterial(1); // Obtener el material con clave 1
crearMaterial({ clave: 104, nombre: 'Material Nuevo', existencia: 100, descripcion: 'Descripción de material nuevo', unidadMedida: 'kg', estado: true }); // Crear un material
actualizarMaterial(104, { nombre: 'Material Actualizado', existencia: 120, descripcion: 'Descripción actualizada', unidadMedida: 'm', estado: true }); // Actualizar un material
eliminarMaterial(104); // Eliminar el material con clave 104
