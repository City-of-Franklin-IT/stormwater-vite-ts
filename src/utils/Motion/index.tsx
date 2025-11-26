import { motion } from "motion/react"
import { motionPropsMap } from "@/helpers/utils"

// Types
import { MotionPropsType } from "@/helpers/utils"

function Motion({ animation, className, children }: { animation: MotionPropsType, className?: string, children: React.ReactElement }) {

  return (
    <motion.div
      { ...motionPropsMap.get(animation) }
      className={className}>
        {children}
    </motion.div>
  )
}

export default Motion