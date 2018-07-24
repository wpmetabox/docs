---
title: Custom attributes
---

With Meta Box, you can add custom attributes for inputs like text, URL, email field. This feature is very helpful if developers want to add HTML5 attributes or something like `data-*` attribute for their custom JavaScript code.

To add custom attributes to the fields, just define them as a `'key' => 'value'` like this:

```php
'attributes' => array(
    'disabled'  => true,
    'minlength' => 10,
),
```

If you want to add custom `data-*` attribute, you can add like this:

```php
'attributes' => array(
    // Simple value
    'data-option1'  => 'value1',
    // Array of values
    'data-option2'  => json_encode( array( 'key1' => 'value1', 'key2' => 'value2' ) ),
),
```

Currently, this feature is supported in field `text`, `url`, `email`, `checkbox`, `radio`, `date`, `time`, `datetime` field.

Common attributes `disabled`, `required`, `readonly`, `maxlength` and `pattern` are also registered to be used as global parameters for fields, so you can use both these ways below as they are the same:

```php
'attributes' => array(
    'disabled'  => true,
    'required'  => true,
    'readonly'  => true,
    'maxlength' => 140,
    'pattern'   => true,
),

// or simpler, e.g. without wrapping inside 'attributes'

'disabled'  => true,
'required'  => true,
'readonly'  => true,
'maxlength' => 140,
'pattern'   => true,
```
