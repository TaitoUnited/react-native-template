import { makeOperation } from '@urql/core';
import { Exchange, Operation } from 'urql';
import { pipe, mergeMap, map, fromPromise, fromValue } from 'wonka';

const isPromise = (value: any): value is Promise<unknown> => {
  return typeof value.then === 'function';
};

// Source: https://github.com/FormidableLabs/urql/blob/a01563329ceb1c40305d6170a64bd69ac2bb4645/docs/common-questions.md
export default function fetchOptionsExchange(
  fn: (fetchOptions: RequestInit) => Promise<RequestInit> | RequestInit,
): Exchange {
  return ({ forward }) =>
    (ops$) => {
      return pipe(
        ops$,
        mergeMap((operation: Operation) => {
          const currentOptions =
            typeof operation.context.fetchOptions === 'function'
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};

          const finalOptions = fn(currentOptions);

          return pipe(
            isPromise(finalOptions)
              ? fromPromise(finalOptions)
              : fromValue(finalOptions),

            map((fetchOptions) => {
              return makeOperation(operation.kind, operation, {
                ...operation.context,
                fetchOptions,
              });
            }),
          );
        }),
        forward,
      );
    };
}
