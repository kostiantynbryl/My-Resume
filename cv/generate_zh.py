from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont

OUT=Path('assets/cv');OUT.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(UnicodeCIDFont('STSong-Light'))
FONT='STSong-Light';ACC=colors.HexColor('#148DA6');TEXT=colors.HexColor('#171A20');MUTED=colors.HexColor('#626B75');LINE=colors.HexColor('#D8E1E4');BG=colors.HexColor('#F5F8F9')
CONTACT='+38 (099) 855-95-76 · kostiantynbryl@gmail.com · Telegram @kostiantynbryl · linkedin.com/in/kostiantyn-bryl97 · kostiantynbryl.pp.ua'
EXP=[('2022 - 至今','Brillkoff','创始人 / 所有者','负责自有公司的运营管理；引入 AI 工具与流程自动化；制定增长与规模化战略。'),('2022 - 2023','ALLO','实体零售门店经理','管理零售门店及最多 20 人团队；负责 KPI、销售表现、客户服务与运营优化。'),('2018 - 2021','TME','国际订单部门负责人','协调国际供货与订单；优化国际物流流程；使用 ERP / CRM 系统。'),('2016 - 2018','DataGroup','通信工程师','维护网络基础设施；负责 VPN、MikroTik、Cisco 与网络管理；故障诊断；服务企业客户。')]
SKILLS=['战略业务管理','团队管理（最多 20+ 人）','零售运营','危机管理','财务规划与 KPI 控制','绩效分析与优化','AI 业务应用','国际业务发展','销售与客户体验','谈判与伙伴管理','项目管理','流程与工作流自动化','业务流程设计与规模化','运营管理','风险管理','数据驱动管理']
TECH=['Office & Data: Word / Excel / PowerPoint / Power Query / Power BI / Google Docs / Sheets','Business Systems: SAP S/4HANA / 1C / ERP / WMS / POS','CRM: Salesforce / HubSpot','Design: Photoshop / Premiere Pro / Illustrator / InDesign / Canva / Figma','Networks & IT: MikroTik / Wireshark / PuTTY / SSH / VPN','AI & APIs: OpenAI API / REST API / Postman','Automation: Zapier / Make']
COURSES=['Google IT Support Professional Certificate','IBM AI Foundations for Business Specialization','Microsoft Power BI Data Analyst','OpenAI API & AI Automation Systems','Cisco Introduction to Networks','Meta Prompt Engineering for AI Applications','Atlassian Agile Project Management Foundations','UiPath Business Process Automation Fundamentals','Harvard Business School Leadership Principles','Google Project Management Professional Certificate','HubSpot CRM Management Certification','Salesforce CRM Fundamentals','Digital Transformation in Business','Retail Operations & KPI Management','Excel for Business & Data Analytics','Google Analytics Certification','SAP S/4HANA Business Processes','Workflow Automation & Integration Systems','API Testing & REST Integrations']

def ps(name,size,leading,color=TEXT,bold=False):return ParagraphStyle(name,fontName=FONT,fontSize=size,leading=leading,textColor=color,spaceAfter=0)
def footer(canvas,doc):
    w,h=A4;canvas.saveState();canvas.setStrokeColor(LINE);canvas.line(16*mm,13*mm,w-16*mm,13*mm);canvas.setFont(FONT,7);canvas.setFillColor(MUTED);canvas.drawString(16*mm,8*mm,'Kostiantyn Bryl · 个人简历 · Creating Tomorrow');canvas.drawRightString(w-16*mm,8*mm,str(doc.page));canvas.restoreState()

