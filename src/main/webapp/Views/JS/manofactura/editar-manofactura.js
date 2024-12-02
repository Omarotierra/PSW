
const invoices = [
    { invoiceNumber: '001', invoiceDate: '2024-10-01', customerName: 'Juan Pérez', totalAmount: 100 },
    { invoiceNumber: '002', invoiceDate: '2024-10-02', customerName: 'María López', totalAmount: 150 }
];

document.addEventListener('DOMContentLoaded', () => {
   
    loadInvoices();

    
    document.getElementById('editInvoiceForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const invoiceNumber = document.getElementById('invoiceNumber').value;
        const invoiceDate = document.getElementById('invoiceDate').value;
        const customerName = document.getElementById('customerName').value;
        const totalAmount = document.getElementById('totalAmount').value;

        const newInvoice = {
            invoiceNumber,
            invoiceDate,
            customerName,
            totalAmount: parseFloat(totalAmount)
        };

       
        invoices.push(newInvoice);
        loadInvoices(); 

       
        document.getElementById('editInvoiceForm').reset();
    });
});


function loadInvoices() {
    const tableBody = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; 

    invoices.forEach(invoice => {
        const row = tableBody.insertRow();

        row.innerHTML = `
            <td>${invoice.invoiceNumber}</td>
            <td>${invoice.invoiceDate}</td>
            <td>${invoice.customerName}</td>
            <td>${invoice.totalAmount}</td>
            <td><button onclick="editInvoice('${invoice.invoiceNumber}')">Editar</button><button onclick="deleteInvoice('${invoice.invoiceNumber}')">Eliminar</button></td>
        `;
    });
}


function deleteInvoice(invoiceNumber) {
    const index = invoices.findIndex(invoice => invoice.invoiceNumber === invoiceNumber);
    if (index !== -1) {
        invoices.splice(index, 1);
        loadInvoices(); 
    }
}


function editInvoice(invoiceNumber) {
    const invoice = invoices.find(invoice => invoice.invoiceNumber === invoiceNumber);
    if (invoice) {
        document.getElementById('invoiceNumber').value = invoice.invoiceNumber;
        document.getElementById('invoiceDate').value = invoice.invoiceDate;
        document.getElementById('customerName').value = invoice.customerName;
        document.getElementById('totalAmount').value = invoice.totalAmount;
    }
}
