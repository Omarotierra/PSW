document.getElementById('factura-form').addEventListener('submit', function(event) {
    event.preventDefault();  

    
    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    
    const table = document.getElementById('factura-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow(table.rows.length);

    
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    
    cell1.textContent = nombre;
    cell2.textContent = cantidad;
    cell3.textContent = precio;
    cell4.textContent = cantidad * precio; 

  
    document.getElementById('factura-form').reset();
});
