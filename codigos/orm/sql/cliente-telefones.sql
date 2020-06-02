select 
	c.nome,
    t.numero
from 
	cliente c,
    endereco e,
    telefone t
where 1=1
  and e.id_cliente = c.id_cliente
  and t.id_cliente = c.id_cliente;
  