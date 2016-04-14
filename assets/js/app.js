(function(window, document, undefined) {
  // TOOLS
  var _ = {
    qS: function(s) {
      return document.querySelector(s);
    },
    qSA: function(s) {
      return document.querySelectorAll(s);
    },
    aEL: function(el, event, cb) {
      el.addEventListener(event, cb);
    }
  };

  // BACKGROUND
  var background = {
    init: function() {
      var self = this;
      self.$background = _.qS('.background');

      self.width = self.$background.offsetWidth;
      self.height = self.$background.offsetHeight;

      self.els = [
        {type: 'b-plus grey'},
        {type: 'b-plus grey'},
        {type: 'b-plus blue'},
        {type: 'b-plus blue'},
        {type: 'b-round grey'},
        {type: 'b-round grey big'},
        {type: 'b-round grey big'},
        {type: 'b-round blue'},
        {type: 'b-round blue big'},
        {type: 'b-round blue big'}
      ];

      var now = Date.now();
      for (var i=0; i<self.els.length; i++) {
        self.els[i].$el = document.createElement('div');
        self.els[i].$el.className = self.els[i].type;

        self.els[i].updatedAt = now;
        self.$background.appendChild(self.els[i].$el);
      }

      self.update();
    },

    update: function() {
      var self = this;

      var r = 0;
      var $el = null;
      var now = Date.now();
      for (var i=0; i<self.els.length; i++) {
        $el = self.els[i].$el;
        r = Math.floor(Math.random()*10);
        if (r <= 1 && now - self.els[i].updatedAt > 1500) {
          if (!$el.classList.contains('visible')) {
            self.els[i].scrollSpeed = Math.random()*3 + 1;
            $el.style.left = Math.round(Math.random()*self.width) + 'px';
            $el.style.top  = Math.round(Math.random()*self.height) + 'px';
          }
          $el.classList.toggle('visible');
          self.els[i].updatedAt = now;
        }
      }

      setTimeout(function() {
        self.update.call(self);
      }, 2000);
    },

    windowResize: function() {
      this.width = this.$background.offsetWidth;
      this.height = this.$background.offsetHeight;
    },

    mouseWheel: function(delta) {
      var t = 0;
      for (var i=0; i<this.els.length; i++) {
        if (this.els[i].$el.classList.contains('visible')) {
          var t = parseInt(this.els[i].$el.style.top.slice(0, -2));
          this.els[i].$el.style.top = (t - (delta * this.els[i].scrollSpeed)) + 'px';
        }
      }
    }
  };


  // APP
  var app = {
    init: function() {
      background.init();
      this.setEventListeners();
    },

    setEventListeners: function() {
      window.addEventListener('resize', function() {
        background.windowResize();
      });
      window.addEventListener('mousewheel', function(e) {
        background.mouseWheel(e.deltaY);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    app.init();
  });

})(window, document);