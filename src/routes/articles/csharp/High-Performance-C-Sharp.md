# High-Performance C#

<script>
    import Highlight from "svelte-highlight";
    import csharp from "svelte-highlight/languages/csharp";
    import "../../../styles/highlight-default.css"

    const chsharpLocalFunctionExampleBefore = 
"public void Update() {\n\
    Vector3 inputDirection = Vector3.zero;\n\
    if(Input.GetKey(left)) {\n\
        inputDirection += Vector3.Left;\n\
    }\n\
    if(Input.GetKey(right)) {\n\
        inputDirection += Vector3.right;\n\
    }\n\
    if(Input.GetKey(up)) {\n\
        inputDirection += Vector3.up;\n\
    }\n\
    if(Input.GetKey(down)) {\n\
        inputDirection += Vector3.down;\n\
    }\n\
    inputDirection.Normalize();\n\
\n\
    var velocity = inputDirection * speed;\n\
\n\
    velocity += gravity;\n\
    velocity *= Time.deltaTime;\n\
\n\
    var nextPosition = transform.position + velocity;\n\
    \n\
    if (nextPosition.x < 0 || nextPosition.x > Screen.Width) {\n\
        velocity.x = 0.0f;\n\
    ]\n\
    if (nextPosition.y < 0 || nextPosition.y > Screen.Height) {\n\
        velocity.y = 0.0f;\n\
    ]\n\
\n\
\n\
    transform.position = transform.position + velocity;\n\
\n\
    // TODO: Finish up example\n\
}\
";

    const chsharpLocalFunctionExampleAfter = 
"public void Update() {\n\
static Vector3\n\
    static Vector3 GetInputDirection() {\n\
        Vector3 inputDirection = Vector3.zero;\n\
        if(Input.GetKey(left)) {\n\
            inputDirection += Vector3.Left;\n\
        }\n\
        if(Input.GetKey(right)) {\n\
            inputDirection += Vector3.right;\n\
        }\n\
        if(Input.GetKey(up)) {\n\
            inputDirection += Vector3.up;\n\
        }\n\
        if(Input.GetKey(down)) {\n\
            inputDirection += Vector3.down;\n\
        }\n\
        inputDirection.Normalize();\n\
        return inputDirection;\n\
    }\n\
\n\
    static Vector3 CalculateVelocity(Vector3 input, float speed, float deltaTime) {\n\
        var velocity = input * speed;\n\
        return velocity * deltaTime;\n\
    }\n\
\n\
    Vector3 inputDirection = GetInputDirection();\n\
    Vector3 velocity = CalculateVelocity(inputDirection, speed, Time.deltaTime);\n\
}\
";
</script>


## Development-Performance

When we think about performance we like to only think about the performance of the system during runtime and often neglect the performance of the developers. But we should remember that there are a lot more attritutes that describe the quality of a system or systems. For example: 

* Maintainability
* Flexibility
* Scalability

Some attributes can get further broken down into smaller quality attributes such as "Maintainability". It also sums up the ideas of isolation, readability and many more things.

But after all, development-performance simply describes productivity, but personally I feel like calling it that makes it sound less meaningful. :)

### (Static) Local Functions

One way to increase readability, the concept of isolation and flexbility plus scalability is by utilising local functions. A personal preference is using static local functions since they are stateless, but there is no need become too pedantic about this subject.

<Highlight language={csharp} code={chsharpLocalFunctionExampleBefore}/>

<Highlight language={csharp} code={chsharpLocalFunctionExampleAfter}/>

### Static Polymorphism

### `ref struct` Types

### `readonly struct` Types

### `record` Types (and soon `record struct` Types)

### Default Interface Methods

### `using` declarations and `IDisposable`

### Extensions and Generics with Interface Constraints

## Computer-Performance

### `struct` Types

### `ref`, `in`, and `out` Return Types and Parameters

### `Span<T>` Collection

### `stackalloc` Keyword

