import { css }    from 'uebersicht';
import * as Atoms from '../../atoms';

const Reload     = ({ className, style, onClickReload }) => {
	return (
		<Atoms.Row
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
		>
			<div
				style = {{
					flexGrow: '9',
				}}
			/>
			<div
				style = {{
					padding:      '0.3em',
					margin:       '0.3em',
					borderRadius: '0.2em',
					background:   'rgba(51,49,50,.9)',
			}}
			>
				<Atoms.Icon.Reload
					onClick = { onClickReload }
					style   = {{
						width:         '1.2em',
						height:        'auto',
						verticalAlign: 'middle',
						fill:          'rgba(230,230,230,.8)',
						filter:        'drop-shadow(0 0 0.5em #00BFFF)',
						userSelect:    'none',
						cursor:        'pointer',
					}}
				/>
			</div>
		</Atoms.Row>
	);
}

const baseStyle = (style) => css`
	${style}
`;

export {
	Reload,
};
