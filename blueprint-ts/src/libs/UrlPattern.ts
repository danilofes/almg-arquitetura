
export function urlPattern() {
  return new UrlPattern();
}

export class UrlPattern<T = {}> {

  private pathParts: UrlPart[] = [];
  private queryParts: UrlPart[] = [];

  toLocation = (params: T) => ({
    pathname: '/' + this.pathParts.map(p => p.toUrl(params)).join('/'),
    search: '?' + this.queryParts.map(p => p.toUrl(params)).join('&')
  });

  path(part: string): UrlPattern<T> {
    this.pathParts.push(new StaticUrlPart(part));
    return this;
  }

  pathVar<K extends string, V>(identifier: K, parser: ParamParser<V>): UrlPattern<T & WithProp<K, V>> {
    this.pathParts.push(new DynamicUrlPart(identifier, parser));
    return this as any;
  }

  queryParam<K extends string, V>(identifier: K, parser: ParamParser<V>): UrlPattern<T & WithProp<K, V>> {
    this.queryParts.push(new QueryParam(identifier, parser));
    return this as any;
  }

  optionalQueryParam<K extends string, V>(identifier: K, parser: ParamParser<V>): UrlPattern<T & WithOptProp<K, V>> {
    this.queryParts.push(new QueryParam(identifier, parser));
    return this;
  }

  toPathPattern(): string {
    return '/' + this.pathParts.map(p => p.toPattern()).join('/');
  }

  parseParams(rawParams: any): T {
    const params = {} as T;
    const allParts = [...this.pathParts, ...this.queryParts];
    for (let i = 0; i < allParts.length; i++) {
      allParts[i].convert(rawParams, params);
    }
    return params;
  }

}

type WithProp<K extends string, V> = {
  [P in K]: V;
};

type WithOptProp<K extends string, V> = {
  [P in K]?: V;
};

interface ParamParser<T> {
  toString: (value: T) => string,
  fromString: (value: string) => T
}

export const NUM: ParamParser<number> = {
  toString: (value: number) => String(value),
  fromString: (value: string) => Number(value)
}

export const STR: ParamParser<string> = {
  toString: (value: string) => value,
  fromString: (value: string) => value
}

export const BOOL: ParamParser<boolean> = {
  toString: (value: boolean) => String(value),
  fromString: (value: string) => value === 'true'
}

interface UrlPart {
  toUrl(params: any): string;
  convert(rawParams: any, params: any): void;
  toPattern(): string;
}

class StaticUrlPart implements UrlPart {
  constructor(private part: string) { }
  toUrl = () => this.part;
  convert() { }
  toPattern = () => this.part;
}

class DynamicUrlPart<T> implements UrlPart {
  constructor(protected identifier: string, protected parser: ParamParser<T>) { }
  toUrl = (params: any) => this.parser.toString(params[this.identifier]);
  convert(rawParams: any, params: any) {
    if (rawParams[this.identifier]) {
      params[this.identifier] = this.parser.fromString(rawParams[this.identifier]);
    }
  }
  toPattern = () => ':' + this.identifier;
}

class QueryParam<T> extends DynamicUrlPart<T> {
  constructor(identifier: string, parser: ParamParser<T>) {
    super(identifier, parser);
  }
  toUrl = (params: any) => this.identifier + '=' + this.parser.toString(params[this.identifier]);
  toPattern = () => '';
}
