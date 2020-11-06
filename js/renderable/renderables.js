function OrxataUI(container, element, options){
      this._oui_available_elements = ['button'];
      if(!this._oui_available_elements.includes(element)) throw new Error("OrxataUI doesn't have support for element: "+element);
      this.element = element;
      this.options = options;
      this.container = container;
      this.events = {
        button: {
          startLoading: function () {},
          endLoading: function () {}
        }
      }
    }

    OrxataUI.prototype.render = function(){
      var options = this.options;
      var classes = (options.class) ? options.class.join(" ") : '';

      var id = (options.id) ? options.id : "orxataui-button";
      var text_id = "";
      var loader_id = "";

      var html = '<button class="'+classes+'" id="'+id+'" type="'+options.type+'"';

      if(options.name){
        html += ' name="'+options.name+'"';
      }

      if(options.value){
        html += ' value="'+options.value+'"';
      }

      if(options.clickCallback){
        html+=' onclick="'+options.clickCallback+'">';
      }else{
        html+='>';
      }

      if(options.text){
        var text = options.text;
        var value = text.value;
        text_id = (text.id) ? text.id : "orxataui-text-button";
        if(options.loader){
          var loader = options.loader;
          loader_id = (loader.id) ? loader.id : "orxataui-loader-button";

          if(loader.position=='left'){
            html+='<span id="'+loader_id+' style="display:none; margin-left:-5px;" class="spinner-border spinner-border-sm"></span><span id="'+text_id+'">'+value+'</span>';
          }else{
            html+='<span id="'+text_id+'">'+value+'</span><span id="'+loader_id+'" style="display:none; margin-right:-5px;" class="spinner-border spinner-border-sm"></span>';
          }
        }else{
          html+='<span id="'+text_id+'">'+value+'</span>';
        }
      }
      html+='</button>';



     var startLoad =  function activateLoadingSpinner() {
    var x;
    var t = $("#"+text_id);
    var mg = (loader.position=='left') ? 'margin-left' : 'margin-right';
    var mt = 10;
    for (x = 0; x <= mt; x++) {
      setTimeout(function () {
        t.css(mg, x + 'px')
      }, 50 + (x * 10));
    }
    var s = $("#"+loader_id);
    s.css('display', 'inherit');
    var ms = 4;
    for (x = 0; x <= ms; x++) {
      setTimeout(function () {
        s.css('margin-bottom', x + 'px')
      }, 50 + (x * 10));
    }
    var b = $("#"+id);
    b.attr("disabled", true);
  };

  var endLoad = function deactivateLoadingSpinner() {
    var x;
    var s = $("#"+loader_id);
    var ms = 4;
    for (x = ms; x >= 0; x--) {
      setTimeout(function () {
        s.css('margin-bottom', x + 'px')
      }, 50 + ((ms-x) * 10));
    }
    s.css('display', 'none');
    var t = $("#"+text_id);
    var mg = (loader.position=='left') ? 'margin-left' : 'margin-right';
    var mt = 10;

    for (x = mt; x >= 0; x--) {
      setTimeout(function () {
        t.css(mg, x + 'px')
      }, 50 + ((mt-x) * 10));
    }

    var b = $("#"+id);
    b.attr("disabled", false);
  };

  this.events.button.startLoading = startLoad;
  this.events.button.endLoading = endLoad;


  $("#"+this.container).html(html);
  return html;

    }
