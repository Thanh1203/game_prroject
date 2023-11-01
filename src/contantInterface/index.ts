interface itemInterface {
    id: number;
    name: string;
    img: string;
    x: number;
    y: number
}

interface interfaceNewItem {
    key?: string[];
    name?: string;
    img?: string
}

export {
    itemInterface,
    interfaceNewItem
}