console.log("Cargando JS")

document.getElementById("muestraId").readOnly = true;

function saveUser() {


    let elementos = document.getElementsByClassName("radioCheck");
    let valorSeleccionado = "";

    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].checked) {
            valorSeleccionado = elementos[i].value;
            break;
        }
    }
    // let verId = document.documentElementbyId('retornoId');
    let name = document.getElementById('nombreApellido');
    let radio = valorSeleccionado
    let numId = document.getElementById('numeroId');
    let phone = document.getElementById('phone');
    let mail = document.getElementById('mail');
    let profession = document.getElementById('profession');
    let userType = document.getElementById('rol');

    if (name.value === "" || radio.value === "" || numId.value === "" || phone.value === "" || mail.value === "" || profession.value === "" || userType.value === "") {
        alert("Por favor, complete todos los campos del formulario.");
        return;
    }

    console.log("Formulario enviado");


    let user = {
        name: name.value,
        tipoId: valorSeleccionado,
        numId: parseInt(numId.value),
        phone: phone.value,
        mail: mail.value,
        profession: profession.value,
        userType: userType.value

    }

    console.log(user);

    let url = "http://localhost:8000/api/userC";
    let params = {
        method: "post",
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify(user),
    }

    fetch(url, params).then(response => {

        console.log(response);
        console.log(response.json());
        
        if (response.status == 200) {
            alert("Creación Exitosa de usuario !!")
            document.getElementById("formulario2").reset();
        } else {
            alert("Error en la creación de usuario!!");
        }
    })

    return true;

}



// FunSión Consultar Usuario

function getUser() {
    let textarea = document.getElementById("textoRespuesta");
    textarea.value = "";
    console.clear();
    let peticionId = document.getElementById("retornoId").value;
    let url = "http://localhost:8000/api/userR" + "?id=" + peticionId;
    let params = {
        method: "GET",
        headers: {
            "Content-Type": "aplication/json"
        }
    }

    if (peticionId) {
        // Obtener valores cuando le damos ID
        fetch(url, params)
        .then(response => response.json())
        .then(data => {
            let idDb = data.id;
            let name = data.name;
            let tipoId = data.tipoId;
            let numId = data.numId;
            let phone = data.phone;
            let mail = data.mail;
            let profession = data.profession;
            let userType = data.userType;
            

            // Enviar datos a la caja de texto para ser visualizados
            usuario ="Nombre: " + name +'\n'+ "Tipo ID: " + tipoId +'\n'+ "Número ID: " + numId  +'\n'+ "Teléfono: " + phone +'\n'+ "Correo electrónico: " + mail +'\n'+ "Profesión: " + profession +'\n'+ "Tipo de usuario: " + userType;
            document.getElementById("textoRespuesta").value = "Usuario individual consultado y puesto en la columna izquierda por si quieres actualizar";
            console.log(usuario);
            
            document.getElementById("muestraId").value = idDb;
            document.getElementById("nombreApellido").value = name;
            switch(tipoId){
                case 'TI':
                    let radioTarjetaIdentidad = document.getElementById("radioTarjetaIdentidad");
                    if (radioTarjetaIdentidad !== null) {
                        radioTarjetaIdentidad.checked = true;
                    }   
                break;

                case 'CC':
                let radioCedula = document.getElementById("radioCedula");
                if (radioCedula !== null) {
                    radioCedula.checked = true;
                }
                break;

                case 'CE':
                    let radioExtranjero = document.getElementById("radioExtranjero");
                    if (radioExtranjero !== null) {
                        radioExtranjero.checked = true;
                    }
                break;

                case 'Pasaporte':
                    let pasaporte = document.getElementById("radioPasaporte");
                    if (pasaporte !== null) {
                        pasaporte.checked = true;
                    }
                break;

            }
            document.getElementById("nombreApellido").value = name;
            document.getElementById("numeroId").value = numId;
            document.getElementById("phone").value = phone;
            document.getElementById("mail").value = mail;
            document.getElementById("profession").value = profession;
            document.getElementById("rol").value = userType;
           

        })
        .catch(error => {
            console.error('Error al leer el archivo JSON:', error);
        });


    } else {
        fetch(url, params)
    .then(response => response.json())
    .then(data => {
        let texto = ""; // Variable auxiliar para almacenar los valores de los objetos

        // Recorriendo los datos
        data.forEach((objeto) => {
            // Seleccionar los campos deseados
            const camposDeseados = ['id','name', 'numId', 'tipoId', 'phone', 'mail', 'profession', 'userType'];

            // Definir la correspondencia entre los nombres actuales y los nombres deseados
            const nombresDeseados = {
                name: "Nombre",
                numId: "Número de ID",
                tipoId: "Tipo de ID",
                phone: "Teléfono",
                mail: "Correo electrónico",
                profession: "Profesión",
                userType: "Tipo de usuario"
            };

            for (let clave in objeto) {
                if (objeto.hasOwnProperty(clave) && camposDeseados.includes(clave)) {
                    let valor = objeto[clave];

                    // Obtener el nombre deseado correspondiente a la clave
                    let nombreDeseado = nombresDeseados[clave] || clave;

                    console.log(nombreDeseado + ': ' + valor );
                    
                    texto += nombreDeseado + ': ' + valor + '\n'; // Concatenar clave y valor al texto
                }
                
            }
            console.log('--------------------------------');
            texto += '---\n'; // Agregar línea separadora

        });

        // Asignar la cadena de texto al textarea
        document.getElementById("textoRespuesta").value = texto;
    })
    .catch(error => {
        console.error('Error al leer el archivo JSON:', error);
    });
    }
    return true;

}



function updateUser() {
    let elementos = document.getElementsByClassName("radioCheck");
        let valorSeleccionado = "";
    
        for (let i = 0; i < elementos.length; i++) {
            if (elementos[i].checked) {
                valorSeleccionado = elementos[i].value;
                break;
            }
        }
  
    let userId = document.getElementById("retornoId").value;
    let name = document.getElementById('nombreApellido').value;
    let tipoId = valorSeleccionado
    let numId = document.getElementById('numeroId').value;
    let phone = document.getElementById('phone').value;
    let mail = document.getElementById('mail').value;
    let profession = document.getElementById('profession').value;
    let userType = document.getElementById('rol').value;
  
    // Crear el objeto con los datos del usuario a actualizar
    let user = {
      name: name,
      tipoId: tipoId,
      numId: parseInt(numId),
      phone: phone,
      mail: mail,
      profession: profession,
      userType: userType
    };
    ;
    // Realizar la solicitud PATCH
    fetch(`http://localhost:8000/api/userU?id=${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user), 
      
    })
      .then(response => {
        if (response.status === 200) {
            
                alert("Actualización Exitosa del usuario!!");
                location.reload();
                
                
            
        } else {
          alert("Error en la actualización del usuario!!");
        }
      })

      .catch(error => {
        console.error("Error:", error);
      });

      
  }




// Eliminar usuario
function deleteUser() {
    const url = "http://localhost:8000/api/userD?id=";
    const registroId = document.getElementById("retornoId").value;
  
      fetch(url+registroId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert("Eliminación exitosa!");
        })
        .catch(error => {
          console.error('Error:', error);
        });

  }