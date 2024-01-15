type T1 = { x: number } & { x: string } // {x: never}
type T2 = { x: number } & { y: string }

type H1 = { x: number } | { x: string } // {x: number | string}
type H2 = { x: number } | { y: string }

const th: H2 = {
  x: 1,
  y: '1',
}
