const galleryElem = document.querySelector('#grid-gallery')
const buttonElem = document.querySelector('#get-images')
const statusElem = document.querySelector('#status-msg') 
const errorElem = document.querySelector('#error-msg')

buttonElem.addEventListener('click', async () => {
    // Get and validate user data
    const query = document.querySelector('[name=query]').value
    const count = +document.querySelector('[name=count]').value
    const level = +document.querySelector('[name=level]').value
    
    if (!query) return displayError('Query string is empty.')
    
    // Request and validate the images from the backend
    displayStatus(`Loading... (~${formatTime(level * 9)})`)
    
    const request = await fetch(`/images?query=${query}&count=${count}&level=${level}`)
    const body = await request.json()
    
    statusElem.parentNode.classList.add('hidden')
    
    if (!body?.OK || !body?.data?.length) return displayError('Something went wrong... Try again later.')
    
    // Display the images
    galleryElem.parentNode.classList.remove('hidden')
    galleryElem.innerHTML = ''
    body.data.map(displayImage)
})

function displayStatus(msg) {
    statusElem.innerText = msg
    statusElem.parentNode.classList.remove('hidden')
}

function displayError(msg) {
    errorElem.innerText = msg
    errorElem.parentNode.classList.remove('hidden')
    setTimeout(() => errorElem.parentNode.classList.add('hidden'), 2000)
}

function displayImage(src) {
    galleryElem.innerHTML += `<img src="${src}">`
}

function formatTime(sec) {
    const min = Math.floor(sec / 60)
    return `${min.toString().padStart(2, 0)}:${(sec - min * 60).toString().padStart(2, 0)}`
}