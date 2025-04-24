-- Buscar usuario e seu perfil
-- SELECT usuario.nome, perfil.nome FROM usuario
-- JOIN usuario_perfil
-- ON usuario_perfil.id_usuario = usuario.id
-- JOIN perfil
-- ON perfil.id = usuario_perfil.id_perfil;

DROP TABLE IF EXISTS usuario_perfil;
DROP TABLE IF EXISTS usuario_curso;
DROP TABLE IF EXISTS livro_autor;
DROP TABLE IF EXISTS livro_categoria;
DROP TABLE IF EXISTS emprestimo;
DROP TABLE IF EXISTS curso;
DROP TABLE IF EXISTS perfil;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS autor;
DROP TABLE IF EXISTS livro;
DROP TABLE IF EXISTS categoria;

DROP TYPE IF EXISTS perfil_enum;
DROP TYPE IF EXISTS emprestimo_status_enum;
DROP TYPE IF EXISTS genero_enum;
DROP TYPE IF EXISTS tipo_categoria_enum;

CREATE TYPE perfil_enum AS ENUM('bibliotecario', 'aluno', 'professor');
CREATE TYPE emprestimo_status_enum AS ENUM('ativo', 'inativo');
CREATE TYPE genero_enum AS ENUM('masc', 'fem');
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
	telefone VARCHAR(20)
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS perfil (
	id VARCHAR(40) PRIMARY KEY NOT NULL,
	nome perfil_enum NOT NULL,
	tempo_emprestimo_dias INTEGER
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS usuario_perfil (
	id_usuario VARCHAR(40) NOT NULL,
	id_perfil VARCHAR(40) NOT NULL,
	
	PRIMARY KEY (id_usuario, id_perfil),
	
	CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario)
		REFERENCES usuario(id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,

	CONSTRAINT fk_id_perfil FOREIGN KEY (id_perfil)
		REFERENCES perfil(id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
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
	genero genero_enum,
	caminho_img TEXT,
	descricao TEXT
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS autor (
	id VARCHAR(40) PRIMARY KEY NOT NULL,
	nome VARCHAR(40) NOT NULL
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS livro_autor (
	isbn_livro VARCHAR(40) NOT NULL,
	id_autor VARCHAR(40) NOT NULL,
	
	PRIMARY KEY (isbn_livro, id_autor),

	CONSTRAINT fk_isbn_livro FOREIGN KEY (isbn_livro)
		REFERENCES livro(isbn)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
		
	CONSTRAINT fk_id_autor FOREIGN KEY (id_autor)
		REFERENCES autor(id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- --------------------------------------------

CREATE TABLE IF NOT EXISTS emprestimo (
	isbn_livro VARCHAR(40) NOT NULL,
	id_usuario VARCHAR(40) NOT NULL,
	id_bibliotecario VARCHAR(40) NOT NULL,
	criado_em TIMESTAMPTZ,
	atualizado_em TIMESTAMPTZ,
	status emprestimo_status_enum,
	
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

CREATE TABLE IF NOT EXISTS categoria (
	id VARCHAR(40) PRIMARY KEY,
	nome VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS livro_categoria (
	isbn_livro VARCHAR(20) PRIMARY KEY NOT NULL,
	id_categoria VARCHAR(40),
	tipo tipo_categoria_enum,
	
	CONSTRAINT fk_isbn_livro FOREIGN KEY (isbn_livro) 
		REFERENCES livro(isbn)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT,
		
	CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria)
		REFERENCES categoria(id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
);