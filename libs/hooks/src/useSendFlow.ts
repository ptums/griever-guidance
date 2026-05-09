import { useState, useCallback } from 'react';
import type { Template, Contact } from '@griever/shared';

export type SendFlowStep = 'template' | 'details' | 'contacts' | 'confirm' | 'sent';

export interface SendFlowState {
  step: SendFlowStep;
  selectedTemplate: Template | null;
  filledFields: Record<string, string>;
  selectedContacts: Contact[];
}

export interface SendFlowActions {
  setTemplate: (template: Template) => void;
  setField: (key: string, value: string) => void;
  toggleContact: (contact: Contact) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const STEP_ORDER: SendFlowStep[] = ['template', 'details', 'contacts', 'confirm', 'sent'];

const initialState: SendFlowState = {
  step: 'template',
  selectedTemplate: null,
  filledFields: {},
  selectedContacts: [],
};

export function useSendFlow(): SendFlowState & SendFlowActions {
  const [state, setState] = useState<SendFlowState>(initialState);

  const setTemplate = useCallback((template: Template) => {
    setState((s) => ({ ...s, selectedTemplate: template, filledFields: {} }));
  }, []);

  const setField = useCallback((key: string, value: string) => {
    setState((s) => ({ ...s, filledFields: { ...s.filledFields, [key]: value } }));
  }, []);

  const toggleContact = useCallback((contact: Contact) => {
    setState((s) => {
      const exists = s.selectedContacts.some((c) => c.id === contact.id);
      const selectedContacts = exists
        ? s.selectedContacts.filter((c) => c.id !== contact.id)
        : [...s.selectedContacts, { ...contact, selected: true }];
      return { ...s, selectedContacts };
    });
  }, []);

  const nextStep = useCallback(() => {
    setState((s) => {
      const idx = STEP_ORDER.indexOf(s.step);
      const next = STEP_ORDER[idx + 1];
      return next ? { ...s, step: next } : s;
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((s) => {
      const idx = STEP_ORDER.indexOf(s.step);
      const prev = STEP_ORDER[idx - 1];
      return prev ? { ...s, step: prev } : s;
    });
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return { ...state, setTemplate, setField, toggleContact, nextStep, prevStep, reset };
}
