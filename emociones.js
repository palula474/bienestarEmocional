document.addEventListener('DOMContentLoaded', () => {
    const emotions = document.querySelectorAll('.emotion');
    const chartContainer = document.querySelector('#weekly-chart');

    // Simulación de datos de emociones de la semana (reemplazar con datos reales en una aplicación completa)
    let weeklyEmotions = {};

    // Crear el gráfico de barras inicial
    createWeeklyChart();

    // Evento de clic para las emociones
    emotions.forEach(emotion => {
        emotion.addEventListener('click', () => {
            const emotionName = emotion.getAttribute('data-emotion');
            
            // Incrementar el contador de la emoción
            weeklyEmotions[emotionName] = (weeklyEmotions[emotionName] || 0) + 1;
            
            updateWeeklyChart();
            alert(`Has seleccionado: ${emotion.querySelector('span').textContent}`);
        });
    });

    // Función para crear el gráfico de barras
    function createWeeklyChart() {
        chartContainer.innerHTML = ''; // Limpiar el contenedor

        const sortedEmotions = Object.entries(weeklyEmotions)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5); // Tomar solo las 5 emociones más frecuentes

        const totalSelections = sortedEmotions.reduce((sum, [_, value]) => sum + value, 0);

        const chartWrapper = document.createElement('div');
        chartWrapper.className = 'chart-wrapper';

        sortedEmotions.forEach(([emotion, value]) => {
            const percentage = (value / totalSelections) * 100;

            const emotionContainer = document.createElement('div');
            emotionContainer.className = 'emotion-bar';

            const emotionImg = document.createElement('img');
            emotionImg.src = `imagenes/emoticones/${emotion}.png`;
            emotionImg.alt = emotion;
            emotionImg.className = 'emotion-icon';

            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';

            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${percentage}%`;

            const percentageText = document.createElement('span');
            percentageText.className = 'percentage';
            percentageText.textContent = `${percentage.toFixed(1)}%`;

            bar.appendChild(percentageText);
            barContainer.appendChild(bar);

            emotionContainer.appendChild(emotionImg);
            emotionContainer.appendChild(barContainer);

            chartWrapper.appendChild(emotionContainer);
        });

        chartContainer.appendChild(chartWrapper);
    }

    // Función para actualizar el gráfico de barras
    function updateWeeklyChart() {
        createWeeklyChart(); // Recrear el gráfico con los datos actualizados
    }

    // Aquí puedes agregar la lógica para el calendario y el diario
    const saveBtn = document.querySelector('.save-btn');
    const diaryEntry = document.querySelector('.diary-entry textarea');

    saveBtn.addEventListener('click', () => {
        alert('Entrada guardada: ' + diaryEntry.value);
        diaryEntry.value = '';
    });
});
