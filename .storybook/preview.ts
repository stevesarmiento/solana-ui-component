import type { Preview } from '@storybook/react';
// If you have global CSS (like Tailwind's base styles), import it here
import '../src/index.css';

const preview: Preview = {
  parameters: {
    // Optional: Actions are used to display data received by event handlers
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Optional: Configure backgrounds for stories
    // backgrounds: {
    //   default: 'light',
    //   values: [
    //     { name: 'light', value: '#ffffff' },
    //     { name: 'dark', value: '#333333' },
    //   ],
    // },
    // Optional: Configure viewports for responsive testing
    // viewport: {
    //   viewports: { ... }, // Define your viewports here
    // },
  },
  // You can add global decorators here if needed
  // decorators: [
  //  (Story) => (
  //    <MyThemeProvider> // Example: Wrap stories in a theme provider
  //      <Story />
  //    </MyThemeProvider>
  //  ),
  // ],
};

export default preview;