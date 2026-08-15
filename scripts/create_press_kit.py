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
ICONS = MEDIA / "press-kit-icons"

PAGE_W, PAGE_H = A4
BLACK = colors.HexColor("#0C0B0A")
COFFEE = colors.HexColor("#1B1613")
GRAPHITE = colors.HexColor("#242321")
PAPER = colors.HexColor("#EFE8DE")
IVORY = colors.HexColor("#FFF8ED")
MIST = colors.HexColor("#C6BAAD")
INK = colors.HexColor("#15120F")
ORANGE = colors.HexColor("#F36B21")
COPPER = colors.HexColor("#B85832")
SAND = colors.HexColor("#D8C6B4")


def register_fonts():
    font_dir = Path("C:/Windows/Fonts")
    fonts = {
        "Display": font_dir / "seguibl.ttf",
        "Sans": font_dir / "segoeui.ttf",
        "SansBold": font_dir / "seguisb.ttf",
        "Condensed": font_dir / "bahnschrift.ttf",
        "Serif": font_dir / "georgia.ttf",
        "SerifBold": font_dir / "georgiab.ttf",
        "Mono": font_dir / "cour.ttf",
    }
    for name, path in fonts.items():
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
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.clipPath(clip, stroke=0, fill=0)
    c.setFillAlpha(alpha)
    c.drawImage(image, draw_x, draw_y, draw_w, draw_h, mask="auto")
    c.restoreState()


