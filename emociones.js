document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo (deberías reemplazar esto con datos reales de tu backend)
    const emotionData = {
        'Feliz': 30,
        'Triste': 15,
        'Enojado': 20,
        'Ansioso': 25,
        'Calmado': 10
    };

    // Preparar los datos para Chart.js
    const labels = Object.keys(emotionData);
    const data = Object.values(emotionData);

    // Calcular el total para obtener porcentajes
    const total = data.reduce((a, b) => a + b, 0);
    const dataPercentages = data.map(value => ((value / total) * 100).toFixed(1));

    // Crear el gráfico
    const ctx = document.getElementById('emotionChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Emociones de la semana (%)',
                data: dataPercentages,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
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
                            return context.parsed.y + '%';
                        }
                    }
                }
            }
        }
    });

    // Inicializar Flatpickr
    flatpickr("#date-picker", {
        dateFormat: "Y-m-d", // Cambiado para un formato más estándar
        maxDate: "today",
        disableMobile: "true",
        onChange: function(selectedDates, dateStr, instance) {
            // Limpiar el área de texto cuando se selecciona una nueva fecha
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
