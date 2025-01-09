
function product(id, name, price, image) {
    return {
        id: id,
        name: name,
        price: price,
        image: image,
    };
}

var motors = [
    product(1, "NINJA H2R", 290000, "https://cdn.pixabay.com/photo/2021/04/19/05/12/kawasaki-ninja-h2r-6190256_960_720.jpg"),
    product(2, "R1M", 1900000, "https://www.motoplanete.com/yamaha/zoom-700px/10123-R1M-1000-2024-1000px.webp"),
    product(3, "GSX-R1000", 390000, "https://lh5.googleusercontent.com/proxy/Bv4G3RC8PCEaJzAU17iuCaJD-LGfTNyFeaUG0JQFPOJf3PxGPOhMYzL08ylm-RXa2tEkEcVaw8rBA2xgRvwM3IXw9dzJNiSskKNcV-kBayXKAtfYl-QlCOLodOM8bi7tEm1WELowU6rx4bqtuEZbt5xjvFo"),
    product(4, "HP4", 150000, "https://www.motoplanete.com/bmw/zoom-700px/BMW-S-1000-RR-HP4-Race-2020-700px.webp"),
    product(5, "APRILIA RS ", 150000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBV7NdRYvc7Z-WVw6-BouUaFCralSJejkpA&s"),
    product(6, "PULSAR RS", 180000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkUIvFPFYgSBQGq-jIWlvPu3iIDEq9niGT8w&s"),
]

var cart = []

function updateCartCount() {
    var cartCount = cart.reduce(function (count, item) {
        return count + item.quantity; // Sum up the quantities
    }, 0);

    document.getElementById("cart-count").textContent = cartCount;
}

// Display products in the shop section
function displayMotors() {
    var productsList = document.getElementById("products-list");
    productsList.innerHTML = ""

    // Loop through motors and display them
    for (var i = 0; i < motors.length; i++) {
        var motor = motors[i];  // Get each motor
        var motorDiv = document.createElement('div');
        motorDiv.className = 'motor';
        motorDiv.innerHTML = `
            <img src="${motor.image}" alt="${motor.name}">
            <h3>${motor.name}</h3>
            <p>Price: $${motor.price}</p>
            <button onclick="addToCart(${motor.id})">Add to Cart</button>
            <button onclick="deleteFromCart(${motor.id})">delete from Cart</button>
        `;
        productsList.appendChild(motorDiv)
    }
}

// Add to cart function
function addToCart(productId) {
    var product = motors.find(function (p) {
        return p.id === productId;
    });

    var purchase = cart.find(function (i) {
        return i.product.id === productId;
    });

    if (purchase) {
        purchase.quantity += 1
    } else {
        cart.push({ product: product, quantity: 1 })
    }

    updateCartCount()
    displayMotors()
}

// Delete from cart function
function deleteFromCart(productId) {
    var purchase = cart.find(function (i) {
        return i.product.id === productId;
    });

    if (purchase) {
        if (purchase.quantity > 1) {
            purchase.quantity -= 1
        } else {
            cart = cart.filter(function (i) {
                return i.product.id !== productId
            });
        }
    }

    updateCartCount()
    displayMotors()
}


