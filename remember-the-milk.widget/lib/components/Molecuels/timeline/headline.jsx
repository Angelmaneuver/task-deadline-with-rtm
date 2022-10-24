import * as Atoms    from '../../atoms';
import {
	getColorSetting,
	baseStyle,
}                    from './index.jsx';

const Headline  = ({ className, color, style, date }) => {
	const [line, other] = getColorSetting(color);

	return (
		<Atoms.Row
			className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
		>
			<Atoms.Date
				color = { other }
				date  = { date }
			/>
			<div/>
		</Atoms.Row>
	);
}

export {
	Headline,
};
