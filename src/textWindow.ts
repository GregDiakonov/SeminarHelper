import {Widget} from '@lumino/widgets'

class TextWindow extends Widget {
    constructor(name: string, texts: Array<string>) {
        super()

        this.node.style.position = 'absolute'
        this.node.style.top = '100px'
        this.node.style.left = '100px'
        this.node.style.zIndex = '9999'

        this.node.style.backgroundColor = 'white'
        this.node.style.border = '1px black solid'

        this.node.style.width = '40%'
        this.node.style.height = '40%'

        this.node.style.overflowX = 'hidden'
        this.node.style.overflowY = 'auto'

        const textMessage = document.createElement('p')
        textMessage.textContent = `Вот тексты для студента ${name.split('_').join(' ')}.`

        const closeButton = document.createElement('button')
        closeButton.textContent = 'X'
        closeButton.style.position = 'absolute'
        closeButton.style.top = '5px'
        closeButton.style.right = '5px'

        closeButton.onclick = () => {
            this.close()
        }

        this.node.appendChild(textMessage)
        this.node.appendChild(closeButton)

        texts.forEach((element: string) =>{
            const newText = document.createElement('textarea')

            newText.textContent = element
            newText.style.height = '50%'
            newText.style.overflowY = 'auto'
            newText.style.margin = '20px'

            this.node.appendChild(newText)
        })
    }
}

export default TextWindow