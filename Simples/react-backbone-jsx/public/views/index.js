/**
Copyright (C) 2014 Mokoversity Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * SETUP
 **/
var app = app || {};

/**
 * Component
 */
/** @jsx React.DOM */
var ListItemWrapper = React.createClass({
  render: function() {
    return (
        <li><a href='{this.props.html_url}' target='_blank'>{this.props.title}</a></li>
    );
  }
});

/** @jsx React.DOM */
app.ListViewComponent = React.createClass({
    componentDidMount: function() {
        this.props.model.on('change', function() {
            this.forceUpdate();
        }.bind(this));
    },
    render: function() {
        var me = this;

        return (
            <ul>
                {this.props.model.get('issues').map(function (result) {
                    return <ListItemWrapper id={result.id} title={result.title} html_url={result.html_url} />;
                })}
            </ul>
        );
    }
});

/**
 * MODELS
 **/
app.Posts = Backbone.Model.extend({
    url: function() {
        return 'https://api.github.com/repos/MokoVersity/react-101-training/issues'
    },
    defaults: {
        errors: [],
        errfor: {},
        issues: []
    }
});

/**
 * VIEWS
 **/
app.PostsView = Backbone.View.extend({
    el: '#main-content',
    template: '<div class="widget-container"></div>',
    initialize: function() {
        var self = this;

        this.model = new app.Posts();
        this.widget = new app.ListViewComponent({
          handleClick: this.handleClick.bind(this),
          model: this.model
        });

        this.model.fetch({
          success: function(model, response, options) {
            self.model.set('issues', response);
          }
        });
        this.render();
    },
    render: function() {
      this.$el.html(this.template);

      React.render(this.widget, this.$el.find('.widget-container').get(0));

      return this;  
    },
    handleClick: function() {
    }
});

/**
 * BOOTUP
 **/
app.MainView = Backbone.View.extend({
    initialize: function() {
        app.postsView = new app.PostsView();
    }
});

$(document).ready(function() {
    app.mainView = new app.MainView();
});