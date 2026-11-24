# Monta data/cards.json com os 15 cards do Mundo Concreto e uma landing page para cada um.
# Conteúdo tirado das seções do site www.mundoconcreto.net (cópia em ~/Desktop/cards-site-original/_fonte/index.html).
# Imagens em public/mc/ (cópia de _fonte/dl/assets) e cards em public/cards/NN.png.
# Uso: python3 ferramentas/montar-landings.py   (sobrescreve data/cards.json; faça backup antes)
import json, os, uuid

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, '..', 'data', 'cards.json')
M = '/mc/'


def b(texto, link='#', estilo='amarelo'):
    return dict(texto=texto, link=link, estilo=estilo)


def it(titulo='', texto='', destaque='', img='', cor='', link=''):
    return dict(titulo=titulo, texto=texto, destaque=destaque, img=img, cor=cor, link=link)


def bloco(tipo, itens=(), fundo='', tag='', titulo='', texto='', imagem='', botoes=()):
    return dict(tipo=tipo, fundo=fundo, tag=tag, titulo=titulo, texto=texto, imagem=imagem,
                botoes=list(botoes), itens=list(itens))


CONTATO = '#lp-contato'

PAGINAS = [
    ('Início', 'inicio', dict(
        fundo='claro', tag='Concreto de prático, concreto de quem faz, concreto de construção civil.',
        titulo='Há 20 anos ajudando fábricas de concreto a *produzir mais e lucrar de verdade*',
        texto='Consultoria, missões empresariais, eventos, treinamentos e conteúdo para indústrias de blocos, pisos intertravados, pré-moldados e argamassas. Mais de 1.000 empresas atendidas no Brasil e no exterior.',
        imagem=M + 'marca/simbolo-mundo-concreto-icones.webp',
        botoes=[b('Agendar um diagnóstico', '/diagnostico/'), b('Ver as soluções', '#lp-solucoes', 'contorno')],
        blocos=[bloco('numeros', fundo='papel', tag='Em números', titulo='Duas décadas no chão de fábrica', itens=[
            it('empresas atendidas', '', '1.000+', cor='verde'),
            it('de consultoria no setor', '', '20 anos', cor='amarelo'),
            it('faturamento dos clientes', 'Estimativa, 12 meses.', 'R$ 3,2 bi', cor='laranja'),
            it('estados + DF com atuação', '', '27', cor='azul'),
            it('municípios com empresas atendidas', '', '572', cor='verde'),
            it('parceiros nacionais e internacionais', '', '40+', cor='amarelo')])])),

    ('Quem somos', 'quem-somos', dict(
        fundo='claro', tag='Quem somos',
        titulo='Engenharia, gestão e conexão para a indústria de *artefatos de cimento*',
        texto='20 anos de consultoria para a construção civil, com ênfase em artefatos e pré-moldados de concreto. Uma equipe técnica de várias áreas, com parceiros no Brasil, na América do Sul, nos Estados Unidos e na Europa.',
        imagem=M + 'fotos/filipe-honorato.jpg',
        botoes=[b('Falar com a equipe', CONTATO), b('Ver as soluções', '#lp-solucoes', 'contorno')],
        blocos=[
            bloco('citacao', fundo='ardosia',
                  texto='Construir é um projeto perfeito, com responsabilidade, previsível, quantificável e escalável, a um preço competitivo e que encanta e atende perfeitamente o cliente.',
                  titulo='Msc. Eng. Filipe Honorato, CEO do Mundo Concreto'),
            bloco('cards', fundo='claro', tag='Nossos pilares', titulo='Quatro pilares', imagem=M + 'fotos/quem-somos-pilares.jpg', itens=[
                it('Estratégia', 'Visão clara, metas concretas: quem mede, evolui.', cor='azul'),
                it('Conexão', 'Fortalecemos laços que constroem oportunidades.', cor='laranja'),
                it('Intercâmbio', 'Experiências globais moldando soluções locais.', cor='verde'),
                it('Inovação', 'Tecnologia e mentalidade criativa para transformar a indústria.', cor='amarelo')]),
            bloco('cards', fundo='papel', tag='Nosso propósito', titulo='Missão, visão e valores', imagem=M + 'fotos/missao-visao-valores.jpg', itens=[
                it('Missão', 'Fortalecer o setor de artefatos de cimento no Brasil, promovendo o desenvolvimento técnico, a inovação, a rentabilidade líquida e o empreendedorismo.', cor='verde'),
                it('Visão', 'Ser o principal hub de empresas do setor de produtos à base de cimento do Brasil.', cor='amarelo'),
                it('Valores', 'Excelência técnica e inovação com foco em resultados, conectando fábricas e especialistas para impulsionar o setor.', cor='laranja')])])),

    ('Soluções', 'solucoes', dict(
        fundo='papel', tag='Soluções', titulo='Seis frentes, um objetivo: *o lucro da sua fábrica*',
        texto='ERP GC APP, consultorias, PDE Nacional e workshops, missões empresariais, treinamentos setoriais e o podcast Conexão Concreta.',
        botoes=[b('Agendar um diagnóstico', '/diagnostico/'), b('Ver o sistema', '#lp-erp-gc-app', 'contorno')],
        blocos=[bloco('cards', fundo='claro', tag='As seis frentes', titulo='Escolha por onde começar', itens=[
            it('ERP GC APP', 'Produção, qualidade e manutenção num só sistema, com indicadores automáticos.', 'Ver o sistema', M + 'app/monitoramento-ao-vivo.jpg', 'amarelo', '#lp-erp-gc-app'),
            it('Consultorias', 'Montagem, reestruturação, performance, estratégia, OEE, PDE e selo, mentoria.', 'Ver as consultorias', M + 'fotos/consultoria/filipe-campo-2.jpg', 'verde', '#lp-consultorias'),
            it('PDE Nacional e workshops', 'Eventos técnicos e de mercado pelas capitais do Brasil.', 'Ver os eventos', M + 'fotos/pde/pde-plateia.jpg', 'azul', '#lp-pde-e-eventos'),
            it('Missões empresariais', 'Viagens técnicas próprias e roteiros sob demanda, no Brasil e no exterior.', 'Ver as missões', M + 'fotos/missoes/china-2026.jpg', 'amarelo', '#lp-missoes-empresariais'),
            it('Treinamentos setoriais', 'Trilhas por função, presenciais e na Plataforma de Membros.', 'Ver as trilhas', M + 'app/plataforma-cursos.jpg', 'verde', '#lp-treinamentos-setoriais'),
            it('Podcast Conexão Concreta', 'O primeiro podcast do setor de pré-fabricados de concreto do Brasil.', 'Ouvir episódios', M + 'marca/podcast-conexao-concreta.png', 'laranja', '#lp-podcast-conexao-concreta')])])),

    ('ERP GC APP', 'erp-gc-app', dict(
        fundo='marinho', tag='ERP GC APP', titulo='Dados confiáveis do chão de fábrica, *em tempo real*',
        texto='Uma ferramenta profissional para acompanhar a produção, gerar relatórios precisos e transformar dados em lucro, com consultoria especializada junto. Desenvolvido pela Gestão Concreta, parceira do Mundo Concreto.',
        imagem=M + 'app/monitoramento-ao-vivo.jpg',
        botoes=[b('Entrar no GC APP', '#'), b('Pedir uma demonstração', CONTATO, 'contorno')],
        blocos=[
            bloco('cards', fundo='marinho', tag='Recursos', titulo='Tudo o que a fábrica precisa enxergar', itens=[
                it('Monitoramento em tempo real', 'Produção, paradas e refugo registrados no momento em que acontecem, com câmeras e IA contando ciclos e peças.', cor='verde'),
                it('Indicadores automáticos', 'OEE por turno, por linha e por máquina, com disponibilidade, performance e qualidade. Sem planilha.', cor='amarelo'),
                it('Qualidade e manutenção no mesmo lugar', 'Ensaios pela NBR, laudos, refugo por lote e histórico de cada equipamento.', cor='azul'),
                it('Suporte técnico imediato', 'Alertas de rotina e demandas críticas no celular, e engenheiros do setor acompanhando a implantação.', cor='laranja')]),
            bloco('galeria', fundo='claro', tag='Telas reais', titulo='Telas reais do GC APP',
                  texto='Os alertas chegam direto no celular da equipe.', itens=[
                it('Produção ao vivo', img=M + 'app/monitoramento-ao-vivo.jpg'),
                it('PPCP e OEE', img=M + 'app/producao-ppcp-oee.jpg'),
                it('Qualidade', img=M + 'app/dashboard-qualidade.jpg'),
                it('Análise de blocos', img=M + 'app/analise-de-blocos.jpg'),
                it('Alertas no celular', img=M + 'app/alertas-celular.jpg')]),
            bloco('numeros', fundo='marinho', tag='Ganhos', titulo='O que as fábricas ganham',
                  texto='Resultados máximos informados pela Gestão Concreta. Cada fábrica tem o seu ponto de partida.', itens=[
                it('mais produtividade média', '', 'até 25%', cor='verde'),
                it('menos custos operacionais', '', 'até 30%', cor='amarelo'),
                it('menos tempo de ciclo', '', 'até 40%', cor='azul')])])),

    ('Consultorias', 'consultorias', dict(
        fundo='claro', tag='Consultorias em artefatos e pré-moldados de concreto',
        titulo='Não é teoria: é *conhecimento prático* aplicado',
        texto='Mais de 1.000 empresas atendidas em 20 anos, com ênfase em engenharia, administração, economia, finanças e desenvolvimento de negócios.',
        imagem=M + 'fotos/consultoria/filipe-campo-1.jpg',
        botoes=[b('Falar com um consultor', CONTATO, 'ardosia'), b('Agendar um diagnóstico', '/diagnostico/', 'contorno')],
        blocos=[
            bloco('cards', fundo='papel', tag='O que fazemos', titulo='Seis consultorias, do projeto à rotina',
                  texto='Também oferecemos assessoria técnica e manutenção de equipamentos, e planilhas de controle e gestão: qualidade (SGQ), financeira e técnica.', itens=[
                it('Montagem e reestruturação de indústria', 'Da viabilidade, escolha de máquinas e layout à partida da fábrica. Ou a reorganização de uma operação que parou de crescer.', '01', cor='verde'),
                it('Performance industrial, geral e segmentada', 'Custos, produtividade e margem por produto e por linha, em busca do lucro que hoje escapa.', '02', cor='amarelo'),
                it('Estratégia e posicionamento', 'Mix de produtos, canais de venda, preço e região de atuação definidos com dados de mercado.', '03', cor='azul'),
                it('OEE na prática', 'Análise da operação e das paradas de equipamento, com causa raiz e um plano que a equipe consegue manter.', '04', cor='verde'),
                it('PDE e Selo de Qualidade', 'Preparação da fábrica para os requisitos do PDE e do Selo de Qualidade: processos, ensaios, registros e auditoria.', '05', cor='amarelo'),
                it('Mentoria empresarial', 'Acompanhamento direto do empresário em gestão, investimento, profissionalização, sucessão e governança.', '06', cor='azul')]),
            bloco('galeria', fundo='ardosia', tag='20 anos no chão de fábrica', titulo='A consultoria acontece na fábrica', itens=[
                it('Orientando a equipe no pátio de uma fábrica', img=M + 'fotos/consultoria/filipe-campo-1.jpg'),
                it('Conversa com o gestor na área de manutenção', img=M + 'fotos/consultoria/filipe-campo-2.jpg'),
                it('Visita técnica à linha de produção', img=M + 'fotos/consultoria/filipe-campo-3.jpg')])])),

    ('PDE e eventos', 'pde-e-eventos', dict(
        fundo='ardosia', tag='PDE Nacional e workshops de construção civil',
        titulo='Impulsionando a indústria de artefatos no Brasil: *inovação, mercado e tecnologia*',
        texto='Uma sequência de eventos pelas capitais para desenvolver a indústria de artefatos de cimento e pré-moldados, estimular o mercado e gerar novas soluções. Realização com a ABCP.',
        imagem=M + 'fotos/pde/workshop-filipe.jpg',
        botoes=[b('Ver a agenda de eventos', CONTATO), b('Levar um evento para a minha região', CONTATO, 'contorno')],
        blocos=[
            bloco('cards', fundo='claro', tag='Formatos', titulo='Eventos para cada momento do setor', itens=[
                it('PDE Nacional', 'Palestras, workshops e casos de fábricas sobre máquinas, tecnologia, performance financeira, sucessão, governança, normas, marketing e vendas.', cor='amarelo'),
                it('Novidade 2026: PDM', 'O Programa de Desenvolvimento de Mercado acompanha o PDE para estimular o uso de soluções em artefatos de concreto.', cor='verde'),
                it('Workshops de construção civil', 'Formatos de meio dia ou um dia para construtoras, revendas, projetistas e fábricas, com entidades locais.', cor='azul'),
                it('Palestra em destaque', 'A fábrica ideal: pensando para 10 anos e múltiplos produtos. Com Filipe Honorato.', cor='laranja')]),
            bloco('galeria', fundo='ardosia', tag='Galeria', titulo='Fotos dos eventos',
                  texto='PDE Nacional, PDM e workshops: álbuns completos no Google Drive.',
                  botoes=[b('Ver álbum completo', 'https://drive.google.com/drive/folders/14RDGlbTEhYzv2hXmAK3AzoVEhHoMsyjL?usp=sharing', 'contorno')], itens=[
                it('Workshop Impulsionando a indústria de artefatos no Brasil', img=M + 'fotos/pde/workshop-filipe.jpg'),
                it('Conexão Mercado & Artefatos · Serra Gaúcha/RS', img=M + 'fotos/pde/pde-serra-gaucha.jpg'),
                it('Empresários do setor reunidos no PDE', img=M + 'fotos/pde/pde-plateia.jpg')])])),

    ('Missões empresariais', 'missoes-empresariais', dict(
        fundo='papel', tag='Missões empresariais', titulo='Conectar mentes que *moldam estruturas*',
        texto='Visitas técnicas a fábricas, fabricantes de máquinas, escritórios de projeto e feiras, com acompanhamento técnico, networking e geração de negócios.',
        imagem=M + 'fotos/missoes/china-2026.jpg',
        botoes=[b('Quero participar da próxima missão', CONTATO, 'ardosia'), b('Montar uma missão sob demanda', CONTATO, 'contorno')],
        blocos=[
            bloco('etiquetas', fundo='papel', tag='Destinos', titulo='Para onde já levamos empresários', itens=[
                it(x) for x in ['China', 'Alemanha', 'Itália', 'França', 'Espanha', 'Sérvia', 'Chile']]),
            bloco('cards', fundo='claro', tag='Roteiros', titulo='Missões realizadas e formatos', itens=[
                it('Missão China', 'Hong Kong, Macau, Shanghai, Guangzhou e Quanzhou. Fábricas de pisos, blocos, tubos e moldes, escritórios de projeto, obras e a feira CCPA.', 'Realizada de 13 a 23 de setembro de 2026', cor='amarelo'),
                it('Missão Alemanha', 'Roteiro técnico pela Alemanha: fabricantes de máquinas para blocos e pisos, moldes e fôrmas, fábricas de artefatos e pré-moldados de referência e centros de tecnologia do concreto.', 'Realizada de 18 a 28 de janeiro de 2026', cor='verde'),
                it('Missões próprias', 'Calendário anual do Mundo Concreto, em grupo de empresários do setor. Mais de 50 intercâmbios nacionais em SP, MG, SC, RJ e outros estados.', cor='azul'),
                it('Missões sob demanda', 'Roteiro desenhado para a sua empresa ou entidade: fábricas, fornecedores e feiras escolhidos a partir do seu objetivo.', cor='laranja')]),
            bloco('numeros', fundo='ardosia', tag='Clube Mundo Concreto', titulo='Fabricantes que trocam experiências',
                  texto='Fabricantes que são referência na sua área trocam experiências, fazem compras coletivas e têm condições especiais nas missões.', itens=[
                it('fabricantes no Clube Mundo Concreto', '', '25', cor='amarelo'),
                it('visitas de intercâmbio entre empresas', '', '70+', cor='verde'),
                it('intercâmbios nacionais', '', '50+', cor='azul')]),
            bloco('galeria', fundo='claro', tag='Galeria', titulo='Fotos das missões', itens=[
                it('Missão China 2026', img=M + 'fotos/missoes/china-2026.jpg'),
                it('Bauma 2025, Munique (Alemanha)', img=M + 'fotos/missoes/bauma-alemanha-2025.jpg'),
                it('Visita técnica, Alemanha 2025', img=M + 'fotos/missoes/visita-tecnica-alemanha-2025.jpg'),
                it('Missão China 2024', img=M + 'fotos/missoes/china-2024.jpg'),
                it('Visita técnica, China 2026', img=M + 'fotos/missoes/visita-tecnica-china-2026.jpg'),
                it('Intercâmbio nacional: fábrica de tubos', img=M + 'fotos/missoes/intercambio-nacional-2024.jpg'),
                it('Intercâmbio nacional: fábrica de equipamentos', img=M + 'fotos/missoes/intercambio-nacional-2024-b.jpg'),
                it('Intercâmbio nacional 2026', img=M + 'fotos/missoes/intercambio-nacional-2026.jpg'),
                it('Missão Europa 2025, Espanha', img=M + 'fotos/missoes/missao-europa-2025.jpg')])])),

    ('Treinamentos setoriais', 'treinamentos-setoriais', dict(
        fundo='claro', tag='Treinamentos setoriais', titulo='Capacitação contínua para *cada função da fábrica*',
        texto='Cursos, capacitações e treinamentos personalizados, na sua empresa ou online. Na plataforma Gestão Concreta: trilhas por função, certificados, e-books, palestras com especialistas, comunidade e inteligência artificial para tirar dúvidas.',
        imagem=M + 'app/plataforma-boas-vindas.jpg',
        botoes=[b('Conhecer a plataforma', 'https://gestaoconcreta.app.cativa.digital/showcase/92802717-e64b-4e84-b713-08de93db0d60', 'ardosia'),
                b('Pedir um treinamento in company', CONTATO, 'contorno')],
        blocos=[
            bloco('cards', fundo='papel', tag='Trilhas por função', titulo='Uma trilha para cada pessoa da fábrica', itens=[
                it('Operação de vibroprensa', 'Ciclo, regulagem, troca de molde e cuidados diários.', cor='azul'),
                it('Laboratório e qualidade', 'Traço, ensaios, cura e controle por bandeja.', cor='laranja'),
                it('Manutenção industrial', 'Preventiva, lubrificação e manutenção dimensional.', cor='verde'),
                it('Liderança e rotina', 'Metas, reuniões curtas e gestão à vista com OEE e 5S.', cor='verde'),
                it('Custos e finanças', 'Margem por produto, ponto de equilíbrio e fluxo de caixa.', cor='azul'),
                it('Marketing e vendas', 'Venda consultiva para construtoras, revendas e obras públicas.', cor='laranja')]),
            bloco('galeria', fundo='marinho', tag='Plataforma Gestão Concreta', titulo='Telas reais da plataforma',
                  texto='Cursos, pílulas diárias, comunidade e eventos.', itens=[
                it('Boas-vindas', img=M + 'app/plataforma-boas-vindas.jpg'),
                it('Cursos', img=M + 'app/plataforma-cursos.jpg'),
                it('Comunidade', img=M + 'app/plataforma-comunidade.jpg')])])),

    ('Podcast Conexão Concreta', 'podcast-conexao-concreta', dict(
        fundo='grafite', tag='Podcast', titulo='Conexão *Concreta*',
        texto='O primeiro podcast do setor de pré-fabricados de concreto do Brasil. Conversas com quem decide o futuro da indústria, apresentadas por Msc. Eng. Filipe Honorato e Eng. Pedro de Aquino.',
        imagem=M + 'marca/podcast-conexao-concreta.webp',
        botoes=[b('Ouvir no Spotify', '#', 'spotify'), b('Assistir no YouTube', '#', 'contorno')],
        blocos=[
            bloco('numeros', fundo='grafite', tag='O formato', titulo='Como é cada temporada', itens=[
                it('episódios por temporada', '', '10', cor='amarelo'),
                it('minutos por episódio', '', '40 a 90', cor='verde'),
                it('no YouTube, depois em áudio', '', 'Ao vivo', cor='azul')]),
            bloco('etiquetas', fundo='claro', tag='Temas', titulo='Sobre o que conversamos', itens=[
                it(x) for x in ['Processo produtivo', 'Manutenção', 'Automação', 'Inovação', 'Governança e sucessão', 'Performance financeira', 'Máquinas e equipamentos']]),
            bloco('texto', fundo='ardosia', tag='Patrocínio', titulo='Anuncie no Conexão Concreta',
                  texto='Sua marca para donos e gestores de fábricas de pré-fabricados: patrocínio por episódio, por temporada ou master, com logomarca na tela, menções, inserções e cortes oficiais.',
                  botoes=[b('Quero anunciar', CONTATO)])])),

    ('Resultados', 'resultados', dict(
        fundo='papel', tag='Experiência de clientes', titulo='O que muda depois de trabalhar com o *Mundo Concreto*',
        texto='Resultados medidos em fábricas atendidas pela consultoria.',
        botoes=[b('Agendar um diagnóstico', '/diagnostico/'), b('Falar com a equipe', CONTATO, 'contorno')],
        blocos=[bloco('numeros', fundo='ardosia', tag='Casos', titulo='Resultados de clientes', itens=[
            it('Pisos drenantes · Empresa Alpha', 'Fábrica com 20 anos sem padrão, cuja resistência variava de 10 a 30 MPa, passou a trabalhar com resistência-alvo e espessura fixa. O custo por peça passou a ser medido.', '25 MPa', cor='verde'),
            it('Linha complementar · Empresa Beta', 'Um pedido que quase foi recusado revelou uma linha de produtos com o dobro da margem líquida do piso intertravado.', '30% de margem', cor='amarelo'),
            it('Programa Conexões Corporativas · SEBRAE/AM', 'Dez empresas acompanhadas com consultoria, 5S e ranking de evolução ao longo do programa.', '830 horas', cor='azul')])])),

    ('Parceiros', 'parceiros', dict(
        fundo='claro', tag='Parceiros', titulo='Quem constrói essa *rede com a gente*',
        texto='Entidades do setor e fabricantes de máquinas do Brasil e do exterior que participam dos eventos, das missões e dos projetos do Mundo Concreto.',
        botoes=[b('Propor uma parceria', CONTATO, 'ardosia')],
        blocos=[
            bloco('logos', fundo='papel', tag='Parceiros', titulo='Alguns dos nossos parceiros',
                  texto='São mais de 40 parceiros nacionais e internacionais. Acima, os que autorizaram a divulgação.', itens=[
                it('ABCP', img=M + 'parceiros/abcp.png'), it('SEBRAE', img=M + 'parceiros/sebrae.png'),
                it('Besser', img=M + 'parceiros/besser.png'), it('Piorotti', img=M + 'parceiros/piorotti.png'),
                it('Rama', img=M + 'parceiros/rama.png')]),
            bloco('lista', fundo='ardosia', tag='Seja parceiro', titulo='Vamos construir juntos',
                  texto='O Mundo Concreto fala todos os meses com milhares de donos e gestores de fábricas, com mais de 50 mil seguidores no Instagram. Se o seu produto resolve um problema deles, vamos construir juntos.',
                  botoes=[b('Propor uma parceria', CONTATO)], itens=[
                it('Patrocínio do PDE Nacional', 'Presença da sua marca nos eventos pelas capitais.'),
                it('Missões empresariais', 'Representante na missão, almoço ou jantar patrocinado e visibilidade com o grupo.'),
                it('Podcast Conexão Concreta', 'Cotas por episódio, por temporada ou master.'),
                it('Feiras e estandes', 'Presença do CEO no seu estande em feiras como a Concrete Show, com entrevista, fotos e vídeo.'),
                it('Livro Fábrica', 'Patrocínio de edição, com exemplares para os seus clientes e um evento sobre o tema.')])])),

    ('Cabeçalho', 'cabecalho', dict(
        fundo='claro', tag='Menu e acessos', titulo='Tudo do *Mundo Concreto* em um só lugar',
        texto='Quem somos, Soluções, Missões, Podcast, Clientes, Parceiros e Falar com a equipe.',
        imagem=M + 'marca/logo-mundo-concreto-horizontal.png',
        botoes=[b('Entrar no GC APP', '#'), b('Plataforma de Membros', '#', 'contorno')],
        blocos=[bloco('cards', fundo='papel', tag='Menu', titulo='Vá direto ao assunto', itens=[
            it('Quem somos', 'Engenharia, gestão e conexão para a indústria.', cor='verde', link='#lp-quem-somos'),
            it('Soluções', 'Seis frentes, um objetivo: o lucro da sua fábrica.', cor='amarelo', link='#lp-solucoes'),
            it('Missões', 'Viagens técnicas no Brasil e no exterior.', cor='azul', link='#lp-missoes-empresariais'),
            it('Podcast', 'O podcast Conexão Concreta.', cor='laranja', link='#lp-podcast-conexao-concreta'),
            it('Clientes', 'Experiência e resultados de clientes.', cor='verde', link='#lp-resultados'),
            it('Parceiros', 'Quem constrói essa rede com a gente.', cor='amarelo', link='#lp-parceiros'),
            it('Falar com a equipe', 'Conte o que está acontecendo na sua fábrica.', cor='azul', link=CONTATO)])])),

    ('Livro e e-book', 'livro-e-e-book', dict(
        fundo='claro', tag='Livro · Editora Viseu', titulo='Fábrica: *Operação Simples e Lucrativa*',
        texto='Mais de 50 estudos de caso, formulários e croquis do dia a dia de fábricas de artefatos e pré-moldados. A primeira edição, de 1.000 exemplares, esgotou em dois meses e meio. A segunda edição chega revisada e atualizada.\n\nPor Msc. Eng. Filipe Honorato, CEO do Mundo Concreto.',
        imagem=M + 'fotos/livro-fabrica.jpg',
        botoes=[b('Quero o livro', CONTATO, 'ardosia'), b('Ver também o e-book OEE', '#bloco-2', 'contorno')],
        blocos=[
            bloco('etiquetas', fundo='papel', tag='No livro', titulo='O que você encontra', itens=[
                it(x) for x in ['50 estudos de caso', 'Formulários prontos', 'Croquis do dia a dia', '1ª edição esgotada']]),
            bloco('etiquetas', fundo='marinho', tag='E-book técnico · 2026', titulo='Parou *por quê?* Da bandeja ao resultado',
                  texto='O impacto da Eficácia Global do Equipamento (OEE) na lucratividade da sua fábrica de artefatos de concreto e pré-moldados. Um guia prático para medir, entender as paradas e transformar produção em lucro.\n\nPor Msc. Eng. Filipe Honorato, CEO do Mundo Concreto e autor de Fábrica: Operação Simples e Lucrativa.',
                  imagem=M + 'fotos/ebook-oee.jpg',
                  botoes=[b('Quero o e-book', CONTATO, 'teal'), b('Medir o OEE no GC APP', '#lp-erp-gc-app', 'contorno')], itens=[
                it(x) for x in ['Os 3 pilares do OEE', 'Como calcular', 'Desvio-padrão e cimento', 'Custo e rentabilidade', 'Posicionamento de mercado', 'Casos reais', 'Plano de 90 dias']])])),

    ('Contato', 'contato', dict(
        fundo='ardosia', tag='Contato', titulo='Conte o que está acontecendo *na sua fábrica*',
        texto='Respondemos em até um dia útil. Se preferir, chame direto no WhatsApp.',
        botoes=[b('Chamar no WhatsApp', '#'), b('Enviar e-mail', '#', 'contorno')],
        blocos=[bloco('cards', fundo='claro', tag='Canais', titulo='Fale com a equipe', itens=[
            it('WhatsApp', 'Atendimento comercial direto com a equipe.', cor='verde', link='#'),
            it('E-mail', 'Nome, empresa, cidade, assunto e mensagem. Seus dados são usados só para responder ao contato, conforme a LGPD.', cor='amarelo', link='#'),
            it('Onde estamos', 'Itatiaia/RJ · atendimento em todo o Brasil, na América do Sul, nos Estados Unidos e na Europa.', cor='azul')]),
            bloco('etiquetas', fundo='papel', tag='Assuntos', titulo='Sobre o que você quer falar?', itens=[
                it(x) for x in ['Consultoria', 'ERP GC APP', 'PDE Nacional e workshops', 'Missões empresariais', 'Treinamentos', 'Podcast Conexão Concreta', 'Parceria']])])),

    ('Rodapé', 'rodape', dict(
        fundo='grafite', tag='Concreto de prático, concreto de quem faz, concreto de construção civil.',
        titulo='Mundo *Concreto*',
        texto='Links de soluções, acessos e pessoas do Mundo Concreto. ERP GC APP por Gestão Concreta.',
        imagem=M + 'marca/logo-mundo-concreto-horizontal-branco.png',
        botoes=[b('Falar com a equipe', CONTATO), b('Política de privacidade', '#', 'contorno')],
        blocos=[
            bloco('cards', fundo='grafite', tag='Soluções', titulo='Soluções', itens=[
                it('ERP GC APP', cor='amarelo', link='#lp-erp-gc-app'),
                it('Consultorias', cor='verde', link='#lp-consultorias'),
                it('PDE Nacional e workshops', cor='azul', link='#lp-pde-e-eventos'),
                it('Missões empresariais', cor='amarelo', link='#lp-missoes-empresariais'),
                it('Treinamentos setoriais', cor='verde', link='#lp-treinamentos-setoriais'),
                it('Podcast Conexão Concreta', cor='laranja', link='#lp-podcast-conexao-concreta')]),
            bloco('cards', fundo='ardosia', tag='Acessos', titulo='Acessos', itens=[
                it('Entrar no GC APP', cor='amarelo', link='#'),
                it('Plataforma de Membros', cor='verde', link='#'),
                it('Seja parceiro', cor='azul', link='#lp-parceiros'),
                it('Contato', cor='laranja', link=CONTATO)])])),
]

cards = []
for i, (titulo, slug, lp) in enumerate(PAGINAS, 1):
    base = dict(ativa=True, imagem='', botoes=[], blocos=[]); base.update(lp); lp = base
    cards.append(dict(id=str(uuid.uuid4()), title=titulo, slug=slug, link='#', thumbnail=f'/cards/{i:02d}.png', active=True, landing=lp))

with open(SAIDA, 'w', encoding='utf-8') as f:
    json.dump(cards, f, ensure_ascii=False, indent=2)
print(len(cards), 'cards gravados em', os.path.normpath(SAIDA))
