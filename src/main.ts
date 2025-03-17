import './style.css'
import docs from './docs/docs.json'

const app: HTMLElement | null = document.getElementById("app")
const buttonGroup: HTMLElement | null = document.getElementById("button-group")

function renderButtons() {
  for (let field in docs) {
    const outerKey = field as keyof typeof docs
    const li = document.createElement("li")
    li.className = "nav-item col"
    const button = document.createElement("button")
    button.id = outerKey
    button.className = "btn btn-outline-dark text-white"
    button.addEventListener("click", buttonEventListener)
    button.append(outerKey)
    li.append(button)
    buttonGroup?.append(li)
  }
}

renderButtons()

function buttonEventListener(event: MouseEvent) {
  while (app?.firstChild) {
    app.removeChild(app.lastChild as Node)
  }
  const target = event.target as HTMLButtonElement
  renderSection(target.id as keyof typeof docs)
}

function renderSection(outerKey: keyof typeof docs) {
  const innerObj = docs[outerKey];

  for (const data in innerObj) {
    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const innerKey = data as keyof typeof innerObj;
    const iframe = document.createElement("iframe")
    h3.append(innerKey)
    iframe.src = innerObj[innerKey]
    div.append(h3, iframe)
    app?.append(div)
  }
}
