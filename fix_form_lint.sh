#!/bin/bash
sed -i -e '31,34d' src/components/FormControls.tsx
sed -i 's/import { generateRandomInsuranceData } from ..\/data\/presets.;//g' src/components/FormControls.tsx
sed -i 's/import { Sparkles, Dices, Shield, RefreshCw, Calendar } from .lucide-react.;/import { Calendar } from "lucide-react";/g' src/components/FormControls.tsx
