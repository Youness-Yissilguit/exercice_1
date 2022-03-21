//la table des utilisateurs

let users = [];
let tempUsers = [
    {
      id: "123456789",
      createdDate: "2021-01-06T00:00:00.000Z",
      status: "En validation",
      firstName: "Mohamed", 
      lastName: "Taha",
      userName: "mtaha",
      registrationNumber: "2584",
    },
     {
      id: "987654321",
      createdDate: "2021-07-25T00:00:00.000Z",
      status: "Validé",
      firstName: "Hamid",
      lastName: "Orrich",
      userName: "horrich",
      registrationNumber: "1594",
    },
    {
      id: "852963741",
      createdDate: "2021-09-15T00:00:00.000Z",
      status: "Rejeté",
      firstName: "Rachid",
      lastName: "Mahidi",
      userName: "rmahidi",
      registrationNumber: "3576",
    }
]

//les variable des elelements de DOM
const myTable = document.querySelector('.my_table_body');
const showModalBtn = document.querySelector('.add_user');
const modalContainer = document.querySelector('.modale_container');
const modal = document.querySelector('.modale');
const submitBtn = document.getElementById('submit');
let deleteBtns;
//les variables de la form
const lastName = document.getElementById('name')
const firstName = document.getElementById("first_name");
const username = document.getElementById("username");
const statu = document.getElementById("status");
const matricule = document.getElementById("matricule");
const date = document.getElementById("date");
const error = document.getElementById("error");

//afficher la modale
showModalBtn.addEventListener('click', ()=>{
    modalContainer.classList.add('show_modale')
})
modalContainer.addEventListener('click', function(){
    this.classList.remove('show_modale');
})
modal.addEventListener('click', function(e){
    e.stopPropagation();
})

//ajouter un utilisateur
submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    if (validateForm()){
        insertInfo();//inserer les valeurs
        modalContainer.classList.remove('show_modale');//cacher la modale
        afficheUsers();//afficher les utilisateurs
        error.innerHTML = '';
    }
    updateLocalStorage();
})

loadUsers();

//l'affichage initial des utilisateurs
afficheUsers();



//suupressioin des utilisateurs
myTable.addEventListener('click', function(e){
    if(e.target.classList == 'delete_btn'){
        deleteUser((e.target).dataset.id);
        afficheUsers();
        updateLocalStorage()
    }
})


/**les fonctions**/
//afficher les utilisateurs
function afficheUsers(){
    myTable.innerHTML = "";//vider la table
    for (const user of users) {
        var date = new Date (Date.parse(user.createdDate));
        var formatedDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
        myTable.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${formatedDate}</td>
                <td><span class="status ${statusClass((user.status).toLowerCase())}">${user.status}</span></td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.userName}</td>
                <td>${user.registrationNumber}</td>
                <td><img class="delete_btn" src='./assets/delete.svg' data-id='${user.id}'/></td>
            </tr> 
        `

    }
    updateLocalStorage();
}

//l'etat de l'utilisateur
function statusClass(status){
    if (status == 'en validation'){
        return 'on-validation';
    }
    else if(status == 'validé'){
        return 'valide';
    } else{
        return 'rejected';
    }
}

//la validation de la form
validateForm = ()=>{
    error.innerHTML = '';
    let usernamesRegx = /[a-zA-Z]+[a-zA-Z0-9]*/gm;
    let namesRegx = /[a-zA-Z]+/gm;
    let matriculeRegx = /[0-9]{4}/gm;
    let valide = true;
    username.classList.remove('error_input');
    firstName.classList.remove('error_input');
    lastName.classList.remove('error_input');
    matricule.classList.remove('error_input');

    if(lastName.value == '' || firstName.value == '' || username.value == '' || statu.value == '' || matricule.value == ''){
        error.innerHTML = "les entrées ne peuvent pas être vides";
        valide=  false;
    }
    else if(usernamesRegx.test(username.value) === false){
        error.innerHTML = "<br>le nome d'utilisateurs doivent respecter la forme (ex: user ou user123)";
        username.classList.add('error_input');
        valide = false;
    } 
    else if(namesRegx.test(lastName.value) === false){
        error.innerHTML = "<br>le nom doit être une  chaîne de caractère";
        lastName.classList.add('error_input');
        valide = false;
    }
    else if(namesRegx.test(firstName.value) === false){
        error.innerHTML = "<br>le prénom doit être une  chaîne de caractère(min 5)";
        firstName.classList.add('error_input');
        valide = false;
    }
    else if(!matriculeRegx.test(matricule.value)){
        error.innerHTML = "<br>le matricule doit etre un nombre de 4 chiffres";
        valide = false;
        matricule.classList.add('error_input');
    }
    return valide;
}

//inserer les données au table users
insertInfo = ()=>{
    let newUser = Object();
    newUser.id                  = Math.floor(Math.random() * 900000000) + 100000000;
    newUser.createdDate         = date.value ? date.value : new Date();
    newUser.lastName            = lastName.value;
    newUser.firstName           = firstName.value;
    newUser.userName            = username.value;
    newUser.status              = statu.value ;
    newUser.registrationNumber  = matricule.value;
    users.push(newUser);//ajouter l'utilisateur a ka table users
    console.log(newUser);
    lastName.value = firstName.value = username.value = statu.value = matricule.value = date.value = '';
}

//supprimer un utilisateurs
function deleteUser(id){
    users = users.filter(user => user.id != id);
}
function loadUsers(){
    if(localStorage["users"]){
        users = JSON.parse(localStorage["users"]);
    }else{
        localStorage.setItem("users", JSON.stringify(tempUsers));
        users = tempUsers;
    }
    console.log(localStorage["users"]);
}

function updateLocalStorage(){
    localStorage.setItem("users", JSON.stringify(users));
}
