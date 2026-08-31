#!/usr/bin/env python3
"""Gera o manual técnico da AR1 Studios em PDF a partir do Markdown mestre."""
from __future__ import annotations

import html
import os
import re
import sys
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

PAGE_W, PAGE_H = A4
BLACK = colors.HexColor("#111315")
GRAPHITE = colors.HexColor("#292D30")
BONE = colors.HexColor("#F2EFE8")
COPPER = colors.HexColor("#B86B45")
MIST = colors.HexColor("#B9C0BF")
PALE = colors.HexColor("#F5F3EE")
WHITE = colors.white

def register_fonts():
    candidates = []
    custom = os.environ.get("AR1_FONT_DIR")
    names = ("LiberationSans-Regular.ttf", "LiberationSans-Bold.ttf", "LiberationSans-Italic.ttf", "LiberationMono-Regular.ttf")
    if custom:
        candidates.append((Path(custom), names))
    if os.name == "nt":
        candidates.append((Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts", ("arial.ttf", "arialbd.ttf", "ariali.ttf", "consola.ttf")))
    for folder in ("/usr/share/fonts/truetype/liberation2", "/usr/share/fonts/truetype/liberation"):
        candidates.append((Path(folder), names))
    for folder, files in candidates:
        if all((folder / name).is_file() for name in files):
            for face, filename in zip(("AR1Sans", "AR1Sans-Bold", "AR1Sans-Italic", "AR1Mono"), files):
                pdfmetrics.registerFont(TTFont(face, str(folder / filename)))
            pdfmetrics.registerFontFamily("AR1Sans", normal="AR1Sans", bold="AR1Sans-Bold", italic="AR1Sans-Italic", boldItalic="AR1Sans-Bold")
            pdfmetrics.registerFontFamily("AR1Mono", normal="AR1Mono", bold="AR1Mono", italic="AR1Mono", boldItalic="AR1Mono")
            return
    raise RuntimeError("Instale Arial/Consolas no Windows ou Liberation no Linux; ou defina AR1_FONT_DIR com fontes Liberation.")


register_fonts()


def safe_code(text: str, style: ParagraphStyle) -> str:
    """Wrap code using actual font metrics without crossing the text frame."""
    width = PAGE_W - 36 * mm - style.leftIndent - style.rightIndent - 8 * mm
    result = []
    for line in text.expandtabs(4).splitlines():
        while line and pdfmetrics.stringWidth(line, style.fontName, style.fontSize) > width:
            length = len(line)
            while length > 1 and pdfmetrics.stringWidth(line[:length], style.fontName, style.fontSize) > width:
                length -= 1
            result.append(line[:length])
            line = "    " + line[length:]
        result.append(line)
    return "\n".join(result)


def metadata(markdown: str, key: str, default: str) -> str:
    match = re.search(r"^\*\*" + re.escape(key) + r":\*\*\s*(.+)$", markdown, re.M)
    return match.group(1).strip() if match else default


class ManualDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name in ("h1", "h2", "h3"):
            title = flowable.getPlainText()
            level = {"h1": 0, "h2": 1, "h3": 2}[flowable.style.name]
            if not hasattr(self, "_last_outline_level"):
                self._last_outline_level = -1
                self._outline_count = 0
            level = min(level, self._last_outline_level + 1)
            key = f"section-{self._outline_count}"
            self._outline_count += 1
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(title, key, level, closed=False)
            self._last_outline_level = level


def styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "cover_brand": ParagraphStyle("cover_brand", parent=base["Normal"], fontName="AR1Sans-Bold", fontSize=16, leading=20, textColor=COPPER, alignment=TA_CENTER, spaceAfter=10 * mm),
        "cover_title": ParagraphStyle("cover_title", parent=base["Title"], fontName="AR1Sans-Bold", fontSize=28, leading=33, textColor=BONE, alignment=TA_CENTER, spaceAfter=7 * mm),
        "cover_sub": ParagraphStyle("cover_sub", parent=base["Normal"], fontName="AR1Sans", fontSize=12, leading=18, textColor=MIST, alignment=TA_CENTER),
        "h1": ParagraphStyle("h1", parent=base["Heading1"], fontName="AR1Sans-Bold", fontSize=19, leading=24, textColor=BLACK, spaceBefore=7 * mm, spaceAfter=3 * mm, keepWithNext=True),
        "h2": ParagraphStyle("h2", parent=base["Heading2"], fontName="AR1Sans-Bold", fontSize=14, leading=18, textColor=COPPER, spaceBefore=5 * mm, spaceAfter=2.5 * mm, keepWithNext=True),
        "h3": ParagraphStyle("h3", parent=base["Heading3"], fontName="AR1Sans-Bold", fontSize=11.5, leading=15, textColor=GRAPHITE, spaceBefore=4 * mm, spaceAfter=2 * mm, keepWithNext=True),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName="AR1Sans", fontSize=9.3, leading=14, textColor=GRAPHITE, spaceAfter=2.7 * mm),
        "bullet": ParagraphStyle("bullet", parent=base["BodyText"], fontName="AR1Sans", fontSize=9.3, leading=14, leftIndent=6 * mm, firstLineIndent=-4 * mm, textColor=GRAPHITE, spaceAfter=1.2 * mm),
        "code": ParagraphStyle("code", parent=base["Code"], fontName="AR1Mono", fontSize=7.7, leading=10.5, leftIndent=3 * mm, rightIndent=3 * mm, textColor=BLACK, backColor=PALE, borderColor=colors.HexColor("#C8C4BB"), borderWidth=0.5, borderPadding=3 * mm, spaceBefore=1 * mm, spaceAfter=3 * mm),
        "th": ParagraphStyle("th", parent=base["BodyText"], fontName="AR1Sans-Bold", fontSize=7.6, leading=10, textColor=BONE),
        "td": ParagraphStyle("td", parent=base["BodyText"], fontName="AR1Sans", fontSize=7.5, leading=10, textColor=GRAPHITE),
        "meta": ParagraphStyle("meta", parent=base["BodyText"], fontName="AR1Sans", fontSize=8.5, leading=12, textColor=GRAPHITE, spaceAfter=1.5 * mm),
    }


