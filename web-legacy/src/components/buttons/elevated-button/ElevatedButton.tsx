import { createComponent } from '@lit/react';
import { MdElevatedButton } from '@material/web/button/elevated-button.js';
import React from 'react';

export default createComponent({
  tagName: 'md-elevated-button',
  elementClass: MdElevatedButton,
  react: React,
  events: {
    onClick: 'click',
  },
});
