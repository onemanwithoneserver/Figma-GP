import { useState } from 'react';
import PaymentTabNav from './PaymentTabNav';
import { TransitionPanel } from '../../03_shared/04_motion/TransitionPanel';
import BankingPartners from './BankingPartners';
import Cost from './Cost';
import Offers from './Offers';
import PaymentSchedule from './PaymentSchedule';
import Sellers from './Sellers';

const TABS = [
  { id: 'offers', label: 'Offers' },
  { id: 'cost', label: 'Cost' },
  { id: 'sellers', label: 'Sellers' },
  { id: 'banking', label: 'Banking' },
  { id: 'schedule', label: 'Schedule' },
];

export default function PaymentPlan() {
  const [activeTab, setActiveTab] = useState('cost');
  const renderContent = () => {
    switch (activeTab) {
      case 'offers': return <Offers />;
      case 'sellers': return <Sellers />;
      case 'banking': return <BankingPartners />;
      case 'schedule': return <PaymentSchedule />;
      default: return <Cost />;
    }
  };

  return (
    <div className="w-full bg-white">
      <PaymentTabNav tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
      <TransitionPanel transitionKey={activeTab} id={`payment-panel-${activeTab}`} role="tabpanel" aria-labelledby={`payment-tab-${activeTab}`}
        className={`bg-white overflow-hidden${['cost', 'schedule'].includes(activeTab) ? ' min-h-[320px]' : ''}`}>
        {renderContent()}
      </TransitionPanel>
    </div>
  );
}
