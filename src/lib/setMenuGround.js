import storage from './storage'

let findIndexOf = (str, searchStr, num) => {
    let index = str.indexOf(searchStr)
    for (let i = 1; i < num; i++) {
        index = str.indexOf(searchStr, index + 1)
    }
    return index
}

let loopIsShowMenu = (menuList) => {
    let _menuAll = []
    for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].isShow == "1") {
            if (menuList[i].iTaskInfo) {
                menuList[i].iTaskInfo.menu = loopIsShowMenu(menuList[i].iTaskInfo.menu)
                _menuAll.push(menuList[i])
            } else {
                _menuAll.push(menuList[i])
            }
        }
    }
    return _menuAll
}

export const filterMenu = (menuAll) => {
    return loopIsShowMenu(menuAll)
}

export const
    menuGround = (vm, route) => {
        let currentHash = ""
        if (route) currentHash = route
        else currentHash = vm.$route.path.substr(1)
        if (currentHash.indexOf("@") > 0) {
            currentHash = currentHash.substr(0, currentHash.indexOf("@"))
        } else {
            // if(currentHash.split("/").length == 3){
            // 	//currentHash=currentHash.substr(0,findIndexOf(currentHash,"/",2))
            // }
        }
        let menuGround = vm.$tools.storage.get("menuGround", "save")
        if (menuGround && menuGround[currentHash]) {
            return menuGround[currentHash]
        } else {
            return
        }
    }

export const
    setMenuGround = (menu) => {
        //app.menuName={}
        let app = {}
        app.menuGround = {}
        let menuAll = menu
        for (let i = 0; i < menuAll.length; i++) {
            let isHasChild = menuAll[i].childrens
            if (!isHasChild.length) {
                app.menuGround[menuAll[i].url.substr(1)] = { ground: i, id: menuAll[i].bsnCode }
            } else {
                let leval_2_len = menuAll[i].childrens.length
                for (let k = 0; k < leval_2_len; k++) {
                    let leval_2 = menuAll[i].childrens[k]
                    if (!leval_2.childrens.length) {
                        //app.menuName[leval_2.id]=leval_2.name
                        app.menuGround[leval_2.url.substr(1)] = { ground: i, current: [k], display: leval_2.display, id: leval_2.bsnCode }
                    } else {
                        for (let j = 0; j < leval_2.childrens.length; j++) {
                            let leval_3 = leval_2.childrens[j]
                                //app.menuName[leval_3.id]=leval_3.name
                            app.menuGround[leval_3.url.substr(1)] = { ground: i, current: [k, j], display: leval_3.display, id: leval_3.bsnCode }
                        }
                    }
                }
            }
        }
        storage.set("menuGround", app.menuGround)
    }