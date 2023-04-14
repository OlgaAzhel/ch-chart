import './HarmonicaChart.css'
import { useState } from "react";
import * as harmonicaService from '../../utilities/harmonica-service'
import Xarrow from "react-xarrows";



export default function HarmonicaChart() {
    const [scale, setScale] = useState('Major Scale')
    const [playKey, setPlayKey] = useState('C')
    const [harmonicaKey, setHarmonicaKey] = useState('C')
    const [playNotes, setPlayNotes] = useState(harmonicaService.notesFinder(playKey, scale))
    const notes = harmonicaService.reorderBaseNotesByKey(harmonicaKey)


    function harmonicaKeyChange(evt) {
        const newHarmonicaKey = evt.target.value
        setHarmonicaKey(newHarmonicaKey)
    }
    function playScaleChange(evt) {
        const newScale = evt.target.value
        setScale(newScale)
        setPlayNotes(harmonicaService.notesFinder(playKey, newScale))
    }
    function playKeyChange(evt) {
        const newPlayKey = evt.target.value
        setPlayKey(newPlayKey)
        setPlayNotes(harmonicaService.notesFinder(newPlayKey, scale))
    }
    const blockQty = 3

    console.log("THESE ARE PLAY NOTES", playNotes)


    let currentHarmonicaPattern = harmonicaService.layoutPattern.concat(harmonicaService.layoutPattern).concat(harmonicaService.layoutPattern)
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

                if (!prefferedPositions.includes(highlighted[i].pos) && harmonicaService.checkAheadPreferred(i, highlighted, notesInPlay[order], notesInPlay[order + 1])) {

                    noteSequence.push(harmonicaService.checkAheadPreferred(i, highlighted, notesInPlay[order], notesInPlay[order + 1]))
                  
                    order++
                } else {
                    noteSequence.push(highlighted[i])
                  
                    order++
                }
            }
            if (harmonicaService.chekBackwards(i, highlighted, notesInPlay[order])) {
                noteSequence.push(harmonicaService.chekBackwards(i, highlighted, notesInPlay[order]))
         
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

    console.log("Layout pattern:", harmonicaService.layoutPattern.length)
    
    let sortedResultSequence = resultSequence.sort((a,b) => a.block - b.block || a.pos - b.pos)
    console.log("Note Sequence:", resultSequence)
    console.log("Note SORTED Sequence:", sortedResultSequence)

    let notesLayout = []
    for (let block = 1; block <= blockQty; block++) {
        harmonicaService.layoutPattern.forEach((i, idx) => {
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

                <div className="setting">
                    <label>Harmonica key:</label>
                    <select name="harmonica-key"
                        onChange={harmonicaKeyChange}
                        value={harmonicaKey}

                    >
                        {
                            harmonicaService.baseNotes.map((note, idx) => {
                                return <option key={idx}>{note}</option>
                            })
                        }
                    </select>
                </div>
                <div className="setting">
                    <label>Scale:</label>
                    <select name="play-scale"
                        onChange={playScaleChange}
                        value={scale}

                    >
                        {
                            Object.keys(harmonicaService.scales).map((s, idx) => {
                                return <option key={idx}>{s}</option>
                            })
                        }
                    </select>
                </div>
                <div className="setting">
                    <label>Play Key:</label>
                    <select name="play-key"
                        onChange={playKeyChange}
                        value={playKey}

                    >

                        {
                            harmonicaService.baseNotes.map((k, idx) => {
                                return <option key={idx}>{k}</option>
                            })
                        }
                    </select>
                </div>
            </section>

            <h4>{playNotes.map(n => <span className="note-span">{n}</span>)}</h4>


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

