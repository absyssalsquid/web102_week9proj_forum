import './CommentForm.css'

const CommentForm = ({value, onChange, onSubmit}) => {

    return(
        <div className=''>
            <form className='comment-form'>
                <textarea 
                    name='body' 
                    value={value} 
                    placeholder='Leave some marginalia'
                    onChange={onChange} />
                <button onClick={onSubmit}>➳</button>
            </form>
        </div>
    )
}

export default CommentForm