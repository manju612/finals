let shareClicks = 0;
const maxShares = 5;

const form = document.getElementById("registrationForm");
const shareBtn = document.getElementById("whatsappShareBtn");
const shareCountText = document.getElementById("shareCount");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

// Disable form if already submitted
if (localStorage.getItem("submitted") === "true") {
  form.classList.add("hidden");
  successMessage.classList.remove("hidden");
}

// Handle WhatsApp share click
shareBtn.addEventListener("click", () => {
  if (shareClicks < maxShares) {
    shareClicks++;
    shareCountText.textContent = `Click count: ${shareClicks}/5`;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");

    if (shareClicks >= maxShares) {
      shareCountText.textContent = "Sharing complete. Please continue.";
      submitBtn.disabled = false;
    }
  }
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (shareClicks < maxShares) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;

  // Send data to Google Sheets (adjust URL to your script web app)
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwgbeFqS_l-oQ-fVXbYEeVhK1LtEogQZWglP6LTt95j8FMsdBJa-py17Slsn9IYOpLpnw/exec';
  const formData = new FormData();
  formData.append('Name', name);
  formData.append('Phone', phone);
  formData.append('Email', email);
  formData.append('College', college);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      form.reset();
      form.classList.add("hidden");
      successMessage.classList.remove("hidden");
      localStorage.setItem("submitted", "true");
    })
    .catch(error => alert("Error submitting form. Please try again."));
});
