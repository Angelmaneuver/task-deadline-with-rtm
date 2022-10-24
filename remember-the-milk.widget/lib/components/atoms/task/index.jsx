import { css }       from 'uebersicht';
import { fontColor } from '../style';

const Task = ({ className, style, color, description }) => {
	return (
		<div
			className = { `${ className ? className : '' } ${baseStyle(style)} ${ color ? color : 'blue' }`.trim() }
		>
			{ description }
		</div>
	);	
}

const baseStyle = (style) => css`
	user-select:    none;

	${fontColor}
	${style}
`;

export {
	Task,
};
