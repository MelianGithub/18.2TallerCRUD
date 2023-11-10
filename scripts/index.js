document.addEventListener("DOMContentLoaded", () => {

    buscarID();
    eliminarUser();
    nuevoUser();
    modificarUser()

});

const url = "https://65423647f0b8287df1ffb4a9.mockapi.io/users"

let results = document.getElementById('results');

function mostrarDatos() {
    results.textContent = '';
    fetch(url)
        .then(resp => resp.json())
        .then(data => {

            data.forEach(element => {
                let li = document.createElement('li');
                let nombre = element.name;
                let apellido = element.lastname;
                let id = element.id;
                li.innerHTML = `
            <li>ID: ${id}</li>
            <li>NAME: ${nombre}</li>
            <li>LASTNAME: ${apellido}</li>                    
        `;
                results.appendChild(li);
            });
        });

}


function buscarID() {

    let buscar = document.getElementById("btnGet1");
    let input = document.getElementById('inputGet1Id');

    buscar.addEventListener('click', () => {

        results.innerText = ''

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                let resBusqueda = data.find((element) => element.id == input.value)

                if (resBusqueda) {
                    let li = document.createElement('li');
                    let nombre = resBusqueda.name;
                    let apellido = resBusqueda.lastname;
                    let id = resBusqueda.id;
                    li.innerHTML = `
                        <li>ID: ${id}</li>
                        <li>NAME: ${nombre}</li>
                        <li>LASTNAME: ${apellido}</li>                    
                        `;
                    results.appendChild(li);

                    input.value=''
                }

                else {
                    alert("El usuario no existe")
                }
                
            })

            
    })
}


function nuevoUser() {

    let agregar = document.getElementById("btnPost");
    let name = document.getElementById("inputPostNombre");
    let lastname = document.getElementById("inputPostApellido");

    function chequearInputs() {
        if (name.value !== '' && lastname.value !== '') {
            

            agregar.removeAttribute('disabled')
        } else {
            agregar.setAttribute('disabled', true)
        }
    }

    name.addEventListener('input', chequearInputs)
    lastname.addEventListener('input', chequearInputs)



    agregar.addEventListener("click", () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                lastname: lastname.value
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                mostrarDatos();
            })

        name.value = '';
        lastname.value = '';
        chequearInputs();

    });

}

function modificarUser() {
    let nameModal = document.getElementById("name");
    let lastNameModal = document.getElementById("lastname");
    let btnModificarPut = document.getElementById("btnModificarPut");

    let modificar = document.getElementById("btnPut");
    let modInput = document.getElementById("inputPutId");

    modInput.addEventListener('input', () => {
        if (modInput.value !== '') {
            modificar.removeAttribute('disabled')
        } else {
            modificar.setAttribute('disabled', true)
        }
    })

    modificar.addEventListener("click", () => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                let res = data.find((element) => element.id == modInput.value)

                if (res) {
                    
                    nameModal.value = res.name;
                    lastNameModal.value = res.lastname;

                    // Evento para modificar los datos
                    btnModificarPut.addEventListener('click', () => {
                        fetch(url + `/${modInput.value}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: nameModal.value,
                                lastname: lastNameModal.value
                            })
                        })
                            .then(resp => resp.json())
                            .then(data => {
                                alert('Datos actualizados')
                            })
                            .catch(error => {
                                console.error('Error al actualizar los datos:', error);
                            });
                    });
                } else {
                    nameModal.value = '';
                    lastNameModal.value = '';
                }
            })
    });
}


function eliminarUser() {
    let borrar = document.getElementById("btnDelete");
    let delInput = document.getElementById("inputDelete");

function check(){
    if (delInput.value !== '') {
        borrar.removeAttribute('disabled');
    } else {
        borrar.setAttribute('disabled', true);
    }
}

    delInput.addEventListener('input',check);

    borrar.addEventListener("click", () => {
        fetch(url + "/" + delInput.value, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('No se pudo eliminar el usuario');
            }
            return resp.json();
        })
        .then(data => {
            if (data) {
                console.log(data);
                mostrarDatos();
            } 
        })
        .catch(error => {
            alert('No se encuentra el usuario');
        });

        delInput.value = '';
        check()
    });
}






