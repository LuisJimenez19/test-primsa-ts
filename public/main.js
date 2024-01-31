console.log('Hello there')

const $button = document.querySelector('.btn-getUsers')
const $sectionResult = document.querySelector('.section-result')

$button.addEventListener('click', (e) => {
  fetch('/api/user')
    .then((res) => res.json())
    .then(({ data }) => {
      data.forEach((user) => {
        console.log({ user })
        $sectionResult.innerHTML += `
        <div class="card" >
            <h2> ${user.id}-${user.name}</h2>
            <div>
                ${
                  Array.isArray(user.posts) &&
                  user.posts.map((post) => {
                    return `<div>
                        <h3>${post.title}</h3>
                        <p>${post.content}</p>
                    </div>`
                  })
                }

            </div>
        </div>
    `
      })
    })
})
