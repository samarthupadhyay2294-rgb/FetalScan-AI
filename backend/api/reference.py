"""Reference range lookup endpoint for Cephalic Index."""

from fastapi import APIRouter
from backend.services.reference_service import get_all_reference_ranges, get_reference_range

router = APIRouter(prefix="/reference", tags=["Reference Ranges"])


@router.get("/ci")
def get_ci_reference_table():
    """Return full gestational age reference range table for Cephalic Index."""
    ranges = get_all_reference_ranges()
    return {"success": True, "data": ranges}


@router.get("/ci/{ga}")
def get_ci_reference_for_ga(ga: float):
    """Return lower and upper CI reference range for a specific gestational age."""
    lower, upper = get_reference_range(ga)
    return {
        "success": True,
        "data": {
            "ga": ga,
            "lower": lower,
            "upper": upper,
            "reference_range_str": f"{int(lower)}–{int(upper)}",
        },
    }
