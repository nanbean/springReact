import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
	primary: {
		main: '#2196f3',
		contrastText: '#FAFAFA'
	},
	secondary: {
		main: '#f50057',
		contrastText: '#FAFAFA'
	}
};

const themeName = 'Dodger Blue Razzmatazz Echidna';

const typography = {
	useNextVariants: true
};

export default createMuiTheme({ palette, typography, themeName });
