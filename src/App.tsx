import { useMercariStore } from './store'
import HomeScreen from './components/HomeScreen'
import InputScreen from './components/InputScreen'
import OutputScreen from './components/OutputScreen'
import RestoreScreen from './components/RestoreScreen'
import SettingsScreen from './components/SettingsScreen'

function App() {
  const currentScreen = useMercariStore((state) => state.currentScreen)

  return (
    <div className="min-h-screen">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'input' && <InputScreen />}
      {currentScreen === 'output' && <OutputScreen />}
      {currentScreen === 'restore' && <RestoreScreen />}
      {currentScreen === 'settings' && <SettingsScreen />}
    </div>
  )
}

export default App
