'use client'; // Mark this as a client component

import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function ProviderWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}