// Types
import { Path } from "react-hook-form"
import * as AppTypes from "@/context/App/types"

// Components
import RequiredIcon from "../RequiredIcon"
import FormError from "../FormError"

type FormLabelProps = { 
  name: Path<AppTypes.SiteCreateInterface|AppTypes.ConstructionViolationCreateInterface|AppTypes.ComplaintCreateInterface|AppTypes.IllicitDischargeCreateInterface|AppTypes.SiteLogCreateInterface|AppTypes.ContactCreateInterface>
  required?: boolean
  error?: string
  children: React.ReactNode 
}

function FormLabel(props: FormLabelProps) {
  if(props.error) return (
    <FormError error={props.error} />
  )

  return (
    <label data-testid="form-label" htmlFor={props.name} className="flex label text-neutral-content font-[Play]">
      <div className="flex items-center gap-1">
        {props.children}
        <RequiredIcon required={props.required} />
      </div>
    </label>
  )
}

export default FormLabel