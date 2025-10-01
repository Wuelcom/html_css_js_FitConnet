// Cálculo y actualización del IMC
function calculateIMC() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    
    if (weight && height) {
        const imc = (weight / (height * height)).toFixed(2);
        document.getElementById('imcValue').textContent = imc;
        
        // Actualizar categoría
        let category = '';
        let position = 0;
        
        if (imc < 18.5) {
            category = 'Bajo Peso';
            position = (imc / 18.5) * 25;
        } else if (imc < 25) {
            category = 'Peso Normal';
            position = 25 + ((imc - 18.5) / (25 - 18.5)) * 25;
        } else if (imc < 30) {
            category = 'Sobrepeso';
            position = 50 + ((imc - 25) / (30 - 25)) * 25;
        } else {
            category = 'Obesidad';
            position = 75 + Math.min(((imc - 30) / 10) * 25, 25);
        }
        
        document.getElementById('imcCategory').textContent = category;
        document.getElementById('imcIndicator').style.left = position + '%';
        
        return parseFloat(imc);
    }
    return null;
}

// Actualizar estadísticas en tiempo real
function updateStats() {
    document.getElementById('streakDisplay').textContent = document.getElementById('streak').value;
    document.getElementById('repsDisplay').textContent = document.getElementById('reps').value;
    document.getElementById('achievementsDisplay').textContent = document.getElementById('achievements').value;
    const minutes = document.getElementById('hours').value;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    document.getElementById('hoursDisplay').textContent = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

// Preview de imagen
document.getElementById('photoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImg').src = e.target.result;
            document.getElementById('profileImg').style.display = 'block';
            document.getElementById('photoPlaceholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Event listeners para actualización en tiempo real
document.getElementById('weight').addEventListener('input', calculateIMC);
document.getElementById('height').addEventListener('input', calculateIMC);
document.getElementById('streak').addEventListener('input', updateStats);
document.getElementById('reps').addEventListener('input', updateStats);
document.getElementById('achievements').addEventListener('input', updateStats);
document.getElementById('hours').addEventListener('input', updateStats);

// Envío del formulario
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Calcular el IMC actual
    const currentIMC = calculateIMC();
    
    // Agregar el nuevo registro al historial
    if (currentIMC) {
        addIMCRecord(currentIMC);
    }
    
    // Aquí iría la lógica para enviar los datos al servidor
    const formData = {
        username: document.getElementById('username').value,
        gender: document.getElementById('gender').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        age: document.getElementById('age').value,
        sleep: document.getElementById('sleep').value,
        water: document.getElementById('water').value,
        email: document.getElementById('email').value,
        streak: document.getElementById('streak').value,
        reps: document.getElementById('reps').value,
        achievements: document.getElementById('achievements').value,
        hours: document.getElementById('hours').value,
        goals: document.getElementById('goals').value,
        notes: document.getElementById('notes').value,
        imc: currentIMC,
        imcHistory: imcHistory
    };
    
    console.log('Datos a guardar:', formData);
    
    // Mostrar mensaje de éxito
    const successMsg = document.getElementById('successMessage');
    successMsg.classList.add('show');
    
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 3000);
});

// Inicializar
calculateIMC();
updateStats();
createIMCChart();

// Gestión del historial de IMC (almacenado en memoria durante la sesión)
let imcHistory = [
    { date: '2024-09-01', value: 24.2 },
    { date: '2024-09-15', value: 23.8 },
    { date: '2024-10-01', value: 23.51 }
];

let imcChart = null;

// Función para crear el gráfico de IMC
function createIMCChart() {
    const ctx = document.getElementById('imcChart').getContext('2d');
    
    // Preparar datos para el gráfico
    const labels = imcHistory.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    });
    
    const data = imcHistory.map(item => item.value);
    
    // Destruir gráfico anterior si existe
    if (imcChart) {
        imcChart.destroy();
    }
    
    // Crear nuevo gráfico
    imcChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'IMC',
                data: data,
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#7c3aed',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#2a2a2a',
                    titleColor: '#fff',
                    bodyColor: '#aaa',
                    borderColor: '#7c3aed',
                    borderWidth: 2,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'IMC: ' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 15,
                    max: 35,
                    grid: {
                        color: '#4a4a4a',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#aaa',
                        font: {
                            size: 12
                        }
                    },
                    // Líneas de referencia para las categorías
                    afterDataLimits: function(scale) {
                        scale.max = 35;
                        scale.min = 15;
                    }
                },
                x: {
                    grid: {
                        color: '#4a4a4a',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#aaa',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            // Líneas horizontales para las categorías de IMC
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: 18.5,
                        yMax: 18.5,
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        borderDash: [5, 5]
                    },
                    line2: {
                        type: 'line',
                        yMin: 25,
                        yMax: 25,
                        borderColor: '#10b981',
                        borderWidth: 1,
                        borderDash: [5, 5]
                    },
                    line3: {
                        type: 'line',
                        yMin: 30,
                        yMax: 30,
                        borderColor: '#eab308',
                        borderWidth: 1,
                        borderDash: [5, 5]
                    }
                }
            }
        }
    });
}

// Función para agregar un nuevo registro de IMC
function addIMCRecord(imc) {
    const today = new Date().toISOString().split('T')[0];
    
    // Verificar si ya existe un registro de hoy
    const todayIndex = imcHistory.findIndex(item => item.date === today);
    
    if (todayIndex !== -1) {
        // Actualizar el registro existente
        imcHistory[todayIndex].value = imc;
    } else {
        // Agregar nuevo registro
        imcHistory.push({
            date: today,
            value: imc
        });
    }
    
    // Mantener solo los últimos 10 registros
    if (imcHistory.length > 10) {
        imcHistory = imcHistory.slice(-10);
    }
    
    // Actualizar el gráfico
    createIMCChart();
}