
var drawerOptions;
let navBrandSttic=$('.navbar .navbar-brand').clone(true);
let formsStatic=$('.navbar .form-inline').clone(true);
let lengthFSt=$('.navbar .form-inline').length;
const dir=$('html').attr('dir')
const someClass=`d-flex flex-nowrap`;
const defualtStyles=require("./drawer-themes").themes
function enterLeft() {
  var elem = $('.drawer-inside')  
  var pos = 0;
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == $(elem).width()) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = 0 + "px"; 
      elem.style.left = pos + "px"; 
    }
  }
}
let isDrawerOptionsDen=false

 function DrawerOption(opt={},defPos=0,drawer="drawer",drawerInside="drawer-inside",drawerOutside="drawer-outside") {
  isDrawerOptionsDen=true 
  defPos=(defPos>=0)?defPos:0;
   defPos=Math.min(defPos,defualtStyles.length-1);
   this.drawer=drawer;
   this.drawerInside=drawerInside;
   this.drawerOutside=drawerOutside;
    this.tags=new DrawerTagOption((opt.class)?opt.class:{});
    this.parentElementItems=(opt.parentElementItems)?opt.parentElementItems:null;
    this.withNavbarForms=(typeof opt.withNavbarFormsBootstrap !== 'undefined')?opt.withNavbarFormsBootstrap:false;
    this.withNavItemBootstrap=(typeof opt.withNavItemBootstrap !== 'undefined')?opt.withNavItemBootstrap:true;
    this.withNavbarBrandBootstrap=(typeof opt.withNavbarBrandBootstrap !== 'undefined')?opt.withNavbarBrandBootstrap:true;
    this.withDropDownBotstrap=(typeof opt.withDropDownBotstrap !== 'undefined')?opt.withDropDownBotstrap:true;
    this.changeBrandSearchBotstrap=(typeof opt.changeBrandSearchBootstrap !== 'undefined')?opt.changeBrandSearchBootstrap:true;
    this.exitResizeing=(typeof opt.exitResizeing !== 'undefined')?opt.exitResizeing:true;
    this.isUserTextSelect=(typeof opt.isUserTextSelect !== 'undefined')?opt.isUserTextSelect:true;
    this.customHeadDrawer=(opt.customHeadDrawer)?opt.customHeadDrawer:null;
    this.headerStyle=(opt.headerStyle)?opt.headerStyle:defualtStyles[defPos].headerStyle;
    this.drawerInsideStyle=(opt.drawerInsideStyle)?opt.drawerInsideStyle:defualtStyles[defPos].drawerInsideStyle;
    this.drawerItemStyle=(opt.drawerItemStyle)?opt.drawerItemStyle:defualtStyles[defPos].drawerItemStyle;
    this.drawerItemHoverEnterStyle=(opt.drawerItemHoverEnterStyle)?opt.drawerItemHoverEnterStyle:defualtStyles[defPos].drawerItemHoverEnterStyle;
    this.drawerItemHoverExitStyle=(opt.drawerItemHoverExitStyle)?opt.drawerItemHoverExitStyle:defualtStyles[defPos].drawerItemHoverExitStyle;
    this.textStyle=(opt.textStyle)?opt.textStyle:defualtStyles[defPos].textStyle;
    this.addQuery=(opt.addQuery)?opt.addQuery:null;
    this.showInsideCloseButton=(typeof opt.showInsideCloseButton !== 'undefined')?opt.showInsideCloseButton:true;
    this.showOutsideCloseButton=(typeof opt.showOutsideCloseButton !== 'undefined')?opt.showOutsideCloseButton:false;
    this.insideCloseButton=(opt.insideCloseButton)?opt.insideCloseButton:`
    <button type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>`;
    this.outsideCloseButton=(opt.outsideCloseButton)?opt.outsideCloseButton:`
    <button type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>`;
    this.dir=(opt.dir)?opt.dir:"ltr";
    this.customJqueryElement=(opt.customJqueryElement)?opt.customJqueryElement:null;
    this.customJqueryElementFirst=(typeof opt.customJqueryElementFirst !== 'undefined')?opt.customJqueryElementFirst:false;
    this.enterAnimation=(opt.enterAnimation)?opt.enterAnimation:function(){
      const htmlDir=$('html').attr('dir')
      if(this.dir=='rtl'||htmlDir=='rtl'){
        $(`.${drawer} .${drawerInside}`).addClass('animated fadeInRight fast')
      }else{
        $(`.${drawer} .${drawerInside}`).addClass('animated fadeInLeft fast')
      }
      setTimeout(function () {
        $(`.${drawer} .${drawerOutside}`).css({
          'background': 'rgba(0, 0, 0, 0.3)'
        })
      },799)
    };
    this.exitAnimation=(opt.exitAnimation)?opt.exitAnimation:function(){
          $('.'+drawer).addClass('animated fadeOut fast')
          setTimeout(function () {
            clearDrawers(drawer)
          },799)
    };
  }


  function clearDrawers(tags='drawer') {
    $(`.${tags}`).remove()
  }
  let downArrow;
  let upArrow;

  function DrawerTagOption(tags) {
    this.drawer=(tags.drawer)?tags.drawer:"drawer",
    this.drawerInside=(tags.drawerInside)?tags.drawerInside:"drawer-inside",
    this.drawerOutside=(tags.drawerOutside)?tags.drawerOutside:"drawer-outside",
    this.brandKeeper=(tags.brandKeeper)?tags.brandKeeper:"brand-keeper",
    this.showButton=(tags.showButton)?tags.showButton:"navbar-toggler"
  };
  function changeBig() {
    if( $('.navbar .form-inline').length 
        && $(navBrandSttic).length
        && (navBrandSttic<$('.navbar .navbar-brand').length 
        || $('.navbar .form-inline').length>lengthFSt))         // use this if you are using id to check
          {
              $('.navbar').removeClass(someClass)
              $('.navbar .navbar-brand').remove()
              $('.navbar').prepend($(navBrandSttic).clone(true))
              
          }
  }
  function changeSmall() {
    let forms=$('.navbar .form-inline').clone(true).addClass('navbar-brand');
      if( $('.navbar .form-inline').length && $('.navbar .form-inline').length==lengthFSt )   {
              $('.navbar').addClass(someClass)
              $('.navbar .navbar-brand').remove();
              $('.navbar').prepend(forms);
              $('.form-inline.navbar-brand').children().remove('button')
              $('.form-inline.navbar-brand').css({
                'padding':0,
                'margin-left':'5px',
                'width':'100%'
              })
              $('.form-inline.navbar-brand input').css({
                'padding-left':'5px',
                'width':'100%'
              })
          }//end if

  }
  function searchChanger1() {
      if(drawerOptions.exitResizeing){
        if(window.innerWidth>992){
          drawerOptions.exitAnimation();
        }
      }
      if(drawerOptions.changeBrandSearchBotstrap){
      if(window.innerWidth>992){
        if(drawerOptions.exitResizeing){
        drawerOptions.exitAnimation();
      }
        changeBig()
      }else{
      changeSmall()
      }
    }
  }
