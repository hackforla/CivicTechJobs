# Session Feature Map

## Mounted at

- `/login` (`src/app/(auth)/login/page.tsx`) renders `<LoginForm />`.
- `/signup` (`src/app/(auth)/signup/page.tsx`) renders `<SignupForm />`.

The `(auth)` route group's layout supplies the AuthNav header and the
side-illustration panel; the form components only render the form
itself into the right column.

## Component graph

```
LoginForm
├── TextField (email, password)   - shared/components/TextField
└── Link to /signup               - next/link

SignupForm
├── TextField (firstName, lastName, email, password)
└── Link to /login
```

## Form handling

- `react-hook-form` `useForm` per component, with the shape parameterized
  by an `Inputs` type local to each form.
- `TextField` is generic over the form schema, so the field name
  (`id` prop) is type-checked against the `Inputs` shape.
- `noValidate` on the `<form>` element disables browser validation so
  the `react-hook-form` rules are the single source of validation
  truth.

## Notes

- The form `onSubmit` currently logs to console; backend wiring is
  Phase 1 / Stage 1 follow-up work (see docs/developer/backend.md).
