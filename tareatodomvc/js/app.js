$('.todo-list').ready(init());
$('input').keyup(function(e) {
	var todoText = $(this).val();
	var todoTareas = {
		tarea: todoText,
		id:0,
		estado: false
	}
	if (todoText && e.keyCode===13) {
		var cantLetras = todoTareas.tarea;
		$(this).val('');
		save(cantLetras);
		var arrayaux = getTodos();
		todoTareas.id = arrayaux.indexOf(cantLetras);
		var tareaFinal = $('<h3><input class="check" style="float:left; margin-left:10px;" type="checkBox">').append(cantLetras).append('<span class="span"><input type="button" style="float:right;" class="btn btn-danger btn-lg" id="deletetodo" value="X" onclick="eliminar('+todoTareas.id+',1)"></input></span>');
		$('.todo-list').append('<br>').append($('<div>').append(tareaFinal)).append('<br>');
	}
});
function save(cantLetras) {
	var todo = getTodos();
	todo.push(cantLetras);
	localStorage.setItem('todo', JSON.stringify(todo));
}
function getTodos(){
	if (!localStorage.todo)
		return[];
return JSON.parse(localStorage.todo);
}
function init(){
	var todo = getTodos();
	$('.todo-list').empty();
	$('.recargar').empty();
	$('.eliminar').empty();
	$('.recargar').append('<a href=""><input class="btn btn-primary" id="recargarbut" type="button" style="float: left" value="Recargar Pagina"></a>');
	$('.eliminar').append('<input type="button" class="btn btn-danger" id="vaciarbut" style="float: left" value="Vaciar" onclick="borrarTodos()">');
	todo.forEach(function(position) {
		var posiTodo = todo.indexOf(position);
		var tareaFinal = $('<h3><input class="check" tyle="float:left; margin-left:10px;" type="checkBox">').append(position).append('<span class="span"><input type="button" style="float:right" class="btn btn-danger btn-lg" id="deletetodo" value="X" onclick="eliminar('+posiTodo+',1)"></input></span>');
		$('.todo-list').append('<br>').append($('<div>').append(tareaFinal)).append('<br>');
});
}
function eliminar(id, cantidad){
	var tta = getTodos();
	tta.splice(id,1);
	localStorage.todo = JSON.stringify(tta);
	init();
}
function borrarTodos(){
 localStorage.todo="";
 init();
}