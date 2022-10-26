import { css }             from 'uebersicht';
import { dropShadowColor } from '../style/color';

const CentralLine = ({ className, color, style, children }) => {
	return (
		<div
			className = { `${ className ? className : '' } ${baseStyle(style)} ${ color ? color : 'blue' }`.trim() }
		>
			{ children }
		</div>
	);	
}

const baseStyle = (style) => css`
	position: relative;

	&:before {
		content:    '';
		position:   absolute;
		top:        0;
		left:       50%;
		width:      0.35em;
		height:     100%;
		background: rgba(230,230,230,.5);
		transform:  translateX(-50%);
	}

	${dropShadowColor}
	${style}
`;

export {
	CentralLine,
};
