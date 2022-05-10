import styles from '../styles/plugin.module.css'
import Switch from './Switch'

const Plugin = ({ title, content, state, activeTab, tabData }) => {
  return (
    <div className={styles.pluginContainer}>
      <h2 className={styles.pluginTitle}>{title}</h2>
      <Switch
        state={state}
        tabData={tabData}
        title={title}
        tabName={activeTab}
      />
      <p className={styles.pluginContent}>{content}</p>
    </div>
  )
}

export default Plugin
