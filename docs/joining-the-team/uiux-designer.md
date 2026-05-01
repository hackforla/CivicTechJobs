# UI/UX Designer

## Starting checklist

1. Review the UI/UX issues on the [Hack for LA project board](https://github.com/orgs/hackforla/projects/37) (filter by `role: ui/ux`) and pick an actionable backlog item.
2. Reach out in `#civictechjobs` about claiming the task. A maintainer will help with current routing.

## Tools and references

- **[Figma file](https://www.figma.com/file/G5bOqhud6azbxyR9El9Ygp/Civic-Tech-Jobs)**: the source of truth for design decisions. Keeping a single source means visual and token decisions don't drift across artifacts. See the developer-side [Design System](../developer/design-system.md) doc for how Figma decisions translate into code.
- **[Software Development Lifecycle diagram](https://drive.google.com/file/d/1emxhYv9N6KuCVrG-gnqkqHdGnjhm_Qvb/view?usp=sharing)**: the generic Hack for LA SDLC. CivicTechJobs follows it with some small variations; ask in Slack about specifics.
- **[WCAG 2.2 accessibility standards](https://www.w3.org/TR/WCAG22/)**: required reading. Designs should meet Level AA out of the gate.

## Working with developers

Designers and developers iterate together. When you hand off a Figma frame, expect questions about responsive behavior, edge cases, and dynamic content. The [Design System doc](../developer/design-system.md) explains the design tokens (colors, typography, spacing) developers consume from Figma. Keep new designs aligned with those tokens whenever possible; the alignment lowers implementation friction for the dev side and keeps the visual language consistent across the app.
