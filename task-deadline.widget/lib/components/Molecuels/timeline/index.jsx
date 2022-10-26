import { css }      from 'uebersicht';
import { Headline } from './headline.jsx';
import { Detail }   from './detail.jsx';

function getColorSetting(color) {
	if (!color) {
		return [undefined, undefined];
	} else {
		const line  = 'line'  in color ? color.line  : undefined;
		const other = 'other' in color ? color.other : undefined;

		return [line, other];
	}
}

const baseStyle = (style) => css`
	align-items: flex-start;

	& > *:first-child {
		width:        8em;
		min-width:    8em;
		max-width:    8em;
		flex-grow:    1;
	}

	& > *:nth-child(2) {
		padding-left: 1em;
		flex-grow:    9;
	}

	${style}
`;

export {
	getColorSetting,
	baseStyle,
	Headline,
	Detail,
};
