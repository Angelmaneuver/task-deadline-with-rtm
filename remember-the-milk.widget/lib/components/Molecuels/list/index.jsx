import { css }    from 'uebersicht';
import * as Atoms from '../../atoms';

const List = ({
	className,
	style,
	name,
	children,
}) => {
	return (
		<section
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
		>
			<div className = 'name'>{ name }</div>
			<Atoms.Row
				style = {{
					flexDirection: 'column',
				}}
			>
				{ children }
			</Atoms.Row>
		</section>
	);
}

const baseStyle = (style) => css`
	font-size:     1.2em;
	padding:       0.3em;
	margin:        0.3em;
	font-style:    italic;
	color:         rgba(230,230,230,.8);
	text-shadow:   #00BFFF 0.1em  0.1em 1em, #00BFFF -0.1em  0.1em 1em,
	               #00BFFF 0.1em -0.1em 1em, #00BFFF -0.1em -0.1em 1em;
	${style}
`;

export {
	List,
}
