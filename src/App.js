import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Routes from './routes';
import history from './services/history';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <GlobalStyles />
            <ToastContainer autoClose={3000} className="toast-container" />
            <Header />
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
