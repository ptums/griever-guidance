import { useSendFlow } from '@griever/hooks';
import { TemplatePicker } from '../screens/TemplatePicker';
import { DetailsForm } from '../screens/DetailsForm';
import { ContactSelector } from '../screens/ContactSelector';
import { ConfirmScreen } from '../screens/ConfirmScreen';
import { SentScreen } from '../screens/SentScreen';

export function App() {
  const flow = useSendFlow();

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[480px] px-4 py-8">
        {flow.step === 'template' && <TemplatePicker flow={flow} />}
        {flow.step === 'details' && <DetailsForm flow={flow} />}
        {flow.step === 'contacts' && <ContactSelector flow={flow} />}
        {flow.step === 'confirm' && <ConfirmScreen flow={flow} />}
        {flow.step === 'sent' && <SentScreen flow={flow} />}
      </div>
    </div>
  );
}

export default App;
