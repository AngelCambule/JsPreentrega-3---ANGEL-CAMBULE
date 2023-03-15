//Objetos

class Usuario {
    constructor(user,pass){
        this.user = user;
        this.pass = pass;
    }
}

class Producto{
    constructor(nombre,precio,id){
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
        this.cantidad = 1;
    }
}

const acapulco = new Producto("Juego Acapulco", 13900, 1);
const asuncion = new Producto("Juego Asuncion", 14900, 2);
const capri = new Producto("Juego Capri", 14900, 3);
const doble = new Producto("Sillon Doble", 9500, 4);
const gervasoni = new Producto("Juego Gervasoni", 21900, 5);
const tulum = new Producto("Silla Tulum", 6000, 6);

//Arrays

const arrayUsuarios = [];
const arrayProductos = [acapulco,asuncion,capri,gervasoni,doble,tulum];
const arrayCarrito = [];

//Otros

const prodCarrito = document.getElementById("prodCarrito");
const navBar = document.getElementById("navBar");

//Registro

const btnRegistro = document.getElementById("btn-registro");

btnRegistro.addEventListener("click", (e) => {
    e.preventDefault();
    navBar.innerHTML = `<a href="index.html"><img src="img/logo.png" alt="Logo de deco_sillonesnya" class="nav__logo--img"></a>
                        <form id="formulario">
                            <label>Por favor registre sus datos a continuacion:</label>
                            <br>
                            <input type="text" id="usuario" placeholder="User">
                            <input type="text" id="password" placeholder="Password">
                            <button>Registrarse</button>
                        </form>`;
    registrarse();
})

function registrarse(){
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    if (usuario != "" && password != ""){
        let clienteNuevo = new Usuario (usuario, password);
        arrayUsuarios.push(clienteNuevo);
        localStorage.setItem("cliente", JSON.stringify(arrayUsuarios));
        console.log(`Se logueo el cliente : ${arrayUsuarios[0].user}`)
        innersLogueo();
    }else{
        navBar.innerHTML = `<a href="index.html"><img src="img/logo.png" alt="Logo de deco_sillonesnya" class="nav__logo--img"></a>
        <form id="formulario">
            <label>Por favor registre sus datos a continuacion:</label>
            <br>
            <input type="text" id="usuario" placeholder="User">
            <input type="text" id="password" placeholder="Password">
            <button>Registrarse</button><br>
            <label>Debes completar todos los campos!</label>
        </form>`;
        registrarse();
    }
})}

//Inners post-logueo

function innersLogueo(){
    agAcapulco.innerHTML = `<h3 id="ag-acapulco"><a href="#">AGREGAR AL CARRITO</a></h3>`;
    agAsuncion.innerHTML = `<h3 id="ag-asuncion"><a href="#">AGREGAR AL CARRITO</a></h3>`;
    agCapri.innerHTML = `<h3 id="ag-capri"><a href="#">AGREGAR AL CARRITO</a></h3>`;
    agDoble.innerHTML = `<h3 id="ag-doble"><a href="#">AGREGAR AL CARRITO</a></h3>`;
    agGervasoni.innerHTML = `<h3 id="ag-gervasoni"><a href="#">AGREGAR AL CARRITO</a></h3>`;
    agTulum.innerHTML = `<h3 id="ag-tulum"><a href="#">AGREGAR AL CARRITO</a></h3>`;

    navBar.innerHTML = `<a href="index.html"><img src="img/logo.png" alt="Logo de deco_sillonesnya" class="nav__logo--img"></a>
                        <h2>Bienvenido ${arrayUsuarios[0].user}!</h2>
                        <a class="btnSalir" id="btnSalir" href="#">Salir</a>`
    const btnSalir = document.getElementById("btnSalir");
    btnSalir.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        location.reload();
    })

}

//Carrito - Mostrar/Eliminar


