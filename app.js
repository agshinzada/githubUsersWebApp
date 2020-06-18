const githubForm = document.getElementById("github-form");
const searchInput = document.getElementById("searchBox"); 
const searchBtn = document.getElementById("searchBtn");
const clearUsers = document.getElementById("clearBtn");
const recentUsers = document.getElementById("recentUsers")
const github = new Github();
const ui = new UI();


eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",searchUser);
    clearUsers.addEventListener("click",clearHistory);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}


function searchUser(e){
    let username = searchInput.value;
    if(username===""){
        ui.showError("*Field are required.")
    } else{
        github.getGithubUserData(username)
        .then(response =>{
            if(response.user.message === "Not Found"){
                ui.showError("Username not found");
            }else{           
                ui.showElements();     
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();
    e.preventDefault();
}

function clearHistory(){
if(confirm("Are you sure?")){
    Storage.clearAllSearchedUsersFromStoraged();
    ui.clearAllSearchedUsersFromUI();
}
}

let result = "";
function getAllSearched(){
    ui.hideElements();
    let users = Storage.getSearchedUsersFromStorage();
    users.forEach(user=>{
        result += `<li class="list-group-item">${user}</li>`
    })

    recentUsers.innerHTML = result;


}
