from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics

OUT=Path('assets/cv'); OUT.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('Noto','/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoB','/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'))
ACC=colors.HexColor('#147f96'); TEXT=colors.HexColor('#17191d'); MUTED=colors.HexColor('#5d6570'); LINE=colors.HexColor('#d9dde2'); BG=colors.HexColor('#f5f8f9')
BASE={
'en':{'suffix':'EN','contact':'kostiantynbryl@gmail.com · github.com/kostiantynbryl · t.me/kostiantynbryl','experience':'Selected experience','projects':'Selected evidence','skills':'Focus','roles':[('2015–2018','DataGroup','Telecom Engineer'),('2018–2021','TME','Head of International Orders'),('2022–2023','ALLO','Retail Manager'),('2022–Present','LLC Brillkoff','Owner')]},
'pl':{'suffix':'PL','contact':'kostiantynbryl@gmail.com · github.com/kostiantynbryl · t.me/kostiantynbryl','experience':'Wybrane doświadczenie','projects':'Wybrane dowody','skills':'Fokus','roles':[('2015–2018','DataGroup','Inżynier telekomunikacji'),('2018–2021','TME','Head of International Orders'),('2022–2023','ALLO','Retail Manager'),('2022–obecnie','LLC Brillkoff','Owner')]},
'ru':{'suffix':'RU','contact':'kostiantynbryl@gmail.com · github.com/kostiantynbryl · t.me/kostiantynbryl','experience':'Избранный опыт','projects':'Избранные подтверждения','skills':'Фокус','roles':[('2015–2018','DataGroup','Инженер телекоммуникаций'),('2018–2021','TME','Руководитель международных заказов'),('2022–2023','ALLO','Retail Manager'),('2022–н.в.','LLC Brillkoff','Владелец')]},
'uk':{'suffix':'UA','contact':'kostiantynbryl@gmail.com · github.com/kostiantynbryl · t.me/kostiantynbryl','experience':'Вибраний досвід','projects':'Вибрані підтвердження','skills':'Фокус','roles':[('2015–2018','DataGroup','Інженер телекомунікацій'),('2018–2021','TME','Керівник міжнародних замовлень'),('2022–2023','ALLO','Retail Manager'),('2022–дотепер','LLC Brillkoff','Власник')]}}
ROLE={
'RECRUITER':{
'en':('Product & Operations Leader · Software Builder','10+ years across technology and operations, leadership of teams up to 20 people, and hands-on product/software delivery. Built for recruiters who need the shortest path to scope, ownership and evidence.',['Leadership & operations','Product development','Process automation','Cross-functional ownership'],['ClearUp — privacy-first Android utility','TeleManage Enterprise — content operations architecture','CutFlow Batch — Windows workflow automation']),
'pl':('Product & Operations Leader · Software Builder','Ponad 10 lat w technologii i operacjach, zarządzanie zespołami do 20 osób oraz praktyczne tworzenie produktów i oprogramowania.',['Przywództwo i operacje','Rozwój produktu','Automatyzacja procesów','Odpowiedzialność cross-functional'],['ClearUp — privacy-first narzędzie Android','TeleManage Enterprise — architektura content operations','CutFlow Batch — automatyzacja workflow Windows']),
'ru':('Product & Operations Leader · Software Builder','Более 10 лет в технологиях и операциях, управление командами до 20 человек и практическая реализация продуктов и ПО.',['Лидерство и операции','Разработка продуктов','Автоматизация процессов','Кросс-функциональная ответственность'],['ClearUp — privacy-first Android-утилита','TeleManage Enterprise — архитектура контент-операций','CutFlow Batch — автоматизация Windows-процессов']),
'uk':('Product & Operations Leader · Software Builder','Понад 10 років у технологіях та операціях, керування командами до 20 людей і практична реалізація продуктів та ПЗ.',['Лідерство й операції','Розробка продуктів','Автоматизація процесів','Крос-функціональна відповідальність'],['ClearUp — privacy-first Android-утиліта','TeleManage Enterprise — архітектура контент-операцій','CutFlow Batch — автоматизація Windows-процесів'])},
'ENGINEERING':{
'en':('Software Builder · Android · Automation','Hands-on engineering across Android, Windows tooling, APIs, Linux and device-level R&D, with product and operational context behind technical decisions.',['Kotlin / Java / Android','Python / PySide6 / FFmpeg','Linux / ADB / Fastboot','REST APIs / automation'],['ClearUp — Kotlin, Compose, Root, Shizuku','CutFlow Batch — Python, PySide6, FFmpeg','BrylTab Bouncer Glass — Android 16, SystemUI, LSPosed']),
'pl':('Software Builder · Android · Automation','Praktyczna inżynieria Android, narzędzia Windows, API, Linux i device-level R&D, z kontekstem produktowym i operacyjnym.',['Kotlin / Java / Android','Python / PySide6 / FFmpeg','Linux / ADB / Fastboot','REST API / automatyzacja'],['ClearUp — Kotlin, Compose, Root, Shizuku','CutFlow Batch — Python, PySide6, FFmpeg','BrylTab Bouncer Glass — Android 16, SystemUI, LSPosed']),
'ru':('Software Builder · Android · Automation','Практическая разработка для Android и Windows, работа с API, Linux и исследования на уровне устройств, подкреплённые продуктовым и операционным контекстом.',['Kotlin / Java / Android','Python / PySide6 / FFmpeg','Linux / ADB / Fastboot','REST API / автоматизация'],['ClearUp — Kotlin, Compose, Root, Shizuku','CutFlow Batch — Python, PySide6, FFmpeg','BrylTab Bouncer Glass — Android 16, SystemUI, LSPosed']),
'uk':('Software Builder · Android · Automation','Практична розробка для Android і Windows, робота з API, Linux та дослідження на рівні пристроїв, підкріплені продуктовим і операційним контекстом.',['Kotlin / Java / Android','Python / PySide6 / FFmpeg','Linux / ADB / Fastboot','REST API / автоматизація'],['ClearUp — Kotlin, Compose, Root, Shizuku','CutFlow Batch — Python, PySide6, FFmpeg','BrylTab Bouncer Glass — Android 16, SystemUI, LSPosed'])},
'PRODUCT':{
'en':('Product & Operations Leader','Product judgement grounded in real operations: identify friction, model constraints, choose measurable outcomes and turn repeated work into reliable systems.',['Product strategy','Operations design','Workflow automation','Business systems & analytics'],['TeleManage Enterprise — unified content operating model','ClearUp — explicit safety and privacy rules','Luma Bay — progression-first game product concept']),
'pl':('Product & Operations Leader','Decyzje produktowe oparte na realnych operacjach: tarcie, ograniczenia, mierzalne rezultaty i zamiana powtarzalnej pracy w niezawodne systemy.',['Strategia produktu','Projektowanie operacji','Automatyzacja workflow','Systemy biznesowe i analityka'],['TeleManage Enterprise — wspólny model content operations','ClearUp — jawne reguły bezpieczeństwa i prywatności','Luma Bay — koncepcja gry oparta na progresji']),
'ru':('Product & Operations Leader','Продуктовые решения, основанные на реальных операциях: поиск трения, моделирование ограничений, измеримые результаты и превращение повторяющейся работы в надёжные системы.',['Продуктовая стратегия','Проектирование операций','Автоматизация процессов','Бизнес-системы и аналитика'],['TeleManage Enterprise — единая модель контент-операций','ClearUp — явные правила безопасности и приватности','Luma Bay — игровой концепт с прогрессией в основе']),
'uk':('Product & Operations Leader','Продуктові рішення, засновані на реальних операціях: пошук тертя, моделювання обмежень, вимірювані результати й перетворення повторюваної роботи на надійні системи.',['Продуктова стратегія','Проєктування операцій','Автоматизація процесів','Бізнес-системи та аналітика'],['TeleManage Enterprise — єдина модель контент-операцій','ClearUp — явні правила безпеки й приватності','Luma Bay — ігровий концепт із прогресією в основі'])}}

