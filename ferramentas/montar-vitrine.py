# Separa os cards da vitrine em FUNDO (imagem só com cor e círculo do modelo) + TEXTOS (campos editáveis).
# Lê os textos de ~/Desktop/cards-site-original/_fonte/conteudo.py e as cores dos modelos em ~/Desktop/cards-site modelo.
# Grava public/cards/fundo-NN.svg e o campo "vitrine" de cada card em data/cards.json (casa pelo título; não mexe na landing).
import json, os, re, sys
FONTE = os.path.expanduser('~/Desktop/cards-site-original/_fonte')
MODELOS = os.path.expanduser('~/Desktop/cards-site modelo')
AQUI = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.join(AQUI, '..', 'public'); DADOS = os.path.join(AQUI, '..', 'data', 'cards.json')
sys.path.insert(0, FONTE)
from conteudo import SECOES

def tema(arq):
    s = open(os.path.join(MODELOS, arq)).read()
    bg = re.search(r'<rect width="1200" height="960" fill="([^"]+)"', s).group(1)
    m = re.search(r'<circle cx="(\d+)" cy="(\d+)" r="(\d+)" fill="([^"]+)"', s)
    tx = re.search(r'<text [^>]*fill="([^"]+)"', s).group(1)
    mu = re.search(r'fill="(rgba\([^"]+\))"', s).group(1)
    return dict(bg=bg, cx=m.group(1), cy=m.group(2), r=m.group(3), ac=m.group(4), tx=tx, mu=mu)

def mini(c):
    t = c['tipo']
    base = dict(tipo={'img': 'foto', 'num': 'numero', 'icon': 'icone', 'logo': 'logo', 'logos': 'logos'}[t], titulo=c['titulo'], texto=c['texto'],
                img='', imgs='', fundo='', destaque='', ajuste='cobrir')
    if t == 'img':
        base['img'] = '/mc/' + c['img']
        p = c.get('pos', '')
        base['ajuste'] = 'inteira' if 'meet' in p else ('topo' if 'Min' in p else 'cobrir')
    elif t == 'num': base['destaque'] = c['num']
    elif t == 'icon': base['destaque'] = c['sigla']
    elif t == 'logo': base['img'] = '/mc/' + c['img']; base['fundo'] = c.get('fundo', '#ffffff')
    elif t == 'logos': base['imgs'] = ', '.join('/mc/' + l for l in c['logos'])
    return base

modelos = sorted(f for f in os.listdir(MODELOS) if f.endswith('.svg'))
cards = json.load(open(DADOS, encoding='utf-8'))
por_titulo = {c['title']: c for c in cards}
for n, (s, m) in enumerate(zip(SECOES, modelos), 1):
    T = tema(m)
    fundo = f'/cards/fundo-{n:02d}.svg'
    open(os.path.join(PUB, fundo.lstrip('/')), 'w').write(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="960" viewBox="0 0 1200 960"><rect width="1200" height="960" fill="{T["bg"]}"/>'
        f'<circle cx="{T["cx"]}" cy="{T["cy"]}" r="{T["r"]}" fill="{T["ac"]}" opacity=".18"/></svg>')
    c = por_titulo.get(s['nome'])
    if not c: print('sem card para', s['nome']); continue
    c['thumbnail'] = fundo
    c['vitrine'] = dict(ativa=True, canto=f'{n:02d} · {s["nome"]}', sigla='MC', menu='Quem somos, Soluções, Missões, Contato',
                        titulo=s['titulo'], texto=s['texto'], botao1=s['botoes'][0], botao2=s['botoes'][1], rodape='mundoconcreto.net',
                        destaque=T['ac'], corTexto=T['tx'], suave=T['mu'], mini=[mini(x) for x in s['cards']])
json.dump(cards, open(DADOS, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('ok:', sum(1 for c in cards if c.get('vitrine')), 'cards com textos editáveis')
