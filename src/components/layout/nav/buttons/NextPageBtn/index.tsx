import icon from '@/assets/icons/next/next.svg'

type NextPageBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }

function NextPageBtn(props: NextPageBtnProps) {
  
  return (
    <button 
      type="button"
      className="btn btn-square btn-neutral"
      { ...props }>
        <div className="flex flex-col gap-1 justify-around">
          <img src={icon} className={'w-6'} />
        </div>
    </button>
  )
}

export default NextPageBtn