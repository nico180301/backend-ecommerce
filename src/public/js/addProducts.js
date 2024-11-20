const socketClient = io();

const formAdd = document.getElementById('productFormAdd');
const formDel = document.getElementById('productFormDel');

const prodName = document.getElementById('name');
const prodCategory = document.getElementById('category');
const prodStock = document.getElementById('stock');
const prodPrice = document.getElementById('price');

const prodIdToDelete = document.getElementById('productId');

const productTableBody = document.getElementById("productTableBody");


/* Añadir un producto */
// Captura todos los value de los inputs y emite un producto al servidor
formAdd.onsubmit = (e) => {
  e.preventDefault();

  const name = prodName.value;
  const price = prodPrice.value;
  const stock = prodStock.value;
  const category = prodCategory.value;

  socketClient.emit('newProd', { name, price, stock, category });
// Alerta de éxito al agregar un producto
Swal.fire({
  icon: 'success',
  title: '¡Producto agregado!',
  text: `El producto ${name} ha sido agregado exitosamente.`,
});

formAdd.reset();
};

/* Eliminar un producto */
// Captura el iD del producto a eliminar
formDel.onsubmit = (e) => {
  e.preventDefault();

  const productId = prodIdToDelete.value;

  socketClient.emit('deleteProd', { id: productId });
  // Alerta de éxito al eliminar un producto
  Swal.fire({
    icon: 'warning',
    title: '¡Producto eliminado!',
    text: `El producto con ID ${productId} ha sido eliminado.`,
  });

  formDel.reset();
}

// Escucha el emit del servidor con el nuevo producto y lo agrega a la tabla
socketClient.on('productList', (products) => {

  productTableBody.innerHTML = '';

  products.forEach(product => {
      const row = document.createElement('tr');

      // Crea las celdas de la tabla con la información del producto
      row.innerHTML = `
          <tr>
          <td class="px-4 py-2 border-b">${product.id}</td>
          <td class="px-4 py-2 border-b">${product.name}</td>
          <td class="px-4 py-2 border-b">$${product.price}</td>
          <td class="px-4 py-2 border-b">${product.stock}</td>
          <td class="px-4 py-2 border-b">${product.category}</td>
          </tr>
      `;

      productTableBody.appendChild(row);
  });
});