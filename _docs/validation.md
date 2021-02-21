---
title: Validation
---

The Meta Box plugin has built-in validation module for all fields. You can use validation to make a field required, check password length, check phone number format, etc. The validation is done on the *client side*.

There are 2 ways of doing validation: via **input attributes** (mostly for basic validation) and via **jQuery validation plugin** (for more advanced validation). They're both bundled in Meta Box and you can choose which one fits your needs.

## Validation with input attributes

Meta Box supports [custom attributes](https://docs.metabox.io/custom-attributes/) for all input fields. You can use these attributes to add validation rules like this:

```php
// This is an array settings of a text field.
[
    'type' => 'text',
    'id'   => 'phone',
    'name' => 'Phone number',
    
    // Attributes for validation.
    'required' => true,       // Make the field required.
    'pattern'  => '[0-9]{9}', // Must have 9 digits
]
```

These are the available attributes that you can use for validation:

Attribute| Description
---|---
`max` | Maximum value
`maxlength` | Maximum number of characters
`min` | Minimum value
`minlength` | Minimum number of characters
`pattern` | Match a regular expression
`required` | Required
`step` | Match the step increment
`type` | Match the [input type](https://docs.metabox.io/html5-input-types/)

## Validation with jQuery validation plugin

For more advanced validation, including new rules and custom error messages, you might want to use the validation module, powered by the popular [jQuery validation plugin](https://jqueryvalidation.org/). It comes bundled with a useful set of validation methods and an API to write your own methods. All methods come with default error messages in English and translations into 37 other languages.

To use it, you need to add a key `validation` to the [meta box settings](https://docs.metabox.io/creating-meta-boxes/). This key has a parameter `rules` for validation rules and `messages` for error messages.

```php
// This is a part of the meta box settings
'validation' => [
    'rules'  => [
        'field_id' => [
            'required'  => true,
            'minlength' => 7,
            // More rules here
        ],
        // Rules for other fields
    ],
    'messages' => [
        'field_id' => [
            'required'  => 'Password is required',
            'minlength' => 'Password must be at least 7 characters',
        ],
    ],
],
```

These are available validation rules that you can use:

Name|Description
---|---
`required` | Makes the element required.
`minlength` | Makes the element require a given minimum length.
`maxlength` | Makes the element require a given maxmimum length.
`rangelength` | Makes the element require a given value range. Array.
`min` | Makes the element require a given minimum.
`max` | Makes the element require a given maximum.
`range` | Makes the element require a given value range. Array.
`email` | Makes the element require a valid email
`url` | Makes the element require a valid url
`date` | Makes the element require a date.
`dateISO` | Makes the element require an ISO date.
`number` | Makes the element require a decimal number.
`digits` | Makes the element require digits only.
`creditcard` | Makes the element require a credit card number.
`equalTo` | Requires the element to be the same as another one. Value must be the ID of another field.
`extension` | Makes the element require certain file extensions. For `file`, `image` fields only.
`accept` | Makes a file upload accept only specified mime-types. For `file`, `image` fields only.
`phoneUS` | Validate for valid US phone number.
`remote` | Requests a resource to check the element for validity. Value can be URL of the resource to request for server side validation (string) or options to fully customize the request, see [jQuery.ajax](https://api.jquery.com/jQuery.ajax). The server side resource is called via jQuery.ajax and gets a key/value pair corresponding to the name of the validated element and its value as a GET parameter. The response is evaluated as JSON and must be `true` for valid elements, and can be any `false`, `undefined` or `null` for invalid elements, using the default message; or a string, eg. "That name is already taken, try peter123 instead" to display as the error message.

For more details about validation rules, please read the [jQuery validation documentation](https://jqueryvalidation.org/documentation/).

**Notes**

The jQuery validation library actually uses **input name**, not input ID. In most cases, field ID is the same as field name. But for some cases such as field is a checkbox list or is a taxonomy with `field_type` is `checkbox_list`, e.g. where field has multiple inputs, then all those inputs don't have IDs.

In this case, **you need to use input name for the rules**. For example, if you use a taxonomy field with `field_type` is `checkbox_list`, you should set validation rules as follows:

```php
'validation' => [
    'rules'  => [
        'my_taxonomy[]' => [
            'required'  => true,
        ],
    ],
    'messages' => [
        'my_taxonomy[]' => [
            'required'  => 'You must select a tag to proceed',
        ],
    ],
],
```
