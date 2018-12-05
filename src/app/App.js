import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styledNormalize from 'styled-normalize';
import styled, { injectGlobal, css } from 'styled-components';

import MainPage from './pages/MainPage';

injectGlobal`
  ${styledNormalize};
  
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,700');
  
  html {
      height: 100%;
  }
  body, #app {
      min-height: 100%;
      height: 100%;
  }
  
  body {
    font-family: 'Montserrat', sans-serif;
  }
`;

@inject('app')
@observer
export default class App extends Component {
	render() {
		return <MainPage />;
	}
}
