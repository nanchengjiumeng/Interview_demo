let seedId = 0;
export const generateTreeDataByNode = (n, isPersonnel) => {
    let datas = [n.data];
    while (n = n.parent) {
        datas.push(n.data);
    }
    return {
        id: seedId++,
        label: datas[datas.length - 1][0].label,
        isPersonnel,
        children: [{
            id: seedId++,
            label: isPersonnel ? `${datas[0].label}--${datas[1].label}` : `${datas[0].label}部门库`,
        }]
    };
}