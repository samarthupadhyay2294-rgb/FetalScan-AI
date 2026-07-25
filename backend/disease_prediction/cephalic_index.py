"""Cephalic index analysis."""

from backend.utils.constants import NORMAL_CI_MAX, NORMAL_CI_MIN


def analyze_cephalic_index(ci: float) -> str | None:
    if ci > NORMAL_CI_MAX:
        return "Possible Brachycephaly"
    if ci < NORMAL_CI_MIN:
        return "Possible Dolichocephaly"
    return None