function mostrarCarrito(){

    const totalCarrito = arrayCarrito.reduce((acumulador, arrayCarrito) => acumulador + (arrayCarrito.precio * arrayCarrito.cantidad), 0)
    const carritoRec = localStorage.getItem("carrito");
    const carritoObjeto = JSON.parse(carritoRec);
    if(arrayCarrito.length > 0){
        prodCarrito.innerHTML = `<span class="infoCarrito">Tu carrito:</span></h1>`;
    }else{
        prodCarrito.innerHTML = `<span class="infoCarrito">Tu carrito:</span></h1>
                                <p class="noProd">No hay productos en el carrito!</p>`;
    }

    carritoObjeto.forEach(Carrito => {
        const pCarrito = document.createElement("p");
        pCarrito.innerHTML = `<p class="productosCarrito">${Carrito.nombre} - $${Carrito.precio} c/u (${Carrito.cantidad}) | 
                                <button class="btnCarrito" id="btnEliminar${Carrito.id}">-</button> <button class="btnCarrito" id="btnSumar${Carrito.id}">+</button>
                                <button class="btnCarrito" id="btnEliminar${Carrito.id}todo">Eliminar</button><br></p>`
        prodCarrito.appendChild(pCarrito);

        const btnEliminar = document.getElementById(`btnEliminar${Carrito.id}`);
        btnEliminar.addEventListener("click", () => {
            eliminarProdcarrito(Carrito.id);
            mostrarCarrito();
        })

        const btnEliminartodo = document.getElementById(`btnEliminar${Carrito.id}todo`);
        btnEliminartodo.addEventListener("click", () => {
            eliminarProdcarritotodo(Carrito.id);
            mostrarCarrito();  
        })

        const btnSumar = document.getElementById(`btnSumar${Carrito.id}`);
        btnSumar.addEventListener("click", () => {
            sumarCarrito(Carrito.id);
            mostrarCarrito();  
        })

        localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
        })
        const totalinfoCarrito = document.createElement("p");
        totalinfoCarrito.innerHTML = `<p class="totalCarrito">Total : $${totalCarrito}</p>
                                        <button class="btnCarrito" id="btnComprar">Finalizar Compra</button>`
        prodCarrito.appendChild(totalinfoCarrito);
        
        const btnComprar = document.getElementById("btnComprar");
        btnComprar.addEventListener("click", () => {
            prodCarrito.innerHTML = `Gracias! Compraste : `;
                carritoObjeto.forEach(Carrito => {
                    const pCarrito = document.createElement("p");
                    pCarrito.innerHTML = `<p class="productosCarrito">${Carrito.nombre} - $${Carrito.precio} c/u (${Carrito.cantidad})`
                    prodCarrito.appendChild(pCarrito);
            })
            const totalinfoCarrito = document.createElement("p");
            totalinfoCarrito.innerHTML = `<p class="totalCarrito">Total : $${totalCarrito}</p>
                                        <button class="btnCarrito" id="btnPagar">Ir a Pagar</button>`
            prodCarrito.appendChild(totalinfoCarrito);
            
            const btnPagar = document.getElementById("btnPagar");
            btnPagar.addEventListener("click", () => {
                const hp = document.getElementById("modelo");
                const pex = document.getElementById("pex");
                pex.classList.remove("productosextra");
                hp.innerHTML = `<h2 class="prodCarrito">Podes abonar con mercadopago haciendo click <a href="https://www.mercadopago.com">ACA!</a></h2><br>
                                 <p class="totalCarritoend">Total : $${totalCarrito}</p>`;
                pex.innerHTML = ``
            })
        })
}

//Eliminar del Carrito

const eliminarProdcarrito = (id) => {
    const productoenCarrito = arrayCarrito.find(arrayProductos => arrayProductos.id === id);
    if(productoenCarrito.cantidad > 1) {
        productoenCarrito.cantidad--;
    }else{
        const prod = arrayCarrito.find(carrito => carrito.id === id);
        const index = arrayCarrito.indexOf(prod);
        arrayCarrito.splice(index,1);
    }
    mostrarCarrito();
}