def ps(name,size,leading,font='Noto',color=TEXT): return ParagraphStyle(name,fontName=font,fontSize=size,leading=leading,textColor=color)
def footer(canvas,doc):
    w,h=A4;canvas.saveState();canvas.setStrokeColor(LINE);canvas.line(18*mm,13*mm,w-18*mm,13*mm);canvas.setFont('Noto',7);canvas.setFillColor(MUTED);canvas.drawString(18*mm,8*mm,'Kostiantyn Bryl · NORVEXA · role-specific CV');canvas.restoreState()

def build(role,lang):
    base=BASE[lang]; title,summary,focus,projects=ROLE[role][lang]; fn=OUT/f'Kostiantyn_Bryl_CV_{role}_{base["suffix"]}.pdf'
    doc=SimpleDocTemplate(str(fn),pagesize=A4,leftMargin=18*mm,rightMargin=18*mm,topMargin=16*mm,bottomMargin=19*mm,author='Kostiantyn Bryl',title=f'Kostiantyn Bryl — {role} CV')
    H1=ps('h1',27,30,'NotoB'); H2=ps('h2',11,14,'NotoB',ACC); SEC=ps('sec',11,14,'NotoB'); BODY=ps('body',9,12); SMALL=ps('small',7.5,10,'Noto',MUTED); CO=ps('co',9.5,12,'NotoB')
    s=[Paragraph('KOSTIANTYN BRYL',H1),Paragraph(title,H2),Spacer(1,2*mm),Paragraph(base['contact'],SMALL),Spacer(1,6*mm),Paragraph(summary,BODY),Spacer(1,6*mm),Paragraph(base['skills'].upper(),SEC),Spacer(1,2*mm)]
    t=Table([[Paragraph(x,SMALL) for x in focus[:2]],[Paragraph(x,SMALL) for x in focus[2:]]],colWidths=[87.5*mm,87.5*mm]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),BG),('GRID',(0,0),(-1,-1),.4,LINE),('LEFTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6)]));s += [t,Spacer(1,6*mm),Paragraph(base['experience'].upper(),SEC),Spacer(1,2*mm)]
    for period,company,r in base['roles']:
        row=Table([[Paragraph(period,SMALL),Paragraph(company,CO),Paragraph(r,BODY)]],colWidths=[28*mm,45*mm,102*mm]);row.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),5),('LINEBELOW',(0,0),(-1,-1),.35,LINE)]));s += [row,Spacer(1,1.5*mm)]
    s += [Spacer(1,4*mm),Paragraph(base['projects'].upper(),SEC),Spacer(1,2*mm)]
    for p in projects:
        t=Table([[Paragraph(p,CO)]],colWidths=[175*mm]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),BG),('BOX',(0,0),(-1,-1),.4,LINE),('LEFTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)]));s += [t,Spacer(1,2*mm)]
    s += [Spacer(1,5*mm),Paragraph('10+ YEARS · TEAMS UP TO 20 · PRODUCT · OPERATIONS · SOFTWARE',SMALL)]
    doc.build(s,onFirstPage=footer,onLaterPages=footer)

for role in ROLE:
    for lang in BASE: build(role,lang)
