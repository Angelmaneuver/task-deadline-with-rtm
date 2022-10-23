import { RTM }        from './lib/libraries.bundle';
import * as Component from './lib/components';

const API_KEY                 = ``;
const API_SECRET              = ``;
const AUTH_TOKEN              = ``;

const RED_ZONE                = 24 * 1;
const YELLOW_ZONE             = 7 * 24 * 1;

export const className        = `
	top:  0;
	left: 0;
`;

const DESCRIPTION             = {
	DATE:    {
		YEAR:    '年',
		MONTH:   '月',
		DAY:     '日',
		HOUR:    '時',
		MINUTES: '分',
		SECONDS: '秒',
	},
	STARTUP: '起動中です...',
	SETUP:   {
		INFORMATION: 'セットアップ手順',
		STEP1:       {
			'1':    `Step.1`,
			'2':    `以下の URL をブラウザにコピー (⌘ + c) して remember the milk 公式サイトにアクセスし、貴方のアカウントへのアクセスを許可してください。`,
		},
		STEP2:       {
			'1':    `Step.2`,
			'2':    `アクセスを許可したら、『トークンを取得する』ボタンを押下してください。`,
			'text': `トークンを取得する`
		},
		STEP3:       {
			'1':    `Step.3`,
			'2':    `トークンが取得できました。トークンをコピー (⌘ + c) して、このウィジェットの JavaScript 内変数『AUTH_TOKEN』に貼り付けて再起動してください。`,
		},
	}
}

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
				className = { `error` }
			>
				{ props.warning }
			</Component.Molecuels.Information>
		);
	} else {
		if (STATUS.STARTUP === props.type) {
			main = (
				<Component.Molecuels.Information>
					{ DESCRIPTION.STARTUP }
				</Component.Molecuels.Information>
			);
		} else if (STATUS.SETUP === props.type) {
			main = (
				<Component.Molecuels.Setup
					information = {{ text: DESCRIPTION.SETUP.INFORMATION }}
					message     = { 'message' in props ? props.message : undefined }
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
			main = (
				props.data.map((item) => (
					<Component.Molecuels.List
						key   = { item.name }
						name  = { item.name }
						style = {{
							marginBottom: '0.5em',
						}}
					>
						{ item.tasks }
					</Component.Molecuels.List>
				))
			);
		}
	}

	return (
		<div>
			<Component.Molecuels.Reload
				onClickReload = { () => { init(dispatch); } }
			/>
			<Component.Atoms.Row
				style = {{
					minHeight:     '60vh',
					maxHeight:     '60vh',
					width:         '55vw',
					padding:       '0.3em',
					margin:        '0.3em',
				
					flexDirection: 'column',
					overflowY:     'scroll',
					overflowX:     'hidden',
					background:    'rgba(51,49,50,.65)',
				}}
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
			$.when(
				$.get(rtm.getUrl('rtm.lists.getList')),
				$.get(rtm.getUrl('rtm.tasks.getList', { filter: 'status:incomplete' })),
			).done(
				(listsResponse, tasksResponse) => {
					const listsJson = JSON.parse(listsResponse[0]);
					const tasksJson = JSON.parse(tasksResponse[0]);

					if (RTM_STATUS.FAIL === listsJson.rsp.stat || RTM_STATUS.FAIL === tasksJson.rsp.stat) {
						dispatch({
							...props,
							error: `Error in data acquistion / Lists ${listsJson.rsp.err.msg} / Tasks ${tasksJson.rsp.err.msg}`,
						});
					} else {
						const data  = [];
						const lists = listsJson.rsp.lists.list;

						for (const list of tasksJson.rsp.tasks.list) {
							const name = lists.filter((element) => {
								return list.id === element.id;
							})[0].name;

							const taskSeries = [];

							for (const task of list.taskseries) {
								const due       = new Date(task.task[0].due);
								const year      = `${due.getFullYear().toString()}${DESCRIPTION.DATE.YEAR}`;
								const month     = `${(due.getMonth() + 1).toString().padStart(2, '0')}${DESCRIPTION.DATE.MONTH}`;
								const date      = `${due.getDate().toString().padStart(2, '0')}${DESCRIPTION.DATE.DAY}`;
								const hour      = `${due.getHours().toString().padStart(2, '0')}${DESCRIPTION.DATE.HOUR}`;
								const minutes   = `${due.getMinutes().toString().padStart(2, '0')}${DESCRIPTION.DATE.MINUTES}`;

								let   className = (() => {
									let   className = undefined
									const now       = new Date();
									const red       = new Date(due.getTime()).setHours(-RED_ZONE);
									const yellow    = new Date(due.getTime()).setHours(-YELLOW_ZONE);

									if (yellow <= now) {
										className = 'yellow-zone';
									}

									if (red <= now) {
										className = 'red-zone';
									}

									return className;
								})();

								taskSeries.push(
									<Component.Molecuels.Task
										className   = { className }
										key         = { task.name }
										description = { task.name }
										deadline    = { `${year}${month}${date}${hour}${minutes}` }
									/>
								);
							}

							data.push({ name: name, tasks: taskSeries });
						}

						dispatch({
							...props,
							data: data,
						});
					}
				}
			).fail(
				(lists, tasks) => {
					dispatch({
						...props,
						error: `Error in data acquistion / Lists ${Array.isArray(lists) && lists.indexOf(2) ? lists[2] : ''} / Tasks ${Array.isArray(tasks) && tasks.indexOf(2) ? tasks[2] : ''}`,
					});
				}
			);
		} else {
			authentication(
				props.rtm,
				{ ...props, type: STATUS.SETUP, message: checkToken.rsp.err.msg },
				dispatch
			);
		}
	}).fail(
		(jqXHR, textStatus, errorThrown) => {
			dispatch({
				...props,
				error: errorThrown,
			});
		}
	);
}
