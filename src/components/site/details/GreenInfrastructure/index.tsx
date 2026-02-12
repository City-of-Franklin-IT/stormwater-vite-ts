import icon from "@/assets/icons/leaf/leaf.svg"

function GreenInfrastructure() {
  
  return (
    <div data-testid="green-infrastructure" className="flex flex-col gap-1 items-center" title={`Green Infrastructure`}>
      <img src={icon} alt="green infrastructure icon" className={"w-10"} />
      <div className="flex flex-col items-center">
        <span className="text-success text-center">Green</span>
      </div>
    </div>
  )
}

export default GreenInfrastructure