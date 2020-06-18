class UI{

    constructor(){
        this.userDiv = document.getElementById("userDiv");
        this.repoList = document.getElementById("repoList");
        this.searchInput = document.getElementById("searchBox");
        this.lastUsers = document.getElementById("recentUsers");
        this.cardBody = document.querySelector(".card");
    }

    clearInput(){
        this.searchInput.value = "";
    }


    showUserInfo(user){
        this.userDiv.innerHTML = `
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-4 pl-2 pt-2 pb-2">
              <img src="${user.avatar_url}" class="card-img" alt="user_image" style="width: 18rem;"><br>
              <hr>
            <div><strong>${user.name}</strong></div>
            <hr>
            <div class="text-muted">${user.bio}</div>            
          </div>
            <div class="col-md-8">
              <div class="card-body">
              <div>
                <button type="button" class="btn btn-primary">
                  Following: <span class="badge badge-light">${user.following}</span>
                </button>
                <button type="button" class="btn btn-secondary">
                  Followers: <span class="badge badge-light">${user.followers}</span>
                </button>
                <button type="button" class="btn btn-dark">
                  Repos: <span class="badge badge-light">${user.public_repos}</span>
                </button>
              </div> <hr><br>               
              <span><img src="images/user.png" alt="user_icon" style="width: 30px;margin-right: 1rem;"></span><span>@${user.login}</span><br><br> 
              <span><img src="images/mail.png" alt="mail_icon" style="width: 30px;margin-right: 1rem;"></span><span>${user.email}</span><br><br>                
              <span><img src="images/location.png" alt="location_icon" style="width: 30px;margin-right: 1rem;"><span>${user.location}</span></span>                               
              </div>
            </div>
          </div>
        </div>
        
        ` 
    }

    showError(message){
        const div = document.createElement("div");

        div.className = "alert alert-danger";
        div.textContent = message;
        div.setAttribute("role","alert");
        this.cardBody.appendChild(div);

        setTimeout(()=>{
            div.remove();
        },3000)
    }

    showRepoInfo(repos){
        console.log(repos);
        this.repoList.innerHTML = "";

        repos.forEach(repo=>{
            this.repoList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              <span>
              <button type="button" class="btn btn-warning">
                Star <span class="badge badge-light">${repo.stargazers_count}</span>
              </button>  
              <button type="button" class="btn btn-info">
                Fork <span class="badge badge-light">${repo.forks}</span>
              </button>
              <button type="button" class="btn btn-dark">
                Language <span class="badge badge-light">${repo.language}</span>
              </button>     
            </span>          
            </li>
            `;
        })
    }

    addSearchedUserToUI(username){
        let users = Storage.getSearchedUsersFromStorage();
        if(users.indexOf(username)===-1){
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;

            this.lastUsers.appendChild(li);

        }
    }

    clearAllSearchedUsersFromUI(){
        while(this.lastUsers.firstElementChild !== null){
            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    }

    hideElements(){
        document.getElementById("repoLabel").style.display = "none";
        document.getElementById("recentLabel").style.display = "none";
        document.getElementById("clearBtn").style.display = "none";
    }

    showElements(){
        document.getElementById("repoLabel").style.display = "block";
        document.getElementById("recentLabel").style.display = "block";
        document.getElementById("clearBtn").style.display = "block";
    }
}