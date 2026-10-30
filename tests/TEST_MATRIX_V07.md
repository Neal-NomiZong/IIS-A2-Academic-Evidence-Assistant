# V0.7 Test Matrix — Evidence Trace

**Legend:** LOCAL PASS (student report) is based on the student's Windows tests communicated during the project; PACKAGE PASS indicates development-environment checks. PENDING requires additional evidence. Three student-captured browser screenshots have been added to evidence/screenshots/.

| ID | Test | Expected result | Status |
| --- | --- | --- | --- |
| U01 | Python unit tests (`python -m unittest discover -s backend -p test_server.py -v`) | All 13 cases pass without network/key | LOCAL PASS (student report; also PACKAGE PASS) |
| U02 | JavaScript syntax (`node --check prototype/live.js`) | No syntax errors | LOCAL PASS (student report; also PACKAGE PASS) |
| L01 | OpenAlex search (V0.7) | Real paper list returned | LOCAL PASS (student report) |
| L02 | Choose a real paper with abstract | Analyse button enables | LOCAL PASS (student report) |
| L03 | Claim 1: general uncertainty/reliance | Six provisional LLM fields + quote trace | LOCAL PASS (student shared output) |
| L04 | Inspect quote matched flag | Copy quote from panel; exact characters appear in displayed OpenAlex abstract | Three MATCHED statuses reported and screenshot captured; manual character-by-character comparison PENDING |
| L05 | Claim 2: universal/absolute version | Re-assessment addresses scope and limits | MANUAL PENDING |
| L06 | All quoted excerpts checked | Unmatched quote, if any, clearly flagged and not labelled as supporting evidence | Three matched in this live run; unmatched-case live test PENDING (mock test passed) |
| L07 | No abstract selected | Analyse not available; no fabricated conclusion | MANUAL PENDING |
| L08 | Demo-mode case selection and local decisions | Original V0.4 controls still work | MANUAL PENDING |
| L09 | Missing API key (optional controlled test) | Clear error and no LLM call | MANUAL PENDING |

**Author review prompts:** Did the model quote exact text? Is a matched quote interpreted faithfully? Does “potential contradiction” indicate actual evidence against the claim, or merely insufficient evidence for a universal statement? Are appropriate reliance and reliance reduction clearly distinguished?

**Test setup:** Python 3.7.7 on the user's Windows PC; package-builder checks may run on a different version, so record the actual local outputs.

**V0.7 student-observed test:** Cao et al. (2024); claim about uncertainty possibly reducing reliance; returned `potential support`, six fields, and three `MATCHED IN ABSTRACT` quotes. This is one positive case, not accuracy benchmarking. See `evidence/DEVELOPMENT_RECORD_V07.md`.
