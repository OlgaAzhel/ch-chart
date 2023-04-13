import './HarmonicaChart.css'
import { useState } from "react";
import * as harmonicaService from '../../utilities/harmonica-service'




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


    console.log("THESE ARE PLAY NOTES", playNotes)


    let currentHarmonicaPattern = harmonicaService.layoutPattern.concat(harmonicaService.layoutPattern).concat(harmonicaService.layoutPattern)
    let fullPattern = currentHarmonicaPattern.map((el, idx) => {
        return notes[el - 1]
    })

    let currentFullNotesLayout = []
    fullPattern.map((i, idx) => {
        if (idx <= 15) {
            currentFullNotesLayout.push({ 'note': i, 'block': 1, 'pos': idx + 1 })
        } else if (idx > 15 && idx <= 32) {
            currentFullNotesLayout.push({ 'note': i, 'block': 2, 'pos': idx - 16 + 1 })
        } else {
            currentFullNotesLayout.push({ 'note': i, 'block': 3, 'pos': idx - 32 + 1 })
        }
    })

    let currentHighlighted = currentFullNotesLayout.filter(note => {
        return playNotes.includes(note.note)
    })
 
    console.log("ALL HIGHLIGHTED:", currentHighlighted)
    console.log("ALL NOTES IN PLAY:", playNotes)




    function resultSequenceFinder(notesInPlay, highlighted) {
        let noteSequence = []
        let prefferedPositions = [2, 3, 6, 7, 10, 11, 14, 15]
        let divider = highlighted.length / 3
        let blockOneHighlighted = highlighted.slice(0, divider)

        let blockTwoHighlighted = highlighted.slice(divider, divider * 2)

        let blockThreeHighlighted = highlighted.slice(divider * 2)

        let dictionary = {}

        for (let i = 0; i < notesInPlay.length; i++) {
            let lookingForNote = notesInPlay[i]
            let order = i + 1
            dictionary[order] = lookingForNote
        }
        console.log("THIS IS DIC", dictionary)
        let order = 1
        for (let j = 0; j < blockOneHighlighted.length; j++) {
            if (blockOneHighlighted[j].note === dictionary[order.toString()]) {
                // if current j is the last highlighted and it is outside the prefferred - check if the first in the next block's first matches the note is currently being searched
                if (j === blockOneHighlighted.length - 1 && !prefferedPositions.includes(blockOneHighlighted[j].pos) && prefferedPositions.includes(blockTwoHighlighted[0].pos)) {
                    noteSequence.push(blockTwoHighlighted[0])
                    order++
                // if (next in highlighted is inside preffered and current highlighted is outside, skip current and push the next):
                } else if (blockOneHighlighted[j + 1] && blockOneHighlighted[j + 1].note === dictionary[order.toString()] && prefferedPositions.includes(blockOneHighlighted[j + 1].pos)) {
                    noteSequence.push(blockOneHighlighted[j + 1])
                    order++
                } else {
                    noteSequence.push(blockOneHighlighted[j])
                    order++
                }
            }
            // if the last highlighted block cell does not mtch the note currently beign searched for, should check the next block
            if (j === blockOneHighlighted.length - 1 && blockOneHighlighted[j] !== dictionary[order.toString()]) {
                // repeat lojic inside the j loop:
                for (let k = 0; k < blockTwoHighlighted.length; k++) {
                    // if (next in highlighted is inside preffered and current highlighted is outside, skip current and push the next):
                    if (blockTwoHighlighted[k].note === dictionary[order.toString()]) {
                        // if (next in highlighted is inside preffered and current highlighted is outside, skip current and push the next):
                        if (blockTwoHighlighted[k + 1] && blockTwoHighlighted[k + 1].note === dictionary[order.toString()] && prefferedPositions.includes(blockTwoHighlighted[k + 1].pos)) {
                            noteSequence.push(blockTwoHighlighted[k + 1])
                            order++
                        } else {
                            noteSequence.push(blockTwoHighlighted[k])
                            order++
                        }
                    }
                }
            }
        }
        
        return noteSequence

    }


    let resultSequence = resultSequenceFinder(playNotes, currentHighlighted)
    console.log("Note Sequence:", resultSequence)






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
                        harmonicaService.layoutPattern.map((i, idx) => {


                            return <>
                                {playNotes.includes(notes[i - 1]) && <div
                                    className="highlighted"
                                    key={idx}
                                    id={`1${idx + 1}`}
                                >
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === notes[i - 1] && el.pos === idx + 1 && index !== 0 && el.block === 1
                                        })

                                        && <span
                                            className='note'>
                                            🔹
                                        </span>
                                    }
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === notes[i - 1] && el.pos === idx + 1 && index === 0
                                        })

                                        && <span
                                            className='note'>
                                            🔸
                                        </span>
                                    }

                                    {notes[i - 1]}
                                </div>
                                }

                                {!playNotes.includes(notes[i - 1]) && <div
                                    key={idx}>
                                    {notes[i - 1]}
                                </div>
                                }
                            </>
                        })
                    }

                </div>
                <div id='chart'>

                    {
                        harmonicaService.layoutPattern.map((i, idx) => {

                            return <>
                                {playNotes.includes(notes[i - 1]) && <div
                                    className="highlighted"
                                    key={idx}
                                    id={`2${idx + 1}`}
                                >
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === notes[i - 1] && el.pos === idx + 1 && index !== 0 && el.block === 2
                                        })

                                        && <span
                                            className='note'>
                                            🔹
                                        </span>
                                    }
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === notes[i - 1] && el.pos === idx + 1 && index === 0 && el.block === 2
                                        })

                                        && <span
                                            className='note'>
                                            🔸
                                        </span>
                                    }
                                    {notes[i - 1]}
                                </div>
                                }

                                {!playNotes.includes(notes[i - 1]) && <div
                                    key={idx}>
                                    {notes[i - 1]}
                                </div>
                                }
                            </>
                        })
                    }

                </div>
                <div id='chart'>

                    {
                        harmonicaService.layoutPattern.map((i, idx) => {

                            return <>
                                {playNotes.includes(notes[i - 1]) && <div
                                    className="highlighted"
                                    key={idx}
                                    id={`3${idx + 1}`}
                                >
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === notes[i - 1] && el.pos === idx + 1 && index !== 0 && el.block === 3
                                        })

                                        && <span
                                            className='note'>
                                            🔹
                                        </span>
                                    }
                                    {
                                        resultSequence.find((el, index) => {
                                            return el.note === notes[i - 1] && el.pos === idx + 1 && index === 0 && el.block === 3
                                        })

                                        && <span
                                            className='note'>
                                            🔸
                                        </span>
                                    }
                                    {notes[i - 1]}
                                </div>
                                }

                                {!playNotes.includes(notes[i - 1]) && <div
                                    key={idx}>
                                    {notes[i - 1]}
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

