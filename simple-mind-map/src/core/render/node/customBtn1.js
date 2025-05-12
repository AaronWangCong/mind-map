import btnsSvg from '../../../svg/btns'
import { SVG, Circle, G } from '@svgdotjs/svg.js'

function initCustomBtn1() {
  if (this.isGeneralization) return
  this._customBtn1 = null
  this._showCustomBtn1 = false
}

// 显示按钮
function showCustomBtn1() {
  if (this.isGeneralization) return

  const leftX  = this.getChildrenLength() > 0 ? 50 : 40
  // 创建按钮
  if (this._customBtn1) {
    // 重新绘制按钮的左边距离
    this._customBtn1.each((index) => {
      this._customBtn1.get(index).x(leftX)
    })
    this.group.add(this._customBtn1)
  } else {
    const { customBtnIcon1, expandBtnStyle, expandBtnSize } =
      this.mindMap.opt
    const { icon, style } = customBtnIcon1
    let { color, fill } = expandBtnStyle || {
      color: '#3478ff',
      fill: '#3478ff'
    }
    color = style.color || color
    // 图标节点
    const iconNode = SVG(icon || btnsSvg.quickCreateChild).size(
      expandBtnSize,
      expandBtnSize
    )
    iconNode.css({
      cursor: 'pointer'
    })

    iconNode.x(leftX).y(-expandBtnSize / 2)
    this.style.iconNode(iconNode, color)
    // 填充节点
    const fillNode = new Circle().size(expandBtnSize)
    fillNode.x(leftX).y(-expandBtnSize / 2)
    fillNode.fill({ color: fill }).css({
      cursor: 'pointer'
    })
    // 容器节点
    this._customBtn1 = new G()
    this._customBtn1.add(fillNode).add(iconNode)
    this._customBtn1.on('click', e => {
      e.stopPropagation()
      this.mindMap.emit('custom_btn_1_click', this)
      const { customBtn1Click } = this.mindMap.opt
      if (typeof customBtn1Click === 'function') {
        customBtn1Click(this)
        return
      }
    })
    this._customBtn1.on('dblclick', e => {
      e.stopPropagation()
    })
    this._customBtn1.addClass('smm-custom-btn-1')
    this.group.add(this._customBtn1)
  }
  this._showCustomBtn1 = true
  // 更新按钮
  this.renderer.layout.renderExpandBtn(this, this._customBtn1)
}

//  移除按钮
function removeCustomBtn1() {
  if (this.isGeneralization) return
  if (this._customBtn1 && this._showCustomBtn1) {
    this._customBtn1.remove()
    this._showCustomBtn1 = false
  }
}

// 隐藏按钮
function hideCustomBtn1() {
  if (this.isGeneralization) return
  const { isActive } = this.getData()
  if (!isActive) {
    this.removeCustomBtn1()
  }
}

export default {
  initCustomBtn1,
  showCustomBtn1,
  removeCustomBtn1,
  hideCustomBtn1
}
