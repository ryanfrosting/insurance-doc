#!/bin/bash
sed -i 's/let pdfUrl = pdfPreviewUrl;/let pdfUrl = null;/g' src/components/EmailModal.tsx
