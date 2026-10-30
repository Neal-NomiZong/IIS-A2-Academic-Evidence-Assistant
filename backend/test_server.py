"""Offline unit tests: no API key, network calls, or LLM billing required."""
import os
import unittest
from unittest.mock import patch
import server

ABSTRACT = (
    'Showing calibrated uncertainty alone does not ensure users change their reliance. '
    'Presenting uncertainty as frequencies can support appropriate reliance in some circumstances. '
    'Initial user decisions and demographics affect user behaviour in this simulated example.'
)


def inverted(text):
    result = {}
    for pos, token in enumerate(text.split()):
        result.setdefault(token, []).append(pos)
    return result


WORK = {
    'id': 'https://openalex.org/W12345',
    'display_name': 'Test paper',
    'doi': 'https://doi.org/10.1234/example',
    'publication_year': 2024,
    'authorships': [],
    'primary_location': {},
    'abstract_inverted_index': inverted(ABSTRACT)
}


def ai_result(quotes=None, verdict='potential support'):
    return {
        'choices': [{
            'message': {'content': __import__('json').dumps({
                'verdict': verdict,
                'topical_match': 'Related topic.',
                'evidence_basis': 'The abstract suggests a qualified relationship.',
                'limitations': 'Only a specific study context was used.',
                'uncertainty': 'Other tasks have not been checked.',
                'suggested_next_step': 'Read the paper.',
                'evidence_quotes': quotes if quotes is not None else [
                    'Showing calibrated uncertainty alone does not ensure users change their reliance.'
                ]
            })}
        }]
    }


class V07Tests(unittest.TestCase):
    def test_abstract_reconstruction(self):
        self.assertEqual(server.abstract_from_index({'hello': [0], 'world': [1]}), 'hello world')

    def test_no_abstract(self):
        self.assertIsNone(server.abstract_from_index(None))

    def test_invalid_search_query(self):
        with self.assertRaises(ValueError):
            server.search_papers('x')

    def test_search_response(self):
        with patch.object(server, 'fetch_json', return_value={'results': [WORK]}):
            papers = server.search_papers('uncertainty')
        self.assertEqual(papers[0]['abstract'], ABSTRACT)
        self.assertEqual(papers[0]['id'], WORK['id'])

    def test_bad_openalex_id_rejected(self):
        for identifier in ['https://evil.example/W123', 'file:///etc/passwd', 'https://openalex.org/Wabc']:
            with self.assertRaises(ValueError):
                server.get_source_paper(identifier)

    def test_exact_match(self):
        quote = 'Showing calibrated uncertainty alone does not ensure users change their reliance.'
        traces = server.verify_evidence_quotes([quote], ABSTRACT)
        self.assertEqual(traces[0]['status'], 'matched_in_abstract')
        self.assertEqual(ABSTRACT[traces[0]['start']:traces[0]['end']], quote)

    def test_paraphrase_not_verified(self):
        quote = 'Calibrated uncertainty alone never ensures appropriate reliance.'
        traces = server.verify_evidence_quotes([quote], ABSTRACT)
        self.assertEqual(traces[0]['status'], 'not_found_in_abstract')
        self.assertIsNone(traces[0]['start'])

    def test_wrong_case_not_verified(self):
        quote = 'showing calibrated uncertainty alone does not ensure users change their reliance.'
        self.assertEqual(server.verify_evidence_quotes([quote], ABSTRACT)[0]['status'], 'not_found_in_abstract')

    def test_bad_quote_type_rejected(self):
        with self.assertRaises(RuntimeError):
            server.verify_evidence_quotes(['valid evidence quote', 5], ABSTRACT)

    def test_missing_key_no_llm_call(self):
        with patch.object(server, 'get_source_paper', return_value=server.paper_from_openalex(WORK)):
            with patch.dict(os.environ, {'OPENAI_API_KEY': ''}):
                with self.assertRaisesRegex(RuntimeError, 'OPENAI_API_KEY'):
                    server.analyze('This is a sufficiently detailed claim.', WORK['id'])

    def test_live_analysis_uses_backend_fetched_abstract(self):
        calls = []
        def stub(url, headers=None, payload=None):
            calls.append((url, payload))
            if url.startswith('https://api.openalex.org/works/'):
                return WORK
            if url == 'https://api.openai.com/v1/chat/completions':
                return ai_result()
            raise AssertionError('Unexpected URL')
        with patch.object(server, 'fetch_json', side_effect=stub):
            with patch.dict(os.environ, {'OPENAI_API_KEY': 'unit-test-key'}):
                result = server.analyze('Does uncertainty influence reliance?', WORK['id'])
        self.assertEqual(result['evidence_trace'][0]['status'], 'matched_in_abstract')
        self.assertEqual(result['source']['abstract'], ABSTRACT)
        self.assertEqual(len(calls), 2)
        self.assertEqual(calls[0][0], 'https://api.openalex.org/works/W12345')
        self.assertIn('Showing calibrated uncertainty', calls[1][1].decode('utf-8'))

    def test_unmatched_llm_quote_still_displayed_as_unverified(self):
        def stub(url, headers=None, payload=None):
            if 'api.openalex.org' in url:
                return WORK
            return ai_result(['The paper proves absolute certainty increases trust.'])
        with patch.object(server, 'fetch_json', side_effect=stub):
            with patch.dict(os.environ, {'OPENAI_API_KEY': 'unit-test-key'}):
                result = server.analyze('Does uncertainty influence reliance?', WORK['id'])
        self.assertEqual(result['evidence_trace'][0]['status'], 'not_found_in_abstract')
        self.assertEqual(result['analysis']['verdict'], 'potential support')

    def test_unknown_verdict_rejected(self):
        def stub(url, headers=None, payload=None):
            if 'api.openalex.org' in url:
                return WORK
            return ai_result(verdict='scientifically proven')
        with patch.object(server, 'fetch_json', side_effect=stub):
            with patch.dict(os.environ, {'OPENAI_API_KEY': 'unit-test-key'}):
                with self.assertRaisesRegex(RuntimeError, 'unknown verdict'):
                    server.analyze('Does uncertainty influence reliance?', WORK['id'])


if __name__ == '__main__':
    unittest.main()
