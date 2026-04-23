import type { ComponentType, FC } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

export const withToastify = (WrappedComponent: ComponentType) => {
	const ReturnedComponent: FC = () => (
		<>
			<WrappedComponent />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
				pauseOnFocusLoss
				transition={Bounce}
			/>
		</>
	);

	ReturnedComponent.displayName = `withToastify${WrappedComponent.displayName}`;

	return ReturnedComponent;
};
