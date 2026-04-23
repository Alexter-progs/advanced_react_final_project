import * as yup from 'yup';

export const emailValidationSchema = yup
	.string()
	.trim()
	.email('Чтобы подписка удалась нужно ввести валидный E-mail')
	.required('Чтобы подписаться нужно ввести E-mail');
