// 인덱스 시그니처를 맵으로 사용할 수 있도록 돕는다.

type IndexSignatureMap<T> = { [key: string]: T };

const copy = <T>(map: IndexSignatureMap<T>, copyFn?: (value: T) => T) => {
  return Object.keys(map).reduce((acc, key) => {
    acc[key] = !!copyFn ? copyFn(map[key]) : map[key];
    return acc;
  }, {} as IndexSignatureMap<T>);
};

const put = <T>(
  map: IndexSignatureMap<T>,
  key: string,
  value: T,
  copyFn?: (value: T) => T
) => {
  const copied = !!copyFn ? copy(map, copyFn) : map;
  copied[key] = value;

  return copied;
};

const putAll = <T>(
  map: IndexSignatureMap<T>,
  entries: Array<{ key: string; value: T }>,
  copyFn?: (value: T) => T
) => {
  const copied = !!copyFn ? copy(map, copyFn) : map;
  entries.forEach((entry) => (copied[entry.key] = entry.value));

  return copied;
};

const remove = <T>(
  map: IndexSignatureMap<T>,
  key: string,
  copyFn?: (t: T) => T
) => {
  return Object.keys(map).reduce((acc, _key) => {
    if (_key !== key) {
      acc[_key] = !!copyFn ? copyFn(map[_key]) : map[_key];
    }
    return acc;
  }, {} as IndexSignatureMap<T>);
};

const removeAll = <T>(
  map: IndexSignatureMap<T>,
  keys: Array<string>,
  copyFn?: (t: T) => T
) => {
  return Object.keys(map).reduce((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = !!copyFn ? copyFn(map[key]) : map[key];
    }
    return acc;
  }, {} as IndexSignatureMap<T>);
};

export { copy, put, putAll, remove, removeAll, type IndexSignatureMap };
