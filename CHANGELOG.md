Changelog
--------------------------------------------

# v2.2.0
 - #1 Removed Object.assign call to avoid messing up the parameters if an URL object is used
 - #2 Simplified 3 if - checks down to one

# v2.1.0
 - Support request calls with only *options* parameter

# v2.0.0
 - Replaced named exports with one default export which uses `https` and `http` according to the provided protocol of the URL argument

# v1.1.2
 - Decreased installed package size by ~50%

 # v1.1.1 (initial release)
 - Exports Promise versions of the core modules `https` and `http`
 - Documents resolver interface and function parameters in `README.md`
