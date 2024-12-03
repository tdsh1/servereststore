# ServeRest Store
Projeto de Automação com Cypress para finalidade de Avaliação Técnica para Ambev Tech  
Frontend: https://front.serverest.dev/  
Swagger API: https://serverest.dev/  

Os cenários de testes foram criados para serem executados de maneira independente, onde os dados são criados a partir da camada de fixtures que foram definidas para utilizarem os dados no momento da execução, onde será criada, validar o contexto do teste e posteriormente apagada por existir um grande volume de pessoas acessando a aplicação ServeRest.

**Observação:**
O projeto utiliza um plugin chamado `cypress-plugin-api`, onde o objetivo do plugin é melhorar a visualização entre as requisições/respostas durante o desenvolvimento do projeto, obtendo uma experiência na interface do Cypress com uma qualidade superior

**Cenários:**
O projeto consiste na validação de cenários de testes E2E compostos no frontend e backend, segue abaixo a descrição das suítes elaboradas.  

├── 01 - Login /frontend  
├── 02 - Produtos /frontend  
├── 03 - Lista de Compras /frontend  
├── 04 - Usuários /backend  
├── 05 - Produtos /backend  
└── 06 - Carrinhos /backend  

## 01 - Login /frontend

**Deverá realizar o Login com sucesso**  
Adiciona um usuário novo via API, visita o frontend, insere as credenciais, valida a existência do botão de logout e texto da aplicação logada, por fim, remove a massa de dados.  

**Deverá mostrar uma mensagem de erro - Usuario/senha inválidos**  
Acessa o frontend, insere as credenciais de um usuário e senha inválidos, valida o texto apresentado.  

**Deverá mostrar uma mensagem para campo de email é obrigatório**  
Acessa o frontend, insere as credenciais de uma senha, valida o texto apresentado.  

**Deverá mostrar uma mensagem para campo de senha é obrigatório**  
Acessa o frontend, insere as credenciais de um email, valida o texto apresentado.  

## 02 - Produtos /frontend  

**Deverá realizar uma pesquisa e visualizar um produto**  
Adiciona um usuário administrador via API, login no usuário administrador, cadastra um novo produto, adiciona um usuário comum, acessa o frontend, pesquisa pelo produto cadastrado, valida a visualização do produto adicionado, por fim, remove os dados inseridos  

**Deverá enviar um produto para a lista de compras**  
Adiciona um usuário administrador via API, login no usuário administrador, cadastra um novo produto, adiciona um usuário comum, acessa o frontend, pesquisa pelo produto cadastrado, clica em Enviar para Lista de Produtos, valida o redirecionamento e a presença do produto na Lista de Produtos, por fim, remove todos os dados inseridos  

**Deverá limpar a lista de Compras**  
Adiciona um usuário administrador via API, login no usuário administrador, cadastra um novo produto, adiciona um usuário comum, acessa o frontend, pesquisa pelo produto cadastrado, clica em Enviar para Lista de Produtos, valida o redirecionamento e a presença do produto na Lista de Produtos, clica em Limpar lista, valida a não existência do produto na lista de Produtos, por fim, remove todos os dados inseridos  

## 03 - Lista de Compras /frontend  
**Validar redirecionamento para Carrinho através da Home**  
Adiciona um usuário comum via API, acessa o frontend, loga no frontend, valida a permanência do acesso, clica em Carrinho, valida o redirecionamento para a seção de Carrinho e por fim, remove os dados inseridos  

**Validar redirecionamento de um Produto para o Carrinho através da Lista de Compras**  
Adiciona um usuário administrador via API, loga no usuário administrador via API, adiciona um produto novo via API, adiciona um usuário comum, acessa o frontend, procura pelo produto adicionado, adiciona na Lista de Compras, clica em Adicionar no Carrinho, valida o redirecionamento para o Carrinho e por fim, remove os dados inseridos  


