public with sharing class lwcTeste {

    @AuraEnabled(cacheable = true)
    public static String criarContato(String type, String firstName, String lastName, String phone, String document) {
        try {
            // Implemente a lógica para criar um registro de contato com base nos parâmetros fornecidos
            // Exemplo: Criar um registro de Contato
            Contact novoContato = new Contact(
                FirstName = firstName,
                LastName = lastName,
                Phone = phone
                // Remova a vírgula ao final, se necessário
            );

            insert novoContato;

            return novoContato.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
