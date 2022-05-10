import { useState } from 'react'
import { useEffect } from 'react'
import Plugin from './components/Plugin'
import Sidebar from './components/Sidebar'
import { url, getPluginState, filterPlugins } from './controller'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('tab1')
  const [tabPlugins, setTabPlugins] = useState([])
  const [tabData, setTabData] = useState({})
  const [pluginState, setPluginState] = useState('')

  useEffect(
    function () {
      const getPlugins = async () => {
        const response = await fetch(url)
        const apiResponse = await response.json()
        const { plugins, allPlugins, tabdata } = apiResponse

        setTabData(tabdata)
        setPluginState(allPlugins)

        const filteredPlugins = filterPlugins(plugins, activeTab, apiResponse)
        filteredPlugins.forEach((plugin) => {
          const pluginState = getPluginState({
            data: apiResponse,
            pluginName: plugin.title,
            tabName: activeTab,
          })
          plugin['state'] = pluginState
        })
        setTabPlugins(filteredPlugins)
      }
      getPlugins()
    },
    [activeTab, pluginState]
  )

  return (
    <div className='App'>
      <div>
        <Sidebar
          activeTab={activeTab}
          selectTab={setActiveTab}
          pluginState={pluginState}
          setPluginState={setPluginState}
          tabData={tabData}
        />
      </div>
      <div className='tab'>
        <p>
          {activeTab === 'tab1'
            ? 'Marketing Plugins'
            : activeTab === 'tab2'
            ? 'Finance Plugins'
            : 'Personal Plugins'}
        </p>
        <div className='plugin-container'>
          {tabPlugins.map((plugin) => (
            <Plugin
              title={plugin.title}
              tabData={tabData}
              content={plugin.description}
              state={plugin.state}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
