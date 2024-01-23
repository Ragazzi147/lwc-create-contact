import { LightningElement } from 'lwc';

export default class Helloworld extends LightningElement {
    greeting = 'World';
    changeHandler(event){
        this.greeting = event.target.value;
    }
}