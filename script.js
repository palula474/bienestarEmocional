document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    const contentDiv = document.getElementById('content');

    // Evento para manejar clics en el menú
    menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            loadContent(section);
            
            // Actualizar la URL sin recargar la página
            history.pushState(null, '', `#${section}`);
        }
    });

    // Manejar la navegación del historial
    window.addEventListener('popstate', () => {
        const section = window.location.hash.slice(1) || 'inicio';
        loadContent(section);
    });

    // Función para cargar el contenido
    function loadContent(section) {
        contentDiv.innerHTML = `<h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2><p>Contenido de ${section}</p>`;
    }

    // Cargar el contenido inicial
    const initialSection = window.location.hash.slice(1) || 'inicio';
    loadContent(initialSection);
});
