import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { createSendEvent } from '@griever/api-client';
import type { FlowProps } from '../app/App';

export function ConfirmScreen({ flow }: FlowProps) {
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={prevStep} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Review your message</Text>
      <Text style={styles.subtitle}>
        This will be sent to {selectedContacts.length}{' '}
        {selectedContacts.length === 1 ? 'person' : 'people'}.
      </Text>
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={[styles.button, sending && styles.buttonDisabled]}
        onPress={handleSend}
        disabled={sending}
        activeOpacity={0.8}
      >
        {sending ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Send messages</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { padding: 24, paddingTop: 60, paddingBottom: 40 },
  backButton: { marginBottom: 24 },
  backText: { fontSize: 14, color: '#9ca3af' },
  title: { fontSize: 20, fontWeight: '600', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#9ca3af', marginBottom: 24 },
  messageBox: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  messageText: { fontSize: 14, color: '#374151', lineHeight: 22 },
  error: { fontSize: 13, color: '#ef4444', marginBottom: 12 },
  button: {
    backgroundColor: '#6B7FD4',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#ffffff', fontSize: 15, fontWeight: '500' },
});
