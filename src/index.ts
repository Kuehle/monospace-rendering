import { map, reduce, forI } from './util/array'

const TRANSPARENT = '\u0000'

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

// work as much with Image as possible
export const createRect = ({
    width,
    height,
    char,
}: CreateRectOptions): Image => {
    return Array(height).fill(char.repeat(width))
}

type CoordinateOption = Partial<Coordinate>

export const toTransparancy = (image: Image, charToSubstitute: string = ' ') =>
    map(image, line => line.split(charToSubstitute).join(TRANSPARENT))

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

export const rotate = (image: Image) => {
    const imageWidth = image[0].length
    const imageHeight = image.length

    const result = <string[][]>forI(imageWidth, () => [])
    forI(imageHeight, y => {
        forI(imageWidth, x => {
            result[x][imageHeight - y - 1] = image[y][x]
        })
    })

    return map(result, line => line.join(''))
}
