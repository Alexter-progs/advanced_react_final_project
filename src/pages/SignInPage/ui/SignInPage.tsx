import { WithProtection } from '~shared/store/HOCs';
import { SignInForm } from '~widgets/SignInForm';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
