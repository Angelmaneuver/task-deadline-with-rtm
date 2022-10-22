import { css }    from 'uebersicht';
import * as Atoms from '../../atoms';

const Task       = ({
	className,
	style,
	description,
	deadline,
}) => {
	return (
		<Atoms.Row
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
		>
			<div
				style = {{
					flexGrow:    '1',
				}}
			>
				{ description }
			</div>
			<div
				style = {{
					paddingLeft: '0.5em',
					whiteSpace:  'nowrap',
			}}
			>
				{ deadline }
			</div>
		</Atoms.Row>
	);
}

const baseStyle = (style) => css`
	font-size:    0.7em;
	padding-top:  0.5em;
	padding-left: 1.5em;

	&.red-zone {
		text-shadow: #DC143C 0.1em  0.1em 1em, #DC143C -0.1em  0.1em 1em,
					 #DC143C 0.1em -0.1em 1em, #DC143C -0.1em -0.1em 1em;
	}

	&.yellow-zone {
		text-shadow: #FFD700 0.1em  0.1em 1em, #FFD700 -0.1em  0.1em 1em,
					 #FFD700 0.1em -0.1em 1em, #FFD700 -0.1em -0.1em 1em;
	}

	${style}
`;

export {
	Task,
};
