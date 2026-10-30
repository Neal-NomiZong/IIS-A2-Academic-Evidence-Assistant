# Suggested report captions (edit to match the final report)

- **Figure 1. V0.7 system architecture.** Live mode connects the browser to a local Python server, OpenAlex and OpenAI. The backend re-fetches a paper abstract and checks model-suggested quotations by exact substring matching. Demo-mode decisions are implemented separately in browser memory. Solid arrows show data/control flow.
- **Figure 2. Qualified claim storyboard.** A student retrieves a real paper, requests preliminary abstract-based analysis and checks matched quotations against the source. The student-reported test returned three matched quotations.
- **Figure 3. Over-generalised claim storyboard.** A stronger claim is assessed against the same abstract to explore sensitivity to absolute language. The shown `potential contradiction` reflects a previously observed V0.6 result; V0.7 re-testing is pending.
- **Figure 4. Demo-mode feedback and recovery storyboard.** Separate predefined-case interface demonstrates recording a mismatch, excluding a candidate and restoring it. These are browser-only controls, not actions against live OpenAlex results.

*Screenshot captions (use only after capturing real files):*

- **Figure 5. Real OpenAlex search results displayed in local Live mode.** [Add local browser screenshot.]
- **Figure 6. Abstract-only OpenAI analysis with six structured fields.** [Add local browser screenshot.]
- **Figure 7. Evidence Trace panel showing three literal matches and the backend-retrieved OpenAlex abstract.** [Add local browser screenshot.]
