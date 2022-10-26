import { RTM }        from './lib/libraries.bundle';
import * as Language  from './lib/description';
import * as Component from './lib/components';

const API_KEY                 = ``;
const API_SECRET              = ``;
const AUTH_TOKEN              = ``;

const DESCRIPTION             = Language.EN;

const RED_ZONE                = 2;
const YELLOW_ZONE             = 7;

export const className        = `
	top:        0;
	left:       0;
	font-style: italic;

	> div > div:nth-child(2) > div:last-child > div:not(:first-child) > div:first-child:before {
		display: none;
	}
`;

const mainStyle               = {
	minHeight:     '58vh',
	maxHeight:     '58vh',
	width:         '55vw',
	padding:       '1em',
	margin:        '0.3em',

	flexDirection: 'column',
	overflowY:     'scroll',
	overflowX:     'hidden',
	background:    'rgba(51,49,50,.65)',
};

const STATUS                  = {
	STARTUP:       'RTL/STARTUP',
	SETUP:         'RTL/SETUP',
	SETUP_SUCCESS: 'RTL/SETUP_SUCCESS',
	ACTIVE:        'RTL/ACTIVE',
};

const RTM_STATUS              = {
	OK:   'ok',
	FAIL: 'fail',
};

export const command          = undefined;

export const refreshFrequency = false;

export const initialState     = { type: STATUS.STARTUP };

export const init             = (dispatch) => {
	const [rtm, error] = getRtmInstance(API_KEY, API_SECRET);
	const props        = { rtm: rtm };

	if (error) {
		return dispatch({ error: error.message });
	}

	if ('string' === typeof AUTH_TOKEN && 0 < AUTH_TOKEN.length) {
		rtm.authToken = AUTH_TOKEN;

		return getTasks(rtm, { type: STATUS.ACTIVE, ...props }, dispatch);
	}

	return authentication(rtm, { type: STATUS.SETUP,  ...props }, dispatch);
}

export const updateState      = (event, previousState) => {
	if (event.error) {
		return { ...previousState, warning: `We got an error: ${event.error}` };
	}

	return { ...previousState, ...event };
}

