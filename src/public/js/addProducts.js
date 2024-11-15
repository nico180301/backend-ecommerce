const socketClient = io();

const productDetails = document.getElementById("productDetails");
const btn = document.getElementById("send");

let addproducts = null;

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  Swal.fire({
    title: "Producto agregado!",
    text: "El producto se ha agregado correctamente.",
    icon: "success",
    confirmButtonText: "Cerrar",
  }).then((result) => {
    addproducts = result.value;
    socketClient.emit("addProduct", addproducts);
  });
});

// Escuchar el emit del servidor con la lista de productos y actualizar la tabla
socketClient.on("product", (products) => {
  productDetails.innerHTML = "";
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = ` <td>${product.id}</td> <td>${product.name}</td> <td>${product.category}</td> <td>$${product.price}</td> <td>${product.stock}</td> `;
    productDetails.appendChild(row);
  });
});
