# permi

Basic permissions system featuring wildcards.

## API

#####`permi.match(Array or String pattern, Array or String match) -> Boolean`

(Curryable)
Returns true if any of the items in `patterns` matches any of the items in `match`. Wildcards are supported.

Examples:
```
permi("test.permission", "test.permission");
permi("test.*", "test.permission");
permi("test.permission", "test.*");
permi(["test.invalid", "test.permission.test"], "test.permission.*");
permi("test.permission.test", ["test.invalid", "test.permission.*"]);
```
