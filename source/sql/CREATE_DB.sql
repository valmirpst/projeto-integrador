DROP TABLE IF EXISTS usuario_curso;
DROP TABLE IF EXISTS livro_autor;
DROP TABLE IF EXISTS livro_categoria;
DROP TABLE IF EXISTS historico;
DROP TABLE IF EXISTS curso;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS livro;

DROP TYPE IF EXISTS perfil_enum;
DROP TYPE IF EXISTS historico_enum;
DROP TYPE IF EXISTS tipo_categoria_enum;

CREATE TYPE perfil_enum AS ENUM('bibliotecario', 'aluno', 'professor');
CREATE TYPE historico_enum AS ENUM('ativo', 'inativo');
CREATE TYPE tipo_categoria_enum AS ENUM('subcategoria', 'categoria');

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS usuario (
	id VARCHAR(40) PRIMARY KEY NOT NULL,
	ra VARCHAR(40),
	siape VARCHAR(40),
	nome VARCHAR(80),
	sobrenome VARCHAR(80),
	data_nasc DATE,
	email VARCHAR(80),
	telefone VARCHAR(20),
	perfil perfil_enum
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS curso (
	id VARCHAR(40) PRIMARY KEY NOT NULL,
	nome VARCHAR(40) NOT NULL
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS usuario_curso (
	id_usuario VARCHAR(40) NOT NULL,
	id_curso VARCHAR(40) NOT NULL,
	
	PRIMARY KEY (id_usuario, id_curso),

	CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario)
		REFERENCES usuario(id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,

	CONSTRAINT fk_id_curso FOREIGN KEY (id_curso)
		REFERENCES curso(id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS livro (
	isbn VARCHAR(20) PRIMARY KEY NOT NULL,
	titulo VARCHAR(40),
	edicao VARCHAR(40),
	editora VARCHAR(40),
	qtd_disponivel INTEGER,
	genero TEXT,
	caminho_img TEXT,
	descricao TEXT,
	total_avaliacoes INTEGER,
	total_estrelas INTEGER
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS livro_autor (
	isbn_livro VARCHAR(40) NOT NULL,
	nome_autor VARCHAR(100) NOT NULL,
	
	PRIMARY KEY (isbn_livro, nome_autor),

	CONSTRAINT fk_isbn_livro FOREIGN KEY (isbn_livro)
		REFERENCES livro(isbn)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS historico (
	isbn_livro VARCHAR(40) NOT NULL,
	id_usuario VARCHAR(40) NOT NULL,
	id_bibliotecario VARCHAR(40) NOT NULL,
	criado_em TIMESTAMPTZ,
	atualizado_em TIMESTAMPTZ,
	status historico_enum,
	
	PRIMARY KEY (isbn_livro, id_usuario),

	CONSTRAINT fk_isbn_livro FOREIGN KEY (isbn_livro)
		REFERENCES livro(isbn)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
		
	CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario)
		REFERENCES usuario(id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
		
	CONSTRAINT fk_id_bibliotecario FOREIGN KEY (id_bibliotecario)
		REFERENCES usuario(id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS livro_categoria (
	isbn_livro VARCHAR(40) NOT NULL,
	nome_categoria VARCHAR(80) NOT NULL,
	tipo tipo_categoria_enum,

	PRIMARY KEY (isbn_livro, nome_categoria),

	CONSTRAINT fk_isbn_livro FOREIGN KEY (isbn_livro) 
		REFERENCES livro(isbn)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);