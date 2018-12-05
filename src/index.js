import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';

import App from 'app/App';
import { history } from 'app/stores/routerStore';
import stores from 'app/stores/index';

const renderApp = Component => {
	render(
		<AppContainer>
			<Router history={history}>
				<Provider {...stores}>
					<App />
				</Provider>
			</Router>
		</AppContainer>,
		document.getElementById('app')
	);
};

renderApp(App);

if (module.hot) module.hot.accept(() => renderApp(App));
