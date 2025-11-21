function sendMail(event){
    // Prevent form from submitting normally
    if(event) {
        event.preventDefault();
    }
    
    let parms={
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value,
        subject : document.getElementById("subject").value
    }

    emailjs.send("service_g8g3oec","template_5a225ro",parms)
        .then(function(response) {
            alert("Message sent successfully!");
            // Clear the form after successful send
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
        }, function(error) {
            alert("Failed to send message. Please try again later.");
            console.error("EmailJS Error:", error);
        });
    
    return false;
}