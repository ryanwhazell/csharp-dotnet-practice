using Practice;
using Xunit;

namespace Practice.Tests;

public class GreeterTests
{
    [Fact]
    public void GetGreeting_ReturnsCorrectMessage()
    {
        // A simple test to verify that the Greet method returns the expected greeting message.
        var greeter = new Greeter();
        var result = greeter.Greet("World");
        Assert.Equal("Hello, World!", result);
    }
}
