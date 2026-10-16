import AskSeller from '../../03_shared/01_components/AskSeller';

const INITIAL_QUESTIONS = [
  "Is the living room size carpet or built-up area?",
  "Can kitchen layout be modified?",
  "Is master bedroom facing open view?",
  "Are balconies included in carpet area?",
  "What fittings are provided in toilets?",
  "Can bedroom 2 be converted into study room?",
  "Is there provision for washing machine?",
  "Are dimensions wall-to-wall or usable space?",
  "Does estimated cost include parking?"
];

export default function SellerQueries() {
  return <AskSeller initialQuestions={INITIAL_QUESTIONS} initiallySelected={false} prependCustom />;
}
