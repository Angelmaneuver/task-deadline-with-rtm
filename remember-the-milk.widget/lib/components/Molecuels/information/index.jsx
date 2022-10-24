import { css }    from 'uebersicht';
import * as Atoms from '../../atoms'

const Information = ({ className, style, children }) => {
	return (
		<div
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
		>
			<div>{ children }</div>
		</div>
	);
}

const baseStyle   = (style) => css`
	position:        relative;
	height:          100vh;

	div {
		position:    absolute;
		top:         50%;
		left:        50%;
		transform:   translate(-50%,-50%);
	}

	${Atoms.Style.fontColor}
	${style}
`;

export {
	Information,
};
