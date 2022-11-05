export const updateArray = (array, checkProperty, condition, updateBlock) => {
    return array.map(item => {
        if (item[checkProperty] === condition) return { ...item, ...updateBlock }
        return item;
    });
}