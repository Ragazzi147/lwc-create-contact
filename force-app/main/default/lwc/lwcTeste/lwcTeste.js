import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import conObject from '@salesforce/schema/Contact';
import conFirstName from '@salesforce/schema/Contact.FirstName';
import conLastName from '@salesforce/schema/Contact.LastName';
import conBday from '@salesforce/schema/Contact.Birthdate';
import conEmail from '@salesforce/schema/Contact.Email';
import conDepartment from '@salesforce/schema/Contact.Department';
import conCpf from '@salesforce/schema/Contact.Cpf__c';
import conCnpj from '@salesforce/schema/Contact.Cnpj__c';
import conPe from '@salesforce/schema/Contact.Tipo_Pessoa__c';
import conAccountId from '@salesforce/schema/Contact.AccountId';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactForm extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track bday = '';
    @track emailId = '';
    @track departmentVal = '';
    @track tipoPessoa = '';
    @track isFormVisible = false;
    @track value = '';
    @track isPessoaFisica = false;
    @track isPessoaJuridica = false;
    @track cpf = '';
    @track cnpj = '';
    @track accountId = '';
    @track accountOptions = [];




    get options() {
        return [
            { label: 'Pessoa Física', value: 'Pessoa Física' },
            { label: 'Pessoa Jurídica', value: 'Pessoa Jurídica' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        this.isFormVisible = true;
        this.isPessoaFisica = this.value === 'Pessoa Física';
        this.isPessoaJuridica = this.value === 'Pessoa Jurídica';
    }

    contactChangeVal(event) {
        const field = event.target.name;
        if (field) {
            this[field] = event.target.value;
        }
    }

    insertContactAction() {
        const fields = {};
        fields[conFirstName.fieldApiName] = this.firstName;
        fields[conLastName.fieldApiName] = this.lastName;
        fields[conBday.fieldApiName] = this.bday;
        fields[conEmail.fieldApiName] = this.emailId;
        fields[conDepartment.fieldApiName] = this.departmentVal;
        fields[conPe.fieldApiName] = this.value;
        fields[conCpf.fieldApiName] = this.cpf;
        fields[conCnpj.fieldApiName] = this.cnpj;
        fields[conAccountId.fieldApiName] = this.accountId; // Adicionado
        const recordInput = { apiName: conObject.objectApiName, fields };



        createRecord(recordInput)
            .then(contactobj => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact record has been created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}
