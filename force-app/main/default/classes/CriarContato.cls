public with sharing class CriarContato {

    @AuraEnabled(cacheable = true)
    public static String newContato(String type, String firstName, String lastName, String phone, String document) {
        try {

            Contact novoContato = new Contact(
                FirstName = firstName,
                LastName = lastName,
                Phone = phone

            );

            insert novoContato;

            return novoContato.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
