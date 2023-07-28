class CustomSelect {
  #id
  #options
  #selectButton
  #ulList
  #mainContainer
  #currentSelectedOption

  static #defaultID() {
    return '123'
  }

  static #defaultText = {
    selectItems: 'Выберите Элемент',
  }

  constructor(id, options) {
    this.#id = id || CustomSelect.#defaultID()
    this.#options = options
    this.#selectButton = document.createElement('button')
    this.#ulList = document.createElement('ul')
    this.#mainContainer = document.createElement('div')
    this.#currentSelectedOption = null
  }

  #createButtonElt() {
    //Button Select
    this.#selectButton.className = `select-dropdown__button--${this.#id}`
    this.#selectButton.classList.add('select-dropdown__button')
    const buttonSpan = document.createElement('span')
    buttonSpan.innerText = CustomSelect.#defaultText.selectItems

    this.#selectButton.append(buttonSpan)
  }

  #createListElts() {
    //List elements
    this.#ulList.className = `select-dropdown__list--${this.#id}`
    this.#ulList.classList.add('select-dropdown__list')
    //All List Items
    this.#options.forEach(({ value, text }) => {
      const listElt = document.createElement('li')
      listElt.className = 'select-dropdown__list-item'
      listElt.dataset.value = value
      listElt.textContent = text
      this.#ulList.append(listElt)
    })
  }

  get getULClass() {
    return this.#ulList.classList.contains('active')
  }

  get #currentSelect() {
    return this.#currentSelectedOption
  }

  ////EVENT
  #eventActiveUL() {
    this.#ulList.classList.toggle('active')
  }

  #eventSelectedOption(event) {
    const { target } = event
    if (target.localName === 'li') {
      this.#currentSelectedOption = target.dataset.value
    }

    this.#renderChoise()
  }

  #renderChoise() {
    const chosenLI = this.#options.findIndex(({ value, text }) => {
      return value.toString() === this.#currentSelect
    })
    if (chosenLI > -1) {
      const { value, text } = this.#options[chosenLI]
      this.#selectButton.firstChild.innerText = text
    }
    this.#eventActiveUL()
  }

  ////
  render(container) {
    this.#createButtonElt()
    this.#createListElts()

    this.#mainContainer.className = 'select-dropdown'
    this.#mainContainer.classList.add(`select-dropdown--${123}`)
    this.#mainContainer.append(this.#selectButton, this.#ulList)

    if (container && this.#options.length) {
      container.append(this.#mainContainer)
      this.#selectButton.addEventListener(
        'click',
        this.#eventActiveUL.bind(this)
      )
      this.#ulList.addEventListener(
        'click',
        this.#eventSelectedOption.bind(this)
      )
    }
  }
}

const options = [
  { value: 1, text: 'JavaScript' },
  { value: 2, text: 'NodeJS' },
  { value: 3, text: 'ReactJS' },
  { value: 4, text: 'HTML' },
  { value: 5, text: 'CSS' },
]

const customSelect = new CustomSelect('123', options)
const mainContainer = document.querySelector('#container')
customSelect.render(mainContainer)

const bodyTag = document.querySelector('body')
const ulList = document.querySelector('ul')

bodyTag.addEventListener('click', (event) => {
  const { target } = event
  if (target.localName === 'body') {
    if (customSelect.getULClass) {
      ulList.classList.remove('active')
    }
  }
})

/////////////////////////////////////////////
