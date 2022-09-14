export const fetchData = async <T>(url: string): Promise<T> => {
    const res = await fetch(url);
    return await res.json()
}