export const render           = (props, dispatch) => {
	let main;

	if (props.warning) {
		main = (
			<Component.Molecuels.Information
				className = { `red` }
			>
				{ props.warning }
			</Component.Molecuels.Information>
		);
	} else {
		if (STATUS.STARTUP === props.type) {
			main = (
				<Component.Molecuels.Information
					className = { `blue` }
				>
					<Component.Atoms.Row
						style = {{
							flexDirection: 'column',
						}}
					>
						<div
							style = {{
								textAlign:    'center',
								marginBottom: '1em',
							}}
						>{ DESCRIPTION.STARTUP }</div>
						<div>{ DESCRIPTION.ATTRIBUTION[2] }</div>
					</Component.Atoms.Row>
				</Component.Molecuels.Information>
			);
		} else if (STATUS.SETUP === props.type) {
			main = (
				<Component.Molecuels.Setup
					information = {{ text: DESCRIPTION.SETUP.INFORMATION }}
					message     = { 'message' in props ? props.message : undefined }
					attribution = {{
						'1':     DESCRIPTION.ATTRIBUTION[1],
						'2':     DESCRIPTION.ATTRIBUTION[2],
					}}
					step1       = {{
						'1':     DESCRIPTION.SETUP.STEP1[1],
						'2':     DESCRIPTION.SETUP.STEP1[2],
						text:    'authUrl' ? props.authUrl : undefined,
					}}
					step2       = {{
						'1':     DESCRIPTION.SETUP.STEP2[1],
						'2':     DESCRIPTION.SETUP.STEP2[2],
						text:    DESCRIPTION.SETUP.STEP2.text,
						onClick: () => {
							$.get(
								props.rtm.getUrl('rtm.auth.getToken', { frob: props.frob })
							).done(
								(data, textStatus, jqXHR) => {
									const json   = JSON.parse(data);
									const append = {};
						
									if (RTM_STATUS.OK === json.rsp.stat) {
										append['type']    = STATUS.SETUP_SUCCESS;
										append['token']   = json.rsp.auth.token;
									} else {
										append['message'] = json.rsp.err.msg;
									}
						
									dispatch(append);
								}
							).fail(
								(jqXHR, textStatus, errorThrown) => {
									dispatch({ error: errorThrown });
								}
							);
						}
					}}
				/>
			);
		} else if (STATUS.SETUP_SUCCESS === props.type) {
			main = (
				<Component.Molecuels.Setup
					information = {{ text: DESCRIPTION.SETUP.INFORMATION }}
					step1       = {{
						'1':     DESCRIPTION.SETUP.STEP3[1],
						'2':     DESCRIPTION.SETUP.STEP3[2],
						text:    'token' in props ? props.token : undefined,
					}}
				/>
			);
		} else if (STATUS.ACTIVE === props.type) {
			const data = props.data;

			if (0 === Object.keys(data).length) {
				main = (
					<Component.Molecuels.Information
						className = { `blue` }
					>
						{ DESCRIPTION.NO_DATA }
					</Component.Molecuels.Information>
				);
			} else {
				main = (
					data.map((record) => {
						const color = 'color' in record ? record.color : undefined;

						return (
							<Component.Atoms.Row
								key   = { record.headline }
								style = {{
									flexDirection: 'column',
								}}
							>
								<Component.Molecuels.Timeline.Headline
									date  = { record.headline }
									color = { color }
								/>
								<Component.Molecuels.Timeline.Detail
									datetimes = { record.datetimes }
									color     = { color }
								/>
							</Component.Atoms.Row>
						);
					})
				);
			}
		}
	}

	return (
		<div>
			<Component.Molecuels.Reload
				onClickReload = { () => { init(dispatch); } }
			/>
			<Component.Atoms.Row
				style = { mainStyle }
			>
				{ main }
			</Component.Atoms.Row>
		</div>
	);
}

function getRtmInstance(apiKey, apiSecret) {
	try {
		return [new RTM(apiKey, apiSecret), undefined];
	} catch (e) {
		return [undefined, e];
	}
}

function authentication(rtm, props, dispatch) {
	$.get(
		rtm.getUrl('rtm.auth.getFrob')
	).done(
		(data, textStatus, jqXHR) => {
			const json   = JSON.parse(data);
			const append = {};

			if (RTM_STATUS.OK === json.rsp.stat) {
				append['frob']    = json.rsp.frob;
				append['authUrl'] = rtm.getAuthUrl(json.rsp.frob);
			} else {
				append['error']   = json.rsp.err.msg;
			}

			dispatch({ ...props, ...append });
		}
	).fail(
		(jqXHR, textStatus, errorThrown) => {
			dispatch({ ...props, ...{ error: errorThrown } });
		}
	);
}

function getTasks(rtm, props, dispatch){
	$.get(
		rtm.getUrl('rtm.auth.checkToken')
	).done((data, textStatus, jqXHR) => {
		const checkToken = JSON.parse(data);

		if (RTM_STATUS.OK === checkToken.rsp.stat) {
			$.get(
				rtm.getUrl('rtm.tasks.getList', { filter: 'status:incomplete' })
			).done((data, textStatus, jqXHR) => {
				const tasksJson = JSON.parse(data);

				if (RTM_STATUS.OK === tasksJson.rsp.stat) {
					dispatch({ ...props, data:  assembly(tasksJson.rsp.tasks.list) });
				} else {
					dispatch({ ...props, error: tasksJson.rsp.err.msg });
				}
			}).fail((jqXHR, textStatus, errorThrown) => {
				dispatch({ ...props, error: errorThrown });
			});
		} else {
			authentication(
				props.rtm,
				{ ...props, type: STATUS.SETUP, message: checkToken.rsp.err.msg },
				dispatch
			);
		}
	}).fail((jqXHR, textStatus, errorThrown) => {
		dispatch({ ...props, error: errorThrown });
	});
}

