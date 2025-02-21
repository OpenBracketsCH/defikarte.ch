import { MdLinearProgress } from '@material/web/progress/linear-progress.js';
import React from 'react';
import { createComponent } from '@lit/react';

export default createComponent({
  tagName: 'md-linear-progress',
  elementClass: MdLinearProgress,
  react: React,
});
