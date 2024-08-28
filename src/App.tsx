import './App.css';
import { DateRangePicker } from './components/data-range-picker.tsx';

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <DateRangePicker />
      </div>
    </div>
  );
};

export default App;
