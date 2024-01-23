public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        if (Schema.sObjectType.Account.isAccessible()) {
            return [SELECT Id, Name FROM Account];
        } else {
            throw new AuraHandledException('Você não tem permissão para acessar registros de conta.');
        }
    }
}
