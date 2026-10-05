const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const data = {
        name,
        email,
        subject,
        message
    };

    try {

        const response = await fetch("/api/contact", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {

            formMessage.textContent =
                "Message sent successfully!";

            formMessage.style.color = "green";

            contactForm.reset();

        } else {

            formMessage.textContent =
                "Something went wrong.";

            formMessage.style.color = "red";
        }

    } catch (error) {

        formMessage.textContent =
            "Unable to connect to server.";

        formMessage.style.color = "red";

        console.error(error);
    }

});