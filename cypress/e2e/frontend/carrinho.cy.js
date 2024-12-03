describe('03 - Lista de Compras /frontend', function () {
    beforeEach(function () {
      cy.fixture('user').then(function (user) {
        this.user = user
      })

      cy.fixture('products').then(function (products) {
        this.products = products
      })
    })

    it('Validar redirecionamento para Carrinho através da Home', function() {
      const userData = this.user.non_admin_user
      //Adicionando um usuário novo
      cy.addUser(userData.nome, userData.email, userData.password, userData.administrator)
          .then(response => {
            //Acessar o front
            cy.visit('/')
            //Logando no frontend
            cy.loginFront(userData.email, userData.password)
            //Validação de usuário logado
            cy.contains('h1', 'Serverest Store').should('be.visible')
            //Clicar em Carrinho
            cy.get('[data-testid="carrinho"]').click()
            //Validar o redirecionamento para o carrinho
            cy.url().should('eq', 'https://front.serverest.dev/carrinho')
            //Validar a página de construção
            cy.contains('h1', 'Em construção aguarde').should('be.visible')

          const userId = response.body._id
          //Removendo a massa de dados
          cy.removeUser(userId)
      })
    })

    it('Validar redirecionamento de um Produto para o Carrinho através da Lista de Compras', function () {
      const userData = this.user.non_admin_user
      const userAdminData = this.user.admin_user
      const productData = this.products.product2
      //Adicionando um usuário novo
      cy.addUser(userAdminData.nome, userAdminData.email, userAdminData.password, userAdminData.administrator).then(adminResp => {
        const adminId = adminResp.body._id
        cy.login(userAdminData.email, userAdminData.password).then(adminLogin => {
          const authToken = adminLogin.body.authorization
          cy.addProduct(authToken, productData.nome, productData.preco, productData.descricao, productData.quantidade).then(registerProduct => {
            const id = registerProduct.body._id
  
            cy.addUser(userData.nome, userData.email, userData.password, userData.administrator)
              .then(response => {
  
                //Acessar o front
                cy.visit('/')
                //Logando no frontend
                cy.loginFront(userData.email, userData.password)
                //Pesquisar um produto
                cy.get('[data-testid="pesquisar"]').type(productData.nome)
                //Clicar em pesquisar
                cy.get('button[data-testid="botaoPesquisar"]').click()
                //Clicar em adicionar na lista
                cy.get('[data-testid="adicionarNaLista"]').click()
                //Validar a presença na lista de Compra
                cy.url().should('eq', 'https://front.serverest.dev/minhaListaDeProdutos')
                //Clicar em Adicionar no Carrinho
                cy.get('[data-testid="adicionar carrinho"]').click()
                //Validar o redirecionamento para o Carrinho
                cy.url().should('eq', 'https://front.serverest.dev/carrinho')
                //Validar a página de construção
                cy.contains('h1', 'Em construção aguarde').should('be.visible')
            
                //Removendo a massa de dados
                const userId = response.body._id
                cy.removeUser(userId)
              })
  
              cy.removeProductById(authToken, id)
          })
        })
        cy.removeUser(adminId)
      })
    })
})