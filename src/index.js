import React from 'react'
import { render } from 'react-dom'
import Router from "./components/Router"
import './css/style.css'

// 交納./components/Router，係 html 搵 main id
render(<Router />, document.querySelector('#main'))  