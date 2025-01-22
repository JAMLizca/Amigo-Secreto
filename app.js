(() => {
    const inputAmigo = document.querySelector('#amigo');
    const listaAmigos = document.querySelector('#listaAmigos');
    const amigoSecreto = document.querySelector('#resultado');
    const botonSortearAmigo = document.querySelector('#btn-sortear');
    const mensajeError = document.createElement('span');
    mensajeError.style.color = 'blue';
    mensajeError.style.fontSize = '15px';
    mensajeError.style.display = 'block';
    mensajeError.style.marginLeft = '8px';
    inputAmigo.parentElement.appendChild(mensajeError);

    let amigos = []; // Lista de amigos

    // Agregar un nuevo amigo
    const agregarAmigo = () => {
        const nombreAmigo = inputAmigo.value.trim();

        eliminarMensajeError();

        if (!nombreAmigo) {
            mostrarMensajeError('El campo es obligatorio, llenalo por favor.');
            return;
        }

        if (amigos.includes(nombreAmigo)) {
            alert('Este amigo ya está en la lista, ingresa otro.');
            return;
        }

        amigos.push(nombreAmigo);
        actualizarListaAmigos();
        inputAmigo.value = '';
    };

    // Sortear un amigo
    const sortearAmigo = () => {
        if (amigos.length === 0) {
            mostrarMensajeError('Agrega al menos un amigo antes de sortear.');
            return;
        }

        const randomIndex = Math.floor(Math.random() * amigos.length);
        amigoSecreto.textContent = `El amigo secreto es: ${amigos[randomIndex]}`;

        amigos.splice(randomIndex, 1); // Elimina al amigo sorteado
        actualizarListaAmigos();

        if (amigos.length === 0) {
            botonSortearAmigo.disabled = true;
        }
    };

   

    // Actualizar la lista de amigos en pantalla
    const actualizarListaAmigos = () => {
        listaAmigos.innerHTML = '';

        amigos.forEach(amigo => {
            const nuevoAmigo = document.createElement('li');
            nuevoAmigo.textContent = amigo;
            listaAmigos.appendChild(nuevoAmigo);
        });

        botonSortearAmigo.disabled = amigos.length === 0;
    };

    // Mostrar mensaje de error
    const mostrarMensajeError = (mensaje) => {
        mensajeError.textContent = mensaje;
        inputAmigo.classList.add('input-name-error');
    };
  
    // Eliminar mensaje de error
    const eliminarMensajeError = () => {
        mensajeError.textContent = '';
        inputAmigo.classList.remove('input-name-error');
    };

    // Eventos
    inputAmigo.addEventListener('blur', () => {
        if (!inputAmigo.value.trim()) {
            mostrarMensajeError('Ingresa un nombre de amigo.');
        } else {
            eliminarMensajeError();
        }
    });
    inputAmigo.addEventListener('focus', eliminarMensajeError);

    // Escucha el evento de tecla presionada en el input
    inputAmigo.addEventListener('keydown', (event) => {
        // Verifica si la tecla presionada es "Enter" y si el input no está vacío
        if (event.key === 'Enter' && inputAmigo.value.trim() !== '') {
            agregarAmigo(); // Llama a la función para agregar al amigo
            inputAmigo.value = ''; // Limpia el cuadro de entrada después de agregar al amigo
            event.preventDefault(); // Previnir  cualquier comportamiento extrañop del Enter
        }
    });


  window.agregarAmigo = agregarAmigo;
  window.sortearAmigo = sortearAmigo;
}) ();
