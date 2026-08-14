from __future__ import annotations
import io,json,os,re,urllib.request
from datetime import datetime,timezone
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageFilter
ROOT=Path('.')
BASE='https://kostiantynbryl.github.io/My-Resume/'
TOKEN=os.getenv('GITHUB_TOKEN','')
HEAD={'Accept':'application/vnd.github+json','User-Agent':'norvexa-portfolio-build'}
if TOKEN: HEAD['Authorization']=f'Bearer {TOKEN}'

def get(url,binary=False):
    req=urllib.request.Request(url,headers=HEAD)
    with urllib.request.urlopen(req,timeout=30) as r:
        data=r.read()
    return data if binary else json.loads(data.decode())

def ensure(p): Path(p).parent.mkdir(parents=True,exist_ok=True)

def github_snapshot():
    user=get('https://api.github.com/users/kostiantynbryl')
    repos=get('https://api.github.com/users/kostiantynbryl/repos?per_page=100&sort=updated')
    slim=[]
    for r in repos:
        slim.append({k:r.get(k) for k in ['name','html_url','language','stargazers_count','updated_at','pushed_at','description','homepage','archived']})
    ensure('data/github.json')
    Path('data/github.json').write_text(json.dumps({'generated_at':datetime.now(timezone.utc).isoformat(),'user':{'login':user.get('login'),'public_repos':user.get('public_repos'),'followers':user.get('followers')},'repos':slim},ensure_ascii=False,indent=2),encoding='utf-8')

def optimize_remote(src,dst,size=None):
    data=get(src,True); im=Image.open(io.BytesIO(data)).convert('RGB')
    if size: im.thumbnail(size,Image.Resampling.LANCZOS)
    ensure(dst); im.save(dst,'WEBP',quality=86,method=6)

def font(size,bold=False):
    choices=['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf','/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf']
    for p in choices:
        if Path(p).exists(): return ImageFont.truetype(p,size)
    return ImageFont.load_default()

def og(title,kicker,filename):
    W,H=1200,630
    im=Image.new('RGB',(W,H),(6,9,14)); d=ImageDraw.Draw(im)
    for i in range(0,W,48): d.line((i,0,i,H),fill=(11,17,25),width=1)
    for j in range(0,H,48): d.line((0,j,W,j),fill=(11,17,25),width=1)
    d.ellipse((760,-200,1300,340),fill=(12,43,58))
    d.text((74,70),'NORVEXA',font=font(26,True),fill=(142,234,255))
    d.text((74,115),kicker.upper(),font=font(20,True),fill=(132,148,165))
    words=title.split(); lines=[]; cur=''
    for w in words:
        test=(cur+' '+w).strip()
        if d.textlength(test,font=font(66,True))>950 and cur: lines.append(cur);cur=w
        else: cur=test
    if cur: lines.append(cur)
    y=220
    for line in lines[:3]: d.text((74,y),line,font=font(66,True),fill=(244,247,250)); y+=78
    d.text((74,555),'KOSTIANTYN BRYL / PRODUCT · OPERATIONS · TECHNOLOGY',font=font(17,True),fill=(120,137,153))
    ensure(filename);im.save(filename,'PNG',optimize=True)

