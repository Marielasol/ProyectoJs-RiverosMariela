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

if (localStorage.getItem("carrito")) {
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

    localStorage.setItem("carrito", JSON.stringify(carrito));
}
console.log(carrito)

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");


verCarrito.addEventListener("click", () => {
    contenedorCarrito.style.display = "";
    contenedorCarrito.innerHTML = "";
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class=modal-header-title>Carrito</h1>

   `;
    contenedorCarrito.append(modalHeader)

    const modalbutton = document.createElement("button")
    modalbutton.innerText = "X";

    modalbutton.addEventListener("click", () => {
        contenedorCarrito.style.display = "none";

    })

    modalHeader.append(modalbutton);

    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = "";
        carritoContent.innerHTML = `
        <div>
        <img src="${producto.img}" class= "imgCarrito">
        <p>${producto.nombre}</p>
        </div>
        <p>$ ${producto.precio}</p>
        <div>
        <p>${producto.cantidad}</p>
        <button class="botonSumaResta" id= "agregarUnidad"> ➕</button><button class= "botonSumaResta">➖ </button>
        </div>
        `;

        contenedorCarrito.append(carritoContent)
    });

    const total = carrito.reduce((acc, el) => acc + el.precio, 0)
    const totalCompra = document.createElement("div");
    totalCompra.className = "total"
    totalCompra.innerHTML = `Total a pagar: $ ${total}`;
    contenedorCarrito.append(totalCompra)
})
const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    Swal.fire("Esta seguro que desea eliminar los productos?")
    eliminarTodoElCarrito();

})

const eliminarTodoElCarrito = () => {
    carrito = [];
    carritoContent();

    localStorage.clear();
}
const finalizarCompra = document.getElementById("finalizarCompra")
finalizarCompra.addEventListener("click", () => {
    swal.fire("¡Gracias por su compra!")
})