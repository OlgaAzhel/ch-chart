
const CurrentKeyNotes = ({playNotes}) => {
    return <h4>{playNotes.map(n => <span className="note-span" key={n}>{n}</span>)}</h4>
}

export default CurrentKeyNotes