import type { Contact } from '@griever/shared';

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Patricia Donnelly', phoneNumber: '+16175550101', selected: false },
  { id: '2', name: 'James Callahan', phoneNumber: '+16175550102', selected: false },
  { id: '3', name: 'Susan Moriarty', phoneNumber: '+16175550103', selected: false },
  { id: '4', name: 'Thomas Reilly', phoneNumber: '+16175550104', selected: false },
  { id: '5', name: 'Catherine Brennan', phoneNumber: '+16175550105', selected: false },
  { id: '6', name: 'Michael Flynn', phoneNumber: '+16175550106', selected: false },
  { id: '7', name: 'Anne Gallagher', phoneNumber: '+16175550107', selected: false },
  { id: '8', name: 'Daniel Maguire', phoneNumber: '+16175550108', selected: false },
  { id: '9', name: 'Margaret O\'Brien', phoneNumber: '+16175550109', selected: false },
  { id: '10', name: 'Kevin Sullivan', phoneNumber: '+16175550110', selected: false },
];

export function useMockContacts(): Contact[] {
  return MOCK_CONTACTS;
}
