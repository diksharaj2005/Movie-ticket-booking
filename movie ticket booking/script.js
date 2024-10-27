// Update location button on click
const locationLinks = document.querySelectorAll('.dropdown-content a');
locationLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const selectedLocation = this.textContent;
        document.querySelector('.location-btn').innerHTML = `Location: ${selectedLocation} <i class="fa-solid fa-caret-down"></i>`;
    });
});
document.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
        document.body.appendChild(bubble);
    }
});
// Smooth scrolling for navbar links and sign in/log in buttons
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a, .sign-in a, .log-in a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor click behavior
            
            const targetId = this.getAttribute('href'); // Get the target section ID
            const targetSection = document.querySelector(targetId); // Select the target section
            
            if (targetSection) {
                // Get the position of the target section
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;

                // Calculate the offset based on the height of the fixed header
                const headerOffset = document.querySelector('header').offsetHeight; // Adjust as needed
                const scrollToPosition = targetPosition - headerOffset;

                // Smooth scroll to the target position
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth' // Smooth scrolling
                });
            }
        });
    });

});
// Script to handle modal opening and closing
const bookingModal = document.getElementById("bookingModal");
const movieTitleElement = document.getElementById("movieTitle");
const seatContainer = document.getElementById("seat-selection");

// Function to open the modal and set the movie title
function openModal(movieTitle) {
    bookingModal.style.display = "block";
    movieTitleElement.textContent = `Booking for: ${movieTitle}`;
    renderSeats(); // Renders seats each time modal opens
}

// Function to close the modal
function closeModal() {
    bookingModal.style.display = "none";
}

// Close modal when user clicks outside of the modal content
window.onclick = function(event) {
    if (event.target === bookingModal) {
        closeModal();
    }
};

// Function to render seats dynamically in the seat-container div
function renderSeats() {
    // Clear any existing seats
    seatContainer.innerHTML = "";
    
    // Let's assume a 5x5 seat grid (25 seats)
    const totalSeats = 25;
    
    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = i;

        // Randomly mark some seats as occupied for demo purposes
        if (Math.random() < 0.2) {
            seat.classList.add("occupied");
        }

        // Add click event to toggle seat selection
        seat.addEventListener("click", () => selectSeat(seat));

        seatContainer.appendChild(seat);
    }
}

// Function to handle seat selection and toggle seat color
function selectSeat(seat) {
    // Prevent selection of occupied seats
    if (seat.classList.contains("occupied")) return;

    // Toggle selection state
    seat.classList.toggle("selected");
}

// Form submission event listener
const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Gather selected seat numbers
    const selectedSeats = Array.from(seatContainer.getElementsByClassName("seat selected")).map(seat => seat.textContent);
    
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }
    
    alert(`Seats booked successfully: ${selectedSeats.join(", ")}`);
    
    // Reset form and close modal
    bookingForm.reset();
    closeModal();
});