ROUTES={
'index.html':('Kostiantyn Bryl — NORVEXA Portfolio','Product · Operations · Technology','home'),
'work/index.html':('Selected Work — NORVEXA','Software · Games · Media · Labs','work'),
'experience/index.html':('Experience — Kostiantyn Bryl','Technology · Operations · Leadership','experience'),
'case-studies/index.html':('Case Studies — Kostiantyn Bryl','Product decisions under real constraints','case-studies'),
'about/index.html':('About — Kostiantyn Bryl','Business judgement with a builder’s instinct','about'),
'now/index.html':('Now — Kostiantyn Bryl','Products and experiments in motion','now'),
'contact/index.html':('Contact — Kostiantyn Bryl','Direct channels · Telegram · Email · LinkedIn','contact'),
'ecosystem/index.html':('NORVEXA Ecosystem','Software · Games · Media · Labs','ecosystem'),
'recruiter/index.html':('Recruiter View — Kostiantyn Bryl','Leadership · Scope · Evidence','recruiter'),
'engineering/index.html':('Engineering View — Kostiantyn Bryl','Android · Windows · Automation','engineering'),
'product/index.html':('Product & Operations View — Kostiantyn Bryl','Product · Operations · Systems','product'),
'work/clearup/index.html':('ClearUp — NORVEXA Software','Privacy-first Android utility','project-clearup'),
'work/cutflow-batch/index.html':('CutFlow Batch — NORVEXA Software','Windows batch video workflow','project-cutflow'),
'work/luma-bay/index.html':('Luma Bay — NORVEXA Games','Restoration game product concept','project-lumabay'),
'work/telemanage/index.html':('TeleManage Enterprise — NORVEXA Media','Content operations platform','project-telemanage'),
'work/bryltab/index.html':('BrylTab Bouncer Glass — NORVEXA Labs','Android 16 · SystemUI · LSPosed','project-bryltab')}

def url_for(path):
    if path=='index.html': return BASE
    return BASE+path.replace('index.html','')

def inject_meta():
    langs=['en','pl','ru','uk']
    for file,(title,kicker,slug) in ROUTES.items():
        p=Path(file)
        if not p.exists(): continue
        ogfile=f'assets/og/{slug}.png';og(title,kicker,ogfile)
        canonical=url_for(file)
        kind='SoftwareApplication' if file.startswith('work/') and file.count('/')==2 else 'WebPage'
        schema={'@context':'https://schema.org','@type':kind,'name':title,'url':canonical,'author':{'@type':'Person','name':'Kostiantyn Bryl','sameAs':['https://github.com/kostiantynbryl','https://www.linkedin.com/in/kostiantyn-bryl97/','https://t.me/kostiantynbryl']}}
        if kind=='SoftwareApplication': schema['applicationCategory']='DeveloperApplication'
        alt=''.join(f'<link rel="alternate" hreflang="{l if l!="uk" else "uk"}" href="{canonical}?lang={l}">' for l in langs)+f'<link rel="alternate" hreflang="x-default" href="{canonical}">'
        block=f'''<!-- V11_META_START --><link rel="canonical" href="{canonical}">{alt}<meta property="og:title" content="{title}"><meta property="og:description" content="{kicker}"><meta property="og:type" content="website"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{BASE}{ogfile}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{title}"><meta name="twitter:image" content="{BASE}{ogfile}"><script type="application/ld+json">{json.dumps(schema,ensure_ascii=False)}</script><!-- V11_META_END -->'''
        text=p.read_text(encoding='utf-8')
        text=re.sub(r'<!-- V11_META_START -->.*?<!-- V11_META_END -->',block,text,flags=re.S)
        if 'V11_META_START' not in text: text=text.replace('<head>','<head>'+block,1)
        p.write_text(text,encoding='utf-8')

def build_info():
    ensure('data/build.json');Path('data/build.json').write_text(json.dumps({'version':'1.1','commit':os.getenv('GITHUB_SHA','local'),'generated_at':datetime.now(timezone.utc).isoformat()},indent=2),encoding='utf-8')

def main():
    github_snapshot();build_info()
    optimize_remote('https://avatars.githubusercontent.com/u/279725326?v=4','assets/profile.webp',(720,720))
    try: optimize_remote('https://raw.githubusercontent.com/kostiantynbryl/CutFlow-Batch/main/docs/screenshots/main-window.webp','assets/gallery/cutflow-main.webp',(1600,1000))
    except Exception as e: print('CutFlow screenshot skipped:',e)
    inject_meta()
if __name__=='__main__': main()
