import type { Template } from './types.js';

export const funeralAndWake: Template = {
  id: 'funeral-and-wake',
  name: 'Funeral & wake details',
  description: 'Share the time and location of the service and wake.',
  fields: [
    {
      key: 'deceasedName',
      label: 'Full name',
      placeholder: 'e.g. Margaret Ellen Hayes',
      required: true,
    },
    {
      key: 'serviceDate',
      label: 'Service date and time',
      placeholder: 'e.g. Tuesday, June 10 at 11:00 AM',
      required: true,
    },
    {
      key: 'serviceLocation',
      label: 'Service location',
      placeholder: 'e.g. St. Mary\'s Church, 42 Oak St, Boston',
      required: true,
    },
    {
      key: 'wakeTime',
      label: 'Wake time (optional)',
      placeholder: 'e.g. Monday evening from 6–8 PM at Sullivan\'s Funeral Home',
      required: false,
    },
  ],
  renderMessage(fields) {
    const wake = fields['wakeTime']
      ? `\n\nWake: ${fields['wakeTime']}`
      : '';
    return (
      `We wanted to let you know that ${fields['deceasedName']} has passed away. ` +
      `The funeral service will be held on ${fields['serviceDate']} at ${fields['serviceLocation']}.` +
      wake +
      `\n\nThank you for your kindness and support during this time.`
    );
  },
};

export const passingAnnouncement: Template = {
  id: 'passing-announcement',
  name: 'Passing announcement',
  description: 'Let people know of a passing with a brief, personal message.',
  fields: [
    {
      key: 'deceasedName',
      label: 'Full name',
      placeholder: 'e.g. Robert James Callahan',
      required: true,
    },
    {
      key: 'dateOfPassing',
      label: 'Date of passing',
      placeholder: 'e.g. June 7, 2025',
      required: true,
    },
    {
      key: 'briefMessage',
      label: 'Brief personal message (optional)',
      placeholder: 'e.g. He was deeply loved and will be greatly missed.',
      required: false,
    },
  ],
  renderMessage(fields) {
    const message = fields['briefMessage'] ? ` ${fields['briefMessage']}` : '';
    return (
      `We are writing to share the news that ${fields['deceasedName']} passed away on ${fields['dateOfPassing']}.` +
      message +
      `\n\nMore details about services will follow. Thank you for your love and support.`
    );
  },
};

export const celebrationOfLife: Template = {
  id: 'celebration-of-life',
  name: 'Celebration of life',
  description: 'Invite people to celebrate and remember a life well lived.',
  fields: [
    {
      key: 'deceasedName',
      label: 'Full name',
      placeholder: 'e.g. Dorothy Anne Sullivan',
      required: true,
    },
    {
      key: 'eventDate',
      label: 'Event date and time',
      placeholder: 'e.g. Saturday, June 14 at 2:00 PM',
      required: true,
    },
    {
      key: 'eventLocation',
      label: 'Event location',
      placeholder: 'e.g. The Riverside Club, 88 Harbor Rd, Portland',
      required: true,
    },
  ],
  renderMessage(fields) {
    return (
      `You are warmly invited to a Celebration of Life honoring ${fields['deceasedName']}. ` +
      `We will gather on ${fields['eventDate']} at ${fields['eventLocation']} ` +
      `to share memories and celebrate the life she lived.\n\n` +
      `We hope you can join us. Your presence would mean a great deal.`
    );
  },
};

export const templates: Template[] = [
  funeralAndWake,
  passingAnnouncement,
  celebrationOfLife,
];
