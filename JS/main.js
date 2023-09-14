const productos = [];
let carrito = [];

// HTML //
let divMain = document.getElementById("main");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    productos.push(...data);

    productos.forEach((item, index) => {
      let divProductos = document.createElement("div");
      divProductos.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}">
        <p>Nombre: ${item.nombre}</p>
        $${item.precio}
        <button class="boton">Agregar al carrito</button>
      `;
      divProductos.className = `${item.class}`;

      divMain.append(divProductos);

      // Botones //
      let botones = divProductos.querySelectorAll(".boton");

      botones.forEach((boton) => {
        boton.addEventListener("click", () => {
          const productoSeleccionado = productos[index];
          carrito.push(productoSeleccionado);

          localStorage.setItem('carrito', JSON.stringify(carrito));

          actualizarCarritoHTML();
        });
      });
    });
  });


// Carrito HTML // 

const actualizarCarritoHTML = () =>{
    const carritoLista = document.getElementById("carritoLista");
    
    carritoLista.innerHTML = "";

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));

    if (carritoGuardado && carritoGuardado.length > 0) {
        carritoGuardado.forEach((producto) => {
            const listaItem = document.createElement("li");
            listaItem.innerText = `${producto.nombre} - $${producto.precio}`;
            carritoLista.appendChild(listaItem);
        });
    } else {
        const listaItem = document.createElement("li");
        listaItem.innerText = "El carrito está vacío";
        carritoLista.appendChild(listaItem);
    }
}




// total // 
const totalHTML = document.getElementById("total");
let total = 0;

for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio;
}

totalHTML.textContent = `$${total}`;



actualizarCarritoHTML();



const limpiarCarrito = () => {
    carrito = [];
    localStorage.removeItem('carrito'); 
    actualizarCarritoHTML(); 
    swal("Carrito Vaciado", "")
}

const botonLimpiarCarrito = document.getElementById("limpiarCarrito");
botonLimpiarCarrito.addEventListener("click", limpiarCarrito);


let botonFinalizarCompra = document.getElementById("botonFinalizarCompra");

botonFinalizarCompra.addEventListener("click", () => {
    swal("Compra Finalizada!", "","success");
})


    

// por alguna razon no me funciona el servidor local del .json y por ende no estoy pudiendo traer los datos a la pagina // 
// me salto este error: 
// " Access to fetch at 'file:///D:/Programacion/Programacion/PROYECTOS/Pre%20Entregas/JavaScript/ProyectoFinal-Lopez/data.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.  "
// en teoria hice todos los procedimientos de forma correcta pero no logro solucionar el error // 
// busque una solucion, involucrando cambiar aspectos de seguridad de chrome, pero no se si funcione para cualquiera que acceda a la pagina o solo para mi dispositivo // 