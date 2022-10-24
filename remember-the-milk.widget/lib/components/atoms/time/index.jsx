import { css }       from 'uebersicht';
import { fontColor } from '../style';

const Time = ({ className, style, color, time }) => {
	return (
		<div
			className = { `${ className ? className : '' } ${baseStyle(style)} ${ color ? color : 'blue' }`.trim() }
		>
			{ time }
		</div>
	);	
}

const baseStyle = (style) => css`
	white-space:    nowrap;
	user-select:    none;

	${fontColor}
	${style}
`;

export {
	Time,
};
