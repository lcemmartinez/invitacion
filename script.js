btnConfirmar.addEventListener('click', async () => {
    const nombreInvitado = prompt("Por favor, ingresa tu nombre completo:");

    // VALIDACIÓN: .trim() elimina espacios vacíos al inicio y al final
    if (!nombreInvitado || nombreInvitado.trim() === "") {
        alert("¡Ups! El nombre es obligatorio para confirmar tu asistencia.");
        return; // Detiene la ejecución: no se ejecuta el fetch
    }

    const webhookURL = "https://script.google.com/macros/s/AKfycbzIcTbO5NOAgXlvfdZDumX4Xrj4RtLfhthcZloFKCZgkQrmlm0VE5uGCjGjAQU6F-gc/exec";
    const datos = {
        nombre: nombreInvitado.trim(), // Enviamos el nombre limpio
        asistencia: "Confirmado",
        fecha: new Date().toLocaleString()
    };

    try {
        // ... aquí va tu código fetch que ya funciona ...
        alert("¡Gracias " + nombreInvitado + "! Registro exitoso.");
    } catch (error) {
        console.error("Error:", error);
    }
});