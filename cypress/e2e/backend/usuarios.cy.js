describe('04 - Usuários /backend', function () {
    beforeEach(function () {

        cy.fixture('user_api').then(function (user) {
            this.user = user
        })
    })

    it('Cadastrar um novo usuário', function () {
        const userData = this.user.admin_user

        //Adicionando um usuário novo
        cy.addUser(userData.nome, userData.email, userData.password, userData.administrator)
            .then(response => {
            //Validação de resposta da requisição e texto informando a confirmação 
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            const userId = response.body._id
            cy.removeUser(userId)
        })
    })

    it('Pesquisar um usuário através do nome', function () {
        const userData = this.user.admin_user

        //Adicionando um usuário novo
        cy.addUser(userData.nome, userData.email, userData.password, userData.administrator).then(response => {
            const userId = response.body._id
        //Consultar o GET do usuário adicionado
        cy.searchUserByName(userData.nome).then(response1 => {
            //Validação através do response code e nome
            expect(response1.status).to.eq(200)
            expect(response1.body.usuarios[0].nome).to.eq(`${userData.nome}`)
        }).its('body.usuarios')
        .should('be.an', 'array')

            //Remoção da massa de dados
            cy.removeUser(userId)
        })
    })

    it('Pesquisar um usuário através do email', function () {
        const userData = this.user.admin_user

        //Adicionando um usuário novo
        cy.addUser(userData.nome, userData.email, userData.password, userData.administrator).then(response => {
            const userId = response.body._id
        //Consultar o GET do usuário adicionado
        cy.searchUserByEmail(userData.email).then(response1 => {
        //Validação através do response code e email
            expect(response1.status).to.eq(200)
            expect(response1.body.usuarios[0].email).to.eq(`${userData.email}`)
        }).its('body.usuarios')
        .should('be.an', 'array')

            //Remoção da massa de dados
            cy.removeUser(userId)
        })
    })

    it('Remover um usuários', function () {
        const userData = this.user.remove_user

        //Adicionando usuário
        cy.addUser(userData.nome, userData.email, userData.password, userData.administrator).then(response => {
            const userId = response.body._id
            cy.removeUser(userId).then(response1 => {
                //Validando response code e mensagem de remoção de usuário
                expect(response1.status).to.eq(200)
                expect(response1.body.message).to.eq('Registro excluído com sucesso')
            })
        })
    })
})
