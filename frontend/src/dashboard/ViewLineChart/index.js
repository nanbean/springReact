import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
	{ name: 'Mon', Activates: 2200, Viwes: 3400 },
	{ name: 'Tue', Activates: 1280, Viwes: 2398 },
	{ name: 'Wed', Activates: 5000, Viwes: 4300 },
	{ name: 'Thu', Activates: 4780, Viwes: 2908 },
	{ name: 'Fri', Activates: 5890, Viwes: 4800 },
	{ name: 'Sat', Activates: 4390, Viwes: 3800 },
	{ name: 'Sun', Activates: 4490, Viwes: 4300 }
];

function ViewLineChart () {
	return (
		<ResponsiveContainer width="99%" height={320}>
			<LineChart data={data}>
				<XAxis dataKey="name" />
				<YAxis />
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="Activates" stroke="#82ca9d" />
				<Line type="monotone" dataKey="Viwes" stroke="#8884d8" activeDot={{ r: 8 }} />
			</LineChart>
		</ResponsiveContainer>
	);
}

export default ViewLineChart;