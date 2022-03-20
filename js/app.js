
let users = [
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

//afficher lkes utilisateurs
afficheUsers = () =>{
    for (const user of users) {
        console.log(user);

        myTable.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.createdDate}</td>
                <td><span class="status ${statusClass((user.status).toLowerCase())}">${user.status}</span></td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.userName}</td>
                <td>${user.registrationNumber}</td>
                <td class="delete" data-id='${user.id}'>delete</td>
            </tr> 
        `
    }
}
statusClass = (status) =>{
    if (status == 'en validation'){
        return 'on-validation';
    }
    else if(status == 'validé'){
        return 'valide';
    } else{
        return 'rejected';
    }
}
afficheUsers();