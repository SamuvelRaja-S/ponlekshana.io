document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('show-menu');
});

document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const popupOk = document.getElementById("popup-ok");

    // Ensure the popup and button exist in the DOM
    if (popup && popupOk) {
        popup.style.display = "block"; // Show the popup

        popupOk.addEventListener("click", function() {
            popup.style.display = "none"; // Hide the popup when OK is clicked
        });
    } else {
        console.error("Popup or popup button not found in the DOM.");
    }
});

// Function to update individual and total amounts
function updateAmounts() {
    let totalAmount = 0;

    document.querySelectorAll('.row-container').forEach(row => {
        const priceSpan = row.querySelector('.price');
        const input = row.querySelector('.qty-controls input');
        const amountSpan = row.querySelector('.itemAmount');

        const quantity = input.value;
        const pricePerItem = parseFloat(priceSpan.dataset.price);
        const itemAmount = quantity * pricePerItem;
        amountSpan.textContent = `Rs. ${itemAmount.toFixed(2)}`;

        totalAmount += itemAmount;
    });

    // Update the total amount (you can add an element to display it)
    document.getElementById('totalAmount').textContent = `NET TOTAL : ₹ ${totalAmount.toFixed(2)}`;
}

// Attach event listeners to all quantity inputs
document.querySelectorAll('.qty-controls input').forEach(input => {
    input.addEventListener('input', updateAmounts);
});

// Initial calculation
updateAmounts();


// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const price = parseFloat(this.getAttribute('data-price'));
        const quantityInput = this.parentElement.parentElement.querySelector('input[type="number"]');
        const quantity = parseInt(quantityInput.value);

        if (quantity > 0) {
            const itemAmount = price * quantity;
            const itemName = this.parentElement.parentElement.querySelector('.table-cell:first-child span:nth-child(2)').innerText;
            addToCart(itemName, quantity, itemAmount);

            updateTotalAmount();
            quantityInput.value = 0; // Reset the quantity input
        } else {
            alert('Please enter a quantity greater than 0');
        }
    });
});
function addToCart(itemName, quantity, itemAmount) {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <span>${itemName} x ${quantity}</span>
        <span>₹${itemAmount.toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(cartItem);
}
