import { useState } from 'react';
import type { SendFlowState, SendFlowActions } from '@griever/hooks';
import { createSendEvent } from '@griever/api-client';

interface Props {
  flow: SendFlowState & SendFlowActions;
}

export function ConfirmScreen({ flow }: Props) {
  const { selectedTemplate, filledFields, selectedContacts, prevStep, nextStep } = flow;
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!selectedTemplate) return null;

  const message = selectedTemplate.renderMessage(filledFields);

  async function handleSend() {
    setSending(true);
    setError(null);
    try {
      await createSendEvent({
        userId: 'anonymous',
        templateId: selectedTemplate!.id,
        contacts: selectedContacts.map((c) => c.phoneNumber),
        fields: filledFields,
      });
      nextStep();
    } catch {
      setError('Something went wrong. Please try again.');
      setSending(false);
    }
  }

  return (
    <div>
      <button onClick={prevStep} className="text-sm text-gray-400 mb-6 flex items-center gap-1 hover:text-gray-600">
        ← Back
      </button>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Review your message</h2>
      <p className="text-sm text-gray-400 mb-6">
        This will be sent to {selectedContacts.length} {selectedContacts.length === 1 ? 'person' : 'people'}.
      </p>
      <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 mb-8">
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{message}</p>
      </div>
      {error && (
        <p className="text-sm text-red-500 mb-4">{error}</p>
      )}
      <button
        onClick={handleSend}
        disabled={sending}
        className="w-full bg-[#6B7FD4] text-white rounded-lg py-3 text-sm font-medium disabled:opacity-60 hover:opacity-90 transition-opacity"
      >
        {sending ? 'Sending...' : 'Send messages'}
      </button>
    </div>
  );
}
