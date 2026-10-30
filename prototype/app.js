'use strict';
// All assessments are fixed demonstration data. This code does NOT infer support.
const cases = {
 a:{note:'Adapted from Lab 3 Test A. Real paper title; supplied summary is a test fixture.',question:"How does expressing uncertainty in an AI assistant's answer affect users' trust and reliance?",claim:"Expressing uncertainty can reduce users' reliance on an AI system's recommendations.",paper:'“I’m Not Sure, But…”: Examining the Impact of Large Language Models’ Uncertainty Expression on User Reliance and Trust — Kim et al. (2024)',abstract:'Supplied test summary: the study examines how uncertainty expressions in LLM responses relate to user reliance and trust.',verdict:'Potentially relevant; support conditional',topical:'The title and supplied summary address uncertainty expression, user reliance and trust.',evidence:'The supplied title and short test summary indicate a possible connection to the claim; this is not a full-text assessment.',limits:'The supplied summary does not establish effect size, conditions or generalisability. It does not justify saying uncertainty always reduces reliance.',next:'Check the original paper’s methods, results and limitations before citing it as support.',source:'Source: Lab 3 Test A; real title, but response is a simulated test fixture.'},
 b:{note:'Adapted from Lab 3 Test B retest. Fictional paper; demonstrates the revised response, not a working validation model.',question:'How does communicating AI uncertainty affect users’ trust and reliance?',claim:'Communicating AI uncertainty affects users’ trust and reliance on AI recommendations.',paper:'A Study of Student Preferences for Online Library Search Interfaces [FICTIONAL]',abstract:'Fictional excerpt: This study compares students’ preferences for library website navigation, page layout and the organisation of search filters. Participants evaluate alternative interface designs and report their preferences.',verdict:'Support not established',topical:'The supplied excerpt discusses library-interface preferences rather than AI uncertainty, trust or reliance.',evidence:'Only the fictional title and excerpt are available. They provide no explicit evidence for the research claim.',limits:'Absence of support in this excerpt is not evidence that the claim is false. No full paper was checked.',next:'Exclude this candidate from the simulated shortlist or refine the search; the control for doing so is available in the controls below.',source:'Source: Lab 3 Test B revised retest; fictional candidate and simulated response.'},
 c:{note:'New illustrative A2 case, not a previously performed Lab 3 test.',question:'Does communicating uncertainty improve appropriate reliance on AI recommendations?',claim:'Numerical uncertainty displays improve reliance in all tasks.',paper:'Untitled candidate — incomplete record [FICTIONAL]',abstract:'Metadata only: AI uncertainty and decision-making. No abstract, methods or results supplied.',verdict:'Insufficient information',topical:'The metadata shares topic terms with the research claim.',evidence:'No findings, methods or numerical results are supplied.',limits:'There is no basis for assessing whether the claimed effect holds, let alone across all tasks.',next:'Supply an abstract or inspect the original source before making an evidence-support decision.',source:'Source: new illustrative A2 test fixture; not a real publication or live AI output.'}
};
// Provenance is fixture-level, not an assertion that full publications were examined.
const evidenceDetails = {
 a: { excerpt:'the study examines how uncertainty expressions in LLM responses relate to user reliance and trust.', origin:'Supplied test summary (adapted from Lab 3 Test A)', reasoning:'The excerpt identifies the topic, but does not state experimental results. The qualified verdict is a predefined demonstration, not an inference from this excerpt.', uncertainty:'I cannot confirm the strength or direction of the effect from this short summary alone.', missing:'Methods, results, numerical outcomes, and full-text limitations are not included.' },
 b: { excerpt:'This study compares students’ preferences for library website navigation, page layout and the organisation of search filters.', origin:'Fictional excerpt (Lab 3 Test B retest)', reasoning:'This excerpt describes website-interface preferences; it contains no evidence about AI uncertainty or reliance. This mismatch is part of a scripted test.', uncertainty:'Based on the supplied excerpt, I cannot establish support for the AI uncertainty claim.', missing:'No full text or additional findings are available; the candidate is fictional.' },
 c: { excerpt:'AI uncertainty and decision-making.', origin:'Fictional metadata only (new A2 demonstration)', reasoning:'Topic keywords alone do not provide methods or findings. A support judgement would require evidence not present in this record.', uncertainty:'I do not have enough information to assess this claim.', missing:'Abstract, methods, results, and source verification are missing.' }
};
const $=id=>document.getElementById(id);
// User actions update UI state only; they never modify the scripted assessment.
const caseStates = Object.fromEntries(Object.keys(cases).map(key => [key, { decision: null, excluded: false, feedback: '', history: [] }]));
let activeCase = $('case').value;
function currentState(){ return caseStates[activeCase]; }
function renderDecision(){
 const s=currentState();
 $('decision-status').textContent = s.excluded ? 'Candidate excluded from this demonstration shortlist.' : s.decision ? `Current decision: ${s.decision}.` : 'No decision recorded.';
 $('decision-detail').textContent = s.excluded ? 'This is a local shortlist state. The candidate has not been removed from any real database. Restore it to continue.' : 'Your decision does not change the predefined AI assessment. Reports are not transmitted or used to retrain a model.';
 $('restore').hidden = !s.excluded;
 $('exclude').disabled = s.excluded;
 for(const id of ['accept','reject','verify','mismatch']) $(''+id).disabled = s.excluded;
 $('feedback').disabled = s.excluded;
 $('feedback').value = s.feedback;
 const list=$('history'); list.replaceChildren();
 if(!s.history.length){const li=document.createElement('li');li.textContent='No actions yet.';list.append(li);}
 else for(const entry of s.history){const li=document.createElement('li');li.textContent=entry;list.append(li);}
}
function selectCase(){
 activeCase=$('case').value;
 const c=cases[activeCase];$('case-note').textContent=c.note;
 for(const field of ['question','claim','paper','abstract'])$(field).value=c[field];
 $('output').hidden=true;$('placeholder').hidden=false;$('provenance').hidden=true;
 $('decision-panel').hidden=true;
 renderDecision();
}
function assess(){
 const c=cases[activeCase];
 for(const field of ['verdict','topical','evidence','limits','next','source'])$(field).textContent=c[field];
 const d=evidenceDetails[activeCase];
 for(const field of ['excerpt','origin','reasoning','uncertainty','missing'])$(field).textContent=d[field];
 $('provenance').hidden=false;$('placeholder').hidden=true;$('output').hidden=false;
 $('decision-panel').hidden=false;
 renderDecision();
}
function recordAction(action){
 const s=currentState();
 if(s.excluded && action!=='Restore candidate')return;
 s.feedback=$('feedback').value.trim();
 if(action==='Exclude candidate')s.excluded=true;
 else if(action==='Restore candidate')s.excluded=false;
 else if(action==='Accept assessment')s.decision='Accepted';
 else if(action==='Reject assessment')s.decision='Rejected';
 else if(action==='Need verification')s.decision='Needs verification';
 else if(action==='Report mismatch')s.decision='Mismatch reported';
 s.history.push(action+(s.feedback ? ` — note: ${s.feedback}` : ''));
 renderDecision();
}
$('case').addEventListener('change',selectCase);
$('assess').addEventListener('click',assess);
for(const [id,action] of [['accept','Accept assessment'],['reject','Reject assessment'],['verify','Need verification'],['mismatch','Report mismatch'],['exclude','Exclude candidate'],['restore','Restore candidate']]){
 $(id).addEventListener('click',()=>recordAction(action));
}
selectCase();
