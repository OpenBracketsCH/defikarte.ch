import { createComponent } from '@lit/react';
import { MdFilledButton } from '@material/web/button/filled-button';
import React from 'react';

export default createComponent({
  tagName: 'md-filled-button',
  elementClass: MdFilledButton,
  react: React,
  events: {
    onClick: 'click',
  },
});
