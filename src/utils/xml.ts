import { XmlObject } from '../types'
// import fs from 'fs'
import * as fs from 'fs'
// import * as path from 'path'
// const htmlparser = require("htmlparser2")
import * as htmlparser from 'htmlparser2'
// const { treeMap, treeFilter } = require('./util')

// const xmlContent = fs.readFileSync('ui.xml', 'utf8')
// const uiUtil = require('../util')
import { uid, uiUtil } from '../helper'

// import { add } from './core'
// const htmlString = `<svg xmlns="http://www.w3.org/2000/svg" 
// version="1.1" width="400" height="200" style="background-color: #09c">
//   <rect x="0" y="0" width="400" height="200" fill="none" stroke="#000" stroke-width="1"></rect>
//   <rect x="0" y="0" width="100" height="100" fill="#000" stroke="none"></rect>
//   <rect x="100" y="100" width="100" height="100" fill="#09c" stroke="none"></rect>
//   <circle cx="150" cy="50" r="50" stroke="none" stroke-width="2" fill="#f00"></circle>    
// </svg>`


export function XmlText2XmlObj(xmlText: string): XmlObject {
    let elements = htmlparser.parseDocument(xmlText.replace(/^\s+/, ''), {
        lowerCaseTags: false,
        lowerCaseAttributeNames: false,
    })
    
    let out = uiUtil.treeMap(elements, {
        nodeHandler(node) {
            let type
            let attrs: any = {}
            if (node.type == 'root') {
                type = 'root'
            } else if (node.type == 'tag') {
                type = node.name
                attrs = node.attribs
            } else {
                if (node.type == 'text') {
                    // console.log('node', node)
                    const { data } = node
                    if (data.match(/^\s+$/)) {
                        return null
                    }
                } 
                type = 'other:' + node.type
                console.log('nodenode', node)
                attrs._dataText = node.data
            }
            let result = {
                _type: type,
                ...attrs,
            }
            return result
        }
    })
    out = uiUtil.treeFilter(out.children[0], {
        nodeHandler: item => item
    })

    return out
}
