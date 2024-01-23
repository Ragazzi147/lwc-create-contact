import { LightningElement, track } from 'lwc';

export default class Name_lastname extends LightningElement {
    @track greeting = '';

    handleInputChange(event) {
        this.greeting = event.target.value;
    }

    handleValidation() {
        if (this.greeting.trim() === '') {
            alert('Por favor, insira seu nome antes de validar.');
        } else {
            alert(`texto válido: ${this.greeting}`)
        }
    }
}