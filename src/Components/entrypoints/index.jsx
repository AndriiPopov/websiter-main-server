import React from 'react'

import { hydrate } from 'react-dom'

import Index from '../pages/index'

hydrate(<Index mD={window.__MD__} renderBody={true} />, document.body)
