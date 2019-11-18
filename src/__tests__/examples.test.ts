import { createRect, compose, toTransparancy } from '../index'
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

test('draw half note', () => {
    const canvas = drawStaff(60)

    expect(canvas).toMatchInlineSnapshot(`
        Array [
          "                                                            ",
          "                                                            ",
          "                                                            ",
          "                                                            ",
          "____________________________________________________________",
          "                                                            ",
          "                                                            ",
          "                                                            ",
          "____________________________________________________________",
          "                                                            ",
          "                                                            ",
          "                                                            ",
          "____________________________________________________________",
          "                                                            ",
          "                                                            ",
          "                                                            ",
          "____________________________________________________________",
          "                                                            ",
          "                                                            ",
          "                                                            ",
          "____________________________________________________________",
          "                                                            ",
          "                                                            ",
          "                                                            ",
        ]
    `)

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

    const note = compose(
        compose(compose(noteBackground, noteHeadFull, { y: 12 }), noteStem, {
            x: 10,
        }),
        noteFlag,
        { x: 12, y: 1 }
    )

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

    expect(compose(canvas, toTransparancy(note), { x: 8, y: 5 }))
        .toMatchInlineSnapshot(`
        Array [
          "                                                            ",
          "                                                            ",
          "                                                            ",
          "                                                            ",
          "____________________________________________________________",
          "                  ██                                        ",
          "                  ████                                      ",
          "                  ██ █████                                  ",
          "__________________██_____██_________________________________",
          "                  ██     █                                  ",
          "                  ██                                        ",
          "                  ██                                        ",
          "__________________██________________________________________",
          "                  ██                                        ",
          "                  ██                                        ",
          "                  ██                                        ",
          "__________________██________________________________________",
          "           █████████                                        ",
          "         ███████████                                        ",
          "        ███████████                                         ",
          "__________███████___________________________________________",
          "                                                            ",
          "                                                            ",
          "                                                            ",
        ]
    `)
})
