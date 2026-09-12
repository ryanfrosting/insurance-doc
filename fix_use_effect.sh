#!/bin/bash
sed -i -e '/useEffect(() => {/,/}, \[activeTab, onGenerateAttachment, pdfPreviewUrl\]);/d' src/components/EmailModal.tsx
