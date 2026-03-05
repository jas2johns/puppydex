# Card Color Dropdown Plan

## Goal
Add a footer dropdown (in `app/components/Navbar/index.js`) that lists color choices from `app/dogGroups.js`, and use the selected color as the card background color in `app/components/Card/index.js`.

## Current State
- Card background color is derived per breed group in `getCardColor(breed.breed_group)`.
- Footer component is `Navbar`.
- Main card rendering paths:
  - Search page: `app/page.jsx` -> `app/components/Carousel/index.js` -> `app/components/Card/index.js`
  - Favorites page: `app/favorites/page.jsx` -> `app/components/Card/index.js`

## Implementation Steps
1. Update `app/dogGroups.js` to expose dropdown choices.
- Export a color options list built from the existing color map.
- Keep `getCardColor` intact for fallback behavior.
- Add a helper (or export map) so UI can render user-friendly labels and hex values.

2. Add controlled dropdown UI to `app/components/Navbar/index.js`.
- Add props: `selectedCardColor` and `onCardColorChange`.
- Render a `<select>` with options from `dogGroups.js`.
- Include a default option like `Group default` (empty value) to preserve existing per-group behavior.

3. Lift selected color state into page-level parents.
- In `app/page.jsx`, add `selectedCardColor` state and pass it to both `Navbar` and `Carousel`.
- In `app/favorites/page.jsx`, add the same state and pass it to both `Navbar` and each `BreedCard`.

4. Thread color override through card pipeline.
- In `app/components/Carousel/index.js`, accept `selectedCardColor` prop and pass it to each `BreedCard`.
- In `app/components/Card/index.js`, accept `selectedCardColor` prop.
- Compute effective color as:
  - `selectedCardColor` if set
  - else `getCardColor(breed.breed_group)`

5. Optional styling touch-up.
- If needed, add minimal styles in `Navbar.module.css` so the dropdown matches existing footer layout and remains usable on mobile.

## Behavior Rules
- If no dropdown value is selected, cards use existing group-based color logic.
- If a color is selected, all currently rendered cards use that selected color.
- Selection updates card gradient background and breed group badge background consistently.

## Validation Checklist
- Search page cards change color when footer dropdown changes.
- Favorites page cards change color when footer dropdown changes.
- Resetting to `Group default` restores per-breed-group colors.
- No React console warnings for controlled/uncontrolled `<select>`.
- Existing bookmark actions and card rendering still work.
