function FormError({ error }: { error: string | undefined }) {
  if(!error) return null

  return (
      <div className="text-error font-[play] uppercase w-fit">{error}</div>
  )
}

export default FormError