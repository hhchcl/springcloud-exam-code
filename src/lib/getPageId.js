export const
  getPageId = (vm) => {
    let menuGround = vm.$tools.menuGround(vm)
    if (menuGround) {
      return 'C' + menuGround.id.replace(/^b/, '')
    } else {
      return 'C000000'
    }
  }
export const
  getMenuId = (vm, route) => {
    if (route === 'preMenuId') route = vm.$tools.storage.get('preRouter', 'save')
    let menuGround = vm.$tools.menuGround(vm, route)
    if (menuGround) {
      return menuGround.id
    } else {
      return ''
    }
  }

export const
  saveWarmTips = (vm, warmTipsList) => {
    /* let PageId=getPageId(vm) */
    let warmTipsRecord = vm.$tools.storage.get('warmTipsRecord', 'save')
    if (!warmTipsRecord) warmTipsRecord = {}
    // let warmTipsList=vm.$tools.storage.get("warmTipsList","save")
    // let CbList=[]
    for (let i = 0; i < warmTipsList.length; i++) {
      warmTipsRecord[warmTipsList[i].tipsPageno] = warmTipsList[i].tipsContent
    // if(warmTipsList[i][PageId+NO]) CbList.push(warmTipsList[i][PageId+NO])
    //  if(PageId + "00" + NO == warmTipsList[i].tipsPageno) CbList.push(warmTipsList[i].tipsContent)
    }
    vm.$tools.storage.set('warmTipsRecord', warmTipsRecord)
    // return CbList
  }

let opt
$.fn.jqprint = function (options) {
  opt = $.extend({}, $.fn.jqprint.defaults, options)

  var $element = (this instanceof jQuery) ? this : $(this)
  $.browser = {}
  $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase())
  if (opt.operaSupport && $.browser.opera) // $.browser.opera1.9版本已经废弃
  {
    var tab = window.open('', 'jqPrint-preview')
    tab.document.open()

    var doc = tab.document
  } else {
    var $iframe = $('<iframe  />')

    if (!opt.debug) { $iframe.css({ position: 'absolute', width: '0px', height: '0px', left: '-600px', top: '-600px' }) }

    $iframe.appendTo('body')
    var doc = $iframe[0].contentWindow.document
  }

  if (opt.importCSS) {
    if ($('style').length > 0) {
      var $style = "<style type='text/css'>"
      $('style').each(function () {
        $style += $(this).html()
      })
      $style += '</style>'
      doc.write($style)
    }
  }

  if (opt.printContainer) { doc.write($element.outer()) } else { $element.each(function () { doc.write($(this).html()) }) }

  doc.close();

  (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus()
  setTimeout(function () { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close() } }, 1000)
}

$.fn.jqprint.defaults = {
  debug: false,
  importCSS: true,
  printContainer: true,
  operaSupport: true
}

// Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
jQuery.fn.outer = function () {
  return $($('<div></div>').html(this.clone())).html()
}
export const
  print = (vm) => {
    // $(".printArea").jqprint()
    var scrollTop = $('body').scrollTop()
    var printArea = $('.printArea').clone()[0]
    $('body').children().wrapAll("<div class='printNone'></div>")
    $('.printNone').hide()
    $('body').append("<div id='printDom'></div>")
    $('#printDom').append(printArea)
    window.print()
    $('#printDom').remove()
    $('.printNone').show().children().unwrap()
    $('body').scrollTop(scrollTop)
  }
