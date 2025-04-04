

// Add item to cart and store in localStorage
function addToCart(itemName, itemPrice) {
    // Retrieve the current cart from localStorage or initialize it if it doesn't exist
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the new item to the cart
    cart.push({ name: itemName, price: itemPrice });

    // Store the updated cart back in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show the custom confirmation message
    showOrderConfirmation(itemName);
}

// Load and display the cart on the cart page
function loadCart() {
    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Get the HTML elements for displaying the cart
    const cartList = document.getElementById("cart-items");
    const totalPriceElem = document.getElementById("total-price");

    // Clear existing items
    cartList.innerHTML = "";

    // Initialize total price
    let totalPrice = 0;

    // Loop through the cart and display each item
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartList.appendChild(listItem);

        // Update the total price
        totalPrice += item.price;
    });

    // Display the total price
    totalPriceElem.textContent = totalPrice.toFixed(2);
}

// Clear the cart
function clearCart() {
    // Clear the cart from localStorage
    localStorage.removeItem("cart");

    // Clear the cart from the display
    document.getElementById("cart-items").innerHTML = '';
    document.getElementById("total-price").textContent = '0';

    showTemporaryMessage("Checking out...!");
}

// function clearCart(){
//     showTemporaryMessage("Checking out...!");
// }

// Function to show a temporary order confirmation message
function showOrderConfirmation(itemName) {
    showTemporaryMessage(`Your order for ${itemName} is placed and will be served soon!`);
}

// Function to show a temporary message and hide it after 2 seconds
function showTemporaryMessage(message) {
    // Create the message container if it doesn't exist
    let messageContainer = document.getElementById("order-confirmation");
    if (!messageContainer) {
        messageContainer = document.createElement("div");
        messageContainer.id = "order-confirmation";
        document.body.appendChild(messageContainer); // Append it to the body
    }

    // Update the message content
    messageContainer.textContent = message;

    // Apply basic styling (optional)
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '20px';
    messageContainer.style.right = '150px';
    messageContainer.style.padding = '10px';
    messageContainer.style.backgroundColor = '#4caf50';
    messageContainer.style.color = '#fff';
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.fontSize = '16px';
    messageContainer.style.zIndex = '1000';

    // Automatically hide the message after 2 seconds
    setTimeout(() => {
        messageContainer.remove();
    }, 2000);
}

// script.js for searching here

let timeout = null;

document.getElementById('searchBar').addEventListener('input', function() {
    clearTimeout(timeout); // Clear the previous timeout if the user is still typing
    
    // Clear the previous input if there's a new search
    // this.value = this.value.trim(); // Optional: Trim the input to avoid empty searches
    const searchValue = this.value.toLowerCase();

    // Set a new timeout for 2 seconds after the user stops typing
    timeout = setTimeout(function() {
        searchItem(searchValue);
    }, 2000); // 2 seconds delay
});

function clearSearchBar() {
    const searchBar = document.getElementById('searchBar');
    setTimeout(() => {
        searchBar.value = ''; // Clear the input
    }, 4000); // 4000 milliseconds = 4 seconds
}


document.getElementById('searchBar').addEventListener('focus', function() {
    // Clear the input when user clicks on the search bar
    this.value = ''; 
});

function searchItem(item) {
    const menuCards = document.querySelectorAll('.menu_card');
    let found = false;

    // Clear previous search highlights or results here if necessary
    menuCards.forEach(card => {
        const itemName = card.querySelector('h2').innerText.toLowerCase();
        if (itemName.includes(item)) {
            found = true;
            // Scroll to the item
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    if (!found) {
        showNotFoundMessage();
    }
}

function showNotFoundMessage() {
    // Create a temporary "Item not found" message
    const messageDiv = document.createElement('div');
    messageDiv.innerText = 'Item not found';  
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '75px' ;
    messageDiv.style.right = '150px';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.backgroundColor = '#ff0101';
    messageDiv.style.color = '#fff';
    messageDiv.style.padding = '10px 15px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000';
    document.body.appendChild(messageDiv);

    // Remove the message after 2 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}



//------------- this is for reservation form --------------
document.getElementById("reservationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const reservationData = {
        username: event.target.username.value,
        email: event.target.email.value,
        contact: event.target.contact.value,
        people: event.target.people.value,
        date: event.target.date.value,
        time: event.target.time.value
    };

    // Retrieve existing reservations from local storage or create a new array
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push(reservationData);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    alert("Reservation submitted successfully!");

    // Optionally, reset the form
    event.target.reset();
});


document.getElementById('submitButton').addEventListener('click', function() {
    // Get the textarea and message elements
    const textarea = document.getElementById('reviewTextarea');
    const message = document.getElementById('submitMessage');

    // Set the message and clear the textarea
    message.textContent = "Your review is submitted.";
    textarea.value = '';

    // Hide the message after 4 seconds
    setTimeout(() => {
        message.textContent = '';
    }, 4000);
});

