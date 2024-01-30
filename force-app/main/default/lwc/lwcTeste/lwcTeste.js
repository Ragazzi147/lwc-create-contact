import { LightningElement, track, wire } from 'lwc';
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
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId'; 
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccountOptions from '@salesforce/apex/AccountController.getAccountOptions';

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
    @track accountOptions = [];
    @track selectedAccountId = '';

    @wire(getAccountOptions)
    wiredAccountOptions({ error, data }) {
        if (data) {
            this.accountOptions = data.map(option => ({
                label: option.accountName,
                value: option.accountId
            }));
        } else if (error) {
            console.error(error);
        }
    }
    get options() {
        return [
            { label: 'Pessoa Física', value: 'Pessoa Física' },
            { label: 'Pessoa Jurídica', value: 'Pessoa Jurídica' },
        ];
    }

    handleAccountChange(event) {
        this.selectedAccountId = event.detail.value;
    }

    handleChange(event) {
        this.value = event.detail.value;
        this.isFormVisible = true;
        this.isPessoaFisica = this.value === 'Pessoa Física';
        this.isPessoaJuridica = this.value === 'Pessoa Jurídica';
    }

    handleTipoPessoaChange(event) {
        this.tipoPessoa = event.detail.value;
        this.tipoPessoaSelected = true;
        this.tipoPessoaText = `Tipo de Pessoa: ${this.tipoPessoa}`;
    }

    contactChangeVal(event) {
        const field = event.target.name;
        if (field) {
            this[field] = event.target.value;
        }
    }

    insertContactAction() {
        if (!this.firstName || !this.lastName || !this.bday || !this.emailId || !this.departmentVal || !this.value || (!this.cpf && !this.cnpj) || !this.selectedAccountId) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Erro',
                    message: 'Preencha todos os campos, incluindo a conta',
                    variant: 'error',
                }),
            );
            return;
        }

        const fields = {};
        fields[conFirstName.fieldApiName] = this.firstName;
        fields[conLastName.fieldApiName] = this.lastName;
        fields[conBday.fieldApiName] = this.bday;
        fields[conEmail.fieldApiName] = this.emailId;
        fields[conDepartment.fieldApiName] = this.departmentVal;
        fields[conPe.fieldApiName] = this.tipoPessoa;
        fields[conCpf.fieldApiName] = this.cpf;
        fields[conCnpj.fieldApiName] = this.cnpj;
        fields[ACCOUNT_FIELD.fieldApiName] = this.selectedAccountId;

        const recordInput = { apiName: conObject.objectApiName, fields };

        createRecord(recordInput)
            .then(contactobj => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Registro de Contato foi criado',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Erro ao criar registro',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}