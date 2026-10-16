import AskSeller from '../../03_shared/01_components/AskSeller';

const INITIAL_QUESTIONS = [
  "Which units provide best view from balcony?",
  "Corridor width between flats?",
  "Are there any corner flats currently available?",
  "What is the carpet area vs super built-up area?",
  "What is the expected monthly maintenance cost?"
];

export default function SellerQueries() {
  return <AskSeller initialQuestions={INITIAL_QUESTIONS} />;
}
