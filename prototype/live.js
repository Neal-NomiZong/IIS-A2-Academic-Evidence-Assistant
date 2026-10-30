'use strict';
(() => {
  const $ = id => document.getElementById(id);
  let papers = [];
  let selected = -1;
  const message = text => { $('live-message').textContent = text; };
  const clear = node => node.replaceChildren();
  const el = (tag, text) => { const node = document.createElement(tag); node.textContent = text; return node; };

  async function api(url, options) {
    const response = await fetch(url, options);
    let data;
    try { data = await response.json(); }
    catch { throw new Error('Backend unavailable or returned invalid JSON. Start python backend/server.py.'); }
    if (!response.ok) throw new Error(data.error || 'Request failed.');
    return data;
  }

  function renderTrace(data) {
    const root = $('live-trace');
    clear(root);
    const source = data.source || {};
    root.append(el('h4', 'Evidence trace — literal abstract match'));
    root.append(el('p', 'A match confirms that the quoted text occurs in the OpenAlex abstract retrieved by the backend. It does NOT verify the scientific conclusion or full text.'));
    root.append(el('p', 'Source: ' + (source.title || 'Untitled')));

    if (typeof source.id === 'string' && /^https:\/\/openalex\.org\/W\d+$/.test(source.id)) {
      const a = el('a', 'OpenAlex record');
      a.href = source.id;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      root.append(a);
    }
    if (typeof source.doi === 'string' && /^https:\/\/doi\.org\//.test(source.doi)) {
      const a = el('a', 'DOI');
      a.href = source.doi;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      root.append(el('span', ' · '), a);
    }

    const trace = data.evidence_trace || [];
    if (!trace.length) {
      root.append(el('p', 'No model-suggested quotation was supplied. No source-text match can be claimed.'));
    }
    trace.forEach((item, index) => {
      const card = el('div', '');
      card.className = 'trace-quote';
      const status = item.status === 'matched_in_abstract' ?
        'MATCHED IN ABSTRACT' : 'NOT FOUND IN ABSTRACT';
      const badge = el('strong', `Quote ${index + 1} — ${status}`);
      badge.className = item.status === 'matched_in_abstract' ? 'trace-matched' : 'trace-unmatched';
      card.append(badge, el('blockquote', item.quote || ''));
      if (item.status !== 'matched_in_abstract') {
        card.append(el('p', 'Do not cite this as a verbatim excerpt. Review the source manually.'));
      }
      root.append(card);
    });

    if (typeof source.abstract === 'string') {
      const details = document.createElement('details');
      details.append(el('summary', 'View exact OpenAlex abstract used for analysis'));
      details.append(el('p', source.abstract));
      root.append(details);
    }
  }

  $('live-search').addEventListener('click', async () => {
    papers = [];
    selected = -1;
    $('live-analyze').disabled = true;
    $('live-assessment').hidden = true;
    clear($('live-results'));
    message('Searching OpenAlex…');
    try {
      const data = await api('/api/search?q=' + encodeURIComponent($('live-query').value));
      papers = data.papers || [];
      message(`${papers.length} result(s). Select one with an abstract.`);
      papers.forEach((paper, index) => {
        const card = el('div', '');
        card.className = 'live-paper';
        card.append(el('strong', paper.title || 'Untitled'));
        card.append(el('p', `${paper.year || 'Year unknown'} · ${(paper.authors || []).join(', ')}`));
        card.append(el('p', paper.abstract ?
          `${paper.abstract.slice(0, 500)}${paper.abstract.length > 500 ? '…' : ''}` :
          'No abstract available — cannot assess support.'));
        if (typeof paper.doi === 'string' && /^https:\/\/doi\.org\//.test(paper.doi)) {
          const a = el('a', 'DOI / source');
          a.href = paper.doi;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          card.append(a);
        }
        const button = el('button', 'Select this paper');
        button.type = 'button';
        button.disabled = !paper.abstract || !/^https:\/\/openalex\.org\/W\d+$/.test(paper.id || '');
        button.addEventListener('click', () => {
          selected = index;
          $('live-analyze').disabled = false;
          $('live-assessment').hidden = true;
          message('Selected: ' + paper.title + ' — ready for abstract-only analysis.');
        });
        card.append(button);
        $('live-results').append(card);
      });
    } catch (error) { message(error.message); }
  });

  $('live-analyze').addEventListener('click', async () => {
    if (selected < 0) return;
    $('live-analyze').disabled = true;
    message('Requesting LLM analysis and checking quotations…');
    $('live-assessment').hidden = true;
    try {
      const data = await api('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the ID, not a client-controlled abstract; backend re-fetches from OpenAlex.
        body: JSON.stringify({ claim: $('live-claim').value, paper_id: papers[selected].id })
      });
      const panel = $('live-analysis-text');
      clear(panel);
      for (const [key, value] of Object.entries(data.analysis || {})) {
        panel.append(el('h4', key.replace(/_/g, ' ')), el('p', value));
      }
      renderTrace(data);
      $('live-assessment').hidden = false;
      const matchCount = (data.evidence_trace || []).filter(x => x.status === 'matched_in_abstract').length;
      message(`Provisional analysis returned. ${matchCount} quotation(s) matched in the OpenAlex abstract; independently check scientific claims.`);
    } catch (error) { message(error.message); }
    finally { $('live-analyze').disabled = selected < 0; }
  });
})();
