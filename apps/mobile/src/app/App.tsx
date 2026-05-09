import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSendFlow } from '@griever/hooks';
import { TemplatePickerScreen } from '../screens/TemplatePickerScreen';
import { DetailsFormScreen } from '../screens/DetailsFormScreen';
import { ContactSelectorScreen } from '../screens/ContactSelectorScreen';
import { ConfirmScreen } from '../screens/ConfirmScreen';
import { SentScreen } from '../screens/SentScreen';
import type { SendFlowState, SendFlowActions } from '@griever/hooks';

export type RootStackParamList = {
  TemplatePicker: undefined;
  DetailsForm: undefined;
  ContactSelector: undefined;
  Confirm: undefined;
  Sent: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type FlowProps = { flow: SendFlowState & SendFlowActions };

export const App = () => {
  const flow = useSendFlow();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#ffffff' },
        }}
      >
        {flow.step === 'template' && (
          <Stack.Screen name="TemplatePicker">
            {() => <TemplatePickerScreen flow={flow} />}
          </Stack.Screen>
        )}
        {flow.step === 'details' && (
          <Stack.Screen name="DetailsForm">
            {() => <DetailsFormScreen flow={flow} />}
          </Stack.Screen>
        )}
        {flow.step === 'contacts' && (
          <Stack.Screen name="ContactSelector">
            {() => <ContactSelectorScreen flow={flow} />}
          </Stack.Screen>
        )}
        {flow.step === 'confirm' && (
          <Stack.Screen name="Confirm">
            {() => <ConfirmScreen flow={flow} />}
          </Stack.Screen>
        )}
        {flow.step === 'sent' && (
          <Stack.Screen name="Sent">
            {() => <SentScreen flow={flow} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
