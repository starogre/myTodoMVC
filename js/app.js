var util = {

	uuid: function() {
		return;
	},

	pluralize: function() {

	},

	store: function() {

	},
}

var App = {
	init: function () {
		this.todos = [];

		this.bindEvents();
	},

	bindEvents: function() {
		$('#addBtn').on('click', this.create.bind(this));
		$('#todo-list').on('click', '.deleteBtn', this.destroy.bind(this));
	},

	create: function() {
		var $input = $('#new-todo');
		var val = $input.val();
		
		this.todos.push({
			title: val,
			completed: false
		});

		$input.val('');
		$input.focus();
		this.render();
	},

	render: function() {
		$('#todo-list').empty();
		var i = 0;
		this.todos.forEach( function(todo) {
			$('#todo-list').append('<li style="width:100%; display:block; float: left" class="left-align">' + todo.title + ' ' + todo.completed + '<button id='+i+' style="float:right" class="deleteBtn">Delete</button></li>');
			i++;
		});
		
		
	},

	editMode: function() {

	},

	editFinish: function() {

	},

	destroy: function(e) {
		var i = $(e.target).attr('id');
		this.todos.splice(i, 1);
		this.render();
	},

	destroyCompleted: function() {

	},

	toggle: function() {

	},

	toggleAll: function() {

	},

	indexFromEl: function() {

	},

	getActiveTodos: function() {

	},

	getCompletedTodos: function() {

	},

	getFilteredTodos: function() {

	},



	renderFooter: function() {

	},

	update: function() {

	},

}

App.init();