define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var Choice = (function () {
        function Choice(id, choiceText) {
            this.id = id;
            this.choiceText = choiceText;
        }
        return Choice;
    }());
    var App = (function () {
        function App() {
            this.prompt = 'Please select a choice:';
            this.correctChoice = 0;
            this.selectedChoice = null;
            this.feedbackText = '';
            this.choices = [
                new Choice(0, 'The first choice (correct)'),
                new Choice(1, 'The second choice'),
                new Choice(2, 'The third choice')
            ];
        }
        Object.defineProperty(App.prototype, "correct", {
            get: function () {
                return this.selectedChoice.id === this.correctChoice;
            },
            enumerable: true,
            configurable: true
        });
        App.prototype.submit = function () {
            this.clearFeedback();
            if (this.correct) {
                this.feedbackText = 'That is the correct answer';
                $('.feedback-popup p').addClass('correct');
            }
            else {
                this.feedbackText = 'That was not the correct answer.';
                $('.feedback-popup p').addClass('incorrect');
            }
            $('.feedback-popup').show();
        };
        App.prototype.clear = function () {
            this.clearFeedback();
            this.selectedChoice = null;
        };
        App.prototype.clearFeedback = function () {
            $('.feedback-popup').hide();
            $('.feedback-popup p').removeClass('correct incorrect');
            this.feedbackText = '';
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./mult-choice.css\"></require>\n  <div class=\"mult-choice col-xs-6\">\n    <h1>${prompt}</h1>\n\n    <form submit.trigger=\"submit()\">\n      <ul>\n        <li class=\"choice\" repeat.for=\"choice of choices\">\n          <label>\n            <input type=\"radio\" name=\"choices\" model.bind=\"choice\" checked.bind=\"$parent.selectedChoice\" />\n            <span class=\"choice-label\">${choice.choiceText}</span>\n          </label>\n        </li>\n      </ul>\n      <div class=\"form-controls\">\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n        <input type=\"button\" class=\"btn btn-danger\" value=\"Clear\" click.trigger=\"clear()\">\n      </div>\n    </form>\n\n    <div class=\"feedback-popup\"><p innerhtml.one-way=\"feedbackText\"></p></div>\n  </div>\n</template>\n"; });
define('text!mult-choice.css', ['module'], function(module) { module.exports = "html,\nbody {\n  width: 100%;\n  height: 100%;\n}\np {\n  margin: 0;\n  padding: 0;\n}\n.mult-choice {\n  margin: 0 auto;\n  float: none;\n}\n.choice {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.mult-choice label {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n}\n.choice-label {\n  padding-left: 10px;\n}\n.feedback-popup {\n  display: none;\n  font-weight: bold;\n  padding: 10px 20px;\n  background-color: #eee;\n  margin-top: 20px;\n}\n.correct {\n  color: green;\n}\n.incorrect {\n  color: red;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map