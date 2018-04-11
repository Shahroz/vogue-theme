jQuery.validator.setDefaults({
  errorElement: 'div', //default input error message container
  errorClass: 'form-control-feedback', // default input error message class
  focusInvalid: false, // do not focus the last invalid input
  ignore: "",  // validate all fields including form hidden input

  errorPlacement: function(error, element) { // render error placement for each input type
      var group = $(element).closest('.m-form__group-sub').length > 0 ? $(element).closest('.m-form__group-sub') : $(element).closest('.m-form__group');
      var help = group.find('.m-form__help');

      if (group.find('.form-control-feedback').length !== 0) {
          return;
      }

      if (help.length > 0) {
          help.before(error);
      } else {
          if ($(element).closest('.input-group').length > 0) {
              $(element).closest('.input-group').after(error);
          } else {
              if ($(element).is(':checkbox')) {
                  $(element).closest('.m-checkbox').find('>span').after(error);
              } else {
                  $(element).after(error);
              }
          }
      }
  },

  highlight: function(element) { // hightlight error inputs
      var group = $(element).closest('.m-form__group-sub').length > 0  ? $(element).closest('.m-form__group-sub') : $(element).closest('.m-form__group');

      console.log('add' + group.attr('class'));

      group.addClass('has-danger'); // set error class to the control groupx
  },

  unhighlight: function(element) { // revert the change done by hightlight
      var group = $(element).closest('.m-form__group-sub').length > 0  ? $(element).closest('.m-form__group-sub') : $(element).closest('.m-form__group');

      group.removeClass('has-danger'); // set error class to the control group
  },

  success: function(label, element) {
      var group = $(label).closest('.m-form__group-sub').length > 0  ? $(label).closest('.m-form__group-sub') : $(label).closest('.m-form__group');

      //group.addClass('has-success').removeClass('has-danger'); // set success class and hide error class
      group.removeClass('has-danger'); // hide error class
      group.find('.form-control-feedback').remove();
  }
});

//== Set defaults
$.notifyDefaults({
template: '' +
'<div data-notify="container" class="alert alert-{0} m-alert" role="alert">' +
'<button type="button" aria-hidden="true" class="close" data-notify="dismiss"></button>' +
'<span data-notify="icon"></span>' +
'<span data-notify="title">{1}</span>' +
'<span data-notify="message">{2}</span>' +
'<div class="progress" data-notify="progressbar">' +
'<div class="progress-bar progress-bar-animated bg-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
'</div>' +
'<a href="{3}" target="{4}" data-notify="url"></a>' +
'</div>'
});

