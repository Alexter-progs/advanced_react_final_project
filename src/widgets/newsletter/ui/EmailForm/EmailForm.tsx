import { Box, Button, TextField } from '@mui/material';
import { ValidationError } from 'yup';
import { startTransition, useState } from 'react';
import { emailValidationSchema } from '../../model';

export const EmailForm: React.FC<{
	dispatchAction: (formData: FormData) => void;
}> = ({ dispatchAction }) => {
	const [validationError, setValidationError] = useState<string | null>(null);

	async function formAction(formData: FormData) {
		const email = formData.get('email');
		console.log('FOrm action called');
		try {
			console.log('Validating');
			await emailValidationSchema.validate(email);
			setValidationError(null);
		} catch (error) {
			if (error instanceof ValidationError) {
				console.log('has errors: ', error);
				setValidationError(error.errors[0]);
				return;
			}
		}

		startTransition(() => dispatchAction(formData));
	}

	return (
		<>
			<h2 id='child-modal-title'>
				Хотите получать классный контент? Подпишитесь на нашу рассылку
			</h2>
			<form action={formAction}></form>
			<Box
				component='form'
				action={formAction}
				sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<TextField
					required
					type='text'
					name='email'
					sx={{ width: '100%', mb: 2 }}
					label='Почта'
					variant='outlined'
					error={!!validationError}
					helperText={validationError}
				/>
				<Button sx={{ mx: 1 }} variant='contained' type='submit'>
					Подписаться
				</Button>
			</Box>
		</>
	);
};
