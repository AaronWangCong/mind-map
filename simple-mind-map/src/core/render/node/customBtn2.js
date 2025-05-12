import btnsSvg from '../../../svg/btns'
import { SVG, Circle, G } from '@svgdotjs/svg.js'

function initCustomBtn2() {
  if (this.isGeneralization) return
  this._customBtn2 = null
  this._showCustomBtn2 = false
}

// 显示按钮
function showCustomBtn2() {
  if (this.isGeneralization) return

  const leftX  = this.getChildrenLength() > 0 ? 75 : 65
  // 创建按钮
  if (this._customBtn2) {
    // 重新绘制按钮的左边距离
    this._customBtn2.each((index) => {
      this._customBtn2.get(index).x(leftX)
    })
    this.group.add(this._customBtn2)
  } else {
    const { customBtnIcon2, expandBtnStyle, expandBtnSize } =
      this.mindMap.opt
    const { icon, style } = customBtnIcon2
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
    this._customBtn2 = new G()
    this._customBtn2.add(fillNode).add(iconNode)
    this._customBtn2.on('click', e => {
      e.stopPropagation()
      this.mindMap.emit('custom_btn_2_click', this)
      const { customBtn2Click } = this.mindMap.opt
      if (typeof customBtn2Click === 'function') {
        customBtn2Click(this)
        return
      }
    })
    this._customBtn2.on('dblclick', e => {
      e.stopPropagation()
    })
    this._customBtn2.addClass('smm-custom-btn-2')
    this.group.add(this._customBtn2)
  }
  this._showCustomBtn2 = true
  // 更新按钮
  this.renderer.layout.renderExpandBtn(this, this._customBtn2)
}

//  移除按钮
function removeCustomBtn2() {
  if (this.isGeneralization) return
  if (this._customBtn2 && this._showCustomBtn2) {
    this._customBtn2.remove()
    this._showCustomBtn2 = false
  }
}

// 隐藏按钮
function hideCustomBtn2() {
  if (this.isGeneralization) return
  const { isActive } = this.getData()
  if (!isActive) {
    this.removeCustomBtn2()
  }
}

export default {
  initCustomBtn2,
  showCustomBtn2,
  removeCustomBtn2,
  hideCustomBtn2
}
