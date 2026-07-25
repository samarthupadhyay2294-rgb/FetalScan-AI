export const BLOG_POSTS = [
  {
    id: 1,
    title: 'What Is BPD in Fetal Ultrasound?',
    slug: 'what-is-bpd-in-fetal-ultrasound',
    category: 'BPD & OFD',
    excerpt: 'Understand how biparietal diameter (BPD) is measured during routine obstetric ultrasound and why it is critical for tracking gestational age.',
    content: `
### Introduction to Biparietal Diameter (BPD)

Biparietal Diameter (BPD) is one of the foundational biometric parameters evaluated during standard mid-trimester fetal ultrasonography. It measures the transverse width of the fetal head—specifically the maximum distance between the outer borders of the parietal bones across the fetal skull.

> [!NOTE]
> **Key Clinical Point:** BPD measurement is most accurate for gestational age estimation between 14 and 22 weeks of pregnancy, with a variation margin of approximately ±7 to ±10 days.

---

### How BPD Is Measured in the Transthalamic Plane

For accurate biometric measurement, sonographers obtain a standard axial view of the fetal head at the **transthalamic plane**. This anatomical cross-section must visually display:

1. **Midline Falx Cerebri**: An intact linear echo dividing the cerebral hemispheres.
2. **Thalami**: Symmetrical hypoechoic thalamic structures located centrally.
3. **Cavum Septi Pellucidi (CSP)**: An anterior fluid-filled box-like structure.
4. **Absence of Posterior Fossa**: Cerebellum should not be visible in a standard BPD plane.

| Measurement Axis | Anatomical Landmark Origin | Anatomical Landmark Endpoint | Clinical Purpose |
| :--- | :--- | :--- | :--- |
| **BPD (Biparietal)** | Outer Parietal Calvarium | Inner / Outer Opposite Parietal | Transverse head width & GA estimation |
| **OFD (Occipitofrontal)** | Frontal Bone Calvarium | Occipital Bone Calvarium | Longitudinal head length assessment |
| **CI (Cephalic Index)** | BPD / OFD Ratio | Multiplied by 100 | Fetal cranial shape classification |

---

### Clinical Significance & Growth Trajectory

Across normal gestation, BPD increases continuously from approximately 25 mm at 14 weeks to over 90 mm near term. When combined with Head Circumference (HC), Femur Length (FL), and Abdominal Circumference (AC), BPD contributes to calculating the **Estimated Fetal Weight (EFW)** using formulas such as Hadlock.

> [!IMPORTANT]
> **Diagnostic Caveat:** Isolated variations in BPD without associated changes in Head Circumference or anatomical anomalies often reflect normal cranial shape variations (such as dolichocephaly or brachycephaly) rather than growth restriction.
    `,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Eleanor Vance, MD',
    authorRole: 'Senior Perinatal Sonographer',
    date: 'July 24, 2026',
    readingTime: '5 min read',
    featured: true,
    views: 1420,
  },
  {
    id: 2,
    title: 'Understanding OFD: Occipitofrontal Diameter',
    slug: 'understanding-ofd-occipitofrontal-diameter',
    category: 'BPD & OFD',
    excerpt: 'Explore occipitofrontal diameter (OFD) measurements and how longitudinal cranial dimensions complement BPD in assessing fetal head shape.',
    content: `
### What Is Occipitofrontal Diameter (OFD)?

Occipitofrontal Diameter (OFD) measures the maximum anteroposterior length of the fetal skull, extending from the outer margin of the frontal bone to the outer margin of the occipital bone along the longitudinal axis.

While BPD captures transverse head dimension, OFD captures longitudinal length. Together, these two perpendicular axes provide a complete 2D biometric profile of the fetal cranium.

---

### The Role of OFD in Calculating Cephalic Index

OFD is an indispensable component of the **Cephalic Index (CI)**, defined as:

$$\\text{Cephalic Index (CI)} = \\left( \\frac{\\text{BPD}}{\\text{OFD}} \\right) \\times 100$$

When OFD is disproportionately large relative to BPD, the resulting Cephalic Index decreases, indicating a **dolichocephalic** (elongated) cranial morphology. Conversely, a shortened OFD results in a higher CI, pointing toward **brachycephaly**.

---

### Clinical Applications & Ultrasound Standardization

> [!RESEARCH]
> **Research Insight:** Studies demonstrate that measuring both BPD and OFD significantly reduces false-positive microcephaly or macrocephaly diagnoses caused by positional skull compression during third-trimester examinations.

1. **Standard Plane Acquisition**: Calipers are placed from the outer frontal edge to the outer occipital edge.
2. **Head Circumference Derivative**: When HC is calculated using an ellipse model, BPD and OFD serve as the semi-major and semi-minor axes:
   $$\\text{HC} \\approx \\pi \\times \\sqrt{2 \\times \\left( \\left(\\frac{\\text{BPD}}{2}\\right)^2 + \\left(\\frac{\\text{OFD}}{2}\\right)^2 \\right)}$$
    `,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    author: 'FetalScan AI Research Team',
    authorRole: 'Biometrical AI Division',
    date: 'July 22, 2026',
    readingTime: '4 min read',
    featured: false,
    views: 980,
  },
  {
    id: 3,
    title: 'How Is Cephalic Index Calculated?',
    slug: 'how-is-cephalic-index-calculated',
    category: 'Cephalic Index',
    excerpt: 'A comprehensive guide to calculating and evaluating the Cephalic Index (CI) to screen for dolichocephaly and brachycephaly.',
    content: `
### Defining the Cephalic Index (CI)

The **Cephalic Index (CI)** (also known as the Cranial Index) is the ratio of the maximum width of the fetal skull (BPD) to its maximum length (OFD), expressed as a percentage. First introduced into obstetrical practice to evaluate skull shape variations, CI provides a standardized quantitative metric for cranial morphology.

---

### Mathematical Formula & Reference Norms

$$\\text{Cephalic Index (CI)} = \\frac{\\text{Biparietal Diameter (BPD)}}{\\text{Occipitofrontal Diameter (OFD)}} \\times 100$$

In a healthy developing fetus, the standard normative reference range for Cephalic Index is **75% to 85%** (typically centered around a mean of 78% to 80%).

---

### Clinical Classification Categories

- **Dolichocephaly (CI < 75%)**: The fetal head is unusually long and narrow. Often observed in breech presentations, oligohydramnios, or secondary to uterine compression.
- **Mesocephaly / Normal (75% ≤ CI ≤ 85%)**: Standard proportional cranial shape.
- **Brachycephaly (CI > 85%)**: The fetal head is disproportionately broad and short. May be associated with specific genetic syndromes or cranial vault compression.

> [!WARNING]
> **Important Screening Guidance:** An abnormal Cephalic Index does not automatically indicate cranial pathology. In most cases, mild deviations represent physiological variants or transient positional deformation.
    `,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Marcus Thorne',
    authorRole: 'Consultant Perinatal Radiologist',
    date: 'July 20, 2026',
    readingTime: '6 min read',
    featured: false,
    views: 1850,
  },
  {
    id: 4,
    title: 'BPD vs OFD: Understanding Fetal Head Measurements',
    slug: 'bpd-vs-ofd-understanding-fetal-head-measurements',
    category: 'BPD & OFD',
    excerpt: 'Compare Biparietal Diameter and Occipitofrontal Diameter side-by-side to understand how both measurements together yield optimal biometric assessment.',
    content: `
### Comparative Overview: BPD vs. OFD

When evaluating fetal cranial growth during second and third-trimester prenatal scans, clinicians rely on two orthogonal linear dimensions: BPD and OFD.

#### Key Differences Matrix

| Feature | Biparietal Diameter (BPD) | Occipitofrontal Diameter (OFD) |
| :--- | :--- | :--- |
| **Measurement Vector** | Transverse (Side to Side) | Anteroposterior (Front to Back) |
| **Caliper Placement** | Outer parietal to inner/outer parietal | Outer frontal to outer occipital |
| **Primary Clinical Use** | Gestational age & EFW calculation | Cephalic Index & HC estimation |
| **Sensitivity to Compression** | High (e.g. breech posture flattening) | Moderate |

---

### Why Both Measurements Are Needed

Relying exclusively on BPD can lead to inaccurate gestational age estimation if the fetal skull is compressed or unusually shaped. Incorporating OFD allows automated algorithms and clinicians to compute the **Cephalic Index**, adjusting gestational age curves for individual cranial variations.
    `,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Sarah Jenkins',
    authorRole: 'Maternal-Fetal Medicine Specialist',
    date: 'July 18, 2026',
    readingTime: '4 min read',
    featured: false,
    views: 1100,
  },
  {
    id: 5,
    title: 'Understanding Fetal Biometry',
    slug: 'understanding-fetal-biometry',
    category: 'Fetal Growth',
    excerpt: 'An essential overview of fetal biometry metrics including BPD, HC, AC, and FL used across pregnancy trimesters.',
    content: `
### What Is Fetal Biometry?

Fetal biometry refers to the standardized ultrasonic measurement of key fetal anatomical structures. These measurements are used to monitor fetal growth, estimate fetal weight (EFW), confirm gestational age, and detect potential growth restrictions such as Fetal Growth Restriction (FGR).

---

### The Four Core Biometric Parameters

1. **Biparietal Diameter (BPD)**: Transverse skull width across parietal bones.
2. **Head Circumference (HC)**: Elliptical perimeter around the outer cranial skull edge.
3. **Abdominal Circumference (AC)**: Transverse cross-section of the fetal abdomen at the level of the stomach and portal vein confluence.
4. **Femur Length (FL)**: Longitudinal measurement of the ossified femoral diaphysis.

> [!INFO]
> **Growth Monitoring:** Combining all four parameters into composite equations (such as Hadlock 4) yields the highest statistical precision for estimated fetal weight (EFW).
    `,
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
    author: 'FetalScan AI Research Team',
    authorRole: 'Clinical Analytics Division',
    date: 'July 15, 2026',
    readingTime: '5 min read',
    featured: false,
    views: 1320,
  },
  {
    id: 6,
    title: 'How AI Is Transforming Medical Ultrasound',
    slug: 'how-ai-is-transforming-medical-ultrasound',
    category: 'AI in Healthcare',
    excerpt: 'Discover how artificial intelligence and computer vision models are reducing operator dependency and standardizing ultrasound scan interpretations.',
    content: `
### The Challenge of Operator Dependency in Ultrasound

Diagnostic ultrasound is inherently real-time and operator-dependent. Image quality and anatomical plane alignment vary significantly based on sonographer experience, fetal orientation, maternal body habitus, and equipment quality.

---

### How Artificial Intelligence Assists Clinicians

Artificial Intelligence models, particularly convolutional neural networks (CNNs) and vision transformers, bring objectivity and speed to ultrasound workflow:

- **Automated Plane Verification**: Real-time validation that the transducer is capturing the correct anatomical view (e.g., transthalamic vs. transcerebellar plane).
- **Sub-Pixel Landmark Localization**: Instant positioning of measurement calipers at key anatomical points (A, B, C, D).
- **Automated Quality Scoring**: Objective feedback on image clarity and signal-to-noise ratio.
- **Workflow Speedup**: Reducing manual caliper placement time from minutes to under 2 seconds per scan.
    `,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    author: 'Prof. Alan Chen',
    authorRole: 'AI Medical Imaging Lead',
    date: 'July 12, 2026',
    readingTime: '6 min read',
    featured: false,
    views: 2150,
  },
  {
    id: 7,
    title: 'Deep Learning in Medical Image Analysis',
    slug: 'deep-learning-in-medical-image-analysis',
    category: 'Deep Learning',
    excerpt: 'An in-depth technical exploration of neural network architectures designed for medical image segmentation and landmark regression.',
    content: `
### Neural Architectures for Medical Imaging

Medical image analysis presents distinct challenges compared to natural image classification: noisy speckle artifacts in ultrasound, low contrast boundaries, and subtle anatomical variations.

> [!RESEARCH]
> **Deep Learning Benchmark:** High-Resolution Networks (HRNet) maintain high-resolution representations throughout all stages of feature extraction, outperforming traditional U-Net architectures for keypoint detection tasks.

---

### Key AI Techniques in Fetal Ultrasonography

1. **Heatmap Regression**: Predicting 2D Gaussian heatmaps centered at landmark coordinates rather than direct coordinate regression.
2. **Multi-Scale Feature Fusion**: Combining low-level texture features with high-level semantic context.
3. **Robustness Against Speckle Noise**: Data augmentation techniques involving Gaussian blur, contrast adjustments, and speckle noise injection.
    `,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Priya Patel',
    authorRole: 'Machine Learning Scientist',
    date: 'July 10, 2026',
    readingTime: '7 min read',
    featured: false,
    views: 1640,
  },
  {
    id: 8,
    title: 'How HRNet Can Detect Anatomical Landmarks',
    slug: 'how-hrnet-can-detect-anatomical-landmarks',
    category: 'Deep Learning',
    excerpt: 'Learn why High-Resolution Network (HRNet-W32) is superior for pinpointing subtle fetal head landmarks with sub-millimeter precision.',
    content: `
### What Makes HRNet Unique?

Conventional deep neural networks (like ResNet or VGG) progressively downsample feature map resolutions to extract abstract semantic features, then upsample them back in decoder modules. This downsampling process loses fine spatial details essential for micro-metric landmark positioning.

**HRNet (High-Resolution Network)** changes this paradigm by maintaining a high-resolution sub-network parallel stream throughout the entire network architecture.

---

### Application in Fetal Head Landmark Detection

In FetalScan AI, HRNet-W32 is trained on thousands of expert-annotated transthalamic ultrasound images to detect four key landmark heatmaps:

- **Landmarks A & C**: Parietal calvarial bone endpoints for BPD.
- **Landmarks B & D**: Frontal and occipital endpoints for OFD.

Because high spatial resolution is preserved across multiscale fusion modules, caliper positioning achieves sub-millimeter localization accuracy.
    `,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    author: 'FetalScan AI Research Team',
    authorRole: 'Computer Vision Group',
    date: 'July 08, 2026',
    readingTime: '5 min read',
    featured: false,
    views: 1980,
  },
  {
    id: 9,
    title: 'AI-Assisted Fetal Ultrasound Analysis',
    slug: 'ai-assisted-fetal-ultrasound-analysis',
    category: 'AI in Healthcare',
    excerpt: 'How AI decision-support systems assist clinicians, improve scan reproducibility, and reduce screening variability in prenatal clinics.',
    content: `
### Augmenting Clinical Expertise

Artificial Intelligence in fetal ultrasound is designed to augment—not replace—the expertise of obstetrical clinicians and sonographers. By handling repetitive measurement tasks and instant reference lookup, AI frees clinicians to focus on comprehensive diagnostic evaluation.

---

### Key Clinical Benefits

- **Instant Consistency**: Eliminates inter-observer variability between different clinical scans.
- **Automated Screening Alert**: Identifies potential Cephalic Index deviations (Dolichocephaly / Brachycephaly) early in routine examinations.
- **PDF & Digital Archiving**: Generates standardized, structured clinical reports linked to secure patient profiles.
    `,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Michael Chang',
    authorRole: 'Chief of Obstetrical Imaging',
    date: 'July 05, 2026',
    readingTime: '4 min read',
    featured: false,
    views: 1210,
  },
  {
    id: 10,
    title: 'Understanding Ultrasound Image-Based Measurements',
    slug: 'understanding-ultrasound-image-based-measurements',
    category: 'Medical Imaging',
    excerpt: 'Learn how acoustic physics, pixel-to-millimeter scaling, and speed of sound calibration enable accurate 2D ultrasound measurements.',
    content: `
### Physics of Ultrasound Biometrics

Medical ultrasound relies on high-frequency sound waves (typically 3.5 MHz to 7.0 MHz for transabdominal fetal imaging) emitted by transducer piezoelectric crystals.

#### Pixel-to-Millimeter Conversion

Digital ultrasound systems convert acoustic echo time-delays into 2D spatial pixel grids. To calculate physical biometric dimensions (in mm), algorithms utilize the calibrated **pixel-to-millimeter scale ratio** ($\text{scale\\_mm}$):

$$\\text{Distance (mm)} = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\times \\text{scale\\_mm}$$

---

### Ensuring Calibration Accuracy

1. **Acoustic Velocity Standard**: Soft tissue sound velocity is assumed to be $1540\\text{ m/s}$.
2. **Depth & Gain Settings**: Proper depth adjustment ensures accurate spatial resolution across the focal zone.
3. **Caliper Alignment**: Calipers should be perpendicular to the midline falx for valid BPD measurements.
    `,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    author: 'FetalScan AI Research Team',
    authorRole: 'Acoustic Engineering Lead',
    date: 'July 01, 2026',
    readingTime: '5 min read',
    featured: false,
    views: 950,
  },
];
