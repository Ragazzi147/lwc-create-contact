import { LightningElement, track } from 'lwc';

export default class Idade_manha extends LightningElement {

    @track firstName = ' ';
    @track middleName = ' ';
    @track lastName = ' ';
    @track dob = ' ';
    @track fullName = ' ';
    @track age = ' ';


    handleFirstNameChange(event) {
        this.firstName = event.target.value;
        this.updateFullName();
    }

    handleMiddleNameChange(event) {
        this.firstName = event.target.value;
        this.updateFullName();
    }
    handleLastNameChange(event) {
        this.firstName = event.target.value;
        this.updateFullName();
    }
    handleDobChange(event) {
        this.firstName = event.target.value;
        this.calculateAge();
    }


    updateFullName() {
        this.fullName = `${ this.firstName } ${ this.middleName } ${ this.lastName }`;
    }

    calculate() {
        const birthDate = new Date(this.dob);
        const currentDate = new Date();

        const ageDiff = currentDate.getFullYear() - birthDate.getFullYear();

        this.age = ageDiff;
    }

}

