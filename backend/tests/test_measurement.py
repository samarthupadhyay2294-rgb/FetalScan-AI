"""Tests for measurement calculations."""

from backend.utils.calculations import compute_bpd_ofd_pixels, compute_cephalic_index, euclidean_distance


def test_euclidean_distance():
    assert euclidean_distance((0, 0), (3, 4)) == 5.0


def test_compute_bpd_ofd():
    landmarks = {
        "A": [0, 0],
        "B": [0, 10],
        "C": [10, 0],
        "D": [0, 0],
    }
    bpd, ofd = compute_bpd_ofd_pixels(landmarks)
    assert bpd == 10.0
    assert ofd == 10.0


def test_cephalic_index():
    assert compute_cephalic_index(80, 100) == 80.0
