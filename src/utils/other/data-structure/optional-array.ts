// 특정한 배열(=리스트)에 원소를 추가 또는 삭제할 때,
// 배열이 undefined일 가능성이 있는 경우 사용한다.

import { CopyOption, CopyOptionSignatures, Filter } from "./options";

// copyOption을 통해 반환되는 배열의 복사 여부를 정할 수 있다. (기본 설정은 SWALLOW_COPY)
// 1. COPY_NOTHING: 어떤 복사도 하지 않고 배열 참조를 그대로 반환한다.
// 2. SWALLOW_COPY: 배열 내 원소의 참조는 그대로 한 채 배열만 복사한다. (얕은 복사)
// 2. DEEP_COPY: 배열 객체와 함께 배열 내 원소까지 복사합니다. (깊은 복사)

// 이때, 매개변수로 들어간 원소는 복사 과정 없이 그대로 들어간다는 점에 유의한다.

const resolve = <T>(
  copyOption: CopyOption,
  array?: Array<T>,
  exclude?: Filter<T>,
  include?: Array<T>
) => {
  if (copyOption.type === CopyOptionSignatures.COPY_NOTHING) {
    // 복사를 하지 않을 경우
    const resolved = array || [];
    !!exclude &&
      resolved
        .filter((element) => !exclude(element))
        .forEach((element) => resolved.splice(resolved.indexOf(element), 1));

    !!include && include.forEach((element) => resolved.push(element));

    return resolved;
  }

  if (copyOption.type === CopyOptionSignatures.SWALLOW_COPY) {
    // 얕은 복사를 진행할 경우
    let resolved = !!array ? [...array] : [];
    !!exclude && (resolved = resolved.filter(exclude));
    !!include && include.forEach((element) => resolved.push(element));

    return resolved;
  }

  if (copyOption.type === CopyOptionSignatures.DEEP_COPY) {
    // 깊은 복사를 진행할 경우
    let resolved = !!array
      ? array.map((element) => copyOption.copyFn(element))
      : [];
    !!exclude && (resolved = resolved.filter(exclude));
    !!include && include.forEach((element) => resolved.push(element));

    return resolved;
  }

  throw new Error("유효하지 않은 CopyOption입니다.");
};

const push = <T>(element: T, array?: Array<T>, copyOption?: CopyOption) =>
  resolve(
    copyOption || { type: CopyOptionSignatures.SWALLOW_COPY },
    array,
    undefined,
    [element]
  );

const pushAll = <T>(
  elements: Array<T>,
  array?: Array<T>,
  copyOption?: CopyOption
) =>
  resolve(
    copyOption || { type: CopyOptionSignatures.SWALLOW_COPY },
    array,
    undefined,
    elements
  );

// filter 함수를 통해 삭제할 원소를 골라낸다.
// => 엄격한 비교 (===) 사용에 유의해야 한다. 만약 깊은 복사가 진행된 경우 객체의 참조가 달라지기 때문이다.
const removeAll = <T>(
  filter: Filter<T>,
  array?: Array<T>,
  copyOption?: CopyOption
) =>
  resolve(
    copyOption || { type: CopyOptionSignatures.SWALLOW_COPY },
    array,
    filter
  );

export { push, pushAll, removeAll };
