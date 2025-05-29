INSERT INTO usuario (id, ra, siape, nome, sobrenome, data_nasc, email, telefone, perfil) VALUES
('u1', 'ra001', NULL, 'Ana', 'Silva', '2000-03-15', 'ana.silva@example.com', '11988887777', 'aluno'),
('u2', NULL, 'siape002', 'Carlos', 'Souza', '1980-06-22', 'carlos.souza@example.com', '11999998888', 'professor'),
('u3', NULL, 'siape003', 'Fernanda', 'Dias', '1975-11-02', 'fernanda.dias@example.com', '11997776666', 'bibliotecario'),
('u4', 'ra004', NULL, 'Lucas', 'Oliveira', '2001-08-09', 'lucas.oliveira@example.com', '11993332222', 'aluno'),
('u5', NULL, 'siape005', 'Patrícia', 'Lima', '1985-01-25', 'patricia.lima@example.com', '11992221111', 'professor');

INSERT INTO curso (id, nome) VALUES
('c1', 'Engenharia'),
('c2', 'Direito'),
('c3', 'Medicina'),
('c4', 'Arquitetura'),
('c5', 'Ciência da Computação');

INSERT INTO usuario_curso (id_usuario, id_curso) VALUES
('u1', 'c5'),
('u4', 'c1'),
('u1', 'c1'),
('u4', 'c5'),
('u5', 'c2'); -- professora atuando como orientadora em Direito

INSERT INTO livro (isbn, titulo, edicao, editora, qtd_disponivel, genero, caminho_img, descricao, total_avaliacoes, total_estrelas) VALUES
('isbn001', 'Introdução à Programação', '1ª', 'Pearson', 3, 'Tecnologia', '/img/prog.jpg', 'Livro introdutório sobre lógica e algoritmos.', 10, 45),
('isbn002', 'Direito Constitucional', '3ª', 'Saraiva', 2, 'Jurídico', '/img/const.jpg', 'Obra essencial para estudantes de Direito.', 7, 35),
('isbn003', 'Anatomia Humana', '2ª', 'Elsevier', 4, 'Saúde', '/img/anatomia.jpg', 'Manual completo de anatomia médica.', 5, 25),
('isbn004', 'História da Arte', '1ª', 'Moderna', 1, 'Artes', '/img/arte.jpg', 'Estudo sobre a evolução da arte no ocidente.', 6, 30),
('isbn005', 'Estruturas de Dados', '4ª', 'Bookman', 5, 'Tecnologia', '/img/ed.jpg', 'Livro sobre listas, árvores e algoritmos.', 12, 55),
('isbn006', 'Lógica para Computação', '2ª', 'Campus', 3, 'Tecnologia', '/img/logica.jpg', 'Fundamentos de lógica aplicada à ciência da computação.', 9, 41),
('isbn007', 'Psicologia do Desenvolvimento', '1ª', 'Vozes', 2, 'Psicologia', '/img/psico.jpg', 'Teorias sobre o crescimento psicológico do ser humano.', 6, 27),
('isbn008', 'Matemática Financeira', '3ª', 'Atlas', 5, 'Finanças', '/img/matfin.jpg', 'Aplicações práticas de matemática no contexto financeiro.', 8, 36),
('isbn009', 'Física Clássica', '4ª', 'LTC', 4, 'Ciência', '/img/fisica.jpg', 'Estudo aprofundado da física newtoniana.', 10, 48),
('isbn010', 'Química Geral', '1ª', 'Moderna', 6, 'Ciência', '/img/quimica.jpg', 'Conceitos básicos da química para iniciantes.', 4, 18),
('isbn011', 'Marketing Digital', '2ª', 'Saraiva', 3, 'Administração', '/img/marketing.jpg', 'Conceitos e estratégias de marketing no meio digital.', 7, 30),
('isbn012', 'Gramática da Língua Portuguesa', '5ª', 'Atual', 8, 'Linguística', '/img/gramatica.jpg', 'Referência completa sobre a gramática do português.', 12, 56),
('isbn013', 'Economia Brasileira', '2ª', 'Contexto', 3, 'Economia', '/img/economia.jpg', 'Análise da evolução da economia no Brasil.', 6, 28),
('isbn014', 'Gestão de Projetos', '3ª', 'Atlas', 4, 'Administração', '/img/projetos.jpg', 'Guia prático de gerenciamento de projetos.', 11, 50),
('isbn015', 'Didática Geral', '4ª', 'Cortez', 5, 'Educação', '/img/didatica.jpg', 'Princípios e métodos de ensino na educação básica.', 7, 32);



INSERT INTO livro_autor (isbn_livro, nome_autor) VALUES
('isbn001', 'João Pereira'),
('isbn002', 'Maria Tavares'),
('isbn003', 'Luiz Eduardo'),
('isbn004', 'Sofia Mendes'),
('isbn005', 'Carlos Henrique'),
('isbn006', 'Ricardo Leite'),
('isbn007', 'Sandra Freitas'),
('isbn008', 'Joana Martins'),
('isbn009', 'Fernando Costa'),
('isbn010', 'Amanda Torres'),
('isbn011', 'Bruno Medeiros'),
('isbn012', 'Letícia Ramos'),
('isbn013', 'Henrique Lopes'),
('isbn014', 'Cláudia Moraes'),
('isbn015', 'Marcos Almeida');

INSERT INTO historico (isbn_livro, id_usuario, id_bibliotecario, criado_em, atualizado_em, status) VALUES
('isbn001', 'u1', 'u3', NOW() - INTERVAL '10 days', NOW() - INTERVAL '5 days', 'ativo'),
('isbn002', 'u4', 'u3', NOW() - INTERVAL '20 days', NOW() - INTERVAL '10 days', 'inativo'),
('isbn003', 'u1', 'u3', NOW() - INTERVAL '7 days', NOW() - INTERVAL '2 days', 'ativo'),
('isbn004', 'u4', 'u3', NOW() - INTERVAL '30 days', NOW() - INTERVAL '1 day', 'inativo'),
('isbn005', 'u1', 'u3', NOW() - INTERVAL '3 days', NOW(), 'ativo');

INSERT INTO categoria (id, nome) VALUES
('cat1', 'Tecnologia'),
('cat2', 'Direito'),
('cat3', 'Saúde'),
('cat4', 'Artes'),
('cat5', 'Educação');

INSERT INTO livro_categoria (isbn_livro, id_categoria, tipo) VALUES
('isbn001', 'cat1', 'categoria'),
('isbn002', 'cat2', 'categoria'),
('isbn003', 'cat3', 'categoria'),
('isbn004', 'cat4', 'categoria'),
('isbn005', 'cat1', 'categoria'),
('isbn006', 'cat1', 'categoria'),     -- Tecnologia
('isbn007', 'cat5', 'categoria'),     -- Educação
('isbn008', 'cat5', 'subcategoria'),  -- Finanças como subcategoria de Educação
('isbn009', 'cat5', 'subcategoria'),  -- Física como parte da Educação
('isbn010', 'cat5', 'subcategoria'),
('isbn011', 'cat5', 'subcategoria'),
('isbn012', 'cat5', 'categoria'),     -- Educação
('isbn013', 'cat5', 'subcategoria'),  -- Economia
('isbn014', 'cat5', 'categoria'),     -- Administração como parte de Educação
('isbn015', 'cat5', 'categoria');     -- Educação