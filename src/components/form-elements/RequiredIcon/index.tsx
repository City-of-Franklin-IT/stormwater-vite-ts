import icon from "@/assets/icons/required/required.svg"

function RequiredIcon({ required }: { required: boolean | undefined }) {
  if(!required) return null

  return (
    <div className="mb-auto mt-1">
      <img src={icon} alt="required icon" className="w-3" />
    </div>
  )
}

export default RequiredIcon