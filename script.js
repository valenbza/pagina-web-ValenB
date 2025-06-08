//Carrito
let cart=[]; 

function addToCart(nombre,precio){
    let producto= cart.find(item=> item.nombre === nombre);
    if(producto){
        producto.cantidad++;
    }else{
        cart.push({nombre: nombre, precio: precio, cantidad: 1});
    }
    updateCart();
}

const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
}

function updateCart(){
    let cartItems= document.getElementById("cart-items");
    let cartCount= document.getElementById("cart-count");
    let cartTotal= document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        let subtotal= item.precio * item.cantidad;
        total += subtotal;
        count += item.cantidad;

        let row= `<tr>
                    <td>${item.nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.precio}</td>
                    <td>${subtotal}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.nombre}')">-</button>
                        <button class="btn btn-success btn-sm" onclick="addToCart('${item.nombre}', ${item.precio})">+</button>
                    </td>
                </tr>`;
        cartItems.innerHTML += row;
    });
    cartCount.textContent = count;
    cartTotal.textContent = total;

    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(nombre){
    let producto = cart.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad--;
        if (producto.cantidad <= 0) {
            cart = cart.filter(item => item.nombre !== nombre);
        }
    }
    updateCart();
}

document.getElementById('checkout-button').addEventListener('click', function() {
    window.location.href = 'checkout.html';
});
