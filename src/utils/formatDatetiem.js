export function formatDatetiem(date) {
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    let second = date.getSeconds().toString().padStart(2, '0');
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

export function formatDatetimeToDate(dateString) {
    // 尝试将日期字符串直接解析为日期对象
    const date = new Date(dateString.replace(" ", "T"));
    if (isNaN(date)) {
        throw new Error("Invalid date format");
    }
    return date;
}