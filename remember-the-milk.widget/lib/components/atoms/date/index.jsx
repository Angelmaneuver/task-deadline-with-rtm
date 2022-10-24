import { css }      from 'uebersicht';
import {
	fontColor,
	boxShadowColor,
}                   from '../style';

const Date = ({ className, style, color, date }) => {
	return (
		<div
			className = { `${ className ? className : '' } ${baseStyle(style)} ${ color ? color : 'blue' }`.trim() }
		>
			{ date }
		</div>
	);	
}

const baseStyle = (style) => css`
	font-size:      0.9em;
	text-align:     center;
	vertical-align: middle;
	white-space:    nowrap;
	padding:        0.3em;
	border-radius:  0.2em;
	background:     rgba(51,49,50,.3);
	user-select:    none;

	${fontColor}
	${boxShadowColor}
	${style}
`;

export {
	Date,
};
