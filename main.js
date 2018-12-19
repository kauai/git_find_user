const search = document.getElementById('search')
const profile = document.querySelector('#profile')
const url = `https://api.github.com/users`;
const clientId = `17d5208e8e1e26e998ae`
const clientSecret = `1ab37c14430349fc03dae06804f2ab1e7c052391`

// const getUser = async (user) => {
//     const http = `${url}/${user}?client_id=${clientId}&client_ecret=${clientSecret}`

//     return (typeof user == 'string' && user.length) 
//     ? await (await fetch(http)).json()
//     :"O user passado tem ser uma string"
// }


const getUser = async user => {
    const http = `${url}/${user}?client_id=${clientId}&client_ecret=${clientSecret}`
    const http2 =`${url}/${user}/repos?per_page=5&sort:created_asc&client_id=${clientId}&client_secret=${clientSecret}`
    const repoUser = (typeof user == 'string' && user.length) 
    ? await (await fetch(http)).json()
    :"O user passado tem ser uma string";

    const reposResponse = await (await fetch(http2)).json();
    return {
        repoUser,
        reposResponse
    }
}


const showProfile = (user) => {
   let avatar = user.avatar_url
//    setTimeout(() => {
//        avatar = user.avatar_url
//        profile.innerHTML = ` <div class="container animate">
//        <div class="row">
//            <div class="col-md-4">
//                <div class="card" style="">
//                    <img src="${avatar ? avatar :'Round.gif'}" alt="" class="card-img-top">
//                    <ul class="list-group list-group-flush">
//                    <li class="list-group-item">Repositorios<span class="badge badge-success">${user.public_repos}</span></li>
//                    <li class="list-group-item">Followers<span class="badge badge-primary">${user.followers}</span></li>
//                    <li class="list-group-item">Following<span class="badge badge-info">${user.following}</span></li>
//                    </ul>
//                    <div class="card-body">
//                        <a href="${user.html_url}" class="btn btn-warning btn-block">Ver perfil</a>
//                    </div>
//                </div>
//            </div>
//            <div class="col-md-8">
//                <div id="repos">
//                </div>
//            </div>
//        </div>
//    </div> `
//    },2000)
   profile.innerHTML = ` <div class="container animate">
        <div class="row">
            <div class="col-md-4">
                <div class="card" style="">
                    <img src="${avatar ? avatar :'Round.gif'}" alt="" class="card-img-top">
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Repositorios<span class="badge">${user.public_repos}</span></li>
                    <li class="list-group-item">Followers<span class="badge">${user.followers}</span></li>
                    <li class="list-group-item">Following<span class="badge">${user.following}</span></li>
                    </ul>
                    <div class="card-body">
                        <a id="link" href="${user.html_url}" class="btn btn-warning btn-block">Ver perfil</a>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div id="repos">
                </div>
            </div>
        </div>
    </div> `
}


const showRepos = (values) => {
    console.log(values)
   let output = ''
   values.forEach(value => {
    output += ` <div class="card card-body-mb-2" style="margin-bottom:10px;">
    <div class="row" style="padding:10px;">
        <div class="col-md-6">
            <a href="${value.html_url}">Nome: ${value.name}</a>
            <div class="col-md-6">
                <span class="badge badge-primary">Stars: ${value.stargazers_count}</span><br>
                <span class="badge badge-success">Watch: ${value.watchers_count}</span><br>
                <span class="badge badge-info">Forks: ${value.forks_count}</span>
            </div>
        </div>
        </div>
    </div>`
   })
    document.querySelector('#repos').innerHTML = output
   
}

// search.onchange = function(e){
//     console.log(e.target.value)
// }

search.addEventListener('change', (e) => {
     getUser(e.target.value)
     .then(item => {
          console.log(item)
          showProfile(item.repoUser)
          showRepos(item.reposResponse)
     })
     e.target.value = ""
})