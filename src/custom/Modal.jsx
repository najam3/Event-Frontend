

// eslint-disable-next-line react/prop-types
const Modal = ({message}) => {
  return (
    <div className='modal-bg'>
        <section className="modal">
            <h1>{message}</h1>
        </section>
    </div>
  )
}

export default Modal