from __future__ import annotations
import json,re
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont

ROOT=Path('.')
BASE='https://kostiantynbryl.github.io/My-Resume/'
if Path('site.config.json').exists():
    cfg=json.loads(Path('site.config.json').read_text(encoding='utf-8'))
    custom=(cfg.get('custom_domain') or '').strip()
    BASE=(f'https://{custom}/' if custom else cfg.get('canonical_base') or BASE).rstrip('/')+'/'

ROUTES={
'index.html':('Kostiantyn Bryl — Personal Portfolio','Product · Operations · Technology','home'),
'work/index.html':('Selected Work — Kostiantyn Bryl','Software · Games · Media · Labs','work'),
'experience/index.html':('Experience — Kostiantyn Bryl','Technology · Operations · Leadership','experience'),
'case-studies/index.html':('Case Studies — Kostiantyn Bryl','Problem · Role · Build · Result','case-studies'),
'about/index.html':('About — Kostiantyn Bryl','Business judgement with a builder’s instinct','about'),
'now/index.html':('Now — Kostiantyn Bryl','Products and experiments in motion','now'),
'contact/index.html':('Contact — Kostiantyn Bryl','Telegram · Email · LinkedIn','contact'),
'ecosystem/index.html':('Project Ecosystem — Kostiantyn Bryl','NORVEXA Software · Games · Media · Labs','ecosystem'),
'recruiter/index.html':('Recruiter View — Kostiantyn Bryl','Leadership · Scope · Evidence','recruiter'),
'engineering/index.html':('Engineering View — Kostiantyn Bryl','Android · Windows · Automation','engineering'),
'product/index.html':('Product & Operations View — Kostiantyn Bryl','Product · Operations · Systems','product'),
'work/clearup/index.html':('ClearUp — Kostiantyn Bryl','NORVEXA Software · Privacy-first Android utility','project-clearup'),
'work/cutflow-batch/index.html':('CutFlow Batch — Kostiantyn Bryl','NORVEXA Software · Windows batch video workflow','project-cutflow'),
'work/luma-bay/index.html':('Luma Bay — Kostiantyn Bryl','NORVEXA Games · Restoration game product concept','project-lumabay'),
'work/telemanage/index.html':('TeleManage Enterprise — Kostiantyn Bryl','NORVEXA Media · Content operations platform','project-telemanage'),
'work/bryltab/index.html':('BrylTab Bouncer Glass — Kostiantyn Bryl','NORVEXA Labs · Android 16 · SystemUI · LSPosed','project-bryltab')}

def font(size,bold=False):
    for p in [('/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'),('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')]:
        if Path(p).exists(): return ImageFont.truetype(p,size)
    return ImageFont.load_default()

def og(title,kicker,filename):
    W,H=1200,630; im=Image.new('RGB',(W,H),(6,9,14)); d=ImageDraw.Draw(im)
    for i in range(0,W,48): d.line((i,0,i,H),fill=(11,17,25),width=1)
    for j in range(0,H,48): d.line((0,j,W,j),fill=(11,17,25),width=1)
    d.ellipse((760,-200,1300,340),fill=(12,43,58))
    d.text((74,70),'KOSTIANTYN BRYL',font=font(26,True),fill=(142,234,255))
    d.text((74,115),'PERSONAL PORTFOLIO',font=font(18,True),fill=(132,148,165))
    words=title.replace(' — Kostiantyn Bryl','').replace('Kostiantyn Bryl — ','').split(); lines=[]; cur=''
    for w in words:
        test=(cur+' '+w).strip()
        if d.textlength(test,font=font(66,True))>950 and cur: lines.append(cur); cur=w
        else: cur=test
    if cur: lines.append(cur)
    y=220
    for line in lines[:3]: d.text((74,y),line,font=font(66,True),fill=(244,247,250)); y+=78
    d.text((74,505),kicker.upper(),font=font(18,True),fill=(132,148,165))
    d.text((74,555),'CREATING TOMORROW.',font=font(17,True),fill=(120,137,153))
    Path(filename).parent.mkdir(parents=True,exist_ok=True); im.save(filename,'PNG',optimize=True)

def canonical(path): return BASE if path=='index.html' else BASE+path.replace('index.html','')

def patch_html(file,title,kicker,slug):
    p=Path(file)
    if not p.exists(): return
    text=p.read_text(encoding='utf-8')
    url=canonical(file); ogfile=f'assets/og/{slug}.png'; og(title,kicker,ogfile)
    schema={'@context':'https://schema.org','@type':'WebPage','name':title,'url':url,'author':{'@type':'Person','name':'Kostiantyn Bryl','sameAs':['https://github.com/kostiantynbryl','https://www.linkedin.com/in/kostiantyn-bryl97/','https://t.me/kostiantynbryl']},'isPartOf':{'@type':'WebSite','name':'Kostiantyn Bryl Portfolio','url':BASE}}
    if file.startswith('work/') and file.count('/')==2:
        schema['@type']='SoftwareApplication'; schema['applicationCategory']='DeveloperApplication'
    alts=''.join(f'<link rel="alternate" hreflang="{l}" href="{url}?lang={l}">' for l in ['en','pl','ru','uk','zh-CN'])+f'<link rel="alternate" hreflang="x-default" href="{url}">'
    block=f'''<!-- V11_META_START --><link rel="canonical" href="{url}">{alts}<meta property="og:title" content="{title}"><meta property="og:description" content="{kicker}"><meta property="og:type" content="website"><meta property="og:url" content="{url}"><meta property="og:image" content="{BASE}{ogfile}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{title}"><meta name="twitter:image" content="{BASE}{ogfile}"><script type="application/ld+json">{json.dumps(schema,ensure_ascii=False)}</script><!-- V11_META_END -->'''
    text=re.sub(r'<!-- V11_META_START -->.*?<!-- V11_META_END -->',block,text,flags=re.S)
    if 'V11_META_START' not in text: text=text.replace('<head>','<head>'+block,1)
    text=re.sub(r'<title>.*?</title>',f'<title>{title}</title>',text,count=1,flags=re.S)
    text=text.replace('NORVEXA portfolio and resume.','personal portfolio and resume.')
    text=text.replace('assets/norvexa.svg','assets/kb.svg').replace('../assets/norvexa.svg','../assets/kb.svg').replace('../../assets/norvexa.svg','../../assets/kb.svg')
    p.write_text(text,encoding='utf-8')

for file,(title,kicker,slug) in ROUTES.items(): patch_html(file,title,kicker,slug)
print('Personal portfolio metadata and OG cards refreshed.')
