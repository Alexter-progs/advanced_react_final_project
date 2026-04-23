type Response =
	| { result: string; error?: never }
	| {
			result?: never;
			error: string;
	  };
export const sendEmail = async (email: string): Promise<Response> => {
	console.log(`Verifying ${email} and sending confirmation email...`);
	return new Promise((resolve) => {
		setTimeout(() => {
			if (Math.random() > 0.5) {
				resolve({ error: '504' });
			} else {
				resolve({ result: 'success' });
			}
		}, 4000);
	});
};
