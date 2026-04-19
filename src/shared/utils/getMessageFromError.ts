const objectHasProperty = <P extends PropertyKey>(
	obj: unknown,
	prop: P
): obj is object & Record<P, unknown> => {
	return typeof obj === 'object' && !!obj && Object.hasOwn(obj, prop);
};

export const getMessageFromError = (
	error: unknown,
	defaultErrorMessage: string
) => {
	if (objectHasProperty(error, 'message') && typeof error.message === 'string')
		return error.message;

	return defaultErrorMessage;
};
