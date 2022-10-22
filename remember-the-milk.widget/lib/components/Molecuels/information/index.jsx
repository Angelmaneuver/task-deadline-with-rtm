import { css } from 'uebersicht';

const Information = ({ className, style, children }) => {
	return (
		<div
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
		>
			{ children }
		</div>
	);
}

const baseStyle   = (style) => css`
	font-style:     italic;
	color:          rgba(230,230,230,.8);
	text-shadow:    #00BFFF 0.1em  0.1em 1em, #00BFFF -0.1em  0.1em 1em,
				    #00BFFF 0.1em -0.1em 1em, #00BFFF -0.1em -0.1em 1em;
	text-align:     center;

	&.error {
		text-shadow:    #DC143C 0.1em  0.1em 1em, #DC143C -0.1em  0.1em 1em,
						#DC143C 0.1em -0.1em 1em, #DC143C -0.1em -0.1em 1em;
		text-align:     left;
	}

	${style}
`;

export {
	Information,
};
