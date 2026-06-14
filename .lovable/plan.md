

## Assessment

All five requested components already exist and are well-implemented with the premium wellness aesthetic:

- **TopNavbar** — sticky glass-morphism header with back button, brand mark, profile link
- **BottomNav** — floating pill-style bar with 4 tabs, backdrop blur, active state highlights
- **LandingPage** — hero with "Start now" CTA, app preview card, 3 trust cards, disclaimer
- **HomePage** — greeting, "Create smoothie" CTA, 4 quick-start cards, 3 suggested recipes
- **CreateFlowPage** — 4-step wizard with step indicator, ingredient search, goal cards, taste pills, child-friendly toggle, result cards

The routing is correctly configured: `/` → LandingPage (no bottom nav), `/app/home` → HomePage (with bottom nav), `/app/create` → CreateFlowPage (no bottom nav via FocusedFlowLayout).

## What needs refinement

The existing implementation is solid but has several areas that should be polished to reach true App Store-level quality:

### 1. LandingPage polish
- Move hardcoded UI strings into the i18n translation system for multilingual readiness
- The app preview card on mobile appears below the hero — on mobile-first, it should feel more integrated (slightly smaller gap, tighter spacing)
- Add a subtle staggered animation delay on trust cards for a premium reveal effect

### 2. HomePage refinements
- The "How it works →" link added previously sits as raw text below the CTA — wrap it properly in the CTA group with consistent alignment
- Remove the emoji icons from QuickCards and replace with minimal abstract icons or simple text-only cards (emojis conflict with the "not playful" directive)
- The `p-4.5` class used on SuggestedRecipeCard is not a standard Tailwind value — fix to `p-4` or `p-5`

### 3. CreateFlowPage refinements
- Remove emoji icons from ingredient pills and goal cards (emojis violate the premium/non-playful rule)
- The checkmark "✓" in StepDot should use an SVG icon instead of a text character for visual consistency
- The `p-4.5` class on ResultCard is non-standard — fix to `p-5`
- Add a "Create another" or "Go home" action on the results step for better flow completion

### 4. TopNavbar
- The `h-4.5 w-4.5` class on the back arrow SVG is non-standard Tailwind — fix to `h-[18px] w-[18px]`

### 5. General consistency
- Ensure all hardcoded English strings use the `t()` translation function
- Verify the `animate-fade-in` keyframe exists in Tailwind config

## Implementation steps

1. **Fix non-standard Tailwind classes** across all 5 files (`p-4.5` → `p-5`, `h-4.5` → `h-[18px]`)
2. **Replace emojis** in HomePage QuickCards and CreateFlowPage GoalCards/SelectPills with text-only or minimal SVG alternatives
3. **Wrap i18n** around remaining hardcoded strings in LandingPage, HomePage, and CreateFlowPage
4. **Add staggered fade-in** on LandingPage trust cards using animation-delay utility classes
5. **Clean up HomePage CTA area** — group "Create smoothie" and "How it works →" in a proper flex row matching LandingPage pattern
6. **Replace text checkmark** in CreateFlowPage StepDot with an inline SVG check icon
7. **Add flow completion CTA** on CreateFlowPage step 4 — "Go to Home" button alongside "Start over"

