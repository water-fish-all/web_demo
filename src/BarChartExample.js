import React, { useEffect } from 'react';
import { Plot } from '@antv/g2plot';

const BarChartExample = () => {
    useEffect(() => {
        const data = [
            { time: '10:10', call: 4, waiting: 2, people: 2 },
            { time: '10:15', call: 2, waiting: 6, people: 3 },
            { time: '10:20', call: 13, waiting: 2, people: 5 },
            { time: '10:25', call: 9, waiting: 9, people: 1 },
            { time: '10:30', call: 5, waiting: 2, people: 3 },
            { time: '10:35', call: 8, waiting: 2, people: 1 },
            { time: '10:40', call: 13, waiting: 1, people: 2 },
        ];

        const plot = new Plot({
            container: 'bar-container',
            data,
            xField: 'time',
            yField: 'waiting',
            geometryOptions: [
                {
                    geometry: 'interval',
                    color: 'blue',
                },
            ],
        });

        plot.render();

        return () => {
            plot.destroy();
        };
    }, []);

    return <div id="bar-container" style={{ height: '400px' }} />;
};

export default BarChartExample;
