import { MdElevatedButton } from '@material/web/button/elevated-button.js';
import React from 'react';
import { createComponent } from '@lit/react';

export default createComponent({
  tagName: 'md-elevated-button',
  elementClass: MdElevatedButton,
  react: React,
  events: {
    onClick: 'click',
  },
});
