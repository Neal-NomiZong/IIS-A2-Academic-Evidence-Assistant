# V0.4 manual test matrix (run in browser)

Status: **NOT YET EXECUTED FOR V0.4**. Student previously reported V0.3's eight manual checks passed; that does not automatically validate this package.

| ID | Steps | Expected result | Actual / Pass / Fail |
|---|---|---|---|
| T01 | Select Test A; Assess | Qualified verdict, test-summary evidence trace, limitations | Pending |
| T02 | Select Test B; Assess | Unsupported verdict, fictional source clearly labelled | Pending |
| T03 | Select Scenario C; Assess | Insufficient-information verdict; missing fields shown | Pending |
| T04 | On A, click Accept | Accepted status and history entry | Pending |
| T05 | On B, type reason; Reject | Rejected status and reason in history | Pending |
| T06 | On C, click Need verification | Needs verification status | Pending |
| T07 | On B, type correction; Report mismatch | Local report recorded; original verdict unchanged | Pending |
| T08 | On B, Exclude; then Restore | Other decision controls disabled then re-enabled | Pending |
| T09 | On A, take action; switch B then A | Assessment hidden on switching; A history available after reassessment | Pending |
| T10 | Reload page | All in-memory histories cleared | Pending |
| T11 | Narrow browser window | Panels and controls remain readable | Pending |
| T12 | Review all cases | No claim of live AI, calibrated confidence, real retrieval or model retraining | Pending |

Evidence suggestion: record browser/version/date, actual outcome and screenshots for T01, T03, T07–T08. Do not label tests passed until personally checked.

## Known scope boundaries
- Input fields are read-only; the prototype only handles predefined fixtures.
- Verdicts and uncertainty wording are manually authored; no model inference occurs.
- Decisions and history live in browser memory and disappear on reload.
- Report mismatch records a note but does not recalculate a verdict.
- Illustrative storyboard SVGs are diagrams, not captured UI screenshots.
