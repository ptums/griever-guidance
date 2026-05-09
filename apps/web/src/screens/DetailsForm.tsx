import type { SendFlowState, SendFlowActions } from '@griever/hooks';

interface Props {
  flow: SendFlowState & SendFlowActions;
}

export function DetailsForm({ flow }: Props) {
  const { selectedTemplate, filledFields, setField, nextStep, prevStep } = flow;

  if (!selectedTemplate) return null;

  const canProceed = selectedTemplate.fields
    .filter((f) => f.required)
    .every((f) => filledFields[f.key]?.trim());

  return (
    <div>
      <button onClick={prevStep} className="text-sm text-gray-400 mb-6 flex items-center gap-1 hover:text-gray-600">
        ← Back
      </button>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {selectedTemplate.name}
      </h2>
      <div className="flex flex-col gap-5">
        {selectedTemplate.fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {!field.required && (
                <span className="text-gray-400 font-normal ml-1">(optional)</span>
              )}
            </label>
            <input
              type="text"
              value={filledFields[field.key] ?? ''}
              onChange={(e) => setField(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6B7FD4]"
            />
          </div>
        ))}
      </div>
      <button
        onClick={nextStep}
        disabled={!canProceed}
        className="mt-8 w-full bg-[#6B7FD4] text-white rounded-lg py-3 text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
      >
        Continue
      </button>
    </div>
  );
}