const eliminarProdcarritotodo = (id) => {
    const productoenCarrito = arrayCarrito.find(arrayProductos => arrayProductos.id === id);

        productoenCarrito.cantidad = 1;
        const prod = arrayCarrito.find(carrito => carrito.id === id);
        const index = arrayCarrito.indexOf(prod);
        arrayCarrito.splice(index,1);
    
    mostrarCarrito();
}

//



//Botones para Agregar al Carrito

const agAcapulco = document.getElementById("ag-acapulco");
const agAsuncion = document.getElementById("ag-asuncion");
const agCapri = document.getElementById("ag-capri");
const agDoble = document.getElementById("ag-doble");
const agGervasoni = document.getElementById("ag-gervasoni");
const agTulum = document.getElementById("ag-tulum");

const sumarCarrito = (id) => {
    const productoenCarrito = arrayCarrito.find(arrayProductos => arrayProductos.id === id);
    productoenCarrito.cantidad++;
    mostrarCarrito();
}

agregarCarrito = (id) => {
    const productoenCarrito = arrayCarrito.find(arrayProductos => arrayProductos.id === id);
    if(productoenCarrito) {
        productoenCarrito.cantidad++;
    }else{
        const prodAdd = arrayProductos.find(arrayProductos => arrayProductos.id === id)
        arrayCarrito.push(prodAdd);
    }
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
    mostrarCarrito();

}
agAcapulco.addEventListener("click", (e) => {
    e.preventDefault();
    if(arrayUsuarios[0] !== undefined){
        console.log(`El usuario ${arrayUsuarios[0].user} agrego Juego Acapulco al carrito`);
        agregarCarrito(arrayProductos[0].id);
    }else{
        agAcapulco.innerHTML = `<p>Debes Registrarte para poder comprar!</p>`;
    }}
) 

agAsuncion.addEventListener("click", (e) => {
    e.preventDefault();
    if(arrayUsuarios[0] !== undefined){
        console.log(`El usuario ${arrayUsuarios[0].user} agrego Juego Asuncion al carrito`);
        agregarCarrito(arrayProductos[1].id);
    }else{
        agAsuncion.innerHTML = `<p>Debes Registrarte para poder comprar!</p>`;
    }}
) 

agCapri.addEventListener("click", (e) => {
    e.preventDefault();
    if(arrayUsuarios[0] !== undefined){
        console.log(`El usuario ${arrayUsuarios[0].user} agrego Juego Capri al carrito`);
        agregarCarrito(arrayProductos[2].id);
    }else{
        agCapri.innerHTML = `<p>Debes Registrarte para poder comprar!</p>`;
    }}
) 
    
agGervasoni.addEventListener("click", (e) => {
    e.preventDefault();
    if(arrayUsuarios[0] !== undefined){
        console.log(`El usuario ${arrayUsuarios[0].user} agrego Juego Gervasoni al carrito`);
        agregarCarrito(arrayProductos[3].id);
    }else{
        agGervasoni.innerHTML = `<p>Debes Registrarte para poder comprar!</p>`;
    }}
) 

agDoble.addEventListener("click", (e) => {
    e.preventDefault();
    if(arrayUsuarios[0] !== undefined){
        console.log(`El usuario ${arrayUsuarios[0].user} agrego Sillon Doble al carrito`);
        agregarCarrito(arrayProductos[4].id);
    }else{
        agDoble.innerHTML = `<p>Debes Registrarte para poder comprar!</p>`;
    }}
) 
    
    
agTulum.addEventListener("click", (e) => {
    e.preventDefault();
    if(arrayUsuarios[0] !== undefined){
        console.log(`El usuario ${arrayUsuarios[0].user} agrego Silla Tulum al carrito`);
        agregarCarrito(arrayProductos[5].id);
    }else{
        agTulum.innerHTML = `<p>Debes Registrarte para poder comprar!</p>`;
    }}
) 