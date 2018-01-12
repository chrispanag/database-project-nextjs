import Link from 'next/link'

const AddButton = ({element}) => {
  var link = `add${element}`
  return (
    <Link href={link}>
      <button className="ui labeled icon button">
        <i className="add icon"></i>
          Add {element}
      </button>
    </Link>
  )
}

export default AddButton
