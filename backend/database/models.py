"""SQLAlchemy database models."""

from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Float, Integer, String, Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class PredictionRecord(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(String(64), nullable=True, index=True)
    image_path = Column(String(512), nullable=False)
    annotated_path = Column(String(512), nullable=True)
    pdf_path = Column(String(512), nullable=True)

    bpd_mm = Column(Float, nullable=False)
    ofd_mm = Column(Float, nullable=False)
    bpd_pixels = Column(Float, nullable=True)
    ofd_pixels = Column(Float, nullable=True)
    cephalic_index = Column(Float, nullable=True)
    confidence = Column(Float, nullable=False)
    gestational_age = Column(Float, nullable=True)

    disease = Column(String(128), nullable=False)
    risk_level = Column(String(32), nullable=False)
    risk_percentage = Column(Float, nullable=False)

    landmarks_json = Column(Text, nullable=True)
    prediction_json = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
