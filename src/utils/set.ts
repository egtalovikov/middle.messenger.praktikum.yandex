type Indexed<T = any> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  // eslint-disable-next-line no-restricted-syntax
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        // eslint-disable-next-line no-param-reassign
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        // eslint-disable-next-line no-param-reassign
        lhs[p] = rhs[p];
      }
    } catch (e) {
      // eslint-disable-next-line no-param-reassign
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as Indexed, result);
}

export default set;
