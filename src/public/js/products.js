const socketClient = io();

const productTableBody = document.getElementById("productTableBody");

function showProducts(products) {
  productTableBody.innerHTML = '';

  const productRows = products.map((product) => {
    return `
        <tr>
        <td class="px-4 py-2 border-b">${product.name}</td>
        <td class="px-4 py-2 border-b">${product.price}</td>
        <td class="px-4 py-2 border-b">${product.stock}</td>
        <td class="px-4 py-2 border-b">${product.category}</td>
      </tr>
    `;
  }).join('');

  productTableBody.innerHTML = productRows;
}
// Escuchar el evento 'productList' para actualizar la tabla
socketClient.on('productList', (products) => {
    showProducts(products);
});