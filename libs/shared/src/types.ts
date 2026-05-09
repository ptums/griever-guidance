export type SendStatus = 'pending' | 'sent' | 'failed';

export interface TemplateField {
  key: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
  renderMessage(fields: Record<string, string>): string;
}

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  selected: boolean;
}

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
}

export interface SendEvent {
  id: string;
  userId: string;
  recipientCount: number;
  templateId: string;
  status: SendStatus;
  createdAt: string;
  deceasedName: string;
  serviceDate: string;
  serviceLocation: string;
  wakeTime?: string;
}
