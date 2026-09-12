/**
 * Sanitizes CSS color variables and computed styles in html2canvas cloned document
 * to prevent "Attempting to parse an unsupported color function oklch/oklab" error.
 */
export function sanitizeClonedDocForHtml2Canvas(clonedDoc: Document): void {
  const container = clonedDoc.getElementById('print-sheet-container') || clonedDoc.body;
  if (!container) return;

  // Use a canvas context to convert any oklch/oklab color string to standard hex/rgba
  const dummyCanvas = clonedDoc.createElement('canvas');
  dummyCanvas.width = 1;
  dummyCanvas.height = 1;
  const ctx = dummyCanvas.getContext('2d');

  const oklColorToRgb = (colorStr: string): string => {
    if (!colorStr || typeof colorStr !== 'string' || (!colorStr.includes('oklch') && !colorStr.includes('oklab'))) {
      return colorStr;
    }
    if (!ctx) return '#000000';
    try {
      ctx.fillStyle = '#000000';
      ctx.fillStyle = colorStr;
      const res = ctx.fillStyle;
      if (res && !res.includes('oklch') && !res.includes('oklab')) {
        return res;
      }
    } catch {
      // fallback
    }
    return '#000000';
  };

  const sanitizeValue = (val: string): string => {
    if (!val || typeof val !== 'string' || (!val.includes('oklch') && !val.includes('oklab'))) return val;
    return val.replace(/okl(?:ch|ab)\([^)]+\)/gi, (match) => oklColorToRgb(match));
  };

  // Color properties queried by html2canvas
  const propertiesToFix = [
    'color',
    'backgroundColor',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
    'outlineColor',
    'fill',
    'stroke',
    'textDecorationColor',
    'boxShadow',
  ];

  const elements = [container, ...Array.from(container.querySelectorAll('*'))];
  elements.forEach((node) => {
    const el = node as HTMLElement;
    if (!el.style) return;

    // Reset box-shadow on sheet container so html2canvas doesn't struggle with heavy oklch/oklab shadows
    if (el.id === 'print-sheet-container') {
      el.style.boxShadow = 'none';
    }

    const computed = clonedDoc.defaultView?.getComputedStyle(el);
    if (!computed) return;

    propertiesToFix.forEach((prop) => {
      try {
        const val = computed.getPropertyValue(prop);
        if (val && (val.includes('oklch') || val.includes('oklab'))) {
          const sanitized = sanitizeValue(val);
          el.style.setProperty(prop, sanitized, 'important');
        }
      } catch {
        // ignore
      }
    });

    // Check SVG fill & stroke attributes
    const fillAttr = el.getAttribute('fill');
    if (fillAttr && (fillAttr.includes('oklch') || fillAttr.includes('oklab'))) {
      el.setAttribute('fill', sanitizeValue(fillAttr));
    }
    const strokeAttr = el.getAttribute('stroke');
    if (strokeAttr && (strokeAttr.includes('oklch') || strokeAttr.includes('oklab'))) {
      el.setAttribute('stroke', sanitizeValue(strokeAttr));
    }
  });

  // Also process inline style sheets in cloned document to remove any default oklch/oklab definitions
  try {
    const styleElements = clonedDoc.querySelectorAll('style');
    styleElements.forEach((styleEl) => {
      if (styleEl.textContent) {
        styleEl.textContent = styleEl.textContent
          .replace(/oklab/gi, 'rgb')
          .replace(/oklch/gi, 'rgb')
          .replace(/color-mix/gi, 'rgb');
      }
    });

    const linkElements = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
    linkElements.forEach((linkEl) => {
      const href = linkEl.getAttribute('href');
      if (href) {
        try {
          const originalSheet = Array.from(document.styleSheets).find(s => s.href && s.href.includes(href));
          if (originalSheet) {
            let cssText = '';
            for (let i = 0; i < originalSheet.cssRules.length; i++) {
              cssText += originalSheet.cssRules[i].cssText + '\n';
            }
            cssText = cssText
              .replace(/oklab/gi, 'rgb')
              .replace(/oklch/gi, 'rgb')
              .replace(/color-mix/gi, 'rgb');
            
            const newStyle = clonedDoc.createElement('style');
            newStyle.textContent = cssText;
            linkEl.parentNode?.replaceChild(newStyle, linkEl);
          } else {
            linkEl.remove();
          }
        } catch (err) {
          linkEl.remove();
        }
      }
    });
  } catch {
    // ignore
  }
}
