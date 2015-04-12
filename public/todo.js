(function(){
  var Todo = React.createClass({
    render: function () {
      return (
        <div className="todo">
          <div className="todo-wrapper">
            <h1>TODOリスト</h1>
            <ul className="todo-tasks">
              {this.tasks()}
            </ul>
            <form className="todo-new" onSubmit={this.handleNewTask}>
              <input type="text" ref="new_task" className="todo-input" />
              <input type="submit"
                className="todo-new-submit button"
                value="登録"
              />
            </form>
          </div>
        </div>
      );
    },

    tasks: function () {
      return this.state.tasks.map(function(task) {
        var handleClick = function() {
          this.handleDone(task);
        }.bind(this);
        return (
          <li className="todo-task" key={task.id}>
            {task.name}
            <button className="todo-done button" onClick={handleClick}>
              完了
            </button>
          </li>
        );
      }.bind(this));
    },

    getInitialState: function() {
      return {tasks: []};
    },

    componentDidMount: function() {
      this.getTaskList();
    },

    getTaskList: function() {
      jQuery.ajax({
        url: this.props.index_url,
        dataType: 'json',
        success: function(data) {
          this.setState({tasks: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    // 完了ボタンが押された
    handleDone: function(task) {
      jQuery.ajax({
        url: task.done_url,
        dataType: 'json',
        type: "POST",
        success: function(data) {
          this.getTaskList();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    // 登録ボタンが押された
    handleNewTask: function(e) {
      e.preventDefault();
      var new_task = React.findDOMNode(this.refs.new_task);
      var data = {name: new_task.value.trim()};
      jQuery.ajax({
        url: this.props.create_url,
        dataType: 'json',
        type: "POST",
        data: data,
        success: function(data) {
          new_task.value = "";
          this.getTaskList();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  });

  this.todo = {Todo: Todo};
}).bind(this).call();
