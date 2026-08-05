

export function transformResponse(array: any[], idKey: string, nameKey: string) {
    return array.map((item) => ({
      id: item[idKey],
      name: item[nameKey],
    }));
}