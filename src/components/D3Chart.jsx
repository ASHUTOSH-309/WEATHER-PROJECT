import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


const D3Chart = () => {
  // Sample data - in real application, this would come from your backend
  const data = [
    {
      year: 1750,
      China: 0,
      US: 0,
      India: 0,
      Germany: 0,
      Brazil: 0,
      France: 0,
      UK: 0,
    },
    {
      year: 1931,
      China: 51.90,
      US: 1480,
      India: 38.85,
      Germany: 385.96,
      Brazil: 4.17,
      France: 217.49,
      UK: 412.21,
    },
    {
      year: 1950,
      China: 80,
      US: 2200,
      India: 50,
      Germany: 450,
      Brazil: 20,
      France: 250,
      UK: 450,
    },
    {
      year: 2022,
      China: 10000,
      US: 4800,
      India: 2500,
      Germany: 700,
      Brazil: 500,
      France: 300,
      UK: 350,
    },
  ];

  const COLORS = {
    China: '#1f77b4',
    US: '#8b4513',
    India: '#673ab7',
    Germany: '#ff7f0e',
    Brazil: '#d62728',
    UK: '#2196f3',
    France: '#00bcd4',
  };

  return (
    <Card className="w-full">
      


      <CardHeader>
        <CardTitle>Annual CO₂ emissions</CardTitle>
        <p className="text-sm text-gray-500">
          Carbon dioxide (CO₂) emissions from fossil fuels and industry. Land-use change is not included.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                type="number"
                domain={[1750, 2022]}
                tickCount={7}
              />
              <YAxis
                label={{ value: 'billion tonnes', angle: -90, position: 'insideLeft' }}
                domain={[0, 10000]}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="China"
                stroke={COLORS.China}
                dot={false}
                strokeWidth={2}
                name="China"
              />
              <Line
                type="monotone"
                dataKey="US"
                stroke={COLORS.US}
                dot={false}
                strokeWidth={2}
                name="United States"
              />
              <Line
                type="monotone"
                dataKey="India"
                stroke={COLORS.India}
                dot={false}
                strokeWidth={2}
                name="India"
              />
              <Line
                type="monotone"
                dataKey="Germany"
                stroke={COLORS.Germany}
                dot={false}
                strokeWidth={2}
                name="Germany"
              />
              <Line
                type="monotone"
                dataKey="Brazil"
                stroke={COLORS.Brazil}
                dot={false}
                strokeWidth={2}
                name="Brazil"
              />
              <Line
                type="monotone"
                dataKey="UK"
                stroke={COLORS.UK}
                dot={false}
                strokeWidth={2}
                name="United Kingdom"
              />
              <Line
                type="monotone"
                dataKey="France"
                stroke={COLORS.France}
                dot={false}
                strokeWidth={2}
                name="France"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default D3Chart;