'use client';
import { Box } from '@/components/ui/box';
import styles from './livro.module.css';
import { Text } from '@/components/ui/text';
import Carousel from '@/components/carousel';
import { books } from '@/mock/book';
import Img from '@/components/ui/img';
import { Button } from '@/components/ui/button';
import { Heart, ShareNetwork, Star } from 'phosphor-react';
import { theme } from '@/theme';

export default function LivroClient() {
  return (
    <Box className={styles.container}>
      <div className={styles.livroDetalhes}>
        <Img
          className={styles.imgLivro}
          src="/mock/livro-crepusculo.jpg"
          alt=""
          width={272}
          height={400}
        />

        <div className={styles.conteudo}>
          <Box className={styles.livroHeader}>
            <Box>
              <Text className={styles.titulo}>Crepúsculo</Text>
              <Box className={styles.bookOptions}>
                <Star size={32} className={styles.iconeEstrela}></Star>
                <Star size={32} className={styles.iconeEstrela}></Star>
                <Star size={32} className={styles.iconeEstrela}></Star>
                <Star size={32} className={styles.iconeEstrela}></Star>
                <Star size={32} className={styles.iconeEstrela}></Star>
                
                <Box>
                  <Heart
                    size={32}
                    className={styles.iconeFavorito}
                    style={{ color: theme.colors.danger700 }}
                  />
                  <ShareNetwork className={styles.iconeCompartilhar} size={32} />
                </Box>
              </Box>
            </Box>

            <Button
              className={styles.botaoEnviar}
              style={{ backgroundColor: theme.colors.primary500 } }
              size='sm'
            >
              Enviar
            </Button>
          </Box>

          <Text
            className={styles.descricao}
            style={{ color: theme.colors.gray700 }}
          >
            Bella Swan se muda para Forks para viver com seu pai e logo se
            interessa pelo misterioso Edward Cullen. Inicialmente, ele a evita,
            mas depois revela que é um vampiro e que seu sangue é irresistível
            para ele. Apesar do perigo, os dois se apaixonam e iniciam um
            relacionamento proibido. <br />
            <br />
            A felicidade do casal é ameaçada quando um vampiro rastreador
            chamado James decide caçar Bella. Ela tenta fugir com a ajuda da
            família Cullen, mas acaba caindo em uma armadilha. James a ataca,
            deixando-a gravemente ferida, e Edward precisa agir rapidamente para
            salvar sua vida. <br />
            <br />
            Após se recuperar, Bella insiste que quer se tornar vampira para
            ficar com Edward para sempre, mas ele recusa seu pedido. Apesar das
            dificuldades, os dois continuam juntos, mas o futuro de seu
            relacionamento permanece incerto.
          </Text>
        </div>
      </div>

      <Carousel books={books} title="Títulos Semelhantes" />
    </Box>
  );
}
