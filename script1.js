const nombreUsuario ="Angel";
const mailUsuario = "angelvamosla12@hotmail.com";
const passUsuario = "1234";

let respuesta = confirm ("Desea registrarse?") ;

if (respuesta) {
    solicitarDatos();

}

function solicitarDatos(){

    let user = prompt ("Ingrese su usuario");
    let mail = prompt ("Ingrese su email");
    let pass = prompt ("Ingrese su pass");

    if (user && mail && pass ){

        let validacion = validarDatos(user,mail);

        if (validacion){

                const usuario = new Usuario (user,mail,pass);
                usuario.mensajeBienvenida();
                respuestainiciarCarrito = confirm("Desea continuar para comprar en nuestra web?");
                if (respuestainiciarCarrito){
                    iniciarCarrito ();
                }else{
                    solicitarDatos ();
                }


        }else{

           solicitarDatos();

        }

    }else{

        alert("Tenes que completar todos los datos") ;
        solicitarDatos ();

    }
}

function validarDatos(user,mail){

    if (user === nombreUsuario){

        alert("ya existe ese nombre de usuario");
        return false;

    }

    if (mail === mailUsuario){

        alert("ya existe ese mail");
        return false;

    }

    return true ;
}

function iniciarCarrito(){

    let lista1 = "" ;
    let finalizar_carrito = false ;

    while (!finalizar_carrito){

        let codigoProductos = prompt("Ingrese codigo de producto");
        let producto = obtenerCodProducto(codigoProductos);

        if (producto){
            console.log("Producto agregado con exito! : "+producto);
            lista1 += "\n"+producto;
        }else{

            if (codigoProductos === null){
                finalizar_carrito = true ;
            }else {
                alert("Ingrese un codigo de producto valido");
            }
        }
    }
    if (lista1 != ""){

        let resp = confirm ("Quiere finalizar la compra de : "+lista1);
        if (resp){
            console.log("Finalizaron la compra de : " + lista1);
            alert("Gracias por confiar en deco_sillonesnya!");
        }
    }
}

function obtenerCodProducto(codigoProductos){ 

    let producto  ;
    switch(codigoProductos){

        case "1" : 
                    producto = "Juego Acapulco";
                    break;
        case "2" : 
                    producto = "Juego Asuncion";
                    break;
        case "3" : 
                    producto = "Juego Capri" ;
                    break;
        case "4" : 
                    producto = "Sillon Doble"
                    break;       
        case "5" : 
                    producto = "Juego Gervasoni" ;
                    break;
        case "6" : 
                    producto = "Silla Tulum" ;
                    break;
         default :
                    producto = false;           
    }
   return producto ;  
}