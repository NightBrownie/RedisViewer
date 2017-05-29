import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router';

export default function Root({ store, children }) {
  return (
    <Provider store={store}>
        <Router>
            {children}
        </Router>
    </Provider>
  );
}
;
