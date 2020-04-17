const Sequelize = require('sequelize')

const sequelize = new Sequelize('teste', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log(`Conectado com sucess!`)
}).catch(erro => {
    console.log(`Falha ao connectar ${erro}`)
})


const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING //255
    },
    conteudo: {
        type: Sequelize.TEXT // ilimitado
    },
}, {
    freezeTableName: true,
})

Postagem.sync({ force: true });


Postagem.create({
    titulo: 'Teste',
    conteudo: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
})
