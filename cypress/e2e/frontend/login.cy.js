describe('01 - Login /frontend', function () {
  beforeEach(function () {
    cy.fixture('user').then(function (user) {
      this.user = user
    })
  })

  it('Deverá realizar o Login com sucesso', function () {
    const userData = this.user.login
    //Adicionando um usuário novo
    cy.addUser(userData.nome, userData.email, userData.password, userData.administrator)
        .then(response => {
          //Acessar o front
          cy.visit('/')
          //Logando no frontend
          cy.loginFront(userData.email, userData.password)
          //Validação de usuário logado
          cy.get('[data-testid="logout"]').should('be.visible')
          cy.contains('h1', 'Serverest Store').should('be.visible')
        const userId = response.body._id
        //Removendo a massa de dados
        cy.removeUser(userId)
    })
  })

  it('Deverá mostrar uma mensagem de erro - Usuario/senha inválidos', function () {
    const userEmail = this.user.invalid_user.email
    const userPwd = this.user.invalid_user.password
    //Acessando front
    cy.visit('/')
    cy.loginFront(userEmail, userPwd)
    //Validação mensagem de erro
    cy.contains('span', 'Email e/ou senha inválidos').should('be.visible')
  })

  it('Deverá mostrar uma mensagem para campo de email é obrigatório', function () {
    const userPwd = this.user.invalid_user.password
    //Acessando front
    cy.visit('/')
    cy.get('[data-testid="senha"]').type(userPwd)
    cy.get('[data-testid="entrar"]').click()
    //Validação mensagem de erro
    cy.contains('span', 'Email é obrigatório').should('be.visible')
  })

  it('Deverá mostrar uma mensagem para campo de senha é obrigatório', function () {
    const userEmail = this.user.invalid_user.email
    //Acessando front
    cy.visit('/')
    cy.get('[data-testid="email"]').type(userEmail)
    cy.get('[data-testid="entrar"]').click()
    //Validação mensagem de erro
    cy.contains('span', 'Password é obrigatório').should('be.visible')
  })

})

