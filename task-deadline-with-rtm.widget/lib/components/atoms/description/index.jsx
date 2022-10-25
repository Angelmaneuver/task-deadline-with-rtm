import { css } from 'uebersicht';

const Description = ({ className, style, text }) => {
	return (
		<div
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
		>
			{ text }
		</div>
	);	
}

const baseStyle = (style) => css`
	font-size:   0.1em;
	white-space: nowrap;
	${style}
`;

export {
	Description,
};
