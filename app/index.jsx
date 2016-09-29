import React from 'react'
import { render } from 'react-dom'

import './css/main.css'
import Root from './containers/root.jsx'

const root = document.createElement('div')
document.body.appendChild(root)
render(<Root/>, root)


