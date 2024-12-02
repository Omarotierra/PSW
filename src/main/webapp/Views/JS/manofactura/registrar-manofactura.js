document.getElementById('factura-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    
    const factura = {
        nombre: nombre,
        cantidad: cantidad,
        precio: precio,
        total: cantidad * precio
    };

    
    document.getElementById('json-output').textContent = JSON.stringify(factura, null, 2);
});
