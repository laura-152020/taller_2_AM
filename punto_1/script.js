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
    }
];

// Cargar productos desde el almacenamiento local si están disponibles
if (localStorage.getItem('productosCarrito')) {
    productosCarrito = JSON.parse(localStorage.getItem('productosCarrito'));
    actualizarCarrito();
}

// Función para actualizar el carrito después de cualquier modificación
function actualizarCarrito() {
    // Limpiar el contenido actual del carrito
    document.getElementById('carrito').innerHTML = '';

    // Recorrer el array de productos en el carrito y agregarlos a la tabla
    productosCarrito.forEach(nombreItem => {
        // Encontrar el producto en el array de productos
        const producto = productos.find(item => item.nombre === nombreItem);

        if (producto) {
            // Crear fila de productos para el carrito
            const filaC = document.createElement('tr');

            // Crear celdas para los detalles del producto en el carrito
            const nombreC = document.createElement('td');
            nombreC.textContent = producto.nombre;

            const precioC = document.createElement('td');
            precioC.textContent = producto.precioUnitario;

            const cantidadC = document.createElement('td');
            cantidadC.textContent = productosCarrito.filter(item => item === nombreItem).length;

            const precioMultC = document.createElement('td');
            precioMultC.textContent = multip(producto.precioUnitario, cantidadC.textContent);

            const quitarC = document.createElement('td');
            const quitarCBot = document.createElement('button');
            quitarCBot.textContent = 'Quitar';

            // Agregar evento al botón de quitar del carrito
            quitarCBot.addEventListener('click', () => quitarFilaCarrito(producto.nombre));

            quitarC.appendChild(quitarCBot);

            // Agregar todas las celdas en una fila
            filaC.appendChild(nombreC);
            filaC.appendChild(precioC);
            filaC.appendChild(cantidadC);
            filaC.appendChild(precioMultC);
            filaC.appendChild(quitarC);

            // Agregar la fila al carrito
            document.getElementById('carrito').appendChild(filaC);
        }
    });

    // Actualizar el total de la compra
    document.getElementById('total').textContent = 'El total es de $' + sumaTotal;
}

// Función para multiplicar la cantidad de productos por su precio unitario
function multip(a, b){
    a = parseInt(a);
    b = parseInt(b);
    var mult = a * b;

    return mult
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(nombreItem) {
    productosCarrito.push(nombreItem);
    localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
    actualizarCarrito();
}

// Función para quitar un producto del carrito
function quitarFilaCarrito(nombreItem) {
    const index = productosCarrito.indexOf(nombreItem);
    if (index !== -1) {
        productosCarrito.splice(index, 1);
        localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
        actualizarCarrito();
    }
}

// Función para limpiar el carrito por completo
function limpiarCarrito() {
    productosCarrito = [];
    localStorage.removeItem('productosCarrito');
    actualizarCarrito();
}

// Función para completar la compra
function completarCompra() {
    // Aquí colocarías el código para completar la compra, como procesar el pago, enviar la orden, etc.
    console.log("Compra completada");
}

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
    comprarBtn.addEventListener('click', () => agregarProductoAlCarrito(productos.nombre));    
    
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
