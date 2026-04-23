import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { PortalWrapper } from '../../../lib/PortalWrapper';
import s from './Dialog.module.css';

export interface DialogProps {
	open: boolean;
	children: React.ReactNode | React.ReactNode[];
	onClose: () => void;
}

export const Dialog: React.ComponentType<DialogProps> = ({
	open,
	children,
	onClose,
}) => {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			console.log('click');
			console.log(contentRef.current);
			console.log(e.target);
			if (
				contentRef.current &&
				!contentRef.current.contains(e.target as Node)
			) {
				onClose();
			}
		}

		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keyup', handleEscape);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keyup', handleEscape);
		};
	}, []);

	useEffect(() => {
		contentRef.current?.focus();
	}, []);

	return (
		<>
			{open && (
				<PortalWrapper>
					<div className={classNames(s['dialog'])}>
						<div className={classNames(s['dialog-overlay'])}>
							<div ref={contentRef}>{children}</div>
						</div>
					</div>
				</PortalWrapper>
			)}
		</>
	);
};
