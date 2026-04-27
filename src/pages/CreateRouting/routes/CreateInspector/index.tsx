// Components
import Motion from "@/utils/Motion"
import FormContainer from "@/components/form-elements/FormContainer"
import CreateInspectorForm from "@/components/inspectors/forms/create/CreateInspectorForm"

function CreateInspector() {

  return (
    <Motion animation={"fadeInOut"}>
      <div className="m-auto my-10 w-3/4 2xl:w-3/5">
        <FormContainer>
          <CreateInspectorForm />
        </FormContainer>
      </div>
    </Motion>
  )
}

export default CreateInspector