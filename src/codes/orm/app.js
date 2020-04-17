const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send(`Olá `)
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);

    class Pessoa {
        constructor(nome, email) {
            this.nome = nome
            this.email = email
            this.telefone = []
            this.endereco = {}
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

    var cliente1 = new Cliente('Henrique', 'rickuev@gmail.com', '070.824.859-48')
    cliente1.sobrenome = "Vig"
    var cliente2 = new Cliente('Lorena', 'loh@gmail.com', '')

    // console.log(`pessoa1: ${cliente1.nome} ${cliente1.sobrenome}`)
    // console.log(`pessoa2: ${cliente2.nome} ${cliente2.cpf}`)

    let fornecedor1 = new Fornecedor('Atacadao', 'suporte@atacadao', '2352352/0001')
    fornecedor1.nomeFantasia = "ATACAD"

    // console.log(`fornecedor1: ${fornecedor1.nome} ${fornecedor1.cnpj} ${fornecedor1.nomeFantasia}`)

    let endereco1 = new Endereco(87005040, "são paulo", 3101, "vila bosque", 'Maringá', 'PR')
    // console.log(endereco1)

    cliente1.endereco = endereco1

    let telefone1 = new Telefone(44, 999410923)
    let telefone2 = new Telefone(41, 998922215)
    cliente1.telefone.push(telefone1)
    cliente1.telefone.push(telefone2)

    // console.log('\n\nCLIENTE 1:\n')
    // console.log(cliente1)

    /********** */

    const mysql = require('mysql2');

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "petshop_der"
    });

    connection.query(
        'SELECT * FROM endereco', (err, resultset, fields) => {
            // console.log(fields);
            // console.log(resultset);
            let enderecos = []
            resultset.forEach(data => {
                enderecos.push(new Endereco(
                    data.cep,
                    data.rua,
                    data.numero,
                    data.bairro,
                    data.cidade,
                    data.uf))
            })
            // console.log(enderecos);
        });

    connection.query(
        'SELECT * FROM telefone', (err, resultset, fields) => {
            // console.log(fields);
            // console.log(resultset);
            const telefones = []
            resultset.forEach(data => {
                telefones.push(new Telefone(
                    data.ddi,
                    data.ddd,
                    data.numero))
            })
            // console.log(telefones);
        });

    connection.query(
        'SELECT * FROM cliente', (err, resultset, fields) => {
            const clientes = []
            resultset.forEach(data => {
                const cliente = new Cliente(data.nome, data.email, data.cpf);
                cliente.id = data.id_cliente;
                clientes.push(cliente);
            })

            connection.query(
                'SELECT * FROM telefone WHERE id_cliente = ?', [clientes[0].id], (err, resultset, fields) => {
                    const telefones = []
                    resultset.forEach(data => {
                        clientes[0].telefone.push(new Telefone(
                            data.ddi,
                            data.ddd,
                            data.numero))
                    })
                    // clientes[0].telefone = telefones;
                    // console.log(clientes);
                });

            connection.query(
                'SELECT * FROM endereco WHERE id_cliente = ?', [clientes[0].id], (err, resultset, fields) => {
                    clientes[0].endereco = new Endereco(
                        resultset[0].cep,
                        resultset[0].rua,
                        resultset[0].numero,
                        resultset[0].bairro,
                        resultset[0].cidade,
                        resultset[0].uf);
                    console.log(clientes);
                    console.log('Telefone1:', clientes[0].telefone[0])
                });

        });

    connection.query(
        'SELECT * FROM fornecedor', (err, resultset, fields) => {
            // console.log(fields);
            // console.log(resultset);
            const fonecedores = []
            resultset.forEach(data => {
                fonecedores.push(new Fornecedor(
                    data.nome,
                    data.email,
                    data.cnpj))
            })
            // console.log(fonecedores);
        });


    const mysql2 = require('mysql2');
    const con = mysql2.createConnection(
        { host: 'localhost', user: 'root', password: 'root', database: 'petshop_der' }
    );

    const enderecos = []

    con.promise().query("SELECT * FROM endereco")
        .then(([resultset, fields]) => {
            // console.log('rows:', resultset);

            resultset.forEach(data => {
                enderecos.push(new Endereco(
                    data.cep,
                    data.rua,
                    data.numero,
                    data.bairro,
                    data.cidade,
                    data.uf))
            })

        })
        .catch('ERRO', console.log)
        .then(() => con.end());

    console.log(enderecos);


})