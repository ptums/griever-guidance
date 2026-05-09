import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTemplates } from '@griever/hooks';
import type { FlowProps } from '../app/App';

export function TemplatePickerScreen({ flow }: FlowProps) {
  const templates = useTemplates();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Griever Guidance</Text>
      <Text style={styles.subtitle}>
        Choose the type of message you would like to send.
      </Text>
      {templates.map((template) => (
        <TouchableOpacity
          key={template.id}
          style={styles.card}
          onPress={() => {
            flow.setTemplate(template);
            flow.nextStep();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.cardTitle}>{template.name}</Text>
          <Text style={styles.cardDescription}>{template.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { padding: 24, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: '600', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#9ca3af', marginBottom: 32 },
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '500', color: '#111827', marginBottom: 4 },
  cardDescription: { fontSize: 14, color: '#6b7280' },
});