// starts
function distroy(){
  if(drawerOptions.exitAnimation){
    $('.'+drawerOptions.drawer).remove();
    // $('.'+drawerOptions.drawer).remove();
  }
}
function drawers(options={class:{}}) {
  if(window.innerWidth<=992){
    changeBig()
  }
  navBrandSttic=$('.navbar .navbar-brand').clone(true);
  formsStatic=$('.navbar .form-inline').clone(true);
  lengthFSt=$('.navbar .form-inline').length;
 $('.navbar .navbar-toggler').removeAttr('data-toggle')
 let opti=(options.class)?options.class:{};
 drawerOptions=new DrawerOption(options,options.defualtStylesPosition,
  (opti.drawer)?opti.drawer:"drawer",
  (opti.drawerInside)?opti.drawerInside:"drawer-inside",
  (opti.drawerOutside)?opti.drawerOutside:"drawer-outside"
  );
 let colorBorder=drawerOptions.textStyle.color;
      // console.log(colorBorder)
      // $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .arrowDrawer`).css({
      //   "border-color":colorBorder
      // })
  downArrow={
  "width": "0",
  "height": "0",
  "transition": "border 0.09s",
  "border":"none",
  "border-left": "5px solid transparent",
  "border-right": "5px solid transparent",
  "border-top": "10px solid "+colorBorder,
    }
    upArrow={
      "width": "0",
      "height": "0",
  "transition": "border 0.09s",
      "border":"none",
      "border-left": "5px solid transparent",
      "border-right": "5px solid transparent",
      "border-bottom": "10px solid "+colorBorder,
        }
        if(drawerOptions.exitResizeing){
    searchChanger1()
    onresize=function(){
      searchChanger1()
      
    }
  }
    
    $('.'+drawerOptions.tags.showButton).unbind( "click.myEvents" );
    $('.'+drawerOptions.tags.showButton).bind( "click.myEvents", drawerShow );
    // $('.'+drawerOptions.tags.showButton).on('click',drawerShow)
  };
  function drawerShow() {
    $('.'+drawerOptions.drawer).remove()
    let brand=$(navBrandSttic).clone(true)
    // console.log(brand)
    let navItem=$('.navbar .nav-item').clone(true);
    // console.log(navItem)
    let dropdowns=$(navItem).filter('.dropdown')
    dropdowns.children().removeAttr('data-toggle').removeClass("dropdown-toggle");
    let dropdownsItems=dropdowns.find(".dropdown-item")
    dropdownsItems.css({
      'display':'flex',
      'flex-direction':'column',
      'align-items':'flex-start'
    });
    let forms=$(formsStatic).clone(true)
    let orderDrawersInside=''
  if(drawerOptions.dir=='rtl'&&dir!='rtl'){
    orderDrawersInside=`
    <div class="col ${drawerOptions.tags.drawerOutside}" style="position: relative;height:100% ;">
    </div>
    <div class="col-auto px-1 ${drawerOptions.tags.drawerInside}" style="overflow:auto;position: relative;background:wheat;height:100%;list-style: none;">
    </div>
    `
  }else{
    orderDrawersInside=`
    <div class="col-auto px-1 ${drawerOptions.tags.drawerInside}" style="overflow:auto;position: relative;background:wheat;height:100%;list-style: none;">
    </div>
    <div class="col ${drawerOptions.tags.drawerOutside}" style="position: relative;height:100% ;">
    </div>`
  }
    $(`<div class="${drawerOptions.tags.drawer}" style="overflow:hidden;position:fixed;z-index:12;top:0;left:0;right:0;bottom:0;">
      <div class="container-fluid">
        <div class="row" style="height:100vh ;" >
            ${orderDrawersInside}
        </div>
      </div>
    </div>`).prependTo($('body'))
    if(drawerOptions.isUserTextSelect){
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).css({
            "-webkit-user-select": "none", /* Safari 3.1+ */
            "-moz-user-select": "none", /* Firefox 2+ */
            "-ms-user-select": "none", /* IE 10+ */
            "user-select": "none" /* Standard syntax */
      })
    }
    if(drawerOptions.showInsideCloseButton){
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).append(drawerOptions.insideCloseButton)
    }
    if(drawerOptions.showOutsideCloseButton){
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerOutside}`).append(drawerOptions.outsideCloseButton)
    }
    
    if(dir=='rtl'||drawerOptions.dir=='rtl'){
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerOutside} .close`).css({
        'position':'absolute',
        'top':0,
        'right':0
      })
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .close`).css({
        'position':'absolute',
        'top':0,
        'left':0
      })
    }else{
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .close`).css({
        'position':'absolute',
        'top':0,
        'right':0
      })
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerOutside} .close`).css({
        'position':'absolute',
        'top':0,
        'left':0
      })
    }
    let closeH=$(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .close`).height()
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).css({
      "padding-top":(closeH)+'px',
      'display':'flex',
      'flex-direction':'column',
      'align-items':'flex-start'
    });
    $(`.${drawerOptions.tags.drawer}`).hide()
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.brandKeeper}`).remove()
    if(drawerOptions.withNavbarBrandBootstrap||drawerOptions.customHeadDrawer!=null){
      if(drawerOptions.withNavbarBrandBootstrap&&drawerOptions.customHeadDrawer==null){
    let barnTop=`<div class="${drawerOptions.tags.brandKeeper}"></div>`;
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).append(barnTop);
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.brandKeeper}`).css(drawerOptions.headerStyle);
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.brandKeeper}`).append($(brand))
      }else if(!drawerOptions.withNavbarBrandBootstrap&&drawerOptions.customHeadDrawer!=null){
        let barnTop=`<div class="${drawerOptions.tags.brandKeeper}"></div>`;
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).append(barnTop);
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.brandKeeper}`).css(drawerOptions.headerStyle);
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.brandKeeper}`).append(drawerOptions.customHeadDrawer)
      }else{
        let barnTop=`<div class="${drawerOptions.tags.brandKeeper}"></div>`;
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).append(barnTop);
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.brandKeeper}`).css(drawerOptions.headerStyle);
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.brandKeeper}`).append($(brand));
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.brandKeeper}`).append(drawerOptions.customHeadDrawer)
      }
    }
    if(drawerOptions.withNavItemBootstrap){
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).append(navItem)
    $(`.${drawerOptions.tags.drawer} .nav-item`).addClass('d-flex')
    }
    if(drawerOptions.withNavbarForms){
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).append(forms)
    }
    if(drawerOptions.withDropDownBotstrap){
      let counter=0
      dropdownsItems.each(function () {
        let parent=$(this).parents( ".dropdown" )
        $(parent).after($(this))
      })
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).children().each(function (index) {
        if($(this).is('.dropdown')){
          counter++
          $(this).data('drops',("d"+counter))
          $(this).children().filter(".nav-link").addClass("d-flex align-items-center").append(`<div class="dropKeeper"></div>`)
        }
        if($(this).is('.dropdown-item')){
          $(this).data('drops',("d"+counter))
          $(this).data('visibility','false')
        }
      })
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropKeeper`).append(`<div class="arrowDrawer"></div>`)
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .arrowDrawer`).css(downArrow)
      // $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown-item`).css({
      //   'display':'none',
      //   '-webkit-transition': 'all 2s',
      //   'transition': 'all 2s'
      // })
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown`).on('click',function () {
        let dropDown=$(this)
        let setArrow=false
        let dropItemsId=$(this).data('drops')
        // type
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown-item`).each(function () {
          let  dropItemVisibile=$(this).data('visibility')
          if(dropItemVisibile=='false' &&($(this).data("drops") == ""+dropItemsId+"")){
            setArrow=true
            // if(setArrow){
            //   dropDown.css(upArrow)
            // }
              $(this).css('display','flex')
            $(this).data('visibility','true')
          }else{
            $(this).css('display','none')
            $(this).data('visibility','false')
          }
          
      })
      if(setArrow){
        dropDown.find(".arrowDrawer").css(upArrow)
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown`).not($(dropDown)).find(".arrowDrawer").css(downArrow)
        // console.log(dropDown.find(".arrowDrawer"))
      }else{
        // console.log('up')
        dropDown.find(".arrowDrawer").css(downArrow)
        // $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown`).not($(dropDown)).find(".arrowDrawer").css(upArrow)
        // console.log(dropDown.find(".arrowDrawer"))
      }
      })
    }
    if(drawerOptions.dir=='rtl'&&dir!='rtl'){
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).css({
        "padding-top":(closeH)+'px',
        'display':'flex',
        'flex-direction':'column',
        'align-items':'flex-end',
        "direction": "rtl"
      });
    }
    if(drawerOptions.customJqueryElement!=null){
      if(drawerOptions.customJqueryElementFirst){
        $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .${drawerOptions.tags.brandKeeper}`).after(drawerOptions.customJqueryElement)
      }else{
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).append(drawerOptions.customJqueryElement)
    }
    }
    if(drawerOptions.parentElementItems!=null){
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).children().wrap(drawerOptions.parentElementItems)
    }
    let maxElemenW=250
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).children().each(function () {
      if(maxElemenW<$(this).outerWidth()){
        maxElemenW=$(this).outerWidth()
      }
      if(!$(this).is('.close')&&!$(this).is('.'+drawerOptions.tags.brandKeeper)){
      $(this).css(drawerOptions.drawerItemStyle)
      $(this).hover(function () {
        $(this).css(drawerOptions.drawerItemHoverEnterStyle)
      },function () {
        $(this).css(drawerOptions.drawerItemHoverExitStyle)
      })}
    })
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside},.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} a`).contents().css(drawerOptions.textStyle)
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} a`).css(drawerOptions.textStyle)
    
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside}`).css(Object.assign({
      "min-width":maxElemenW+"px"
    },drawerOptions.drawerInsideStyle))
    if(drawerOptions.withDropDownBotstrap){
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown-item`).css('display','none')
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown-item`).data('visibility','false')
            
      $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown`).find(".arrowDrawer").css(downArrow)
      // $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown`).first().trigger('click')
      // $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerInside} .dropdown`).first().trigger('click')
    }
    if(drawerOptions.addQuery!=null){
      drawerOptions.addQuery()
    }
    $(`.${drawerOptions.tags.drawer}`).show("slow");
    // console.log(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerOutside},.close`)
    drawerOptions.enterAnimation()
    $(`.${drawerOptions.tags.drawer} .${drawerOptions.tags.drawerOutside},.close`).on('click',function () {
      drawerOptions.exitAnimation()
      // console.log("ex")
    })
  }
  module.exports={
    drawer:drawers,
    resizeDrawers:searchChanger1,
    clearDrawer:clearDrawers,
    drawerShow:drawerShow
  }