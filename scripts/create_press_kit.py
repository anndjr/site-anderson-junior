from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "public" / "media"
OUTPUT = ROOT / "output" / "pdf" / "press-kit-anderson-junior.pdf"

PAGE_W, PAGE_H = A4
COFFEE = colors.HexColor("#211B18")
COFFEE_DEEP = colors.HexColor("#171310")
GRAPHITE = colors.HexColor("#292826")
BLACK = colors.HexColor("#101010")
IVORY = colors.HexColor("#F3EEE5")
MIST = colors.HexColor("#B9B2A7")
PAPER = colors.HexColor("#E8DFD0")
INK = colors.HexColor("#171512")
COPPER = colors.HexColor("#BD7045")
EMBER = colors.HexColor("#E66F22")


def register_fonts():
    font_dir = Path("C:/Windows/Fonts")
    candidates = {
        "Display": font_dir / "georgia.ttf",
        "DisplayBold": font_dir / "georgiab.ttf",
        "Sans": font_dir / "arial.ttf",
        "SansBold": font_dir / "arialbd.ttf",
        "Mono": font_dir / "cour.ttf",
    }
    for name, path in candidates.items():
        if path.exists():
            pdfmetrics.registerFont(TTFont(name, str(path)))


def crop_image(c, path, x, y, width, height, position_x=0.5, position_y=0.5, alpha=1):
    image = ImageReader(str(path))
    source_w, source_h = image.getSize()
    scale = max(width / source_w, height / source_h)
    draw_w = source_w * scale
    draw_h = source_h * scale
    draw_x = x - (draw_w - width) * position_x
    draw_y = y - (draw_h - height) * position_y
    c.saveState()
    path_clip = c.beginPath()
    path_clip.rect(x, y, width, height)
    c.clipPath(path_clip, stroke=0, fill=0)
    c.setFillAlpha(alpha)
    c.drawImage(image, draw_x, draw_y, draw_w, draw_h, mask="auto")
    c.restoreState()


def draw_rule(c, x, y, width, color=COPPER, thickness=1):
    c.setStrokeColor(color)
    c.setLineWidth(thickness)
    c.line(x, y, x + width, y)


def draw_label(c, text, x, y, color=COPPER):
    c.setFillColor(color)
    c.setFont("Mono", 8)
    c.drawString(x, y, text.upper())


def paragraph(c, text, x, y_top, width, font_size=11, leading=17, color=INK, font="Sans"):
    style = ParagraphStyle(
        name="body",
        fontName=font,
        fontSize=font_size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=0,
    )
    block = Paragraph(text, style)
    _, height = block.wrap(width, PAGE_H)
    block.drawOn(c, x, y_top - height)
    return y_top - height


def page_number(c, number, light=False):
    c.setFillColor(MIST if light else colors.HexColor("#6F675E"))
    c.setFont("Mono", 7)
    c.drawRightString(PAGE_W - 34, 24, f"ANDERSON JUNIOR  /  0{number}")