def inline(text: str) -> str:
    value = html.escape(text, quote=False)
    value = re.sub(r"`([^`]+)`", r'<font name="AR1Mono">\1</font>', value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"\[([^]]+)\]\(([^)]+)\)", r'<link href="\2" color="#B86B45">\1</link>', value)
    return value


def page_decoration(canvas, doc):
    canvas.saveState()
    if doc.page == 1:
        canvas.setFillColor(BLACK)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        canvas.setStrokeColor(COPPER)
        canvas.setLineWidth(2)
        canvas.line(18 * mm, 16 * mm, PAGE_W - 18 * mm, 16 * mm)
    else:
        canvas.setStrokeColor(colors.HexColor("#D7D3CA"))
        canvas.setLineWidth(0.5)
        canvas.line(18 * mm, PAGE_H - 14 * mm, PAGE_W - 18 * mm, PAGE_H - 14 * mm)
        canvas.setFont("AR1Sans-Bold", 7.5)
        canvas.setFillColor(COPPER)
        canvas.drawString(18 * mm, PAGE_H - 10.5 * mm, "AR1 STUDIOS")
        canvas.setFont("AR1Sans", 7.5)
        canvas.setFillColor(colors.HexColor("#777D7D"))
        canvas.drawRightString(PAGE_W - 18 * mm, PAGE_H - 10.5 * mm, "DOCUMENTAÇÃO TOTAL DO SITE")
        canvas.drawString(18 * mm, 11 * mm, "Uso interno e operacional")
        canvas.drawRightString(PAGE_W - 18 * mm, 11 * mm, f"Página {doc.page}")
    canvas.restoreState()


def table_from(lines: list[str], s: dict[str, ParagraphStyle]) -> Table:
    rows: list[list[str]] = []
    for line in lines:
        if re.fullmatch(r"[\s|:\-]+", line):
            continue
        rows.append([cell.strip() for cell in line.strip().strip("|").split("|")])
    cols = max(len(row) for row in rows)
    rows = [row + [""] * (cols - len(row)) for row in rows]
    available = PAGE_W - 36 * mm
    widths = [available / cols] * cols
    data = []
    for index, row in enumerate(rows):
        style = s["th"] if index == 0 else s["td"]
        data.append([Paragraph(inline(cell), style) for cell in row])
    table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GRAPHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, PALE]),
        ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#C8C4BB")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1.8 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.8 * mm),
    ]))
    return table


