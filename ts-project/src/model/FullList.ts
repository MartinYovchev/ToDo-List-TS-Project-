import ListItem from "./ListItem"

interface List{
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(ItemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List{

    static instance: FullList = new FullList()

    constructor(private _list: ListItem[] = []){}

    get list(): ListItem[]{
        return this._list
    }

    set list(list: ListItem[]){
        this._list = list
    }

    load(): void {
        const soredList: string | null = localStorage.getItem("myList")
        if(typeof soredList !== "string") return

        const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(soredList)

        parsedList.forEach(itemObj =>{
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(ItemObj: ListItem): void {
        this._list.push(ItemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }

}