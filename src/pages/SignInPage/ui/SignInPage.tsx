import { WithProtection } from '~features/Auth';
import { SignInForm } from '~widgets/SignInForm';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
