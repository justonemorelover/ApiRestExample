import express, { response } from 'express';
import { StatusCodes } from 'http-status-codes'; // lib status codes

const app = express();

// porta dinâmica em um host externo (HEROKU) || porta local
const PORT = process.env.PORT || 3000;

let users = [
    { id: 1, name: 'Rafael Ribeiro', age: 31 },
    { id: 2, name: 'Gabriel Custódio', age: 27 },
];

 //middwer do método express: todos as request informadas serão em formato 'json';
app.use(express.json());


// .listen: escuta a porta no servido informado
app.listen(PORT, () => { // ('NOME DA PORTA, FUNÇÃO CALLBACK);
    console.log(`Servidor rodando em https://localhost:${PORT}`);
});


// .get com parametro '/' (raiz), retorna o raiz do servidor;
app.get('/', (request, response) => {
    return response.send('<h1>"trabalhando com servidor express"</h1>');
});


// .get '/users' retorna a lista de usuarios;
app.get('/users', (request, response) => {
    return response.send(users);
});


// .get '/users/:userId' retorna um usuario específico;
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => { //retorna true ou false com o primeiro item encontrado caso true;
        return (user.id === Number(userId)) //compra o 'userId da URL com o user.id(elemento id do array users)
    })
    return response.send(user);
})


// .post '/users' cria um novo usuario
app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser); //status deve ser antes do '.send'
});


// .put '/users/:userId' faz a atualização nas informações de um usuário;
app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }

        return user;
    });

    return response.send(updatedUser);
})


// .delete '/users/:userId' deleta o usuraio especificado;
app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
})