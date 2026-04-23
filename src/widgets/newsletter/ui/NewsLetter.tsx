import { Box } from '@mui/material';
import {
	startTransition,
	useActionState,
	useEffect,
	useRef,
	useState,
} from 'react';
import { sendEmail } from '../api/sendEmail';
import { EmailForm } from './EmailForm/EmailForm';
import { Loader } from './Loader/Loader';
import { Error } from './Error/Error';
import { SuccessfullSubscribption } from './SuccessfullSubscribption/SuccessfullSubscribption';
import { Dialog } from '~shared/ui/Dialog';

const modalStyles = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

//@ts-expect-error ignoring types
const sendEmailAction = async (_, payload) => {
	if (payload === null) {
		return null;
	}

	return await sendEmail(payload.get('email') as string);
};

export const NewsLetter: React.FC = ({}) => {
	const [isNewsLetterShown, setIsNewsLetterShown] = useState(false);
	const [actionResult, dispatchAction, isPending] = useActionState(
		sendEmailAction,
		null
	);

	useEffect(() => {
		console.log('setting timeout');
		const timeoutId = setTimeout(() => setIsNewsLetterShown(true), 2_000);

		return () => clearTimeout(timeoutId);
	}, []);

	const onClose = () => {
		setIsNewsLetterShown(false);
		startTransition(() => {
			dispatchAction(null); // Pass null to trigger reset
		});
	};

	return (
		<Dialog open={isNewsLetterShown} onClose={() => onClose()}>
			<Box sx={modalStyles}>
				{isPending && <Loader />}
				{!isPending && !actionResult && (
					<EmailForm dispatchAction={dispatchAction} />
				)}
				{!isPending && actionResult?.result && <SuccessfullSubscribption />}
				{!isPending && actionResult?.error && <Error />}
			</Box>
		</Dialog>
	);
};
