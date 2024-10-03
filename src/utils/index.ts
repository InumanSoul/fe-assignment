import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function validateEmail(email: string) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString();
}

export function isFetchBaseQueryError(
	error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError {
	return (error as FetchBaseQueryError).data !== undefined;
}

export function formatErrorMessage(error: FetchBaseQueryError) {
	const errMessage =
		(error.data as { message?: string })?.message || 'An error occurred, please try again';
	const parts = errMessage.split('::');

	return parts.length > 1 ? parts[1] : errMessage;
}
