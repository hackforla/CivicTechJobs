# Credits Feature Map

## Mounted at

- `/credits` (`src/app/(with-nav)/credits/page.tsx`) renders
  `<CreditsPage />`.

## Component graph

```
CreditsPage
├── TopSvg            - decorative top wave (inline SVG)
├── BottomSvg         - decorative bottom wave (inline SVG)
└── Card[]            - one per attribution entry
```

## Data

- `data/creditsIconData` - icon attribution entries (Majesticons set).
- `data/creditsIllustrationData` - illustration attribution entries
  (Storyset).
- Both files export `AssetDatum`, a shared shape with one `Image`
  React component per entry. The `Image` field is rendered directly
  by `Card` instead of going through an `<img src=...>` tag because
  SVGR resolves `.svg` imports to React components.

## Notes

- `CreditsPage` toggles between two data sets via two buttons; this is
  the only stateful surface in the feature, so it is the only `'use
  client'` boundary.
