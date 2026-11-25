namespace Practice.Models
{
    public class TaskList
    {
        private List<string> tasks;

        public TaskList()
        {
            tasks = new List<string>();
        }

        public void AddTask(string task)
        {
            tasks.Add(task);
        }

        public void RemoveTask(string task)
        {
            tasks.Remove(task);
        }

        public List<string> GetTasks()
        {
            return new List<string>(tasks);
        }
    }
}