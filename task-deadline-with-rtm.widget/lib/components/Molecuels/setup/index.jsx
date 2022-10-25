import { css }    from 'uebersicht';
import * as Atoms from '../../atoms';

const Setup = ({
	className,
	style,
	information,
	message,
	step1,
	step2,
}) => {
	return (
		<Atoms.Row
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
			style     = {{
				alignItems: 'center',
			}}
		>
			<div
				style     = {{
					fontSize:        '1.5em',
					padding:         '0.25em',
					color:           'rgba(244,251,254,.9)',
					backgroundColor: 'rgba(0,255,127,.7)',
				}}
			>
				{ (information && 'text' in information) ? information.text : '' }
			</div>
			{ (message && 'string' === typeof message && 0 < message.length ) ? (
				<div
					style = {{
						fontSize:    '0.9em',
						padding:     '0.25em',
						margin:      '1.5em 0 0 0',
						color:       'red',
					}}
				>
					{ message }
				</div>
			) : (``) }
			<div
				style = {{
					fontSize:        '0.9em',
					width:           '90%',
					padding:         '0.25em',
					margin:          '1.5em 0 0 0',
					color:           'rgba(244,251,254,.9)',
				}}
			>
				<Atoms.Row
					style = {{
						flexDirection: 'column',
					}}
				>
					<div>
						{ (step1 && '1' in step1) ? step1[1] : '' }
					</div>
					<div>
						{ (step1 && '2' in step1) ? step1[2] : '' }
					</div>
				</Atoms.Row>
			</div>
			<Atoms.LED
				text      = { (step1 && 'text' in step1) ? step1.text : '' }
				style     = {{
					width:           '90% !important',
					padding:         '0.25em',
					margin:          '1.5em 0.5em 0 0.5em',
					userSelect:      'all',
				}}
				noMarquee = { true }
			/>
			{ (undefined !== step2 && '1' in step2 && '2' in step2) ? (
				<div
					style = {{
						fontSize:        '0.9em',
						width:           '90%',
						padding:         '0.25em',
						margin:          '1.5em 0 0 0',
						color:           'rgba(244,251,254,.9)',
					}}
				>
					<Atoms.Row
						style = {{
							flexDirection: 'column',
						}}
					>
						<div>
							{ (step2 && '1' in step2) ? step2[1] : '' }
						</div>
						<div>
							{ (step2 && '2' in step2) ? step2[2] : '' }
						</div>
					</Atoms.Row>
				</div>
			) : (``) }
			{ ( undefined !== step2 && 'text' in step2 ) ? (
				<div
					style = {{
						padding:         '0.3em',
						margin:          '1.5em 0 0 0',
						borderRadius:    '0.2em',
						background:      'rgba(51,49,50,.9)',
						verticalAlign:   'middle',
						color:           'rgba(230,230,230,.8)',
						filter:          'drop-shadow(0 0 0.5em #00BFFF)',
						userSelect:      'none',
						cursor:          'pointer',
					}}
					onClick = { step2.onClick }
				>
					{ (step2 && 'text' in step2) ? step2.text : '' }
				</div>
			) : (``) }
		</Atoms.Row>
	);
}

const baseStyle = (style) => css`
	flex-direction: column;
	padding-top:    0.1em;
	${style}
`;

export {
	Setup,
}
