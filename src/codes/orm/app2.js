const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send(`Olá `)
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);

    let id = 0;

    class Pessoa {
        constructor(nome, email) {
            this.id = id++;
            this.nome = nome;
            this.email = email;
            this.telefone = [];
            this.endereco = {};
        }
    }

    class Cliente extends Pessoa {
        constructor(nome, email, cpf) {
            if (cpf === undefined)
                throw new Error('opa falta o cpf')
            super(nome, email)
            this.cpf = cpf
            this.sobrenome = ""
        }
    }

    class Fornecedor extends Pessoa {
        constructor(nome, email, cnpj) {
            if (cnpj === undefined)
                throw new Error('opa falta o cnpj')

            super(nome, email)

            this.cnpj = cnpj
            this.nomeFantasia = this.nomeFantasia
        }
    }

    class Endereco {
        constructor(
            cep, rua, numero,
            bairro, cidade, estado) {

            if (cep === undefined)
                throw new Error('opa falta o cep');

            this.cep = cep;
            this.rua = rua;
            this.numero = numero;
            this.bairro = bairro;
            this.cidade = cidade;
            this.estado = estado;
        }
    }

    class Telefone {
        constructor(ddi, ddd, numero) {
            if (ddi === undefined)
                this.ddi = 55;

            this.ddd = ddd;
            this.numero = numero;
        }
    }

    async function findAll(connection, table) {
        return connection.execute(`SELECT * FROM ${table};`);
    }

    // CREATE
    async function insere(connection, table, fields, values) {
        const parameters = values.map(() => { return '?' }).join(',')
        return connection.execute(
            `INSERT INTO ${table} (${fields}) VALUES (${parameters});`, values);
    }

    // READ
    async function findOne(connection, table, id) {
        return connection.execute(`SELECT * FROM ${table} WHERE id_${table} = ?;`, [id]);
    }

    // UPDATE
    async function atualiza(connection, table, changes, id) {
        return connection.execute(
            `UPDATE ${table} SET ${changes} WHERE id_${table} = ?;`, [id]);
    }

    // DELETE
    async function remover(connection, table, id) {
        return connection.execute(`DELETE FROM ${table} WHERE id_${table} = ?;`, [id]);
    }


    async function main() {
        const mysql = require('mysql2/promise');

        const config = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'petshop_der'
        }

        const connection = await mysql.createConnection(config);

        const [rows, fields] = await findAll(connection, 'cliente');
        // console.log(rows);

        let cliente = new Cliente('Henrique', 'rickuev@gmail.com', '070.824.859-48')
        cliente.sobrenome = "Vig"

        let result = await insere(
            connection,
            'cliente',
            'nome, email, cpf, sobrenome',
            [cliente.nome, cliente.email, cliente.cpf, cliente.sobrenome]);

        cliente.id = result[0].insertId;
        console.log(cliente.id);
        
        const [row, metadata] = await findOne(connection, 'cliente', cliente.id);
        console.log(row);

        cliente.sobrenome = 'Vignando';
        cliente.email = 'henrique.vignando@unicesumar.edu.br';
        result = await atualiza(
            connection,
            'cliente',
            `sobrenome = '${cliente.sobrenome}',
             email = '${cliente.email}'`,
            cliente.id);
        console.log(result);

        result = await remover(connection, 'cliente', cliente.id);
        console.log(result);
    }

    main();
})