export enum EParserType {
  TAG = 'TAG',
  TAKE = 'TAKE',
  SEQ = 'SEQ',
  REPEAT = 'REPEAT',
}

export enum EParserState {
  AWAIT_INPUT,
}

export interface IParserToken<T = unknown> {
  type: string
  value?: T
}

export type TParserResult<T = unknown> = [IParserToken<T>, Iterable<string>]

export type TParser<T = unknown, R = unknown> = (
  iterable: Iterable<string>,
  prev?: IParserToken<T>,
) => Generator<IParserToken<T> | EParserState, TParserResult<R>, Iterable<string> | undefined>
