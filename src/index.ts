interface RenderOptions {
    // offset
    // dimensions
}

interface CreateRectOptions {
    width: number
    height: number
    char: string
}

// work as much with string[] as possible
export const createRect = ({
    width,
    height,
    char,
}: CreateRectOptions): string[] => {
    return Array(height).fill(char.repeat(width))
}

interface Coordinate {
    x: number
    y: number
}

export const compose = (
    bottom: string[],
    top: string[],
    offset: Coordinate = { x: 0, y: 0 }
) => {
    const result = bottom.slice()
    for (let y = 0; y < result.length; y++) {
        const tempStr = result[y].split('')
        for (let x = 0; x < tempStr.length; x++) {
            if (top[y] && top[y][x]) {
                tempStr[x] = top[y][x]
            }
        }
        result[y] = tempStr.join('')
    }
    return result
}

// maybe switch options for easier curring
export const render = (str: string, options?: RenderOptions) => {
    return str
}
