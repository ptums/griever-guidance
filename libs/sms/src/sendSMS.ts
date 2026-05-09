export interface SMSResult {
  success: boolean;
  sid: string;
  error?: string;
}

export type SMSProvider = (to: string, message: string) => Promise<SMSResult>;

const mockProvider: SMSProvider = async (to, message) => {
  console.log(`[SMS] To: ${to}`);
  console.log(`[SMS] Message:\n${message}`);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true, sid: `mock-sid-${Date.now()}` };
};

// Swap this export to a real Twilio provider when credentials are ready.
export const provider: SMSProvider = mockProvider;

export async function sendSMS(to: string, message: string): Promise<SMSResult> {
  return provider(to, message);
}
