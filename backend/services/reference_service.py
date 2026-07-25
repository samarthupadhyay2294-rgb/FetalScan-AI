"""Gestational age reference range service for Cephalic Index."""

import csv
from pathlib import Path
from functools import lru_cache

REFERENCE_CSV_PATH = Path(__file__).resolve().parent.parent / "models" / "reference_ranges.csv"


@lru_cache(maxsize=1)
def load_reference_table() -> dict[int, tuple[float, float]]:
    """Load reference ranges CSV mapping GA (weeks) to (Lower, Upper) CI limits."""
    table: dict[int, tuple[float, float]] = {}
    if not REFERENCE_CSV_PATH.exists():
        # Fallback default range map if file missing
        for week in range(12, 41):
            table[week] = (74.0, 84.0) if week < 22 else (75.0, 85.0)
        return table

    with open(REFERENCE_CSV_PATH, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                ga = int(float(row["GA"]))
                lower = float(row["Lower"])
                upper = float(row["Upper"])
                table[ga] = (lower, upper)
            except (ValueError, KeyError):
                continue
    return table


def get_reference_range(ga_weeks: int | float | None) -> tuple[float, float]:
    """Retrieve Lower and Upper CI limits for a given Gestational Age in weeks.
    
    Clips GA to available range (12 to 40 weeks). Default GA is 20 if None.
    """
    table = load_reference_table()
    if not table:
        return (75.0, 85.0)

    if ga_weeks is None:
        ga_int = 20
    else:
        ga_int = int(round(ga_weeks))

    min_ga = min(table.keys())
    max_ga = max(table.keys())

    clamped_ga = max(min_ga, min(max_ga, ga_int))
    return table.get(clamped_ga, (75.0, 85.0))


def get_all_reference_ranges() -> list[dict]:
    """Return full reference table as list of dicts for API frontend lookup."""
    table = load_reference_table()
    return [
        {"ga": ga, "lower": limits[0], "upper": limits[1]}
        for ga, limits in sorted(table.items())
    ]
