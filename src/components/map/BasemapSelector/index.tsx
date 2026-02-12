import styles from "./BasemapSelector.module.css"

// Components
import * as Components from "./components"

// Types
import { BasemapSelectProps } from "./utils"

function BasemapSelector(props: BasemapSelectProps) {

  return (
    <div className="flex flex-col">
      <label htmlFor="basemap selector" className={styles.label}>Basemap</label>
      <div className={styles.container}>
        <Components.BasemapSelect { ...props } />
      </div>
    </div>
  )
}

export default BasemapSelector