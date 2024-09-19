import {Widget} from "@lumino/widgets";
import { registerSeminar, updateStudentList, seeTexts } from "./http";
import TextWindow from "./textWindow";

class TeacherInterface extends Widget {
    isCollapsed = false;
    students = new Map()
    seminarNumber = 0

    constructor() {
        super();
        this.node.style.position = 'absolute';
        this.node.style.top = '20px';
        this.node.style.right = '20px';
        this.node.style.zIndex = '9999';

        this.node.style.backgroundColor = 'white';
        this.node.style.border = "1px solid black";

        this.node.style.width = "40%";
        this.node.style.height = '20%';

        this.node.style.padding = '20px';

        this.renderMenu()
        this.renderCollapseButton()
    }

    renderMenu() {
        this.node.innerHTML = '';

        const welcomeText = document.createElement('p');
        welcomeText.textContent = "Добро пожаловать! Нажмите на кнопку \'начать семинар\', затем сообщите студентам номер семинара, чтобы они смогли подключиться.";

        const startButton = document.createElement('button');
        startButton.textContent = "Начать семинар"

        startButton.onclick = async () => {
            await registerSeminar()

            this.renderTracking();
        }

        this.node.appendChild(welcomeText);
        this.node.appendChild(startButton);
    }

    async renderTracking() {
        this.node.innerHTML = '';

        const hint = document.createElement('p')
        hint.textContent = 'Здесь будут показаны позиции учеников в документах и кнопки, позволяющие просмотреть их текущую выбранную клетку'
        
        this.renderCollapseButton()
        this.node.appendChild(hint)

        this.renderSliders()
    }

    async renderSliders() {
        let servResult = await updateStudentList()

        servResult.forEach((value: number, key: string) => {
            let slider = document.getElementById(key + "slider")

            if (!slider) {
                const newCaption = document.createElement('div')
                newCaption.textContent = `${key.split('_').join(' ')}`

                const newSlider = document.createElement('input')
                newSlider.type = 'range'
                newSlider.min = '0'
                newSlider.max = '1'
                newSlider.value = `${value}`

                const newButton = document.createElement('button')
                newButton.textContent = 'Посмотреть тексты заданий'
                newButton.onclick = async () => {
                    let studentTexts = await seeTexts(key)
                    
                    const textWindow = new TextWindow(key, studentTexts)
                    document.body.appendChild(textWindow.node);

                    console.log('Text Window rendered')
                }

                newCaption.id = key + 'Caption'
                newSlider.id = key + 'Slider'
                newButton.id = key + 'Button'

                this.node.appendChild(newCaption)
                this.node.appendChild(newSlider)
                this.node.appendChild(newButton)
            }

            if (slider instanceof HTMLInputElement) {
                slider.value = `${value}`
            }
        })

        const intervalId = setInterval(() => {
            this.renderSliders()
        }, 5000)

        intervalId
    }

    renderCollapseButton() {
        const collapseButton = document.createElement('button');

        collapseButton.textContent = '_'
        collapseButton.style.position = 'absolute'
        collapseButton.style.top = '60px'
        collapseButton.style.right = '5px'
        collapseButton.style.zIndex = '9999'

        collapseButton.onclick = () => {
            if(!this.isCollapsed) {
                this.isCollapsed = false
                this.node.style.height = '10px'
            } else {
                this.isCollapsed = true
                this.node.style.height = '20%'
            }
        }

        this.node.appendChild(collapseButton)
    }
}

export default TeacherInterface;