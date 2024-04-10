//Variable que acumula el total de la compra
var sumaTotal = 0;

//Vector para llevar un registro de los productos agregados al carrito
var productosCarrito = [];

//Vector usado en clase
var productos = [
    {
        ID: 1,
        nombre: "berenjena por unidad",
        precioUnitario: 35,
        stock: 9
    },
    {   
        ID: 2,
        nombre: "zanahoria por kg",
        precioUnitario: 25,
        stock: 120
    },
    {   
        ID: 3,
        nombre: "papa por kg",
        precioUnitario: 52,
        stock: 14
    },
    {   
        ID: 4,
        nombre: "palta por unidad",
        precioUnitario: 55,
        stock: 23
    },
    {   
        ID: 5,
        nombre: "tomate perita por kg",
        precioUnitario: 85,
        stock: 58
    },
    {   
        ID: 6,
        nombre: "uvas por kg",
        precioUnitario: 350,
        stock: 85
    },
    {   
        ID: 7,
        nombre: "bandeja de verduras para sopa",
        precioUnitario: 86,
        stock: 12
    },
    {   
        ID: 8,
        nombre: "bandeja de repollitos",
        precioUnitario: 108,
        stock: 58
    },
    {   
        ID: 9,
        nombre: "zapallitos por kg",
        precioUnitario: 69,
        stock: 74
    },
    {   
        ID: 10,
        nombre: "bananas por kg",
        precioUnitario: 85,
        stock: 14
    },
    {   
        ID: 11,
        nombre: "mandarina por kg",
        precioUnitario: 43,
        stock: 86
    },
    {   
        ID: 12,
        nombre: "naranja para jugo por kg",
        precioUnitario: 79,
        stock: 111
    },
    
];

//Crear tabla a partir del vector dado
function crearTabla(productos){
    
    //Nodo row
    var fila = document.createElement('tr');

    //Nodos celda y tipo de etiqueta
    var nombre = document.createElement('td');
    var precio = document.createElement('td');
    var stock = document.createElement('td');
    var input = document.createElement('td');
    var inputCtd = document.createElement('input');
    var comprar = document.createElement('td');
    var comprarBtn = document.createElement('button');

    //Nodos texto y contenido
    var nomText = document.createTextNode(productos.nombre);
    var precText = document.createTextNode(productos.precioUnitario);
    var stockText = document.createTextNode(productos.stock);
    inputCtd.setAttribute('type', 'number');
    var txtBoton = document.createTextNode('Agregar');


    //Agregar evento al botón agregar al carrito
    comprarBtn.addEventListener('click', arrayProductos);    
    
    //Agregar los nodos texto y etiqueta a los nodos celda
    nombre.appendChild(nomText);
    precio.appendChild(precText);
    stock.appendChild(stockText);
    input.appendChild(inputCtd);
    comprarBtn.appendChild(txtBoton);
    comprar.appendChild(comprarBtn);


    //Y agregar las celdas a la fila
    fila.appendChild(nombre);
    fila.appendChild(precio);
    fila.appendChild(stock);
    fila.appendChild(input);
    fila.appendChild(comprar);

    //Enviar las filas al cuerpo de la tabla creada en el HTML
    var tbody = document.querySelector('#productos');
    tbody.appendChild(fila);
}


//Recorrer el vector aplicándole la función para crear la tabla
productos.forEach(item => {
    crearTabla(item);
});


//Función para multiplicar la cantidad de productos por su precio unitario
function multip(a, b){
    a = parseInt(a);
    b = parseInt(b);
    var mult = a * b;

    return mult
}


