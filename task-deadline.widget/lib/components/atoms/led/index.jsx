import { css } from 'uebersicht';

const LED = ({ className, style, text, noMarquee, duration }) => {
	return (
		<div
			className = { `${ className ? className : '' } ${baseStyle(style, marquee(noMarquee, (duration ? duration : `${text && 'string' === typeof text ? text.length : '60'}s`)))}`.trim() }
		>
			{ ('string' === typeof(text) && text.length > 0) ? <span dangerouslySetInnerHTML={{ __html: text }}/> : '' }
		</div>
	);
}

const baseStyle = (style, marquee) => css`
	& {
		position:    relative;
		width:       100%;
		overflow:    hidden;
		color:       rgba(251,177,97,.8);
		font-size:   0.8em;
		font-weight: bold;
		text-shadow: 0 0 8em;
		outline:     1px solid rgba(93,93,99,.9);

		&:after {
			content:          '';
			position:         absolute;
			top:              0;
			left:             0;
			width:            100%;
			height:           100%;
			background-image: radial-gradient(transparent 0 1px, rgba(0,0,0,.7) 1px);
			background-size:  2px 2px;
		}

		& span {
			display:     inline-block;
			white-space: nowrap;
			${marquee}
		}
	}
	${style}
`;

function marquee(nomarquee, duration) {
	if (nomarquee) {
		return ``;
	}

	return `
	padding-left:              100%;
	animation-name:            marquee;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	animation-duration:        ${duration};
`;
}

export {
	LED,
};
