import * as Components from './components'

function Footer() {

  return (
    <footer className="flex flex-col relative h-[24vh] bg-neutral mt-auto">
      <span className="text-neutral-content text-xl font-[Ubuntu Sans] text-bold tracking-[.4rem] text-center m-auto">Developed by City of Franklin Information Technology</span>
      <Components.DocsBtn />
    </footer>
  )
}
export default Footer
