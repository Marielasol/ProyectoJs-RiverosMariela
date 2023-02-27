class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}
const cremaDiaPielJoven = new Producto(1, "Crema con Vitamina C", 2500, "img/cremavitc.jpg");
const ContornoOjos = new Producto(2, "Contorno de Ojos", 2000, "img/contornodeojos.jpg");
const aguaMicelar = new Producto(3, "Agua Micelar", 2300, "img/aguamicelarpieljoven.jpg");
const gelExfoliante = new Producto(4, "Gel Exfoliante para piel mixta", 2800, "img/gelexfoliantepieljoven.jpg");
const cremadiaPielMadura = new Producto(5, "Crema de dia para piel madura", 3200, "img/cremadediaantiage.jpg");
const cremaNochePïelMadura = new Producto(6, "Crema de noche para piel Madura", 3900, "img/cremadenocheantiage.jpg");
const contornoPielMadura = new Producto(7, "Contorno de ojos para pieles maduras", 3100, "img/contornodeojospielmadura.jpg");
const serumPielMadura = new Producto(8, "Serum para pieles maduras", 4100, "img/serumpielmadura.png");
const gelLimpiezaHombre = new Producto(9, "Gel de limpieza para hombre", 2100, "img/gellimpiezahombre.jpg");
const emulsionHombre = new Producto(10, "Emulsion hidratante para hombre", 2500, "img/emulsionantioxidantehombre.jpg");
const cremaHombre = new Producto(11, "Crema nutritiva para hombre", 3100, "img/cremanutritivahombre.jpg");
const mascaraCarbon = new Producto(12, "Mascara con carbon Detoxify", 1600, "img/mascaracarbon.jpg");

const productos = [cremaDiaPielJoven, ContornoOjos, aguaMicelar, gelExfoliante, cremadiaPielMadura, cremaNochePïelMadura, contornoPielMadura, serumPielMadura, gelLimpiezaHombre, emulsionHombre, cremaHombre, mascaraCarbon];
console.log(productos);

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
            <div>
                <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}"
                <div>
                    <h5>${producto.nombre} </h5>
                    <p> ${producto.precio} </p>
                    <button class = "btn colorBTN" id= "boton${producto.id}"> Agregar al carrito </button>
                </div>
        
            </div>`

        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })

}
mostrarProductos();

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    calcularTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
            <div class="card">
                <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}"
                <div>
                    <h5>${producto.nombre} </h5>
                    <p> ${producto.precio} </p>
                    <p> ${producto.cantidad} </p>
                    <button class = "btn colorBotonC" id= "eliminar${producto.id}"> Eliminar </button>
                    <button class = "btn colorBTNC" id="finalizarCompra"> Finalizar Compra </button>
                </div>
        
            </div>`
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`)
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);

        })

    })
    calcularTotal()
}
const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1)
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const total = document.getElementById("total");

const calcularTotal =() => {
    let totalCompra = 0
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;

    })
    total.innerHTML = `Total: $${totalCompra}`;
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}
