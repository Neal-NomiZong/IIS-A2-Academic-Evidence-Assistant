# IIS A2 — Development and inspection record (V0.7)

This file distinguishes actual student-reported tests from design illustrations and pending checks. It can be adapted into the final README and A2 report; do not claim measurements or screenshots not performed.

| Stage | What changed | Student-reported result / limits |
|---|---|---|
| V0.1–V0.4 | Responsive three-case demo, predefined assessments, browser state and local actions | User reported V0.1 three cases, V0.2 five checks, V0.3 eight checks; V0.4 artifacts prepared. Demo assessments remain simulated. |
| V0.5 | Python backend, real OpenAlex search and OpenAI Chat Completions abstract analysis | User reported live search and six LLM fields returned. API debugging revealed a misconfigured one-character key and was corrected. |
| V0.6 | Instructions revised to distinguish claim scope, topical relevance and appropriate reliance | User shared general and absolute-claim regression outputs; verdicts were `potential support` and `potential contradiction`. These outputs do not prove better accuracy. |
| V0.7 | Backend re-fetches OpenAlex work by ID, requests up to three literal quotes, checks exact substring presence, returns trace statuses | User reported 13/13 offline unit tests passed, live LLM analysis displayed all six fields and 3/3 quotations matched. Student also supplied the quotation texts and model result for Cao et al. (2024). |
| Documentation update | Current-system architecture diagram, three storyboards, and browser screenshots | The student opened and checked the SVG diagrams and storyboards, and captured three screenshots from the locally running V0.7 system. |

## User-observed V0.7 trace excerpts (Cao et al., 2024)

1. `showing the calibrated model uncertainty alone is inadequate` — MATCHED IN ABSTRACT.
2. `calibrating model uncertainty and presenting it in a frequency format allow users to adjust their reliance accordingly` — MATCHED IN ABSTRACT.
3. `help reduce the effect of confirmation bias on their decisions` — MATCHED IN ABSTRACT.

The `potential support` output is qualified: *appropriate reliance* need not mean lower reliance across all situations. Exact quote matching validates location in the OpenAlex abstract, not the scientific inference or completeness of the paper.

## Completed documentation checks

- Three real browser screenshots captured and saved in evidence/screenshots/.
- Current system architecture diagram and three storyboards opened successfully in the student's local environment.

## Pending verification

- Re-test the absolute universal claim in V0.7 if its result is used as a V0.7 test.
- Confirm live-mode behaviour when an abstract is unavailable or an API error occurs.
- Re-test Demo-mode feedback and exclusion controls in V0.7.
- Compare the final architecture diagram and storyboards with the implemented code.
- Check screenshot contents and filenames before publishing the GitHub repository.

## Authorship and AI assistance

ChatGPT assisted with project code, tests, UI, diagram/storyboard drafts and writing. The student chose the research direction, ran Windows tests, reported model outputs and evaluated them against source evidence. Record additional personal revisions accurately; do not present AI-generated code or illustrations as entirely independent student work.
