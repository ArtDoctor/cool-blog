# Data-Oriented Design: A Framework

To make the idea of Data-Oriented Design easier to understand we can think of it as a framework with a small set of core-operations:
* Add
* Remove
* Query
* Transform

Certain supportive operations arise implicitly (and since code cannot read our minds, we need to explicitly write these implications), such as:
* Find
* Get
* Set
* Clear

And another layer of operations can usually get build via a combination of the operations above.