const fontColor = `
	color: rgba(230,230,230,.8);

	&.blue {
		text-shadow: #00BFFF 0.1em  0.1em 0.3em, #00BFFF -0.1em  0.1em 0.3em,
					 #00BFFF 0.1em -0.1em 0.3em, #00BFFF -0.1em -0.1em 0.3em;
	}

	&.yellow {
		text-shadow: #FFEF6C 0.1em  0.1em 0.3em, #FFEF6C -0.1em  0.1em 0.3em,
					 #FFEF6C 0.1em -0.1em 0.3em, #FFEF6C -0.1em -0.1em 0.3em;
	}

	&.red {
		text-shadow: #DC143C 0.1em  0.1em 0.3em, #DC143C -0.1em  0.1em 0.3em,
					 #DC143C 0.1em -0.1em 0.3em, #DC143C -0.1em -0.1em 0.3em;
	}
`;

const boxShadowColor = `
	&.blue {
		box-shadow:  0 0 0.5em #00BFFF;
	}

	&.yellow {
		box-shadow:  0 0 0.5em #FFEF6C;
	}

	&.red {
		box-shadow:  0 0 0.5em #DC143C;
	}
`;

const dropShadowColor = `
	&.blue:before {
		filter: drop-shadow(0 0 0.5em #00BFFF);
	}

	&.yellow:before {
		filter: drop-shadow(0 0 0.5em #FFEF6C);
	}

	&.red:before {
		filter: drop-shadow(0 0 0.5em #DC143C);
	}
`;


export {
	fontColor,
	boxShadowColor,
	dropShadowColor,
}
