function markComplete(button) {
    button.classList.toggle('completed');
    if (button.classList.contains('completed')) {
        button.textContent = 'Completado';
        button.style.backgroundColor = 'var(--color-pastel-blue)';
    } else {
        button.textContent = 'Marcar como completado';
        button.style.backgroundColor = 'var(--color-pastel-green)';
    }
    
    // Aquí puedes agregar lógica para guardar el estado del reto en el backend
    // Por ejemplo:
    // const challengeId = button.closest('.challenge-card').dataset.id;
    // const isCompleted = button.classList.contains('completed');
    // saveChallenge(challengeId, isCompleted);
}

// Función para guardar el estado del reto (a implementar)
function saveChallenge(challengeId, isCompleted) {
    // Aquí implementarías la lógica para guardar en el backend
    console.log(`Reto ${challengeId} marcado como ${isCompleted ? 'completado' : 'no completado'}`);
}

// Código para manejar el scroll suave al hacer clic en los enlaces de navegación
document.querySelectorAll('.section-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Funcionalidad para los cuadros emergentes
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalAccept = document.getElementById("modal-accept");
const closeBtn = document.getElementsByClassName("close")[0];

function showModal(title, text) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

modalAccept.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("terms").onclick = function(e) {
    e.preventDefault();
    showModal("Términos y Condiciones", "Al usar nuestro sitio web, aceptas cumplir con nuestras normas de uso, no realizar actividades ilegales, y respetar los derechos de propiedad intelectual. Nos reservamos el derecho de modificar estos términos en cualquier momento.");
}

document.getElementById("privacy").onclick = function(e) {
    e.preventDefault();
    showModal("Política de Privacidad", "Recopilamos y utilizamos tus datos personales solo para mejorar tu experiencia en el sitio. Garantizamos la seguridad de tu información y no la compartimos con terceros sin tu consentimiento, salvo obligación legal.");
}

document.getElementById("contact").onclick = function(e) {
    e.preventDefault();
    showModal("Contacto", "Para consultas o asistencia, puedes contactarnos a través del formulario en nuestro sitio o enviando un correo a [bienestaremocional2@gmail.com]. Respondemos en un plazo de 48 horas.");
}

// Función para manejar los clics en los botones de categoría
function handleCategoryClick(event) {
    const button = event.target;
    const platform = button.getAttribute('data-platform');
    const playlistId = button.getAttribute('data-playlist');
    
    let url;
    if (platform === 'youtube') {
        url = `https://www.youtube.com/playlist?list=${playlistId}`;
    } else if (platform === 'spotify') {
        url = `https://open.spotify.com/playlist/${playlistId}`;
    }
    
    if (url) {
        window.open(url, '_blank');
    }
}

// Agregar event listeners a los botones de categoría
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', handleCategoryClick);
});
