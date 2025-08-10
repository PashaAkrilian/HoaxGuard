# **App Name**: HoaxGuard

## Core Features:

- Header Display: Displays a header with the app's icon, title, and tagline, providing context for the app's purpose.
- Tabbed Interface: Presents a tabbed interface for selecting between text and image analysis.
- Text Input: Enables users to input text for analysis using a Textarea component.
- Text Analysis: Analyzes text input to detect misinformation, providing a confidence score and detailed rationale. This feature acts as a tool for AI to search evidence from credible sources.
- Image Input: Allows users to select input method for images: either by providing a URL or uploading a file.
- Image Analysis: Analyzes image inputs to detect misinformation, considering visual context, manipulations, and text within the image.
- Results Display: Presents the analysis results (label, confidence, rationale, references, and optionally OCR text/analyzed image) in a clear card format.

## Style Guidelines:

- Primary color: Blue (#6FCFFF) for trust and reliability, per the user's request.
- Background color: Light blue (#F0F9FF), as requested by the user.
- Accent color: Green (#00FF49) for highlighting important information and actions, matching the user's request.
- Body and headline font: 'Inter' (sans-serif) for a modern and readable design.
- Lucide-react icons for a consistent and clean visual style, including ShieldCheck, FileText, and Image as requested by the user.
- Use ShadCN components for a structured and visually appealing layout, based on the user's request.
- Subtle transitions and animations for user interactions to improve user experience, such as fading in analysis results or smooth tab transitions.