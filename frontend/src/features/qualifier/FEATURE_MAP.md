# Qualifier Feature Map

## Mounted at

- `/qualifier/[page]` (`src/app/(with-nav)/qualifier/[page]/page.tsx`)
  renders `<QualifierConsole />`. The `[page]` segment is read with
  next/navigation `useParams` and dispatches to one of the three
  steps.

## Component graph

```
QualifierConsole
├── QualifiersProvider          - context + localStorage hydration
├── Stepper                     - step indicator (1 / 2 / 3)
└── Content (page param)
    ├── QualifierPage1          - COP selection
    │   ├── CircleCard          - shared
    │   └── QualifierNav        - sticky bottom nav
    ├── QualifierPage2          - skill evaluation
    │   ├── RadioButtonForm     - skill x experience matrix
    │   ├── ProgressIndicator   - circular progress
    │   └── QualifierNav
    └── QualifierPageCalendar   - weekly availability
        ├── Calendar            - shared/components/Inputs/Calendar
        ├── Dropdown            - timezone picker
        └── QualifierNav
```

## State / context

- `QualifiersContext` exposes `{ copData, selectedCopData, qualifiers,
  updateQualifiers }`. Persists to `localStorage` under the
  `qualifiers` key.
- Hydration happens in a `useEffect`, not at state-init time - SSR
  cannot read `localStorage`. The provider mounts with the default
  qualifiers and promotes any stored value once the client takes over.

## Data

- `data/timezoneData` - static timezone list consumed by the
  `QualifierPageCalendar`'s timezone Dropdown.
- `shared/data/copData` - COP catalog. Shared with `landing`.

## Navigation

- All step transitions use next/navigation `useRouter().push` with
  explicit absolute paths (e.g. `/qualifier/2`). The legacy
  `navigate("../2", { relative: "path" })` form does not exist in the
  App Router.
