export const
  scrollTop = () => {
    let bd = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    bd.animate({ scrollTop: 0 }, 200);
  }