Chart.elements.Rectangle.prototype.draw = function() {
  var ctx = this._chart.ctx;
  var vm = this._view;
  var left, right, top, bottom, signX, signY, borderSkipped, radius;
  var borderWidth = vm.borderWidth;

  // Set Radius Here
  // If radius is large enough to cause drawing errors a max radius is imposed
  var cornerRadius = this._chart.options.barRadius ? this._chart.options.barRadius : 0;

  if (!vm.horizontal) {
      // bar
      left = vm.x - vm.width / 2;
      right = vm.x + vm.width / 2;

      if (vm.y > 2 * cornerRadius) {
        top = vm.y - cornerRadius;
      } else {
        top = vm.y;
      }

      bottom = vm.base;
      signX = 1;
      signY = bottom > top? 1: -1;
      borderSkipped = vm.borderSkipped || 'bottom';
      //console.log(vm.base + '-' + vm.y);
  } else {
      // horizontal bar
      left = vm.base;
      right = vm.x;
      top = vm.y - vm.height / 2;
      bottom = vm.y + vm.height / 2;
      signX = right > left? 1: -1;
      signY = 1;
      borderSkipped = vm.borderSkipped || 'left';
  }

  // Canvas doesn't allow us to stroke inside the width so we can
  // adjust the sizes to fit if we're setting a stroke on the line
  if (borderWidth) {
      // borderWidth shold be less than bar width and bar height.
      var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
      borderWidth = borderWidth > barSize? barSize: borderWidth;
      var halfStroke = borderWidth / 2;
      // Adjust borderWidth when bar top position is near vm.base(zero).
      var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
      var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
      var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
      var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
      // not become a vertical line?
      if (borderLeft !== borderRight) {
          top = borderTop;
          bottom = borderBottom;
      }
      // not become a horizontal line?
      if (borderTop !== borderBottom) {
          left = borderLeft;
          right = borderRight;
      }
  }

  ctx.beginPath();
  ctx.fillStyle = vm.backgroundColor;
  ctx.strokeStyle = vm.borderColor;
  ctx.lineWidth = borderWidth;

  // Corner points, from bottom-left to bottom-right clockwise
  // | 1 2 |
  // | 0 3 |
  var corners = [
      [left, bottom],
      [left, top],
      [right, top],
      [right, bottom]
  ];

  // Find first (starting) corner with fallback to 'bottom'
  var borders = ['bottom', 'left', 'top', 'right'];
  var startCorner = borders.indexOf(borderSkipped, 0);
  if (startCorner === -1) {
      startCorner = 0;
  }

  function cornerAt(index) {
      return corners[(startCorner + index) % 4];
  }

  // Draw rectangle from 'startCorner'
  var corner = cornerAt(0);
  ctx.moveTo(corner[0], corner[1]);

  for (var i = 1; i < 4; i++) {
      corner = cornerAt(i);
      nextCornerId = i+1;
      if(nextCornerId == 4){
          nextCornerId = 0
      }

      nextCorner = cornerAt(nextCornerId);

      width = corners[2][0] - corners[1][0];
      height = corners[0][1] - corners[1][1];
      x = corners[1][0];
      y = corners[1][1];

      var radius = cornerRadius;

      // Fix radius being too large
      if(radius > height/2){
          radius = height/2;
      }if(radius > width/2){
          radius = width/2;
      }

      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  ctx.fill();
  if (borderWidth) {
      ctx.stroke();
  }
};
!function(a){"use strict";a.sessionTimeout=function(b){function c(){n||(a.ajax({type:i.ajaxType,url:i.keepAliveUrl,data:i.ajaxData}),n=!0,setTimeout(function(){n=!1},i.keepAliveInterval))}function d(){clearTimeout(g),(i.countdownMessage||i.countdownBar)&&f("session",!0),"function"==typeof i.onStart&&i.onStart(i),i.keepAlive&&c(),g=setTimeout(function(){"function"!=typeof i.onWarn?a("#session-timeout-dialog").modal("show"):i.onWarn(i),e()},i.warnAfter)}function e(){clearTimeout(g),a("#session-timeout-dialog").hasClass("in")||!i.countdownMessage&&!i.countdownBar||f("dialog",!0),g=setTimeout(function(){"function"!=typeof i.onRedir?window.location=i.redirUrl:i.onRedir(i)},i.redirAfter-i.warnAfter)}function f(b,c){clearTimeout(j.timer),"dialog"===b&&c?j.timeLeft=Math.floor((i.redirAfter-i.warnAfter)/1e3):"session"===b&&c&&(j.timeLeft=Math.floor(i.redirAfter/1e3)),i.countdownBar&&"dialog"===b?j.percentLeft=Math.floor(j.timeLeft/((i.redirAfter-i.warnAfter)/1e3)*100):i.countdownBar&&"session"===b&&(j.percentLeft=Math.floor(j.timeLeft/(i.redirAfter/1e3)*100));var d=a(".countdown-holder"),e=j.timeLeft>=0?j.timeLeft:0;if(i.countdownSmart){var g=Math.floor(e/60),h=e%60,k=g>0?g+"m":"";k.length>0&&(k+=" "),k+=h+"s",d.text(k)}else d.text(e+"s");i.countdownBar&&a(".countdown-bar").css("width",j.percentLeft+"%"),j.timeLeft=j.timeLeft-1,j.timer=setTimeout(function(){f(b)},1e3)}var g,h={title:"Your Session is About to Expire!",message:"Your session is about to expire.",logoutButton:"Logout",keepAliveButton:"Stay Connected",keepAliveUrl:"/keep-alive",ajaxType:"POST",ajaxData:"",redirUrl:"/timed-out",logoutUrl:"/log-out",warnAfter:9e5,redirAfter:12e5,keepAliveInterval:5e3,keepAlive:!0,ignoreUserActivity:!1,onStart:!1,onWarn:!1,onRedir:!1,countdownMessage:!1,countdownBar:!1,countdownSmart:!1},i=h,j={};if(b&&(i=a.extend(h,b)),i.warnAfter>=i.redirAfter)return console.error('Bootstrap-session-timeout plugin is miss-configured. Option "redirAfter" must be equal or greater than "warnAfter".'),!1;if("function"!=typeof i.onWarn){var k=i.countdownMessage?"<p>"+i.countdownMessage.replace(/{timer}/g,'<span class="countdown-holder"></span>')+"</p>":"",l=i.countdownBar?'<div class="progress">                   <div class="progress-bar progress-bar-striped countdown-bar active" role="progressbar" style="min-width: 15px; width: 100%;">                     <span class="countdown-holder"></span>                   </div>                 </div>':"";a("body").append('<div class="modal fade" id="session-timeout-dialog">               <div class="modal-dialog">                 <div class="modal-content">                   <div class="modal-header">                     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>                     <h4 class="modal-title">'+i.title+'</h4>                   </div>                   <div class="modal-body">                     <p>'+i.message+"</p>                     "+k+"                     "+l+'                   </div>                   <div class="modal-footer">                     <button id="session-timeout-dialog-logout" type="button" class="btn btn-default">'+i.logoutButton+'</button>                     <button id="session-timeout-dialog-keepalive" type="button" class="btn btn-primary" data-dismiss="modal">'+i.keepAliveButton+"</button>                   </div>                 </div>               </div>              </div>"),a("#session-timeout-dialog-logout").on("click",function(){window.location=i.logoutUrl}),a("#session-timeout-dialog").on("hide.bs.modal",function(){d()})}if(!i.ignoreUserActivity){var m=[-1,-1];a(document).on("keyup mouseup mousemove touchend touchmove",function(b){if("mousemove"===b.type){if(b.clientX===m[0]&&b.clientY===m[1])return;m[0]=b.clientX,m[1]=b.clientY}d(),a("#session-timeout-dialog").length>0&&a("#session-timeout-dialog").data("bs.modal")&&a("#session-timeout-dialog").data("bs.modal").isShown&&(a("#session-timeout-dialog").modal("hide"),a("body").removeClass("modal-open"),a("div.modal-backdrop").remove())})}var n=!1;d()}}(jQuery);
/*! Idle Timer v1.1.0 2016-03-21 | https://github.com/thorst/jquery-idletimer | (c) 2016 Paul Irish | Licensed MIT */
!function(a){a.idleTimer=function(b,c){var d;"object"==typeof b?(d=b,b=null):"number"==typeof b&&(d={timeout:b},b=null),c=c||document,d=a.extend({idle:!1,timeout:3e4,events:"mousemove keydown wheel DOMMouseScroll mousewheel mousedown touchstart touchmove MSPointerDown MSPointerMove"},d);var e=a(c),f=e.data("idleTimerObj")||{},g=function(b){var d=a.data(c,"idleTimerObj")||{};d.idle=!d.idle,d.olddate=+new Date;var e=a.Event((d.idle?"idle":"active")+".idleTimer");a(c).trigger(e,[c,a.extend({},d),b])},h=function(b){var d=a.data(c,"idleTimerObj")||{};if(("storage"!==b.type||b.originalEvent.key===d.timerSyncId)&&null==d.remaining){if("mousemove"===b.type){if(b.pageX===d.pageX&&b.pageY===d.pageY)return;if("undefined"==typeof b.pageX&&"undefined"==typeof b.pageY)return;var e=+new Date-d.olddate;if(200>e)return}clearTimeout(d.tId),d.idle&&g(b),d.lastActive=+new Date,d.pageX=b.pageX,d.pageY=b.pageY,"storage"!==b.type&&d.timerSyncId&&"undefined"!=typeof localStorage&&localStorage.setItem(d.timerSyncId,d.lastActive),d.tId=setTimeout(g,d.timeout)}},i=function(){var b=a.data(c,"idleTimerObj")||{};b.idle=b.idleBackup,b.olddate=+new Date,b.lastActive=b.olddate,b.remaining=null,clearTimeout(b.tId),b.idle||(b.tId=setTimeout(g,b.timeout))},j=function(){var b=a.data(c,"idleTimerObj")||{};null==b.remaining&&(b.remaining=b.timeout-(+new Date-b.olddate),clearTimeout(b.tId))},k=function(){var b=a.data(c,"idleTimerObj")||{};null!=b.remaining&&(b.idle||(b.tId=setTimeout(g,b.remaining)),b.remaining=null)},l=function(){var b=a.data(c,"idleTimerObj")||{};clearTimeout(b.tId),e.removeData("idleTimerObj"),e.off("._idleTimer")},m=function(){var b=a.data(c,"idleTimerObj")||{};if(b.idle)return 0;if(null!=b.remaining)return b.remaining;var d=b.timeout-(+new Date-b.lastActive);return 0>d&&(d=0),d};if(null===b&&"undefined"!=typeof f.idle)return i(),e;if(null===b);else{if(null!==b&&"undefined"==typeof f.idle)return!1;if("destroy"===b)return l(),e;if("pause"===b)return j(),e;if("resume"===b)return k(),e;if("reset"===b)return i(),e;if("getRemainingTime"===b)return m();if("getElapsedTime"===b)return+new Date-f.olddate;if("getLastActiveTime"===b)return f.lastActive;if("isIdle"===b)return f.idle}return e.on(a.trim((d.events+" ").split(" ").join("._idleTimer ")),function(a){h(a)}),d.timerSyncId&&a(window).bind("storage",h),f=a.extend({},{olddate:+new Date,lastActive:+new Date,idle:d.idle,idleBackup:d.idle,timeout:d.timeout,remaining:null,timerSyncId:d.timerSyncId,tId:null,pageX:null,pageY:null}),f.idle||(f.tId=setTimeout(g,f.timeout)),a.data(c,"idleTimerObj",f),e},a.fn.idleTimer=function(b){return this[0]?a.idleTimer(b,this[0]):this}}(jQuery);

//== Set defaults
swal.setDefaults({
  width: 400,
  padding: '2.5rem',
  buttonsStyling: false,
  confirmButtonClass: 'btn btn-success m-btn m-btn--custom',
  confirmButtonColor: null,
  cancelButtonClass: 'btn btn-secondary m-btn m-btn--custom',
  cancelButtonColor: null
});
