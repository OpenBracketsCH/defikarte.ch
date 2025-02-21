import { createComponent } from '@lit/react';
import { MdFilledIconButton } from '@material/web/iconbutton/filled-icon-button.js';
import React from 'react';

export default createComponent({
  tagName: 'md-filled-icon-button',
  elementClass: MdFilledIconButton,
  react: React,
  events: {
    onClick: 'click',
  },
});
