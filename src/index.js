/**
 * 在指定位置做dom片段插入
 * @param {string} headStr dom片段
 * @param {string} containerId 容器Id
 */
var addDom = function(domStr, containerId) {
  var snippet = document.createTextNode(domStr);
  var body = document.getElementsByTagName('body')[0];

  //如果没有容器的话，则在body的最上方插入
  if (typeof containerId === 'undefined') {
    body.insertBefore(snippet, body.childNodes[0]);
  } else {
    var container = document.getElementById(containerId);
    container.innerHTML = snippet;
  }
}

window.addDom = addDom;
