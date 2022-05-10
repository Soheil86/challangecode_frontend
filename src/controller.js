export const url = 'http://localhost:8000/data'

export const extractPlugins = (data) => {
  const plugins = Object.keys(data.plugins)
  return plugins
}

export const getPluginContents = (data, plugins) => {
  data.plugins.forEach((plugin) => {})
}

export const filterPlugins = (plugins, tabName, apiResponse) => {
  const pluginKeys = Object.keys(plugins)
  const pluginArray = []
  pluginKeys.forEach((key) => {
    if (
      !apiResponse.tabdata[tabName].active.find((plugin) => plugin === key) &&
      !apiResponse.tabdata[tabName].disabled.find((plugin) => plugin === key) &&
      !apiResponse.tabdata[tabName].inactive.find((plugin) => plugin === key)
    ) {
      delete plugins[key]
    } else pluginArray.push(plugins[key])
  })
  return pluginArray
}

export const getPluginState = ({ data, pluginName, tabName }) => {
  pluginName = pluginName.replace(/\s+/g, '')
  pluginName = pluginName.toLowerCase()
  if (data.tabdata[tabName].active.find((plugin) => plugin === pluginName))
    return 'active'
  if (data.tabdata[tabName].disabled.find((plugin) => plugin === pluginName))
    return 'disabled'
  return 'inactive'
}

export const updatePluginState = ({ tabData, pluginName, state, tabName }) => {
  const newTabData = filterState(tabData, pluginName, state, tabName)
  return newTabData
}

const filterState = (tabData, pluginName, state, tabName) => {
  pluginName = pluginName.replace(/\s+/g, '')
  pluginName = pluginName.toLowerCase()
  tabData[tabName]['inactive'] = tabData[tabName]['inactive'].filter(
    (element) => {
      return element !== pluginName
    }
  )
  tabData[tabName]['disabled'] = tabData[tabName]['disabled'].filter(
    (element) => element !== pluginName
  )
  tabData[tabName]['active'] = tabData[tabName]['active'].filter(
    (element) => element !== pluginName
  )
  tabData[tabName][state].push(pluginName)
  return tabData
}

export const turnOffPlugins = (tabData) => {
  const tabList = ['tab1', 'tab2', 'tab3']
  tabList.forEach((tab) => {
    tabData[tab].active.forEach((plugin) => {
      tabData[tab].disabled.push(plugin)
    })
    tabData[tab].inactive.forEach((plugin) => {
      tabData[tab].disabled.push(plugin)
    })
    tabData[tab].inactive = []
    tabData[tab].active = []
  })

  return tabData
}

export const turnOnPuglins = (tabData) => {
  const tabList = ['tab1', 'tab2', 'tab3']

  tabList.forEach((tab) => {
    tabData[tab].disabled.forEach((plugin) => {
      tabData[tab].active.push(plugin)
    })
    tabData[tab].inactive.forEach((plugin) => {
      tabData[tab].active.push(plugin)
    })
    tabData[tab].disabled = []
    tabData[tab].inactive = []
  })
  return tabData
}

export async function updateTabData(tabdata, allPlugins) {
  console.log('updatees', allPlugins)
  await fetch('http://localhost:8000/data', {
    method: 'PATCH',
    body: JSON.stringify({
      tabdata,
      allPlugins,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return
}
