/* Base do diagnóstico gratuito (versão 2.0).
   Origem: planilha 012_Diagnostico_Setorial_Selo_ABCP_Rotinas (aba 04A_BASE_QUESTIONARIO).
   Perguntas repetidas ou muito próximas foram unidas (249 → 171) e o texto foi revisado.
   Campos: areas = ordem das áreas; temas = {t: tema, a: área, p: peso, rec: recomendação,
   prod: soluções indicadas}; perguntas = {n: número, t: tema, q: pergunta, s: 1 se conta
   para o Selo ABCP, o: números da planilha original}; produtos = catálogo de soluções.
   Para mudar uma pergunta, edite só o texto entre aspas. Não apague vírgulas nem chaves. */
window.DIAGNOSTICO = {
 "versao": "v6 · 2.0 (base: planilha 012_Diagnostico_Setorial_Selo_ABCP_Rotinas; perguntas repetidas unidas e texto revisado)",
 "escala": [
  [
   "01 – Inexistente",
   1
  ],
  [
   "02 – Muito incipiente",
   2
  ],
  [
   "03 – Iniciado, sem método",
   3
  ],
  [
   "04 – Parcial e informal",
   4
  ],
  [
   "05 – Implantado de forma irregular",
   5
  ],
  [
   "06 – Implantado, sem medição",
   6
  ],
  [
   "07 – Implantado e medido",
   7
  ],
  [
   "08 – Padronizado e medido",
   8
  ],
  [
   "09 – Padronizado, medido e em melhoria",
   9
  ],
  [
   "10 – Excelência: referência no setor",
   10
  ],
  [
   "N/A – Não se aplica",
   null
  ]
 ],
 "areas": [
  "Estratégia e Gestão",
  "Finanças e Administração",
  "Comercial e Vendas",
  "Liderança e Pessoas",
  "Presença Digital",
  "Produção e PCP",
  "OEE e Produtividade",
  "Manutenção e Equipamentos",
  "Materiais, Almoxarifado e Expedição",
  "Sistema de Gestão da Qualidade",
  "Qualidade do Produto e Selo ABCP",
  "Segurança do Trabalho"
 ],
 "temas": [
  {
   "t": "Direção e planejamento",
   "a": "Estratégia e Gestão",
   "p": 3,
   "rec": "Escreva a missão, os valores e as metas do ano e revise-os com a equipe a cada trimestre.",
   "prod": [
    "mentoria",
    "cons-est",
    "livro"
   ],
   "prio": "Baixa prioridade"
  },
  {
   "t": "Gestão de indicadores e rotina",
   "a": "Estratégia e Gestão",
   "p": 9,
   "rec": "Defina poucos indicadores por área, mostre-os num quadro e trate cada desvio com plano de ação (PDCA).",
   "prod": [
    "erp",
    "blindada",
    "cons-prod"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Controles, DRE e indicadores",
   "a": "Finanças e Administração",
   "p": 7,
   "rec": "Feche a DRE gerencial todo mês, com margem de contribuição por produto e ponto de equilíbrio.",
   "prod": [
    "cons-fin",
    "planilhas",
    "livro"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Fluxo de caixa e capital de giro",
   "a": "Finanças e Administração",
   "p": 9,
   "rec": "Projete o caixa das próximas 13 semanas, concilie o banco toda semana e mantenha uma reserva de capital de giro.",
   "prod": [
    "cons-fin",
    "planilhas"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Custos, preços e estoque",
   "a": "Finanças e Administração",
   "p": 3,
   "rec": "Separe custos fixos, variáveis e impostos e forme o preço a partir do custo e da margem desejada.",
   "prod": [
    "cons-fin",
    "livro",
    "erp"
   ],
   "prio": "Baixa prioridade"
  },
  {
   "t": "Crédito e cobrança",
   "a": "Finanças e Administração",
   "p": 3,
   "rec": "Defina limite e prazo por cliente antes de vender a prazo e tenha uma rotina semanal de cobrança.",
   "prod": [
    "cons-fin",
    "crm"
   ],
   "prio": "Baixa prioridade"
  },
  {
   "t": "Planejamento, dívidas e investimentos",
   "a": "Finanças e Administração",
   "p": 4,
   "rec": "Faça o orçamento do ano, mantenha o mapa de dívidas e decida investimentos por retorno (payback e TIR).",
   "prod": [
    "cons-fin",
    "mentoria",
    "cons-mont"
   ],
   "prio": "Média prioridade"
  },
  {
   "t": "Mercado e marketing",
   "a": "Comercial e Vendas",
   "p": 3,
   "rec": "Conheça o seu público e os concorrentes e escreva um plano de marketing simples, com metas.",
   "prod": [
    "cons-com",
    "cons-est",
    "pde"
   ],
   "prio": "Baixa prioridade"
  },
  {
   "t": "Gestão comercial e funil de vendas",
   "a": "Comercial e Vendas",
   "p": 3,
   "rec": "Coloque todos os orçamentos num funil, com responsável e data de retorno, e acompanhe a conversão toda semana.",
   "prod": [
    "crm",
    "cons-com"
   ],
   "prio": "Baixa prioridade"
  },
  {
   "t": "Atendimento",
   "a": "Comercial e Vendas",
   "p": 3,
   "rec": "Escreva o padrão de atendimento, treine a equipe e meça a satisfação de forma sistemática.",
   "prod": [
    "crm",
    "plataforma",
    "cons-com"
   ],
   "prio": "Baixa prioridade"
  },
  {
   "t": "Liderança",
   "a": "Liderança e Pessoas",
   "p": 3,
   "rec": "Deixe claro quem lidera o quê, avalie os líderes e invista na formação deles.",
   "prod": [
    "mentoria",
    "plataforma",
    "ge"
   ],
   "prio": "Baixa prioridade"
  },
  {
   "t": "Jornada, ponto e treinamento",
   "a": "Liderança e Pessoas",
   "p": 7,
   "rec": "Controle ponto, banco de horas e absenteísmo e monte a matriz de polivalência dos operadores.",
   "prod": [
    "plataforma",
    "incompany",
    "cons-fin"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Identidade visual e conteúdo",
   "a": "Presença Digital",
   "p": 7,
   "rec": "Padronize a identidade visual e publique conteúdo técnico com calendário e resultados medidos.",
   "prod": [
    "cons-com",
    "cons-est"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Canais digitais",
   "a": "Presença Digital",
   "p": 3,
   "rec": "Tenha perfis e site profissionais e use o WhatsApp Business com o número da empresa.",
   "prod": [
    "crm",
    "cons-com"
   ],
   "prio": "Baixa prioridade"
  },
  {
   "t": "Google e alcance",
   "a": "Presença Digital",
   "p": 3,
   "rec": "Cadastre o Perfil da Empresa no Google, peça avaliações e teste anúncios com orçamento controlado.",
   "prod": [
    "cons-com",
    "cons-est"
   ],
   "prio": "Baixa prioridade"
  },
  {
   "t": "Planejamento e controle da produção (PCP)",
   "a": "Produção e PCP",
   "p": 9,
   "rec": "Programe a semana por máquina e produto e confira o cumprimento do programa todos os dias.",
   "prod": [
    "erp",
    "cons-prod",
    "livro"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Apontamento e rotina do turno",
   "a": "Produção e PCP",
   "p": 9,
   "rec": "Aponte a produção hora a hora e feche o turno com check-list assinado pelo operador e pelo líder.",
   "prod": [
    "erp",
    "blindada",
    "cons-prod"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Disponibilidade",
   "a": "OEE e Produtividade",
   "p": 9,
   "rec": "Registre todas as paradas com motivo, faça o Pareto semanal e ataque as três maiores causas.",
   "prod": [
    "cons-oee",
    "erp",
    "cons-man"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Performance",
   "a": "OEE e Produtividade",
   "p": 9,
   "rec": "Defina o ciclo padrão por produto e compare com a velocidade real em cada turno.",
   "prod": [
    "cons-oee",
    "erp"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Qualidade na linha",
   "a": "OEE e Produtividade",
   "p": 9,
   "rec": "Conte o refugo por produto e turno, faça o Pareto das causas e defina meta de índice de qualidade.",
   "prod": [
    "cons-oee",
    "cons-qprod"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Gestão de indicadores",
   "a": "OEE e Produtividade",
   "p": 7,
   "rec": "Calcule o OEE por máquina, mostre no quadro e discuta com a equipe todos os dias.",
   "prod": [
    "erp",
    "cons-oee"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Manutenção preventiva e preditiva",
   "a": "Manutenção e Equipamentos",
   "p": 9,
   "rec": "Monte o plano preventivo por equipamento, registre cada ordem de serviço e acompanhe MTBF e MTTR.",
   "prod": [
    "cons-man",
    "erp"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Cadastro, moldes e calibração",
   "a": "Manutenção e Equipamentos",
   "p": 7,
   "rec": "Cadastre os equipamentos, programe a troca dos moldes e calibre balanças e sensores com registro.",
   "prod": [
    "cons-man",
    "erp",
    "cons-lab"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Inspeção diária dos equipamentos",
   "a": "Manutenção e Equipamentos",
   "p": 9,
   "rec": "Use check-lists diários na vibroprensa, no misturador e nas empilhadeiras e transforme cada desvio em ordem de serviço.",
   "prod": [
    "erp",
    "cons-man",
    "blindada"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Almoxarifado",
   "a": "Materiais, Almoxarifado e Expedição",
   "p": 4,
   "rec": "Organize e enderece o almoxarifado, registre cada entrada e saída e defina estoque mínimo.",
   "prod": [
    "erp",
    "cons-fin"
   ],
   "prio": "Média prioridade"
  },
  {
   "t": "Insumos e fornecedores",
   "a": "Materiais, Almoxarifado e Expedição",
   "p": 9,
   "rec": "Confira cada carga no recebimento, guarde os insumos do jeito certo e compare o consumo de cimento com o traço.",
   "prod": [
    "cons-lab",
    "cons-qprod",
    "erp"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Pátio, paletes e expedição",
   "a": "Materiais, Almoxarifado e Expedição",
   "p": 4,
   "rec": "Endereçe o pátio por produto e lote, respeite a idade de cura na expedição e controle o saldo de paletes.",
   "prod": [
    "erp",
    "cons-prod",
    "cons-mont"
   ],
   "prio": "Média prioridade"
  },
  {
   "t": "Documentos, procedimentos e 5S",
   "a": "Sistema de Gestão da Qualidade",
   "p": 7,
   "rec": "Mantenha os procedimentos no posto de trabalho, controle os documentos e audite o 5S toda semana.",
   "prod": [
    "cons-qual",
    "erp",
    "blindada"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Não conformidades e clientes",
   "a": "Sistema de Gestão da Qualidade",
   "p": 7,
   "rec": "Registre reclamações e não conformidades com causa e ação e pergunte ao cliente na obra como foi a entrega.",
   "prod": [
    "cons-qual",
    "crm",
    "erp"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Documentação legal e responsável técnico",
   "a": "Qualidade do Produto e Selo ABCP",
   "p": 7,
   "rec": "Reúna a documentação legal e designe o responsável técnico pela qualidade e pelo programa do Selo.",
   "prod": [
    "cons-selo"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Matérias-primas",
   "a": "Qualidade do Produto e Selo ABCP",
   "p": 9,
   "rec": "Qualifique cimento, agregados, aditivos, pigmentos e água e ensaie a granulometria pelo menos uma vez por mês.",
   "prod": [
    "cons-lab",
    "cons-selo"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Dosagem e mistura",
   "a": "Qualidade do Produto e Selo ABCP",
   "p": 9,
   "rec": "Dose em massa, corrija a umidade da areia todos os dias e mantenha constantes a água, o aditivo e o tempo de mistura.",
   "prod": [
    "cons-qprod",
    "cons-prod",
    "erp"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Vibroprensa e moldagem",
   "a": "Qualidade do Produto e Selo ABCP",
   "p": 9,
   "rec": "Ajuste a vibroprensa por produto, controle a altura com gabarito e registre o refugo por motivo.",
   "prod": [
    "cons-prod",
    "cons-qprod",
    "erp"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Cura",
   "a": "Qualidade do Produto e Selo ABCP",
   "p": 9,
   "rec": "Use cura homogênea e contínua, em câmara, e registre tempo e temperatura por lote.",
   "prod": [
    "cons-qprod",
    "cons-mont"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Transporte interno e armazenamento",
   "a": "Qualidade do Produto e Selo ABCP",
   "p": 4,
   "rec": "Transporte as peças sem impacto, com piso nivelado, e entregue sempre paletizado.",
   "prod": [
    "cons-mont",
    "cons-prod"
   ],
   "prio": "Média prioridade"
  },
  {
   "t": "Rastreabilidade",
   "a": "Qualidade do Produto e Selo ABCP",
   "p": 9,
   "rec": "Identifique peças e paletes com lote, data e classe e informe o lote na nota fiscal.",
   "prod": [
    "erp",
    "cons-selo"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "p": 9,
   "rec": "Ensaie cada lote conforme a norma, acompanhe os resultados em gráfico e calibre os equipamentos do laboratório.",
   "prod": [
    "cons-lab",
    "erp",
    "cons-selo"
   ],
   "prio": "Alta prioridade"
  },
  {
   "t": "Regulamento, autoavaliação e divulgação",
   "a": "Qualidade do Produto e Selo ABCP",
   "p": 7,
   "rec": "Faça a autoavaliação pelo check-list FR 010 e trate cada não conformidade com plano de ação antes da auditoria.",
   "prod": [
    "cons-selo",
    "pde"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Máquinas, EPI e acidentes",
   "a": "Segurança do Trabalho",
   "p": 7,
   "rec": "Proteja as máquinas conforme a NR-12, controle os EPIs com ficha e investigue todo acidente e quase acidente.",
   "prod": [
    "incompany",
    "erp"
   ],
   "prio": "Prioritário"
  },
  {
   "t": "Segurança operacional",
   "a": "Segurança do Trabalho",
   "p": 7,
   "rec": "Exija permissão de trabalho e bloqueio de energias na limpeza do misturador e faça o DSS toda semana.",
   "prod": [
    "incompany",
    "blindada"
   ],
   "prio": "Prioritário"
  }
 ],
 "perguntas": [
  {
   "n": 1,
   "t": "Direção e planejamento",
   "a": "Estratégia e Gestão",
   "q": "A empresa tem missão, valores e metas anuais escritos e comunicados à equipe?",
   "o": [
    81,
    38
   ]
  },
  {
   "n": 2,
   "t": "Direção e planejamento",
   "a": "Estratégia e Gestão",
   "q": "A expansão (nova linha, nova fábrica ou nova região) é planejada com estudo de mercado e plano de negócios?",
   "o": [
    48,
    49,
    50,
    51
   ]
  },
  {
   "n": 3,
   "t": "Gestão de indicadores e rotina",
   "a": "Estratégia e Gestão",
   "q": "Cada área (produção, qualidade, vendas e finanças) tem indicadores definidos, com meta?",
   "o": [
    204
   ]
  },
  {
   "n": 4,
   "t": "Gestão de indicadores e rotina",
   "a": "Estratégia e Gestão",
   "q": "Há reuniões periódicas de análise dos indicadores, com registro das decisões?",
   "o": [
    205,
    245
   ]
  },
  {
   "n": 5,
   "t": "Gestão de indicadores e rotina",
   "a": "Estratégia e Gestão",
   "q": "Os desvios dos indicadores, inclusive as perdas de OEE, geram planos de ação com responsável e prazo, acompanhados até o fim (PDCA)?",
   "o": [
    206,
    115
   ]
  },
  {
   "n": 6,
   "t": "Gestão de indicadores e rotina",
   "a": "Estratégia e Gestão",
   "q": "Existe quadro de gestão à vista atualizado em cada área (produção, qualidade e segurança)?",
   "o": [
    247
   ]
  },
  {
   "n": 7,
   "t": "Gestão de indicadores e rotina",
   "a": "Estratégia e Gestão",
   "q": "Há uma reunião curta no início do turno, com as metas do dia e os problemas do dia anterior?",
   "o": [
    249
   ]
  },
  {
   "n": 8,
   "t": "Gestão de indicadores e rotina",
   "a": "Estratégia e Gestão",
   "q": "A empresa usa um sistema (ERP) que integra produção, estoque, vendas e financeiro?",
   "o": [
    207,
    12
   ]
  },
  {
   "n": 9,
   "t": "Controles, DRE e indicadores",
   "a": "Finanças e Administração",
   "q": "A empresa registra todas as entradas e saídas de dinheiro?",
   "o": [
    1
   ]
  },
  {
   "n": 10,
   "t": "Controles, DRE e indicadores",
   "a": "Finanças e Administração",
   "q": "Existe plano de contas que represente de verdade os custos e as receitas, e o empresário domina cada conta?",
   "o": [
    16
   ]
  },
  {
   "n": 11,
   "t": "Controles, DRE e indicadores",
   "a": "Finanças e Administração",
   "q": "A empresa elabora a DRE gerencial todo mês (regime de competência)?",
   "o": [
    25,
    10
   ]
  },
  {
   "n": 12,
   "t": "Controles, DRE e indicadores",
   "a": "Finanças e Administração",
   "q": "A margem de contribuição por produto ou linha é conhecida e acompanhada?",
   "o": [
    26,
    3,
    4,
    37
   ]
  },
  {
   "n": 13,
   "t": "Controles, DRE e indicadores",
   "a": "Finanças e Administração",
   "q": "A empresa conhece o seu ponto de equilíbrio (volume mínimo de produção e de vendas)?",
   "o": [
    27
   ]
  },
  {
   "n": 14,
   "t": "Controles, DRE e indicadores",
   "a": "Finanças e Administração",
   "q": "Os indicadores financeiros (margem líquida, EBITDA, endividamento) são analisados em reunião mensal e usados nas decisões?",
   "o": [
    28,
    5
   ]
  },
  {
   "n": 15,
   "t": "Fluxo de caixa e capital de giro",
   "a": "Finanças e Administração",
   "q": "A empresa projeta o fluxo de caixa das próximas semanas e meses?",
   "o": [
    21
   ]
  },
  {
   "n": 16,
   "t": "Fluxo de caixa e capital de giro",
   "a": "Finanças e Administração",
   "q": "O saldo bancário é conciliado com o controle financeiro pelo menos uma vez por semana?",
   "o": [
    22
   ]
  },
  {
   "n": 17,
   "t": "Fluxo de caixa e capital de giro",
   "a": "Finanças e Administração",
   "q": "A empresa conhece o seu ciclo financeiro (prazos médios de recebimento, de pagamento e de estocagem)?",
   "o": [
    23
   ]
  },
  {
   "n": 18,
   "t": "Fluxo de caixa e capital de giro",
   "a": "Finanças e Administração",
   "q": "A empresa sabe quanto capital de giro precisa e mantém reserva para a sazonalidade das vendas?",
   "o": [
    2,
    24
   ]
  },
  {
   "n": 19,
   "t": "Custos, preços e estoque",
   "a": "Finanças e Administração",
   "q": "Os custos são apurados e separados em fixos, variáveis e impostos?",
   "o": [
    15
   ]
  },
  {
   "n": 20,
   "t": "Custos, preços e estoque",
   "a": "Finanças e Administração",
   "q": "O preço de venda é formado a partir do custo (fixo, variável e impostos) e da margem desejada?",
   "o": [
    14,
    17
   ]
  },
  {
   "n": 21,
   "t": "Custos, preços e estoque",
   "a": "Finanças e Administração",
   "q": "A curva ABC dos produtos (participação de cada um no faturamento) é conhecida?",
   "o": [
    19
   ]
  },
  {
   "n": 22,
   "t": "Custos, preços e estoque",
   "a": "Finanças e Administração",
   "q": "O giro do estoque de produto acabado é acompanhado e usado para decidir o que produzir?",
   "o": [
    20
   ]
  },
  {
   "n": 23,
   "t": "Crédito e cobrança",
   "a": "Finanças e Administração",
   "q": "Existe política de crédito (limite e prazo por cliente) aplicada antes de vender a prazo?",
   "o": [
    9
   ]
  },
  {
   "n": 24,
   "t": "Crédito e cobrança",
   "a": "Finanças e Administração",
   "q": "A inadimplência é medida e as cobranças em atraso seguem uma rotina definida?",
   "o": [
    7,
    8
   ]
  },
  {
   "n": 25,
   "t": "Planejamento, dívidas e investimentos",
   "a": "Finanças e Administração",
   "q": "A empresa tem orçamento anual, com projeção de receitas, custos e resultado?",
   "o": [
    11,
    13
   ]
  },
  {
   "n": 26,
   "t": "Planejamento, dívidas e investimentos",
   "a": "Finanças e Administração",
   "q": "A empresa mantém um mapa de dívidas com taxa, prazo e parcela de cada contrato?",
   "o": [
    29
   ]
  },
  {
   "n": 27,
   "t": "Planejamento, dívidas e investimentos",
   "a": "Finanças e Administração",
   "q": "Os investimentos em máquinas e moldes são decididos com análise de retorno (TIR, payback, VPL), considerando o custo de oportunidade do capital?",
   "o": [
    30,
    6
   ]
  },
  {
   "n": 28,
   "t": "Planejamento, dívidas e investimentos",
   "a": "Finanças e Administração",
   "q": "As finanças da empresa são separadas das finanças pessoais dos sócios, com pró-labore definido?",
   "o": [
    31
   ]
  },
  {
   "n": 29,
   "t": "Mercado e marketing",
   "a": "Comercial e Vendas",
   "q": "Existe plano de marketing com posicionamento, canais, preço, promoção e metas?",
   "o": [
    32
   ]
  },
  {
   "n": 30,
   "t": "Mercado e marketing",
   "a": "Comercial e Vendas",
   "q": "A empresa conhece os concorrentes e os próprios diferenciais?",
   "o": [
    33,
    46,
    51
   ]
  },
  {
   "n": 31,
   "t": "Mercado e marketing",
   "a": "Comercial e Vendas",
   "q": "A empresa conhece o perfil e as expectativas dos clientes?",
   "o": [
    34
   ]
  },
  {
   "n": 32,
   "t": "Mercado e marketing",
   "a": "Comercial e Vendas",
   "q": "O mercado é segmentado (região e tipo de cliente: construtora, revenda, obra pública) e cada público é conhecido (atuais, antigos e potenciais)?",
   "o": [
    44,
    45
   ]
  },
  {
   "n": 33,
   "t": "Mercado e marketing",
   "a": "Comercial e Vendas",
   "q": "A segmentação orienta a prospecção de novos clientes?",
   "o": [
    47
   ]
  },
  {
   "n": 34,
   "t": "Gestão comercial e funil de vendas",
   "a": "Comercial e Vendas",
   "q": "A gestão comercial é centralizada, com canais, metas e controles definidos?",
   "o": [
    36
   ]
  },
  {
   "n": 35,
   "t": "Gestão comercial e funil de vendas",
   "a": "Comercial e Vendas",
   "q": "Existe cadastro de clientes completo e atualizado, usado no planejamento comercial?",
   "o": [
    35,
    43
   ]
  },
  {
   "n": 36,
   "t": "Gestão comercial e funil de vendas",
   "a": "Comercial e Vendas",
   "q": "Os orçamentos enviados são acompanhados até o fechamento, com responsável, data de retorno e taxa de conversão medida?",
   "o": []
  },
  {
   "n": 37,
   "t": "Atendimento",
   "a": "Comercial e Vendas",
   "q": "Existem procedimentos escritos que garantem o padrão de atendimento?",
   "o": [
    40
   ]
  },
  {
   "n": 38,
   "t": "Atendimento",
   "a": "Comercial e Vendas",
   "q": "A equipe é treinada com frequência para atender bem?",
   "o": [
    39
   ]
  },
  {
   "n": 39,
   "t": "Atendimento",
   "a": "Comercial e Vendas",
   "q": "O atendimento é avaliado de forma sistemática (pesquisa, cliente oculto ou indicadores)?",
   "o": [
    41,
    42
   ]
  },
  {
   "n": 40,
   "t": "Liderança",
   "a": "Liderança e Pessoas",
   "q": "Existe organograma com a estrutura de liderança definida e adequada a cada cargo?",
   "o": [
    82
   ]
  },
  {
   "n": 41,
   "t": "Liderança",
   "a": "Liderança e Pessoas",
   "q": "A empresa avalia o desempenho dos líderes?",
   "o": [
    83
   ]
  },
  {
   "n": 42,
   "t": "Liderança",
   "a": "Liderança e Pessoas",
   "q": "A empresa investe na formação gerencial dos líderes?",
   "o": [
    84
   ]
  },
  {
   "n": 43,
   "t": "Liderança",
   "a": "Liderança e Pessoas",
   "q": "Colaboradores e líderes são incentivados a propor ideias e melhorias?",
   "o": [
    85
   ]
  },
  {
   "n": 44,
   "t": "Jornada, ponto e treinamento",
   "a": "Liderança e Pessoas",
   "q": "O controle de ponto é confiável e apurado todo mês (entradas, intervalos e saídas)?",
   "o": [
    86
   ]
  },
  {
   "n": 45,
   "t": "Jornada, ponto e treinamento",
   "a": "Liderança e Pessoas",
   "q": "O banco de horas tem regras escritas e saldo conferido com o colaborador todo mês?",
   "o": [
    87
   ]
  },
  {
   "n": 46,
   "t": "Jornada, ponto e treinamento",
   "a": "Liderança e Pessoas",
   "q": "As horas extras e o adicional noturno são planejados e acompanhados por setor?",
   "o": [
    88
   ]
  },
  {
   "n": 47,
   "t": "Jornada, ponto e treinamento",
   "a": "Liderança e Pessoas",
   "q": "Faltas, atrasos e afastamentos (absenteísmo) são medidos e analisados?",
   "o": [
    89
   ]
  },
  {
   "n": 48,
   "t": "Jornada, ponto e treinamento",
   "a": "Liderança e Pessoas",
   "q": "Existe plano de treinamento e matriz de polivalência dos operadores?",
   "o": [
    90
   ]
  },
  {
   "n": 49,
   "t": "Identidade visual e conteúdo",
   "a": "Presença Digital",
   "q": "A empresa tem identidade visual (logo, cores e tipografia) aplicada de forma igual em todas as mídias?",
   "o": [
    72,
    66
   ]
  },
  {
   "n": 50,
   "t": "Identidade visual e conteúdo",
   "a": "Presença Digital",
   "q": "A empresa publica conteúdo relevante para o seu público (produtos, aplicação, obras)?",
   "o": [
    73
   ]
  },
  {
   "n": 51,
   "t": "Identidade visual e conteúdo",
   "a": "Presença Digital",
   "q": "Existe calendário editorial, com temas, formatos, frequência e responsáveis?",
   "o": [
    74,
    53,
    55,
    57
   ]
  },
  {
   "n": 52,
   "t": "Identidade visual e conteúdo",
   "a": "Presença Digital",
   "q": "Cada rede tem objetivo definido e as ações são integradas entre si?",
   "o": [
    67,
    68
   ]
  },
  {
   "n": 53,
   "t": "Identidade visual e conteúdo",
   "a": "Presença Digital",
   "q": "Os resultados das publicações (alcance, mensagens e pedidos de orçamento) são medidos?",
   "o": [
    75
   ]
  },
  {
   "n": 54,
   "t": "Canais digitais",
   "a": "Presença Digital",
   "q": "A empresa tem perfis próprios (Instagram, Facebook e LinkedIn), separados dos perfis pessoais?",
   "o": [
    52,
    54,
    56,
    69
   ]
  },
  {
   "n": 55,
   "t": "Canais digitais",
   "a": "Presença Digital",
   "q": "O site está atualizado, com produtos, especificações e contato?",
   "o": [
    58
   ]
  },
  {
   "n": 56,
   "t": "Canais digitais",
   "a": "Presença Digital",
   "q": "O site gera contatos e pedidos de orçamento, e isso é medido?",
   "o": [
    59
   ]
  },
  {
   "n": 57,
   "t": "Canais digitais",
   "a": "Presença Digital",
   "q": "O WhatsApp Business é usado com o número da empresa para vendas, atendimento e acompanhamento de entregas?",
   "o": [
    60,
    61,
    62
   ]
  },
  {
   "n": 58,
   "t": "Canais digitais",
   "a": "Presença Digital",
   "q": "A empresa produz vídeos técnicos sobre os produtos e usa esses vídeos nas redes e no atendimento?",
   "o": [
    76,
    77,
    78
   ]
  },
  {
   "n": 59,
   "t": "Canais digitais",
   "a": "Presença Digital",
   "q": "A empresa usa e-mail com domínio próprio e envia comunicações periódicas à base de clientes?",
   "o": [
    79,
    80
   ]
  },
  {
   "n": 60,
   "t": "Google e alcance",
   "a": "Presença Digital",
   "q": "A empresa aparece no Google quando alguém procura os seus produtos na região (Perfil da Empresa no Google e avaliações)?",
   "o": [
    63
   ]
  },
  {
   "n": 61,
   "t": "Google e alcance",
   "a": "Presença Digital",
   "q": "Os líderes publicam conteúdo técnico e são encontrados no Google e no LinkedIn?",
   "o": [
    64
   ]
  },
  {
   "n": 62,
   "t": "Google e alcance",
   "a": "Presença Digital",
   "q": "A empresa faz anúncios pagos (Google ou redes sociais), com orçamento e retorno medidos?",
   "o": [
    65
   ]
  },
  {
   "n": 63,
   "t": "Google e alcance",
   "a": "Presença Digital",
   "q": "A empresa anuncia em marketplaces e portais do setor?",
   "o": [
    70
   ]
  },
  {
   "n": 64,
   "t": "Google e alcance",
   "a": "Presença Digital",
   "q": "Os dados de clientes são tratados conforme a LGPD (consentimento, guarda e uso)?",
   "o": [
    71
   ]
  },
  {
   "n": 65,
   "t": "Planejamento e controle da produção (PCP)",
   "a": "Produção e PCP",
   "q": "Existe programação semanal por máquina e por produto, transformada em ordem de produção por turno (produto, forma, ciclos e metas)?",
   "o": [
    91,
    216
   ]
  },
  {
   "n": 66,
   "t": "Planejamento e controle da produção (PCP)",
   "a": "Produção e PCP",
   "q": "A programação considera a carteira de pedidos, o estoque de produto acabado e a capacidade da linha?",
   "o": [
    92
   ]
  },
  {
   "n": 67,
   "t": "Planejamento e controle da produção (PCP)",
   "a": "Produção e PCP",
   "q": "O cumprimento do programa de produção é medido e discutido todos os dias?",
   "o": [
    94
   ]
  },
  {
   "n": 68,
   "t": "Apontamento e rotina do turno",
   "a": "Produção e PCP",
   "q": "A produção diária (peças boas, perdas e paradas) é apontada e revisada pelo gestor no mesmo dia?",
   "o": [
    93,
    217
   ]
  },
  {
   "n": 69,
   "t": "Apontamento e rotina do turno",
   "a": "Produção e PCP",
   "q": "A centralização das canecas e o nível do silo da máquina são verificados a cada turno?",
   "o": [
    209
   ]
  },
  {
   "n": 70,
   "t": "Apontamento e rotina do turno",
   "a": "Produção e PCP",
   "q": "Existe check-list de turno assinado pelos operadores e visado pelo líder?",
   "o": [
    215,
    210
   ]
  },
  {
   "n": 71,
   "t": "Disponibilidade",
   "a": "OEE e Produtividade",
   "q": "Todas as paradas de máquina são registradas com início, fim e motivo, sem minutos sem apontamento no turno?",
   "o": [
    101,
    218
   ]
  },
  {
   "n": 72,
   "t": "Disponibilidade",
   "a": "OEE e Produtividade",
   "q": "O Pareto das causas de parada é analisado toda semana?",
   "o": [
    102
   ]
  },
  {
   "n": 73,
   "t": "Disponibilidade",
   "a": "OEE e Produtividade",
   "q": "A troca de molde (setup) é planejada, medida e tem meta de redução?",
   "o": [
    103,
    95
   ]
  },
  {
   "n": 74,
   "t": "Disponibilidade",
   "a": "OEE e Produtividade",
   "q": "As paradas por falta de insumo, palete ou operador são controladas?",
   "o": [
    104
   ]
  },
  {
   "n": 75,
   "t": "Performance",
   "a": "OEE e Produtividade",
   "q": "O ciclo padrão (ciclos por minuto ou peças por hora) de cada produto está definido?",
   "o": [
    105,
    99
   ]
  },
  {
   "n": 76,
   "t": "Performance",
   "a": "OEE e Produtividade",
   "q": "A velocidade real da máquina é comparada com o ciclo padrão a cada turno?",
   "o": [
    106,
    211
   ]
  },
  {
   "n": 77,
   "t": "Performance",
   "a": "OEE e Produtividade",
   "q": "Microparadas e quedas de velocidade são identificadas e tratadas?",
   "o": [
    107
   ]
  },
  {
   "n": 78,
   "t": "Performance",
   "a": "OEE e Produtividade",
   "q": "A contagem de ciclos e de peças é automática ou confiável?",
   "o": [
    108
   ]
  },
  {
   "n": 79,
   "t": "Qualidade na linha",
   "a": "OEE e Produtividade",
   "q": "Peças refugadas e de segunda são separadas e contadas por produto, lote e turno?",
   "o": [
    109,
    214
   ]
  },
  {
   "n": 80,
   "t": "Qualidade na linha",
   "a": "OEE e Produtividade",
   "q": "As perdas na cura, no manuseio e na paletização são registradas?",
   "o": [
    110
   ]
  },
  {
   "n": 81,
   "t": "Qualidade na linha",
   "a": "OEE e Produtividade",
   "q": "As causas de refugo (dimensional, quebra, textura e resistência) são analisadas e tratadas?",
   "o": [
    111
   ]
  },
  {
   "n": 82,
   "t": "Qualidade na linha",
   "a": "OEE e Produtividade",
   "q": "O índice de qualidade (peças boas ÷ peças produzidas) tem meta definida?",
   "o": [
    112
   ]
  },
  {
   "n": 83,
   "t": "Gestão de indicadores",
   "a": "OEE e Produtividade",
   "q": "O OEE (disponibilidade × performance × qualidade) é calculado por máquina e tem meta?",
   "o": [
    113
   ]
  },
  {
   "n": 84,
   "t": "Gestão de indicadores",
   "a": "OEE e Produtividade",
   "q": "O OEE fica num quadro visível e é discutido com a equipe todos os dias?",
   "o": [
    114
   ]
  },
  {
   "n": 85,
   "t": "Manutenção preventiva e preditiva",
   "a": "Manutenção e Equipamentos",
   "q": "Existe plano de manutenção preventiva por equipamento (vibroprensa, misturador, pá carregadeira, caldeira), conforme o manual do fabricante?",
   "s": 1,
   "o": [
    182,
    170
   ]
  },
  {
   "n": 86,
   "t": "Manutenção preventiva e preditiva",
   "a": "Manutenção e Equipamentos",
   "q": "As ordens de serviço e as falhas são registradas com peças, tempos e duração do reparo?",
   "s": 1,
   "o": [
    183,
    170
   ]
  },
  {
   "n": 87,
   "t": "Manutenção preventiva e preditiva",
   "a": "Manutenção e Equipamentos",
   "q": "Indicadores como MTBF e MTTR são calculados e acompanhados?",
   "o": [
    184
   ]
  },
  {
   "n": 88,
   "t": "Manutenção preventiva e preditiva",
   "a": "Manutenção e Equipamentos",
   "q": "Há estoque mínimo de peças críticas de reposição?",
   "o": [
    185
   ]
  },
  {
   "n": 89,
   "t": "Manutenção preventiva e preditiva",
   "a": "Manutenção e Equipamentos",
   "q": "A lubrificação segue rota e frequência definidas?",
   "o": [
    189
   ]
  },
  {
   "n": 90,
   "t": "Cadastro, moldes e calibração",
   "a": "Manutenção e Equipamentos",
   "q": "Os equipamentos têm cadastro técnico (fabricante, capacidade e histórico)?",
   "o": [
    186
   ]
  },
  {
   "n": 91,
   "t": "Cadastro, moldes e calibração",
   "a": "Manutenção e Equipamentos",
   "q": "O desgaste dos moldes é medido e a troca é programada antes de afetar o dimensional?",
   "o": [
    187
   ]
  },
  {
   "n": 92,
   "t": "Cadastro, moldes e calibração",
   "a": "Manutenção e Equipamentos",
   "q": "Balanças dosadoras, sensores e demais equipamentos de produção são calibrados com periodicidade definida e registrada?",
   "s": 1,
   "o": [
    188,
    171
   ]
  },
  {
   "n": 93,
   "t": "Inspeção diária dos equipamentos",
   "a": "Manutenção e Equipamentos",
   "q": "A vibroprensa tem check-list diário (réguas vibratórias, coxins, agitador, forma, mangueiras, sensores e lubrificação)?",
   "o": [
    221
   ]
  },
  {
   "n": 94,
   "t": "Inspeção diária dos equipamentos",
   "a": "Manutenção e Equipamentos",
   "q": "O misturador e a dosagem têm check-list diário (paletas, correias, mancais, rosca de cimento, solenoide de água e silo)?",
   "o": [
    222
   ]
  },
  {
   "n": 95,
   "t": "Inspeção diária dos equipamentos",
   "a": "Manutenção e Equipamentos",
   "q": "As empilhadeiras passam por inspeção antes do uso (pneus, garfos, GLP, óleo, freio, vazamentos e horímetro)?",
   "o": [
    223
   ]
  },
  {
   "n": 96,
   "t": "Inspeção diária dos equipamentos",
   "a": "Manutenção e Equipamentos",
   "q": "Esteiras, redutores, mancais e roletes da usina são verificados a cada semana ou quinzena, com visto da gerência?",
   "o": [
    224
   ]
  },
  {
   "n": 97,
   "t": "Inspeção diária dos equipamentos",
   "a": "Manutenção e Equipamentos",
   "q": "Os desvios das inspeções seguem legenda padrão e viram ordem de serviço, com prazo e acompanhamento?",
   "o": [
    225,
    226
   ]
  },
  {
   "n": 98,
   "t": "Almoxarifado",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "O almoxarifado é organizado, endereçado e com acesso controlado?",
   "o": [
    190
   ]
  },
  {
   "n": 99,
   "t": "Almoxarifado",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "Toda entrada e saída de materiais é registrada?",
   "o": [
    191
   ]
  },
  {
   "n": 100,
   "t": "Almoxarifado",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "Existe estoque mínimo e ponto de pedido para os itens críticos?",
   "o": [
    192
   ]
  },
  {
   "n": 101,
   "t": "Almoxarifado",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "O inventário físico bate com o controle (acurácia de estoque medida)?",
   "o": [
    193,
    18
   ]
  },
  {
   "n": 102,
   "t": "Insumos e fornecedores",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "Os insumos são conferidos no recebimento (ticket de balança, quantidade, granulometria, umidade e validade do cimento), com amostra-padrão identificada e registro?",
   "s": 1,
   "o": [
    194,
    139,
    239
   ]
  },
  {
   "n": 103,
   "t": "Insumos e fornecedores",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "O cimento fica em depósito fechado, sobre paletes, afastado da parede e com até 15 sacos por pilha, e os agregados ficam em baias separadas, com piso, cobertura e drenagem?",
   "s": 1,
   "o": [
    140,
    196
   ]
  },
  {
   "n": 104,
   "t": "Insumos e fornecedores",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "Os fornecedores de insumos são qualificados, avaliados periodicamente e mantidos estáveis (sem troca constante)?",
   "s": 1,
   "o": [
    197,
    132,
    244
   ]
  },
  {
   "n": 105,
   "t": "Insumos e fornecedores",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "O consumo de cimento por m³ ou por peça é calculado e comparado com o traço?",
   "o": [
    195
   ]
  },
  {
   "n": 106,
   "t": "Pátio, paletes e expedição",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "O pátio é organizado e endereçado por produto e lote, com piso nivelado, e a entrada da produção é conciliada com o apontamento?",
   "s": 1,
   "o": [
    198,
    162,
    220,
    235
   ]
  },
  {
   "n": 107,
   "t": "Pátio, paletes e expedição",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "A expedição segue o princípio “primeiro que entra, primeiro que sai”, respeitando a idade de cura?",
   "o": [
    199
   ]
  },
  {
   "n": 108,
   "t": "Pátio, paletes e expedição",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "O saldo de paletes, cintas e embalagens (envio, retorno e perdas) é controlado?",
   "o": [
    200,
    236
   ]
  },
  {
   "n": 109,
   "t": "Pátio, paletes e expedição",
   "a": "Materiais, Almoxarifado e Expedição",
   "q": "A carga é conferida na portaria com documento e o caminhão é inspecionado antes do carregamento (amarração e carroceria)?",
   "o": [
    237,
    238
   ]
  },
  {
   "n": 110,
   "t": "Documentos, procedimentos e 5S",
   "a": "Sistema de Gestão da Qualidade",
   "q": "Os procedimentos de produção e de qualidade estão escritos e disponíveis no posto de trabalho?",
   "o": [
    121
   ]
  },
  {
   "n": 111,
   "t": "Documentos, procedimentos e 5S",
   "a": "Sistema de Gestão da Qualidade",
   "q": "Existe lista mestra de documentos, procedimentos e registros, controlados e revisados?",
   "o": [
    240
   ]
  },
  {
   "n": 112,
   "t": "Documentos, procedimentos e 5S",
   "a": "Sistema de Gestão da Qualidade",
   "q": "Existe plano anual de auditoria interna, executado e com relatório?",
   "o": [
    241
   ]
  },
  {
   "n": 113,
   "t": "Documentos, procedimentos e 5S",
   "a": "Sistema de Gestão da Qualidade",
   "q": "Existe programa 5S, com auditorias periódicas por área?",
   "o": [
    124,
    248
   ]
  },
  {
   "n": 114,
   "t": "Não conformidades e clientes",
   "a": "Sistema de Gestão da Qualidade",
   "q": "As reclamações de clientes são registradas, respondidas e tratadas com análise de causa?",
   "o": [
    123,
    243
   ]
  },
  {
   "n": 115,
   "t": "Não conformidades e clientes",
   "a": "Sistema de Gestão da Qualidade",
   "q": "As não conformidades viram relatório (RNCAC) com causa, ação, responsável e verificação da eficácia?",
   "o": [
    242
   ]
  },
  {
   "n": 116,
   "t": "Não conformidades e clientes",
   "a": "Sistema de Gestão da Qualidade",
   "q": "Existe pesquisa de satisfação na obra (produto, prazo e transporte), com taxa de resposta acompanhada?",
   "o": [
    246
   ]
  },
  {
   "n": 117,
   "t": "Documentação legal e responsável técnico",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A constituição legal da empresa está disponível (contrato social e última alteração, ou estatuto e última ata)?",
   "s": 1,
   "o": [
    125
   ]
  },
  {
   "n": 118,
   "t": "Documentação legal e responsável técnico",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O alvará de funcionamento está vigente e acessível?",
   "s": 1,
   "o": [
    126
   ]
  },
  {
   "n": 119,
   "t": "Documentação legal e responsável técnico",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A empresa e o responsável técnico estão registrados no CREA (obrigatório para blocos estruturais), e há responsável designado pela qualidade dos produtos e pelo programa do Selo?",
   "s": 1,
   "o": [
    127,
    181
   ]
  },
  {
   "n": 120,
   "t": "Documentação legal e responsável técnico",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Todos os funcionários da fábrica estão registrados (CLT ou cooperativa formal)?",
   "s": 1,
   "o": [
    128
   ]
  },
  {
   "n": 121,
   "t": "Documentação legal e responsável técnico",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A licença ambiental está vigente, com evidência disponível?",
   "s": 1,
   "o": [
    130
   ]
  },
  {
   "n": 122,
   "t": "Matérias-primas",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O cimento tem Selo ABCP ou marca de conformidade; se não tiver, há autocontrole com ensaios de resistência, pega, finura e massa específica?",
   "s": 1,
   "o": [
    133
   ]
  },
  {
   "n": 123,
   "t": "Matérias-primas",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Os agregados têm ensaios de qualificação (material pulverulento, massa específica, massa unitária, argila e impureza orgânica)?",
   "s": 1,
   "o": [
    134
   ]
  },
  {
   "n": 124,
   "t": "Matérias-primas",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A granulometria dos agregados é ensaiada pelo menos uma vez por mês (o ideal é toda semana) e a cada troca de fornecedor ou de origem?",
   "s": 1,
   "o": [
    135
   ]
  },
  {
   "n": 125,
   "t": "Matérias-primas",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Os aditivos são qualificados por lote (teor de sólidos e pH) e armazenados corretamente?",
   "s": 1,
   "o": [
    136
   ]
  },
  {
   "n": 126,
   "t": "Matérias-primas",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Os pigmentos são de base inorgânica (óxidos) e qualificados?",
   "s": 1,
   "o": [
    137
   ]
  },
  {
   "n": 127,
   "t": "Matérias-primas",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A água de amassamento é qualificada conforme a NBR 15900 (ou laudo da concessionária)?",
   "s": 1,
   "o": [
    138
   ]
  },
  {
   "n": 128,
   "t": "Dosagem e mistura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Os traços estão registrados por produto (classe, resistência, proporções e materiais), acessíveis ao operador da dosagem e conferidos a cada turno?",
   "s": 1,
   "o": [
    96,
    141,
    208
   ]
  },
  {
   "n": 129,
   "t": "Dosagem e mistura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A dosagem de cimento e agregados é feita em massa (central gravimétrica) e registrada?",
   "s": 1,
   "o": [
    97,
    142
   ]
  },
  {
   "n": 130,
   "t": "Dosagem e mistura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A umidade da areia é medida (sensor bem posicionado ou ensaio diário: frigideira, micro-ondas ou speedy) e o traço é corrigido com registro?",
   "s": 1,
   "o": [
    98,
    144,
    211
   ]
  },
  {
   "n": 131,
   "t": "Dosagem e mistura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A água e o aditivo são dosados de forma constante a cada batelada, sem adição aleatória?",
   "s": 1,
   "o": [
    143,
    145
   ]
  },
  {
   "n": 132,
   "t": "Dosagem e mistura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O misturador é de ação forçada (planetário, biplanetário, helicoidal ou turbo), sem uso de betoneira para concreto seco?",
   "s": 1,
   "o": [
    146
   ]
  },
  {
   "n": 133,
   "t": "Dosagem e mistura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O tempo de mistura é constante e verificado durante a produção?",
   "s": 1,
   "o": [
    147
   ]
  },
  {
   "n": 134,
   "t": "Dosagem e mistura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A caixa e as pás do misturador estão limpas, sem material aderido e bem ajustadas?",
   "s": 1,
   "o": [
    148
   ]
  },
  {
   "n": 135,
   "t": "Vibroprensa e moldagem",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O tipo de vibroprensa é adequado ao produto (pneumática só para blocos sem função estrutural; a manual não é aceita)?",
   "s": 1,
   "o": [
    149
   ]
  },
  {
   "n": 136,
   "t": "Vibroprensa e moldagem",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A vibroprensa opera com CLP e controle dos tempos de alimentação, vibração e compactação por produto?",
   "s": 1,
   "o": [
    150
   ]
  },
  {
   "n": 137,
   "t": "Vibroprensa e moldagem",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "As chapas de moldagem estão sem empeno nem desgaste, com tempo de uso monitorado e rodízio (de preferência, de aço)?",
   "s": 1,
   "o": [
    151
   ]
  },
  {
   "n": 138,
   "t": "Vibroprensa e moldagem",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A limpeza superficial das peças é feita com escova rotativa (não manual)?",
   "s": 1,
   "o": [
    152
   ]
  },
  {
   "n": 139,
   "t": "Vibroprensa e moldagem",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A altura das peças é controlada na produção com gabarito e as variações são registradas?",
   "s": 1,
   "o": [
    153,
    212
   ]
  },
  {
   "n": 140,
   "t": "Vibroprensa e moldagem",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O produto é inspecionado na saída da prensa (trincas, parede fina, textura e arestas), com registro do refugo por motivo?",
   "s": 1,
   "o": [
    154,
    213
   ]
  },
  {
   "n": 141,
   "t": "Cura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A cura é homogênea e contínua (câmara com vapor ou água nebulizada; lona só provisoriamente)?",
   "s": 1,
   "o": [
    155
   ]
  },
  {
   "n": 142,
   "t": "Cura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O piso do local de cura é nivelado?",
   "s": 1,
   "o": [
    156
   ]
  },
  {
   "n": 143,
   "t": "Cura",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A cura segue procedimento, com tempo e temperatura acompanhados e registrados por lote?",
   "s": 1,
   "o": [
    100,
    157,
    231
   ]
  },
  {
   "n": 144,
   "t": "Transporte interno e armazenamento",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Da moldagem até a cura, o transporte evita impactos (finger car, talha com gaiola ou empilhadeira)?",
   "s": 1,
   "o": [
    158
   ]
  },
  {
   "n": 145,
   "t": "Transporte interno e armazenamento",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Da cura até o estoque, o transporte é feito com empilhadeira, sem manuseio que gere fissuras?",
   "s": 1,
   "o": [
    159
   ]
  },
  {
   "n": 146,
   "t": "Transporte interno e armazenamento",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O piso é nivelado em todo o trajeto do transporte interno?",
   "s": 1,
   "o": [
    160
   ]
  },
  {
   "n": 147,
   "t": "Transporte interno e armazenamento",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A paletização segue padrão de arrumação e amarração, e a entrega é paletizada?",
   "s": 1,
   "o": [
    161,
    163
   ]
  },
  {
   "n": 148,
   "t": "Rastreabilidade",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A numeração de lote é controlada (produto, máquina, data e turno) e permite rastrear o produto até os insumos?",
   "s": 1,
   "o": [
    219,
    122
   ]
  },
  {
   "n": 149,
   "t": "Rastreabilidade",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Peças e paletes são identificados com marca, lote, data de fabricação, classe/resistência e quantidade?",
   "s": 1,
   "o": [
    164,
    177
   ]
  },
  {
   "n": 150,
   "t": "Rastreabilidade",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O lote é informado na nota fiscal, permitindo rastrear o produto entregue até a produção?",
   "s": 1,
   "o": [
    165
   ]
  },
  {
   "n": 151,
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Existe plano de amostragem, e as peças para ensaio são coletadas por lote conforme o plano?",
   "s": 1,
   "o": [
    116,
    234
   ]
  },
  {
   "n": 152,
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Cada lote é ensaiado conforme a norma (NBR 6136/12118 para blocos e NBR 9781 para pisos), com resistência à compressão em frequência definida?",
   "s": 1,
   "o": [
    117,
    166
   ]
  },
  {
   "n": 153,
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "São feitos ensaios de absorção de água e controle dimensional (altura, largura, comprimento e peso) por lote, com registro?",
   "s": 1,
   "o": [
    118,
    232
   ]
  },
  {
   "n": 154,
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Os resultados dos ensaios são acompanhados em gráfico de controle?",
   "s": 1,
   "o": [
    119
   ]
  },
  {
   "n": 155,
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Os produtos atendem à norma da classe declarada (resistência, absorção e dimensões)?",
   "s": 1,
   "o": [
    174,
    175
   ]
  },
  {
   "n": 156,
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Lotes não conformes são segregados e registrados (lote, quantidade, motivo e destino) e não são vendidos como produto normatizado?",
   "s": 1,
   "o": [
    120,
    233,
    176
   ]
  },
  {
   "n": 157,
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Os ensaios são feitos em laboratório próprio (o ideal) ou em laboratório terceirizado qualificado?",
   "s": 1,
   "o": [
    167
   ]
  },
  {
   "n": 158,
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Prensa, paquímetro, balança e termômetro da estufa são calibrados por laboratório competente (de preferência, RBC)?",
   "s": 1,
   "o": [
    168
   ]
  },
  {
   "n": 159,
   "t": "Controle tecnológico e laboratório",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Os resultados internos são comparados com os ensaios trimestrais do Programa Setorial da Qualidade?",
   "s": 1,
   "o": [
    169
   ]
  },
  {
   "n": 160,
   "t": "Regulamento, autoavaliação e divulgação",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "A empresa conhece o regulamento do Selo de Qualidade ABCP e os critérios de avaliação?",
   "s": 1,
   "o": [
    178
   ]
  },
  {
   "n": 161,
   "t": "Regulamento, autoavaliação e divulgação",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Foi feita a autoavaliação (pré-auditoria) com o check-list FR 010?",
   "s": 1,
   "o": [
    179
   ]
  },
  {
   "n": 162,
   "t": "Regulamento, autoavaliação e divulgação",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "Existe plano de ação, com responsáveis e prazos, para as não conformidades encontradas?",
   "s": 1,
   "o": [
    180
   ]
  },
  {
   "n": 163,
   "t": "Regulamento, autoavaliação e divulgação",
   "a": "Qualidade do Produto e Selo ABCP",
   "q": "O Selo ABCP é divulgado só para os produtos qualificados e conforme o regulamento (site, folders, propostas e produtos)?",
   "s": 1,
   "o": [
    172,
    173
   ]
  },
  {
   "n": 164,
   "t": "Máquinas, EPI e acidentes",
   "a": "Segurança do Trabalho",
   "q": "As máquinas têm proteções e dispositivos de parada de emergência (NR-12)?",
   "o": [
    201
   ]
  },
  {
   "n": 165,
   "t": "Máquinas, EPI e acidentes",
   "a": "Segurança do Trabalho",
   "q": "A entrega e o uso de EPIs são controlados com ficha assinada (NR-6) e os EPIs são usados de fato no chão de fábrica?",
   "s": 1,
   "o": [
    202,
    129
   ]
  },
  {
   "n": 166,
   "t": "Máquinas, EPI e acidentes",
   "a": "Segurança do Trabalho",
   "q": "As áreas de risco estão mapeadas e comunicadas aos funcionários?",
   "s": 1,
   "o": [
    131
   ]
  },
  {
   "n": 167,
   "t": "Máquinas, EPI e acidentes",
   "a": "Segurança do Trabalho",
   "q": "Acidentes e quase acidentes são registrados e investigados?",
   "o": [
    203
   ]
  },
  {
   "n": 168,
   "t": "Segurança operacional",
   "a": "Segurança do Trabalho",
   "q": "A limpeza do misturador e do silo exige permissão de trabalho, EPI, treinamento e responsável designado?",
   "o": [
    227
   ]
  },
  {
   "n": 169,
   "t": "Segurança operacional",
   "a": "Segurança do Trabalho",
   "q": "Há bloqueio de energias (cadeado no painel, trava mecânica na polia, válvula de ar travada e emergência acionada)?",
   "o": [
    228
   ]
  },
  {
   "n": 170,
   "t": "Segurança operacional",
   "a": "Segurança do Trabalho",
   "q": "O Diálogo Semanal de Segurança (DSS) acontece com tema, instrutor e lista de presença assinada?",
   "o": [
    229
   ]
  },
  {
   "n": 171,
   "t": "Segurança operacional",
   "a": "Segurança do Trabalho",
   "q": "Cabos de aço e acessórios de içamento são inspecionados, com registro periódico?",
   "o": [
    230
   ]
  }
 ],
 "produtos": {
  "cons-fin": {
   "nome": "Consultoria financeira e administrativa",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-com": {
   "nome": "Consultoria comercial e de marketing",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-prod": {
   "nome": "Consultoria de produção (performance industrial)",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-oee": {
   "nome": "OEE na prática",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-man": {
   "nome": "Consultoria de manutenção",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-qual": {
   "nome": "Consultoria de qualidade (sistema de gestão)",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-qprod": {
   "nome": "Consultoria de qualidade do produto",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-lab": {
   "nome": "Consultoria de laboratório",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-selo": {
   "nome": "PDE e Selo de Qualidade ABCP",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-est": {
   "nome": "Estratégia e posicionamento",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "cons-mont": {
   "nome": "Montagem e reestruturação de indústria",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "mentoria": {
   "nome": "Mentoria empresarial",
   "tipo": "Consultoria",
   "link": "#consultorias"
  },
  "erp": {
   "nome": "GC ERP Controle",
   "tipo": "Sistema",
   "link": "#erp"
  },
  "crm": {
   "nome": "GC CRM Lucra MAIS",
   "tipo": "Sistema",
   "link": "#crm"
  },
  "plataforma": {
   "nome": "Plataforma de Membros: cursos por função",
   "tipo": "Cursos",
   "link": "#plataforma"
  },
  "planilhas": {
   "nome": "GC Planilhas Essenciais (Plataforma de Membros)",
   "tipo": "Cursos",
   "link": "#plataforma"
  },
  "blindada": {
   "nome": "Operação Blindada (programa de 12 semanas)",
   "tipo": "Cursos",
   "link": "#plataforma"
  },
  "incompany": {
   "nome": "Treinamento in company",
   "tipo": "Treinamento",
   "link": "#plataforma"
  },
  "livro": {
   "nome": "Livro Fábrica: Operação Simples e Lucrativa",
   "tipo": "Livro",
   "link": "#livro"
  },
  "pde": {
   "nome": "PDE Nacional (eventos e workshops)",
   "tipo": "Eventos",
   "link": "#pde"
  },
  "ge": {
   "nome": "Global Expedition Construction (missões técnicas)",
   "tipo": "Missões",
   "link": "#missoes"
  }
 },
 "faixas": {
  "critico": 0.4,
  "bom": 0.7,
  "excelente": 0.9
 },
 "conforme": 7,
 "planoItens": 10
};
