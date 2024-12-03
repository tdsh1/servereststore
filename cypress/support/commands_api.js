//Users

Cypress.Commands.add('addUser', (nome, email, password, administrator) => {
    cy.api({
        url: Cypress.env('baseApi') + `/usuarios`,
        method: 'POST',
        body: {
            nome: nome,
            email: email,
            password: password,
            administrador: administrator
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('removeUser', (userid) => {
    cy.api({
        url: Cypress.env('baseApi') + `/usuarios` + '/' + userid,
        method: 'DELETE',
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('searchUserByName', (nome) => {
    cy.api({
        url: Cypress.env('baseApi') + `/usuarios` + `?&nome=${nome}`,
        method: 'GET',
        failOnStatusCode: false
    })
})

Cypress.Commands.add('searchUserByEmail', (email) => {
    cy.api({
        url: Cypress.env('baseApi') + `/usuarios` + `?&email=${email}`,
        method: 'GET',
        failOnStatusCode: false
    })
})

//Login

Cypress.Commands.add('login', (email, password) => {
    cy.api({
        url: Cypress.env('baseApi') + '/login',
        method: 'POST',
        body: {
            email: email,
            password: password
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

//Products
Cypress.Commands.add('addProduct', (authToken, nome, preco, descricao, quantidade) => {
    cy.api({
        url: Cypress.env('baseApi') + '/produtos',
        method: 'POST',
        headers: {
            authorization: authToken
        },
        body: {
            nome: nome,
            preco: preco,
            descricao: descricao,
            quantidade: quantidade
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('removeProductById', (authToken, id) => {
    cy.api({
        url: Cypress.env('baseApi') + `/produtos/${id}`,
        method: 'DELETE',
        headers: {
            authorization: authToken
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('searchProductById', (authToken, id) => {
    cy.api({
        url: Cypress.env('baseApi') + `/produtos/${id}`,
        method: 'GET',
        headers: {
            authorization: authToken
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

//Cart

Cypress.Commands.add('addToCart', (authToken, productId, quantidade) =>{
    cy.api({
        url: Cypress.env('baseApi') + '/carrinhos',
        method: 'POST',
        headers: {
            authorization: authToken
        },
        body: {
            produtos: [
            {
              idProduto: productId,
              quantidade: quantidade
            }
        ]
          },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('buyCart', (authToken) => {
    cy.api({
        url: Cypress.env('baseApi') + '/carrinhos/concluir-compra',
        method: 'DELETE',
        headers: {
            authorization: authToken
        },
        failOnStatusCode: false
    }).then(response => response);
});

Cypress.Commands.add('getCart', (authToken, cartId) =>{
    cy.api({
        url: Cypress.env('baseApi') + '/carrinhos' + `/${cartId}`,
        method: 'GET',
        headers: {
            authorization: authToken
        },
        failOnStatusCode: false
    }).then(response => response);
})