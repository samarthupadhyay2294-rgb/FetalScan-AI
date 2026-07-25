"""PDF report generation for Fetal Head Shape and Cephalic Index Screening."""

import json
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path

import qrcode
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Image as RLImage
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

from backend.config import get_settings
from backend.services.ci_service import CLINICAL_DISCLAIMER


def _make_qr(data: str) -> BytesIO:
    qr = qrcode.make(data)
    buf = BytesIO()
    qr.save(buf, format="PNG")
    buf.seek(0)
    return buf


def generate_pdf_report(
    report_id: int,
    patient_id: str | None,
    result: dict,
    original_path: Path,
    annotated_path: Path,
    output_path: Path,
) -> Path:
    """Generate structured PDF screening report."""
    settings = get_settings()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(str(output_path), pagesize=A4, topMargin=0.5 * inch, bottomMargin=0.5 * inch)
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "Title", parent=styles["Heading1"], fontSize=18, textColor=colors.HexColor("#1E3A8A")
    )
    subtitle_style = ParagraphStyle(
        "Subtitle", parent=styles["Heading2"], fontSize=14, textColor=colors.HexColor("#2563EB")
    )
    normal_style = styles["Normal"]

    story = []

    # Hospital / Clinic Header
    story.append(Paragraph(settings.hospital_name, title_style))
    story.append(Paragraph(settings.hospital_address, normal_style))
    story.append(Spacer(1, 0.15 * inch))
    story.append(Paragraph("<b>Fetal Cranial Shape & Cephalic Index Screening Report</b>", subtitle_style))
    story.append(Spacer(1, 0.1 * inch))

    # Patient & Scan Info Table
    meta = [
        ["Report ID", str(report_id)],
        ["Patient ID", patient_id or "N/A"],
        ["Date", datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")],
        ["Gestational Age", f"{result.get('ga', result.get('gestational_age_weeks', 'N/A'))} weeks"],
        ["Landmark Confidence", f"{result.get('confidence', 95.0)}%"],
    ]
    t = Table(meta, colWidths=[2 * inch, 4 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#F1F5F9")),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.15 * inch))

    # Measurements & CI Screening Table
    bpd_val = result.get("bpd", result.get("measurements", {}).get("bpd_mm", "N/A"))
    ofd_val = result.get("ofd", result.get("measurements", {}).get("ofd_mm", "N/A"))
    ci_val = result.get("ci", result.get("measurements", {}).get("cephalic_index", "N/A"))
    ref_lower = result.get("reference_lower", 75)
    ref_upper = result.get("reference_upper", 85)
    ref_range = f"{ref_lower}–{ref_upper}"
    classification = result.get("classification", "Normal")

    measurements = [
        ["Parameter", "Value", "Reference Range / Status"],
        ["BPD (Biparietal Diameter)", f"{bpd_val} mm", "—"],
        ["OFD (Occipitofrontal Diameter)", f"{ofd_val} mm", "—"],
        ["Calculated Cephalic Index (CI)", f"{ci_val}", f"{ref_range} (Normal Range)"],
        ["Classification", classification, result.get("screening_result", "Within expected range")],
    ]
    mt = Table(measurements, colWidths=[2.5 * inch, 1.8 * inch, 2.2 * inch])
    mt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1E40AF")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ]))
    story.append(mt)
    story.append(Spacer(1, 0.15 * inch))

    # Ultrasound Images
    img_tables = []
    if original_path.exists():
        img_tables.append(Paragraph("<b>Original Scan</b>", styles["Heading4"]))
    if annotated_path.exists():
        img_tables.append(Paragraph("<b>Annotated Landmarks</b>", styles["Heading4"]))

    if original_path.exists() and annotated_path.exists():
        img_row = [
            RLImage(str(original_path), width=3.1 * inch, height=2.3 * inch),
            RLImage(str(annotated_path), width=3.1 * inch, height=2.3 * inch),
        ]
        it = Table([img_row], colWidths=[3.2 * inch, 3.2 * inch])
        story.append(it)
        story.append(Spacer(1, 0.15 * inch))

    # Clinical Interpretation
    story.append(Paragraph("<b>Screening Interpretation</b>", styles["Heading3"]))
    story.append(Paragraph(result.get("interpretation", "Cephalic Index is within the expected reference range."), normal_style))
    story.append(Spacer(1, 0.1 * inch))

    # Recommendation
    story.append(Paragraph("<b>Recommendation</b>", styles["Heading3"]))
    story.append(Paragraph(f"• {result.get('recommendation', 'Routine fetal follow-up.')}", normal_style))
    story.append(Spacer(1, 0.15 * inch))

    # Doctor Notes & Signature Block
    story.append(Paragraph("<b>Clinician Notes</b>", styles["Heading4"]))
    story.append(Paragraph("______________________________________________________________________", normal_style))
    story.append(Spacer(1, 0.2 * inch))

    # QR Code & Disclaimer
    qr_data = json.dumps({"report_id": report_id, "patient_id": patient_id, "ci": ci_val, "classification": classification})
    story.append(RLImage(_make_qr(qr_data), width=0.8 * inch, height=0.8 * inch))
    story.append(Spacer(1, 0.1 * inch))
    
    disclaimer_style = ParagraphStyle("Disclaimer", parent=normal_style, fontSize=8, textColor=colors.HexColor("#475569"))
    story.append(Paragraph(f"<b>Notice:</b> <i>{CLINICAL_DISCLAIMER}</i>", disclaimer_style))

    doc.build(story)
    return output_path
