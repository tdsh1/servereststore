describe('06 - Carrinhos /backend', function () {
    beforeEach(function () {

        cy.fixture('user_api').then(function (user) {
            this.user = user
        })

        cy.fixture('products').then(function (products) {
            this.products = products
        })
    })

    it('Adicionar produtos no carrinho e limpar tudo', function () {
        const userData = this.user.admin_user;
        const products = [this.products.product2]
    
        // Criar usuário e realizar login
        cy.addUser(userData.nome, userData.email, userData.password, userData.administrator).then(userResponse => {
            const userId = userResponse.body._id
    
            cy.login(userData.email, userData.password).then(loginResponse => {
                const authToken = loginResponse.body.authorization
    
                // Adicionar produtos
                const productIds = []
                cy.wrap(products).each(product => {
                    cy.addProduct(authToken, product.nome, product.preco, product.descricao, product.quantidade).then(productResponse => {
                        const productId = productResponse.body._id;
                        productIds.push(productId)
    
                        // Adicionar ao carrinho
                        cy.addToCart(authToken, productId, product.quantidade).then(cartResponse => {
                            //Validação onde criamos o carrinho com o produto adicionado
                            expect(cartResponse.body.message).to.eq('Cadastro realizado com sucesso')
                            expect(cartResponse.body._id).to.not.be.empty
                        })
                    });
                }).then(() => {
                    // Limpar carrinho
                    cy.buyCart(authToken);
    
                    // Remover produtos
                    cy.wrap(productIds).each(productId => {
                        cy.removeProductById(authToken, productId);
                    })
    
                    // Remover usuário
                    cy.removeUser(userId);
                })
            })
        })
    })
 
    

    it('Consultar carrinho com produto adicionado validando valor total do carrinho', function () {
        const userData = this.user.admin_user;
        const products = [this.products.product2]
    
        // Criar usuário e realizar login
        cy.addUser(userData.nome, userData.email, userData.password, userData.administrator).then(userResponse => {
            const userId = userResponse.body._id
    
            cy.login(userData.email, userData.password).then(loginResponse => {
                const authToken = loginResponse.body.authorization
    
                // Adicionar produtos
                const productIds = [];
                cy.wrap(products).each(product => {
                    cy.addProduct(authToken, product.nome, product.preco, product.descricao, product.quantidade).then(productResponse => {
                        const productId = productResponse.body._id
                        productIds.push(productId);
    
                        // Adicionar ao carrinho
                        cy.addToCart(authToken, productId, product.quantidade).then(cartResponse => {
                            const cartId = cartResponse.body._id    
                            const totalPrice = (product.preco*product.quantidade)
                            cy.getCart(authToken, cartId).then(getCartResponse => {
                                //Valida a existencia de um ID para o carrinho
                                expect(getCartResponse.body._id).to.not.be.empty
                                //Validar o preco total do carrinho
                                expect(getCartResponse.body.precoTotal).to.eq(totalPrice)
                                //Valida o preco unitário do produto
                                expect(getCartResponse.body.produtos[0].precoUnitario).to.eq(product.preco)
                                //Valida a quantidade do produto
                                expect(getCartResponse.body.produtos[0].quantidade).to.eq(product.quantidade)
                            })

                        })
                    });
                }).then(() => {
                    // Limpar carrinho
                    cy.buyCart(authToken)
    
                    // Remover produtos
                    cy.wrap(productIds).each(productId => {
                        cy.removeProductById(authToken, productId)
                    })

                    // Remover usuário
                    cy.removeUser(userId)
                })
            })
        })
    })

    it('Concluir a compra do carrinho', function () {
        const userData = this.user.admin_user;
        const products = [this.products.product2]
    
        // Criar usuário e realizar login
        cy.addUser(userData.nome, userData.email, userData.password, userData.administrator).then(userResponse => {
            const userId = userResponse.body._id
    
            cy.login(userData.email, userData.password).then(loginResponse => {
                const authToken = loginResponse.body.authorization
    
                // Adicionar produtos
                const productIds = []
                cy.wrap(products).each(product => {
                    cy.addProduct(authToken, product.nome, product.preco, product.descricao, product.quantidade).then(productResponse => {
                        const productId = productResponse.body._id;
                        productIds.push(productId)
    
                        // Adicionar ao carrinho
                        cy.addToCart(authToken, productId, product.quantidade)
                    });
                }).then(() => {
                    // Realiza a compra do carrinho
                    cy.buyCart(authToken).then(clearResponse => {
                        //Valida o response status e a mensagem de que os produtos foram removidos do carrinho e comprados
                        expect(clearResponse.status).to.eq(200)
                        expect(clearResponse.body.message).to.eq('Registro excluído com sucesso')
                    })
    
                    // Remover produtos
                    cy.wrap(productIds).each(productId => {
                        cy.removeProductById(authToken, productId)
                    })
    
                    // Remover usuário
                    cy.removeUser(userId)
                })
            })
        })
    })
})
