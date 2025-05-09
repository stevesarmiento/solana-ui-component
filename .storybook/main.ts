import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Required
  stories: [
    '../src/**/*.mdx', // For documentation files like Configure.mdx
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', // For your story files
  ],
  // Required
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials', // Includes docs, controls, actions, backgrounds, viewport, toolbars
    '@storybook/addon-interactions', // For play functions and testing interactions
    // '@storybook/addon-a11y', // Optional: for accessibility testing in Storybook UI
  ],
  // Required
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Optional
  docs: {
    autodocs: 'tag', // Enables automatic documentation generation for stories with the 'autodocs' tag
  },
  // Optional: For better TypeScript support, especially for props tables
  typescript: {
    check: false, // Set to true for type checking during Storybook build (can slow down startup)
    // checkOptions: {}, // Options for type checking
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // Filter out props from node_modules
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  // Optional: if you serve static assets (e.g. images, fonts) from a public directory
  // staticDirs: ['../public'],
};
export default config;