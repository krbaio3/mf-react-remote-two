import { addDays, format } from 'date-fns';
import type React from 'react';
import { useState } from 'react';
import { DateRange, type RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file

type SelectionRange = {
  startDate: Date;
  endDate: Date;
  key: string | undefined;
};

export const DateRangePicker: React.FC = () => {
  const [state, setState] = useState<SelectionRange[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setState([
      {
        startDate: selection.startDate || new Date(),
        endDate: selection.endDate || new Date(),
        key: selection.key,
      },
    ]);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Select a Date Range</h2>
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
        className="rounded-md shadow-md"
      />
      <div className="p-4 bg-white rounded-md shadow-md">
        <h3 className="text-md font-medium">Selected Range</h3>
        <p>Start Date: {format(state[0].startDate, 'yyyy-MM-dd')}</p>
        <p>End Date: {format(state[0].endDate, 'yyyy-MM-dd')}</p>
      </div>
    </div>
  );
};
