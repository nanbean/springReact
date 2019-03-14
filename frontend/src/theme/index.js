import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
	primary: { main: '#A50034' },
	secondary: { main: '#6b6b6b' }
};

const themeName = 'Burgundy Dove Gray Horses';

const typography = {
	useNextVariants: true
};

export default createMuiTheme({ palette, typography, themeName });
