Projeto desenvolvido no curso ORM com NodeJS da Alura

Objetivo

Desenvolver um back-end para atender às necessidades de negócio de um curso de inglês. Entre os requisitos, está desenvolver um CRUD seguindo o diagrama de banco, relacionando as tabelas de Pessoas, Níveis, Turmas e Matrículas.

Por onde começar

Dentro do repositório, executar no terminal o comando

npm install

Em seguida, vá na pasta config, renomeie o arquivo config-template.json para config.json e preencha os campos que estão com letras maiúsculas com as informações referentes ao seu banco de dados e host.

Agora, volte para o terminal para usar o sequelize-cli e rodar as migrations com

npx sequelize-cli db:migrate

Para popular suas tabelas no banco de dados com os seeders disponíveis, rode o comando

npx sequelize-cli db:seed:all

Você também pode popular o banco manualmente.

Por fim, inicie o servidor no terminal com npm start, para iniciar a aplicação em ambiente de desenvolvimento com o nodemon, ou  rode o comando node api/index.js

Fazendo requisições

Você pode usar o Postman para fazer requisições com a API configurada. Para isso, basta direcionar as requisições para o HOST preenchido e a porta em que o servidor está rodando, seguido da rota para a requisição que quer fazer. As rotas estão descritas em api/routes.