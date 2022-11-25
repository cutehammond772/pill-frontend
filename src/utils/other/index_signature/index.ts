// 인덱스 시그니처를 맵으로 사용할 수 있도록 돕는다.

type IndexSignatureMap<T> = { [key: string]: T };

// 맵 객체를 복사합니다. copyFn 함수를 통해 내부 원소를 복사합니다.
const copy = <T>(map: IndexSignatureMap<T>, copyFn: (value: T) => T) => {
  return Object.keys(map).reduce((acc, key) => {
    acc[key] = !!copyFn ? copyFn(map[key]) : map[key];
    return acc;
  }, {} as IndexSignatureMap<T>);
};

// 특정한 원소를 수정합니다. 이때, 존재하지 않는 경우 put과 동일한 기능을 가집니다.
const replace = <T>(
  map: IndexSignatureMap<T>,
  key: string,
  replaceFn: (value?: T) => T,
  copyFn?: (value: T) => T
) => {
  const copied = !!copyFn ? copy(map, copyFn) : map;
  copied[key] = replaceFn(copied[key]);

  return copied;
};

const replaceAll = <T>(
  map: IndexSignatureMap<T>,
  keys: Array<string>,
  replaceFn: (value?: T) => T,
  copyFn?: (value: T) => T
) => {
  const copied = !!copyFn ? copy(map, copyFn) : map;
  keys.forEach((key) => copied[key] = replaceFn(copied[key]));

  return copied;
};

// 맵에 (key, value) 쌍을 추가합니다.
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

// 맵의 특정한 원소를 삭제합니다.
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

export { copy, replace, replaceAll, put, putAll, remove, removeAll, type IndexSignatureMap };
