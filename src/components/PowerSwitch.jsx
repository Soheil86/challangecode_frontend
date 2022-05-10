import { updateTabData, turnOffPlugins, turnOnPuglins } from '../controller'
import { useEffect, useState } from 'react'
import styles from '../styles/switch.module.css'

const PowerSwitch = ({ state, tabData, setPluginState }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handlePowerSwitch = (e) => {
    setIsChecked(e.target.checked)
    let newTabData
    const checkedState = e.target.checked ? 'active' : 'disabled'

    if (checkedState === 'active') newTabData = turnOnPuglins(tabData)
    else newTabData = turnOffPlugins(tabData)

    updateTabData(newTabData, e.target.checked ? 'active' : 'disabled')
    setPluginState(checkedState)
  }

  useEffect(
    function () {
      console.log(state)
      setIsChecked(state === 'active')
    },
    [state]
  )

  return (
    <label>
      <input
        id='checkbox'
        type='checkbox'
        checked={isChecked}
        onClick={handlePowerSwitch}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  )
}

export default PowerSwitch
