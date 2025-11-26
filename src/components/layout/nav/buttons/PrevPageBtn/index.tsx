import icon from '@/assets/icons/prev/prev.svg'

type PrevPageBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled?: boolean }

function PrevPageBtn(props: PrevPageBtnProps) {

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

export default PrevPageBtn