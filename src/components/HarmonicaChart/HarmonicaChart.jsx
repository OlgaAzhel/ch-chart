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

    console.log("THIS IS PLAY KEY:",playKey,"THIS IS PLAY SCALE:", harmonicaService.scales[scale])
    console.log("THESE ARE PLAY NOTES",playNotes)

    return <>
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
                    console.log("THIS IS CURRENT DIV:",notes[i-1], idx, playNotes.includes(notes[i-1]))

                    return <>
                    {playNotes.includes(notes[i-1]) && <div
                            className="highlighted"
                            key={idx}
                            >
                            {notes[i - 1]}
                        </div>
                    }

                        {!playNotes.includes(notes[i-1]) &&<div
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
}