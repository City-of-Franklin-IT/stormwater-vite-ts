export const handleNavDropdown = (active: boolean) => {
  const className = `btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none ${ active ? 'text-warning' : 'text-neutral-content' }`

  return className
}