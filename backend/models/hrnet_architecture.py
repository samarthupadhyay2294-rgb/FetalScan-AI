"""HRNet landmark model architecture (matches dl_model.ipynb)."""

import torch
import torch.nn as nn
import timm


class SimpleHRNetLandmark(nn.Module):
    """HRNet-W32 backbone with 1x1 conv head for 4 landmark heatmaps."""

    def __init__(self, num_landmarks: int = 4, pretrained: bool = False):
        super().__init__()
        try:
            self.backbone = timm.create_model(
                "hrnet_w32", pretrained=pretrained, features_only=True
            )
        except Exception:
            self.backbone = timm.create_model(
                "hrnet_w32", pretrained=False, features_only=True
            )

        high_res_channels = self.backbone.feature_info.channels()[1]
        self.head = nn.Conv2d(high_res_channels, num_landmarks, kernel_size=1)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        features = self.backbone(x)
        high_res_feature = features[1]
        return self.head(high_res_feature)
