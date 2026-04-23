import { createPortal } from 'react-dom';

const MODAL_CONTAINER_ID = 'modal-root';

export const PortalWrapper: React.ComponentType<React.PropsWithChildren> = ({
	children,
}) => {
	let container = document.getElementById(MODAL_CONTAINER_ID);

	if (!container) {
		container = document.createElement('div');
		container.setAttribute('id', MODAL_CONTAINER_ID);
		document.body.appendChild(container);
	}

	return createPortal(children, container);
};
