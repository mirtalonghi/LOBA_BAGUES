
        let cart = [];

        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: name, price: price, quantity: 1 });
            }
            displayCart();
        }

        function displayCart() {
            const cartContainer = document.getElementById("cart");
            cartContainer.innerHTML = "";

            cart.forEach(item => {
                const itemElement = document.createElement("p");
                itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
                cartContainer.appendChild(itemElement);
            });

            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            document.getElementById("total").textContent = `Total: $${total}`;
        }

        function toggleCartSection() {
            const cartSection = document.getElementById("cart-section");
            cartSection.style.display = cartSection.style.display === "none" ? "block" : "none";
        }

        // Asegurarse de que el evento 'click' esté enlazado correctamente
        document.getElementById("cart-icon").addEventListener("click", (e) => {
            e.preventDefault();
            toggleCartSection();
        });

   
