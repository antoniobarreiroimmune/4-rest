fetch('http://localhost:3000/personas')
    .then(response => response.json())
    .then(data => {
        const lista = document.getElementById('lista-personas');
        data.forEach(persona => {
            const item = document.createElement('li');
            item.textContent = `${persona.nombre} ${persona.apellido} - Edad: ${persona.edad}`;
            lista.appendChild(item);
        });
    })
    .catch(error => console.error('Error:', error));
