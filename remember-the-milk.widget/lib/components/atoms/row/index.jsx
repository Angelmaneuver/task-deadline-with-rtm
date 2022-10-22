import { css } from 'uebersicht';

const Row        = ({ className, style, children, __html }) => {
	return (
		__html ? (
			<div
				className               = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
				dangerouslySetInnerHTML = {{ __html : __html }}
			/>
		) : (
			<div
				className = { `${ className ? className : '' } ${baseStyle(style)}`.trim() }
			>
				{ children }
			</div>
		)
	);
}

const baseStyle = (style) => css`
	display: flex;
	${style}
`;

export {
	Row,
};
