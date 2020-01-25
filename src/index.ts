import { map, reduce, forI } from './util/array'
export { map, reduce, forI } from './util/array'

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

const TRANSPARENT = 'ü'

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
export const toTransparency = (image: Image, charToSubstitute: string = ' ') =>
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
export const crop = (image: Image, cropInput: CropInput) => {
    const { height, width, x, y } = Object.assign(
        { x: 0, y: 0 },
        measure(image),
        cropInput
    )
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
 * rotates an image to the right, as often as specified by the number parameter
 * @param image
 * @param n
 */
export const rotate = (image: Image, n: number = 1) => {
    n = Math.round(n)
    if (n % 4 === 0) return image

    const { width, height } = measure(image)

    const [resultHeight, resultWidth] =
        n % 2 === 0 ? [height, width] : [width, height]

    let result: string[][] = forI(resultHeight, () => [])

    forI(resultHeight, y => {
        forI(resultWidth, x => {
            switch (n % 4) {
                case 1:
                    return (result[y][x] = image[resultWidth - x - 1][y])
                case 2:
                    return (result[y][x] =
                        image[resultHeight - y - 1][resultWidth - x - 1])
                case 3:
                    return (result[y][x] = image[x][resultHeight - y - 1])
                default:
                    throw new Error(
                        'Something went wrong while rotating. Check the input values.'
                    )
            }
        })
    })

    return map(result, line => line.join(''))
}

export const isInBounds = (img: Image, c: Coordinate) => {
    return c.x < img[0].length && c.x >= 0 && c.x < img.length && c.y >= 0
}

export const measure = (image: Image): Dimension => {
    return {
        height: image.length,
        width: reduce(
            image,
            (acc, line) => (line.length > acc ? line.length : acc),
            0
        ),
    }
}
