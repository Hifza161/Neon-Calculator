const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const backBtn = document.getElementById("back"); 

let currentInput = "";

// Function to update the display
function updateDisplay() {
  if (currentInput === "") {
    display.value = "0";           // show greyed 0
    display.classList.add("idle");
  } else {
    display.value = currentInput;   // show typed input
    display.classList.remove("idle");
  }
}

let lastPressedEquals = false; // new flag

// Function to append number or operator
function appendInput(value) {
     // If last action was equals and user starts typing a number, clear input
    if (lastPressedEquals) {
    // Only clear if they type a number or dot
    if (!["+", "-", "*", "/"].includes(value)) {
      currentInput = "";
    }
    lastPressedEquals = false; // reset flag
  }

  // Avoid starting with multiple zeros
  if (currentInput === "0" && value !== ".") currentInput = "";

  // Prevent consecutive operators (optional UX improvement)
  const lastChar = currentInput.slice(-1);
  if (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1); // replace last operator
  }

  currentInput += value;
  updateDisplay();
}

// Number and operator buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    appendInput(button.textContent);
  });
});

// Clear button
clearBtn.addEventListener("click", () => {
  currentInput = "";
  updateDisplay();
});

// Backspace button (optional)
if (backBtn) {
  backBtn.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  });
}

// Equals button
equalsBtn.addEventListener("click", () => {
  try {
    let result = eval(currentInput);

    // Optional: limit decimals
    if (typeof result === "number") {
      result = parseFloat(result.toFixed(8));
    }

    currentInput = result.toString();
    updateDisplay();

    // ✅ mark that last action was equals
    lastPressedEquals = true;
  } catch {
    display.value = "Error";
    currentInput = "";
    display.classList.add("idle");
    lastPressedEquals = false;
  }
});



document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "."].includes(e.key)) {
    appendInput(e.key);
  } else if (e.key === "Enter") {
    equalsBtn.click();
  } else if (e.key === "Backspace") {
    backBtn.click();
  } else if (e.key.toLowerCase() === "c") {
    clearBtn.click();
  }else if (e.key === "Escape") {
    clearBtn.click();
  }else if (e.key === "Delete") {
    clearBtn.click();
  }

});







const toggle = document.getElementById("toggle-theme");
const themeIcon = document.getElementById("theme-icon");
const title = document.querySelector(".msg");

toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeIcon.textContent = "🌙"; // Dark icon
  } else {
    themeIcon.textContent = "🌞"; // Light icon
  }
});


