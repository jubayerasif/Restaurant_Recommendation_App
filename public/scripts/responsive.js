// Get button element for toggling the drawer
const drawerBtnElement = document.getElementById("drawer-btn");

// Get the drawer element to be toggled
const mobileDrawerElement = document.getElementById("mobile-drawer");

// Define function to toggle the drawer
function toggleDrawer() {
  mobileDrawerElement.classList.toggle("open");
}

// Add click event listener to toggle drawer visibility
drawerBtnElement.addEventListener("click", toggleDrawer);