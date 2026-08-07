import * as React from 'react';

const Logo = ( props: React.SVGProps< SVGSVGElement > ) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 560 560"
		width="100%"
		height="100%"
		{ ...props }
	>
		<rect width="560" height="560" rx="128" fill="#EFEDFA"></rect>
		<rect
			x="128"
			y="140"
			width="280"
			height="32"
			rx="16"
			fill="#12152B"
		></rect>
		<rect
			x="128"
			y="208"
			width="202"
			height="32"
			rx="16"
			fill="#40415C"
		></rect>
		<rect
			x="128"
			y="276"
			width="126"
			height="32"
			rx="16"
			fill="#6F7086"
		></rect>
		<path
			d="M373 299 L403 371 L459 385 L403 399 L373 471 L343 399 L281 385 L343 371 Z"
			fill="#6C63FF"
		></path>
	</svg>
);

export default Logo;
