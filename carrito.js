// Inicialización del carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carritoItems');
    const total = document.getElementById('total');
    carritoItems.innerHTML = '';
    let suma = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement('li');
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        
        // Botón para eliminar producto
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
        btnEliminar.onclick = () => {
            carrito.splice(index, 1);
            actualizarCarrito();
        };
        
        item.appendChild(btnEliminar);
        carritoItems.appendChild(item);
        suma += producto.precio;
    });

    total.textContent = `Total: $${suma}`;
}

// Escuchar el botón de comprar
document.getElementById('comprarBtn').addEventListener('click', () => {
    if (carrito.length > 0) {
        alert('Gracias por tu compra');
        carrito = [];
        actualizarCarrito();
    } else {
        alert('El carrito está vacío');
    }
});

// Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio) {
    const producto = { id, nombre, precio };
    carrito.push(producto);
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarrito();
}

// Mostrar el modal del carrito al hacer clic en el icono
carritoIcono.addEventListener('click', () => {
    actualizarCarrito();
    modalCarrito.show();
});

// Evento para los botones de agregar al carrito
document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const productId = card.getAttribute('data-product-id');
        const productName = card.querySelector('.card-title').textContent;
        const productPrice = parseFloat(card.querySelector('.card-text').textContent.replace(/[^\d.-]/g, ''));

        agregarAlCarrito(productId, productName, productPrice);
    });
});

// Acción de compra (limpiar carrito por ahora)
comprarBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
        alert('Compra realizada con éxito');
        carrito = []; // Limpiar carrito después de comprar
        actualizarCarrito();
        modalCarrito.hide();
    } else {
        alert('Tu carrito está vacío');
    }
});
