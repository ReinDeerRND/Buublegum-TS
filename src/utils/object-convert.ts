export function updateArray(
    array: any[],
    checkProperty: string,
    condition: number,
    updateBlock: { followed: boolean }
){
    return array.map(item => {
        if (item[checkProperty] === condition) return { ...item, ...updateBlock }
        return item;
    });
}