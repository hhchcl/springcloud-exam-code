import storage from './storage'
import utils from './utilsTools'
import array from './arrayTools'
import validator from './validatorTools'
import { request } from './request'
import { setMenuGround } from './setMenuGround'
import { menuGround } from './setMenuGround'
import { filterMenu } from './setMenuGround'
import { getPageId } from './getPageId'
import { getMenuId } from './getPageId'
import { saveWarmTips } from './getPageId'
import { scrollTop } from './scrollTop'
import dict from './dictionary'
import { print } from './getPageId'
import backSpace from './backSpace'
let tools = {
	storage,
	request,
	setMenuGround,
	menuGround,
	filterMenu,
	getPageId,
	getMenuId,
	saveWarmTips,
	array,
	utils,
	validator,
	scrollTop,
	dict,
	print,
	backSpace
}
export default tools
