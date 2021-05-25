---
title: Custom attributes
---

With Meta Box, you can add custom attributes for inputs like text, URL, email field. This feature is very helpful if developers want to add HTML5 attributes or something like `data-*` attribute for their custom JavaScript code.

Creating custom attributes is done by either of the following methods:

- **Using Meta Box Builder extension**, which helps you create custom attributes with UI. This extension is already bundled in Meta Box AIO/MB Core.
- **Using code**.

## Using Meta Box Builder

To add custom attributes to the fields, click on the tab **Advanced** in each field and click **Add New** custom settings. Using [Dot notation](https://docs.metabox.io/extensions/meta-box-builder/#dot-notation) on the Builder documentation.

![create custom attributes](https://i.imgur.com/UIdseik.png)

Add custom HTML5 attributes `data-*`, click **Add New** Custom HTML5 Attributes. Using [JSON notation](https://docs.metabox.io/extensions/meta-box-builder/#json-notation):

![create custom HTML5 attributes](https://i.imgur.com/Hn14j8u.png)

Create common attributes `disabled`, `required`, `readonly`, `maxlength` and `pattern`:

![create common attributes](https://i.imgur.com/N2Zfh06.png)

## Using code

To add custom attributes to the fields, just define them as a `'key' => 'value'` like this:

```php
'fields' => [
    [
        'name'       => __( 'Text', 'meta-box' ),
        'id'         => 'text',
        'type'       => 'text',
        'attributes' => [
            'disabled'  => true,
            'minlength' => 10,
        ],
    ],
],
```

If you want to add custom `data-*` attribute, you can add like this:

```php
'attributes' => [
    // Simple value
    'data-option1'  => 'value1',
    // Array of values
    'data-option2'  => json_encode( array( 'key1' => 'value1', 'key2' => 'value2' ) ),
],
```

Currently, this feature is supported in field `text`, `url`, `email`, `checkbox`, `radio`, `date`, `time`, `datetime` field.

Common attributes `disabled`, `required`, `readonly`, `maxlength` and `pattern` are also registered to be used as global parameters for fields, so you can use both these ways below as they are the same:

```php
'attributes' => [
    'disabled'  => true,
    'required'  => true,
    'readonly'  => true,
    'maxlength' => 140,
    'pattern'   => true,
],

// or simpler, e.g. without wrapping inside 'attributes'

'disabled'  => true,
'required'  => true,
'readonly'  => true,
'maxlength' => 140,
'pattern'   => true,
```
