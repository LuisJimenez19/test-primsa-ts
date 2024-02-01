const $button = document.querySelector('.btn-getUsers')
const $sectionResult = document.querySelector('.section-result')

const renderAllUsers = (data) => {
  $sectionResult.innerHTML = ''
  data.forEach((user) => {
    $sectionResult.innerHTML += `
  <div class="card" id="${user.id}" >
      <h2> ${user.id}-${user.name}</h2>
      <div>
          ${
            Array.isArray(user.posts)
              ? user.posts.map((post) => {
                  return `<div>
                  <h3>${post.title}</h3>
                  <p>${post.content}</p>
              </div>`
                })
              : `<span>This user has no posts yet</span>`
          }

      </div>
  </div>
`
  })
  updateEvents()
}

const getAllUsers = () => {
  fetch('/api/user')
    .then((res) => res.json())
    .then(({ data }) => {
      renderAllUsers(data)
    })
}

$button.addEventListener('click', (e) => {
  getAllUsers()
})

function updateEvents() {
  const cardsUser = document.querySelectorAll('.card')
  cardsUser.forEach((card) => {
    card.addEventListener('click', (e) => {
      console.log(e.target.id)
    })
  })
}

/* Create user */
const $formCreateUser = document.querySelector('#form-createUser')

$formCreateUser.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = new FormData(e.target)
  const name = data.get('name')

  if (!name) {
    return alert('Name is missing')
  }
  const dataToSend = {
    name
  }
  try {
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })

    if (!res.ok) {
      const errorMsg = await res.json()
      throw new Error(errorMsg.msg)
    }

    const dataResponse = await res.json()
    console.log(dataResponse)
  } catch (error) {
    console.log(error)
    alert(error)
  }
})
