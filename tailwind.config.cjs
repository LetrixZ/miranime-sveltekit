const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			screens: {
				'tablet': '640px',
				'laptop': '1024px',
				'desktop': '1280px',
				'3xl': '2048px'
			},
		}
	},

	plugins: []
};

module.exports = config;
