// This file is a greeter class that provides a method to generate greeting messages.
// Mostly just here for testing out basic C# syntax and structure, as well as unit testing with xUnit.

// I'll leave it here for now but I'm probably going to delete it later since it's 
// not really necessary for the project after today.

namespace Practice.Models
{
    public class Greeter
    {
        public string Greet(string name)
        {
            return $"Hello, {name}!";
        }
    }
}