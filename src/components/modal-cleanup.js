"use client"

// This is a utility file to help clean up modal-related issues
export function cleanupModals() {
  // Remove all modal backdrops
  const backdrops = document.querySelectorAll(".modal-backdrop")
  backdrops.forEach((backdrop) => backdrop.remove())

  // Reset body classes and styles
  document.body.classList.remove("modal-open")
  document.body.style.overflow = ""
  document.body.style.paddingRight = ""

  // Find any open modals and close them properly
  const openModals = document.querySelectorAll(".modal.show")
  openModals.forEach((modal) => {
    modal.classList.remove("show")
    modal.setAttribute("aria-hidden", "true")
    modal.style.display = "none"
  })
}

// Function to add to event listeners for all close buttons
export function setupModalCloseHandlers() {
  // Add event listeners to all modal close buttons
  document.querySelectorAll('[data-bs-dismiss="modal"]').forEach((button) => {
    button.addEventListener("click", () => {
      // Give time for Bootstrap's own handlers to execute
      setTimeout(cleanupModals, 300)
    })
  })
}
