
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, BarChart, Bar } from 'recharts';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

interface GenreDistribution {
    genre: string;
    count: number;
    [key: string]: string | number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h3>
        <div style={{ width: '100%', height: 300 }}>
            {children}
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const { stats } = useData();
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#A0AEC0' : '#4A5568';

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Book Genres Distribution">
                    <ResponsiveContainer>
                        <PieChart>
                           // ...existing code...
                            <Pie
                                data={stats.genreDistribution as any[]}
                                dataKey="count"
                                nameKey="genre"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {stats.genreDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Monthly Borrows">
                    <ResponsiveContainer>
                        <LineChart data={stats.monthlyBorrows}>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A5568' : '#E2E8F0'} />
                            <XAxis dataKey="month" stroke={tickColor} />
                            <YAxis stroke={tickColor} />
                            <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF' }} />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Member Growth">
                    <ResponsiveContainer>
                        <AreaChart data={stats.memberGrowth}>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A5568' : '#E2E8F0'} />
                            <XAxis dataKey="date" stroke={tickColor} />
                            <YAxis stroke={tickColor} />
                            <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF' }} />
                            <Legend />
                            <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Stock by Category">
                    <ResponsiveContainer>
                        <BarChart data={stats.stockByCategory}>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A5568' : '#E2E8F0'} />
                            <XAxis dataKey="genre" stroke={tickColor} />
                            <YAxis stroke={tickColor} />
                            <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF' }} />
                            <Legend />
                            <Bar dataKey="stock" fill="#00C49F" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
};

export default Dashboard;
