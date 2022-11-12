import { css, React } from 'uebersicht';
import * as Atoms     from '../../atoms';

const Buttons = ({
	className,
	style,
	onClickMinimize,
	onClickMaximize,
	onClickReload,
}) => {
	const button = {
		padding:      '0.3em',
		margin:       '0.3em',
		borderRadius: '0.2em',
		background:   'rgba(51,49,50,.9)',
	};

	const icon   = {
		width:         '1.2em',
		height:        'auto',
		verticalAlign: 'middle',
		fill:          'rgba(230,230,230,.8)',
		filter:        'drop-shadow(0 0 0.5em #00BFFF)',
		userSelect:    'none',
		cursor:        'pointer',
	};

	return (
		<Atoms.Row
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
		>
			<div
				style = {{
					flexGrow: '9',
				}}
			/>
			<Atoms.Row>
				{( onClickMinimize ) ? (
					<React.Fragment>
						<div style = { button }>
							<Atoms.Icon.Minimize
								onClick = { onClickMinimize }
								style   = { icon }
							/>
						</div>
						<div style = { button }>
							<Atoms.Icon.Reload
								onClick = { onClickReload }
								style   = { icon }
							/>
						</div>
					</React.Fragment>
				) : ('')}
				{( onClickMaximize ) ? (
					<React.Fragment>
						<div style = { button }>
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

export {
	Buttons,
};
