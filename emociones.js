document.addEventListener('DOMContentLoaded', function() {
    // Mapa de colores para cada emoción
    const emotionColors = {
        'Feliz': 'rgb(255, 255, 0)', // Amarillo brillante
        'Triste': 'rgb(173, 216, 230)', // Azul claro
        'Enojado': 'rgb(255, 0, 0)', // Rojo
        'Agradecido': 'rgb(255, 165, 0)', // Naranja
        'Ansioso': 'rgb(64, 224, 208)', // Turquesa
        'Frustrado': 'rgb(69, 69, 69)', // Gris oscuro
        'Enamorado': 'rgb(255, 192, 203)', // Rosa
        'Esperanzado': 'rgb(255, 255, 0)', // Amarillo
        'Miedo': 'rgb(75, 0, 130)', // Morado oscuro
        'Relajado': 'rgb(0, 128, 0)' // Verde
    };

    // Objeto para almacenar el conteo de emociones
    let emotionCounts = {};

    // Función para actualizar el gráfico
    function updateChart() {
        // Ordenar las emociones por frecuencia y tomar las 5 más altas
        const sortedEmotions = Object.entries(emotionCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // Calcular el total de las 5 emociones más frecuentes
        const totalTop5 = sortedEmotions.reduce((sum, [_, value]) => sum + value, 0);

        // Preparar los datos para Chart.js
        const labels = sortedEmotions.map(([emotion, _]) => emotion);
        const data = sortedEmotions.map(([_, value]) => (value / totalTop5) * 100);
        const colors = labels.map(label => emotionColors[label]);

        // Crear o actualizar el gráfico
        const ctx = document.getElementById('emotionChart').getContext('2d');
        if (window.myChart instanceof Chart) {
            window.myChart.data.labels = labels;
            window.myChart.data.datasets[0].data = data;
            window.myChart.data.datasets[0].backgroundColor = colors;
            window.myChart.update();
        } else {
            window.myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Emociones más frecuentes (%)',
                        data: data,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'x', // Cambiado de 'y' a 'x' para barras verticales
                    responsive: true,
                    scales: {
                        y: { // Cambiado de 'x' a 'y'
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.parsed.y.toFixed(1) + '%'; // Cambiado de 'x' a 'y'
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    // Agregar event listeners a los emoticones
    document.querySelectorAll('.emotion').forEach(emotion => {
        emotion.addEventListener('click', function() {
            const emotionName = this.title;
            emotionCounts[emotionName] = (emotionCounts[emotionName] || 0) + 1;
            updateChart();
        });
    });

    // Inicializar Flatpickr
    flatpickr("#date-picker", {
        dateFormat: "Y-m-d",
        maxDate: "today",
        disableMobile: "true",
        onChange: function(selectedDates, dateStr, instance) {
            document.getElementById('diaryText').value = '';
        }
    });
});

function formatText(command) {
    const textarea = document.getElementById('diaryText');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = '';
    switch(command) {
        case 'bold':
            formattedText = `**${selectedText}**`;
            break;
        case 'italic':
            formattedText = `*${selectedText}*`;
            break;
        case 'underline':
            formattedText = `__${selectedText}__`;
            break;
        case 'highlight':
            formattedText = `==${selectedText}==`;
            break;
    }
    
    textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start, start + formattedText.length);
}

function saveDiary() {
    const selectedDate = document.getElementById('date-picker').value;
    const diaryContent = document.getElementById('diaryText').value;
    
    if (!selectedDate) {
        alert("Por favor, selecciona una fecha antes de guardar.");
        return;
    }

    if (!diaryContent.trim()) {
        alert("Por favor, escribe algo en el diario antes de guardar.");
        return;
    }

    // Aquí implementarías la lógica para guardar en el backend
    // Por ahora, lo guardaremos en localStorage como ejemplo
    localStorage.setItem(selectedDate, diaryContent);
    
    console.log('Guardando diario para la fecha:', selectedDate);
    console.log('Contenido:', diaryContent);
    
    alert("Entrada de diario guardada con éxito.");
    
    // Borrar el contenido del área de texto después de guardar
    document.getElementById('diaryText').value = '';
}

function searchDiary() {
    const selectedDate = document.getElementById('date-picker').value;
    
    if (!selectedDate) {
        alert("Por favor, selecciona una fecha para buscar.");
        return;
    }

    // Aquí implementarías la lógica para buscar en el backend
    // Por ahora, buscaremos en localStorage como ejemplo
    const diaryContent = localStorage.getItem(selectedDate);
    
    if (diaryContent) {
        document.getElementById('diaryText').value = diaryContent;
        console.log("Entrada del diario cargada para la fecha:", selectedDate);
    } else {
        alert("No se encontró ninguna entrada para la fecha seleccionada.");
        document.getElementById('diaryText').value = '';
    }
}

// Función para cargar la entrada del diario (a implementar)
function loadDiaryEntry(date) {
    // Aquí implementarías la lógica para cargar la entrada del diario desde el backend
    console.log("Cargando entrada del diario para la fecha:", date);
    // Por ejemplo:
    // fetch(`/api/diary-entries/${date}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         document.getElementById('diaryText').value = data.content;
    //     })
    //     .catch(error => console.error('Error:', error));
}

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
