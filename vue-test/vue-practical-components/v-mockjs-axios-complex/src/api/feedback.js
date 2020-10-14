import HTTP from '../utils/fetch';

export function getFeedback() {
	return HTTP({
		url: '/feedback',
		method: 'post'
	})
}