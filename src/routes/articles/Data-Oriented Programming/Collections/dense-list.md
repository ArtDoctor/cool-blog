# Collection: DenseList

A ``DenseList`` is a composition of two concepts:
* List: A continuous, dynamically-sized array
* Dense: Keeping memory compact together in memory

If we think about the preferred functuon interface of a a ``DenseList`` and a ``List`` we will quickly notice that there is no difference.

* ``Add(index)``
* ``Remove(index)``
* ``Get(index) -> value``
* ``Set(index, value)``
* ``Query() -> ReadOnlyIterator<value>``
* ``Transform -> Iterator<value>`` 

The key difference between a usual ``List`` and ``DenseList`` arises when thinking about the computational effort as soon as we plug holes in it via ``Remove(index)``.

In a usual dynamically-sized array or list, a remove operation would cause the following effort if the list has a size of ``n`` and we would remove ``ni``. To make this example easier digest conceptualise it by defining ``n`` as ``64`` and ``i`` as ``32``:
1. Call to ``Remove(32)``
2. 
