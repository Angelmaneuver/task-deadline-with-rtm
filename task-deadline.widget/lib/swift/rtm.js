import { run } from 'uebersicht';

class RTM {
    constructor(apiKey, apiSecret) {
		this._apiKey    = apiKey;
		this._apiSecret = apiSecret;
		this._authToken = "";
    }

	get apiKey()         { return this._apiKey; }
	get apiSecret()      { return this._apiSecret; }
	get authToken()      { return this._authToken; }
	set authToken(value) { this._authToken = value; }
}

function getRtmInstance(apiKey, apiSecret) {
	return [new RTM(apiKey, apiSecret), undefined];
}

async function getFrobURL(rtm) {
	return run(`./task-deadline.widget/bin/rtm-cli ${auth(rtm.apiKey, rtm.apiSecret)} getFrob`);
}

async function getAuthURL(rtm, frob) {
	return run(`./task-deadline.widget/bin/rtm-cli ${auth(rtm.apiKey, rtm.apiSecret)} --frob ${frob} auth`);
}

async function getTokenURL(rtm, frob) {
	return run(`./task-deadline.widget/bin/rtm-cli ${auth(rtm.apiKey, rtm.apiSecret)} --frob ${frob} getToken`);
}

async function getCheckTokenURL(rtm) {
	return run(`./task-deadline.widget/bin/rtm-cli ${auth(rtm.apiKey, rtm.apiSecret)} --token ${rtm.authToken} checkToken`);
}

async function getListURL(rtm) {
	return run(`./task-deadline.widget/bin/rtm-cli ${auth(rtm.apiKey, rtm.apiSecret)} --token ${rtm.authToken} --filter status:incomplete getList`);
}

function auth(apiKey, apiSecret) {
	if (0 < apiKey.length && 0 < apiSecret.length) {
		return `--key ${apiKey} --secret ${apiSecret}`;
	} else {
		return '';
	}
}

export {
	getRtmInstance,
	getFrobURL,
	getAuthURL,
	getTokenURL,
	getCheckTokenURL,
	getListURL,
}
