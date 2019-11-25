import { map, reduce, forI } from './util/array'

export type ImageLine = string
export type Image = ImageLine[]
export interface Dimension {
    width: number
    height: number
}

export interface Coordinate {
    x: number
    y: number
}

export type CropInput = Partial<Dimension & Coordinate>

type CreateRectOptions = Dimension & {
    char: string
}

type CoordinateOption = Partial<Coordinate>

const TRANSPARENT = '\u0000'

export const createRect = ({
    width,
    height,
    char,
}: CreateRectOptions): Image => {
    return forI(height, () => char.repeat(width))
}

/**
 * takes an image and subsitutes a character (default " ") with \u0000 which is
 * treated as transparancy in composing images
 * @param image
 * @param charToSubstitute
 */
export const toTransparancy = (image: Image, charToSubstitute: string = ' ') =>
    map(image, line => line.split(charToSubstitute).join(TRANSPARENT))

/**
 * takes an images and applies the other one on top resulting in a new image
 * with the dimensions of the bottom one
 * @param bottom
 * @param top
 * @param offset
 */
export const compose = (
    bottom: Image,
    top: Image,
    offset: CoordinateOption = { x: 0, y: 0 }
) => {
    const xOffset = offset.x || 0
    const yOffset = offset.y || 0

    const result = map(bottom, (bottomLine, y) =>
        map(bottomLine.split('').slice(), (bottomChar, x) => {
            const topChar = top[y - yOffset] && top[y - yOffset][x - xOffset]
            if (!topChar || topChar === TRANSPARENT) return bottomChar
            else return topChar
        }).join('')
    )
    return result
}

/**
 * creates new image from offset and dimension
 * @param image
 * @param param1
 */
export const crop = (
    image: Image,
    { width = image[0].length, height = image.length, x = 0, y = 0 }: CropInput
) => {
    return reduce(
        image,
        (acc: Image, line: ImageLine, lineNumber) => {
            if (y > lineNumber || y + height - 1 < lineNumber) {
                return acc
            }
            return [...acc, line.slice(x, x + width)]
        },
        []
    )
}

/**
 * rotates an image to the right, as often as you want
 * @param image
 */
export const rotate = (image: Image, n: number = 1) => {
    n = Math.round(n)
    if (n % 4 === 0) return image

    const imageWidth = image[0].length
    const imageHeight = image.length

    const result = <string[][]>forI(imageWidth, () => [])
    forI(imageHeight, y => {
        forI(imageWidth, x => {
            switch (n % 4) {
                case 1:
                    return (result[x][imageHeight - y - 1] = image[y][x])
                case 2:
                    return (result[imageWidth - y - 1][imageHeight - x - 1] =
                        image[y][x])
                case 3:
                    return (result[imageWidth - x - 1][y] = image[y][x])
            }
        })
    })

    return map(result, line => line.join(''))
}
