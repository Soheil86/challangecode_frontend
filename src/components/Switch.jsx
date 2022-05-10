import { updateTabData, updatePluginState } from '../controller'
import { useEffect, useState } from 'react'
import styles from '../styles/switch.module.css'

const Switch = ({ state, tabData, title, tabName }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleSwitch = (e) => {
    setIsChecked(e.target.checked)
    const checkedState = e.target.checked ? 'active' : 'disabled'
    const newTabData = updatePluginState({
      tabData,
      pluginName: title,
      state: checkedState,
      tabName,
    })
    updateTabData(newTabData)
  }

  useEffect(
    function () {
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
        onClick={(e) => handleSwitch(e)}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  )
}

export default Switch
