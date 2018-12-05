import createHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

export const browserHistory = createHistory();
export const routing = new RouterStore();

export const history = syncHistoryWithStore(browserHistory, routing);
