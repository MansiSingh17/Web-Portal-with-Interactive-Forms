"use strict";

(function () {
  // Hamburger menu functionality
  const hamburgerButton = document.querySelector(".hamburger-button");
  const mainNav = document.querySelector(".main-nav");

  if (hamburgerButton && mainNav) {
    hamburgerButton.addEventListener("click", function () {
      const isOpen = mainNav.classList.contains("open");

      if (isOpen) {
        mainNav.classList.remove("open");
        hamburgerButton.setAttribute("aria-expanded", "false");
      } else {
        mainNav.classList.add("open");
        hamburgerButton.setAttribute("aria-expanded", "true");
      }
    });
  }

  // Modal functionality (only on cats.html page)
  const subscribeButtons = document.querySelectorAll(".subscribe-button");
  const modal = document.querySelector(".subscribe-modal");

  if (subscribeButtons.length > 0 && modal) {
    const form = document.querySelector(".subscribe-form");
    const emailInput = document.getElementById("email-input");
    const confirmInput = document.getElementById("confirm-input");
    const emailError = document.getElementById("email-error");
    const confirmError = document.getElementById("confirm-error");
    const cancelButton = document.querySelector(".cancel-button");
    const submitButton = document.querySelector(".submit-button");

    // Validation functions
    function validateEmail(email) {
      return email.includes("@");
    }

    function validateConfirm(email, confirm) {
      return email === confirm;
    }

    function showError(input, errorElement, message) {
      input.classList.add("invalid");
      errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
      input.classList.remove("invalid");
      errorElement.textContent = "";
    }

    function validateEmailField() {
      const emailValue = emailInput.value.trim();

      if (emailValue === "") {
        showError(emailInput, emailError, "This field is required");
        return false;
      } else if (!validateEmail(emailValue)) {
        showError(
          emailInput,
          emailError,
          "This field must be a valid email address including a @"
        );
        return false;
      } else {
        clearError(emailInput, emailError);
        return true;
      }
    }

    function validateConfirmField() {
      const emailValue = emailInput.value.trim();
      const confirmValue = confirmInput.value.trim();

      // Only validate if email field is not empty and valid
      if (emailValue === "" || !validateEmail(emailValue)) {
        return true; // Don't validate confirm if email is invalid
      }

      if (confirmValue === "") {
        showError(
          confirmInput,
          confirmError,
          "This field must match the provided email address"
        );
        return false;
      } else if (!validateConfirm(emailValue, confirmValue)) {
        showError(
          confirmInput,
          confirmError,
          "This field must match the provided email address"
        );
        return false;
      } else {
        clearError(confirmInput, confirmError);
        return true;
      }
    }

    // Open modal when subscribe button is clicked
    subscribeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Clear form and errors when opening
        form.reset();
        clearError(emailInput, emailError);
        clearError(confirmInput, confirmError);

        modal.showModal();
      });
    });

    // Validate on input change - only for confirm field
    confirmInput.addEventListener("input", validateConfirmField);

    // Validate email when focusing on confirm field
    confirmInput.addEventListener("focus", function () {
      if (emailInput.value.trim() !== "") {
        validateEmailField();
      }
    });

    // Validate email when clicking on subscribe button
    if (submitButton) {
      submitButton.addEventListener("click", function () {
        if (emailInput.value.trim() !== "") {
          validateEmailField();
        }
      });
    }

    // Handle form submission
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailValid = validateEmailField();

      // Only validate confirm field if email is valid
      let confirmValid = true;
      if (emailValid) {
        confirmValid = validateConfirmField();
      }

      if (emailValid && confirmValid) {
        // Allow form to submit naturally
        form.submit();
      }
    });

    // Close modal when cancel is clicked
    cancelButton.addEventListener("click", function () {
      modal.close();
    });
  }
})();
