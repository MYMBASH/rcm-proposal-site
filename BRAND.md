# DigiMind Brand Guidelines

## Logo
The DigiMind logo consists of:
- A stylized "D" shape with two elements:
  - A solid rectangular left stroke
  - A curved right arc with a gradient
- The wordmark "DigiMind" in bold font

## Color Palette (extracted from logo)

| Name | Hex | Usage |
|------|-----|-------|
| Brand Blue (Primary) | `#1B3FAB` | Text, solid elements, navbar, CTA buttons |
| Brand Blue Mid | `#2563EB` | Gradient start, hover states |
| Brand Teal | `#0EA5E9` | Gradient midpoint, accents |
| Brand Mint | `#34D399` | Gradient end, success states, highlights |
| Brand Emerald | `#059669` | Secondary color (registered in digimind.sa SEO), badges |
| Brand Dark | `#0F172A` | Body text, headings |
| Brand Gray | `#64748B` | Secondary text, labels |
| Brand Light | `#F8FAFC` | Section backgrounds |

## Logo Gradient
The D-curve uses a linear gradient (top → bottom):
```
#2563EB → #0EA5E9 → #34D399
```

## Typography
- **Arabic**: Tajawal (Google Fonts) — weights: 300, 400, 500, 700, 800
- **English**: Inter (Google Fonts) — weights: 300, 400, 500, 600, 700, 800

## Tailwind Config Reference
All colors are registered in `tailwind.config.ts` under the `brand` key:
```ts
brand: {
  blue:       '#1B3FAB',
  'blue-mid': '#2563EB',
  teal:       '#0EA5E9',
  mint:       '#34D399',
  emerald:    '#059669',
  dark:       '#0F172A',
  gray:       '#64748B',
  light:      '#F8FAFC',
}
```

## Gradient Utility
Use `bg-brand-gradient` in Tailwind for the official DigiMind gradient:
```
linear-gradient(135deg, #1B3FAB 0%, #2563EB 30%, #0EA5E9 65%, #34D399 100%)
```

## Usage Rules
- **Never** use hardcoded color values — always use Tailwind brand tokens
- The gradient is used for primary CTAs, icons, section accents
- The solid blue `#1B3FAB` is the authoritative brand color for logos and text
- Maintain sufficient contrast: use white text on brand-blue backgrounds (contrast ratio ≥ 4.5:1)
