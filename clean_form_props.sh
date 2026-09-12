#!/bin/bash
sed -i '/showWatermark: boolean;/d' src/components/FormControls.tsx
sed -i '/onToggleWatermark: (val: boolean) => void;/d' src/components/FormControls.tsx
sed -i '/watermarkOpacity: number;/d' src/components/FormControls.tsx
sed -i '/onChangeWatermarkOpacity: (val: number) => void;/d' src/components/FormControls.tsx

sed -i '/showWatermark,/d' src/components/FormControls.tsx
sed -i '/onToggleWatermark,/d' src/components/FormControls.tsx
sed -i '/watermarkOpacity,/d' src/components/FormControls.tsx
sed -i '/onChangeWatermarkOpacity,/d' src/components/FormControls.tsx
