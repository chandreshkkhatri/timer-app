import * as Tabs from '@radix-ui/react-tabs';

import Timer from './Timer';
import WorldClock from './WorldClock';
import './styles.css';
import './App.css';


function App() {
  return (
      <Tabs.Root className="TabsRoot" defaultValue="timer">
        <Tabs.List className="TabsList">
          <Tabs.Trigger className="TabsTrigger" value="timer">Timer</Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="world-clock">World Clock</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="timer">
          <Timer />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="world-clock">
          <WorldClock />
        </Tabs.Content>
      </Tabs.Root>
  );
}

export default App;
