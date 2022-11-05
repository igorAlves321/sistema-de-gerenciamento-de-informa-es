create table tipoempresa (
    id int auto_increment primary key,
    nome varchar(200)
);

insert into tipoempresa (nome) values 
('Saude'), 
('Alimenticios'), 
('Mercadorias'),
('Administração');

create table empresa(
    id int auto_increment primary key,
    nome varchar(200),
    telefone varchar(50),
    email varchar(400),
    senha varchar(33),
    fk_id_tipoempresa int not null,
    foreign key (fk_id_tipoempresa) references tipoempresa (id)
);

insert into empresa (email, nome, fk_id_tipoempresa, senha, telefone) VALUES
('admin@admin.com', 'Admin' , 4, '21232f297a57a5a743894a0e4a801fc3' , '123456');

create table tipoproduto (
idtipoproduto int not null auto_increment primary key,
    nome varchar(200));

insert into tipoproduto (nome) values 
('Saude'), 
('Alimenticios'), 
('Vestimentas');

create table produto (
idproduto int not null auto_increment primary key,
nome varchar(500),
descricao varchar(500) not null,
idempresa int not null,
foreign key (idempresa) references empresa (id)
);




