// 인덱스 시그니처를 맵으로 사용할 수 있도록 돕는다.

import { CopyOption, CopyOptionSignatures } from "./options";

export type IndexSignatureMap<T> = { [key: string]: T };

const copy = <T>(copyOption: CopyOption, map: IndexSignatureMap<T>) => {
  if (copyOption.type === CopyOptionSignatures.COPY_NOTHING) {
    // 복사를 하지 않을 경우
    return map;
  }

  if (copyOption.type === CopyOptionSignatures.SWALLOW_COPY) {
    // 얕은 복사를 진행할 경우
    return { ...map };
  }

  if (copyOption.type === CopyOptionSignatures.DEEP_COPY) {
    // 깊은 복사를 진행할 경우
    return Object.keys(map).reduce((acc, key) => {
      acc[key] = copyOption.copyFn(map[key]);
      return acc;
    }, {} as IndexSignatureMap<T>);
  }

  throw new Error("유효하지 않은 CopyOption입니다.");
};

const resolve = <T>(
  copyOption: CopyOption,
  map: IndexSignatureMap<T>,
  exclude?: Array<string>,
  include?: Array<{ key: string; value: T }>
) => {
  const resolved = copy(copyOption, map);
  !!exclude && exclude.forEach((key) => delete resolved[key]);
  !!include && include.forEach(({ key, value }) => (resolved[key] = value));

  return resolved;
};

// 특정한 원소를 수정합니다. 이때, 존재하지 않는 경우 put과 동일한 기능을 가집니다.
const replace = <T>(
  map: IndexSignatureMap<T>,
  key: string,
  replaceFn: (value?: T) => T,
  copyOption?: CopyOption
) => {
  const resolved = resolve(
    copyOption || { type: CopyOptionSignatures.SWALLOW_COPY },
    map
  );

  resolved[key] = replaceFn(resolved[key]);
  return resolved;
};

const replaceAll = <T>(
  map: IndexSignatureMap<T>,
  keys: Array<string>,
  replaceFn: (value?: T) => T,
  copyOption?: CopyOption
) => {
  const resolved = resolve(
    copyOption || { type: CopyOptionSignatures.SWALLOW_COPY },
    map
  );
  keys.forEach((key) => (resolved[key] = replaceFn(resolved[key])));

  return resolved;
};

// 맵에 (key, value) 쌍을 추가합니다.
const put = <T>(
  map: IndexSignatureMap<T>,
  key: string,
  value: T,
  copyOption?: CopyOption
) =>
  resolve(
    copyOption || { type: CopyOptionSignatures.SWALLOW_COPY },
    map,
    undefined,
    [{ key, value }]
  );

const putAll = <T>(
  map: IndexSignatureMap<T>,
  entries: Array<{ key: string; value: T }>,
  copyOption?: CopyOption
) =>
  resolve(
    copyOption || { type: CopyOptionSignatures.SWALLOW_COPY },
    map,
    undefined,
    entries
  );

// 맵의 특정한 원소를 삭제합니다.
const remove = <T>(
  map: IndexSignatureMap<T>,
  key: string,
  copyOption?: CopyOption
) =>
  resolve(copyOption || { type: CopyOptionSignatures.SWALLOW_COPY }, map, [
    key,
  ]);

const removeAll = <T>(
  map: IndexSignatureMap<T>,
  keys: Array<string>,
  copyOption?: CopyOption
) =>
  resolve(copyOption || { type: CopyOptionSignatures.SWALLOW_COPY }, map, keys);

export { copy, replace, replaceAll, put, putAll, remove, removeAll };
