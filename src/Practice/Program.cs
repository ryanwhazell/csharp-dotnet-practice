// This will probably all get deleted. However,
// I'll leave it in for now just as a space to toy with C# code.

using Practice.Models;

var taskList = new TaskList();

taskList.AddTask("Buy groceries");
taskList.AddTask("Clean the house");
taskList.AddTask("Finish the project");
taskList.RemoveTask("Clean the house");

List<string> tasks = taskList.GetTasks();

Console.WriteLine("Tasks:");
foreach (var task in tasks)
{
    Console.WriteLine($"- {task}");
}