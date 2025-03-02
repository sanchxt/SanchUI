import type { Preview } from '@storybook/react';
import './preview.css';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        { className: 'dark' },
        React.createElement(Story)
      ),
  ],
};

export default preview;
