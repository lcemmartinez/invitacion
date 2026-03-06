const btnConfirmar = document.querySelector('.btn-rsvp');

if (btnConfirmar) {
    btnConfirmar.addEventListener('click', async () => {
        console.log("Botón presionado..."); // Mensaje de diagnóstico 1

        const nombreInvitado = prompt("Por favor, ingresa tu nombre completo:");

        // Validación
        if (!nombreInvitado || nombreInvitado.trim() === "") {
            alert("El nombre es necesario para la confirmación.");
            return; 
        }

        console.log("Validación pasada para: " + nombreInvitado); // Mensaje de diagnóstico 2

        // IMPORTANTE: Asegúrate de que esta URL sea la de "Ejecutar" de Google Apps Script
        const webhookURL = "https://script.google.com/macros/s/AKfycbzIcTbO5NOAgXlvfdZDumX4Xrj4RtLfhthcZloFKCZgkQrmlm0VE5uGCjGjAQU6F-gc/exec";

        const datos = {
            nombre: nombreInvitado.trim(),
            asistencia: "Confirmado",
            fecha: new Date().toLocaleString()
        };

        try {
            console.log("Intentando enviar a Google Sheets..."); // Mensaje de diagnóstico 3
            
            await fetch(webhookURL, {
                method: 'POST',
                mode: 'no-cors', // Esto es vital para Google Scripts
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            // Con no-cors no recibimos respuesta del servidor, 
            // pero si llega aquí es porque la petición salió de tu PC.
            alert("¡Listo " + nombreInvitado + "! Tu asistencia ha sido registrada.");
            console.log("Petición enviada con éxito.");

        } catch (error) {
            console.error("Error detectado:", error);
            alert("Hubo un error de conexión.");
        }
    });
} else {
    console.error("Error: No se encontró el botón con la clase .btn-rsvp");
}