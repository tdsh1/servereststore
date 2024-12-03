describe('02 - Produtos /frontend', function () {
  beforeEach(function () {
    cy.fixture('user').then(function (user) {
      this.user = user
    })

    cy.fixture('products').then(function (products) {
      this.products = products
    })
  })

  it('Deverá realizar uma pesquisa e visualizar um produto', function () {
    const userData = this.user.non_admin_user
    const userAdminData = this.user.admin_user
    const productData = this.products.product3
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
              //Validar o produto no frontend visualizado
              cy.contains('h5', `${productData.nome}`).should('be.visible')
              //Validar o preço do produto no frontend
              cy.contains('h6', `$ ${productData.preco}`).should('be.visible')
           
              const userId = response.body._id
              //Removendo a massa de dados
              cy.removeUser(userId)
            })
            cy.removeProductById(authToken, id)
        })
      })
      cy.removeUser(adminId)
    })
  })

  it('Deverá enviar um produto para a lista de compras', function () {
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
              //Validar a presença na Lista de Compras
              cy.contains('h1', 'Lista de Compras').should('be.visible')
              //Validar o Produto enviado para a lista de Compras
              cy.get('[data-testid="shopping-cart-product-name"]').should('have.text', `Produto:${productData.nome}`);           
          
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

  it('Deverá limpar a lista de Compras', function () {
    const userData = this.user.non_admin_user
    const userAdminData = this.user.admin_user
    const productData = this.products.product2
    //Adicionando um administrador usuário novo
    cy.addUser(userAdminData.nome, userAdminData.email, userAdminData.password, userAdminData.administrator).then(adminResp => {
      const adminId = adminResp.body._id
      //logando com o usuario administrador
      cy.login(userAdminData.email, userAdminData.password).then(adminLogin => {
        const authToken = adminLogin.body.authorization
        //cadastrando um novo produto
        cy.addProduct(authToken, productData.nome, productData.preco, productData.descricao, productData.quantidade).then(registerProduct => {
          const id = registerProduct.body._id
          //criando um usuário não administrador
          cy.addUser(userData.nome, userData.email, userData.password, userData.administrator)
            .then(response => {

              //Acessar o front com o usuario não administrador
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
              //Validar a presença na Lista de Compras
              cy.contains('h1', 'Lista de Compras').should('be.visible')
              //Validar o Produto enviado para a lista de Compras
              cy.get('[data-testid="shopping-cart-product-name"]').should('have.text', `Produto:${productData.nome}`)
              //Deverá clicar 2x para acrescentar produtos
              cy.get('[data-testid="limparLista"]').click()
              //Validar que não possui mais um produto na lista
              cy.get('[data-testid="shopping-cart-product-name"]').should('not.exist')
              //Validar a mensagem informando ao usuário que não possui mais item na lista
              cy.contains('p', 'Seu carrinho está vazio').should('be.visible')
          
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