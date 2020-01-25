<<<<<<< HEAD
import {
    createRect,
    compose,
    crop,
    toTransparancy,
    rotate,
    isInBounds,
} from '../index'
=======
import { createRect, compose, crop, toTransparancy, rotate, measure } from '../index'
>>>>>>> 6a85b7a551658abf8c0be29789a6e83d51598858
import { map, reduce } from '../util/array'

test('map', () => {
    const arr = [1, 1, 1, 1]
    const fun = (el: number, i: number, arr: number[]) => el * i * arr.length

    const result = map(arr, fun)
    expect(result).toEqual(arr.map(fun))
})

test('reduce', () => {
    const arr = [1, 1, 1, 1]
    const fun = (acc: number, el: number, i: number, arr: number[]) =>
        acc + el * i * arr.length

    const result = reduce(arr, fun, 0)
    expect(result).toEqual(arr.reduce(fun, 0))
})

describe('The Lib', () => {
    it('can create a rect', () => {
        expect(createRect({ width: 3, height: 2, char: 'x' })).toEqual([
            'xxx',
            'xxx',
        ])
    })
    it('can compose 2 elements', () => {
        const canvas = createRect({ width: 5, height: 4, char: 'X' })
        const rect = createRect({ width: 3, height: 2, char: '0' })
        expect(compose(canvas, rect)).toEqual([
            '000XX',
            '000XX',
            'XXXXX',
            'XXXXX',
        ])
    })
    it('can compose 2 elements with x offset', () => {
        const canvas = createRect({ width: 5, height: 4, char: 'X' })
        const rect = createRect({ width: 3, height: 2, char: '0' })
        expect(compose(canvas, rect, { x: 1 })).toEqual([
            'X000X',
            'X000X',
            'XXXXX',
            'XXXXX',
        ])
    })
    it('can compose 2 elements with x and y offset', () => {
        const canvas = createRect({ width: 5, height: 4, char: 'X' })
        const rect = createRect({ width: 3, height: 2, char: '0' })
        expect(compose(canvas, rect, { x: 1, y: 2 })).toEqual([
            'XXXXX',
            'XXXXX',
            'X000X',
            'X000X',
        ])
    })
    it('can render transparancy', () => {
        const canvas = createRect({ width: 5, height: 4, char: 'X' })

        const circle = toTransparancy([' 000 ', '0   0', '0   0', ' 000 '], ' ')

        expect(compose(canvas, circle)).toEqual([
            'X000X',
            '0XXX0',
            '0XXX0',
            'X000X',
        ])
    })
    it('can render a section of a canvas', () => {
        const image = ['XXXXXXX', 'X00000X', 'X00000X', 'X00000X', 'XXXXXXX']

        const cropped = crop(image, { width: 5, height: 3, x: 1, y: 1 })

        expect(cropped).toEqual(['00000', '00000', '00000'])
    })
    it('can render a section of a canvas', () => {
        const image = ['XXXXXXX', 'X00000X', 'X00000X', 'X00000X', 'XXXXXXX']

        const cropped = crop(image, { width: 5, height: 3, y: 1 })

        expect(cropped).toEqual(['X0000', 'X0000', 'X0000'])
    })
    it('can render a section of a canvas', () => {
        const image = ['XXXXXXX', 'X00000X', 'X00000X', 'X00000X', 'XXXXXXX']

        const cropped = crop(image, {})

        expect(cropped).toEqual(image)
    })
    it('can rotate an image', () => {
        const image = ['XX0', '000', '000', '000', '000']

        const rotated = rotate(image)

        expect(rotated).toEqual(['0000X', '0000X', '00000'])
    })
    it('can rotate an image with uneven aspect ratio for 180deg', () => {
        const image = ['XX0', '000', '000', '000', '000']

        const rotated = rotate(image, 2)

        expect(rotated).toEqual(['000', '000', '000', '000', '0XX'])
    })
    it('can rotate an image 180 deg', () => {
        const image = ['XX0', '000', '000']

        const rotated = rotate(image, 2)

        expect(rotated).toEqual(['000', '000', '0XX'])
    })
    it('can rotate an image 270 deg', () => {
        const image = ['XX0', '000', '000']

        const rotated = rotate(image, 3)

        expect(rotated).toEqual(['000', 'X00', 'X00'])
    })
    it('can rotate an image 360 deg', () => {
        const image = ['XX0', '000', '000']

        const rotated = rotate(image, 4)

        expect(rotated).toEqual(image)
    })
    it('can rotate an image 630 deg', () => {
        const image = ['XX0', '000', '000']

        const rotated = rotate(image, 630 / 90)

        expect(rotated).toEqual(['000', 'X00', 'X00'])
    })
    it('can rotate an image by an uneven amount like 673', () => {
        const image = ['XX0', '000', '000']

        const rotated = rotate(image, 673 / 90)

        expect(rotated).toEqual(['000', 'X00', 'X00'])
    })

<<<<<<< HEAD
    it('can check if a coordinate is within an image', () => {
        const inside = isInBounds(
            createRect({ width: 4, height: 20, char: ' ' }),
            { x: 3, y: 19 }
        )
        expect(inside).toBe(true)
    })
    it('can check if a coordinate is within an image', () => {
        const inside = isInBounds(
            createRect({ width: 4, height: 20, char: ' ' }),
            { x: 4, y: 20 }
        )
        expect(inside).toBe(false)
    })
    it('can check if a coordinate is within an image', () => {
        const inside = isInBounds(
            createRect({ width: 4, height: 20, char: ' ' }),
            { x: -1, y: 19 }
        )
        expect(inside).toBe(false)
    })
    it('can check if a coordinate is within an image', () => {
        const inside = isInBounds(
            createRect({ width: 4, height: 20, char: ' ' }),
            { x: 0, y: -1 }
        )
        expect(inside).toBe(false)
=======
    it("can get the dimensions of an image by checking for the longest line", () => {
        const image = ["0", "00", "000000", "000"]

        const dimensions = measure(image)

        expect(dimensions).toEqual({"height": 4, "width": 6})
>>>>>>> 6a85b7a551658abf8c0be29789a6e83d51598858
    })
})
