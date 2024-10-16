'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Adjust the path if necessary
import { AuthProvider } from './AuthProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}