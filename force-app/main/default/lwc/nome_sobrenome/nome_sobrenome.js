import { LightningElement, track } from 'lwc';

export default class Nome_sobrenome extends LightningElement {
    @track nome = '';
    @track sobrenome = '';

    get nomeCompleto() {
        return this.nome + ' ' + this.sobrenome;
    }

    handleNomeChange(event) {
        this.nome = event.target.value;

    }

    handleSobrenomeChange(event) {
        this.sobrenome = event.target.value;

    }
}