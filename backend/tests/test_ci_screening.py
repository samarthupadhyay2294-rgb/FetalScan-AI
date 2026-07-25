"""Tests for Cephalic Index (CI) analysis and fetal cranial shape screening service."""

from backend.utils.math_utils import calculate_cephalic_index
from backend.services.reference_service import get_reference_range
from backend.services.ci_service import evaluate_cephalic_index


def test_calculate_cephalic_index():
    # BPD = 76.4 mm, OFD = 98.7 mm => CI = (76.4 / 98.7) * 100 = 77.4
    assert calculate_cephalic_index(76.4, 98.7) == 77.4
    assert calculate_cephalic_index(80.0, 100.0) == 80.0
    assert calculate_cephalic_index(70.0, 0.0) == 0.0


def test_reference_range_lookup():
    # Test GA 20 weeks -> expect (74.0, 84.0)
    lower_20, upper_20 = get_reference_range(20)
    assert lower_20 == 74.0
    assert upper_20 == 84.0

    # Test GA 24 weeks -> expect (75.0, 85.0)
    lower_24, upper_24 = get_reference_range(24)
    assert lower_24 == 75.0
    assert upper_24 == 85.0

    # Test bounds clamping (< 12 -> 12, > 40 -> 40)
    lower_min, _ = get_reference_range(5)
    assert lower_min == 70.0  # limit for GA 12

    lower_max, _ = get_reference_range(50)
    assert lower_max == 76.0  # limit for GA 40


def test_normal_head_shape_classification():
    # BPD = 76.4, OFD = 98.7 => CI = 77.4, GA = 24 (Ref 75-85)
    res = evaluate_cephalic_index(76.4, 98.7, gestational_age_weeks=24)
    assert res["ci"] == 77.4
    assert res["classification"] == "Normal"
    assert res["screening_result"] == "Within expected range"
    assert res["badge_status"] == "green"
    assert res["recommendation"] == "Routine fetal follow-up"
    assert "research and screening purposes only" in res["disclaimer"].lower()


def test_dolichocephalic_head_shape_classification():
    # Elongated head: BPD = 65.0, OFD = 100.0 => CI = 65.0, GA = 24 (Ref 75-85)
    res = evaluate_cephalic_index(65.0, 100.0, gestational_age_weeks=24)
    assert res["ci"] == 65.0
    assert res["classification"] == "Dolichocephalic"
    assert res["screening_result"] == "Below expected range"
    assert res["badge_status"] == "red"
    assert res["recommendation"] == "Recommend specialist evaluation."


def test_brachycephalic_head_shape_classification():
    # Rounded head: BPD = 90.0, OFD = 100.0 => CI = 90.0, GA = 24 (Ref 75-85)
    res = evaluate_cephalic_index(90.0, 100.0, gestational_age_weeks=24)
    assert res["ci"] == 90.0
    assert res["classification"] == "Brachycephalic"
    assert res["screening_result"] == "Above expected range"
    assert res["badge_status"] == "red"
    assert res["recommendation"] == "Recommend specialist evaluation."
