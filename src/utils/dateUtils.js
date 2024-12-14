const generateDateRange = (start, end) => {
    const range = [];
    let currentDate = new Date(start);

    while (currentDate <= new Date(end)) {
        range.push(new Date(currentDate).toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
};
export default generateDateRange;