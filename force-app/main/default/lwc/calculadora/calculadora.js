import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {
    @track resultado;
    @track num1;
    @track num2;

    numberChangeHandler(event) {
        const inputName = event.target.name;
        if (inputName === 'number1') {
            this.num1 = event.target.value;
        } else if (inputName === 'number2') {
            this.num2 = event.target.value;
        }
    }

    somaHandler() {
        this.resultado = `Resultado: ${Number(this.num1) + Number(this.num2)}`;
    }

    subtrairHandler() {
        this.resultado = `Resultado: ${Number(this.num1 - this.num2)}`;
    }

    multiplicacaoHandler() {
        this.resultado = `Resultado: ${Number(this.num1 * this.num2)}`;
    }

    divisaoHandler() {
        this.resultado = `Resultado: ${Number(this.num1 / this.num2)}`;
    }
}
