import AskSeller from '../../03_shared/01_components/AskSeller';

const INITIAL_QUESTIONS = [
  "Are all amenities ready and operational?",
  "Is the clubhouse open for residents currently?",
  "Is there a separate swimming pool for kids and adults?",
  "Are gym and wellness facilities included in maintenance?",
  "What are the operating hours for amenities?"
];

export default function SellerQueries() {
  return <AskSeller initialQuestions={INITIAL_QUESTIONS} />;
}
