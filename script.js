const buttons = document.querySelectorAll('[data-carousel-button]')
const nameBox = document.querySelector('.name')

let audioContext = new AudioContext()

function sound() {
  let osc = audioContext.createOscillator()
  osc.type = 'sine'
  osc.start(audioContext.currentTime + 10)
  osc.stop(audioContext.currentTime + 11)
  osc.connect(audioContext.destination)
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    nameBox.innerText = ''
    const offset = button.dataset.carouselButton === 'next' ? 1 : -1
    const slides = button
      .closest('[data-carousel]')
      .querySelector('[data-slides]')

    const activeSlide = slides.querySelector('[data-active]')
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active

    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }

    sound()

    const nameText = slides.children[newIndex].children[0].id
    setTimeout(() => {
      nameBox.innerText = nameText
    }, 10000)
  })
})
