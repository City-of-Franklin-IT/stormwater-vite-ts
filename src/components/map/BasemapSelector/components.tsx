import { basemapSelectOptions } from "./utils"

// Types
import { BasemapType } from "@/components/sites/context"
import { BasemapSelectProps } from "./utils"

export const BasemapSelect = (props: BasemapSelectProps) => {

  return (
    <select 
      value={props.basemap}
      onChange={props.onChange}
      className="select select-sm select-bordered text-neutral-content bg-neutral w-full">
        {basemapSelectOptions.map(option => (
          <BasemapSelectOption 
            key={`basemap-option-${ option.value }`}
            option={option} />
        ))}
    </select>
  )
}

const BasemapSelectOption = ({ option }: { option: { value: BasemapType, text: string } }) => {

  return (
    <option value={option.value} className="text-neutral-content bg-neutral">{option.text}</option>
  )
}