//Función que agrega los elementos al carrito
function agregarCarrito(e){
    //crear fila de productos
    var filaC = document.createElement('tr');

    //Crear celdas para los productos comprados
    var nombreC = document.createElement('td');
    var precioC = document.createElement('td');
    var cantidadC = document.createElement('td');
    var precioMultC = document.createElement('td');
    var quitarC = document.createElement('td');
    var quitarCBot = document.createElement('button');

    //Agregar evento al botón quitar
    quitarCBot.addEventListener("click", quitarFila);

    //tomar los valores del elemento e y agregarlos a la tabla
    var nombreCTxt = document.createTextNode(e.target.parentNode.parentNode.firstChild.innerHTML);
    var precioCTxt = document.createTextNode(e.target.parentNode.parentNode.childNodes[1].innerHTML);
    var cantidadCTxt = document.createTextNode(e.target.parentNode.parentNode.childNodes[3].firstChild.value);
    var precioMultCTxt = document.createTextNode(multip(precioCTxt.data, cantidadCTxt.data));
    var quitarTxt = document.createTextNode('Quitar');

    //Agregar nodos de texto y etiqueta a las celdas
    nombreC.appendChild(nombreCTxt);
    precioC.appendChild(precioCTxt);
    cantidadC.appendChild(cantidadCTxt);
    precioMultC.appendChild(precioMultCTxt);
    quitarCBot.appendChild(quitarTxt);
    quitarC.appendChild(quitarCBot);

    //Agregar todas las celdas en una fila
    filaC.appendChild(nombreC);
    filaC.appendChild(precioC);
    filaC.appendChild(cantidadC);
    filaC.appendChild(precioMultC);
    filaC.appendChild(quitarC);

    //Agregar las filas a la tabla
    var tbodyC = document.querySelector('#carrito');
    tbodyC.appendChild(filaC);
    
    }

//Agregar elemento al carrito solo si cumple con las condiciones, en caso contrario comunicar el error
var mensaje = document.querySelector('#mensaje');
function arrayProductos(e){
    //comprobar si el producto ya está en el carrito
    var nombreItem = e.target.parentNode.parentNode.firstChild.innerHTML;
    var item = productosCarrito.find(elemento => elemento == nombreItem);
    if(item == nombreItem){
        mensaje.innerHTML = "Este producto ya se encuentra en el carrito."
    }
    else{
        //comprobar si existe el stock suficiente
        var stock = e.target.parentNode.parentNode.childNodes[2].innerHTML;
        var cant = parseInt(e.target.parentNode.parentNode.childNodes[3].firstChild.value);
        if((stock - cant) < 0){
            mensaje.innerHTML = "No hay stock suficiente de este producto."
        }
        else{
            //para asegurarse de que se ingrese una cantidad válida 
            if(cant < 1){
                mensaje.innerHTML = "Ingrese un número válido."
            }
            else{
            //restar la compra del stock modificando el stock en el vector
            productos.forEach(element => {
                if(element.nombre == nombreItem){
                    element.stock -= cant
                }
            
            });

            //agregar al recuento de productos en el carrito
            productosCarrito.push(nombreItem);
            //agregar el elemento al carrito llamando la función que crea una tabla para el carrito
            agregarCarrito(e);
            //borrar el mensaje de error si es que hay uno
            mensaje.innerHTML = "";
            //sumar el total parcial al total general de la compra
            var PU = e.target.parentNode.parentNode.childNodes[1].innerHTML;
            var cantXPU = multip(PU, cant);
            sumaTotal += cantXPU;
            //mostrar mensaje de confirmación
            mensaje.innerHTML = "Producto agregado al carrito!";
            //vaciar el total si es que había alguno calculado
            precioTotal.innerHTML = "";
            }
        }
    
    }

}

//Función para quitar los elementos del carrito
function quitarFila(e){
        var qNombre = e.target.parentNode.parentNode.firstChild.innerHTML;
        //primero devolver el stock
        var qCant = parseInt(e.target.parentNode.parentNode.childNodes[2].innerHTML);
        productos.forEach(element => {
            if(element.nombre == qNombre){
                element.stock += qCant;
            }
        });
        //restar del total gral
        var qTotalParcial = parseInt(e.target.parentNode.parentNode.childNodes[3].innerHTML);
        sumaTotal -= qTotalParcial;
        //quitar del array de repeticion el index 0
        var qIndex = productosCarrito.findIndex(elemento => elemento == qNombre);
        productosCarrito.splice(qIndex, 1);
        
        //eliminar la fila de la tabla del carrito
        filaCarrito = e.target.parentNode.parentNode;
        filaCarrito.parentNode.removeChild(filaCarrito);

        //si había un total, borrarlo
        precioTotal.innerHTML= "";

        //avisar de la eliminación del carrito
        mensaje.innerHTML="Producto eliminado del carrito.";
    }

// Agregar evento al botón completar compra
var total = document.getElementById('completarCompra');
total.addEventListener('click', completarCompra);

//Mostrar el total de la compra
var precioTotal = document.querySelector('#total');
function completarCompra(){
    if(sumaTotal <= 0){
        mensaje.innerHTML="Debe agregar productos al carrito para efectuar la compra.";
    }
    else{
        precioTotal.innerHTML= "El total es de $" + sumaTotal;
        mensaje.innerHTML= "";
    }    
};