const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const iva = (x) => x * 0.21;
const multiplicacion = (a,b) => a*b; 

// Productos // 

class Producto {
    constructor (info) {
        this.nombre = info.nombre; 
        this.precio = info.precio;
        this.imagen = info.imagen; 
        this.cantidad = info.cantidad; 
        this.class = info.class
    }
}

const producto1 = new Producto({
    imagen: "../media/Laptop.png",
    nombre: "computadora",
    precio: 100,
    cantidad: 1,
    class: "producto1",
})

const producto2 = new Producto({
    imagen: "../media/Television.jpg",
    nombre: "television",
    precio: 50,
    cantidad: 1,
    class: "producto2"
})

const producto3 = new Producto({
    imagen: "../media/celular.jpg",
    nombre: "celular",
    precio: 40,
    cantidad: 1,
    class: "producto3",
})

const producto4 = new Producto({
    imagen: "../media/ps5.jpg",
    nombre: "consola",
    precio: 100,
    cantidad: 1,
    class: "producto4",
})

// Array de Productos // 

const productos = []; 
let carrito = []

productos.push(producto1)
productos.push(producto2)
productos.push(producto3)
productos.push(producto4)

// HTML //

let divMain = document.getElementById("main");

productos.forEach((item, index) => {
    let divProductos = document.createElement("div");
    divProductos.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}">
    <p>Nombre: ${item.nombre} </p>
    $${item.precio}
    <button class="boton">Agregar al carrito </button>
    `
    divProductos.className = `${item.class}` 

    divMain.append(divProductos);

    // Botones // 

    let botones = divProductos.querySelectorAll(".boton");

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const productoSeleccionado = productos[index];
            carrito.push(productoSeleccionado);

            localStorage.setItem('carrito', JSON.stringify(carrito))

            actualizarCarritoHTML();
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


    

