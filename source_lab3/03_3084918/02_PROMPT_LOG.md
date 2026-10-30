# 02_PROMPT_LOG.md

Use this file if you ask an AI assistant to help with the project. Name the tool, record the request or command, summarise what came back and explain what you kept, changed or rejected. If you did not use an assistant, you do not need to submit this file.

## <time>  <step>2026-10-21 — Step 1: Define the use case and system inputs
Tool used (for example Gemini Student in a browser, an LLM command-line assistant, or none): ChatGPT.

Request or command: Asked ChatGPT to help develop the Week 2 storyboard scenario into an IIS Lab 3 use case, focusing on whether academic paper evidence supports a research claim. Specified that the implementation route would be a Markdown simulation.

What came back: A proposed user goal and system inputs covering the research question, claim, keywords, candidate paper titles, abstracts and available publication metadata. ChatGPT also suggested a scope for the system and a structure for the remaining specification.

What I decided to keep, change or reject, and why: Kept the focus on assessing evidence support rather than only matching paper topics or keywords. Limited the available paper data to titles, abstracts and basic publication metadata, because the lab uses a Markdown simulation rather than a live academic search system. Revised the wording to make clear that the system assesses the information available to it and cannot claim to have verified the full paper.

## <time>  <step>2026-10-21 — Step 2: Design the system path
Tool used: ChatGPT, VS Code Markdown preview and Mermaid Live Editor.

Request or command: Asked ChatGPT to help complete the system processing steps, intended result, fallback strategy and system path diagram for the Markdown simulation.

What came back: A proposed flow from the student's research question and claim through candidate paper information, topical relevance assessment, evidence-support assessment, explanation of limitations and user feedback. The diagram distinguishes simulated steps from the planned evidence-support validation component.

What I decided to keep, change or reject, and why: Kept the distinction between topical relevance and evidence support because a paper can discuss a similar topic without supporting the specific claim. Kept the fallback strategy for missing information and insufficient evidence. Used Mermaid to render the system path diagram. The diagram describes the intended design; it does not demonstrate that the processing components have been implemented.


## <time>  <step>2026-10-21 — Step 3: Design test cases and propose revisions
Tool used: ChatGPT.

Request or command: Asked ChatGPT to help develop a standard input test, a problem input test and a revised version of the problem test for the academic paper recommendation scenario.

What came back: A standard test using a real paper title as supplied test material, and a deliberately fictional problem case in which a paper about library interface preferences is incorrectly recommended for research on AI uncertainty, trust and reliance. The proposed revision adds an evidence-assessment explanation and a planned check of whether the available title and abstract support the claim.

What I decided to keep, change or reject, and why: Kept the problem case because it illustrates how superficial topic matching can produce a misleading recommendation. Kept the interaction change that explains topical match, evidence checked, remaining uncertainty and possible next actions. Kept the planned system change that requires relevant information before presenting a paper as supporting a claim. Reviewed the test and retest scenarios and their intended reasoning. The outputs remain Markdown simulations: no live academic search, external API, running AI model or user evaluation was performed. The proposed changes therefore demonstrate a design response to the example failure, not measured improvement in a real system.