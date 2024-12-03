describe('05 - Produtos /backend', function () {
  beforeEach(function () {

    cy.fixture('user_api').then(function (user) {
      this.user = user
    })

    cy.fixture('products').then(function (products) {
      this.products = products
    })
  })

  it('Adicionar um novo produto', function () {
    const userData = this.user.admin_user
    const productData = this.products.product1

    cy.addUser(userData.nome, userData.email, userData.password, userData.administrator).then(response => {
      const userId = response.body._id
      cy.login(userData.email, userData.password).then(response1 => {

        const authToken = response1.body.authorization

        cy.addProduct(authToken, productData.nome, productData.preco, productData.descricao, productData.quantidade).then(response2 => {
          //Validação de mensagem de status e mensagem ao adicionar um novo produto
          expect(response2.status).to.eq(201)
          expect(response2.body.message).to.eq('Cadastro realizado com sucesso')
          const id = response2.body._id
          cy.removeProductById(authToken, id)
        })
      })
      cy.removeUser(userId)
    })
  })

  it('Visualizar um produto pelo ID', function () {
    const userData = this.user.admin_user
    const productData = this.products.product1

    cy.addUser(userData.nome, userData.email, userData.password, userData.administrator).then(response => {
      const userId = response.body._id
      cy.login(userData.email, userData.password).then(response1 => {
        const authToken = response1.body.authorization
        cy.addProduct(authToken, productData.nome, productData.preco, productData.descricao, productData.quantidade).then(response2 => {
          const id = response2.body._id

          cy.searchProductById(authToken, id).then(response3 => {
            //Validação dos dados inseridos que foram cadastrados e posteriormente visualizados
            expect(response3.status).to.eq(200)
            expect(response3.body.descricao).to.eq(productData.descricao)
            expect(response3.body.nome).to.eq(productData.nome)
            expect(response3.body.preco).to.eq(productData.preco)
            expect(response3.body.quantidade).to.eq(productData.quantidade)
          })
          cy.removeProductById(authToken, id)
        })
      })
      cy.removeUser(userId)
    })
  })

  it('Remover um produto', function () {
    const userData = this.user.admin_user
    const productData = this.products.product1

    cy.addUser(userData.nome, userData.email, userData.password, userData.administrator).then(response => {
      const userId = response.body._id
      cy.login(userData.email, userData.password).then(response1 => {

        const authToken = response1.body.authorization

        cy.addProduct(authToken, productData.nome, productData.preco, productData.descricao, productData.quantidade).then(response2 => {
          const id = response2.body._id
          cy.removeProductById(authToken, id).then(response3 => {
            //Validação de status code e mensagem de exclusão de produto
            expect(response3.status).to.eq(200)
            expect(response3.body.message).to.eq('Registro excluído com sucesso')
          })
        })
      })
      cy.removeUser(userId)
    })
  })
})

