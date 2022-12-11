import { css, React } from 'uebersicht';
import * as Atoms     from '../../atoms';

const Toolbar = ({
	className,
	style,
	outline,
	outlineFormat,
	onClickMinimize,
	onClickMaximize,
	onClickReload,
}) => {
	const frame   = {
		padding:      '0.3em',
		margin:       '0.3em',
		borderRadius: '0.2em',
		background:   'rgba(51,49,50,.9)',
	};

	const icon    = {
		width:         '1.2em',
		height:        'auto',
		verticalAlign: 'middle',
		fill:          'rgba(230,230,230,.8)',
		filter:        'drop-shadow(0 0 0.5em #00BFFF)',
		userSelect:    'none',
		cursor:        'pointer',
	};

	let   index   = 1;
	let   options = [];

	outline.list.forEach((date) => {
		const start     = index;
		const temporary = date.tasks.map((task) => {
			const value = outlineFormat.TASK.replace('$TASK', task);

			index++;

			return (
				<option
					key   = { index }
					value = { index }
				>
					{ value }
				</option>
			);
		});

		const headline = outlineFormat.DAY
							.replace('$DATE',  date.date)
							.replace('$TASKS', date.tasks.length);

		temporary.unshift((
			<option
				key   = { start }
				value = { start }
			>
				{ headline }
			</option>
		));

		index++;

		options = options.concat(temporary);
	});

	options.unshift((
		<option
			key   = { 0 }
			value = { 0 }
		>
			{
				outlineFormat.SUMMARY
					.replace('$RED',    outline.number.red)
					.replace('$YELLOW', outline.number.yellow)
					.replace('$BLUE',   outline.number.blue)
			}
		</option>
	));

	return (
		<Atoms.Row
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
		>
			<Atoms.Row
				style = {{
					alignItems: 'center',
					flexGrow:   '9',
				}}
			>
				{( onClickMaximize ) ? (
					<React.Fragment>
						<div
							style     = {{
								...frame,
								width: '100%',
							}}
						>
							<select
								className = { `${selectStyle(Atoms.Style.fontColor)} ${outline.color}` }
							>
								{ options }
							</select>
						</div>
					</React.Fragment>
				) : ('')}
			</Atoms.Row>
			<Atoms.Row
				style = {{
					alignItems: 'center',
				}}
			>
				{( onClickMinimize ) ? (
					<React.Fragment>
						<div style = { frame }>
							<Atoms.Icon.Minimize
								onClick = { onClickMinimize }
								style   = { icon }
							/>
						</div>
						<div style = { frame }>
							<Atoms.Icon.Reload
								onClick = { onClickReload }
								style   = { icon }
							/>
						</div>
					</React.Fragment>
				) : ('')}
				{( onClickMaximize ) ? (
					<React.Fragment>
						<div style = { frame }>
							<Atoms.Icon.Maximize
								onClick = { onClickMaximize }
								style   = { icon }
							/>
						</div>
					</React.Fragment>
				) : ('')}
			</Atoms.Row>
		</Atoms.Row>
	);
}

const baseStyle = (style) => css`
	${style}
`;

const selectStyle = (style) => css`
    & {
        position:         relative;
        width:            100%;
        overflow:         hidden;
        text-shadow:      0 0 8em;
        outline:          none;
        background-color: initial !important;

		${style}
	}
`;

export {
	Toolbar,
};
