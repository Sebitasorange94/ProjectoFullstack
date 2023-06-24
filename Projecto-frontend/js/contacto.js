console.log("Cargando JS")


function sendForm(){
    

    let elementos = document.getElementsByClassName("radioCheck");
    let valorSeleccionado = "";
    
    for (var i = 0; i < elementos.length; i++) {
      if (elementos[i].checked) {
        valorSeleccionado = elementos[i].value;
        break;
      }
    }
   
    let name = document.getElementById('nombreApellido');
    let mail = document.getElementById('email');
    let phone = document.getElementById('phone');
    let message = document.getElementById('mensaje');
    let contacType = valorSeleccionado;

    let user = {
    name:name.value,
    mail:mail.value,
    phone:phone.value,
    message:message.value,
    contacType:contacType
   }

   let url = "http://localhost:8000/api/contactoC";
   let params = {
       method: "post",
       headers: {
           "Content-Type": "aplication/json"
       },
       body: JSON.stringify(user),
   }

   fetch(url, params).then(response => {
    // Las siguientes dos impresiones son para verificar si se están almacenando los datos 
    //    console.log(response);
    //    console.log(response.json());
       
       if (response.status == 200) {
           alert("Creación Exitosa de usuario !!")
           document.getElementById("formulario").reset();
       } else {
           alert("Error en la creación de usuario!!");
       }
   })

   return true;
}