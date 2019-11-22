import { map, reduce } from './util/array'

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

export type CropInput = Dimension & Coordinate

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

export const crop = (image: Image, { width, height, x, y }: CropInput) => {
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
