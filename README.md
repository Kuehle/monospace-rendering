# Monospace Rendering

The Idea of the Package is to provide utility functions for rendering to strings that are uses to display graphics in a monospace environment. Based on the idea that monospace graphics.

## Why not ASCII graphics?

This library comes close to what is commonly known as ASCII rendering. This name would be misleading though as using [special UTF8 characters](https://www.utf8-chartable.de/unicode-utf8-table.pl?start=9472&unicodeinhtml=dec) should be strongly encouraged.

## Features

-   draw rectangles
-   compose drawings
-   transparency
-   rotation
-   render a portion of a reneders image

## Examples

You can find examples in the test code [Examples](./src/__tests__/examples.test.ts).

## Example Output

```
|  |    ||    |   |  |    ||    ||    |   |
|  |    ||    |   |  |    ||    ||    |   |
|  | C# || D# |   |  | F# || G# || A# |   |
|  |    ||    |   |  |    ||    ||    |   |
|  |____||____|   |  |____||____||____|   |
|     |     |     |     |     |     |     |
|  C  |  D  |  E  |  F  |  G  |  A  |  B  |
|     |     |     |     |     |     |     |
|_____|_____|_____|_____|_____|_____|_____|
```

```
                                                                                                  ██
                                                                                                  ██
                                                          ██                                      ██                                      ██
__________________________________________________________████____________________________________██______________________________________████__________________
                                                          ██ █████                                ██                                      ██ █████
                                                          ██     ██                               ██                                      ██     ██
                ███████                                   ██     █                                ██                                      ██     █
_____________███████████__________________________________██______________________________________██______________________________________██____________________
            ███████████                                   ██                                      ██                                      ██
            █████████                                     ██                                      ██                                      ██
            ██                                            ██                                      ██                                      ██
____________██____________________________________________██______________________________________██______________________________________██____________________
            ██                                            ██                               █████████                                      ██
            ██                                            ██                             ███████████                                      ██
            ██                                     █████████                            ███████████                                █████████
____________██___________________________________███████████______________________________███████________________________________███████████____________________
            ██                                  ███████████                                                                     ███████████
            ██                                    ███████                                                                         ███████
            ██
____________██__________________________________________________________________________________________________________________________________________________
            ██
            ██
```

## TODO

-   allow for more than one char in one cell (allowing colors in terminal / web environment)