def draw_cover(c):
    c.setFillColor(BLACK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    crop_image(c, MEDIA / "anderson-chapeu.png", PAGE_W * 0.39, 0, PAGE_W * 0.61, PAGE_H, 0.62, 0.52)

    c.setFillColor(colors.Color(0.02, 0.02, 0.02, alpha=0.42))
    c.rect(PAGE_W * 0.42, 0, PAGE_W * 0.58, PAGE_H, fill=1, stroke=0)
    c.setFillColor(BLACK)
    c.rect(0, 0, PAGE_W * 0.48, PAGE_H, fill=1, stroke=0)

    c.drawImage(
        str(MEDIA / "anderson-junior-logo.png"),
        42,
        PAGE_H * 0.49,
        width=PAGE_W * 0.47,
        height=PAGE_W * 0.47 / 3.39,
        preserveAspectRatio=True,
        mask="auto",
    )
    draw_rule(c, 44, PAGE_H * 0.47, 54, EMBER, 2)
    draw_label(c, "Press kit 2026", 44, PAGE_H - 58, MIST)
    c.setFillColor(IVORY)
    c.setFont("SansBold", 10)
    c.drawString(44, 92, "CANTOR SERTANEJO")
    c.setFillColor(MIST)
    c.setFont("Sans", 9)
    c.drawString(44, 74, "Passos, Minas Gerais")
    page_number(c, 1, light=True)
    c.showPage()


def draw_artist(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    crop_image(c, MEDIA / "memoria-pai.jpg", 28, 28, PAGE_W * 0.47, PAGE_H - 56, 0.34, 0.5)

    x = PAGE_W * 0.54
    width = PAGE_W * 0.38
    draw_label(c, "01 / O artista", x, PAGE_H - 58)
    c.setFillColor(INK)
    c.setFont("Display", 35)
    c.drawString(x, PAGE_H - 116, "Uma história")
    c.drawString(x, PAGE_H - 154, "que começou")
    c.drawString(x, PAGE_H - 192, "dentro de casa.")
    draw_rule(c, x, PAGE_H - 216, 60, COPPER, 1.5)

    y = PAGE_H - 254
    y = paragraph(
        c,
        "A música entrou cedo na vida de Anderson Junior. Foi com o pai, que cantava e tocava, que aprendeu seus primeiros acordes. Um deles foi <b>Menino da Porteira</b>.",
        x,
        y,
        width,
        11.5,
        18,
        INK,
    )
    y -= 18
    y = paragraph(
        c,
        "Na escola, passou a cantar e tocar e, mais tarde, levou a música para festas, churrascos e encontros. Formado em Sistemas de Informação, trabalhou com tecnologia até decidir seguir o sonho de viver dos palcos.",
        x,
        y,
        width,
        9.6,
        15,
        INK,
    )
    y -= 14
    paragraph(
        c,
        "Depois de uma fase de aprendizado em uma dupla sertaneja, iniciou um novo momento em carreira solo.",
        x,
        y,
        width,
        9.6,
        15,
        INK,
    )
    page_number(c, 2)
    c.showPage()


def draw_show(c):
    c.setFillColor(COFFEE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    crop_image(c, MEDIA / "viola-caipira.jpg", PAGE_W * 0.56, 34, PAGE_W * 0.39, PAGE_H - 68, 0.5, 0.45)

    x = 42
    width = PAGE_W * 0.43
    draw_label(c, "02 / O show", x, PAGE_H - 58)
    c.setFillColor(IVORY)
    c.setFont("Display", 44)
    c.drawString(x, PAGE_H - 126, "Voz")
    c.setFillColor(PAPER)
    c.setFont("Display", 44)
    c.drawString(x + 24, PAGE_H - 174, "Violão")
    c.setFont("Display", 44)
    c.drawString(x + 48, PAGE_H - 222, "Viola")
    draw_rule(c, x, PAGE_H - 244, 72, EMBER, 2)

    y = PAGE_H - 284
    y = paragraph(
        c,
        "Anderson alterna entre violão e viola caipira e mantém uma relação próxima com o público por meio da música, da conversa e da interação.",
        x,
        y,
        width,
        11,
        18,
        IVORY,
    )
    y -= 20
    y = paragraph(
        c,
        "O repertório reúne sucessos atuais, músicas românticas, clássicos e modas sertanejas, transitando naturalmente entre emoção e energia.",
        x,
        y,
        width,
        10,
        16,
        MIST,
    )
    y -= 34
    draw_label(c, "Banda completa", x, y, EMBER)
    paragraph(
        c,
        "Formação de maior escala para prefeituras, exposições e grandes eventos. Disponibilidade, estrutura e formato são tratados diretamente no contato.",
        x,
        y - 22,
        width,
        9.5,
        15,
        IVORY,
    )
    page_number(c, 3, light=True)
    c.showPage()


def draw_trajectory(c):
    c.setFillColor(GRAPHITE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    crop_image(c, MEDIA / "palco-preto-branco.jpg", 0, PAGE_H * 0.48, PAGE_W, PAGE_H * 0.52, 0.5, 0.42)
    c.setFillColor(colors.Color(0.04, 0.04, 0.04, alpha=0.5))
    c.rect(0, PAGE_H * 0.48, PAGE_W, PAGE_H * 0.52, fill=1, stroke=0)

    draw_label(c, "03 / Trajetória", 42, PAGE_H - 54, EMBER)
    c.setFillColor(IVORY)
    c.setFont("Display", 34)
    c.drawString(42, PAGE_H - 102, "Dos palcos da região")
    c.drawString(42, PAGE_H - 140, "para novos encontros.")

    x = 42
    y = PAGE_H * 0.43
    width = PAGE_W - 84
    y = paragraph(
        c,
        "Anderson Junior já se apresentou em exposições, casas noturnas e eventos em cidades como <b>Passos, São João Batista do Glória e Alpinópolis</b>.",
        x,
        y,
        width,
        11,
        18,
        IVORY,
    )
    y -= 18
    y = paragraph(
        c,
        "Em sua trajetória, dividiu o palco com <b>Clayton &amp; Romário, Lucas Reis &amp; Thácio e Diego &amp; Victor Hugo</b>, entre vários outros nomes do sertanejo.",
        x,
        y,
        width,
        11,
        18,
        IVORY,
    )
    y -= 34
    draw_rule(c, x, y, width, colors.Color(1, 1, 1, alpha=0.18), 1)
    y -= 38
    draw_label(c, "Contato para shows", x, y, EMBER)
    c.setFillColor(IVORY)
    c.setFont("SansBold", 13)
    c.drawString(x, y - 30, "WhatsApp  +55 35 98409-4626")
    c.setFont("Sans", 10)
    c.setFillColor(MIST)
    c.drawString(x, y - 54, "Instagram  @andersonjrcantor")
    c.drawString(x, y - 74, "TikTok  @andersonjrcantor")
    page_number(c, 4, light=True)
    c.showPage()


def main():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    pdf.setTitle("Press Kit - Anderson Junior")
    pdf.setAuthor("Anderson Junior")
    pdf.setSubject("Apresentação profissional e contato para shows")
    draw_cover(pdf)
    draw_artist(pdf)
    draw_show(pdf)
    draw_trajectory(pdf)
    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    main()
