import './HarmonicaChart.css'
import { useState } from "react";
import { baseNotes, checkAheadPreferred, chekBackwards, layoutPattern, notesFinder, reorderBaseNotesByKey, scales } from '../../utilities/harmonica-service'
import Xarrow from "react-xarrows";
import Selection from './Selection';
import CurrentKeyNotes from './CurrentKeyNotes';



export default function HarmonicaChart() {
    const [scale, setScale] = useState('Major Scale')
    const [playKey, setPlayKey] = useState('C')
    const [harmonicaKey, setHarmonicaKey] = useState('C')
    const [playNotes, setPlayNotes] = useState(notesFinder(playKey, scale))
    const notes = reorderBaseNotesByKey(harmonicaKey)


    function harmonicaKeyChange(evt) {
        const newHarmonicaKey = evt.target.value
        setHarmonicaKey(newHarmonicaKey)
    }
    function playScaleChange(evt) {
        const newScale = evt.target.value
        setScale(newScale)
        setPlayNotes(notesFinder(playKey, newScale))
    }
    function playKeyChange(evt) {
        const newPlayKey = evt.target.value
        setPlayKey(newPlayKey)
        setPlayNotes(notesFinder(newPlayKey, scale))
    }
    const blockQty = 3

    console.log("THESE ARE PLAY NOTES", playNotes)


    let currentHarmonicaPattern = layoutPattern.concat(layoutPattern).concat(layoutPattern)
    let fullPattern = currentHarmonicaPattern.map((el, idx) => {
        return notes[el - 1]
    })

    let currentFullNotesLayout = []
    fullPattern.map((i, idx) => {
        if (idx <= 15) {
            currentFullNotesLayout.push({ 'note': i, 'block': 1, 'pos': idx + 1 })
        } else if (idx > 15 && idx < 32) {
            currentFullNotesLayout.push({ 'note': i, 'block': 2, 'pos': idx - 16 + 1 })
        } else {
            currentFullNotesLayout.push({ 'note': i, 'block': 3, 'pos': idx - 32 + 1 })
        }
    })

    let currentHighlighted = currentFullNotesLayout.filter(note => {
        return playNotes.includes(note.note)
    })

    console.log("ALL HIGHLIGHTED:", currentHighlighted)
    console.log("ALL NOTES SEQUENCE WE PLAY IN KEY OF:", playNotes[0], playNotes)

    let prefferedPositions = [2, 3, 6, 7, 10, 11, 14, 15]


    function resultSequenceFinder(notesInPlay, highlighted, noteSequence = [], order = 0, blocksQty) {


        for (let i = 0; i < highlighted.length; i++) {
            console.log("looking for note:", notesInPlay[order], "at ", highlighted[i].note)
            if (highlighted[i].note === notesInPlay[order]) {

                if (!prefferedPositions.includes(highlighted[i].pos) && checkAheadPreferred(i, highlighted, notesInPlay[order], notesInPlay[order + 1])) {

                    noteSequence.push(checkAheadPreferred(i, highlighted, notesInPlay[order], notesInPlay[order + 1]))
                  
                    order++
                } else {
                    noteSequence.push(highlighted[i])
                  
                    order++
                }
            }
            if (chekBackwards(i, highlighted, notesInPlay[order])) {
                noteSequence.push(chekBackwards(i, highlighted, notesInPlay[order]))
         
                i = i - 1
                order++
            }

        }


        console.log("Note sequence", noteSequence)
        // repeat sequence blocksQty times:
        let extendedSequence = [...noteSequence]
       
        for (let i = 1; i < blocksQty; i++) {
            noteSequence.forEach(note => {
                let newBlock = note.block + i
                let newNoteEl = { 'note': note.note, 'block': newBlock, 'pos': note.pos }
                console.log("Pushing into extended sequence",newNoteEl)
                extendedSequence.push(newNoteEl)
            })
        }
        console.log("Full sequence",extendedSequence)
        return extendedSequence
    }


    let resultSequence = resultSequenceFinder(playNotes, currentHighlighted, [], 0, blockQty)

    console.log("Layout pattern:", layoutPattern.length)
    
    let sortedResultSequence = resultSequence.sort((a,b) => a.block - b.block || a.pos - b.pos)
    console.log("Note Sequence:", resultSequence)
    console.log("Note SORTED Sequence:", sortedResultSequence)

    let notesLayout = []
    for (let block = 1; block <= blockQty; block++) {
        layoutPattern.forEach((i, idx) => {
            let newNoteObj = { 'note': notes[i - 1], 'block': block, 'pos': idx + 1 }
            let sequenceIdx = resultSequence.findIndex(el => {
       
                return el.note === newNoteObj.note && el.block === newNoteObj.block && el.pos === newNoteObj.pos
            })
            if (sequenceIdx > - 1) {
                newNoteObj.id = sequenceIdx
            }

            notesLayout.push(newNoteObj)
        })
        console.log("This is notes layout:",notesLayout)
    }




    return (
        <>
            <p>THIS IS YOUR HARMONICA NOTES LAYOUT</p>
            <section id="settings">
                <Selection
                    label='Harmonica key'
                    value={harmonicaKey}
                    onSelect={harmonicaKeyChange}
                    options={baseNotes}
                />

                <Selection 
                    label='Scale' 
                    value={scale}
                    onSelect={playScaleChange}
                    options={Object.keys(scales)}
                    />

                <Selection
                    label='Play Key'
                    value={playKey}
                    onSelect={playKeyChange}
                    options={baseNotes}
                />
                
            </section>

            <CurrentKeyNotes playNotes={playNotes} />

            <section id="layout">

                <div id='chart'>

                    {
                        notesLayout.slice(0, 16).map((i, idx) => {


                            return <>
                                {playNotes.includes(i.note) && <div
                                    className="highlighted"
                                    key={idx}
                                    id="cell"

                                >
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === i.note && el.pos === idx + 1 && index !== 0 && el.block === 1
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}>
                                                {notesLayout.find((e)=>{ return e.id === i.id + 1}) && <Xarrow
                                                start={i.id.toString()}
                                                end={(i.id + 1).toString()}
                                                showHead={false}
                                                strokeWidth={2}
                                                tailSize={2}
                                            />
                                            }
                                            🔹
                                        </span>

                                    }
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === i.note && el.pos === idx + 1 && index === 0 && el.block === 1
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}>
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) && <Xarrow
                                                    start={i.id.toString()}
                                                    end={(i.id + 1).toString()}
                                                    showHead={false}
                                                    strokeWidth={2}
                                                    tailSize={2}
                                                />
                                                
                                                }
                                            🔸
                                        </span>
                                    }

                                    {i.note}
                                </div>
                                }

                                {!playNotes.includes(i.note) && <div
                                    key={idx}
                                    id="cell"
                                >
                                    {i.note}
                                </div>
                                }
                            </>
                        })
                    }

                </div>
                <div id='chart'>

                    {
                        notesLayout.slice(16, 32).map((i, idx) => {

                            return <>
                                {playNotes.includes(i.note) && <div
                                    className="highlighted"
                                    key={idx}
                                    id="cell"

                                >
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === i.note && el.pos === idx + 1 && index !== resultSequence.length / 3 && el.block === 2
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}>
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) &&<Xarrow
                                                start={(i.id).toString()}
                                                end={(i.id + 1).toString()}
                                                showHead={false}
                                                strokeWidth={2}
                                                tailSize={2}
                                            />
                                                }
                                            🔹
                                        </span>
                                    }
                                    {
                                        resultSequence.find((el, index) => {

                                            return el.note === i.note && el.pos === idx + 1 && index === resultSequence.length / 3 && el.block === 2
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}
                                        >
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) && <Xarrow
                                                    start={i.id.toString()}
                                                    end={(i.id + 1).toString()}
                                                    showHead={false}
                                                    strokeWidth={2}
                                                    tailSize={2}
                                                />
                                                }
                                            🔸
                                        </span>
                                    }

                                    {i.note}
                                </div>
                                }

                                {!playNotes.includes(i.note) && <div
                                    key={idx}
                                    id="cell"
                                >
                                    {i.note}
                                </div>
                                }
                            </>
                        })
                    }

                </div>
                <div id='chart'>

                    {
                        notesLayout.slice(32).map((i, idx) => {

                            return <>
                                {playNotes.includes(i.note) && <div
                                    className="highlighted"
                                    key={idx}
                                    id="cell"

                                >
                                    {
                                        resultSequence.find((el, index) => {

                                            return el.note === i.note && el.pos === idx + 1 && index !== resultSequence.length / 3 * 2 && el.block === 3
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}
                                        >
                                            🔹
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) &&<Xarrow
                                                start={i.id.toString()}
                                                end={(i.id + 1).toString()}
                                                showHead={false}
                                                strokeWidth={2}
                                                tailSize={2}
                                                
                                            />
                                                }
                                        </span>
                                    }
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === i.note && el.pos === idx + 1 && index === resultSequence.length / 3 * 2 && el.block === 3
                                        })

                                        && <span
                                            className='note'
                                            id={i.id}
                                        >
                                                {notesLayout.find((e) => { return e.id === i.id + 1 }) && <Xarrow
                                                    start={i.id.toString()}
                                                    end={(i.id + 1).toString()}
                                                    showHead={false}
                                                    strokeWidth={2}
                                                    tailSize={2}
                                    
                                                />
                                                }
                                            🔸
                                        </span>
                                    }

                                    {i.note}
                                </div>
                                }

                                {!playNotes.includes(i.note) && <div
                                    key={idx}
                                    id="cell"
                                >
                                    {i.note}
                                </div>
                                }
                            </>
                        })
                    }


                </div>
            </section>
        </>
    )
}

