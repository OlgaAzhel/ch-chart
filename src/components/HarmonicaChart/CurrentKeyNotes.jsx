
const CurrentKeyNotes = ({playNotes}) => {

    return (

        <div className="notes-plate shadow-sm p-3 mb-5 bg-body-tertiary rounded p-3 mx-auto p-2">{playNotes.map(n => <span className="note-span " key={n}>{n}</span>)}</div>
    )
    
}

export default CurrentKeyNotes