// Components
import Layout from "@/components/layout/Layout"
import Motion from "@/utils/Motion"
import FormContainer from "@/components/form-elements/FormContainer"
import CreateInspectorForm from "@/components/inspectors/forms/create/CreateInspectorForm"

function CreateInspector() {

  return (
    <Layout>
      <Motion animation={'fadeInOut'}>
        <div className="m-auto my-10 w-3/4 2xl:w-3/5">
          <FormContainer>
            <CreateInspectorForm />
          </FormContainer>
        </div>
      </Motion>
    </Layout>
  )
}

export default CreateInspector