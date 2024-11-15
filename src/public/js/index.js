document.addEventListener("DOMContentLoaded", () => {
    const socketClient = io();
  
    const tableBody = document.getElementById('productTableBody');
  
    const showProducts = (products) => {
      tableBody.innerHTML = '';
  
      products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.name}</td>
          <td>$${product.price}</td>
          <td>${product.stock}</td>
          <td>${product.category}</td>
        `;
        row.className = "border-b bg-white";
        tableBody.appendChild(row);
      });
    };
  
    // Escuchar el evento 'updateProducts' para actualizar la tabla
    socketClient.on('updateProducts', (products) => {
      showProducts(products);
    });
  
    // Solicitar productos actuales al conectarse
    socketClient.emit('getProducts');
  });
  