def build(filename,title,summary,focus=None,projects=None):
    doc=SimpleDocTemplate(str(OUT/filename),pagesize=A4,leftMargin=16*mm,rightMargin=16*mm,topMargin=15*mm,bottomMargin=19*mm,author='Kostiantyn Bryl',title='Kostiantyn Bryl CV 中文')
    H1=ps('h1',25,29,TEXT);H2=ps('h2',12,15,ACC);SEC=ps('sec',11,14,ACC);BODY=ps('body',8.8,12);SMALL=ps('small',7.3,9.5,MUTED);CO=ps('co',9.4,12,TEXT)
    s=[Paragraph('KOSTIANTYN BRYL',H1),Paragraph(title,H2),Spacer(1,2*mm),Paragraph('Creating Tomorrow',SMALL),Spacer(1,2*mm),Paragraph(CONTACT,SMALL),Spacer(1,5*mm),Paragraph(summary,BODY),Spacer(1,5*mm)]
    if focus:
        s+=[Paragraph('核心重点',SEC),Spacer(1,2*mm)];rows=[[Paragraph('• '+x,SMALL) for x in focus[i:i+2]] for i in range(0,len(focus),2)];t=Table(rows,colWidths=[89*mm,89*mm]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),BG),('GRID',(0,0),(-1,-1),.35,LINE),('LEFTPADDING',(0,0),(-1,-1),6),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]));s+=[t,Spacer(1,5*mm)]
    s+=[Paragraph('职业经历',SEC),Spacer(1,2*mm)]
    for period,company,role,desc in EXP:
        t=Table([[Paragraph(period,SMALL),Paragraph(company,CO),Paragraph(role,BODY)],[Paragraph('',SMALL),Paragraph('',SMALL),Paragraph(desc,SMALL)]],colWidths=[28*mm,45*mm,105*mm]);t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),3),('LINEBELOW',(0,1),(-1,1),.35,LINE)]));s+=[t,Spacer(1,2*mm)]
    if projects:
        s+=[Spacer(1,3*mm),Paragraph('精选项目',SEC),Spacer(1,2*mm)]
        for p in projects:s+=[Paragraph('• '+p,BODY)]
    s+=[PageBreak(),Paragraph('核心能力',SEC),Spacer(1,2*mm)]
    rows=[[Paragraph('• '+x,SMALL) for x in SKILLS[i:i+2]] for i in range(0,len(SKILLS),2)];t=Table(rows,colWidths=[89*mm,89*mm]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),BG),('GRID',(0,0),(-1,-1),.35,LINE),('LEFTPADDING',(0,0),(-1,-1),6),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]));s+=[t,Spacer(1,5*mm),Paragraph('技术技能',SEC),Spacer(1,2*mm)]
    for x in TECH:s+=[Paragraph('• '+x,SMALL)]
    s+=[Spacer(1,4*mm),Paragraph('语言能力',SEC),Spacer(1,1*mm),Paragraph('乌克兰语 - 母语 · 俄语 - 母语 · 波兰语 - 高级 · 英语 - 中级',BODY),Spacer(1,4*mm),Paragraph('教育与职业发展',SEC),Spacer(1,1*mm),Paragraph('专业自学与职业课程：'+' · '.join(COURSES),SMALL)]
    doc.build(s,onFirstPage=footer,onLaterPages=footer)

build('Kostiantyn_Bryl_CV_ZH.pdf','战略管理者 · 运营 · 商业 · 自动化','具备运营管理、国际业务流程、零售管理及自主创业经验的战略型管理者。将管理思维、IT 能力与现代 AI 技术结合，用于企业规模化、流程优化和团队效率提升。')
build('Kostiantyn_Bryl_CV_RECRUITER_ZH.pdf','产品与运营负责人 · 软件构建者','10+ 年技术与运营经验，管理过最多 20 人的团队，并具备产品和软件实际交付能力。此版本优先展示管理范围、责任与可验证成果。',['领导力与运营','产品开发','流程自动化','跨职能责任'],['ClearUp - 隐私优先 Android 工具','TeleManage Enterprise - 内容运营架构','CutFlow Batch - Windows 工作流自动化'])
build('Kostiantyn_Bryl_CV_ENGINEERING_ZH.pdf','软件构建者 · Android · 自动化','具备 Android、Windows 工具、API、Linux 与设备级研发的实际工程经验，并以产品和运营背景支撑技术决策。',['Kotlin / Java / Android','Python / PySide6 / FFmpeg','Linux / ADB / Fastboot','REST API / 自动化'],['ClearUp - Kotlin / Compose / Root / Shizuku','CutFlow Batch - Python / PySide6 / FFmpeg','BrylTab Bouncer Glass - Android 16 / SystemUI / LSPosed'])
build('Kostiantyn_Bryl_CV_PRODUCT_ZH.pdf','产品与运营负责人','以真实运营经验为基础进行产品判断：识别摩擦、理解约束、设定可衡量结果，并把重复工作转化为可靠系统。',['产品策略','运营设计','工作流自动化','业务系统与分析'],['TeleManage Enterprise - 统一内容运营模型','ClearUp - 明确的安全与隐私规则','Luma Bay - 以成长系统为核心的游戏概念'])
