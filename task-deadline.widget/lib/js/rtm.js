import { RTM } from '../libraries.bundle';

function getRtmInstance(apiKey, apiSecret) {
	try {
		return [new RTM(apiKey, apiSecret), undefined];
	} catch (e) {
		return [undefined, e];
	}
}

async function getFrobURL(rtm) {
	return rtm.getUrl('rtm.auth.getFrob');
}

async function getAuthURL(rtm, frob) {
	return rtm.getAuthUrl(frob);
}

async function getTokenURL(rtm, frob) {
	return rtm.getUrl('rtm.auth.getToken', { frob: frob });
}

async function getCheckTokenURL(rtm) {
	return rtm.getUrl('rtm.auth.checkToken');
}

async function getListURL(rtm) {
	return rtm.getUrl('rtm.tasks.getList', { filter: 'status:incomplete' });
}

export {
	getRtmInstance,
	getFrobURL,
	getAuthURL,
	getTokenURL,
	getCheckTokenURL,
	getListURL,
}
