import { WithProtection } from '~features/Auth';
import { SignUpForm } from '~widgets/SignUpForm';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