## 04 - Usuários /backend
**Cadastrar um novo usuário**  
Envia uma requisição POST para a API informando o nome, email, password e administrador e valida a resposta da requisição e o texto de confirmação de criação, por fim, remove os dados inseridos  

**Pesquisar um usuário através do nome**  
Envia uma requisição POST para a API informando o nome, email, password e administrador, envia uma requisição GET com o nome informado do usuário criado e valida a resposta do status e do nome, por fim, remove os dados inseridos  

**Pesquisar um usuário através do email**  
Envia uma requisição POST para a API informando o nome, email, password e administrador, envia uma requisição GET com o email informado do usuário criado e valida a resposta do status e do email, por fim, remove os dados inseridos  

**Remover um usuários**  
Envia uma requisição POST para a API informando o nome, email, password e administrador, envia uma requisição GET com o email informado do usuário criado e valida a resposta do status e do email, por fim, remove os dados inseridos  

## 05 - Produtos /backend  
**Adicionar um novo produto**  
Envia uma requisição POST para a API cadastrar um usuário, envia uma requisição POST para logar com o usuário criado, envia uma requisição POST para cadastrar um Produto com nome, preço, descrição e quantidade e valida a resposta da requisição e o texto de confirmação de criação, por fim, remove os dados  

**Visualizar um produto pelo ID**  
Envia uma requisição POST para a API cadastrar um usuário, envia uma requisição POST para logar com o usuário criado, envia uma requisição POST para cadastrar um Produto com nome, preço, descrição e quantidade e envia uma requisição GET para obter o retorno do produto criado, valida o status e as informações de nome, preço, descrição e quantidade do produto cadastrado, por fim, remove os dados   

**Remover um produto**  
Envia uma requisição POST para a API cadastrar um usuário, envia uma requisição POST para logar com o usuário criado, envia uma requisição POST para cadastrar um Produto com nome, preço, descrição e quantidade e envia uma requisição DELETE para validar o status da requisição e a mensagem de exclusão, por fim, remove os dados   

## 06 - Carrinhos /backend
**Adicionar produtos no carrinho e limpar tudo**  
Envia uma requisição POST para a API cadastrar um usuário, envia uma requisição POST para logar com o usuário criado, envia uma requisição POST para cadastrar um Produto, envia uma requisição POST para enviar os produtos para o Carrinho, valida a resposta da requisição do cadastro dos itens do carrinho e a existência de um ID de carrinho, por fim, remove os dados inseridos  

**Consultar carrinho com produto adicionado validando valor total do carrinho**  
Envia uma requisição POST para a API cadastrar um usuário, envia uma requisição POST para logar com o usuário criado, envia uma requisição POST para cadastrar um Produto, envia uma requisição POST para enviar os produtos para o Carrinho, envia uma requisição GET para consultar a existência do carrinho validando o preço total, preço unitário e a quantidade dos itens do carrinho, por fim, remove os dados inseridos  

**Concluir a compra do carrinho**  
Envia uma requisição POST para a API cadastrar um usuário, envia uma requisição POST para logar com o usuário criado, envia uma requisição POST para cadastrar um Produto, envia uma requisição POST para enviar os produtos para o Carrinho, envia uma requisição DELETE para remover os itens que estão no carrinho onde eles serão removidos do estoque, validando o status e a mensagem de exclusão, por fim, remove os dados inseridos  


## Como executar
1. Clone o repositório:
 `git clone https://github.com/tdsh1/servereststore.git`
2. Instale as dependências: 
`npm install`
3. Execute o projeto: 
`npx cypress run`

## Tecnologias utilizadas
- Cypress
- Node.js
- API RESTful

## Considerações Finais
Este projeto demonstra habilidades de automação E2E com práticas modernas de testes e organização. Ele é ideal para validar cenários complexos envolvendo múltiplas integrações entre frontend e backend, garantindo qualidade e confiabilidade da aplicação.