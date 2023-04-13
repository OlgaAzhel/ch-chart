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

    console.log("THIS IS PLAY KEY:", playKey, "THIS IS PLAY SCALE:", harmonicaService.scales[scale])
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
    console.log("FULL LAYOUT:", currentFullNotesLayout)
    console.log("ALL HIGHLIGHTED:", currentHighlighted)




    let noteSequence = []
    function noteSequenceFinder(notesInPlay, highlighted) {
        let prefferedPositions = [2, 3, 6, 7, 10, 11, 14, 15]
        let divider = highlighted.length / 3
        let blockOne = highlighted.slice(0, divider)

        let blockTwo = highlighted.slice(divider, divider * 2)

        let blockThree = highlighted.slice(divider * 2)

        for (let i = 0; i < notesInPlay.length; i++) {
            console.log("LOOKING FOR NOTE:", notesInPlay[i])
            for (let j = 0; j < blockOne.length; j++) {
                if (notesInPlay[i] === blockOne[j].note) {
                    // console.log(prefferedPositions.includes(blockOne[j + 1].pos), blockOne[j].note, blockOne[j].pos)
                 
                        if (blockOne[j + 1] && notesInPlay[i] === blockOne[j + 1].note && prefferedPositions.includes(blockOne[j + 1].pos)) {
                            noteSequence.push(blockOne[j + 1])
                            i++
                        } else {
                            noteSequence.push(blockOne[j])
                            console.log("Adding note ", blockOne[j], i)
                            i++
                        }
                }

                if (j === blockOne.length-1 && i < notesInPlay.length) {
                    console.log("here!!! Looking for note:", notesInPlay[i])
                    for (let j = 0; j < blockTwo.length; j++) {
                        if (notesInPlay[i] === blockTwo[j].note) {
                            noteSequence.push(blockTwo[j])
                            i++
                        }
                    }
                }
            }

        }

    }


    noteSequenceFinder(playNotes, currentHighlighted)
    console.log("Note Sequence:", noteSequence)




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

