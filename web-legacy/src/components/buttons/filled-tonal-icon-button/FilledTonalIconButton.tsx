import { createComponent } from '@lit/react';
import { MdFilledTonalIconButton } from '@material/web/iconbutton/filled-tonal-icon-button.js';
import React from 'react';

export default createComponent({
  tagName: 'md-filled-tonal-icon-button',
  elementClass: MdFilledTonalIconButton,
  react: React,
  events: {
    onClick: 'click',
  },
});
