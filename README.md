# permi

Basic permissions system featuring wildcards.

## API

##### `permi(String pattern, String test) -> Boolean`

(Curryable)
Returns true if test matches pattern. Wildcards are supported.

Examples:
```
permi("test.permission", "test.permission");
permi("test.*", "test.permission");
permi("test.permission", "test.*");
permi("test.*", "test.permission.nested.alot");
```