function assembly(lists) {
	return lists ? refill(...collect(lists)) : [];
}

function collect(lists) {
	const timeline   = {};
	const indefinite = [];

	for (const list of lists) {
		for (const task of list.taskseries) {
			const due = (() => {
				if (task.task[0].due && 'string' === typeof task.task[0].due && 0 < task.task[0].due.length) {
					return new Date(task.task[0].due);
				} else {
					return undefined;
				}
			})();

			if (due) {
				const key = `${due.getFullYear().toString()}-${(due.getMonth() + 1).toString().padStart(2, '0')}-${due.getDate().toString().padStart(2, '0')}`;
	
				if (!(key in timeline)) {
					timeline[key] = {};
				}

				if (!(due in timeline[key])) {
					timeline[key][due] = [];
				}

				timeline[key][due].push(task.name);
			} else {
				indefinite.push(task.name);
			}
		}
	}

	return [timeline, indefinite];	
}

function refill(timeline, indefinite) {
	const data       = [];
	const now        = new Date();
	const toDay      = `${now.getFullYear().toString()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
	const toDayTime  = new Date(toDay);
	let   redZone    = false;
	let   yellowZone = false;

	if (!(toDay in timeline)) {
		timeline[toDay] = {};
	}

	Object.keys(timeline).sort().reverse().forEach((key) => {
		const date       = new Date(key);
		const headline   = (() => {
			if (toDayTime.getTime() === date.getTime()) {
				return (
					DESCRIPTION.TODAY_FORMAT
						.replace('$YEAR',  toDayTime.getFullYear().toString())
						.replace('$MONTH', (toDayTime.getMonth() + 1).toString().padStart(2, '0'))
						.replace('$DATE',  toDayTime.getDate().toString().padStart(2, '0'))
				);
			} else {
				return (
					DESCRIPTION.DATE_FORMAT
						.replace('$YEAR',  date.getFullYear().toString())
						.replace('$MONTH', (date.getMonth() + 1).toString().padStart(2, '0'))
						.replace('$DATE',  date.getDate().toString().padStart(2, '0'))
				);
			}
		})();

		const datetimes  = [];

		Object.keys(timeline[key]).sort().forEach((datetime) => {
			const time  = new Date(datetime);
			const index = DESCRIPTION.TIME_FORMAT
							.replace('$HOURS',   (0 === time.getHours() ? 24 : time.getHours()).toString().padStart(2, '0'))
							.replace('$MINUTES', time.getMinutes().toString().padStart(2, '0'));

			datetimes.push({
				time:  index,
				tasks: timeline[key][datetime].sort(),
			});
		});

		const record     = { headline: headline, datetimes: datetimes };

		const color      = (() => {
			const color = {};

			if (redZone || yellowZone) {
				color.line = redZone ? 'red' : 'yellow';
			}

			if (0 < Object.keys(datetimes).length) {
				const yellow = new Date(date.getTime());
				const red    = new Date(date.getTime());
		
				yellow.setDate(date.getDate() - YELLOW_ZONE);
				red.setDate(date.getDate() - RED_ZONE);
	
				if (red.getTime() <= toDayTime.getTime()) {
					color.other = 'red';
					redZone     = true;
				} else if (yellow.getTime() <= toDayTime.getTime()) {
					color.other = 'yellow';
					yellowZone  = true;
				}
			}

			return 0 < Object.keys(color).length ? color : undefined;
		})();

		if (color) {
			record.color = color;
		}

		data.push(record);
	});

	if (0 < indefinite.length) {
		data.unshift({
			headline:  DESCRIPTION.UNDECIDED.DATE,
			datetimes: [{
				time:  DESCRIPTION.UNDECIDED.TIME,
				tasks: indefinite,
			}],
		});
	}

	return data.reverse();
}
