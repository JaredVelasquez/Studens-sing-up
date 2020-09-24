firebase.initializeApp({
  apiKey: "AIzaSyCvQafAM5gHLtbOjI6AttvIrvpKgxvgQC8",
  authDomain: "tbd1-c5031.firebaseapp.com",

  projectId: "tbd1-c5031"



});
  var db = firebase.firestore();

  //Agregar documentos
  function guardar(){
    var acount = document.getElementById('acount').value
    var name = document.getElementById('name').value
    var date = document.getElementById('date').value
    var age = document.getElementById('age').value
    var career = document.getElementById('career').value
    var campus = document.getElementById('campus').value
    var time = document.getElementById('time').value
    db.collection("Student").add({
        acount: acount,
        name: name,
        date: date,
        age: age,
        career: career,
        campus: campus,
        time: time
    
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('acount').value = '';
        document.getElementById('name').value= '';
        document.getElementById('date').value= '';
        document.getElementById('age').value= '';
        document.getElementById('career').value= '';
        document.getElementById('campus').value= '';
        document.getElementById('time').value= '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
  
  //Leer documentos
  var tabla = document.getElementById('tabla');
  db.collection("Student").onSnapshot((querySnapshot) => {
    tabla.innerHTML= '';
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().name}`);
          tabla.innerHTML +=  `
                <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().acount}</td>
                <td>${doc.data().name}</td>
                <td>${doc.data().date}</td>
                <td>${doc.data().age}</td>
                <td>${doc.data().career}</td>
                <td>${doc.data().campus}</td>
                <td>${doc.data().time}</td>
                <td><button class="btn btn-outline-danger" onclick="eliminar('${doc.id}')">Delete</button></td>
                <td><button class="btn btn-outline-warning"onclick="editar('${doc.id}','${doc.data().acount}',
                '${doc.data().name}','${doc.data().date}','${doc.data().age}','${doc.data().career}',
                '${doc.data().campus}','${doc.data().time}')">Edit</button></td>
                </tr>
          `
      });
  });

  
  //Borrar documentos
  function eliminar(id){
    db.collection("Student").doc(id).delete().then(function(){
        console.log("Document successfully deleted!");
    }).catch(function(error){
        console.error("Error removing document:  ",error);
    });
  }
  //Editar docuentos
  function editar(id,acount,name,date,age,career,campus,time){
      
      document.getElementById('name').value = name;
      document.getElementById('acount').value = acount;
      document.getElementById('date').value = date;
      document.getElementById('age').value = age;
      document.getElementById('career').value = career;
      document.getElementById('campus').value = campus;
      document.getElementById('time').value = time;

      var buton = document.getElementById('boton');
      boton.innerHTML= 'Edit';

      buton.onclick = function (){
        var washintonRef = db.collection("Student").doc(id);   

        var name = document.getElementById('name').value;
        var acount = document.getElementById('acount').value;
        var date = document.getElementById('date').value;
        var age = document.getElementById('age').value;
        var career = document.getElementById('career').value;
        var campus = document.getElementById('campus').value;
        var time = document.getElementById('time').value;

        
        return washintonRef.update({
            acount: acount,
            name: name,
            date: date,
            age: age,
            career: career,
            campus: campus,
            time: time
          })
          .then(function(){
              console.log("Document successfully updated!");
              boton.innerHTML= 'Save';
              document.getElementById('acount').value = '';
              document.getElementById('name').value= '';
              document.getElementById('date').value= '';
              document.getElementById('age').value= '';
              document.getElementById('career').value= '';
              document.getElementById('campus').value= '';
              document.getElementById('time').value= '';
              buton.onclick = function(){
                guardar();
              } 
          })
          .catch(function(error){
            console.error("Error updating document:  ",error)
          });
      }
    
  }
  