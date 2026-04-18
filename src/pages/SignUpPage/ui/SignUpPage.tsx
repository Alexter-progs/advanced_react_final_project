import { WithProtection } from '~shared/store/HOCs';
import { SignUpForm } from '~widgets/SignUpForm';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
