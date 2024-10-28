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
            event.preventDefault(); 
            
            const targetId = this.getAttribute('href'); 
            const targetSection = document.querySelector(targetId); 
            
            if (targetSection) {
            
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;

            
                const headerOffset = document.querySelector('header').offsetHeight; 
                const scrollToPosition = targetPosition - headerOffset;

            
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth' 
                });
            }
        });
    });

});

const bookingModal = document.getElementById("bookingModal");
const movieTitleElement = document.getElementById("movieTitle");
const seatContainer = document.getElementById("seat-selection");


function openModal(movieTitle) {
    bookingModal.style.display = "block";
    movieTitleElement.textContent = `Booking for: ${movieTitle}`;
    renderSeats(); // Renders seats each time modal opens
}


function closeModal() {
    bookingModal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target === bookingModal) {
        closeModal();
    }
}
function renderSeats() {

    seatContainer.innerHTML = "";
    
    // Let's assume a 5x5 seat grid (25 seats)
    const totalSeats = 25;
    
    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = i;

        
        if (Math.random() < 0.2) {
            seat.classList.add("occupied");
        }

        
        seat.addEventListener("click", () => selectSeat(seat));

        seatContainer.appendChild(seat);
    }
}


function selectSeat(seat) {
    
    if (seat.classList.contains("occupied")) return;

    
    seat.classList.toggle("selected");
}


const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    
    const selectedSeats = Array.from(seatContainer.getElementsByClassName("seat selected")).map(seat => seat.textContent);
    
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }
    
    alert(`Seats booked successfully: ${selectedSeats.join(", ")}`);
    
    
    bookingForm.reset();
    closeModal();
});
