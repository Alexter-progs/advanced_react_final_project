import type { ComponentType } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

export const withStore = (WrappedComponent: ComponentType) => {
	const ReturnedComponent: React.ComponentType = () => (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<WrappedComponent />
			</PersistGate>
		</Provider>
	);

	ReturnedComponent.displayName = `withStore${WrappedComponent.displayName}`;

	return ReturnedComponent;
};
