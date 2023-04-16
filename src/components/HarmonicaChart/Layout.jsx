import { useEffect, useState } from "react"
import { reorderBaseNotesByKey, layoutPattern } from "../../utilities/harmonica-service"
import { Cell } from "./Cell"
import './cell.css'


const octavesQty = 3


const getSequenceForOctaves = (layoutPattern, octavesQty, octaveNotes) => {
    let sequence = []
    for (let i = 0; i < octavesQty; i++) {
        let octave = []
        layoutPattern.map(n => {
            return octave.push({
                note: octaveNotes[n - 1]
            })
        })

        sequence.push(...octave)
    }
    return sequence
}

const isIgnored = (cellIndex, octavesQty) => {
    const baseIngored = [4, 13, 15]
    let allIgnored = [...baseIngored]
    for (let o = 1; o < octavesQty; o++) {
        baseIngored.map((i) => {
            allIgnored.push(i + 16 * o)
        })
    }
    return allIgnored.includes(cellIndex)
}

export const makeData = (seq, playNotes) => {
    let startGraph = false

    let maxId
    let octave = 0
    let data = seq.map((i, idx) => {
        // const octave = (idx - (idx % 16)) / 16 
        const isInkey = playNotes.includes(i.note)
        const showMarker = isInkey && !isIgnored(idx, octavesQty)
        let idForArrows, nextId, isTonic = null
        
        if (showMarker) {
            isTonic = i.note === playNotes[0]
            if (isTonic) {
                startGraph = true
                octave = octave + 1
                console.log('isTONIC', isTonic, octave)
            }
            const noteIdx = playNotes.indexOf(i.note)
            let id = noteIdx + 7 * octave
            console.log('Octave', octave, 'idx:', idx, 'noteIdx:', noteIdx, 'id:', id)
            idForArrows = id
            maxId = id
        }

        return {
            label: i.note,
            isInkey,
            showMarker: showMarker && startGraph,
            isTonic,
            idForArrows,
            nextId,
        }
    })
    console.log('data', data)


    data = data.map(i => {

        // const idForArrows = i.idForArrows < maxId ? i.idForArrows : null
        let nextId = i.idForArrows + 1
   
        console.log('MAX', maxId)
        
        return { ...i, nextId: nextId <= maxId ? nextId : null }
    })


    return data
}


export const Layout = ({
    harmonicaKey,
    playKey,
    scaleMode,
    playNotes
}) => {
    const [keyNotes] = useState(reorderBaseNotesByKey(harmonicaKey))
    const [fullSequence] = useState(getSequenceForOctaves(layoutPattern, octavesQty, keyNotes))
    const [data, setData] = useState([])
    console.log('Play notes', playNotes)

    useEffect(() => {
        setData(makeData(fullSequence, playNotes))
    }, [fullSequence, playNotes])

    // console.log('DATA', data)
    // console.log('notes', keyNotes, fullSequence)

    return <section className="new-layout">

        <div className='harmonica-rows'>

            {data.map((i, idx) => {
                return <Cell key={i.label + idx}
                    label={i.label}
                    isInKey={i.isInkey}
                    showMarker={i.showMarker}
                    isTonic={i.isTonic}
                    idForArrows={i.idForArrows}
                    nextId={i.nextId}
                />
            })}
        </div>
    </section>
}