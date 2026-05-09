import { useMockContacts } from '@griever/hooks';
import type { SendFlowState, SendFlowActions } from '@griever/hooks';

interface Props {
  flow: SendFlowState & SendFlowActions;
}

export function ContactSelector({ flow }: Props) {
  const { selectedContacts, toggleContact, nextStep, prevStep } = flow;
  const contacts = useMockContacts();

  const selectedIds = new Set(selectedContacts.map((c) => c.id));

  return (
    <div>
      <button onClick={prevStep} className="text-sm text-gray-400 mb-6 flex items-center gap-1 hover:text-gray-600">
        ← Back
      </button>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Select recipients</h2>
      <p className="text-sm text-gray-400 mb-6">Choose who should receive this message.</p>
      <div className="flex flex-col gap-1 mb-6">
        {contacts.map((contact) => {
          const selected = selectedIds.has(contact.id);
          return (
            <button
              key={contact.id}
              onClick={() => toggleContact(contact)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                selected
                  ? 'border-[#6B7FD4] bg-indigo-50'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                <div className="text-xs text-gray-400">{contact.phoneNumber}</div>
              </div>
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                  selected ? 'bg-[#6B7FD4] border-[#6B7FD4]' : 'border-gray-300'
                }`}
              >
                {selected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {selectedContacts.length === 0
            ? 'No recipients selected'
            : `${selectedContacts.length} recipient${selectedContacts.length === 1 ? '' : 's'} selected`}
        </span>
        <button
          onClick={nextStep}
          disabled={selectedContacts.length === 0}
          className="bg-[#6B7FD4] text-white rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
