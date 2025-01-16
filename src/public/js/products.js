// const socketClient = io();

// const productTableBody = document.getElementById("productTableBody");

// function showProducts(products) {
//   productTableBody.innerHTML = "";

//   const productRows = products
//     .map((product) => {
//       return ` 
//         <div class="group relative"> 
//           <img src="${product.photo}" alt="${product.name}" class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"> 
//           <div class="mt-4 flex justify-between"> 
//             <div>
//               <h3 class="text-sm text-gray-700"> 
//                 <a href="#"> <span aria-hidden="true" class="absolute inset-0"></span> 
//                 ${product.name} 
//                 </a> 
//               </h3>
//             </div>
//             <p class="text-sm font-medium text-gray-900">$${product.price}</p> 
//           </div> 
//         </div> 
//         `;
//     })
//     .join("");

//   productTableBody.innerHTML = productRows;
// }
// // Escuchar el evento 'productList' para actualizar la tabla
// socketClient.on("productList", (products) => {
//   showProducts(products);
// });


const socketClient = io();

const productTableBody = document.getElementById("productTableBody");

function showProducts(products) {
  productTableBody.innerHTML = "";

  const productRows = products
    .map((product) => {
      return ` 
        <div class="group relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"> 
          <img src="${product.photo}" alt="${product.name}" class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"> 
          <div class="mt-4 flex justify-between"> 
            <div>
              <h3 class="text-sm text-gray-700"> 
                <a href="#"> <span aria-hidden="true" class="absolute inset-0"></span> 
                ${product.name} 
                </a> 
              </h3>
            </div>
            <p class="text-sm font-medium text-gray-900">$${product.price}</p> 
          </div> 
        </div> 
        `;
    })
    .join("");

  productTableBody.innerHTML = `<div class="flex flex-wrap -m-2">${productRows}</div>`;
}

// Escuchar el evento 'productList' para actualizar la tabla
socketClient.on("productList", (products) => {
  showProducts(products);
});
