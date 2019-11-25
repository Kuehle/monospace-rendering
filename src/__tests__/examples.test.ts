import { createRect, compose, toTransparancy, Image, rotate } from '../index'
import { reduce } from '../util/array'

const drawStaff = (width: number) => {
    const canvas = createRect({ width, height: 24, char: ' ' })
    const line = createRect({ width, height: 1, char: '_' })

    const result = reduce(
        Array(5),
        (result, _, i) => compose(result, line, { y: 4 + i * 4 }),
        canvas
    )

    return result
}

enum NoteLength {
    Full,
    Half,
    Quarter,
    Eighth,
}

const createNote = (withStem = true, withHeadFull = true, withFlag = false) => {
    const noteHead = [
        '   ███████  ',
        ' ██       ██',
        '██       ██ ',
        '  ███████   ',
    ]

    const noteHeadFull = [
        '   ███████  ',
        ' ███████████',
        '███████████ ',
        '  ███████   ',
    ]

    const noteFlag = ['██     ', ' █████ ', '     ██', '     █ ']

    const noteStem = createRect({ width: 2, height: 13, char: '█' })
    const noteBackground = createRect({ width: 21, height: 16, char: ' ' })

    const NOTHING: Image = []
    const head = withHeadFull ? noteHeadFull : noteHead
    const stem = withStem ? noteStem : NOTHING
    const flag = withFlag ? noteFlag : NOTHING

    return compose(
        compose(compose(noteBackground, head, { y: 12 }), stem, {
            x: 10,
        }),
        flag,
        { x: 12, y: 1 }
    )
}

const drawNote = (noteLength: NoteLength) => {
    switch (noteLength) {
        case NoteLength.Full:
            return createNote(false, false, false)
        case NoteLength.Half:
            return createNote(true, false, false)
        case NoteLength.Quarter:
            return createNote(true, true, false)
        case NoteLength.Eighth:
            return createNote(true, true, true)
    }
}

describe('Can draw a note', () => {
    test('with full length', () => {
        const note = drawNote(NoteLength.Full)

        expect(note).toMatchInlineSnapshot(`
            Array [
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "                     ",
              "   ███████           ",
              " ██       ██         ",
              "██       ██          ",
              "  ███████            ",
            ]
        `)
    })
    test('with half length', () => {
        const note = drawNote(NoteLength.Half)

        expect(note).toMatchInlineSnapshot(`
            Array [
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "   █████████         ",
              " ██       ██         ",
              "██       ██          ",
              "  ███████            ",
            ]
        `)
    })
    test('with quarter length', () => {
        const note = drawNote(NoteLength.Quarter)

        expect(note).toMatchInlineSnapshot(`
            Array [
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "   █████████         ",
              " ███████████         ",
              "███████████          ",
              "  ███████            ",
            ]
        `)
    })
    test('with eighth length', () => {
        const note = drawNote(NoteLength.Eighth)

        expect(note).toMatchInlineSnapshot(`
            Array [
              "          ██         ",
              "          ████       ",
              "          ██ █████   ",
              "          ██     ██  ",
              "          ██     █   ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "          ██         ",
              "   █████████         ",
              " ███████████         ",
              "███████████          ",
              "  ███████            ",
            ]
        `)
    })
})

describe('Draws notes on staff:', () => {
    test('quater note in lowest gap in staff (F in trebble)', () => {
        const staff = drawStaff(30)
        const note = drawNote(NoteLength.Quarter)

        const result = compose(staff, toTransparancy(note), { x: 8, y: 5 })
        expect(result).toMatchInlineSnapshot(`
            Array [
              "                              ",
              "                              ",
              "                              ",
              "                              ",
              "______________________________",
              "                  ██          ",
              "                  ██          ",
              "                  ██          ",
              "__________________██__________",
              "                  ██          ",
              "                  ██          ",
              "                  ██          ",
              "__________________██__________",
              "                  ██          ",
              "                  ██          ",
              "                  ██          ",
              "__________________██__________",
              "           █████████          ",
              "         ███████████          ",
              "        ███████████           ",
              "__________███████_____________",
              "                              ",
              "                              ",
              "                              ",
            ]
        `)
    })

    const foo = (
        noteName: string,
        noteLength: NoteLength,
        width: number = 30
    ) => {
        const notes = 'EFGA_BCD'
        const rotated = notes.split('_')[1]
        const yOffset = [7, 5, 3, 1, 0_0, 6, 4, 2]
        const staff = drawStaff(width)
        const note = rotated.includes(noteName)
            ? rotate(drawNote(noteLength), 2)
            : drawNote(noteLength)

        return compose(staff, toTransparancy(note), {
            x: 8,
            y: yOffset[notes.indexOf(noteName)],
        })
    }

    test('draws eighth note middle of the stuff (B on trebble)', () => {
        const image = foo('B', NoteLength.Quarter, 30)
        expect(image).toMatchInlineSnapshot(`
            Array [
              "                              ",
              "                              ",
              "                              ",
              "                              ",
              "______________________________",
              "                              ",
              "                              ",
              "                              ",
              "______________________________",
              "                              ",
              "                              ",
              "               ███████        ",
              "_____________███████████______",
              "            ███████████       ",
              "            █████████         ",
              "            ██                ",
              "____________██________________",
              "            ██                ",
              "            ██                ",
              "            ██                ",
              "____________██________________",
              "            ██                ",
              "            ██                ",
              "            ██                ",
            ]
        `)
    })
})