def build_story(markdown: str, s: dict[str, ParagraphStyle]):
    story = [
        Spacer(1, 42 * mm),
        Paragraph("AR1 STUDIOS", s["cover_brand"]),
        Paragraph("Documentação Total do Site", s["cover_title"]),
        HRFlowable(width="38%", thickness=2, color=COPPER, spaceBefore=2 * mm, spaceAfter=8 * mm),
        Paragraph("Arquitetura, programação, lógica, conteúdo, implantação, manutenção e protocolo para pessoas e IAs", s["cover_sub"]),
        Spacer(1, 46 * mm),
        Paragraph(inline("Versão " + metadata(markdown, "Versão do documento", "não informada") + " | " + metadata(markdown, "Data de consolidação", "data não informada")), s["cover_sub"]),
        Paragraph("Repositório: github.com/alessandrocerranomoreira-sobi/ar1studios-site", s["cover_sub"]),
        PageBreak(),
    ]

    lines = markdown.splitlines()
    index = 0
    in_frontmatter = False
    while index < len(lines):
        line = lines[index]
        stripped = line.strip()

        if index == 0 and stripped.startswith("# "):
            index += 1
            continue

        if stripped.startswith("```"):
            language = stripped[3:].strip()
            block = []
            index += 1
            while index < len(lines) and not lines[index].strip().startswith("```"):
                block.append(lines[index])
                index += 1
            label = f"[{language}]\n" if language else ""
            story.append(Preformatted(safe_code(label + "\n".join(block), s["code"]), s["code"]))
            index += 1
            continue

        if "|" in line and index + 1 < len(lines) and re.fullmatch(r"[\s|:\-]+", lines[index + 1]):
            table_lines = []
            while index < len(lines) and "|" in lines[index]:
                table_lines.append(lines[index])
                index += 1
            story.extend([table_from(table_lines, s), Spacer(1, 3 * mm)])
            continue

        heading = re.match(r"^(#{1,4})\s+(.+)$", line)
        if heading:
            level = len(heading.group(1))
            key = f"h{max(1, min(level - 1, 3))}"
            content = inline(heading.group(2))
            story.append(Paragraph(content, s[key]))
            index += 1
            while index < len(lines) and not lines[index].strip():
                index += 1
            continue

        if re.fullmatch(r"(-{3,}|_{3,}|\*{3,})", stripped):
            story.append(HRFlowable(width="100%", thickness=0.7, color=colors.HexColor("#D7D3CA"), spaceBefore=2 * mm, spaceAfter=3 * mm))
            index += 1
            continue

        bullet = re.match(r"^[-*+]\s+(.+)$", line)
        numbered = re.match(r"^(\d+)\.\s+(.+)$", line)
        if bullet:
            story.append(Paragraph("• " + inline(bullet.group(1)), s["bullet"]))
            index += 1
            continue
        if numbered:
            story.append(Paragraph(f"{numbered.group(1)}. " + inline(numbered.group(2)), s["bullet"]))
            index += 1
            continue

        if not stripped:
            story.append(Spacer(1, 1.3 * mm))
            index += 1
            continue

        paragraph = [line]
        index += 1
        while index < len(lines):
            next_line = lines[index]
            next_stripped = next_line.strip()
            if not next_stripped or re.match(r"^(#{1,4})\s+", next_line) or next_stripped.startswith("```") or re.match(r"^[-*+]\s+", next_line) or re.match(r"^\d+\.\s+", next_line) or "|" in next_line or re.fullmatch(r"(-{3,}|_{3,}|\*{3,})", next_stripped):
                break
            paragraph.append(next_line)
            index += 1
        story.append(Paragraph(inline(" ".join(paragraph)), s["body"]))

    return story


def generate(source: Path, destination: Path):
    destination.parent.mkdir(parents=True, exist_ok=True)
    markdown = source.read_text(encoding="utf-8").replace("\u2011", "-").replace("\u2013", "-").replace("\u2014", "-")
    doc = ManualDocTemplate(
        str(destination),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=20 * mm,
        bottomMargin=18 * mm,
        title="AR1 Studios: Documentação Total do Site",
        author="AR1 Studios",
        subject="Manual técnico e operacional do site",
    )
    doc.build(build_story(markdown, styles()), onFirstPage=page_decoration, onLaterPages=page_decoration)
    print(f"PDF gerado: {destination}")


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "DOCUMENTACAO_TOTAL_AR1_STUDIOS.md"
    destination = Path(sys.argv[2]) if len(sys.argv) > 2 else root / "docs" / "AR1_STUDIOS_Documentacao_Total_do_Site.pdf"
    generate(source, destination)
