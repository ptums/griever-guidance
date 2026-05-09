import { useTemplates } from '@griever/hooks';
import type { SendFlowState, SendFlowActions } from '@griever/hooks';

interface Props {
  flow: SendFlowState & SendFlowActions;
}

export function TemplatePicker({ flow }: Props) {
  const templates = useTemplates();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Griever Guidance
      </h1>
      <p className="text-gray-500 mb-8 text-sm">
        Choose the type of message you would like to send.
      </p>
      <div className="flex flex-col gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => {
              flow.setTemplate(template);
              flow.nextStep();
            }}
            className="w-full text-left border border-gray-200 rounded-lg px-5 py-4 hover:border-[#6B7FD4] hover:bg-indigo-50 transition-colors"
          >
            <div className="font-medium text-gray-900">{template.name}</div>
            <div className="text-sm text-gray-500 mt-1">{template.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
