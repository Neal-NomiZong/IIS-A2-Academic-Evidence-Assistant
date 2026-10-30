# V0.7 Live-mode data and control flow

```mermaid
flowchart TD
    U[Student: research claim and keywords] --> UI[Browser UI - implemented]
    UI -->|GET /api/search?q| B[Local Python backend - implemented]
    B -->|Search query| OA[OpenAlex API - external]
    OA -->|Paper IDs and metadata| B
    B -->|Search results| UI
    UI -->|Selected OpenAlex ID + claim only| B
    B -->|GET paper by validated ID| OA
    OA -->|Fresh abstract| B
    B -->|Claim + abstract| LLM[OpenAI API - real model call]
    LLM -->|Six fields + suggested literal quotes| B
    B --> V[Exact substring quote matching - implemented]
    V -->|Matched / not found + original abstract| UI
    UI --> H[Student checks source / decides - human control]
    H -->|Feedback / rethink claim| U

    SM[Three-case demo assessment - simulated] -.-> UI
    PL[Full-text study verification - not implemented] -.-> B
```

`Matched` means literal substring presence in a freshly retrieved OpenAlex abstract only. No full-text or claim-truth verification is performed. Original demo controls and original storyboards are separate from live mode.
