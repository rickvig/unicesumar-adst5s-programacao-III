const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/teste');


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


class User extends Model { }
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

sequelize.sync()
    .then(() =>

        User.create({
            username: 'janedoe',
            birthday: new Date(1980, 6, 20)
        }))

    .then(jane => {
        console.log(jane.toJSON());
    });
