import { css }       from 'uebersicht';
import * as Atoms    from '../../atoms';
import {
	getColorSetting,
	baseStyle
}                    from './index.jsx';

const Detail     = ({ className, color, style, datetimes }) => {
	const [line, other] = getColorSetting(color);

	return (
		0 === datetimes.length ? (
			<Atoms.Row
				className = { `${ className ? className : '' } ${baseStyle({ ...style, alignItems: 'stretch' })}`.trim() }
			>
				<Atoms.CentralLine
					color = { line }
				/>
				<div
					className = { `${emptyStyle(style)}`.trim() }
				/>
			</Atoms.Row>
		) : (
			datetimes.map((time) => {
				return (
					<Atoms.Row
						key       = { time.time }
						className = { `${ className ? className : '' } ${baseStyle({ ...style, alignItems: 'stretch' })}`.trim() }
					>
						<Atoms.CentralLine
							color = { line }
						/>
						<Atoms.Row style = {{ padding: '0.3em', lineHeight: '1.5em' }}>
							<Atoms.Time
								style = {{ minWidth: '5em' }}
								time  = { time.time }
								color = { other }
							/>
							<Atoms.Row
								className = { `${emptyStyle({ ...style, flexDirection: 'column', paddingLeft: '1em' })}`.trim() }
								>
								<Task
									tasks = { time.tasks }
									color = { other }
								/>
							</Atoms.Row>
						</Atoms.Row>
					</Atoms.Row>
				);
			})
		)
	);
}

const Task       = ({ color, style, tasks }) => (
	tasks.map((task) => (
		<Atoms.Task
			key         = { task }
			description = { task }
			color       = { color }
		/>
	)
));

const emptyStyle = (style) => css`
	min-height: 5em;
	${style}
`;

export {
	Detail,
};