def paragraph(c, text, x, y_top, width, font_size=10, leading=15, color=INK, font="Sans"):
    style = ParagraphStyle(
        name="press-kit-body",
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


def label(c, text, x, y, color=ORANGE):
    c.setFillColor(color)
    c.setFont("SansBold", 7.4)
    c.drawString(x, y, text.upper())


def icon_badge(c, icon_name, x, y, size=28, background=IVORY, icon_size=13):
    c.saveState()
    c.setFillColor(background)
    c.circle(x + size / 2, y + size / 2, size / 2, fill=1, stroke=0)
    padding = (size - icon_size) / 2
    c.drawImage(
        str(ICONS / f"{icon_name}.png"),
        x + padding,
        y + padding,
        width=icon_size,
        height=icon_size,
        preserveAspectRatio=True,
        mask="auto",
    )
    c.restoreState()


def contact_item(c, icon_name, label_text, value, x, y, width, href):
    icon_badge(c, icon_name, x, y - 4, 30, IVORY, 14)
    c.setFillColor(BLACK)
    c.setFont("SansBold", 7)
    c.drawString(x + 42, y + 16, label_text.upper())
    c.setFont("SansBold", 10)
    c.drawString(x + 42, y, value)
    c.linkURL(href, (x, y - 6, x + width, y + 28), relative=0)


def page_mark(c, number, light=True):
    color = colors.Color(1, 1, 1, alpha=0.48) if light else colors.HexColor("#6D6258")
    c.setFillColor(color)
    c.setFont("Mono", 7)
    c.drawRightString(PAGE_W - 32, 21, f"ANDERSON JUNIOR  /  0{number}")


def vertical_brand_line(c, x=22, y=32, height=None, color=ORANGE):
    height = height or PAGE_H - 64
    c.setStrokeColor(color)
    c.setLineWidth(2.2)
    c.line(x, y, x, y + height)


def outline_word(c, text, x, y, size, color, alpha=0.24):
    c.saveState()
    c.setStrokeColor(colors.Color(color.red, color.green, color.blue, alpha=alpha))
    c.setLineWidth(0.8)
    text_object = c.beginText(x, y)
    text_object.setFont("Display", size)
    text_object.setTextRenderMode(1)
    text_object.textLine(text)
    c.drawText(text_object)
    c.restoreState()


def orange_corners(c, x, y, width, height, length=18):
    c.setStrokeColor(ORANGE)
    c.setLineWidth(2)
    for x1, y1, x2, y2 in [
        (x, y + height - length, x, y + height),
        (x, y + height, x + length, y + height),
        (x + width - length, y, x + width, y),
        (x + width, y, x + width, y + length),
    ]:
        c.line(x1, y1, x2, y2)


def draw_cover(c):
    crop_image(c, MEDIA / "palco-chapeu.jpg", 0, 0, PAGE_W, PAGE_H, 0.53, 0.42)
    c.setFillColor(colors.Color(0.02, 0.015, 0.012, alpha=0.48))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(colors.Color(0.03, 0.025, 0.02, alpha=0.76))
    c.rect(0, 0, PAGE_W * 0.48, PAGE_H, fill=1, stroke=0)

    outline_word(c, "AO VIVO", -10, PAGE_H - 205, 84, IVORY, 0.16)
    vertical_brand_line(c)
    label(c, "Press kit oficial / 2026", 44, PAGE_H - 52, IVORY)

    c.setFillColor(ORANGE)
    c.roundRect(44, PAGE_H - 114, 148, 32, 0, fill=1, stroke=0)
    icon_badge(c, "microphone", 50, PAGE_H - 110, 24, IVORY, 11)
    c.setFillColor(BLACK)
    c.setFont("SansBold", 9)
    c.drawString(83, PAGE_H - 102, "MÍDIA KIT  /  2026")

    c.drawImage(
        str(MEDIA / "anderson-junior-logo.png"),
        43,
        PAGE_H * 0.41,
        width=PAGE_W * 0.51,
        height=PAGE_W * 0.51 / 3.39,
        preserveAspectRatio=True,
        mask="auto",
    )
    c.setStrokeColor(ORANGE)
    c.setLineWidth(3)
    c.line(44, PAGE_H * 0.39, 116, PAGE_H * 0.39)

    c.setFillColor(IVORY)
    c.setFont("Display", 20)
    c.drawString(44, 108, "CANTOR SERTANEJO")
    c.setFillColor(MIST)
    c.setFont("Sans", 9.5)
    c.drawString(44, 86, "Passos, Minas Gerais")
    c.setFillColor(ORANGE)
    c.circle(PAGE_W - 55, 52, 4.5, fill=1, stroke=0)
    c.circle(PAGE_W - 39, 52, 4.5, fill=1, stroke=0)
    page_mark(c, 1)
    c.showPage()


def draw_artist(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    vertical_brand_line(c, color=COPPER)

    label(c, "01 / Release", 42, PAGE_H - 48, COPPER)
    c.setFillColor(INK)
    c.setFont("Display", 45)
    c.drawString(40, PAGE_H - 102, "A HISTÓRIA")
    outline_word(c, "COMEÇOU", 41, PAGE_H - 146, 44, COPPER, 0.25)

    photo_x, photo_y, photo_w, photo_h = 40, PAGE_H - 442, PAGE_W - 80, 260
    crop_image(c, MEDIA / "memoria-pai.jpg", photo_x, photo_y, photo_w, photo_h, 0.5, 0.48)
    c.setFillColor(colors.Color(0.04, 0.03, 0.02, alpha=0.1))
    c.rect(photo_x, photo_y, photo_w, photo_h, fill=1, stroke=0)
    orange_corners(c, photo_x, photo_y, photo_w, photo_h, 22)
    c.setFillColor(colors.Color(0.05, 0.04, 0.03, alpha=0.84))
    c.rect(photo_x + 14, photo_y + 14, 225, 28, fill=1, stroke=0)
    c.setFillColor(IVORY)
    c.setFont("SansBold", 8)
    c.drawString(photo_x + 25, photo_y + 24, "ANDERSON E O PAI  /  ONDE A MÚSICA COMEÇOU")

    c.setFillColor(COPPER)
    c.rect(40, 284, 5, 110, fill=1, stroke=0)
    left_x = 59
    right_x = PAGE_W * 0.54
    col_w = PAGE_W * 0.39
    y_left = 390
    y_left = paragraph(
        c,
        "A música entrou cedo na vida de Anderson Junior. Foi com o pai, que cantava e tocava, que aprendeu seus primeiros acordes. Um deles foi <b>Menino da Porteira</b>.",
        left_x,
        y_left,
        col_w,
        10.3,
        15.5,
        INK,
    )
    y_left -= 14
    paragraph(
        c,
        "Na escola, passou a cantar e tocar e, mais tarde, levou a música para festas, churrascos e encontros.",
        left_x,
        y_left,
        col_w,
        9.2,
        14,
        INK,
    )

    y_right = 390
    y_right = paragraph(
        c,
        "Formado em Sistemas de Informação, trabalhou com tecnologia até decidir seguir o sonho de viver dos palcos.",
        right_x,
        y_right,
        col_w,
        9.2,
        14,
        INK,
    )
    y_right -= 14
    paragraph(
        c,
        "Depois de uma fase de aprendizado em uma dupla sertaneja, iniciou um novo momento em carreira solo.",
        right_x,
        y_right,
        col_w,
        9.2,
        14,
        INK,
    )

    transition_y, transition_h = 40, 205
    crop_image(c, MEDIA / "palco-luzes.jpg", 40, transition_y, PAGE_W - 80, transition_h, 0.5, 0.44)
    c.setFillColor(colors.Color(0.025, 0.02, 0.015, alpha=0.62))
    c.rect(40, transition_y, PAGE_W - 80, transition_h, fill=1, stroke=0)
    c.setFillColor(ORANGE)
    c.rect(40, transition_y, 8, transition_h, fill=1, stroke=0)
    label(c, "Hoje / Carreira solo", 68, transition_y + transition_h - 34, ORANGE)
    c.setFillColor(IVORY)
    c.setFont("Display", 26)
    c.drawString(68, transition_y + transition_h - 72, "EMOÇÃO E ENERGIA")
    paragraph(
        c,
        "Voz, violão e viola caipira em uma apresentação construída para criar proximidade com o público.",
        68,
        transition_y + transition_h - 94,
        PAGE_W * 0.48,
        9.2,
        13.5,
        IVORY,
    )
    page_mark(c, 2, light=False)
    c.showPage()


def draw_show(c):
    c.setFillColor(COFFEE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    vertical_brand_line(c)
    outline_word(c, "O SHOW", 28, PAGE_H - 106, 78, ORANGE, 0.18)
    label(c, "02 / Identidade de palco", 42, PAGE_H - 48, ORANGE)

    image_y = PAGE_H * 0.41
    image_h = PAGE_H * 0.43
    crop_image(c, MEDIA / "palco-voz.jpg", 41, image_y, PAGE_W * 0.28, image_h, 0.5, 0.42)
    crop_image(c, MEDIA / "palco-microfone.jpg", PAGE_W * 0.34, image_y, PAGE_W * 0.34, image_h, 0.48, 0.45)
    crop_image(c, MEDIA / "viola-caipira.jpg", PAGE_W * 0.70, image_y, PAGE_W * 0.25, image_h, 0.5, 0.42)
    c.setFillColor(colors.Color(0.03, 0.02, 0.015, alpha=0.22))
    c.rect(41, image_y, PAGE_W * 0.91, image_h, fill=1, stroke=0)
    orange_corners(c, 41, image_y, PAGE_W * 0.91, image_h, 20)
    icon_badge(c, "microphone", 54, image_y + 14, 30, ORANGE, 14)
    icon_badge(c, "guitar", PAGE_W * 0.34 + 14, image_y + 14, 30, IVORY, 15)
    icon_badge(c, "guitar", PAGE_W * 0.70 + 14, image_y + 14, 30, SAND, 15)

    c.setFillColor(IVORY)
    c.setFont("Display", 34)
    c.drawString(42, 285, "VOZ  ·  VIOLÃO  ·  VIOLA")
    c.setFillColor(ORANGE)
    c.rect(42, 268, 88, 4, fill=1, stroke=0)

    body_w = PAGE_W * 0.54
    y = paragraph(
        c,
        "Anderson alterna entre violão e viola caipira e mantém uma relação próxima com o público por meio da música, da conversa e da interação.",
        42,
        242,
        body_w,
        10.2,
        15.5,
        IVORY,
    )
    y -= 12
    paragraph(
        c,
        "O repertório reúne sucessos atuais, músicas românticas, clássicos e modas sertanejas, transitando naturalmente entre emoção e energia.",
        42,
        y,
        body_w,
        9.2,
        14,
        MIST,
    )

    box_x, box_y, box_w, box_h = PAGE_W * 0.65, 78, PAGE_W * 0.30, 174
    c.setFillColor(ORANGE)
    c.rect(box_x, box_y, box_w, box_h, fill=1, stroke=0)
    icon_badge(c, "guitar", box_x + 18, box_y + box_h - 48, 28, IVORY, 14)
    c.setFillColor(BLACK)
    c.setFont("Display", 20)
    c.drawString(box_x + 56, box_y + box_h - 38, "BANDA")
    c.drawString(box_x + 18, box_y + box_h - 70, "COMPLETA")
    c.setStrokeColor(BLACK)
    c.setLineWidth(2)
    c.line(box_x + 18, box_y + box_h - 83, box_x + 62, box_y + box_h - 83)
    paragraph(
        c,
        "Formação de maior escala para prefeituras, exposições e grandes eventos. Disponibilidade, estrutura e formato são tratados diretamente no contato.",
        box_x + 18,
        box_y + box_h - 101,
        box_w - 36,
        8.4,
        11.8,
        BLACK,
        "SansBold",
    )
    page_mark(c, 3)
    c.showPage()


def draw_trajectory(c):
    c.setFillColor(GRAPHITE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    crop_image(c, MEDIA / "palco-preto-branco.jpg", 0, PAGE_H * 0.44, PAGE_W, PAGE_H * 0.56, 0.5, 0.36)
    c.setFillColor(colors.Color(0.02, 0.02, 0.02, alpha=0.54))
    c.rect(0, PAGE_H * 0.44, PAGE_W, PAGE_H * 0.56, fill=1, stroke=0)
    vertical_brand_line(c)

    label(c, "03 / Trajetória", 42, PAGE_H - 48, ORANGE)
    c.setFillColor(IVORY)
    c.setFont("Display", 36)
    c.drawString(42, PAGE_H - 100, "DOS PALCOS")
    c.setFillColor(ORANGE)
    c.drawString(42, PAGE_H - 143, "DA REGIÃO")
    c.setFillColor(IVORY)
    c.setFont("SerifBold", 28)
    c.drawString(42, PAGE_H - 184, "para novos encontros.")

    body_top = PAGE_H * 0.40
    left_w = PAGE_W * 0.43
    right_x = PAGE_W * 0.54
    y_left = paragraph(
        c,
        "Anderson Junior já se apresentou em exposições, casas noturnas e eventos em cidades como <b>Passos, São João Batista do Glória e Alpinópolis</b>.",
        42,
        body_top,
        left_w,
        9.8,
        15,
        IVORY,
    )
    paragraph(
        c,
        "Em sua trajetória, dividiu o palco com <b>Clayton &amp; Romário, Lucas Reis &amp; Thácio e Diego &amp; Victor Hugo</b>, entre vários outros nomes do sertanejo.",
        right_x,
        body_top,
        PAGE_W - right_x - 42,
        9.8,
        15,
        IVORY,
    )

    c.setFillColor(ORANGE)
    c.rect(0, 0, PAGE_W, 185, fill=1, stroke=0)
    c.setFillColor(BLACK)
    c.setFont("Display", 19)
    c.drawString(42, 148, "CONTATO PARA SHOWS")
    c.setFont("Serif", 9)
    c.drawString(302, 151, "Clique nos canais para acessar")
    c.setStrokeColor(colors.Color(0.05, 0.04, 0.03, alpha=0.25))
    c.setLineWidth(0.8)
    c.line(42, 128, PAGE_W - 42, 128)
    contact_item(c, "whatsapp", "WhatsApp", "+55 35 98409-4626", 42, 90, 230, "https://wa.me/5535984094626")
    contact_item(c, "globe", "Site oficial", "andersonjrcantor.com.br", 302, 90, 250, "https://www.andersonjrcantor.com.br")
    contact_item(c, "instagram", "Instagram", "@andersonjrcantor", 42, 42, 230, "https://www.instagram.com/andersonjrcantor/")
    contact_item(c, "tiktok", "TikTok", "@andersonjrcantor", 302, 42, 250, "https://www.tiktok.com/@andersonjrcantor")
    page_mark(c, 4, light=False)
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
