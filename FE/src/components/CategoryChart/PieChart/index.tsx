import React, { useEffect } from 'react';

import { v4 } from 'uuid';
import { useRootData } from '../../../store/DateInfo/dateInfoHook';
import ChartColorCollections from '../../../util/chartColorCollection';
import './pieChart.scss';

export default function PieChart({ chartInfo, refArr }) {
  const DateInfo = useRootData(store => store.nowCalendarInfo);

  const drawAnimation = () => {
    if (chartInfo.length !== 0) {
      refArr.forEach((_, i) => {
        const donut = refArr[i].current;
        const deg = 3.6 * (100 - Number(donut.dataset.per));
        const r = Number(donut.dataset.radius);
        donut.style.strokeDasharray = r * 3.141592 * 2;
        donut.style.strokeDashoffset = r * 3.141592 * 2;
        donut.style.setProperty('--result', 2 * 3.141592 * r * (deg / 360));
      });
    }
  };

  useEffect(() => {
    drawAnimation();
  }, [chartInfo, drawAnimation]);

  return (
    <>
      {chartInfo.map((el, i) => {
        return (
          <svg
            key={v4()}
            // key={DateInfo.year + DateInfo.month + el.category}
            className="s_donut"
            width="300"
            height="300"
          >
            <circle
              ref={refArr[i]}
              className="donut"
              cx="150"
              cy="150"
              r="125"
              data-radius="125"
              stroke={`${ChartColorCollections[i]}`}
              strokeDasharray="1"
              strokeDashoffset="0"
              data-per={`${el.percent}`}
              transform={`rotate(${el.startPoint} 150 150)`}
            />
            <text className="txt" y="150" transform="translate(150)">
              <tspan x="0" textAnchor="middle">
                Statistics
              </tspan>
            </text>
          </svg>
        );
      })}
    </>
  );
}
