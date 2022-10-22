import crypto from 'crypto';

const Permission = {
	read:   'read',
	write:  'write',
	delete: 'delete',
} as const;

type  permission = typeof Permission[keyof typeof Permission];

class RTM {
	private static AUTH_URL = 'https://www.rememberthemilk.com/services/auth/';
	private static BASE_URL = 'https://api.rememberthemilk.com/services/rest/';

	private appKey:      string;
	private appSecret:   string;
	private permissions: permission;
	private format:      string;

	private authUrl      = RTM.AUTH_URL;
	private baseUrl      = RTM.BASE_URL;
	private _authToken   = '';

	constructor(
		appKey:       string,
		appSecret:    string,
		permissions?: permission,
		format?:      string
	) {
		this.appKey      = appKey;
		this.appSecret   = appSecret
		this.permissions = permissions ? permissions : Permission.read;
		this.format      = format      ? format      : 'json';

		if (!this.appKey || !this.appSecret) {
			throw new TypeError('Error: App Key and Secret Key must be defined.');
		}
	}

	public set authToken(authToken: string) {
		this._authToken = authToken;
	}

	public get authToken() {
		return this._authToken;
	}

	private encodeUrlParams(
		_params: Record<string, (string | number | boolean)>,
		signed:  boolean
	): string {
		const params      = _params ? _params : {};
		const paramString = [];
		let   count       = 0;

		params.format     = this.format;
		params.api_key    = this.appKey;

		for (const key in params) {
			const connector = (0 === count) ? '?' : '&';
			const parameter = encodeURIComponent(params[key]);

			paramString.push(`${connector}${key}=${parameter}`);

			count++;
		}

		if (signed) {
			paramString.push(this.generateSig(params));
		}

		return paramString.join('');
	}

	private generateSig(_params: Record<string, unknown>): string {
		const params    = _params ? _params : {};
		const signature = [];
		const keys      = Object.keys(params).sort();

		for (let i = 0; i < keys.length; i++) {
			signature.push(`${keys[i]}${params[keys[i]]}`);
		}

		signature.unshift(this.appSecret);

		return `&api_sig=${crypto.createHash('md5').update(signature.join(''), 'utf8').digest('hex')}`;
	}

	public proxyOn(url = 'http://127.0.0.1:41417/'): void {
		this.authUrl = `${url}${RTM.AUTH_URL}`;
		this.baseUrl = `${url}${RTM.BASE_URL}`;
	}

	public getAuthUrl(frob: string): string {
		const params = {
			api_key: this.appKey,
			perms:   this.permissions,
		} as Record<string, (string | number | boolean)>;

		if (frob) {
			params.frob = frob;
		}

		return `${this.authUrl}${this.encodeUrlParams(params, true)}`;
	}

	public getUrl(
		_method:    string,
		_params?:   Record<string, (string | number | boolean)>,
	) {
		const method = _method ? _method : '';
		const params = _params ? _params : {} as Record<string, (string | number | boolean)>;

		if (0 === method.length) {
			throw new TypeError('Error: API Method must be defined.');
		} else {
			params.method = method;
		}

		if (this.authToken) {
			params.auth_token = this.authToken;
		}

		return `${this.baseUrl}${this.encodeUrlParams(params, true)}`;
	}
}

export {
	RTM,
};
