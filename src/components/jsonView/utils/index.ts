export type Data = object[] | object | number;
export const getDataType = (data: Data) => typeof data === "number" ? "number" : Object.prototype.toString.call(data).slice(8, -1).toLowerCase()

export const isEmptyArrayOrObject = (data: Data) => [{}, []].map((item) => JSON.stringify(item)).includes(JSON.stringify(data))

export const formatValue = (data: Data) => typeof data === "number" ? data.toString(10) : data

export const isObjectOrArray = (source: Data) => ["array", "object"].includes(getDataType(source))
