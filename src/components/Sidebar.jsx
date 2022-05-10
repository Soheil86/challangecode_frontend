import styles from '../styles/sidebar.module.css'
import { IconContext } from 'react-icons'
import { FaThList, FaParachuteBox, FaCalendarAlt } from 'react-icons/fa'
import PowerSwitch from './PowerSwitch'

const Sidebar = ({
  activeTab,
  selectTab,
  setPluginState,
  pluginState,
  tabData,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Data<b>Guard</b>
      </p>
      <ul className={styles.tabs}>
        <li
          className={activeTab === 'tab1' ? styles.active : ''}
          onClick={() => selectTab('tab1')}
        >
          <IconContext.Provider
            value={{
              color: '#0b344b',
              style: { marginRight: '12px', fontSize: '24px' },
            }}
          >
            <FaThList />
          </IconContext.Provider>
          <span>Marketing</span>
        </li>
        <li
          className={activeTab === 'tab2' ? styles.active : ''}
          onClick={() => selectTab('tab2')}
        >
          <IconContext.Provider
            value={{
              color: '#0b344b',
              style: { marginRight: '12px', fontSize: '24px' },
            }}
          >
            <FaParachuteBox />
          </IconContext.Provider>
          <span>Finance</span>
        </li>
        <li
          className={activeTab === 'tab3' ? styles.active : ''}
          onClick={() => selectTab('tab3')}
        >
          <IconContext.Provider
            value={{
              color: '#0b344b',
              style: { marginRight: '12px', fontSize: '24px' },
            }}
          >
            <FaCalendarAlt />
          </IconContext.Provider>
          <span>Personnel</span>
        </li>
      </ul>
      <div
        className={`${styles.power} ${
          pluginState === 'disabled' ? styles.disabled : ''
        }`}
      >
        {pluginState === 'active' ? (
          <span>All plugins enabled</span>
        ) : (
          <span> All plugins disabled</span>
        )}
        <PowerSwitch
          state={pluginState}
          setPluginState={setPluginState}
          tabData={tabData}
        />
      </div>
    </div>
  )
}

export default Sidebar
