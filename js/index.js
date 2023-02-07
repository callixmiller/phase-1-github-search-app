const form = document.getElementById('github-form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(res => res.json())
    .then(data => {
        const userList = document.querySelector('#user-list')
        const repoList = document.getElementById('repos-list')
        repoList.innerHTML = ''
        userList.innerHTML = ''
        data.items.map(item => {
            const li = document.createElement('li')
            const h2 = document.createElement('h2')
            h2.textContent = item.login

            h2.addEventListener('click', e => showUserRepo(item.login, e))
            const img = document.createElement('img')
            img.src = item.avatar_url
            
            li.append(h2, img)
            userList.append(li)
        })
    })
    form.reset()
})

function showUserRepo(username, e) {
    const repoList = document.getElementById('repos-list')
    repoList.innerHTML = ''
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(data => data.map(repo => {
        const li = document.createElement('li')
        const h1 = document.createElement('h1')
        h1.textContent = repo.name
        li.append(h1)
        repoList.append(li)
    }))
}