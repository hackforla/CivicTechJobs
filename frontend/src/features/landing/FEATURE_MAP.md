# Landing Feature Map

## Mounted at

- `/` (`src/app/(with-nav)/page.tsx`) renders `<LandingPage />`.

## Component graph

```
LandingPage
├── LandingPageIntro          - hero copy + CTA + mission statement
└── LandingPageCop            - COP cards grid + Dialog modal
    ├── CircleCard            - shared/components/CircleCard
    ├── Dialog                - shared/components/Dialog
    └── LandingPageCopCards   - CopCard, InnerCopCard, InnerCopNavCard
        └── Card              - shared/components/StandardCard
```

## Data

- `shared/data/copData` - COP metadata (titles, descriptions, icons,
  skill lists). Shared with the `qualifier` feature.

## Notes

- `LandingPageIntro` references `/svgs/landing-page-bg.svg` from
  `public/` as a CSS background image; SVGR-imported SVGs cannot be
  used as `url(...)` values, so this file lives outside `src/`.
- `LandingPageCop` is a client component because it owns the dialog
  open/close state and the currently-selected CoP.
