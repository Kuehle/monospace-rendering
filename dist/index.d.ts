export { map, reduce, forI } from './util/array';
export declare type ImageLine = string;
export declare type Image = ImageLine[];
export interface Dimension {
    width: number;
    height: number;
}
export interface Coordinate {
    x: number;
    y: number;
}
export declare type CropInput = Partial<Dimension & Coordinate>;
declare type CreateRectOptions = Dimension & {
    char: string;
};
export declare const createRect: ({ width, height, char, }: CreateRectOptions) => Image;
/**
 * takes an image and subsitutes a character (default " ") with \u0000 which is
 * treated as transparancy in composing images
 * @param image
 * @param charToSubstitute
 */
export declare const toTransparancy: (image: Image, charToSubstitute?: string) => string[];
/**
 * takes an images and applies the other one on top resulting in a new image
 * with the dimensions of the bottom one
 * @param bottom
 * @param top
 * @param offset
 */
export declare const compose: (bottom: Image, top: Image, offset?: Partial<Coordinate>) => string[];
/**
 * creates new image from offset and dimension
 * @param image
 * @param param1
 */
export declare const crop: (image: Image, cropInput: Partial<Dimension & Coordinate>) => Image;
/**
 * rotates an image to the right, as often as specified by the number parameter
 * @param image
 * @param n
 */
export declare const rotate: (image: Image, n?: number) => Image;
export declare const isInBounds: (img: Image, c: Coordinate) => boolean;
export declare const measure: (image: Image) => Dimension;
