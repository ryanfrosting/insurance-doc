#!/bin/bash
sed -i 's/import { PRESET_EXACT_CLONE } from/import { generateRandomInsuranceData } from/g' src/App.tsx
sed -i 's/useState<InsuranceCardData>(PRESET_EXACT_CLONE)/useState<InsuranceCardData>(generateRandomInsuranceData())/g' src/App.tsx
